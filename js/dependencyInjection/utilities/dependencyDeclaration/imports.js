"use strict";
//don't really want to do a require, but this stuff can't be injected without doing awkward work-around.

// this is only meant for getting utilities that can't be injected.
var utilityBuilder = require(__dirname + '/../../../utilities/utilityBuilder.js');
var nodeUtilities = utilityBuilder.buildUtility(utilityBuilder.utilities.nodeUtilities);
var prototypeUtilities = utilityBuilder.buildUtility(utilityBuilder.utilities.prototypeUtilities);

var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);

// Types and functions required.
var BaseDependencyDeclaration = requireFrom('BaseDependencyDeclaration.js').BaseDependencyDeclaration;
var LocationBasedDependencyDeclaration = requireFrom('LocationBasedDependencyDeclaration.js').LocationBasedDependencyDeclaration;
var extend = prototypeUtilities.extend;


module.exports.BaseDependencyDeclaration = BaseDependencyDeclaration;
module.exports.LocationBasedDependencyDeclaration = LocationBasedDependencyDeclaration;
module.exports.extend = extend;