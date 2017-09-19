/*
* @Author: zhennann
* @Date:   2017-09-19 10:24:52
* @Last Modified by:   zhennann
* @Last Modified time: 2017-09-19 22:35:28
*/

const is = require('is-type-of');
const moduleUtil = require('./module-util.js');

module.exports = function(loader, modules) {

  // service classes
  const ebServiceClasses = {};

  // load services
  loadServices();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    const createContext = loader.app.createContext;
    loader.app.createContext = (...args) => {
      const context = createContext.call(loader.app, ...args);

      // maybe /favicon.ico
      const info = moduleUtil.parseInfo(moduleUtil.parseName(context.request.url));
      if (info) {
        const ebServiceClass = ebServiceClasses[info.fullName];
        context.service.__ebCache = new Map();
        Object.keys(ebServiceClass).forEach(key => {
          defineProperty(context, key, ebServiceClass[key]);
        });
      }

      return context;
    };
  }

  function defineProperty(context, key, value) {
    Object.defineProperty(context.service, key, {
      get() {
        let instance = context.service.__ebCache.get(key);
        if (!instance) {
          instance = new value(context);
          context.service.__ebCache.set(key, instance);
        }
        return instance;
      },
    });
  }

  function loadServices() {
    Object.keys(modules).forEach(key => {

      const module = modules[key];
      const ebServiceClass = ebServiceClasses[module.info.fullName] = {};

      // services
      const services = module.main.services;
      if (services) {
        for (const key in services) {
        // const item = loadService(module.info, key, services[key]);
        // ebServiceClass[key] = item.exports;
        // service only used in local controller
          ebServiceClass[key] = services[key](loader.app);
        }
      }
    });
  }

  // eslint-disable-next-line
  function loadService(info, key, service) {

    const item = parseService(info, key, service);

    const target = loader.app.serviceClasses;

    // item { properties: [ 'a', 'b', 'c'], exports }
    // => target.a.b.c = exports
    item.properties.reduce((target, property, index) => {
      let obj;
      const properties = item.properties.slice(0, index + 1).join('.');
      if (index === item.properties.length - 1) {
        if (property in target) {
          if (!loader.options.override) throw new Error(`can't overwrite property '${properties}' from ${target[property][loader.FileLoader.FULLPATH]} by ${item.pathName}`);
        }
        obj = item.exports;
        if (obj && !is.primitive(obj)) {
          obj[loader.FileLoader.FULLPATH] = item.pathName;
          obj[loader.FileLoader.EXPORTS] = true;
        }
      } else {
        obj = target[property] || {};
      }
      target[property] = obj;
      return obj;
    }, target);

    return item;
  }

  function parseService(info, key, service) {
    const properties = [ info.pid, info.name, key ];
    const pathName = [ 'service', ...properties ].join('.');
    const exports = service(loader.app);

    // set properties of class
    if (is.class(exports)) {
      exports.prototype.pathName = pathName;
    }

    return { pathName, properties, exports };
  }

};
