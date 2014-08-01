"use strict";
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);
var requireUtility = nodeUtilities.requireUtility;
var requireEnum = nodeUtilities.requireEnum;

//Utility Libraries(?)
var protoUtil = requireUtility('prototypeUtilities.js');
var functionUtilities = requireUtility('functionUtilities.js');


// Utility
module.exports.extend = protoUtil.extend;
module.exports.buildArguments = functionUtilities.buildArguments;
module.exports.constructObjectWithArguments = protoUtil.constructObjectWithArguments;
module.exports.getFunctionArguments = functionUtilities.getFunctionArguments;
module.exports.safeFunctionApply = functionUtilities.safeFunctionApply;

// Prototypes
module.exports.DependencyDeclarationBase = requireFrom('/DependencyDeclarationBase.js').DependencyDeclarationBase;
module.exports.LocationBasedDependencyDeclaration = requireFrom('/LocationBasedDependencyDeclaration.js').LocationBasedDependencyDeclaration;
module.exports.BuildBuilder = requireFrom('/BuildBuilder.js').BuildBuilder;

// Data model prototypes
module.exports.DependencyInformation = requireFrom('../DependencyInformation.js').DependencyInformation;

// Enumerations
module.exports.scopeTypes = requireEnum('scopeTypes.js');
module.exports.dependencyTypes = requireEnum('dependencyTypes.js');
