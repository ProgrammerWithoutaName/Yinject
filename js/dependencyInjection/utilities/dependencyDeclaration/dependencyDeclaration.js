"use strict";

var buildDependencyDeclarationUtility = function (prototypeDependencyDeclarationFactory,
											customDependencyDeclarationFactory,
											moduleDependencyDeclarationFactory) {

	var dependencyDeclaration = {};

	dependencyDeclaration.createPrototypeDependency = function (dependencyName, prototypeName) {
		return new prototypeDependencyDeclarationFactory.createPrototypeDependencyDeclaration(dependencyName, prototypeName);
	};

	dependencyDeclaration.createCustomConstructorDependency = function (dependencyName, customConstructor) {
		return new customDependencyDeclarationFactory.createCustomDependencyDeclaration(dependencyName, customConstructor);
	};

	dependencyDeclaration.createModuleDependency = function (dependencyName, moduleName) {
		return new moduleDependencyDeclarationFactory.createModuleDependencyDeclaration(dependencyName, moduleName);
	};

	return dependencyDeclaration;
};

module.exports.buildDependencyDeclaration = buildDependencyDeclarationUtility;
