"use strict";
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);
var requireUtility = nodeUtilities.requireUtility;
var requireEnum = nodeUtilities.requireEnum;

//Utility Libraries(?)
var functionReflection = requireUtility('functionReflection.js');
var protoUtil = requireUtility('prototypeUtilities.js');


// Utility
module.exports.getFunctionArguments = functionReflection.getFunctionArguments;
module.exports.extend = protoUtil.extend;
module.exports.constructObjectWithArguments = protoUtil.constructObjectWithArguments;
module.exports.buildArguments = protoUtil.buildArguments;

// Prototypes
module.exports.DependencyDeclarationBase = requireFrom('/DependencyDeclarationBase.js').DependencyDeclarationBase;
module.exports.DependencyInformation = requireFrom('../DependencyInformation.js').DependencyInformation;

// Enumerations
module.exports.scopeTypes = requireEnum('scopeTypes.js');
module.exports.dependencyTypes = requireEnum('dependencyTypes.js');
