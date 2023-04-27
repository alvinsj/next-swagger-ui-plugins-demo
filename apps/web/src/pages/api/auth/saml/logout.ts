import type { NextApiRequest, NextApiResponse } from 'next';
import sp from '@/lib/sp'
import idp from '@/lib/idp'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, context: redirectUrl } = await sp.createLogoutRequest(idp, 'redirect', {logoutNameID: 'test-user-id'}, '/'); 
  return res.redirect(302, redirectUrl as string);
}
