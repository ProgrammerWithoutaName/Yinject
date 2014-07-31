"use strict";
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);

// Prototypes
var DependencyInformation = requireFrom('../DependencyInformation.js').DependencyInformation;

// Validation
var verifyDependencyInformation = requireFrom('../validation/dependencyValidation.js').verifyDependencyInformation;

var DependencyDeclarationBase = function () {
    // prototype function doesn't exist yet, repeated code.
    this._dependencyInformation = new DependencyInformation();
};

DependencyDeclarationBase.prototype.inScope = function (scope) {
    this._dependencyInformation.scope(scope);
    return this;
};

DependencyDeclarationBase.prototype.verify = function () {
    verifyDependencyInformation(this._dependencyInformation);
};

DependencyDeclarationBase.prototype.getDependencyInformation = function () {
    return this._dependencyInformation;
};



module.exports.DependencyDeclarationBase = DependencyDeclarationBase;