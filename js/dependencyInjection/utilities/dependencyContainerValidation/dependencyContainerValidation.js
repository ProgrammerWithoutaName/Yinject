"use strict";

var buildContainerValidationUtility = function (arrayUtilities, circularDependencyValidation, requirementsValidation) {
	var containerValidationUtility = {};
	containerValidationUtility.validateContainer = function (container, containerArray) {
		// check requirements
		requirementsValidation.confirmRequirementsMet(containerArray, container);

		// check for circular dependencies
		arrayUtilities.forEach(containerArray, function (declaration) {
			circularDependencyValidation.checkForCircularDependencies(container, declaration);
		});
	};
	return containerValidationUtility;
};


module.exports.buildContainerValidationUtility = buildContainerValidationUtility;