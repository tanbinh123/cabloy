module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  // actionPath
  const actionPath = '/a/basefront/atom/draftTabs';
  // resource
  const resource = {
    atomName: 'Drafts',
    atomStaticKey: 'mineAtomDrafts',
    atomRevision: 1,
    atomCategoryId: 'a-base:mine.Atom',
    resourceType: 'a-base:mine',
    resourceConfig: JSON.stringify({
      actionPath,
      stats: {
        params: {
          module: moduleInfo.relativeName,
          name: 'drafts',
        },
        color: 'orange',
      },
    }),
    resourceRoles: 'root',
    resourceSorting: 1,
  };
  return resource;
};