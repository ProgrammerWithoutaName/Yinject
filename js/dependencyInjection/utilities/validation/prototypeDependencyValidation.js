"use strict";

var buildPrototypeDependencyValidationUtility = function (baseDependencyValidationUtility) {

	var prototypeDependencyValidationUtility = {};

	var verifyPrototypeName = function (dependencyInformation) {
		if (!dependencyInformation.constructorName) {
			throw "prototype name required for dependency type of 'prototype' for dependency " + dependencyInformation.dependencyName;
		}
	};

	var verifyConstructorIsFunction = function (dependencyInformation) {
		if(typeof dependencyInformation.constructorFunction !== 'function') {
			throw 'prototype ' + dependencyInformation.dependencyName + "'s constructor is not a function.";
		}
	};

	var verifyPrototypeExistsInModule = function (dependencyInformation) {
		var module = baseDependencyValidationUtility.verifyModuleExists(dependencyInformation);
		if (!module[dependencyInformation.constructorName]) {
			throw "prototype '" + dependencyInformation.constructorName + "' was not found on given module '" + dependencyInformation.location + "'.";
		}

		if (typeof module[dependencyInformation.constructorName] !== 'function') {
			throw "given prototype '" + dependencyInformation.constructorName + "' on given module '" + dependencyInformation.location + "' is not a function.";
		}
	};


// Example
//Declare.forDependency('IFoo').usePrototype('Foo').from('place.js').in.singletonScope;

	prototypeDependencyValidationUtility.verifyPrototypeDependencyInformation = function (dependencyInformation) {
		if(dependencyInformation.constructorFunction) {
			verifyConstructorIsFunction(dependencyInformation);
		} else {
			verifyPrototypeName(dependencyInformation);
			verifyPrototypeExistsInModule(dependencyInformation);
		}
	};

	return prototypeDependencyValidationUtility;
};


module.exports.buildPrototypeDependencyValidationUtility = buildPrototypeDependencyValidationUtility;