



var builder = require(__dirname + '/js/dependencyInjection/yinjectBuilder.js');
/*var declarations = [__dirname + '/js/utilities/diDeclarations.js'];
var container = builder.createDependencyInjectorContainer(declarations);

var propertyBuilder = container.resolve('propertyBuilder');

var prop = propertyBuilder.buildProperty();
prop('something');
var whatItIs = prop();*/

module.exports = builder;
