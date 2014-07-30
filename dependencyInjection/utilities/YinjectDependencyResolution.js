"use strict";

/*
 Scope:
 Default: creates new dependency each time
 Request: Only creates one of the types per "resolve"
 Singleton: creates
 */
var YinjectDependencyResolution = function () {
    // private
    this.container = {};
    this._singletons = {};
};


// how do we resolve a cross dependency, or at least detect one?
// This is how http://misko.hevery.com/2008/08/01/circular-dependency-in-constructors-and-dependency-injection/
// Worth noting: Circular dependencies are bad anyways. How do we at least detect them?
YinjectDependencyResolution.prototype._resolveWithoutScope = function (dependencyImplementation, scopes) {
    var resolvedDependencies = {};
    var dependenciesToResolve = dependencyImplementation.dependencies();
    var i, currentDependencyImplementation;

    for (i = 0; i < dependenciesToResolve.length; i++) {
        currentDependencyImplementation = this.container[dependenciesToResolve[i]];
        if (currentDependencyImplementation.scope() === 'default') {
            resolvedDependencies[currentDependencyImplementation.dependencyName()] = this._resolveWithoutScope(currentDependencyImplementation, scopes);
        } else {
            resolvedDependencies[currentDependencyImplementation.dependencyName()] = this._resolveFromScope(scopes[currentDependencyImplementation.scope()], currentDependencyImplementation, scopes);
        }
    }
    return dependencyImplementation.build(resolvedDependencies);
};

YinjectDependencyResolution.prototype._resolveFromScope = function (scope, dependencyImplementation, scopes) {
    if (scope[dependencyImplementation.dependencyName()] === undefined) {
        scope[dependencyImplementation.dependencyName()] = this._resolveWithoutScope(dependencyImplementation, scopes);
    }
    return scope[dependencyImplementation.dependencyName()];
};

// public
YinjectDependencyResolution.prototype.add = function (declaration) {
    declaration.verify();
    declaration.populate();
    var dependencyImplementation = declaration.getDependencyInformation();
    this.container[dependencyImplementation.dependencyName()] = dependencyImplementation;
};

YinjectDependencyResolution.prototype.resolve = function (dependencyName) {
    var scopes = {
        request : {},
        singleton : this._singletons
    };
    var implementationGiven = this.container[dependencyName];
    var resolvedDependency;

    // technically, if this is a request scope it could cause problems with circular dependencies.
    //TODO: Fix circular dependency issues. At least verify they exist and throw a warning.
    if (implementationGiven.scope() === 'default') {
        resolvedDependency = this._resolveWithoutScope(implementationGiven, scopes);
    } else {
        resolvedDependency = this._resolveFromScope(scopes[implementationGiven.scope()], implementationGiven, scopes);
    }
    return resolvedDependency;
};

module.exports.YinjectDependencyResolution = YinjectDependencyResolution;

