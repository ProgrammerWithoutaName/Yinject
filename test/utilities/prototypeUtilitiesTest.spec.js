var chai = require('chai');
var prototypeUtilitiesModule = require(__dirname + '/../../js/utilities/prototypeUtilities.js');

var expect = chai.expect;

var ChildObject = function (test1, test2, test3)  {
	this.test1 = test1;
	this.test2 = test2;
	this.test3 = test3;
};

ChildObject.prototype.overriddenFunction = function () {
	this.override = true;
};

var testFunctionValues = ['foo',42,'something'];

describe('prototypeUtilities', function(){

	/*var buildArguments = function (argumentDeclarationArray, argumentValuesObject) {
		var args = [];
		forEach(argumentDeclarationArray, function (declaration) {
			args.push(argumentValuesObject[declaration]);
		});
		return args;
	};*/


	describe('constructObjectWithArguments', function () {
		var constructObjectWithArguments = prototypeUtilitiesModule.constructObjectWithArguments;
		var returnedObject = constructObjectWithArguments(ChildObject, testFunctionValues);

		it('should expect correct values to be given to the constructor', function() {
			expect(returnedObject.test1).to.equal(testFunctionValues[0]);
			expect(returnedObject.test2).to.equal(testFunctionValues[1]);
			expect(returnedObject.test3).to.equal(testFunctionValues[2]);
		});

		it('should be the correct object type', function () {
			expect(returnedObject).to.be.instanceOf(ChildObject);
		});

	});
});
