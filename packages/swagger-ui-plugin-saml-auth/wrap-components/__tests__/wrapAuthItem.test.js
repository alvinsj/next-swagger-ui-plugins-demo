import React from "react"
import wrapAuthItem from "../wrapAuthItem"
import renderer from "react-test-renderer"
import { Map } from "immutable"

describe("wrapAuthItem", () => {
  const system = {
    getSystem: () => system,
    otpJwtAuthSelectors: {},
    authSelectors: {},
    errSelectors: {},
    getComponent: (name) =>
      function MockComponent({ children, ...props }) {
        return (
          <mock-component id={name} data-props={props}>
            {children}
          </mock-component>
        )
      },
  }
  const Ori = () => <mock-element id={"Ori"} />
  const WrappedComponent = wrapAuthItem(Ori, system)

  it("returns null component for others", () => {
    expect(WrappedComponent).toBeInstanceOf(Function)

    // match snapshot
    const tree = renderer
      .create(
        <WrappedComponent schema={new Map()} name="SamlAuth" {...system} />
      )
      .toJSON()
    expect(tree).toMatchInlineSnapshot(`null`)
  })

  it("returns an SamlAuth component", () => {
    expect(WrappedComponent).toBeInstanceOf(Function)

    // match snapshot
    const tree = renderer
      .create(
        <WrappedComponent
          schema={new Map({ type: "http", scheme: "bearer", saml: true })}
          name="SamlAuth"
          {...system}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
