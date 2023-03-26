export const clamp = (minimum: number, value: number, maximum: number) =>
  Math.max(Math.min(value, maximum), minimum);

export const getPercentage = (from: number, to: number, value: number) =>
  from === to ? 0 : (value - from) / (to - from);

export const toFixed = (value: number, fractionDigits = 0) =>
  Math.floor(10 ** fractionDigits * value) / 10 ** fractionDigits;
