import React from 'react'
import OtpAuth from '../OtpAuth'
import renderer from 'react-test-renderer'
import { Map } from 'immutable'

describe('<OtpAuth />', () => {
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
      return <mock-element id={name} data-props={props}>{children}</mock-element> 
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
      <OtpAuth 
        {...system}
        getSystem={() => system}
        schema={{}}
        name="OtpAuth"
      />)
    .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders otp sent message', () => {
    otpJwtAuthSelectors.isOtpSent = () => true
    const tree = renderer
    .create(
      <OtpAuth 
        {...system}
        getSystem={() => system}
        schema={{}}
        name="OtpAuth"
      />)
    .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders error messages', () => {
    otpJwtAuthSelectors.isOtpSent = () => false
    errSelectors.allErrors = () => new Map({'error': {get: () => 'OtpAuth'}})

    const tree = renderer
      .create(
        <OtpAuth 
          {...system}
          getSystem={() => system}
          schema={{}}
          name="OtpAuth"
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
        <OtpAuth 
          {...system}
          getSystem={() => system}
          schema={{}}
          name="OtpAuth"
        />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
