
import urljoin from "url-join"

export const SAVE_INPUTS = "save_inputs"
export const SHOW_AUTH_POPUP = "show_popup"
export const RECEIVE_OTP = "receive_otp"
export const AUTHORIZE = "authorize"
export const LOGOUT = "logout"
export const PRE_AUTHORIZE_OAUTH2 = "pre_authorize_oauth2"
export const AUTHORIZE_OAUTH2 = "authorize_oauth2"
export const VALIDATE = "validate"
export const CONFIGURE_AUTH = "configure_auth"

export const receiveOtp = (payload) => {
  return {
    type: RECEIVE_OTP,
    payload: payload
  }
}

export const saveInputs = (payload) => {
  return {
    type: SAVE_INPUTS,
    payload: payload
  }
}

export const logout = (names) => ({ otpJwtAuthActions, authActions }) => {
  otpJwtAuthActions.receiveOtp(false)
  otpJwtAuthActions.saveInputs({})

  authActions.logout(names)
}

export const sendOtp = ( auth ) => ( { fn, otpJwtAuthActions, errActions } ) => {
  otpJwtAuthActions.receiveOtp(false)
  otpJwtAuthActions.saveInputs(auth)

  let { schema, name, email } = auth

  let fetchUrl = urljoin(schema.get("tokenUrl"), schema.get("requestOtpPath") || "/otps")
  let body = JSON.stringify({ email })

  let headers = {
    "Accept":"application/json, text/plain, */*",
    "Content-Type": "application/json"
  }

  fn.fetch({
    url: fetchUrl,
    method: "post",
    headers,
    body
  })
  .then(function (response) {
    let response_data = JSON.parse(response.data)
    let error = response_data && ( response_data.error || "" )
    let parseError = response_data && ( response_data.parseError || "" )

    if ( !response.ok ) {
      errActions.newAuthErr( {
        authId: name,
        level: "",
        source: "",
        message: response.statusText
      } )
      return
    }

    if ( error || parseError ) {
      errActions.newAuthErr({
        authId: name,
        level: "error",
        source: "auth",
        message: JSON.stringify(response_data)
      })
      return
    }

    otpJwtAuthActions.receiveOtp(true)
  })
  .catch(e => {
    let err = new Error(e)
    err.message = "Error sending OTP. " + e.response.body.message

    errActions.newAuthErr( {
      authId: name,
      level: "",
      source: "",
      message: err.message
    } )
  })
}

export const authorizeOtpToken = ( auth ) => ( { fn, otpJwtAuthActions, authActions, errActions } ) => {
  otpJwtAuthActions.receiveOtp(false)
  otpJwtAuthActions.saveInputs(auth)

  let { schema, name, email, otp } = auth

  let fetchUrl = urljoin(schema.get("tokenUrl"), schema.get("authPath") || "/tokens")

  let query = {
    service: schema.get("service"),
    expiry: schema.get("tokenExpiry")
  }

  let body = JSON.stringify({ email, otp })

  let headers = {
    "Accept":"application/json, text/plain, */*",
    "Content-Type": "application/json"
  }

  fn.fetch({
    url: fetchUrl,
    method: "post",
    headers,
    query,
    body
  })
  .then(function (response) {
    let response_data = JSON.parse(response.data)
    let error = response_data && ( response_data.error || "" )
    let parseError = response_data && ( response_data.parseError || "" )

    if ( !response.ok ) {
      errActions.newAuthErr( {
        authId: name,
        level: "error",
        source: "auth",
        message: response.statusText
      } )
      return
    }

    if ( error || parseError ) {
      errActions.newAuthErr({
        authId: name,
        level: "error",
        source: "auth",
        message: JSON.stringify(response_data)
      })
      return
    }

    auth.token = response_data.token
    auth.email = email
    authActions.authorize({ 
      [name]: {
        name,
        schema,
        value: response_data.token
      }
    })
  })
  .catch(e => {
    let err = new Error(e)
    err.message = "Unauthorized. " + e.response.body.message

    errActions.newAuthErr( {
      authId: name,
      level: "",
      source: "",
      message: err.message
    } )
  })
}
