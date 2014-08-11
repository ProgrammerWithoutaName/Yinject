"use strict";

var buildDependencyValidationUtility = function (dependencyTypes,
												 baseDependencyValidationUtility,
												 prototypeValidationUtility,
												 customDependencyValidationUtility) {


	var dependencyInformationValidationUtility = {};
	dependencyInformationValidationUtility.verifyDependencyInformation = function (dependencyInformation) {

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

	return dependencyInformationValidationUtility;
};



module.exports.buildDependencyValidationUtility = buildDependencyValidationUtility;