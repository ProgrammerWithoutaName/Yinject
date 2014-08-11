"use strict";

var buildCustomDependencyValidationUtility = function () {

	var customDependencyInformationUtility = {};

	var verifyConstructorExists = function (dependencyInformation) {
		if (!dependencyInformation.constructorFunction) {
			throw "constructor missing for custom dependency '" + dependencyInformation.dependencyName + "'.";
		}

		if (typeof dependencyInformation.constructorFunction !== 'function') {
			throw "constructor given for '" + dependencyInformation.dependencyName + "' is not a function.";
		}
	};

	customDependencyInformationUtility.verifyCustomDependencyInformation = function (dependencyInformation) {
		verifyConstructorExists(dependencyInformation);
	};

	return customDependencyInformationUtility;
};


module.exports.buildCustomDependencyValidationUtility = buildCustomDependencyValidationUtility;