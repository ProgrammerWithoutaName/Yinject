'use strict';

// useful example and test.
// rework locations.
var getDependencyDeclarations = function (diContainer, diUtilities) {
    var pathOf = diUtilities.pathBuilder(__dirname);

    // prototypes
    diContainer.forDependency('eventManagerBuilder').usePrototype('EventManagerBuilder').from(pathOf('../../js/utilities/EventManagerBuilder.js'));
    diContainer.forDependency('propertyBuilder').usePrototype('PropertyBuilder').from(pathOf('../../js/utilities/PropertyBuilder.js'));
    diContainer.forDependency('cache').usePrototype('Cache').from(pathOf('/Cache.js'));

    // modules
    diContainer.forDependency('arrayUtilities').useModule(pathOf('../../js/utilities/arrayUtilities.js'));
    diContainer.forDependency('functionReflection').useModule(pathOf('../../js/utilities/functionReflection.js'));
    diContainer.forDependency('nodeUtilities').useModule(pathOf('../../js/utilities/nodeUtilities.js'));
    diContainer.forDependency('prototypeUtilities').useModule(pathOf('../../js/utilities/prototypeUtilities.js'));

    return diContainer;
};

module.exports.getDependencyDeclarations = getDependencyDeclarations;