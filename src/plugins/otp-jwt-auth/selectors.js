import { createSelector } from "reselect"
import { fromJS, Set, Map, OrderedMap, List } from "immutable"

const state = state => {
  return state || Map()
}

export const isOtpSent = createSelector(
  state,
  state => !!state.get("otpSent")
)

export const email = createSelector(
  state,
  state => state.get("email")
)

export const otp = createSelector(
  state,
  state => state.get("otp")
)
