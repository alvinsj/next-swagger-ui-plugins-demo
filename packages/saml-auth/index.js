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

const samlAuthPlugin = () => {
  return {
    wrapComponents: {
      AuthItem: wrapAuthItem
    },
    components: {
      SamlAuth,
    },
    afterLoad: (system) => {    
      // testing purpose only 
      // This is a hack to get the auth token from the URL and preauthorize the SAMLAuth
      setTimeout(() => {
        const authToken = getAuthToken(window.location.search, 'a')
        if (authToken) {
          preauthorizeSaml(system.getSystem(), 'SamlAuth', authToken)
          window.history.pushState({}, document.title, window.location.pathname)
        }
       }, 1000)
    }
  }
}

export default samlAuthPlugin
