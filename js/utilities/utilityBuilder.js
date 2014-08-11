// This exists because There are some requirements for utilities before the ability to inject something.
// these utilities may require other utilities.

var nodeUtilities = require(__dirname + '/nodeUtilities.js').buildNodeUtilities();
var utilities = ['prototypeUtility, nodeUtility, functionUtility, inheritanceUtility'];

var buildNodeUtilities = function () {
	return nodeUtilities;
};

var buildPrototypeUtilities = function () {
	return nodeUtilities.requireUtility('prototypeUtilities.js');
};

var buildFunctionReflection = function () {
	// array Utilities
	var functionReflectionModule = nodeUtilities.requireUtility('functionReflection.js');

	return functionReflectionModule.buildFunctionReflectionUtility();
};

var buildFunctionUtilities = function () {
	var functionReflection = buildFunctionReflection();
	var functionUtilityModule = nodeUtilities.requireUtility('functionUtilities.js');
	return functionUtilityModule.buildFunctionUtilities(functionReflection);
};

var buildPropertyBuilderFactory = function () {
	var propertyBuilderModule = nodeUtilities.requireUtility('propertyBuilder.js');
	return new propertyBuilderModule.PropertyBuilderFactory();
};

var buildMethodExtensionUtility = function (functionUtilities, propertyBuilderFactory) {
	functionUtilities = functionUtilities || buildFunctionUtilities();
	propertyBuilderFactory = propertyBuilderFactory || buildPropertyBuilderFactory();

	var methodExtensionUtilityModule = nodeUtilities.requireUtility('/inheritance/MethodExtensionUtility.js');
	return  new methodExtensionUtilityModule.MethodExtensionUtility(functionUtilities,propertyBuilderFactory);
};



var buildInheritanceBuilderFactory = function (methodExtensionUtility) {
	methodExtensionUtility = methodExtensionUtility || buildMethodExtensionUtility();
	var inheritanceBuilderModule = nodeUtilities.requireUtility('/inheritance/InheritanceBuilder.js');

	return new inheritanceBuilderModule.InheritanceBuilderFactory(methodExtensionUtility);
};

var buildInheritanceUtilities = function () {
	var inheritanceUtilitiesModule = nodeUtilities.requireUtility('/inheritance/InheritanceUtilities.js');
	var functionUtilities = buildFunctionUtilities();
	var methodExtensionUtility = buildMethodExtensionUtility(functionUtilities);
	var inheritanceBuilderFactory = buildInheritanceBuilderFactory(methodExtensionUtility);

	return new inheritanceUtilitiesModule.InheritanceUtilities(methodExtensionUtility,
		functionUtilities,
		inheritanceBuilderFactory);
};

var utilityBuilder = {
	nodeUtilities: buildNodeUtilities,
	prototypeUtilities: buildPrototypeUtilities,
	functionUtilities: buildFunctionUtilities,
	inheritanceUtilities: buildInheritanceUtilities
};

var buildUtility = function (utilityName) {
	return utilityBuilder[utilityName]();
};

module.exports.buildUtility = buildUtility;
module.exports.utilities = {
	functionUtilities:'functionUtilities',
	prototypeUtilities:'prototypeUtilities',
	nodeUtilities:'nodeUtilities',
	inheritanceUtilities:' inheritanceUtilities'
};