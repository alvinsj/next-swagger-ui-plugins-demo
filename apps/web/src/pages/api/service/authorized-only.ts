import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.headers.authorization)
    res.json({hello: 'world!'})
  else
    res.status(401).json({message: 'Unauthorized!'})
}
