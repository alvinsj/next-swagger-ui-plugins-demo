import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export const SamlAuth = ({
  name, 
  getComponent,  
  schema,
  ...props
}) => {
  const authorized = props.getSystem().authSelectors.authorized()

  const isAuthenticated = authorized && authorized.get(name)
  const loginUrl = schema.get('loginUrl')
  const logoutUrl = schema.get('logoutUrl')
  const Row = getComponent("Row")

  return (
    <div>
      <Row>
        <strong>SAML Login</strong>
        { !isAuthenticated ? 
          <Link className="btn modal-btn auth authorize" href={loginUrl}>
            Start
          </Link> 
          : <Link className="btn modal-btn auth authorize" href={logoutUrl}>
            Start
          </Link>}
      </Row>
    </div>
  )
}

SamlAuth.propTypes = {
  name: PropTypes.string,
  authorized: PropTypes.object,
  getComponent: PropTypes.func.isRequired,
  getSystem: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  authSelectors: PropTypes.object.isRequired,
  errSelectors: PropTypes.object.isRequired,
}

export default SamlAuth
