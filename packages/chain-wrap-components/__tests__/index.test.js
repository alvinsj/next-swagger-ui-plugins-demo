import React from "react"
import renderer from "react-test-renderer"

import chainWrapComponents from ".."

describe("chainWrapComponents", () => {
  const system = {}
  const pluginA = () => ({
    components: {
      CustomAuthItem: () => {
        return <mock-element id="plugin-a" />
      },
    },
    wrapComponents: {
      AuthItem: () =>
        function AuthItemPluginA() {
          return <mock-element id="plugin-a" />
        },
    },
  })
  // with different property names
  const pluginB = () => ({
    components: {
      CustomAuthItems: () => {},
    },
    wrapComponents: {
      AuthItems: () => () => {},
    },
  })
  const pluginC = () => ({
    components: {
      CustomAuthItem: () => {
        return <mock-element id="plugin-c" />
      },
    },
    wrapComponents: {
      AuthItem: () =>
        function AuthItemPluginA() {
          return <mock-element id="plugin-c" />
        },
    },
  })

  const pluginWithoutWrapComponents = () => ({})

  it("throws error when wrapComponents is missing", () => {
    expect(() => {
      chainWrapComponents(pluginA, pluginWithoutWrapComponents)(system)
    }).toThrowError()

    expect(() => {
      chainWrapComponents(pluginWithoutWrapComponents, pluginA)(system)
    }).toThrowError()

    expect(() => {
      chainWrapComponents(
        pluginA,
        pluginB,
        pluginWithoutWrapComponents
      )(system)
    }).toThrowError()
  })

  it("merge different wrapComponents, etc", () => {
    const plugins = chainWrapComponents(pluginA, pluginB)(system)

    expect(plugins.wrapComponents).toEqual({
      AuthItem: expect.any(Function),
      AuthItems: expect.any(Function),
    })

    expect(plugins.components).toEqual({
      CustomAuthItem: expect.any(Function),
      CustomAuthItems: expect.any(Function),
    })
  })

  it("chains wrapComponents", () => {
    const plugins = chainWrapComponents(pluginA, pluginC)(system)

    expect(plugins.wrapComponents).toEqual({
      AuthItem: expect.any(Function),
    })

    const WrappedComponent = plugins.wrapComponents.AuthItem(
      () => <mock-element id="original" />,
      system
    )
    expect(renderer.create(<WrappedComponent />).toJSON())
      .toMatchInlineSnapshot(`
      [
        <mock-element
          id="plugin-c"
        />,
        <mock-element
          id="plugin-a"
        />,
      ]
    `)

    // replace component with same name based on latest plugin
    const Component = plugins.components.CustomAuthItem
    expect(renderer.create(<Component />).toJSON()).toMatchInlineSnapshot(`
      <mock-element
        id="plugin-c"
      />
    `)
  })
})
