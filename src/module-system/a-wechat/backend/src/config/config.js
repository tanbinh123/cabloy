const jsApiList = require('./config/jsApiList.js');

module.exports = appInfo => {
  const config = {};

  // middlewares
  config.middlewares = {
    inWechat: {
      bean: 'inWechat',
      global: false,
      dependencies: 'instance',
    },
  };

  // auth
  config.auth = {
    autoActivate: true,
  };

  // account
  config.account = {};

  // account.public
  config.account.public = {
    appID: '',
    appSecret: '',
    token: appInfo.name,
    encodingAESKey: '',
    message: {
      reply: {
        default: 'You are welcome!',
        subscribe: 'You are subscribed!',
      },
    },
    jssdk: {
      // debug: true,
      debug: false,
      jsApiList,
    },
  };

  // account.web
  config.account.web = {
    appID: '',
    appSecret: '',
  };

  // account.minis
  config.account.minis = {
    default: {
      appID: '',
      appSecret: '',
      token: appInfo.name,
      encodingAESKey: '',
    },
  };

  return config;
};