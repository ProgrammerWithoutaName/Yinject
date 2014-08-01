var chai = require('chai');
var prototypeUtilities = require(__dirname + '/../../js/utilities/prototypeUtilities.js');

var expect = chai.expect;

var extend = prototypeUtilities.extend;
var constructObjectWithArguments = prototypeUtilities.constructObjectWithArguments;

var ParentObject = function() {};

ParentObject.prototype.foo = function () {
	this.fooPassed = true;
};

ParentObject.prototype.overriddenFuction = function () {
	this.override = false;
};

var ChildObject = function (test1, test2, test3)  {
	this.test1 = test1;
	this.test2 = test2;
	this.test3 = test3;
};

ChildObject.prototype.bar = function () {
	this.barPassed = true;
};

ChildObject.prototype.overriddenFunction = function () {
	this.override = true;
};

var testFunctionValues = ['foo',42,'something'];

describe('prototypeUtilities', function(){
	describe('extend', function(){
		extend(ChildObject, ParentObject);
		var child = new ChildObject();
		child.foo();
		child.bar();
		child.overriddenFunction();

		it('should extend the parent objects prototype to the child objects prototype', function(){
			expect(child.fooPassed).to.be.true;
		});

		it('should keep child functions original functions', function () {
			expect(child.barPassed).to.be.true;
		});

		it('should use child functions when available even if parent functions are defined', function () {
			expect(child.override).to.be.true;
		});
	});

	/*var buildArguments = function (argumentDeclarationArray, argumentValuesObject) {
		var args = [];
		forEach(argumentDeclarationArray, function (declaration) {
			args.push(argumentValuesObject[declaration]);
		});
		return args;
	};*/



	describe('constructObjectWithArguments', function () {
		var returnedObject = constructObjectWithArguments(ChildObject, testFunctionValues);
		returnedObject.bar();

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
