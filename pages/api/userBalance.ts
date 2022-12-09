import type { NextApiRequest, NextApiResponse } from "next";
import { url } from "../../lib/apiUrl";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, network } = req.query;
  const baseUrl = url(network as string);

  const response = await fetch(
    `${baseUrl}/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.NEXT_APP_ETHERSCAN_API_KEY}`
  );

  const { result, error } = await response.json();

  if (result) {
    res.status(200).json({ data: result });
  } else if (error) {
    res.status(500).send({ error });
  }
}
