import type { NextApiRequest, NextApiResponse } from "next";
import { url } from "../../lib/apiUrl";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, tokenAddress, network } = req.query;
  const baseUrl = url(network as string);

  const response = await fetch(
    `${baseUrl}/api?module=account&action=tokennfttx&contractaddress=${tokenAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.NEXT_APP_ETHERSCAN_API_KEY}`
  );

  const { status, message, result } = await response.json();

  console.log({ status, message, result });

  if (status === "1") {
    res.status(200).json({ data: result });
  } else if (message === "NOTOK") {
    res.status(500).send({ error: result });
  } else {
    res.status(500).send({ error: message });
  }
}
