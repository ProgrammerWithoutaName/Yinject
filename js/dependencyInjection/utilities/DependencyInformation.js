"use strict";

var generateErrorMessage = function (variableName, value, dependencyName) {
	return "value '" + value + "' given for '" + variableName +"' is invalid for dependency '" + dependencyName + "'";
};

var DependencyInformation = function (propertyBuilderFactory, dependencyTypes, scopeTypes) {

	this._scopeTypes = scopeTypes;
	this._dependencyTypes = dependencyTypes;
	this._propertyBuilder = propertyBuilderFactory.createPropertyBuilder(this);

	// defaults with getter/setter.
	this._addProperty('dependencyName');
	this._addProperty('dependencies');
	this._addProperty('prototypeName');
	this._addProperty('location');

	var self = this;

	// types that can be validated on set.
	this._addPropertyWithValidation('scopeTypes', function(value) {
		if(!scopeTypes.typeIsValid(value)) {
			throw generateErrorMessage('scopeType', value, self.dependencyName)
		}
	});

	this._addPropertyWithValidation('constructorFunction',  function (value) {
		if(typeof value !== 'function') {
			throw generateErrorMessage('constructorFunction', typeof value, self.dependencyName);
		}
	});

	this._addPropertyWithValidation('dependencyType', function(value) {
		if(!scopeTypes.typeIsValid(value)) {
			throw generateErrorMessage('dependencyType', value, self.dependencyName);
		}
	});

	// don't need it anymore.
	this._propertyBuilder.lockAllProperties();
	delete this._propertyBuilder;

};

DependencyInformation.prototype._addPropertyWithValidation = function(name, validationFunction) {
	var backingValue = null;

	this._propertyBuilder.addGetterProperty(name, function () {return backingValue;});
	this._propertyBuilder.addSetterProperty(name,  function (value) {
		validationFunction(value);
		backingValue = value;
	});

};

DependencyInformation.prototype._addProperty = function(name) {
	this[name] = this._propertyBuilder.addProperty(name,true);
};

var DependencyInformationFactory = function (propertyBuilderFactory,
											scopeTypes,
											dependencyTypes) {
	this._propertyBuilderFactory = propertyBuilderFactory;
	this._scopeTypes = scopeTypes;
	this._dependencyTypes = dependencyTypes;
};


DependencyInformationFactory.prototype.createDependencyInformation = function () {
	return new DependencyInformation (this._propertyBuilderFactory, this._dependencyTypes, this._scopeTypes)
};

module.exports.DependencyInformationFactory = DependencyInformationFactory;
module.exports.DependencyInformation = DependencyInformation;
