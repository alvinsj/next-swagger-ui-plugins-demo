import type { NextApiRequest, NextApiResponse } from "next";
import sp from '@/lib/sp'
import idp from '@/lib/idp'
import * as jwt from 'jsonwebtoken';

const SECRET = 'supersecretivesecrets'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { extract } = await sp.parseLoginResponse(idp, 'post', req);
    const { login } = extract.attributes;
    // get your system user
    const payload = {
      user_id: 'test-user-id',
      email: 'test@example.com'
    };

    // assign req user
    // req.user = { nameId: login };

    if (payload) {
      // create session and redirect to the session page
      const token = jwt.sign(payload, SECRET);
      return res.redirect(`/?auth_token=${token}`);
    }
    throw new Error('ERR_USER_NOT_FOUND');
  } catch (e) {
    console.error('[FATAL] when parsing login response sent from okta', e);
    return res.redirect('/');
  }
}
