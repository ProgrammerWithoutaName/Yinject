"use strict";

var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);
var requireEnum = nodeUtilities.requireEnum;

// enumerations
var dependencyTypes = requireEnum('dependencyTypes.js');
// Validation
var baseValidation = requireFrom('/baseDependencyValidation.js');
var prototypeValidation = requireFrom('/prototypeDependencyValidation.js');
var customDependencyValidation = requireFrom('/customDependencyValidation.js');

var verifyDependencyInformation = function (dependencyInformation) {

    baseValidation.verifyBaseDependencyInformation(dependencyInformation);

    switch (dependencyInformation.dependencyType()) {
    case dependencyTypes.prototypeDependency:
        prototypeValidation.verifyPrototypeDependencyInformation(dependencyInformation);
        break;
    case dependencyTypes.moduleDependency:
        baseValidation.verifyModuleExists(dependencyInformation);
        break;
    case dependencyTypes.customDependency:
        customDependencyValidation.verifyCustomDependencyInformation(dependencyInformation);
        break;
    }
};

module.exports.verifyDependencyInformation = verifyDependencyInformation;