
import urljoin from "url-join"
import { Map } from "immutable"

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

  let method = schema.get("requestOtpMethod") || "post"
  let requestOtpQuery = schema.get('requestOtpQuery') 
  let query = requestOtpQuery && requestOtpQuery.toJS()

  let fetchUrl = appeandQuery(
    urljoin(schema.get("tokenUrl"), schema.get("requestOtpPath") || "/otps"), query
  )
  let authBody = schema.get('authBody') || new Map()
  let extraBody = authBody.toJS()
  let body = JSON.stringify({ email, ...extraBody})
  let headers = {
    "Accept":"application/json, text/plain, */*",
    "Content-Type": "application/json"
  }

  return fn.fetch({
    url: fetchUrl,
    method: method || "post",
    headers,
    ...(method === 'get' || method === 'head' ? {} : {body})
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

const appeandQuery = (url, query) => {
  if (query) {
    url = `${url}?${new URLSearchParams(query)}`
  }
  return url
}


export const authorizeOtpToken = ( auth ) => ( { fn, otpJwtAuthActions, authActions, errActions } ) => {
  otpJwtAuthActions.receiveOtp(false)
  otpJwtAuthActions.saveInputs(auth)

  let { schema, name, email, otp } = auth

  let method = schema.get("authMethod") || "post"
  let authQuery = schema.get('authQuery') 
  let query = authQuery && authQuery.toJS()

  let fetchUrl = appeandQuery(
    urljoin(schema.get("tokenUrl"), schema.get("authPath") || "/tokens"),
    query
  )
  
  let authBody = schema.get('authBody') || new Map()
  let extraBody = authBody.toJS()
  let body = JSON.stringify({ email, otp, ...extraBody })

  let headers = {
    "Accept":"application/json, text/plain, */*",
    "Content-Type": "application/json"
  }

  return fn.fetch({
    url: fetchUrl,
    method: method || "post",
    headers,
    ...(method === 'get' || method === 'head' ? {} : {body})
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

    errActions.newAuthErr({
      authId: name,
      level: "",
      source: "",
      message: err.message
    })
  })
}
