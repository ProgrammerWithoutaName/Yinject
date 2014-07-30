"use strict";
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);

var PrototypeDependencyDeclaration = requireFrom('/PrototypeDependencyDeclaration.js').PrototypeDependencyDeclaration;
var CustomDependencyDeclaration = requireFrom('/CustomDependencyDeclaration.js').CustomDependencyDeclaration;
var ModuleDependencyDeclaration = requireFrom('/ModuleDependencyDeclaration.js').ModuleDependencyDeclaration;

var createPrototypeDependency = function (dependencyName, prototypeName) {
    return new PrototypeDependencyDeclaration(dependencyName, prototypeName);
};

var createCustomConstructorDependency = function (dependencyName, customConstructor) {
    return new CustomDependencyDeclaration(dependencyName, customConstructor);
};

var createModuleDependency = function (dependencyName, moduleName) {
    return new ModuleDependencyDeclaration(dependencyName, moduleName);
};

module.exports.createPrototypeDependency = createPrototypeDependency;
module.exports.createCustomConstructorDependency = createCustomConstructorDependency;
module.exports.createModuleDependency = createModuleDependency;