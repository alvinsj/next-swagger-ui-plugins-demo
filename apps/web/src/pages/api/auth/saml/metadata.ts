import type { NextApiRequest, NextApiResponse } from 'next'
import sp from '@/lib/sp'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'text/xml').send(sp.getMetadata())
}
