'use strict';
var prototypeDependency = 'prototype';
var moduleDependency = 'module';
var customDependency = 'custom';

/*
 Dependency Types:
 prototype: this is a prototype. when requested, we create a new one each time. Chances are, you will either need a factory/builder unless you only need a single type.
 module: Only creates one of the types per "resolve"
 custom: creates
 */

var allValues = [prototypeDependency, moduleDependency, customDependency];
var dependencyTypes;

dependencyTypes = {
	prototypeDependency: prototypeDependency,
	moduleDependency: moduleDependency,
	customDependency: customDependency,
	allValues: allValues,
	typeIsValid: function (givenType) {
		return (allValues.lastIndexOf(givenType) > -1);
	}
};

module.exports.dependencyTypes = dependencyTypes;