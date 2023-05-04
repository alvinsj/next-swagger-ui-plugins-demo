import React from 'react'
import PropTypes from 'prop-types'

export default class OtpAuth extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    authorized: PropTypes.object,
    getComponent: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    errSelectors: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)

    const { otpJwtAuthSelectors, errActions, otpJwtAuthActions } = props.getSystem()

    this.errActions = errActions
    this.otpJwtAuthActions = otpJwtAuthActions

    let { name, schema } = this.props

    let email = otpJwtAuthSelectors.email() || ""
    let otp = otpJwtAuthSelectors.otp()|| ""

    this.state = {
      name,
      schema,
      email,
      otp
    }
  }

  sendOtp = () => {
    let { name } = this.props
    let { otpJwtAuthActions, errActions } = this

    this.setState({ otp: ""})
    errActions.clear({ authId: name })
    otpJwtAuthActions.sendOtp(this.state)
  }

  authorize = () => {
    let { name } = this.props
    let { otpJwtAuthActions, errActions } = this

    errActions.clear({ authId: name })
    otpJwtAuthActions.authorizeOtpToken(this.state)
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
    let { otpJwtAuthActions, errActions } = this

    this.setState({ email: "", otp: ""})
    errActions.clear({ authId: name })
    otpJwtAuthActions.logout([ name ])
  }

  render() {
    let { getComponent, authSelectors, errSelectors, name, getSystem } = this.props
    const Input = getComponent("Input")
    const Row = getComponent("Row")
    const Col = getComponent("Col")
    const Button = getComponent("Button")
    const AuthError = getComponent("authError")
    const { otpJwtAuthSelectors } = getSystem()

    let authorizedAuth = authSelectors.authorized()
    let isAuthorized = !!authorizedAuth.get(name)
    let isOtpSent = !!otpJwtAuthSelectors.isOtpSent()

    let errors = errSelectors.allErrors().filter( err => err.get("authId") === name)
    let disabled = authorizedAuth.size > 0 && !isAuthorized

    return (
      <>
        <Row>
          <strong>OTP Login</strong>
        </Row>
        <Row>
          <label htmlFor="jwt_email">Email:</label>
          <Col>
            <Input id="jwt_email"
                   type="email"
                   value={this.state.email}
                   required="required"
                   data-name="email"
                   onChange={ this.onChange }
                   disabled={ isAuthorized || disabled } />
          </Col>
        </Row>
        <Row>
          <label htmlFor="jwt_otp">OTP:</label>
          <Col>
            <Input id="jwt_otp"
                   type="text"
                   value={this.state.otp}
                   required="required"
                   data-name="otp"
                   onChange={ this.onChange }
                   disabled={ isAuthorized || disabled } />
          </Col>
        </Row>
        {
          (isOtpSent || errors.valueSeq().size > 0) && 
            <div className="auth-msg-wrapper">
              {
                errors.valueSeq().map( (error, key) => {
                  return <AuthError error={ error }
                                    key={ key }/>
                } )
              }
              {
                isOtpSent ? <div style={{ backgroundColor: "#eeffee", color: "green" }}>
                              <span>OTP sent. Please check your email inbox.</span>
                            </div>
                          : null
              }
            </div>
        }
        <div className="auth-btn-wrapper">
        { isAuthorized ? <Button className="btn modal-btn auth authorize" onClick={ this.logout }>Logout</Button>
                       : <div>
                           <Button className="btn modal-btn auth send-otp" onClick={ this.sendOtp } disabled={ !this.state.email || disabled }>Send OTP</Button>
                           <Button className="btn modal-btn auth authorize" onClick={ this.authorize } disabled={ !this.state.email || !this.state.otp || disabled }>Authorize</Button>
                         </div>
        }
        </div>
      </>
    )
  }
}
