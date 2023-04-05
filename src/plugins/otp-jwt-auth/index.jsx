import { createSelector } from 'reselect'

import OtpJwtAuth from './components/OtpJwtAuth'
import Auths from './components/Auths'

import reducers from './reducers'
import * as actions from './actions'

const makeAuthItem = (system) => function AuthItem(props) {
  const OtpJwtAuth = system.getComponent('otpJwtAuth')

  return <OtpJwtAuth {...props}
    getSystem={system.getSystem}
    {...props}
  />
}

const otpJwtAuthPlugin = (system) => {
  return {
    statePlugins: {
      auth: {
        actions,
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
