"use strict";

var imports = require(__dirname + '/commonImports.js');


var CustomDependencyDeclaration = function (dependencyName, constructor) {
    this._dependencyInformation = new imports.DependencyInformation();
    this._dependencyInformation.dependencyName(dependencyName);
    this._dependencyInformation.constructor(constructor);
    this._dependencyInformation.dependencyType(imports.dependencyTypes.customDependency);
    this._dependencyInformation.scope(imports.scopeTypes.defaultScope);
};

CustomDependencyDeclaration.prototype.populate = function () {
	this._dependencyInformation.dependencies(imports.getFunctionArguments(this._dependencyInformation.constructor()));

	this._createBuildFromCustomFunction();
};

CustomDependencyDeclaration.prototype._createBuildFromCustomFunction = function () {
	var self = this;
	self._dependencyInformation.dependencies(imports.getFunctionArguments(self._dependencyInformation.constructor()));

	this._dependencyInformation.build = function (dependencies) {
		var constructedArguments = imports.buildArguments(self._dependencyInformation.dependencies(), dependencies);
		return imports.safeFunctionApply(self._dependencyInformation.constructor(), constructedArguments);
	};
};

imports.extend(CustomDependencyDeclaration,
	imports.LocationBasedDependencyDeclaration,
	imports.DependencyDeclarationBase);

module.exports.CustomDependencyDeclaration = CustomDependencyDeclaration;