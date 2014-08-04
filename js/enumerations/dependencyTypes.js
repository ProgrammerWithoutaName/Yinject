var prototypeDependency = 'prototype';
var moduleDependency = 'module';
var customDependency = 'custom';

/*
 Dependency Types:
 prototype: this is a prototype. when requested, we create a new one each time. Chances are, you will either need a factory/builder unless you only need a single type.
 module: Only creates one of the types per "resolve"
 custom: creates
 */

var buildDependencyTypes = function (dependencyTypeRequirements) {
	var arrayUtilities = dependencyTypeRequirements.arrayUtilities;
	var allValues = [prototypeDependency, moduleDependency, customDependency];
	var dependencyTypes;

	dependencyTypes = {
		prototypeDependency: prototypeDependency,
		moduleDependency: moduleDependency,
		customDependency: customDependency,
		allValues: allValues,
		typeIsValid: function (givenType) {
			return arrayUtilities.valueExistsInArray(allValues, givenType);
		}
	};

	return dependencyTypes;
};

module.exports.buildDependencyTypes = buildDependencyTypes;