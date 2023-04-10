import SamlAuthItem from './components/SamlAuthItem'
import wrapAuthItem from './wrap-components/wrapAuthItem'

const samlAuthPlugin = (system) => {
  return {
    wrapComponents: {
      AuthItem: wrapAuthItem
    },
    components: {
      SamlAuthItem
    }
  }
}

export default samlAuthPlugin
