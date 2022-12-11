import type { NextApiRequest, NextApiResponse } from "next";
import { url } from "../../lib/apiUrl";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, network } = req.query;
  const baseUrl = url(network as string);

  const response = await fetch(
    `${baseUrl}/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.NEXT_APP_ETHERSCAN_API_KEY}`
  );

  const { status, message, result } = await response.json();

  if (status === 1) {
    res.status(200).json({ data: result });
  } else {
    res.status(500).send({ error: message });
  }
}
