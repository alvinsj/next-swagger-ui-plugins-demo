import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export const SamlAuth = ({
  name, 
  getComponent,  
  schema,
  authActions,
  ...props
}) => {
  const authorized = props.getSystem().authSelectors.authorized()

  const isAuthenticated = authorized && authorized.get(name)
  const loginUrl = schema.get('loginUrl')
  const logoutUrl = schema.get('logoutUrl')
  const Row = getComponent("Row")

  // hide when it's authorized by other method
  const disabled = authorized.size > 0 && !isAuthenticated
  const handleLogoutClick = useCallback(() => authActions.logout([name]), [authActions, name])

  return (
    <div>
      <Row>
        <strong>SAML Login</strong>
        { !isAuthenticated ? 
          <Link disabled={disabled} className="btn modal-btn auth authorize" href={!disabled ? loginUrl : {}}>
            Start
          </Link> 
          : <Link className="btn modal-btn auth authorize" href={{}} onClick={handleLogoutClick}>
            Logout
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
