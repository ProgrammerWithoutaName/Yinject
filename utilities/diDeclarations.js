'use strict';

// useful example and test.
var getDependencyDeclarations = function (diContainer, diUtilities) {
    var pathOf = diUtilities.pathBuilder(__dirname);

    // prototypes
    diContainer.forDependency('eventManagerBuilder').usePrototype('EventManagerBuilder').from(pathOf('/EventManagerBuilder.js'));
    diContainer.forDependency('propertyBuilder').usePrototype('PropertyBuilder').from(pathOf('/PropertyBuilder.js'));
    diContainer.forDependency('cache').usePrototype('Cache').from(pathOf('/Cache.js'));

    // modules
    diContainer.forDependency('arrayUtilities').useModule(pathOf('arrayUtilities.js'));
    diContainer.forDependency('functionReflection').useModule(pathOf('functionReflection.js'));
    diContainer.forDependency('nodeUtilities').useModule(pathOf('nodeUtilities.js'));
    diContainer.forDependency('prototypeUtilities').useModule(pathOf('prototypeUtilities.js'));

    return diContainer;
};

module.exports.getDependencyDeclarations = getDependencyDeclarations;