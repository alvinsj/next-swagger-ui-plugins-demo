import { createSelector } from 'reselect'

import OtpJwtAuth from '../../components/otp-jwt-auth'
import Auths from '../../components/auths'

import reducers from './reducers'
import * as actions from './actions'

const makeAuthItem = (system) => function AuthItem(props) {
  const OtpJwtAuth = system.getComponent('otpJwtAuth')

  return <OtpJwtAuth {...props}
    getSystem={system.getSystem}
    {...props}
  />
}


const state = state => state
// create a simple swagger-ui plugin
const otpJwtAuthPlugin = (system) => {
  return {
    statePlugins: {
      auth: {
        actions,

        selectors: {
          email: createSelector(
            state,
            auth => auth.get("email")
          ),
          copyright: createSelector(
            state,
            auth => auth.get("copyright")
          ),
        },
        reducers
      }
    },
    components: {
      auths: Auths,
      AuthItem: makeAuthItem(system),
      otpJwtAuth: OtpJwtAuth,
    },
    wrapComponents: {},
    rootInjects: {},
    afterLoad: () => { },
    fn: {},
  }
}

export default otpJwtAuthPlugin
