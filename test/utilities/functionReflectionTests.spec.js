var chai = require('chai');
var functionReflectionUtilityBuilder = require(__dirname + '/../../js/utilities/functionReflection.js');

var functionReflectionUtility = functionReflectionUtilityBuilder.buildFunctionReflectionUtility();
var getFunctionArguments = functionReflectionUtility.getFunctionArguments;

var expect = chai.expect;

var validArgumentNames = ['foo','bar','something'];

// space intended. meant to throw function reflection off.
var testFunctionWithoutComments = function (foo, bar , something) {};
var testFunctionWithBlockComments = function (foo,/*comment
,*/bar, something) {};

var testFunctionWithLineComments = function (foo,
	//comment,
	bar,
	something) {

};

var arraysAreEquivelent = function (array1, array2) {
	var i;
	if (array1.length !== array2.length) {
		return false;
	}
	for (i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) {
			return false;
		}
	}
	return true;
};

describe('functionReflection', function () {
	describe('getFunctionArguments', function () {
		it('should return list of arguments with correct names in the correct order', function () {
			var returnedArgs = getFunctionArguments(testFunctionWithoutComments);
			expect(arraysAreEquivelent(returnedArgs,validArgumentNames)).to.be.true;
		});

		it('should return list of arguments with correct names in the correct order if there is a line comment', function () {
			var returnedArgs = getFunctionArguments(testFunctionWithLineComments);
			expect(arraysAreEquivelent(returnedArgs,validArgumentNames)).to.be.true;
		});

		it('should return list of arguments with correct names in the correct order if there is a block comment', function () {
			var returnedArgs = getFunctionArguments(testFunctionWithBlockComments);
			expect(arraysAreEquivelent(returnedArgs,validArgumentNames)).to.be.true;
		});
	});

});