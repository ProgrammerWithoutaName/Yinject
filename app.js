
var declarations = [__dirname + '/utilities/diDeclarations.js'];

var builder = require(__dirname + '/dependencyInjection/yinjectBuilder.js');

var container = builder.createDependencyInjectorContainer(declarations);

var propertyBuilder = container.resolve('propertyBuilder');

module.exports.yinjectBuilder = require(__dirname + '/dependencyInjection/yinjectBuilder.js');
