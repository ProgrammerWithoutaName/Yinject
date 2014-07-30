"use strict";

var verifyConstructorExists = function (dependencyInformation) {
    if (!dependencyInformation.constructor()) {
        throw "constructor missing for custom dependency '" + dependencyInformation.dependencyName() + ",.";
    }

    if (typeof dependencyInformation.constructor() !== 'function') {
        throw "constructor given for '" + dependencyInformation.dependencyName() + "' is not a function.";
    }
};

var verifyCustomDependencyInformation = function (dependencyInformation) {
    verifyConstructorExists(dependencyInformation);
};

module.exports.verifyCustomDependencyInformation = verifyCustomDependencyInformation;