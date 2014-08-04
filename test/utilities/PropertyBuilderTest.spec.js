"use strict";
var PropertyFactoryModule = require(__dirname + '/../../js/utilities/PropertyFactory.js');
var prototypeUtilitiesMock = {
	extend: function(){}
};
var PropertyFactory = PropertyFactoryModule.PropertyFactory;

var chai = require('chai');
var expect = chai.expect;

var MockEventManager = function () {

};

MockEventManager.prototype.createEventManager = function () {
	var eventManager = {};
	eventManager.setEvent = function () {};
	eventManager.callEvent = function () {};
	eventManager.removeEvent = function () {};
	return eventManager;
};

// PropertyFactory Requirements:
// EventManagerFactory
//	-EventManagerFactory.createEventManager()- returns an "EventManager";
//	EventManager that is returned (This possibly indicates a bad design, as I'm having to implement multiple layers deep.)
//		EventManager.setEvent
//		EventManager.removeEvent

describe('PropertyFactory', function () {
	var mockEventManager = new MockEventManager();
	// takes an event builder.
	// propertyBuilder should be able to retain and handle it's own properties.

	it('should only call get when getter is called', function () {
		var propFactoryTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var testContext = {
			getCalled: false,
			setCalled: false
		};
		var getter = function () { testContext.getCalled = true; };
		var setter = function () { testContext.setCalled = true;};

		var propTest = propFactoryTest.createProperty(getter,setter);
		propTest();

		expect(testContext.getCalled).to.be.true;
		expect(testContext.setCalled).to.be.false;
	});

	it('should only call set when setter is called', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var testContext = {
			getCalled: false,
			setCalled: false
		};
		var getter = function () { testContext.getCalled = true; };
		var setter = function () { testContext.setCalled = true;};

		var propTest = propBuilderTest.createProperty(getter,setter);
		propTest('new');

		expect(testContext.getCalled).to.be.false;
		expect(testContext.setCalled).to.be.true;
	});


	it('should return correct value when getter is called', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var expectedValue = 5;
		var testContext = {
			value: 5
		};
		var getter = function () { return testContext.value; };
		var setter = function () { };

		var propTest = propBuilderTest.createProperty(getter,setter);


		expect(propTest()).to.equal(expectedValue);
		testContext.value = 6;
		expectedValue = 6;
		expect(propTest()).to.equal(expectedValue);
	});

	it('should call getter after setter is called.', function (){
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var baseValue = 0;
		var expectedValue = 1;
		var getter = function () { };
		var setter = function () { baseValue++;};

		var propTest = propBuilderTest.createProperty(getter,setter);

		propTest('bleh');
		expect(baseValue).to.equal(expectedValue);
	});


	it('should be able to take only a getter', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var getter = function () { };

		var testCall = function () { propBuilderTest.createProperty(getter); };

		// is this correct?
		expect(testCall).not.to.throw(Error);
	});

	it('should throw an error when attempting to set when no setter is defined and a getter is defined.', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var getter = function () { };
		var property = propBuilderTest.createProperty(getter);

		var testCall = function () { property(''); };
		// is this correct?
		expect(testCall).to.throw(PropertyFactoryModule.UndefinedSetterError);
	});

	it('should be able to take only a setter', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var setter = function () { };

		var testCall = function () { propBuilderTest.createProperty(undefined,setter); };

		// is this correct?
		expect(testCall).not.to.throw(Error);
	});

	it('should throw an error on get if no getter is defined and a setter is defined', function(){
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var setter = function () { };
		var property = propBuilderTest.createProperty(undefined, setter);

		var testCall = function () { property(); };

		expect(testCall).to.throw(PropertyFactoryModule.UndefinedGetterError);
	});

	it('should retain its own variable if no getters or setters are applied', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty();
		var expected = 'foo';
		prop(expected);
		expect(prop()).to.equal(expected);
	});

	it('should call onGet with correct values when getting with internal value', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty();
		var expectedValue = 'foo';
		var passedValue;
		prop._getterEvents.callEvent = function (caller, args) {
			passedValue = args.currentValue;
		};
		prop._watchedVariable = expectedValue;
		prop();
		expect(passedValue).to.equal(expectedValue);
	});

	it('should call onGet with currentValue equal to getter when getting', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var expectedValue = 'foo';

		var getter = function () { return expectedValue; };
		var prop = propBuilderTest.createProperty(getter);

		var passedValue;
		prop._getterEvents.callEvent = function (caller, args) {
			passedValue = args.currentValue;
		};
		prop._watchedVariable = expectedValue;
		prop();
		expect(passedValue).to.equal(expectedValue);
	});

	it('should call onSet BEFORE setting internal variable', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var expectedValue = 5;

		var prop = propBuilderTest.createProperty();
		prop._watchedVariable = 0;

		prop._setterEvents.callEvent = function () {
			prop._watchedVariable++;
		};
		prop(expectedValue);
		expect(prop._watchedVariable).to.equal(expectedValue);
	});

	it('should call onSet with correct values when setting internal variable', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var expectedNewValue = 'foo';
		var expectedOldValue = 'bar';

		var prop = propBuilderTest.createProperty();
		prop._watchedVariable = expectedOldValue;

		var passedValue;
		prop._setterEvents.callEvent = function (caller, args) {
			passedValue = args;
		};
		prop(expectedNewValue);

		expect(passedValue).to.not.be.undefined;
		expect(passedValue.oldValue).to.equal(expectedOldValue);
		expect(passedValue.newValue).to.equal(expectedNewValue);

	});

	it('should call onSet BEFORE setting with a setter', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var expectedValue = 5;
		var watched = 0;

		var setter = function (value) {
			watched = value;
		};

		var prop = propBuilderTest.createProperty(undefined, setter);

		prop._setterEvents.callEvent = function () {
			watched++;
		};
		prop(expectedValue);
		expect(watched).to.equal(expectedValue);
	});

	it('should only return a value on get a variable', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var expectedValue = 5;

		var prop = propBuilderTest.createProperty();
		prop._watchedVariable = expectedValue;

		expect(prop()).to.equal(expectedValue);
		expect(prop('foo')).to.be.undefined;
	});

	it('should call "setEvent" with set event given when addSetEvent is called for variable', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty();
		var givenId, givenEvent;

		prop._setterEvents.setEvent = function (id, event) {
			givenId = id;
			givenEvent = event;
		};

		var testOnSet = function(){};
		prop.addSetEvent(testOnSet);
		expect(givenId).to.equal(testOnSet);
		expect(givenEvent).to.equal(testOnSet);
	});

	it('should call "setEvent" with set event given when addSetEvent is called for setter', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty(undefined,function(){});
		var givenId, givenEvent;

		prop._setterEvents.setEvent = function (id, event) {
			givenId = id;
			givenEvent = event;
		};

		var testOnSet = function(){};
		prop.addSetEvent(testOnSet);
		expect(givenId).to.equal(testOnSet);
		expect(givenEvent).to.equal(testOnSet);
	});

	it('should call "setEvent" with set event given when addGetEvent is called for variable', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty();
		var givenId, givenEvent;

		prop._getterEvents.setEvent = function (id, event) {
			givenId = id;
			givenEvent = event;
		};

		var testOnGet = function(){};
		prop.addGetEvent(testOnGet);
		expect(givenId).to.equal(testOnGet);
		expect(givenEvent).to.equal(testOnGet);
	});

	it('should call "setEvent" with Get event given when addSetEvent is called for Getter', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty(function(){});
		var givenId, givenEvent;

		prop._getterEvents.setEvent = function (id, event) {
			givenId = id;
			givenEvent = event;
		};

		var test = function(){};
		prop.addGetEvent(test);
		expect(givenId).to.equal(test);
		expect(givenEvent).to.equal(test);
	});

	it('should call "removeEvent" with correct variables when removing Get event for the variable', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty();
		var givenId;

		prop._getterEvents.removeEvent = function (id) {
			givenId = id;
		};

		var test = function(){};
		prop.removeGetEvent(test);

		expect(givenId).to.equal(test);
	});

	it('should call "removeEvent" with correct variables when removing Set event for the variable', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty();
		var givenId;

		prop._setterEvents.removeEvent = function (id) {
			givenId = id;
		};

		var test = function(){};
		prop.removeSetEvent(test);

		expect(givenId).to.equal(test);
	});

	it('should call "removeEvent" when removing event for the getter', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty(function(){});
		var givenId;

		prop._getterEvents.removeEvent = function (id) {
			givenId = id;
		};

		var test = function(){};
		prop.removeGetEvent(test);

		expect(givenId).to.equal(test);
	});

	it('should call "removeEvent" when removing event for the setter', function () {
		var propBuilderTest = new PropertyFactory(mockEventManager, prototypeUtilitiesMock);
		var prop = propBuilderTest.createProperty(undefined,function(){});
		var givenId;

		prop._setterEvents.removeEvent = function (id) {
			givenId = id;
		};

		var test = function(){};
		prop.removeSetEvent(test);

		expect(givenId).to.equal(test);
	});

});