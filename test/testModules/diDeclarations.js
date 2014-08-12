'use strict';

// useful example and test.
// rework locations.
var getDependencyDeclarations = function (diContainer, diUtilities) {
    var pathOf = diUtilities.pathBuilder(__dirname);

    // prototypes
    diContainer.forDependency('propertyBuilderFactory').
		usePrototype('PropertyBuilderFactory').
		from(pathOf('../../js/utilities/PropertyBuilder.js')).
		in.singletonScope;

	diContainer.forDependency('eventManagerFactory').
		usePrototype('EventManagerFactory').
		from(pathOf('../../js/utilities/EventManager.js'));

	diContainer.forDependency('inheritanceUtilities').
		usePrototype('InheritanceUtilities').
		from(pathOf('../../js/utilities/inheritance/InheritanceUtilities.js')).
		in.singletonScope;

	diContainer.forDependency('inheritanceBuilderFactory').
		usePrototype('InheritanceBuilderFactory').
		from(pathOf('../../js/utilities/inheritance/InheritanceBuilder.js'));

	diContainer.forDependency('methodExtensionUtility').
		usePrototype('MethodExtensionUtility').
		from(pathOf('../../js/utilities/inheritance/MethodExtensionUtility.js')).
		in.requestScope;

	diContainer.forDependency('metaFactory').
		usePrototype('MetaFactory').
		from(pathOf('../../js/utilities/inheritance/Meta.js')).
		in.requestScope;


    // modules
    diContainer.forDependency('functionReflection').
		useModule(pathOf('../../js/utilities/functionReflection.js')).
		in.singletonScope;

    diContainer.forDependency('prototypeUtilities').
		useModule(pathOf('../../js/utilities/prototypeUtilities.js')).
		in.requestScope;

	diContainer.forDependency('dependencyTypes').
		useModule(pathOf('../../js/enumerations/dependencyTypes.js')).
		in.singletonScope;

	diContainer.forDependency('scopeTypes').
		useModule(pathOf('../../js/enumerations/scopeTypes.js')).
		in.singletonScope;

	// Custom
	diContainer.forDependency('functionUtilities').
		useCustomConstructor('buildFunctionUtilities').
		from(pathOf('../../js/utilities/functionUtilities.js'));

	diContainer.forDependency('nodeUtilities').
		useCustomConstructor('buildNodeUtilities').
		from(pathOf('../../js/utilities/nodeUtilities.js')).
		in.singletonScope;


    return diContainer;
};

module.exports.getDependencyDeclarations = getDependencyDeclarations;