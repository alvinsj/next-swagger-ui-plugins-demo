import { createSelector } from 'reselect'

import OtpJwtAuth from './components/OtpJwtAuth'
import Auths from './components/Auths'
import wrapAuthItem from './wrap-components/wrapAuthItem'

import reducers from './reducers'
import * as selectors from './selectors'
import * as actions from './actions'

const otpJwtAuthPlugin = (system) => {
  return {
    statePlugins: {
      otpJwtAuth: {
        actions,
        reducers,
        selectors
      }
    },
    wrapComponents: {
      AuthItem: wrapAuthItem
    },
    components: {
      auths: Auths,
      OtpJwtAuth: OtpJwtAuth,
    }
  }
}

export default otpJwtAuthPlugin
