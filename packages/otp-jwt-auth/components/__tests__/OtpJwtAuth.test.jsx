import React from 'react'
import OtpJwtAuth from '../OtpJwtAuth'
import renderer from 'react-test-renderer'
import { Map } from 'immutable'

describe('<OtpJwtAuth />', () => {
  const otpJwtAuthSelectors = { 
    email: () => 'test@example.com', 
    otp: () => 'example-otp',
    isOtpSent: () => false
  }
  const authSelectors = {
    authorized: () => ({ get: () => false })
  }
  const errSelectors = {
    allErrors: () => new Map()
  }

  const getComponent = (name) => 
    function GetComponent({children, ...props}) { 
      return <mock-element className={name} data-props={props}>{children}</mock-element> 
    }

  const system = {
    otpJwtAuthSelectors, 
    authSelectors,
    errSelectors,
    getComponent
  }

  it('renders form', () => {
    
    const tree = renderer
    .create(
      <OtpJwtAuth 
        {...system}
        getSystem={() => system}
        schema={{}}
        name="OtpJwtAuth"
      />)
    .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders otp sent message', () => {
    otpJwtAuthSelectors.isOtpSent = () => true
    const tree = renderer
    .create(
      <OtpJwtAuth 
        {...system}
        getSystem={() => system}
        schema={{}}
        name="OtpJwtAuth"
      />)
    .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders error messages', () => {
    otpJwtAuthSelectors.isOtpSent = () => false
    errSelectors.allErrors = () => new Map({'error': {get: () => 'OtpJwtAuth'}})

    const tree = renderer
      .create(
        <OtpJwtAuth 
          {...system}
          getSystem={() => system}
          schema={{}}
          name="OtpJwtAuth"
        />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders logout', () => {
    otpJwtAuthSelectors.isOtpSent = () => false
    errSelectors.allErrors = () => new Map()
    authSelectors.authorized = () => ({ get: () => true })

    const tree = renderer
      .create(
        <OtpJwtAuth 
          {...system}
          getSystem={() => system}
          schema={{}}
          name="OtpJwtAuth"
        />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
