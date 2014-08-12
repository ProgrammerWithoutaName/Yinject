'use strict';

/*
Scope:
    Default: creates new dependency each time
    Request: Only creates one of the types per "resolve"
    Singleton: creates
 */
var Yinject = function (yinjectDependencyResolution, dependencyDeclarationUtility, dependencyContainerValidation) {
    // private
    this._resolver = yinjectDependencyResolution;
	this._dependencyDeclaration = dependencyDeclarationUtility;
	this._dependencyContainerValidation = dependencyContainerValidation;
    this._uncheckedDeclarations = [];
    this._declarations = [];
};

Yinject.prototype._pushDeclaration = function (dependency) {
    this._uncheckedDeclarations.push(dependency);
};

Yinject.prototype._validateDependencyContainer = function () {
    this._dependencyContainerValidation.validateContainer(this._resolver.container, this._declarations);
};

//is compile the right word??
Yinject.prototype._compileAllUncheckedDeclarations = function () {
    var i;
    if (this._uncheckedDeclarations.length > 0) {
        for (i = 0; i < this._uncheckedDeclarations.length; i++) {

            this._resolver.add(this._uncheckedDeclarations[i]);
			this._declarations.push(this._uncheckedDeclarations[i].dependencyInformation);
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
            var declaration = self._dependencyDeclaration.createPrototypeDependency(dependencyName, prototypeName);
            self._pushDeclaration(declaration);
            return declaration;
        },
        useModule: function (moduleName) {
            var declaration = self._dependencyDeclaration.createModuleDependency(dependencyName, moduleName);
            self._pushDeclaration(declaration);
            return declaration;
        },
        useCustomConstructor: function (constructor) {
            var declaration = self._dependencyDeclaration.createCustomConstructorDependency(dependencyName, constructor);
            self._pushDeclaration(declaration);
            return declaration;
        }
    };
};

//not that it should be needed....
var YinjectFactory = function (yinjectDependencyResolutionFactory, dependencyDeclarationUtility, dependencyContainerValidation) {
	this._yinjectDependencyResolutionFactory = yinjectDependencyResolutionFactory;
	this._dependencyDeclarationUtility = dependencyDeclarationUtility;
	this._dependencyContainerValidation = dependencyContainerValidation;
};

YinjectFactory.prototype.createYinjector = function () {
	return new Yinject(this._yinjectDependencyResolutionFactory.createDependencyResolution()
		, this._dependencyDeclarationUtility
		, this._dependencyContainerValidation);
};

module.exports.YinjectFactory = YinjectFactory;
module.exports.Yinject = Yinject;


