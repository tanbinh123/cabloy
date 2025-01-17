const require3 = require('require3');
const WxworkAPI = require3('@zhennann/co-wxwork-api');

module.exports = function (ctx) {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  function getCacheDb() {
    return ctx.cache.db.module(moduleInfo.relativeName);
  }
  // bean.wxwork.app.{providerScene}
  // bean.wxwork.mini.{providerScene}
  // bean.wxwork.util
  return function () {
    return new Proxy(
      {},
      {
        get(obj, prop) {
          if (obj[prop]) return obj[prop];
          if (prop === 'app') {
            // app
            obj[prop] = new Proxy(
              {},
              {
                get(obj, prop) {
                  if (!obj[prop]) {
                    // others
                    obj[prop] = _createWxworkApiApp({ providerName: 'wxwork', providerScene: prop });
                  }
                  return obj[prop];
                },
              }
            );
          } else if (prop === 'mini') {
            // mini
            obj[prop] = new Proxy(
              {},
              {
                get(obj, prop) {
                  if (!obj[prop]) {
                    obj[prop] = _createWxworkApiApp({ providerName: 'wxworkmini', providerScene: prop });
                  }
                  return obj[prop];
                },
              }
            );
          } else if (prop === 'util') {
            // util
            obj[prop] = _createWxworkApiUtil();
          }
          return obj[prop];
        },
      }
    );
  };

  function _createWxworkApiApp({ providerName, providerScene }) {
    const appName = `${providerName}:${providerScene || ''}`;
    // bean provider
    const beanProvider = ctx.bean.authProvider.createAuthProviderBean({
      module: moduleInfo.relativeName,
      providerName,
      providerScene,
    });
    if (!beanProvider.providerSceneValid) ctx.throw(423);
    // config
    const config = beanProvider.configProviderScene;
    // api
    const api = new WxworkAPI.CorpAPI(
      config.corpId,
      config.secret,
      async function () {
        const cacheKey = `wxwork-token:${appName}`;
        return await getCacheDb().get(cacheKey);
      },
      async function (token) {
        const cacheKey = `wxwork-token:${appName}`;
        if (token) {
          await getCacheDb().set(cacheKey, token, token.expireTime - Date.now());
        } else {
          await getCacheDb().remove(cacheKey);
        }
      }
    );
    // registerTicketHandle
    api.registerTicketHandle(
      async function (type) {
        const cacheKey = `wxwork-jsticket:${appName}:${type}`;
        return await getCacheDb().get(cacheKey);
      },
      async function (type, token) {
        const cacheKey = `wxwork-jsticket:${appName}:${type}`;
        if (token) {
          await getCacheDb().set(cacheKey, token, token.expireTime - Date.now());
        } else {
          await getCacheDb().remove(cacheKey);
        }
      }
    );
    // registerSessionKeyHandle
    api.registerSessionKeyHandle(
      async function () {
        const cacheKey = `wxwork-sessionKey:${appName}:${ctx.state.user.agent.id}`;
        return await getCacheDb().get(cacheKey);
      },
      async function (sessionKey) {
        const cacheKey = `wxwork-sessionKey:${appName}:${ctx.state.user.agent.id}`;
        await getCacheDb().set(cacheKey, sessionKey);
      }
    );
    // ready
    return api;
  }

  function _createWxworkApiUtil() {
    return {
      // providerScene: empty/wxwork/wxworkweb/wxworkmini/xxx,xxx,xxx
      in({ providerName, providerScene }) {
        //  providerName is wxwork/selfBuilt
        if (!providerName && !providerScene) {
          providerName = 'wxwork';
          providerScene = 'selfBuilt';
        }
        // 1. provider
        const provider = ctx.state.user && ctx.state.user.provider;
        if (!provider || provider.module !== moduleInfo.relativeName) return false;
        // 2. wxwork/wxworkweb/wxworkmini
        if (!['wxwork', 'wxworkweb', 'wxworkmini'].includes(providerName) || provider.providerName !== providerName) {
          return false;
        }
        // 3. null means all
        if (!providerScene || providerScene === provider.providerScene) return true;
        // 3.2 some scenes
        if (!Array.isArray(providerScene)) providerScene = providerScene.split(',');
        return providerScene.includes(provider.providerScene);
      },
    };
  }
};
