"use strict";
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireUtility = nodeUtilities.requireUtility;

var arrayUtilities = requireUtility('arrayUtilities.js');

var forEach = arrayUtilities.forEach;


var createErrorForMissingDependencies = function (missingDependencies) {
    var missingDependenciesErrorString = 'Dependency Declarations missing required dependencies. ';
    missingDependenciesErrorString += ' missing Dependencies are: ';
    missingDependenciesErrorString += JSON.stringify(missingDependencies);

    return missingDependenciesErrorString;
};

var getRequirements = function (declarationArray) {
    var requirements = {};
    var requirementsArray = [];

    // populate the requirements
    forEach(declarationArray, function (declaration) {
        forEach(declaration.dependencies(), function (dependency) {
            if (requirements[dependency] === undefined) {
                requirements[dependency] = {
                    name: dependency,
                    requiredBy: []
                };
                requirementsArray.push(requirements[dependency]);
            }
            requirements[dependency].requiredBy.push(declaration.dependencyName());
        });
    });

    return requirementsArray;
};

var findMissingRequirements = function (declarationContainer, requirements) {
    var missingRequirements = [];
    forEach(requirements, function (requirement) {
        if (declarationContainer[requirement.name] === undefined) {
            missingRequirements.push(requirement);
        }
    });

    return missingRequirements;
};

// All Requirements met check
var confirmRequirementsMet = function (declarationArray, declarationContainer) {
    var requirements = getRequirements(declarationArray);
    var missingRequirements = findMissingRequirements(declarationContainer, requirements);

    // compare requirements array to declaration container (should be the same.)
    if (missingRequirements.length > 0) {
        throw createErrorForMissingDependencies(missingRequirements);
    }
};

module.exports.confirmRequirementsMet = confirmRequirementsMet;