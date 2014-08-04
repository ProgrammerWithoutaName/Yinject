"use strict";

var imports = require(__dirname + '/imports.js');

var ModuleDependencyDeclaration = function (dependencyName,
	moduleName,
	dependencyInformation,
	dependencyValidationUtility,
	dependencyTypes,
	scopeTypes ) {

	this._dependencyInformation = dependencyInformation;
	this._dependencyInformation.dependencyName(dependencyName);
	this._dependencyInformation.location(moduleName);
	this._dependencyInformation.dependencies([]);
	this._dependencyInformation.dependencyType(dependencyTypes.moduleDependency);
	this._dependencyInformation.scope(scopeTypes.defaultScope);

	this._dependencyValidationUtility = dependencyValidationUtility;
};

ModuleDependencyDeclaration.prototype.populate = function () {
	var self = this;
	this._dependencyInformation.build = function () {
		return require(self._dependencyInformation.location());
	};
};

var ModuleDependencyDeclarationFactory = function (dependencyInformationFactory,
												   	dependencyValidationUtility,
													dependencyTypes,
													scopeTypes) {
	this._dependencyInformationFactory = dependencyInformationFactory;
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._dependencyTypes = dependencyTypes;
	this._scopeTypes = scopeTypes;
};

ModuleDependencyDeclarationFactory.createModuleDependencyDeclaration = function (dependencyName, moduleName) {
	return new ModuleDependencyDeclaration(dependencyName,
		moduleName,
		this._dependencyInformationFactory.createDependencyInformation(),
		this._dependencyValidationUtility,
		this.dependencyTypes,
		this.scopeTypes);
};

imports.extend(ModuleDependencyDeclaration, imports.BaseDependencyDeclaration);



module.exports.ModuleDependencyDeclarationFactory = ModuleDependencyDeclarationFactory;
module.exports.ModuleDependencyDeclaration = ModuleDependencyDeclaration;