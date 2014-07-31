"use strict";

var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);

var baseValidation = requireFrom('/baseDependencyValidation.js');

var verifyPrototypeName = function (dependencyInformation) {
    if (!dependencyInformation.prototypeName()) {
        throw "prototype name required for dependency type of 'prototype' for dependency " + dependencyInformation.dependencyName();
    }
};

var verifyPrototypeExists = function (dependencyInformation, module) {
    if (!module[dependencyInformation.prototypeName()]) {
        throw "prototype '" + dependencyInformation.prototypeName() + "' was not found on given module '" + dependencyInformation.location() + "'.";
    }

    if (typeof module[dependencyInformation.prototypeName()] !== 'function') {
        throw "given prototype '" + dependencyInformation.prototypeName() + "' on given module '" + dependencyInformation.location() + "' is not a function.";
    }
};

// Example
//Declare.for('IFoo').usePrototype('Foo').from('place.js').inScope('singleton');

var verifyPrototypeDependencyInformation = function (dependencyInformation) {
    var module = baseValidation.verifyModuleExists(dependencyInformation);
    verifyPrototypeName(dependencyInformation);
    verifyPrototypeExists(dependencyInformation, module);
};

module.exports.verifyPrototypeDependencyInformation = verifyPrototypeDependencyInformation;