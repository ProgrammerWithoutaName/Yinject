"use strict";

var buildContainerValidationUtility = function (circularDependencyValidation, requirementsValidation) {
	var containerValidationUtility = {};
	containerValidationUtility.validateContainer = function (container, containerArray) {
		// check requirements
		requirementsValidation.confirmRequirementsMet(containerArray, container);

		// check for circular dependencies
		containerArray.forEach(function(declaration) {
			circularDependencyValidation.checkForCircularDependencies(container, declaration);
		});
	};
	return containerValidationUtility;
};


module.exports.buildContainerValidationUtility = buildContainerValidationUtility;