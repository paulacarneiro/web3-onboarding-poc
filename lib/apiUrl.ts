export const url = (network: string = "mainnet") =>
  `https://api${network === "mainnet" ? "" : `-${network}`}.etherscan.io`;
