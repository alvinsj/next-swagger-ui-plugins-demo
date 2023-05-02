import { authorizeOtpToken, saveInputs } from "../actions";

describe("actions", () => {
  it("authorizeOtpToken", async () => {
    const response = { token: 'authenticated-token' }
    // setup
    const auth = {
      schema: {
        get: jest.fn(() => ""),
      },
      name: "otpJwtTokenAuth",
      email: "test@example.com",
      otp: "123456",
    };
    const system = {
      fn: {
        fetch: jest.fn(
          () => new Promise((resolve) => resolve({ ok: true, data: JSON.stringify(response) }))
        ),
      },
      otpJwtAuthActions: { receiveOtp: jest.fn(), saveInputs: jest.fn() },
      authActions: { authorize: jest.fn() },
      errActions: { newAuthErr: jest.fn() },
    };

    // action
    await authorizeOtpToken(auth)(system);

    // result
    expect(system.otpJwtAuthActions.receiveOtp).toBeCalledWith(false);
    expect(system.otpJwtAuthActions.saveInputs).toBeCalledWith(auth);

    expect(system.fn.fetch.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "body": "{"email":"test@example.com","otp":"123456"}",
        "headers": {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        "method": "post",
        "query": {
          "expiry": "",
          "service": "",
        },
        "url": "tokens",
      }
    `);

    expect(system.errActions.newAuthErr).not.toBeCalledWith();
    expect(system.authActions.authorize.mock.calls[0][0]).toMatchObject({
      [auth.name]: {
        name: auth.name,
        value: response.token
      }
    });
  });
});
