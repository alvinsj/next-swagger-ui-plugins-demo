import { authorizeOtpToken, sendOtp } from "../actions"
import { Map } from "immutable"

describe("actions", () => {
  describe("sendOtp", () => {
    it("successfully sent the otp request", async () => {
      const response = { token: "authenticated-token" }
      const auth = {
        schema: {
          get: jest.fn(
            (name) =>
              ({
                requestOtpQuery: new Map({
                  service: "service-name",
                }),
              }[name] || "")
          ),
        },
        name: "otpJwtTokenAuth",
        email: "test@example.com",
        otp: "123456",
      }
      const system = {
        fn: {
          fetch: jest.fn(
            () =>
              new Promise((resolve) =>
                resolve({ ok: true, data: JSON.stringify(response) })
              )
          ),
        },
        otpJwtAuthActions: { receiveOtp: jest.fn(), saveInputs: jest.fn() },
        authActions: { authorize: jest.fn() },
        errActions: { newAuthErr: jest.fn() },
      }
      await sendOtp(auth)(system)

      // result
      expect(system.otpJwtAuthActions.receiveOtp).toBeCalledWith(false)
      expect(system.otpJwtAuthActions.saveInputs).toBeCalledWith(auth)

      expect(system.fn.fetch).toBeCalledTimes(1)
      expect(system.fn.fetch.mock.calls[0][0]).toMatchInlineSnapshot(`
        {
          "body": "{"email":"test@example.com"}",
          "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          "method": "post",
          "url": "otps?service=service-name",
        }
      `)

      expect(system.otpJwtAuthActions.receiveOtp).toBeCalledTimes(2)
      expect(system.otpJwtAuthActions.receiveOtp).toHaveBeenLastCalledWith(
        true
      )
    })

    it("failed to send otp request", async () => {
      // setup
      const auth = {
        schema: {
          get: jest.fn(() => ""),
        },
        name: "otpJwtTokenAuth",
        email: "test@example.com",
        otp: "123456",
      }
      const system = {
        fn: {
          fetch: jest.fn(
            // failed response
            () =>
              new Promise((_resolve, reject) =>
                reject({
                  response: { body: { message: "Failed to authorize" } },
                })
              )
          ),
        },
        otpJwtAuthActions: { receiveOtp: jest.fn(), saveInputs: jest.fn() },
        authActions: { authorize: jest.fn() },
        errActions: { newAuthErr: jest.fn() },
      }

      await sendOtp(auth)(system)

      expect(system.otpJwtAuthActions.receiveOtp).toBeCalledWith(false)
      expect(system.otpJwtAuthActions.saveInputs).toBeCalledWith(auth)

      expect(system.authActions.authorize).not.toBeCalledWith()
      expect(system.errActions.newAuthErr).toBeCalled()
      expect(system.errActions.newAuthErr.mock.calls[0][0])
        .toMatchInlineSnapshot(`
        {
          "authId": "otpJwtTokenAuth",
          "level": "",
          "message": "Error sending OTP. Failed to authorize",
          "source": "",
        }
      `)
    })
  })

  describe("authorizeOtpToken", () => {
    it("successfully authorizing otp token", async () => {
      // setup
      const response = { token: "authenticated-token" }
      const auth = {
        schema: {
          get: jest.fn(
            (name) =>
              ({
                authQuery: new Map({
                  service: "service-name",
                  expiry: "10800",
                }),
              }[name] || "")
          ),
        },
        name: "otpJwtTokenAuth",
        email: "test@example.com",
        otp: "123456",
      }
      const system = {
        fn: {
          fetch: jest.fn(
            () =>
              new Promise((resolve) =>
                resolve({ ok: true, data: JSON.stringify(response) })
              )
          ),
        },
        otpJwtAuthActions: { receiveOtp: jest.fn(), saveInputs: jest.fn() },
        authActions: { authorize: jest.fn() },
        errActions: { newAuthErr: jest.fn() },
      }

      // action
      await authorizeOtpToken(auth)(system)

      // result
      expect(system.otpJwtAuthActions.receiveOtp).toBeCalledWith(false)
      expect(system.otpJwtAuthActions.saveInputs).toBeCalledWith(auth)

      expect(system.fn.fetch.mock.calls[0][0]).toMatchInlineSnapshot(`
        {
          "body": "{"email":"test@example.com","otp":"123456"}",
          "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          "method": "post",
          "url": "tokens?service=service-name&expiry=10800",
        }
      `)

      expect(system.errActions.newAuthErr).not.toBeCalledWith()
      expect(system.authActions.authorize.mock.calls[0][0]).toMatchObject({
        [auth.name]: {
          name: auth.name,
          value: response.token,
        },
      })
    })

    it("failed to verify otp token", async () => {
      // setup
      const auth = {
        schema: {
          get: jest.fn(() => ""),
        },
        name: "otpJwtTokenAuth",
        email: "test@example.com",
        otp: "123456",
      }
      const system = {
        fn: {
          fetch: jest.fn(
            // failed response
            () =>
              new Promise((_resolve, reject) =>
                reject({
                  response: { body: { message: "Failed to authorize" } },
                })
              )
          ),
        },
        otpJwtAuthActions: { receiveOtp: jest.fn(), saveInputs: jest.fn() },
        authActions: { authorize: jest.fn() },
        errActions: { newAuthErr: jest.fn() },
      }

      // action
      await authorizeOtpToken(auth)(system)

      expect(system.otpJwtAuthActions.receiveOtp).toBeCalledWith(false)
      expect(system.otpJwtAuthActions.saveInputs).toBeCalledWith(auth)

      expect(system.authActions.authorize).not.toBeCalledWith()
      expect(system.errActions.newAuthErr).toBeCalled()
      expect(system.errActions.newAuthErr.mock.calls[0][0])
        .toMatchInlineSnapshot(`
        {
          "authId": "otpJwtTokenAuth",
          "level": "",
          "message": "Unauthorized. Failed to authorize",
          "source": "",
        }
      `)
    })
  })
})
