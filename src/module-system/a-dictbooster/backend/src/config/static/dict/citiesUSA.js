const citiesUSA = require('./cities/citiesUSA.json');
module.exports = app => {
  const dictItems = citiesUSA;
  const dictLocales = {};
  const definition = {
    atomName: 'Cities USA',
    atomStaticKey: 'citiesUSA',
    atomRevision: 0,
    description: '',
    dictItems: JSON.stringify(dictItems),
    dictLocales: JSON.stringify(dictLocales),
    resourceRoles: 'root',
  };
  return definition;
};