export interface MapRangeOptions {
  inputValue: number;
  outputMin: number;
  outputMax: number;
  inputMax: number;
  inputMin: number;
}

export function mapRange(options: MapRangeOptions) {
  const {inputValue, outputMax, outputMin, inputMax, inputMin} = options;

  const result =
    ((inputValue - inputMin) / (inputMax - inputMin)) *
      (outputMax - outputMin) +
    outputMin;

  if (result === Infinity) return 0;

  return result;
}
