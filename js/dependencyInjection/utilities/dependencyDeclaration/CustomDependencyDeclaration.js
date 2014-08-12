"use strict";

// this is only meant for getting utilities that can't be injected.
var imports = require(__dirname + '/imports.js');

var CustomDependencyDeclaration = function (dependencyName,
											constructor,
											dependencyInformation,
											dependencyValidationUtility,
											functionUtilities,
											propertyBuilderFactory,
											dependencyTypes,
											scopeTypes) {
	CustomDependencyDeclaration.__base['BaseDependencyDeclaration'] (this,
		dependencyName,
		dependencyInformation,
		dependencyValidationUtility,
		propertyBuilderFactory,
		scopeTypes);


	if(typeof constructor === 'function') {
		this._dependencyInformation.constructorFunction = constructor;
	} else {
		this._dependencyInformation.constructorName = constructor;
	}

	this._dependencyInformation.dependencyType = dependencyTypes.customDependency;

	this._functionUtilities = functionUtilities;

	var self = this;
	this._propertyBuilder.addGetterProperty('dependencyInformation', function () {
		self.populate();
		return self._dependencyInformation;
	});
};

CustomDependencyDeclaration.prototype.populate = function () {
	if(!this._dependencyInformation.constructorFunction) {
		this._getConstructorFunction();
	}
	this._dependencyInformation.dependencies = this._functionUtilities.getFunctionArguments(this._dependencyInformation.constructor);

	this._createBuildFromCustomFunction();
};

CustomDependencyDeclaration.prototype._getConstructorFunction = function () {
	var module = require(this._dependencyInformation.location);
	this._dependencyInformation.constructorFunction = module[this._dependencyInformation.constructorName];
};

CustomDependencyDeclaration.prototype._createBuildFromCustomFunction = function () {
	var self = this;
	self._dependencyInformation.dependencies = this._functionUtilities.getFunctionArguments(self._dependencyInformation.constructorFunction);

	this._dependencyInformation.build = function (dependencies) {
		var constructedArguments = self._functionUtilities.buildArguments(self._dependencyInformation.dependencies, dependencies);
		return self._functionUtilities.safeFunctionApply(self._dependencyInformation.constructorFunction, constructedArguments);
	};
};


// in strongly type languages, I'd simply make a type to cover this.
// Unfortunately, in JS, I feel like this would be not as clear as listing everything out
var CustomDependencyDeclarationFactory = function (dependencyInformationFactory,
													dependencyValidationUtility,
													functionUtilities,
													propertyBuilderFactory,
													dependencyTypes,
													scopeTypes){

	this._dependencyInformationFactory = dependencyInformationFactory;
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._dependencyTypes = dependencyTypes;
	this._scopeTypes = scopeTypes;
	this._functionUtilities = functionUtilities;
	this._propertyBuilderFactory = propertyBuilderFactory;
};

CustomDependencyDeclarationFactory.prototype.createCustomDependencyDeclaration = function (dependencyName, constructor) {
	return new CustomDependencyDeclaration(dependencyName,
		constructor,
		this._dependencyInformationFactory.createDependencyInformation(),
		this._dependencyValidationUtility,
		this._functionUtilities,
		this._propertyBuilderFactory,
		this._dependencyTypes,
		this._scopeTypes)
};


imports.inheritanceUtilities.prototypeOf('CustomDependencyDeclaration',CustomDependencyDeclaration).
	extend(imports.baseDependencyDeclarationContainer,
			imports.locationBasedDependencyDeclarationContainer);

module.exports.CustomDependencyDeclarationFactory = CustomDependencyDeclarationFactory;
module.exports.CustomDependencyDeclaration = CustomDependencyDeclaration;