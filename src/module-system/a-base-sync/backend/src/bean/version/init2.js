const require3 = require('require3');
const extend = require3('extend2');
const initData = require('./initData2.js');

module.exports = function (ctx) {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class VersionInit {
    async run(options) {
      // roles
      const roleIds = await this._initRoles();
      // role includes
      await this._roleIncludes(roleIds);
      // build
      await ctx.bean.role.setDirty(true);
      // users
      await this._initUsers(roleIds, options);
    }

    // roles
    async _initRoles() {
      const roleIds = {};
      roleIds.system = 0;
      // system roles
      for (const roleName of ctx.constant.systemRoles) {
        const role = extend(true, { module: moduleInfo.relativeName }, initData.roles[roleName]);
        role.roleIdParent = roleIds[role.roleIdParent];
        roleIds[roleName] = await ctx.bean.role.add(role);
      }
      return roleIds;
    }

    // role includes
    async _roleIncludes(roleIds) {
      for (const item of initData.includes) {
        await ctx.bean.role.addRoleInc({ roleId: roleIds[item.from], roleIdInc: roleIds[item.to] });
      }
    }

    // users
    async _initUsers(roleIds, options) {
      // root user
      const userRoot = extend(true, {}, initData.users.root);
      userRoot.item.email = options.email;
      userRoot.item.mobile = options.mobile;
      const userId = await ctx.bean.user.add(userRoot.item);
      // activated
      await ctx.bean.user.save({
        user: { id: userId, activated: 1 },
      });
      // user->role
      await ctx.bean.role.addUserRole({
        userId,
        roleId: roleIds[userRoot.roleId],
      });
    }
  }

  return VersionInit;
};
