"use strict";
var module = require(__dirname + '/../../js/utilities/EventManagerFactory.js');

var EventManagerFactory = module.EventManagerFactory;
var EventManager = module.EventManager;

var chai = require('chai');
var expect = chai.expect;

// Things that should be tested:
// Set
// -- Corrects sets an event with the ID given.
// -- can use the function itself as an ID.

// Remove
// -- removes the given event
// -- doesn't do anything if event doesn't exist.

// Call
// calls all events
// doesn't error out when there are no events.

describe('EventManagerFactory', function () {
	it('should return an eventManager', function (){
		var eventManagerFactory = new EventManagerFactory();
		var eventManager = eventManagerFactory.createEventManager();
		expect(eventManager).to.be.instanceOf(EventManager);
	});
});

describe('EventManager', function () {
	var oldFunction = function(){return 'foo';};
	var expectedFunction = function(){return 'bar';};
	var otherFunction = function(){return 'something';};

	var functionArray = [oldFunction, expectedFunction, otherFunction];

	describe('setEvent', function () {
		var eventManagerFactory = new EventManagerFactory();
		it('should set an event with the correct ID on Set', function () {
			var eventManager = eventManagerFactory.createEventManager();
			var expectedId = 0;

			eventManager.setEvent(expectedId, expectedFunction);

			expect(eventManager._eventCallbacks[0].id).to.equal(expectedId);
			expect(eventManager._eventCallbacks[0].callback).to.equal(expectedFunction);
		});

		it('should override an existing event with the same ID', function () {
			var eventManager = eventManagerFactory.createEventManager();
			var expectedId = 0;

			eventManager.setEvent(expectedId, oldFunction);
			eventManager.setEvent(expectedId, expectedFunction);

			expect(eventManager._eventCallbacks[0].id).to.equal(expectedId);
			expect(eventManager._eventCallbacks[0].callback).to.equal(expectedFunction);
			expect(eventManager._eventCallbacks.length).to.equal(1);
		});

		it('should accept multiple events with different ids', function () {
			var eventManager = eventManagerFactory.createEventManager();

			var i = functionArray.length - 1;
			for (i; i >= 0; i--) {
				eventManager.setEvent(i, functionArray[i]);
			}

			expect(eventManager._eventCallbacks.length).to.equal(functionArray.length);

			for(i = 0; i < eventManager._eventCallbacks.length; i++) {
				expect(eventManager._eventCallbacks[i].callback).to.equal(functionArray[eventManager._eventCallbacks[i].id]);
			}
		});
	});

	describe('removeEvent', function () {
		var eventManagerFactory = new EventManagerFactory;

		it('should remove event with given id', function () {
			var eventManager = eventManagerFactory.createEventManager();
			var arrayIdToRemove = 1;

			var i = functionArray.length - 1;
			for (i; i >= 0; i--) {
				eventManager.setEvent(i, functionArray[i]);
			}

			eventManager.removeEvent(arrayIdToRemove);
			expect(eventManager._eventCallbacks.length).to.equal(2);
			for(i = 0; i < eventManager._eventCallbacks.length; i++) {
				expect(eventManager._eventCallbacks[i].id).to.not.equal(arrayIdToRemove);
				expect(eventManager._eventCallbacks[i].callback).to.not.equal(functionArray[arrayIdToRemove]);
			}
		});

		it('should remove event with function as ID', function () {
			var eventManager = eventManagerFactory.createEventManager();
			var arrayIdToRemove = 1;

			var i = functionArray.length - 1;
			for (i; i >= 0; i--) {
				eventManager.setEvent(functionArray[i], functionArray[i]);
			}

			eventManager.removeEvent(functionArray[arrayIdToRemove]);
			expect(eventManager._eventCallbacks.length).to.equal(2);
			for(i = 0; i < eventManager._eventCallbacks.length; i++) {
				expect(eventManager._eventCallbacks[i].id).to.not.equal(functionArray[arrayIdToRemove]);
				expect(eventManager._eventCallbacks[i].callback).to.not.equal(functionArray[arrayIdToRemove]);
			}
		});

		it('should not error out if id given does not exist', function () {});
	});

	describe('callEvent', function () {
		var eventManagerFactory = new EventManagerFactory();
		it('should call every event given', function () {
			var eventManager = eventManagerFactory.createEventManager();

			var eventObject = {
				testArray: ['fnA', 'fnB', 'fnC'],
				fnA: function () {
					eventObject.testArray.splice(0,1);
				},
				fnB: function () {
					var index = eventObject.testArray[0] === 'fnA' ? 1 : 0;
					eventObject.testArray.splice(index, 1);
				},
				fnC: function () {
					eventObject.testArray.splice(eventObject.testArray.length - 1, 1);
				}
			};

			eventManager.setEvent(0,eventObject.fnA);
			eventManager.setEvent(1,eventObject.fnB);
			eventManager.setEvent(2,eventObject.fnC);

			eventManager.callEvent();
			expect(eventObject.testArray.length).to.equal(0);
		});
		it('should not error if no events are given', function () {
			var eventManager = eventManagerFactory.createEventManager();
			var testCall = function () { eventManager.callEvent();};
			expect(testCall).to.not.throw(Error);
		});
	});

});