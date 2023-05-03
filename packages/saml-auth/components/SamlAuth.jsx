import React from 'react';
import PropTypes from 'prop-types';

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
  const handleLogoutClick = () => authActions.logout([name])

  return (
    <div>
      <Row>
        <strong>SAML Login</strong>
        { !isAuthenticated ? 
          <a disabled={disabled} className="btn modal-btn auth authorize" href={!disabled ? loginUrl : {}}>
            Start
          </a> 
          : <a className="btn modal-btn auth authorize" href={logoutUrl} onClick={handleLogoutClick}>
            Logout
          </a>}
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
