import { createSelector } from 'reselect'

import OtpJwtAuth from './components/OtpJwtAuth'
import Auths from './components/Auths'
import wrapAuthItem from './wrap-components/wrapAuthItem'

import reducers from './reducers'
import * as actions from './actions'

const otpJwtAuthPlugin = (system) => {
  return {
    statePlugins: {
      auth: {
        actions,
        reducers
      }
    },
    wrapComponents: {
      AuthItem: wrapAuthItem
    },
    components: {
      auths: Auths,
      OtpJwtAuth: OtpJwtAuth,
    },
    rootInjects: {},
    afterLoad: () => { },
    fn: {},
  }
}

export default otpJwtAuthPlugin
