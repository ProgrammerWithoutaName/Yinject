// This exists because There are some requirements for utilities before the ability to inject something.
// these utilities may require other utilities.

var nodeUtilities = require(__dirname + '/nodeUtilities.js').buildNodeUtilities();
var utilities = ['arrayUtility, prototypeUtility, nodeUtility, functionUtility'];

var buildNodeUtilities = function () {
	return nodeUtilities;
};

var buildArrayUtilities = function () {
	return nodeUtilities.requireUtility('arrayUtilities.js').buildArrayUtilities();
};

var buildReflectionFactory = function () {
	var ReflectionFactory = nodeUtilities.requireUtility('reflection.js').ReflectionFactory;
	var arrayUtility = buildArrayUtilities();
	return new ReflectionFactory(arrayUtility);
};

var buildPrototypeUtilities = function () {
	var reflectionFactory = buildReflectionFactory();
	var prototypeUtilitiesModule = nodeUtilities.requireUtility('prototypeUtilities.js');
	return prototypeUtilitiesModule.buildPrototypeUtilities(reflectionFactory);
};

var buildFunctionReflection = function (arrayUtilities) {
	// array Utilities
	var functionReflectionModule = nodeUtilities.requireUtility('functionReflection.js');
	arrayUtilities = arrayUtilities || buildArrayUtilities();

	return functionReflectionModule.buildFunctionReflectionUtility(arrayUtilities)
};

var buildFunctionUtilities = function () {
	// functionReflection, array Utilities
	var arrayUtilities = buildArrayUtilities();
	var functionReflection = buildFunctionReflection(arrayUtilities);
	var functionUtilityModule = nodeUtilities.requireUtility('functionUtilities.js');
	return functionUtilityModule.buildFunctionUtilities(functionReflection,arrayUtilities);
};

var utilityBuilder = {
	nodeUtilities: buildNodeUtilities,
	arrayUtilities: buildArrayUtilities,
	prototypeUtilities: buildPrototypeUtilities,
	functionUtilities: buildFunctionUtilities
};

var buildUtility = function (utilityName) {
	return utilityBuilder[utilityName]();
};

module.exports.buildUtility = buildUtility;
module.exports.utilities = {
	arrayUtilities: 'arrayUtilities',
	functionUtilities:'functionUtilities',
	prototypeUtilities:'prototypeUtilities',
	nodeUtilities:'nodeUtilities'
};