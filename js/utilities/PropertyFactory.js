'use strict';
var utilityBuilder = require(__dirname + '/utilityBuilder.js');
var prototypeUtilities = utilityBuilder.buildUtility(utilityBuilder.utilities.prototypeUtilities);



var UndefinedSetterError = function() {
	this.message = 'No Setter Defined';
};

UndefinedSetterError.prototype.name = 'Undefined Setter Error';

var UndefinedGetterError = function() {
	this.message = 'No Getter Defined';
};
UndefinedGetterError.prototype.name = 'Undefined Getter Error';

prototypeUtilities.extend(UndefinedSetterError, ReferenceError);
prototypeUtilities.extend(UndefinedGetterError, ReferenceError);

var PropertyFactory = function (eventManagerFactory) {

    this._eventManagerFactory = eventManagerFactory;
};

PropertyFactory.prototype.createProperty = function (getFunctionOverride, setFunctionOverride) {

    var getter, setter, watchedVariable;
    var getterEvents, setterEvents;
    var property;
    // base setup. set watched to null, and getters/setters to their correct values.
    watchedVariable = null;
    getter = getFunctionOverride || function () { throw new UndefinedGetterError(); };
    setter = setFunctionOverride || function () { throw new UndefinedSetterError(); };

    // setup event handlers
    getterEvents = this._eventManagerFactory.createEventManager();
    setterEvents = this._eventManagerFactory.createEventManager();

    // is this a standard variable?
    if (arguments.length < 1) {
        property = function (setterVariable) {
            if (arguments.length > 0) {
                var old = property._watchedVariable;
				property._setterEvents.callEvent(this, {oldValue: old, newValue: setterVariable});
				property._watchedVariable = setterVariable;
            } else {
				property._getterEvents.callEvent(this, {currentValue: property._watchedVariable});
				return property._watchedVariable;
            }

        };
    } else {
        property = function (setterVariable) {
            if (arguments.length > 0) {
				property._setterEvents.callEvent(this, {newValue: setterVariable});
				property._setter(setterVariable);
            } else {
				property._getterEvents.callEvent(this, {currentValue: property._getter()});
				return property._getter();
            }
        };
    }

    property.addSetEvent = function (callback) {
		property._setterEvents.setEvent(callback, callback);
    };

    property.removeSetEvent = function (callback) {
		property._setterEvents.removeEvent(callback);
    };

    property.addGetEvent = function (callback) {
		property._getterEvents.setEvent(callback, callback);
    };

    property.removeGetEvent = function (callback) {
		property._getterEvents.removeEvent(callback);
    };

	// tie everything back into property, this is mostly for debugging and testing.
	property._watchedVariable = watchedVariable;
	property._getterEvents = getterEvents;
	property._setterEvents = setterEvents;
	property._getter = getter;
	property._setter = setter;

    return property;
};

module.exports.PropertyFactory = PropertyFactory;
module.exports.UndefinedSetterError = UndefinedSetterError;
module.exports.UndefinedGetterError = UndefinedGetterError;