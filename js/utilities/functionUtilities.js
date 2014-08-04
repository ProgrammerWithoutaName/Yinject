

var buildFunctionUtilities = function(functionReflection, arrayUtilities) {
	var functionUtilities = {};

	functionUtilities.buildArguments = function (argumentDeclarationArray, argumentValuesObject) {
		var args = [];
		arrayUtilities.forEach(argumentDeclarationArray, function (declaration) {
			args.push(argumentValuesObject[declaration]);
		});
		return args;
	};

	functionUtilities.safeFunctionApply = function (fn, args) {
		var emptyContext = {};
		var f = function () {
			return fn.apply(emptyContext, args);
		};

		return f();
	};

	functionUtilities.getFunctionArguments = functionReflection.getFunctionArguments;

	return functionUtilities;
};

module.exports.buildFunctionUtilities = buildFunctionUtilities;