"use strict";

var buildDependencyValidationUtility = function ( baseDependencyValidationUtility,
												 prototypeValidationUtility,
												 customDependencyValidationUtility,
												 dependencyTypes) {


	var dependencyValidationUtility = {};
	dependencyValidationUtility.verifyDependencyInformation = function (dependencyInformation) {

		baseDependencyValidationUtility.verifyBaseDependencyInformation(dependencyInformation);

		switch (dependencyInformation.dependencyType) {
			case dependencyTypes.prototypeDependency:
				prototypeValidationUtility.verifyPrototypeDependencyInformation(dependencyInformation);
				break;
			case dependencyTypes.moduleDependency:
				baseDependencyValidationUtility.verifyModuleExists(dependencyInformation);
				break;
			case dependencyTypes.customDependency:
				customDependencyValidationUtility.verifyCustomDependencyInformation(dependencyInformation);
				break;
		}
	};

	return dependencyValidationUtility;
};



module.exports.buildDependencyValidationUtility = buildDependencyValidationUtility;