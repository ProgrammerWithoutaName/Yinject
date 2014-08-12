"use strict";
//don't really want to do a require, but this stuff can't be injected without doing awkward work-around.

// this is only meant for getting utilities that can't be injected.
var utilityBuilder = require(__dirname + '/../../../utilities/utilityBuilder.js');
var nodeUtilities = utilityBuilder.buildUtility(utilityBuilder.utilities.nodeUtilities);

var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);

// Types and functions required.
var BaseDependencyDeclaration = requireFrom('BaseDependencyDeclaration.js').BaseDependencyDeclaration;
var LocationBasedDependencyDeclaration = requireFrom('LocationBasedDependencyDeclaration.js').LocationBasedDependencyDeclaration;

// Exports
module.exports.inheritanceUtilities = utilityBuilder.buildUtility(utilityBuilder.utilities.inheritanceUtilities);

module.exports.baseDependencyDeclarationContainer = {
	name: 'BaseDependencyDeclaration',
	givenType: BaseDependencyDeclaration
};

module.exports.locationBasedDependencyDeclarationContainer = {
	name: 'LocationBasedDependencyDeclaration',
	givenType: LocationBasedDependencyDeclaration
};

