"use strict";

var verifyConstructorLocationInformation = function (dependencyInformation) {
	if(typeof dependencyInformation.constructorName != 'string') {
		throw "constructor name for custom dependency '" + dependencyInformation.dependencyName + "' is not a string.";
	}

	if(!dependencyInformation.location) {
		throw "constructor name specified, but location was not for custom dependency '" + dependencyInformation.dependencyName + "'.";
	}

	if(typeof dependencyInformation.location !== 'string') {
		throw "location for custom dependency '" + dependencyInformation.dependencyName + "' is not a string.";
	}
};

var verifyConstructorExistsInModule = function (dependencyInformation, baseDependencyValidationUtility) {
	var module = baseDependencyValidationUtility.verifyModuleExists(dependencyInformation);
	var constructor = module[dependencyInformation.constructorName];

	if(typeof constructor !== 'function') {
		throw "constructor for dependency '" + dependencyInformation.dependencyName + "' at location '" + dependencyInformation.location + "' is not a function.";
	}
};

var verifyConstructorFunctionIsCorrectType = function (dependencyInformation) {
	if (!dependencyInformation.constructorFunction) {
		throw "constructor missing for custom dependency '" + dependencyInformation.dependencyName + "'.";
	}

	if (dependencyInformation.constructorFunction && typeof dependencyInformation.constructorFunction !== 'function') {
		throw "constructor given for '" + dependencyInformation.dependencyName + "' is not a function.";
	}
};

var buildCustomDependencyValidationUtility = function (baseDependencyValidationUtility) {

	var customDependencyInformationUtility = {};

	customDependencyInformationUtility.verifyCustomDependencyInformation = function (dependencyInformation) {
		if(dependencyInformation.constructorName) {
			verifyConstructorLocationInformation(dependencyInformation);
			verifyConstructorExistsInModule(dependencyInformation, baseDependencyValidationUtility);

		} else {
			verifyConstructorFunctionIsCorrectType(dependencyInformation);
		}
	};

	return customDependencyInformationUtility;
};


module.exports.buildCustomDependencyValidationUtility = buildCustomDependencyValidationUtility;