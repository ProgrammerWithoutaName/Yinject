'use strict';
var nodeUtilities = require(__dirname + '/../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);

var YinjectDependencyResolution = requireFrom('utilities/YinjectDependencyResolution.js').YinjectDependencyResolution;
var dependencyDeclaration = requireFrom('utilities/dependencyDeclaration/dependencyDeclaration.js');
var dependencyContainerValidation = requireFrom('/utilities/dependencyContainerValidation/dependencyContainerValidation.js');
/*
Scope:
    Default: creates new dependency each time
    Request: Only creates one of the types per "resolve"
    Singleton: creates
 */
var Yinject = function () {
    // private
    this._resolver = new YinjectDependencyResolution();
    this._uncheckedDeclarations = [];
    this._declarations = [];
};

Yinject.prototype._pushDeclaration = function (dependency) {
    this._uncheckedDeclarations.push(dependency);
    this._declarations.push(dependency.getDependencyInformation());
};

Yinject.prototype._validateDependencyContainer = function () {
    dependencyContainerValidation.validateContainer(this._resolver.container, this._declarations);
};

//is compile the right word??
Yinject.prototype._compileAllUncheckedDeclarations = function () {
    var i;
    if (this._uncheckedDeclarations.length > 0) {
        for (i = 0; i < this._uncheckedDeclarations.length; i++) {
            this._resolver.add(this._uncheckedDeclarations[i]);
        }
        this._uncheckedDeclarations = [];

        this._validateDependencyContainer();
    }
};

Yinject.prototype.resolve = function (dependencyName) {
    this._compileAllUncheckedDeclarations();
    return this._resolver.resolve(dependencyName);
};

Yinject.prototype.forDependency = function (dependencyName) {
    var self = this;
    return {
        usePrototype: function (prototypeName) {
            var declaration = dependencyDeclaration.createPrototypeDependency(dependencyName, prototypeName);
            self._pushDeclaration(declaration);
            return declaration;
        },
        useModule: function (moduleName) {
            var declaration = dependencyDeclaration.createModuleDependency(dependencyName, moduleName);
            self._pushDeclaration(declaration);
            return declaration;
        },
        useCustomConstructor: function (constructor) {
            var declaration = dependencyDeclaration.createCustomConstructorDependency(dependencyName, constructor);
            self._pushDeclaration(declaration);
            return declaration;
        }
    };
};



module.exports.Yinject = Yinject;

