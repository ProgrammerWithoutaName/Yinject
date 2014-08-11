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
	dependencyTypes,
	scopeTypes,
	propertyBuilderFactory) {

	ModuleDependencyDeclaration.__base['BaseDependencyDeclaration'] (this,
		dependencyName,
		propertyBuilderFactory,
		dependencyValidationUtility,
		dependencyInformation,
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
		return require(self._dependencyInformation.location());
	};
};

var ModuleDependencyDeclarationFactory = function (dependencyInformationFactory,
												   	dependencyValidationUtility,
													_propertyBuilderFactory,
													dependencyTypes,
													scopeTypes) {
	this._dependencyInformationFactory = dependencyInformationFactory;
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._dependencyTypes = dependencyTypes;
	this._scopeTypes = scopeTypes;
};

ModuleDependencyDeclarationFactory.prototype.createModuleDependencyDeclaration = function (dependencyName, moduleName) {
	return new ModuleDependencyDeclaration(dependencyName,
		moduleName,
		this._dependencyInformationFactory.createDependencyInformation(),
		this._dependencyValidationUtility,
		this.dependencyTypes,
		this.scopeTypes);
};

//define the inheritance for Module Dependency Declaration.
imports.inheritenceUtilities.prototypeOf('ModuleDependencyDeclaration',ModuleDependencyDeclaration).
	extends(imports.baseDependencyDeclarationContainer);



module.exports.ModuleDependencyDeclarationFactory = ModuleDependencyDeclarationFactory;
module.exports.ModuleDependencyDeclaration = ModuleDependencyDeclaration;