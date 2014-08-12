
// boot strap
var utilityBuilder = require(__dirname + '/js/utilities/utilityBuilder.js');
var baseUtils = utilityBuilder.utilities;

// Base Utilities- I already have these built out elsewhere because these can be required before IOC can really take place
// I use nodeUtilities for pulling in everything
// I use array in various places, but function and prototype are used for DependencyDeclaration and building.
var nodeUtilities = utilityBuilder.buildUtility(baseUtils.nodeUtilities);
var functionUtilities = utilityBuilder.buildUtility(baseUtils.functionUtilities);
var prototypeUtilities = utilityBuilder.buildUtility(baseUtils.prototypeUtilities);

var requireFrom = nodeUtilities.requireFromLocationBuilder(__dirname + '/js');

//enumerations:
var scopeTypes = nodeUtilities.requireEnum('scopeTypes.js').scopeTypes;
var dependencyTypes = nodeUtilities.requireEnum('dependencyTypes.js').dependencyTypes;

// Yinject
var yinjectModule = requireFrom('/dependencyInjection/Yinject.js');
var yinjectBuilderModule = requireFrom('/dependencyInjection/yinjectBuilder.js');
var yinjectDependencyResolutionModule = requireFrom('/dependencyInjection/utilities/YinjectDependencyResolution.js');

// Dependency Declaration
var dependencyDeclarationModule = requireFrom('/dependencyInjection/utilities/dependencyDeclaration/dependencyDeclaration.js');
var prototypeDependencyDeclarationModule = requireFrom('/dependencyInjection/utilities/dependencyDeclaration/PrototypeDependencyDeclaration.js');
var moduleDependencyDeclarationModule = requireFrom('/dependencyInjection/utilities/dependencyDeclaration/ModuleDependencyDeclaration.js');
var customDependencyDeclarationModule = requireFrom('/dependencyInjection/utilities/dependencyDeclaration/CustomDependencyDeclaration.js');

// Dependency Information
var dependencyInformationModule = requireFrom('/dependencyInjection/utilities/DependencyInformation.js');

// Dependency Validation
var dependencyValidationModule = requireFrom('/dependencyInjection/utilities/validation/dependencyValidation.js');
var prototypeDependencyValidationModule = requireFrom('/dependencyInjection/utilities/validation/prototypeDependencyValidation.js');
var customDependencyValidationModule = requireFrom('/dependencyInjection/utilities/validation/customDependencyValidation.js');
var baseDependencyValidationModule = requireFrom('/dependencyInjection/utilities/validation/baseDependencyValidation.js');

// Container Validation
var requirementsValidationModule = requireFrom('/dependencyInjection/utilities/dependencyContainerValidation/requirementsValidation.js');
var dependencyContainerValidationModule = requireFrom('/dependencyInjection/utilities/dependencyContainerValidation/dependencyContainerValidation.js');
var circularDependencyValidationModule = requireFrom('/dependencyInjection/utilities/dependencyContainerValidation/circularDependencyValidation.js');

// Utilities not previously mentioned:
var propertyBuilderModule = nodeUtilities.requireUtility('PropertyBuilder.js');

// this is the fun part....
// I need to construct all dependencies by hand here to return the dependency builder. I'd love to have it use itself to build itself, but yeah...

// Dependency Build Out (The sort of this a dependency Injector would be good for...)



var propertyBuilderFactory = new propertyBuilderModule.PropertyBuilderFactory();

var dependencyInformationFactory = new dependencyInformationModule.DependencyInformationFactory(propertyBuilderFactory,
	scopeTypes,
	dependencyTypes);

// dependency Validation
var baseValidationUtility = baseDependencyValidationModule.buildBaseDependencyValidationUtility(scopeTypes,dependencyTypes);
var customDependencyValidationUtility = customDependencyValidationModule.buildCustomDependencyValidationUtility(baseValidationUtility);
var prototypeDependencyValidationUtility = prototypeDependencyValidationModule.buildPrototypeDependencyValidationUtility(baseValidationUtility);

var dependencyValidationUtility = dependencyValidationModule.buildDependencyValidationUtility( baseValidationUtility,
	prototypeDependencyValidationUtility,
	customDependencyValidationUtility,
	dependencyTypes);

// Declaration
var prototypeDependencyDeclarationFactory = new prototypeDependencyDeclarationModule.PrototypeDependencyDeclarationFactory(dependencyInformationFactory,
	dependencyValidationUtility,
	functionUtilities,
	prototypeUtilities,
	propertyBuilderFactory,
	dependencyTypes,
	scopeTypes);

var customDependencyDeclarationFactory = new customDependencyDeclarationModule.CustomDependencyDeclarationFactory (dependencyInformationFactory,
	dependencyValidationUtility,
	functionUtilities,
	propertyBuilderFactory,
	dependencyTypes,
	scopeTypes);

var moduleDependencyDeclarationFactory = new moduleDependencyDeclarationModule.ModuleDependencyDeclarationFactory (dependencyInformationFactory,
	dependencyValidationUtility,
	propertyBuilderFactory,
	dependencyTypes,
	scopeTypes) ;

var dependencyDeclarationUtility = dependencyDeclarationModule.buildDependencyDeclaration(prototypeDependencyDeclarationFactory,
	customDependencyDeclarationFactory,
	moduleDependencyDeclarationFactory);

// container Validation
var requirementsValidation = requirementsValidationModule.buildRequirementsValidationUtility();

var circularDependencyValidation = circularDependencyValidationModule.buildCircularDependencyValidationUtility();

var dependencyContainerValidation = dependencyContainerValidationModule.buildContainerValidationUtility( circularDependencyValidation,
	requirementsValidation);

// Yinject
var yinjectDependencyResolutionFactory = new yinjectDependencyResolutionModule.YinjectDependencyResolutionFactory(scopeTypes);

var yinjectFactory = new yinjectModule.YinjectFactory(yinjectDependencyResolutionFactory, dependencyDeclarationUtility, dependencyContainerValidation);

var yinjectBuilder = yinjectBuilderModule.buildYinjectDependencyBuilder( nodeUtilities, yinjectFactory, scopeTypes, dependencyTypes);

// all that, for just this one thing.
module.exports = yinjectBuilder;
