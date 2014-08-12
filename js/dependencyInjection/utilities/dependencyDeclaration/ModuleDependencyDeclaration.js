"use strict";

var imports = require(__dirname + '/imports.js');

/*
 dependencyName,
 prototype,
 dependencyInformation,
 dependencyValidationUtility,
 dependencyTypes,
 scopeTypes,
 functionUtilities,
 prototypeUtilities,
 propertyBuilderFactory
 */

var ModuleDependencyDeclaration = function (dependencyName,
	moduleName,
	dependencyInformation,
	dependencyValidationUtility,
	propertyBuilderFactory,
	dependencyTypes,
	scopeTypes) {

	ModuleDependencyDeclaration.__base['BaseDependencyDeclaration'] (this,
		dependencyName,
		dependencyInformation,
		dependencyValidationUtility,
		propertyBuilderFactory,
		scopeTypes);

	this._dependencyInformation.location = moduleName;
	this._dependencyInformation.dependencyType = dependencyTypes.moduleDependency;
	var self = this;
	this._propertyBuilder.addGetterProperty('dependencyInformation', function () {
		self.populate();
		return self._dependencyInformation;
	});
};

ModuleDependencyDeclaration.prototype.populate = function () {
	var self = this;
	this._dependencyInformation.build = function () {
		return require(self._dependencyInformation.location);
	};
};

var ModuleDependencyDeclarationFactory = function (dependencyInformationFactory,
												   	dependencyValidationUtility,
													propertyBuilderFactory,
													dependencyTypes,
													scopeTypes) {
	this._dependencyInformationFactory = dependencyInformationFactory;
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._propertyBuilderFactory = propertyBuilderFactory;
	this._dependencyTypes = dependencyTypes;
	this._scopeTypes = scopeTypes;
};

ModuleDependencyDeclarationFactory.prototype.createModuleDependencyDeclaration = function (dependencyName, moduleName) {
	return new ModuleDependencyDeclaration(dependencyName,
		moduleName,
		this._dependencyInformationFactory.createDependencyInformation(),
		this._dependencyValidationUtility,
		this._propertyBuilderFactory,
		this._dependencyTypes,
		this._scopeTypes);

};

//define the inheritance for Module Dependency Declaration.
imports.inheritanceUtilities.prototypeOf('ModuleDependencyDeclaration',ModuleDependencyDeclaration).
	extend(imports.baseDependencyDeclarationContainer);



module.exports.ModuleDependencyDeclarationFactory = ModuleDependencyDeclarationFactory;
module.exports.ModuleDependencyDeclaration = ModuleDependencyDeclaration;