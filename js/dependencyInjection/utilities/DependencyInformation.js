"use strict";

var generateErrorMessage = function (variableName, value, dependencyName) {
    return "value '" + value + "' given for '" + variableName + "' is invalid for dependency '" + dependencyName + "'";
};

var DependencyInformation = function (propertyBuilderFactory, dependencyTypes, scopeTypes) {

    this._scopeTypes = scopeTypes;
    this._dependencyTypes = dependencyTypes;
    this._propertyBuilder = propertyBuilderFactory.createPropertyBuilder(this);


    var self = this;

    // types that can be validated on set.
    this._addPropertyWithValidation('scopeType', function (value) {
        if (!scopeTypes.typeIsValid(value)) {
            throw generateErrorMessage('scopeType', value, self.dependencyName);
        }
    });

    this._addPropertyWithValidation('constructorFunction',  function (value) {
        if (typeof value !== 'function') {
            throw generateErrorMessage('constructorFunction', typeof value, self.dependencyName);
        }
    });

    this._addPropertyWithValidation('dependencyType', function (value) {
        if (!dependencyTypes.typeIsValid(value)) {
            throw generateErrorMessage('dependencyType', value, self.dependencyName);
        }
    });

    // don't need it anymore.
    this._propertyBuilder.lockAllProperties();
    delete this._propertyBuilder;

};

DependencyInformation.prototype._addPropertyWithValidation = function (name, validationFunction) {
    if (!this._backingValues) {
        this._backingValues = {};
    }
    var self = this;

    this._propertyBuilder.addGetterSetterProperty(name,
        function () {return self._backingValues[name]; },
        function (value) {
            validationFunction(value);
            self._backingValues[name] = value;
        });

};

var DependencyInformationFactory = function (propertyBuilderFactory,
                                            scopeTypes,
                                            dependencyTypes) {
        this._propertyBuilderFactory = propertyBuilderFactory;
        this._scopeTypes = scopeTypes;
        this._dependencyTypes = dependencyTypes;
    };


DependencyInformationFactory.prototype.createDependencyInformation = function () {
    return new DependencyInformation(this._propertyBuilderFactory, this._dependencyTypes, this._scopeTypes);
};

module.exports.DependencyInformationFactory = DependencyInformationFactory;
module.exports.DependencyInformation = DependencyInformation;
