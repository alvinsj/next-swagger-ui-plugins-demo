
import Topbar from './components/Topbar'
import ProductLayout from './components/ProductLayout'
import Operations from './components/Operations'
import Markdown from './components/Markdown'


import { createSelector } from "reselect"
import {Map} from 'immutable'

export const specResolved = createSelector(
  state => state,
  spec => spec.get("resolved", Map())
)

// Default Spec ( as an object )
export const spec = state => {
  let res = specResolved(state)
  return res
}
export const email = createSelector(
  spec,
  spec => spec.get("email")
)

export const copyright = createSelector(
  spec,
  spec => spec.get("copyright")
)

const productLayoutPlugin = () => {
  return {
    statePlugins: {
      spec: {
        selectors: {
          email,
          copyright
        }
      }
    },
    components: {
      Markdown,
      operations: Operations,
      ProductLayout,
      Topbar
    }
  }
}

export default productLayoutPlugin
