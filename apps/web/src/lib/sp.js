import * as fs from 'fs'
import { ServiceProvider } from 'samlify'
import path from 'path'

import * as samlify from 'samlify'
import * as validator from '@authenio/samlify-node-xmllint'
samlify.setSchemaValidator(validator)


const libDirectory = path.join(process.cwd(), 'src/lib')

const sp = new ServiceProvider({
  authnRequestsSigned: true,
  privateKey: fs.readFileSync(libDirectory + '/mock-private-key.key'),
  assertionConsumerService: [{
    isDefault: true,
    Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
    Location: `${process.env.NEXT_PUBLIC_ACS_URL || ''}/api/auth/saml/acs`
  }],
})

export default sp
