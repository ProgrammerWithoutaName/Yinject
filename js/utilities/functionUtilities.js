var functionReflection = require(__dirname + '/functionReflection.js');
var forEach = require(__dirname + '/arrayUtilities.js').forEach;

var buildArguments = function (argumentDeclarationArray, argumentValuesObject) {
	var args = [];
	forEach(argumentDeclarationArray, function (declaration) {
		args.push(argumentValuesObject[declaration]);
	});
	return args;
};

var safeFunctionApply = function (fn, args) {
	var emptyContext = {};
	var f = function () {
		return fn.apply(emptyContext, args);
	};

	return f();
};


module.exports.buildArguments = buildArguments;
module.exports.safeFunctionApply = safeFunctionApply;
module.exports.getFunctionArguments = functionReflection.getFunctionArguments;

