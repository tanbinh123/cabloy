module.exports = app => {
  const schemas = {};
  // resource
  schemas.resource = {
    type: 'object',
    properties: {
      // title
      __groupTitle: {
        ebType: 'group-flatten',
        ebTitle: 'Title',
      },
      atomName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Name',
        notEmpty: true,
      },
      description: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Description',
      },
      // config
      __groupConfig: {
        ebType: 'group-flatten',
        ebTitle: 'Config',
      },
      resourceConfig: {
        type: ['string', 'null'],
        ebType: 'json',
        ebTitle: 'Config',
      },
      // Basic Info
      __groupBasicInfo: {
        ebType: 'group-flatten',
        ebTitle: 'Basic Info',
      },
      resourceType: {
        type: 'string',
        ebType: 'resourceType',
        ebTitle: 'Resource Type',
        ebOptionsBlankAuto: true,
        notEmpty: true,
      },
      atomCategoryId: {
        type: 'number',
        ebType: 'component',
        ebTitle: 'Category',
        ebRender: {
          module: 'a-basefront',
          name: 'renderCategoryResource',
        },
      },
      atomTags: {
        type: ['string', 'null'],
        ebType: 'tags',
        ebTitle: 'Tags',
      },
      // Extra
      __groupExtra: {
        ebType: 'group-flatten',
        ebTitle: 'Extra',
      },
      resourceSorting: {
        type: 'number',
        ebType: 'text',
        ebTitle: 'Sorting',
      },
      atomStaticKey: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'KeyForAtom',
        ebReadOnly: true,
        notEmpty: true,
      },
    },
  };
  // resource search
  schemas.resourceSearch = {
    type: 'object',
    properties: {},
  };
  return schemas;
};
