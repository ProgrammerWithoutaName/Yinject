'use strict';

var dependencyInformationModule = require(__dirname + '/../DependencyInformation.js');

var verifyModuleExists = function (dependencyInformation) {
    var module;
    try {
        module = require(dependencyInformation.location());
    } catch (e) {
        throw e + " for dependency '" + dependencyInformation.dependencyName() + "'";
    }
    return module;
};

var verifyDeclarationNameExists = function (dependencyInformation) {
    if (!dependencyInformation.dependencyName()) {
        throw "dependency name doesn't exist for module " + dependencyInformation.location();
    }
};

var verifyDependencyTypeExists = function (dependencyInformation) {
    if (dependencyInformationModule.typeIsValid(dependencyInformation.dependencyType())) {
        return;
    }
    throw 'dependency Type ' + dependencyInformation.dependencyType() + ' is invalid for dependency ' + dependencyInformation.dependencyName();
};

var verifyScopeExists = function (dependencyInformation) {
    if (dependencyInformationModule.scopeIsValid(dependencyInformation.scope())) {
        return;
    }
    throw 'dependency Type ' + dependencyInformation.scope() + ' is invalid for dependency ' + dependencyInformation.dependencyName();
};


var verifyBaseDependencyInformation = function (dependencyInformation) {
    verifyDeclarationNameExists(dependencyInformation);
    verifyDependencyTypeExists(dependencyInformation);
    verifyScopeExists(dependencyInformation);
};


module.exports.verifyBaseDependencyInformation = verifyBaseDependencyInformation;
module.exports.verifyModuleExists = verifyModuleExists;