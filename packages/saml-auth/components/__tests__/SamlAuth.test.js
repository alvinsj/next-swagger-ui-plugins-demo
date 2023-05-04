import React from 'react'
import SamlAuth from '../SamlAuth'
import renderer from 'react-test-renderer'
import {Map} from 'immutable'

describe('SamlAuth', () => {
  const system = {
    getSystem: () => system,
    getComponent: (name) => function GetComponent({children, ...props}) {
      return <mock-element id={name} data-props={props} >{children}</mock-element>
    },
    authSelectors: {
      authorized: () => false
    }
  }

  it('renders login button', () => {
    const tree = renderer.create(
    <SamlAuth
      name="saml"
      schema={new Map()}
      {...system} 
    
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders logout button', () => {
    system
      .authSelectors
      .authorized = () => new Map({'saml': true})
  
    const tree = renderer.create(
      <SamlAuth
        name="saml"
        schema={new Map()}
        {...system} 
      
      />).toJSON()
      expect(tree).toMatchSnapshot()
  })
})
