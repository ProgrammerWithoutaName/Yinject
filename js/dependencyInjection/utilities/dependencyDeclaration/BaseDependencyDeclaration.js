"use strict";



var BaseDependencyDeclaration = function () {
	// required type
	this._dependencyValidationUtility = null;
	throw 'BaseDependencyDeclaration is not meant to be instantiated.';
};

BaseDependencyDeclaration.prototype.inScope = function (scope) {
	this._dependencyInformation.scope(scope);
	return this;
};

BaseDependencyDeclaration.prototype.verify = function () {
	this._dependencyValidationUtility.verifyDependencyInformation(this._dependencyInformation);
};

BaseDependencyDeclaration.prototype.getDependencyInformation = function () {
	return this._dependencyInformation;
};

module.exports.BaseDependencyDeclaration = BaseDependencyDeclaration;