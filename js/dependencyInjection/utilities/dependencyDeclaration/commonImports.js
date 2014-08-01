"use strict";
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);
var requireUtility = nodeUtilities.requireUtility;
var requireEnum = nodeUtilities.requireEnum;

//Utility Libraries(?)
var protoUtil = requireUtility('prototypeUtilities.js');
var functionUtilities = requireUtility('functionUtilities.js');

// break this down into what I actually need->
// PrototypeUtilities
// FunctionUtilities
// Node Utilities
// DependencyDeclarationBase
// LocationBasedDependencyDeclaration
// DependencyInformation
// scopeTypes
// dependencyTypes

// dependencies that I can pull out of this:

// PrototypeUtilities
// NodeUtilities
// FunctionUtilities
// DependencyInformation
// scopeTypes
// dependencyTypes

// Stuff that is pretty much locked in (due to inheritance, though should be able to test the "abstract" implementation issues.:
// LocationBasedDependencyDeclaration
// DependencyDeclarationBase

// How to do this:
// have a requirement up front for nodeUtilities, prototypeUtilities, functionUtilities, DependencyInformation,
// scopeTypes, and dependencyTypes.


// Utility
module.exports.extend = protoUtil.extend;
module.exports.buildArguments = functionUtilities.buildArguments;
module.exports.constructObjectWithArguments = protoUtil.constructObjectWithArguments;
module.exports.getFunctionArguments = functionUtilities.getFunctionArguments;
module.exports.safeFunctionApply = functionUtilities.safeFunctionApply;

// Prototypes
module.exports.DependencyDeclarationBase = requireFrom('/DependencyDeclarationBase.js').DependencyDeclarationBase;
module.exports.LocationBasedDependencyDeclaration = requireFrom('/LocationBasedDependencyDeclaration.js').LocationBasedDependencyDeclaration;

// Data model prototypes
module.exports.DependencyInformation = requireFrom('../DependencyInformation.js').DependencyInformation;

// Enumerations
module.exports.scopeTypes = requireEnum('scopeTypes.js');
module.exports.dependencyTypes = requireEnum('dependencyTypes.js');
