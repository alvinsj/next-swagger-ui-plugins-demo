import { RECEIVE_OTP, AUTHORIZE } from "./actions"
import { Map, fromJS } from 'immutable'

const reducers = {
  [RECEIVE_OTP]: (state, { type, payload }) => {
    if (type === RECEIVE_OTP) {
      let map = state.get("authorized") ||  Map()
      map = map.set('otpSent', true)
      return state.set('authorized', map)
    }
    return state
  }
}

export default reducers
