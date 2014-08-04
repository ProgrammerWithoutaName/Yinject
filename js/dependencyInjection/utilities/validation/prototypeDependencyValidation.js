"use strict";

var buildPrototypeDependencyValidationUtility = function (baseDependencyValidationUtility) {

	var prototypeDependencyValidationUtility = {};

	var verifyPrototypeName = function (dependencyInformation) {
		if (!dependencyInformation.prototypeName()) {
			throw "prototype name required for dependency type of 'prototype' for dependency " + dependencyInformation.dependencyName();
		}
	};

	var verifyPrototypeExists = function (dependencyInformation, module) {
		if (!module[dependencyInformation.prototypeName()]) {
			throw "prototype '" + dependencyInformation.prototypeName() + "' was not found on given module '" + dependencyInformation.location() + "'.";
		}

		if (typeof module[dependencyInformation.prototypeName()] !== 'function') {
			throw "given prototype '" + dependencyInformation.prototypeName() + "' on given module '" + dependencyInformation.location() + "' is not a function.";
		}
	};

// Example
//Declare.for('IFoo').usePrototype('Foo').from('place.js').inScope('singleton');

	prototypeDependencyValidationUtility.verifyPrototypeDependencyInformation = function (dependencyInformation) {
		var module = baseDependencyValidationUtility.verifyModuleExists(dependencyInformation);
		verifyPrototypeName(dependencyInformation);
		verifyPrototypeExists(dependencyInformation, module);
	};

	return prototypeDependencyValidationUtility;
};


module.exports.buildPrototypeDependencyValidationUtility = buildPrototypeDependencyValidationUtility;