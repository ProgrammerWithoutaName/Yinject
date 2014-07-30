"use strict";
// Always going do this section first. Makes importing everything else much easier.
var nodeUtilities = require(__dirname + '/../../utilities/nodeUtilities.js');
var requireUtility = nodeUtilities.requireUtility;
var requireEnum = nodeUtilities.requireEnum;

// Prototype Imports
var PropertyBuilder = requireUtility('PropertyBuilder.js').PropertyBuilder;
var EventManagerBuilder = requireUtility('EventManagerBuilder.js').EventManagerBuilder;

// Utility Imports
var arrayUtilities = requireUtility('arrayUtilities.js');

// Enumeration Imports
var scopeTypes = requireEnum('scopeTypes.js');
var dependencyTypes = requireEnum('dependencyTypes.js');


var buildProp = function (propBuilder, watchedItem) {
    return propBuilder.buildProperty(
        function () { return watchedItem; },
        function (value) { watchedItem = value; }
    );
};

var scopeIsValid = function (givenScope) {
    return arrayUtilities.valueExistsInArray(scopeTypes.allValues, givenScope);
};

var typeIsValid = function (givenType) {
    return arrayUtilities.valueExistsInArray(dependencyTypes.allValues, givenType);
};

// populated with information about instantiating the implementation of a given dependency
var DependencyInformation = function () {
    this._diData = {
        scope: null,
        dependencyType: null,
        dependencyName: null,
        dependencies: null,
        prototypeName: null,
        location: null,
        constructor: null
    };

    var eventManagerBuilder = new EventManagerBuilder();
    var propBuilder = new PropertyBuilder(eventManagerBuilder);

    var self = this;
    this.scope = buildProp(propBuilder, this._diData.scope);
    this.dependencyType = buildProp(propBuilder, this._diData.dependencyType);
    this.dependencyName = buildProp(propBuilder, this._diData.dependencyName);
    this.dependencies = buildProp(propBuilder, this._diData.dependencies);
    this.prototypeName = buildProp(propBuilder, this._diData.prototypeName);
    this.location = buildProp(propBuilder, this._diData.location);
    this.constructor = buildProp(propBuilder, this._diData.constructor);

    this.scope.addSetEvent(function (sender, eventArgs) {
        if (!scopeIsValid(eventArgs.newValue)) {
            throw 'given dependency scope is not valid for dependency ' + self.dependencyName() + '.';
        }
    });

    this.dependencyType.addSetEvent(function (sender, eventArgs) {
        if (!typeIsValid(eventArgs.newValue)) {
            throw 'given dependency type is not valid.';
        }
    });
};

module.exports.scopeIsValid = scopeIsValid;
module.exports.typeIsValid = typeIsValid;

module.exports.DependencyInformation = DependencyInformation;
