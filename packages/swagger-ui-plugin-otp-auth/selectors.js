import { createSelector } from "reselect"
import { Map } from "immutable"

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
