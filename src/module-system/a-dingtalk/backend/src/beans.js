const versionManager = require('./bean/version.manager.js');
const eventLoginInfo = require('./bean/event.loginInfo.js');
const eventAccountMigration = require('./bean/event.accountMigration.js');
const queueContacts = require('./bean/queue.contacts.js');
const middlewareInDingtalk = require('./bean/middleware.inDingtalk.js');
const ioChannelApp = require('./bean/io.channel.app.js');
const authProviderDingtalkadmin = require('./bean/auth.provider.dingtalkadmin.js');
const authProviderDingtalk = require('./bean/auth.provider.dingtalk.js');
const authProviderDingtalkweb = require('./bean/auth.provider.dingtalkweb.js');
const authProviderDingtalkmini = require('./bean/auth.provider.dingtalkmini.js');
const localHelper = require('./bean/local.helper.js');
const localUtils = require('./bean/local.utils.js');
const beanDingtalk = require('./bean/bean.dingtalk.js');

module.exports = app => {
  const beans = {
    // version
    'version.manager': {
      mode: 'app',
      bean: versionManager,
    },
    // event
    'event.loginInfo': {
      mode: 'ctx',
      bean: eventLoginInfo,
    },
    'event.accountMigration': {
      mode: 'ctx',
      bean: eventAccountMigration,
    },
    // queue
    'queue.contacts': {
      mode: 'app',
      bean: queueContacts,
    },
    // middleware
    'middleware.inDingtalk': {
      mode: 'ctx',
      bean: middlewareInDingtalk,
    },
    // io
    'io.channel.app': {
      mode: 'ctx',
      bean: ioChannelApp,
    },
    // auth.provider
    'auth.provider.dingtalkadmin': {
      mode: 'ctx',
      bean: authProviderDingtalkadmin,
    },
    'auth.provider.dingtalk': {
      mode: 'ctx',
      bean: authProviderDingtalk,
    },
    'auth.provider.dingtalkweb': {
      mode: 'ctx',
      bean: authProviderDingtalkweb,
    },
    'auth.provider.dingtalkmini': {
      mode: 'ctx',
      bean: authProviderDingtalkmini,
    },
    // local
    'local.helper': {
      mode: 'ctx',
      bean: localHelper,
    },
    'local.utils': {
      mode: 'ctx',
      bean: localUtils,
    },
    // global
    dingtalk: {
      mode: 'ctx',
      bean: beanDingtalk,
      global: true,
    },
  };
  return beans;
};
