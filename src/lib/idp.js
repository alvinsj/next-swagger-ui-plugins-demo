import * as fs from 'fs';
import path from 'path';
import { IdentityProvider } from 'samlify'

import * as samlify from 'samlify';
import * as validator from '@authenio/samlify-node-xmllint';
samlify.setSchemaValidator(validator);

const libDirectory = path.join(process.cwd(), 'src/lib');

const idp = IdentityProvider({
  metadata: fs.readFileSync(libDirectory + '/mock-saml-metadata.xml'),
});

export default idp
