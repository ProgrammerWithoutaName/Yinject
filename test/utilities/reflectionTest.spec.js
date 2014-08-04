var chai = require('chai');
var reflectionModule = require(__dirname + '/../../js/utilities/reflection.js');
var arrayUtilities = require(__dirname + '/../../js/utilities/arrayUtilities.js').buildArrayUtilities();

var expect = chai.expect;



describe('ReflectionFactory', function () {
	describe('createReflection', function () {
		it('should create a new reflectionObject each time it is called.', function () {
			var reflectionFactory = new reflectionModule.ReflectionFactory({});

			var Test1 = function () {};
			var Test2 = function () {};

			var testA = reflectionFactory.createReflection(Test1);
			var testB = reflectionFactory.createReflection(Test2);

			testA.test = true;
			testB.test = false;

			expect(testA.test).to.not.equal(testB.test);

		});
	});

});

describe('Reflection', function () {
	describe('addParent', function (){
		var TestTypeA = function () {};
		var TestTypeB = function () {};
		var TestTypeC = function () {};
		var TestTypeD = function () {};

		var reflectionA = new reflectionModule.Reflection(TestTypeA,arrayUtilities);
		reflectionA.addParent(TestTypeB);
		reflectionA.addParent(TestTypeC);
		reflectionA.addParent(TestTypeD);

		it('should add parents to the _ownerParents variable', function () {
			expect(arrayUtilities.valueExistsInArray(reflectionA._ownerParents, TestTypeB)).to.be.true;
			expect(arrayUtilities.valueExistsInArray(reflectionA._ownerParents, TestTypeC)).to.be.true;
			expect(arrayUtilities.valueExistsInArray(reflectionA._ownerParents, TestTypeD)).to.be.true;
			expect(reflectionA._ownerParents.length).to.equal(3);
		});

	});

	describe('getParentTypes', function(){
		var TestTypeA = function () {};
		var TestTypeB = function () {};
		var TestTypeC = function () {};
		var TestTypeD = function () {};

		var reflectionA = new reflectionModule.Reflection(TestTypeA,arrayUtilities);
		var reflectionB = new reflectionModule.Reflection(TestTypeB,arrayUtilities);
		new reflectionModule.Reflection(TestTypeC,arrayUtilities);
		new reflectionModule.Reflection(TestTypeD, arrayUtilities);

		reflectionA._ownerParents.push(TestTypeB);
		reflectionB._ownerParents.push(TestTypeC);
		reflectionB._ownerParents.push(TestTypeD);

		var parentTypes = reflectionA.getParentTypes();

		it('should return all parents in a chain', function () {
			expect(arrayUtilities.valueExistsInArray(parentTypes, TestTypeB)).to.be.true;
			expect(arrayUtilities.valueExistsInArray(parentTypes, TestTypeC)).to.be.true;
			expect(arrayUtilities.valueExistsInArray(parentTypes, TestTypeD)).to.be.true;
		});

		it('should not have the owning object type in the chain', function () {
			expect(arrayUtilities.valueExistsInArray(parentTypes, TestTypeA)).to.be.false;
		});
	});

	describe('isTypeOf', function(){
		var TestTypeA = function () {};
		var TestTypeB = function () {};
		var TestTypeC = function () {};
		var TestTypeD = function () {};
		var TestTypeE = function () {};
		var TestTypeF = function () {};
		var TestTypeG = function () {};

		var reflectionA = new reflectionModule.Reflection(TestTypeA,arrayUtilities);
		var reflectionB = new reflectionModule.Reflection(TestTypeB,arrayUtilities);
		var reflectionC = new reflectionModule.Reflection(TestTypeC,arrayUtilities);
		new reflectionModule.Reflection(TestTypeD, arrayUtilities);

		reflectionA._ownerParents.push(TestTypeB);
		reflectionA._ownerParents.push(TestTypeE);
		reflectionB._ownerParents.push(TestTypeC);
		reflectionB._ownerParents.push(TestTypeD);
		reflectionB._ownerParents.push(TestTypeF);
		reflectionC._ownerParents.push(TestTypeG);


		it('should correctly say owning object is of type given if child of type', function () {
			expect(reflectionA.isTypeOf(TestTypeC)).to.be.true;
			expect(reflectionA.isTypeOf(TestTypeB)).to.be.true;
			expect(reflectionA.isTypeOf(TestTypeD)).to.be.true;

		});

		it('should correctly claim a parent even if parent is not set up for reflection', function () {
			expect(reflectionA.isTypeOf(TestTypeE)).to.be.true;
			expect(reflectionA.isTypeOf(TestTypeF)).to.be.true;
			expect(reflectionA.isTypeOf(TestTypeG)).to.be.true;
		});

		it('should correctly say owning object is of type given if it is that type', function () {
			expect(reflectionA.isTypeOf(TestTypeA)).to.be.true;
		});

		it('should not say it is not of type given if not of that type.', function () {
			expect(reflectionC.isTypeOf(TestTypeA)).to.be.false;
		});
	});
});
