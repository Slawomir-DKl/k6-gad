import { Options } from "k6/options";

export enum OptionsType {
  rampingVus = "rampingVus",
  constantVus = "constantVus",
}

export function chooseOptions(
  optionsVariant: OptionsType,
  durationInSeconds: number = 10,
  vus: number = 5
): Options {
  if (durationInSeconds <= 0) {
    throw new Error("Duration should be positive number");
  }

  vus = Math.floor(vus);
  if (vus < 1) {
    throw new Error("Number of virtual users (vus) should be >= 1");
  }

  let rampDuration = 0;
  if (durationInSeconds > 10) {
    rampDuration = Math.floor(durationInSeconds / 10);
  } else if (durationInSeconds > 3) {
    rampDuration = 1;
  }

  const maintenanceDuration = durationInSeconds - 2 * rampDuration;

  const optionsMap: Record<OptionsType, Options> = {
    [OptionsType.rampingVus]: {
      thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(99)<100"],
      },
      scenarios: {
        average_load: {
          executor: "ramping-vus",
          stages: [
            { duration: `${rampDuration}s`, target: vus },
            { duration: `${maintenanceDuration}s`, target: vus },
            { duration: `${rampDuration}s`, target: 0 },
          ],
        },
      },
    },

    [OptionsType.constantVus]: {
      scenarios: {
        constant_load: {
          executor: "constant-vus",
          vus: vus,
          duration: `${durationInSeconds}s`,
        },
      },
    },
  };

  const options = optionsMap[optionsVariant];

  if (!options) {
    throw new Error(`Unknown options variant: ${optionsVariant}`);
  }

  return options;
}
