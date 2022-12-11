export function weiToEth(amount: string | number) {
  return toDecimals(amount as number);
}

export function weiToGwei(amount: string | number) {
  return toDecimals(amount as number, 9);
}

function toDecimals(number: number, decimals = 18) {
  return number * 10 ** -decimals;
}
