import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class SamlAuthItem extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    authorized: PropTypes.object,
    getComponent: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    errSelectors: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)

    const system = props.getSystem()
    this.errActions = system.errActions
    this.authActions = system.authActions

    let { name, schema, authorized } = this.props
    let auth = authorized && authorized.get(name)
    let email = auth && auth.get("email") || ""
    let otp = auth && auth.get("otp") || ""

    this.state = {
      name,
      schema,
      email,
      otp
    }
  }

  sendOtp = () => {
    let { name } = this.props
    let { authActions, errActions } = this

    this.setState({ otp: ""})
    errActions.clear({ authId: name })
    authActions.sendOtp(this.state)
  }

  authorize = () => {
    let { name } = this.props
    let { authActions, errActions } = this

    errActions.clear({ authId: name })
    authActions.authorizeOtpToken(this.state)
  }

  onChange =(e) => {
    let { target : { dataset : { name }, value } } = e
    let state = {
      [name]: value
    }

    this.setState(state)
  }

  logout =(e) => {
    e.preventDefault()
    let { name } = this.props
    let { authActions, errActions } = this

    this.setState({ email: "", otp: ""})
    errActions.clear({ authId: name })
    authActions.logout([ name ])
  }

  render() {
    let { getComponent, authSelectors, errSelectors, name, getSystem } = this.props
    const Input = getComponent("Input")
    const Row = getComponent("Row")
    const Col = getComponent("Col")
    const Button = getComponent("Button")
    const AuthError = getComponent("authError")

    let authorizedAuth = authSelectors.authorized()
    let isAuthorized = !!authorizedAuth.get(name)
    let isOtpSent = !!authorizedAuth.get("otpSent")
    let errors = errSelectors.allErrors().filter( err => err.get("authId") === name)

    return (
      <div>
        <Row>
          <strong>SAML Login</strong>
          <Link className="btn modal-btn auth authorize" href="/api/auth/saml/authorize">
            Start
          </Link>
        </Row>
      </div>
    )
  }
}
