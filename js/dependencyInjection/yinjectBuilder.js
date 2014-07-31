'use strict';
var nodeUtilities = require(__dirname + 'js/../utilities/nodeUtilities.js');
var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname);
var requireEnum = nodeUtilities.requireEnum;

var yinject = requireFrom('Yinject.js');
var scopeTypes = requireEnum('scopeTypes.js');
var dependencyTypes = requireEnum('dependencyTypes.js');


// diUtilities should be a common set of utilities needed.
// Path and enumerations come to mind.
var diUtilities = {};
diUtilities.pathBuilder = nodeUtilities.pathBuilder;
diUtilities.scopeTypes = scopeTypes;
diUtilities.dependencyTypes = dependencyTypes;

var addDependenciesToContainer = function (dependencyInjector, iocDeclarationsFileLocation) {
    var ioc = require(iocDeclarationsFileLocation);
    ioc.getDependencyDeclarations(dependencyInjector, diUtilities);
    return dependencyInjector;
};

var createDependencyInjectorContainer = function (dependencyFileLocationsArray) {
    var i;
    var container = new yinject.Yinject();

    for (i = 0; i < dependencyFileLocationsArray.length; i++) {
        container = addDependenciesToContainer(container, dependencyFileLocationsArray[i]);
    }

    return container;
};

module.exports.createDependencyInjectorContainer = createDependencyInjectorContainer;