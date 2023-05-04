import OtpAuth from './components/OtpAuth'
import Auths from './components/Auths'
import wrapAuthItem from './wrap-components/wrapAuthItem'

import reducers from './reducers'
import * as selectors from './selectors'
import * as actions from './actions'

const otpJwtAuthPlugin = () => {
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
      OtpAuth: OtpAuth,
    }
  }
}

export default otpJwtAuthPlugin
