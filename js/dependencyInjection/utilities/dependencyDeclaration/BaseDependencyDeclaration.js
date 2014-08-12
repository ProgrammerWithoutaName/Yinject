"use strict";

// for dependency 'foo' use prototype 'bar' from 'place.js' resolved with 'request scope'

var BaseDependencyDeclaration = function (dependencyName,
    dependencyInformation,
    dependencyValidationUtility,
    propertyBuilderFactory,
    scopeTypes) {
    // required type
    this._dependencyValidationUtility = dependencyValidationUtility;
    this._propertyBuilder = propertyBuilderFactory.createPropertyBuilder(this);
    this._propertyBuilderFactory = propertyBuilderFactory;
    this._scopeTypes = scopeTypes;

    this._initDependencyInformation(dependencyInformation, dependencyName);

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
    var keywordIn = {};
    var self = this;
    this._propertyBuilder.addPropertyWithStartingValue('in', keywordIn, false);

    var scopePropertyBuilder = this._propertyBuilderFactory.createPropertyBuilder(keywordIn);

    // with.defaultScope
    scopePropertyBuilder.addGetterProperty('defaultScope', function () {
        self._dependencyInformation.scope = self._scopeTypes.defaultScope;
        return self;
    });

    // with.requestScope
    scopePropertyBuilder.addGetterProperty('requestScope', function () {
        self._dependencyInformation.scope = self._scopeTypes.requestScope;
        return self;
    });

    // with.singletonScope
    scopePropertyBuilder.addGetterProperty('singletonScope', function () {
        self._dependencyInformation.scope = self._scopeTypes.singletonScope;
        return self;
    });
};

BaseDependencyDeclaration.prototype.verify = function () {
    this._dependencyValidationUtility.verifyDependencyInformation(this._dependencyInformation);
};


module.exports.BaseDependencyDeclaration = BaseDependencyDeclaration;