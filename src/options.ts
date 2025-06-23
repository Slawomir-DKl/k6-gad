import { Options } from "k6/options";

export enum OptionsType {
  rampingVus = "rampingVus",
  constantVus = "constantVus",
}

export function chooseOptions(
  optionsVariant: OptionsType,
  durationInSeconds: number = 10,
  vus: number = 5
): void {
  if (durationInSeconds <= 0) {
    throw new Error("Duration should be positive number");
  }
}
