import SamlAuth from './components/SamlAuth'
import wrapAuthItem from './wrap-components/wrapAuthItem'

const getAuthToken =  (search, authTokenSearchName = 'token') => {
  return search.substring(1).split('&').reduce(
      (queries, keyValue) => { 
        const [key, value] = keyValue.split('=')
        return ({...queries, [key]: value})
    
    }, {})[authTokenSearchName]
}

export function preauthorizeSaml(system, key, value) {
  const {
    authActions: { authorize },
    specSelectors: { specJson, isOAS3 }
  } = system

  const definitionBase = isOAS3() ? ["components", "securitySchemes"] : ["securityDefinitions"]
  const schema = specJson().getIn([...definitionBase, key])

  if(!schema) {
    return null
  }

  return authorize({
    [key]: {
      name: key,
      value,
      schema: schema.toJS()
    }
  })
}

let engaged = false

const samlAuthPlugin = () => {
  return {
    wrapComponents: {
      AuthItem: wrapAuthItem
    },
    components: {
      SamlAuth,
    },
    // authorize on saml response. 
    // refer to https://github.com/swagger-api/swagger-ui/blob/master/src/core/plugins/on-complete/index.js
    statePlugins: {
      spec: {
        wrapActions: {
          updateSpec: (ori) => (...args) => {
            engaged = true
            return ori(...args)
          },
          updateJsonSpec: (ori, system) => (...args) => {
            if(engaged) {
              const authorize =  () => {
                const authToken = getAuthToken(window.location.search, 'SAMLToken')
                if (authToken) {
                  preauthorizeSaml(system.getSystem(), 'SamlAuth', authToken)
                  window.history.pushState({}, document.title, window.location.pathname)
                }
               }
              setTimeout(authorize, 0)
              engaged = false
            }

            return ori(...args)
          }
        }
      }
    }
  }
}

export default samlAuthPlugin
