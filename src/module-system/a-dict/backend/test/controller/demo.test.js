const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

describe.only('[your demo tests start from here]', () => {
  it('[demo]', async () => {
    app.mockSession({});

    // login as root
    await app
      .httpRequest()
      .post(mockUrl('/a/authsimple/passport/a-authsimple/authsimple'))
      .send({
        data: {
          auth: 'root',
          password: '123456',
        },
      });
  });
});