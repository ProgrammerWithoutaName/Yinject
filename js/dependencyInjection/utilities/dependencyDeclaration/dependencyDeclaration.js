"use strict";

var buildDependencyDeclarationUtility = function (prototypeDependencyDeclarationFactory,
											customDependencyDeclarationFactory,
											moduleDependencyDeclarationFactory) {

	var dependencyDeclaration = {};

	dependencyDeclaration.createPrototypeDependency = function (dependencyName, prototypeName) {
		return prototypeDependencyDeclarationFactory.createPrototypeDependencyDeclaration(dependencyName, prototypeName);
	};

	dependencyDeclaration.createCustomConstructorDependency = function (dependencyName, customConstructor) {
		return customDependencyDeclarationFactory.createCustomDependencyDeclaration(dependencyName, customConstructor);
	};

	dependencyDeclaration.createModuleDependency = function (dependencyName, moduleName) {
		return moduleDependencyDeclarationFactory.createModuleDependencyDeclaration(dependencyName, moduleName);
	};

	return dependencyDeclaration;
};

module.exports.buildDependencyDeclaration = buildDependencyDeclarationUtility;


// New style:
// DependencyDeclaration.forDependency('foo').usePrototype('bar).from('place/somePlace.js').in.requestScope;
