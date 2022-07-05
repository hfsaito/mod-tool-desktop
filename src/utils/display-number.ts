const thresholds = [
  {
    value: 10000000000,
    unit: 'B'
  },
  {
    value: 1000000,
    unit: 'M'
  },
  {
    value: 1000,
    unit: 'K'
  }
];

export const displayNumber = (n: number): string => {
  let display = String(n);
  thresholds.some(threshold => {
    if (n >= threshold.value) {
      let roundedN = n / threshold.value;
      if (roundedN >= 10) {
        roundedN = Math.round(roundedN);
      } else if (roundedN >= 10) {
        roundedN = Math.round(roundedN * 10) / 10;
      } else {
        roundedN = Math.round(roundedN * 100) / 100;
      }
      display = `${roundedN}${threshold.unit}`;
      return true;
    }
    return false;
  });
  return display;
}