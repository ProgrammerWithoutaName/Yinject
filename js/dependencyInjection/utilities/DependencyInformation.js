"use strict";

var buildProp = function (propertyFactory, itemOwner, watchedItemName) {
	return propertyFactory.createProperty(
		function () { return itemOwner[watchedItemName]; },
		function (value) { itemOwner[watchedItemName] = value; }
	);
};

var DependencyInformation = function (propertyFactory, dependencyTypes, scopeTypes) {
	this._diData = {
		scope: null,
		dependencyType: null,
		dependencyName: null,
		dependencies: null,
		prototypeName: null,
		location: null,
		constructor: null
	};

	var self = this;
	this.scope = buildProp(propertyFactory, this._diData, 'scope');
	this.dependencyType = buildProp(propertyFactory, this._diData, 'dependencyType');
	this.dependencyName = buildProp(propertyFactory, this._diData, 'dependencyName');
	this.dependencies = buildProp(propertyFactory, this._diData, 'dependencies');
	this.prototypeName = buildProp(propertyFactory, this._diData, 'prototypeName');
	this.location = buildProp(propertyFactory, this._diData, 'location');
	this.constructor = buildProp(propertyFactory, this._diData, 'constructor');

	this.scope.addSetEvent(function (sender, eventArgs) {
		if (!scopeTypes.typeIsValid(eventArgs.newValue)) {
			throw 'given dependency scope is not valid for dependency ' + self.dependencyName() + '.';
		}
	});

	this.dependencyType.addSetEvent(function (sender, eventArgs) {
		if (!dependencyTypes.typeIsValid(eventArgs.newValue)) {
			throw 'given dependency type is not valid.';
		}
	});
};

var DependencyInformationFactory = function (propertyFactory,
											scopeTypes,
											dependencyTypes) {
	this._propertyFactory = propertyFactory;
	this._scopeTypes = scopeTypes;
	this._dependencyTypes = dependencyTypes;
};


DependencyInformationFactory.prototype.createDependencyInformation = function () {
	return new DependencyInformation (this._propertyFactory, this._dependencyTypes, this._scopeType)
};

module.exports.DependencyInformationFactory = DependencyInformationFactory;
module.exports.DependencyInformation = DependencyInformation;
