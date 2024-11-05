export const formatMoney = (value: number) => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(1) + 'T'; //trillions
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + 'B'; //billions
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + 'M'; //millions
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + 'K'; //thousands
  } else {
    return value.toString();
  }
};
