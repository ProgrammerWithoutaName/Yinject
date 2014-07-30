"use strict";
// this exists solely to confirm that we aren't missing any dependencies required
// and that we don't have any circular dependencies
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);
var requireUtility = nodeUtilities.requireUtility;

// imports
var arrayUtilities = requireUtility('arrayUtilities.js');
var circularDependencyValidation = requireFrom('/circularDependencyValidation.js');
var requirementsValidation = requireFrom('/requirementsValidation.js');


var validateContainer = function (container, containerArray) {
    // check requirements
    requirementsValidation.confirmRequirementsMet(containerArray, container);

    // check for circular dependencies
    arrayUtilities.forEach(containerArray, function (declaration) {
        circularDependencyValidation.checkForCircularDependencies(container, declaration);
    });
};

module.exports.validateContainer = validateContainer;