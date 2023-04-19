import { RECEIVE_OTP, SAVE_INPUTS } from "./actions"
import { Map, fromJS } from 'immutable'

const reducers = {
  [RECEIVE_OTP]: (state, { type, payload }) => {
    if (type === RECEIVE_OTP) {
      return state.set('otpSent', payload)
    }
    return state
  },
  [SAVE_INPUTS]: (state, { type, payload = {} }) => {
    if (type === SAVE_INPUTS) {
      state = state.set('email', payload.email)
      return state.set('otp', payload.otp)
    }
    return state
  }
}

export default reducers
