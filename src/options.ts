import { Options } from "k6/options";

export enum OptionsType {
  rampingVus = "rampingVus",
  constantVus = "constantVus",
}

export function chooseOptions(
  optionsVariant: OptionsType,
  durationInSeconds: number = 10,
  vus: number = 5
) {
  if (durationInSeconds <= 0) {
    throw new Error("Duration should be positive number");
  }
  let options;
  if ((optionsVariant = OptionsType.rampingVus)) {
    options = [
      { duration: "5s", target: 20 },
      { duration: "5s", target: 20 },
      { duration: "5s", target: 0 },
    ];
  } else {
    options = [];
  }
  return options;
}
