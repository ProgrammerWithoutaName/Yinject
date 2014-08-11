"use strict";

var buildCircularDependencyValidationUtility = function(arrayUtilities) {
	// Circular dependency Check
	var circularDependencyValidationUtility = {};

	var getErrorChainString = function (errorChain) {
		return "'" + errorChain.join("' -> '") + "'";
	};

	var getCircularDependencyError = function (dependencyParent, dependencyChild, dependencyChain) {

		var errorChain = dependencyChain.slice(0);
		errorChain.push(dependencyParent);
		errorChain.push(dependencyChild);

		return "Circular reference detected in dependency '" + dependencyParent +
			"'. Circular dependency chain is: " + getErrorChainString(errorChain);
	};

	var detectCircularDependency = function (dependenciesInChain, dependencyToVerify) {
		// detect error
		arrayUtilities.forEach(dependenciesInChain, function (chainDependency) {
			if (chainDependency === dependencyToVerify.dependencyName) {
				throw getCircularDependencyError(dependencyToVerify.dependencyName, dependencyToVerify.dependencyName, dependenciesInChain);
			}
			arrayUtilities.forEach(dependencyToVerify.dependencies, function (requiredDependency) {
				if (chainDependency === requiredDependency) {
					throw getCircularDependencyError(dependencyToVerify.dependencyName, requiredDependency, dependenciesInChain);
				}
			});
		});
	};

	var checkChildren = function (dependencyContainer, parentDependency, dependenciesInChain) {
		dependenciesInChain.push(parentDependency.dependencyName);
		// chain down to detect errors.
		arrayUtilities.forEach(parentDependency.dependencies, function (dependency) {
			var chainClone = dependenciesInChain.slice(0);
			circularDependencyValidationUtility.checkForCircularDependencies(dependencyContainer, dependencyContainer[dependency], chainClone);
		});
	};

	circularDependencyValidationUtility.checkForCircularDependencies = function (dependencyContainer, dependencyToVerify, dependenciesInChain) {
		if (!dependenciesInChain) {
			dependenciesInChain = [];
		}

		detectCircularDependency(dependenciesInChain, dependencyToVerify);
		checkChildren(dependencyContainer, dependencyToVerify, dependenciesInChain);
	};
};


module.exports.buildCircularDependencyValidationUtility = buildCircularDependencyValidationUtility;