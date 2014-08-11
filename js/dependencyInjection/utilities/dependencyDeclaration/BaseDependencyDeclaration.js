"use strict";

// for dependency 'foo' use prototype 'bar' from 'place.js' resolved with 'request scope'

var BaseDependencyDeclaration = function (dependencyName,
											propertyBuilderFactory,
											dependencyValidationUtility,
											dependencyInformation,
											scopeTypes) {
	// required type
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._propertyBuilder = propertyBuilderFactory.createPropertyBuilder(this);
	this._scopeTypes = scopeTypes;

	this._initDependencyInformation(dependencyInformation,dependencyName);

	this._propertyBuilder.addPropertyWithStartingValue('dependencyInformation', this._dependencyInformation, false);

	this._buildInKeywords();
};

BaseDependencyDeclaration.prototype._initDependencyInformation = function (dependencyInformation, dependencyName) {
	this._dependencyInformation = dependencyInformation;
	this._dependencyInformation.dependencyName = this._dependencyInformation.dependencyName || dependencyName;
	this._dependencyInformation.scopeType =  this._dependencyInformation.scopeType || this._scopeTypes.defaultScope;
	this._dependencyInformation.dependencies = this._dependencyInformation.dependencies || [];
};

/**
 * ### _buildInKeywords
 * this builds the "with" keyword for declaring the scope of a dependency.
 * this should make the command look like this:
 *  .in.defaultScope
 *  .in.requestScope
 *  .in.singletonScope
 * @private
 */
BaseDependencyDeclaration.prototype._buildInKeywords = function () {
	var keywordWith = {};
	var self = this;
	this._propertyBuilder.addPropertyWithStartingValue('with', keywordWith, false);

	var scopePropertyBuilder = this._propertyBuilderFactory.createPropertyBuilder(keywordWith);

	// with.defaultScope
	scopePropertyBuilder.addGetterProperty('defaultScope', function () {
			self._dependencyInformation.scope = this.scopeTypes.defaultScope;
			return self;
	});

	// with.requestScope
	scopePropertyBuilder.addGetterProperty('requestScope', function () {
		self._dependencyInformation.scope = this.scopeTypes.requestScope;
		return self;
	});

	// with.singletonScope
	scopePropertyBuilder.addGetterProperty('singletonScope', function () {
		self._dependencyInformation.scope = this.scopeTypes.singletonScope;
		return self;
	});
};

BaseDependencyDeclaration.prototype.verify = function () {
	this._dependencyValidationUtility.verifyDependencyInformation(this._dependencyInformation);
};


module.exports.BaseDependencyDeclaration = BaseDependencyDeclaration;