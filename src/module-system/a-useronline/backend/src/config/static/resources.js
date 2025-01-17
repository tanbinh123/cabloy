module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // menu
    // {
    //   atomName: 'Create UserOnline',
    //   atomStaticKey: 'createUserOnline',
    //   atomRevision: 0,
    //   atomCategoryId: 'a-base:menu.Create',
    //   resourceType: 'a-base:menu',
    //   resourceConfig: JSON.stringify({
    //     module: moduleInfo.relativeName,
    //     atomClassName: 'userOnline',
    //     atomAction: 'create',
    //   }),
    //   resourceRoles: 'authenticated',
    // },
    {
      atomName: 'Users Status',
      atomStaticKey: 'listUserStatus',
      atomRevision: 0,
      atomCategoryId: 'a-base:menu.Tools',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'userOnline',
        atomAction: 'read',
      }),
      resourceRoles: 'template.system',
    },
    // {
    //   atomName: 'Online Users(History)',
    //   atomStaticKey: 'listUserOnlineHistory',
    //   atomRevision: 0,
    //   atomCategoryId: 'a-base:menu.List',
    //   resourceType: 'a-base:menu',
    //   resourceConfig: JSON.stringify({
    //     module: moduleInfo.relativeName,
    //     atomClassName: 'userOnlineHistory',
    //     atomAction: 'read',
    //   }),
    //   resourceRoles: 'template.system',
    // },
  ];
  return resources;
};
