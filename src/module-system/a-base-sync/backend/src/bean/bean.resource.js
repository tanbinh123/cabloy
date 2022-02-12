let __atomClassesResource = null;

module.exports = ctx => {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);

  const __atomClass = {
    module: moduleInfo.relativeName,
    atomClassName: 'resource',
  };

  class Resource extends ctx.app.meta.BeanModuleBase {
    constructor(moduleName) {
      super(ctx, 'resource');
      this.moduleName = moduleName || ctx.module.info.relativeName;
    }

    get model() {
      return ctx.model.module(moduleInfo.relativeName).resource;
    }

    get modelResourceLocale() {
      return ctx.model.module(moduleInfo.relativeName).resourceLocale;
    }

    get modelResourceRole() {
      return ctx.model.module(moduleInfo.relativeName).resourceRole;
    }

    get sqlProcedure() {
      return ctx.bean._getBean(moduleInfo.relativeName, 'local.procedure');
    }

    // count
    async count({ options, user }) {
      return await this.select({ options, user, count: 1 });
    }

    // select
    //   donot set atomDisabled
    async select({
      atomClass,
      options: {
        where,
        orders,
        page,
        resourceType,
        star = 0,
        label = 0,
        stage = 'formal',
        category = 0,
        tag = 0,
        locale,
      },
      user,
      pageForce = false,
      count = 0,
    }) {
      // atomClass
      atomClass = atomClass || __atomClass;
      // locale
      if (locale !== false) {
        locale = locale || ctx.locale;
      }
      // where
      if (!where) where = {};
      if (resourceType) {
        where['f.resourceType'] = resourceType;
      }
      // options
      const options = {
        where,
        orders,
        page,
        star,
        label,
        stage,
        category,
        tag,
        resource: 1,
        resourceLocale: locale,
      };
      return await ctx.bean.atom.select({
        atomClass,
        options,
        user,
        pageForce,
        count,
      });
    }

    async readByStaticKey({ atomStaticKey, options, user }) {
      if (!atomStaticKey) return ctx.throw.module('a-base', 1002);
      // get atomId
      const atom = await ctx.bean.atom.modelAtom.get({
        atomStaticKey,
        atomStage: 1,
      });
      if (!atom) return ctx.throw.module('a-base', 1002);
      const atomId = atom.id;
      // check resource right
      const res = await this.checkRightResource({ resourceAtomId: atomId, user });
      if (!res) ctx.throw(403);
      // read
      return await this.read({ key: { atomId }, options, user });
    }

    // read
    async read({ key, options, user }) {
      options = Object.assign({ resource: 1 }, options);
      // locale
      let locale = options.locale;
      if (locale !== false) {
        locale = locale || ctx.locale;
      }
      options.resourceLocale = locale;
      return await ctx.bean.atom.read({ key, options, user });
    }

    async setLocales({ atomId, atomName }) {
      // delete
      await this.modelResourceLocale.delete({ atomId });
      // setLocales
      const locales = ctx.config.module(moduleInfo.relativeName).locales;
      for (const locale in locales) {
        await this.modelResourceLocale.insert({
          atomId,
          locale,
          atomNameLocale: ctx.text.locale(locale, atomName),
        });
      }
    }

    async checkLocales() {
      // setLocales
      const locales = ctx.config.module(moduleInfo.relativeName).locales;
      for (const locale in locales) {
        await this._checkLocale({ locale });
      }
    }

    async _checkLocale({ locale }) {
      const resources = await this._checkResourceLocales({ locale });
      if (resources.length === 0) return;
      // insert locales
      for (const resource of resources) {
        await this.modelResourceLocale.insert({
          atomId: resource.atomId,
          locale,
          atomNameLocale: ctx.text.locale(locale, resource.atomName),
        });
      }
    }

    async _checkResourceLocales({ locale }) {
      const atomClasses = await this._getAtomClassesResource();
      const atomClassIds = atomClasses.map(item => item.id);
      const sql = this.sqlProcedure._checkResourceLocales({
        iid: ctx.instance.id,
        locale,
        atomClassIds,
      });
      return await ctx.model.query(sql);
    }

    // check
    async check({ atomStaticKeys, user }) {
      const output = [];
      for (const atomStaticKey of atomStaticKeys) {
        const res = await this.checkRightResource({ atomStaticKey, user });
        if (res) {
          output.push({
            passed: true,
            atomId: res.atomId,
            atomStaticKey,
          });
        } else {
          output.push({
            passed: false,
            atomStaticKey,
          });
        }
      }
      return output;
    }

    async checkRightResource({ resourceAtomId, atomStaticKey, user }) {
      if (!resourceAtomId) {
        const atom = await ctx.bean.atom.modelAtom.get({ atomStaticKey, atomDisabled: 0, atomStage: 1 });
        if (!atom) return null;
        resourceAtomId = atom.id;
      }
      const sql = this.sqlProcedure.checkRightResource({
        iid: ctx.instance.id,
        userIdWho: user.id,
        resourceAtomId,
      });
      return await ctx.model.queryOne(sql);
    }

    async resourceRoles({ key /* , user */ }) {
      const list = await ctx.model.query(
        `
        select a.*,b.roleName from aResourceRole a
          left join aRole b on a.roleId=b.id
            where a.iid=? and a.atomId=?
            order by b.roleName
        `,
        [ctx.instance.id, key.atomId]
      );
      return list;
    }

    // add resource role
    async addResourceRole({ atomId, atomStaticKey, roleId }) {
      if (!atomId && !atomStaticKey) return null;
      if (!atomId) {
        const atom = await ctx.bean.atom.modelAtom.get({
          atomStaticKey,
          atomStage: 1, // formal
        });
        if (!atom) ctx.throw.module(moduleInfo.relativeName, 1002);
        atomId = atom.id;
      }
      // check if exists
      const item = await this.modelResourceRole.get({
        atomId,
        roleId,
      });
      if (item) return item.id;
      // insert
      const res = await this.modelResourceRole.insert({
        atomId,
        roleId,
      });
      return res.insertId;
    }

    // add resource roles
    async addResourceRoles({ atomIds, roleId }) {
      for (const atomId of atomIds) {
        await this.addResourceRole({ atomId, roleId });
      }
    }

    // delete resource role
    async deleteResourceRole({ id }) {
      await this.modelResourceRole.delete({ id });
    }

    async _getAtomClassesResource() {
      if (__atomClassesResource) return __atomClassesResource;
      const atomClassesResource = [];
      const atomClasses = ctx.bean.base.atomClasses();
      for (const module in atomClasses) {
        const atomClassesModule = atomClasses[module];
        for (const atomClassName in atomClassesModule) {
          const atomClass = atomClassesModule[atomClassName];
          if (atomClass.resource) {
            const item = await ctx.bean.atomClass.get({ module, atomClassName });
            atomClassesResource.push(item);
          }
        }
      }
      __atomClassesResource = atomClassesResource;
      return __atomClassesResource;
    }

    // admin

    async resourceRights({ roleId, page }) {
      // check locale
      const locale = ctx.locale;
      // items
      page = ctx.bean.util.page(page, false);
      const _limit = ctx.model._limit(page.size, page.index);
      const items = await ctx.model.query(
        `
        select a.*,
               b.atomName,b.atomDisabled,b.atomCategoryId,
               f.categoryName as atomCategoryName,
               c.module,c.atomClassName,
               d.atomNameLocale,e.resourceType
          from aResourceRole a
            inner join aAtom b on a.atomId=b.id
            inner join aAtomClass c on b.atomClassId=c.id
            left join aResourceLocale d on a.atomId=d.atomId and d.locale=?
            left join aResource e on a.atomId=e.atomId
            left join aCategory f on b.atomCategoryId=f.id
          where a.iid=? and a.deleted=0 and a.roleId=? and b.deleted=0 and b.atomStage=1
            order by c.module,b.atomClassId,e.resourceType,b.atomCategoryId
            ${_limit}
        `,
        [locale, ctx.instance.id, roleId]
      );
      // locale
      this._resourceRightsLocale({ items });
      // ok
      return items;
    }

    async resourceSpreads({ roleId, page }) {
      // check locale
      const locale = ctx.locale;
      // items
      page = ctx.bean.util.page(page, false);
      const _limit = ctx.model._limit(page.size, page.index);
      const items = await ctx.model.query(
        `
        select g.*,g.id as roleExpandId, a.id as resourceRoleId,
               b.atomName,b.atomDisabled,b.atomCategoryId,
               f.categoryName as atomCategoryName,
               c.module,c.atomClassName,
               d.atomNameLocale,e.resourceType,
               h.roleName
          from aResourceRole a
            inner join aAtom b on a.atomId=b.id
            inner join aAtomClass c on b.atomClassId=c.id
            left join aResourceLocale d on a.atomId=d.atomId and d.locale=?
            left join aResource e on a.atomId=e.atomId
            left join aCategory f on b.atomCategoryId=f.id
            left join aRoleExpand g on a.roleId=g.roleIdBase
            left join aRole h on g.roleIdBase=h.id
          where g.iid=? and g.deleted=0 and g.roleId=? and b.deleted=0 and b.atomStage=1
            order by c.module,b.atomClassId,e.resourceType,b.atomCategoryId
            ${_limit}
        `,
        [locale, ctx.instance.id, roleId]
      );
      // locale
      this._resourceRightsLocale({ items });
      // ok
      return items;
    }

    async resourceRightsOfUser({ userId, page }) {
      // check locale
      const locale = ctx.locale;
      // items
      page = ctx.bean.util.page(page, false);
      const _limit = ctx.model._limit(page.size, page.index);
      const items = await ctx.model.query(
        `
        select a.*,
               b.atomName,b.atomDisabled,b.atomCategoryId,
               f.categoryName as atomCategoryName,
               c.module,c.atomClassName,
               d.atomNameLocale,e.resourceType,
               h.roleName
          from aViewUserRightResource a
            inner join aAtom b on a.resourceAtomId=b.id
            inner join aAtomClass c on b.atomClassId=c.id
            left join aResourceLocale d on a.resourceAtomId=d.atomId and d.locale=?
            left join aResource e on a.resourceAtomId=e.atomId
            left join aCategory f on b.atomCategoryId=f.id
            left join aRole h on a.roleIdBase=h.id
          where a.iid=? and a.userIdWho=? and b.deleted=0 and b.atomStage=1
            order by c.module,b.atomClassId,e.resourceType,b.atomCategoryId
            ${_limit}
        `,
        [locale, ctx.instance.id, userId]
      );
      // locale
      this._resourceRightsLocale({ items });
      // ok
      return items;
    }

    _resourceRightsLocale({ items }) {
      // resourceTypes for a-base:resource
      const resourceTypes = ctx.bean.base.resourceTypes();
      // locale
      for (const item of items) {
        // resource type
        const resourceType = resourceTypes[item.resourceType];
        if (resourceType) {
          item.resourceTypeLocale = resourceType.titleLocale;
        }
        // category name
        item.atomCategoryNameLocale = ctx.text(item.atomCategoryName);
      }
    }

    // /* backup */

    // // const roleFunctions = [
    // //   { roleName: 'root', name: 'listComment' },
    // // ];
    // async addRoleFunctionBatch({ module, roleFunctions }) {
    //   if (!roleFunctions || !roleFunctions.length) return;
    //   module = module || this.moduleName;
    //   for (const roleFunction of roleFunctions) {
    //     // func
    //     const func = await ctx.bean.function.get({ module, name: roleFunction.name });
    //     if (roleFunction.roleName) {
    //       // role
    //       const role = await this.get({ roleName: roleFunction.roleName });
    //       // add role function
    //       await this.addRoleFunction({
    //         roleId: role.id,
    //         functionId: func.id,
    //       });
    //     }
    //   }
    // }

    // // function rights
    // async functionRights({ menu, roleId, page }) {
    //   // check locale
    //   const locale = ctx.locale;
    //   // list
    //   page = ctx.bean.util.page(page, false);
    //   const _limit = ctx.model._limit(page.size, page.index);
    //   const list = await ctx.model.query(`
    //     select a.*,b.module,b.name,b.title,b.sceneId,g.sceneName,b.sorting,f.titleLocale from aRoleFunction a
    //       left join aFunction b on a.functionId=b.id
    //       left join aFunctionLocale f on a.functionId=f.functionId
    //       left join aFunctionScene g on g.id=b.sceneId
    //         where a.iid=? and a.roleId=? and b.menu=? and f.locale=?
    //         order by b.module,g.sceneSorting,b.sorting
    //         ${_limit}
    //     `, [ ctx.instance.id, roleId, menu, locale ]);
    //   return list;
    // }

    // // function spreads
    // async functionSpreads({ menu, roleId, page }) {
    //   // check locale
    //   const locale = ctx.locale;
    //   // list
    //   page = ctx.bean.util.page(page, false);
    //   const _limit = ctx.model._limit(page.size, page.index);
    //   const list = await ctx.model.query(`
    //     select d.*,d.id as roleExpandId,a.id as roleFunctionId,b.module,b.name,b.title,b.sceneId,g.sceneName,e.roleName,f.titleLocale from aRoleFunction a
    //       left join aFunction b on a.functionId=b.id
    //       left join aRoleExpand d on a.roleId=d.roleIdBase
    //       left join aRole e on d.roleIdBase=e.id
    //       left join aFunctionLocale f on a.functionId=f.functionId
    //       left join aFunctionScene g on g.id=b.sceneId
    //         where d.iid=? and d.roleId=? and b.menu=? and f.locale=?
    //         order by b.module,g.sceneSorting,b.sorting
    //         ${_limit}
    //     `, [ ctx.instance.id, roleId, menu, locale ]);
    //   return list;
    // }

    // // function rights of user
    // async functionRightsOfUser({ menu, userId, page }) {
    //   // check locale
    //   const locale = ctx.locale;
    //   // list
    //   page = ctx.bean.util.page(page, false);
    //   const _limit = ctx.model._limit(page.size, page.index);
    //   const list = await ctx.model.query(`
    //     select a.*,b.module,b.name,b.title,b.sceneId,g.sceneName,b.sorting,f.titleLocale,e.roleName from aViewUserRightFunction a
    //       left join aFunction b on a.functionId=b.id
    //       left join aFunctionLocale f on a.functionId=f.functionId
    //       left join aFunctionScene g on g.id=b.sceneId
    //       left join aRole e on a.roleIdBase=e.id
    //         where a.iid=? and a.userIdWho=? and b.menu=? and f.locale=?
    //         order by b.module,g.sceneSorting,b.sorting
    //         ${_limit}
    //     `, [ ctx.instance.id, userId, menu, locale ]);

    //   return list;
    // }
  }

  return Resource;
};