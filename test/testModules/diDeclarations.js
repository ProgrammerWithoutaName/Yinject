'use strict';

// useful example and test.
// rework locations.
var getDependencyDeclarations = function (diContainer, diUtilities) {
    var pathOf = diUtilities.pathBuilder(__dirname);

    // prototypes
    diContainer.forDependency('eventManagerBuilder').usePrototype('EventManagerFactory').from(pathOf('../../js/utilities/EventManagerFactory.js'));
    diContainer.forDependency('propertyBuilder').usePrototype('PropertyFactory').from(pathOf('../../js/utilities/PropertyFactory.js'));
    diContainer.forDependency('cache').usePrototype('Cache').from(pathOf('/Cache.js'));

    // modules
    diContainer.forDependency('arrayUtilities').useModule(pathOf('../../js/utilities/arrayUtilities.js'));
    diContainer.forDependency('functionReflection').useModule(pathOf('../../js/utilities/functionReflection.js'));
    diContainer.forDependency('nodeUtilities').useModule(pathOf('../../js/utilities/nodeUtilities.js'));
    diContainer.forDependency('prototypeUtilities').useModule(pathOf('../../js/utilities/prototypeUtilities.js'));

    return diContainer;
};

module.exports.getDependencyDeclarations = getDependencyDeclarations;