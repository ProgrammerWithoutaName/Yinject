"use strict";


var buildPrototypeUtilities = function (reflectionFactory) {
	var prototypeUtilities = {};

	prototypeUtilities.getTypeExtensions = function (typeToInspect) {
		if(!!typeToInspect.__reflection) {
			return typeToInspect.__reflection.getParentTypes();
		}
		return [];
	};

	/**
	 * @return {boolean}
	 */
	prototypeUtilities.ObjectIsTypeOf = function (childType,parentType) {
		if (typeof childType  !== 'function') {
			throw new TypeError('childType should be constructor')
		}
		if (typeof parentType  !== 'function') {
			throw new TypeError('parentType should be constructor')
		}


		if(!!childType.__reflection) {
			return childType.__reflection.isTypeOf(parent);
		}

		return (childType.prototype === parentType.prototype);
	};

// Pulled from amirharel, specifically http://www.amirharel.com/2010/06/11/implementing-multiple-inheritance-in-javascript/
// modified to work. Good idea though, for sure. this implements multiple inheritence.
	prototypeUtilities.extend = function (child){
		var i;
		if(!child.__reflection) {
			child.__reflection = reflectionFactory.createReflection(child);
		}

		for(i = 1; i < arguments.length; i++) {
			var baseProto = arguments[i].prototype;
			for(var item in baseProto) {
				// should we inherit non function base items??
				// used to be typeof baseProto[item] === 'function'
				// make sure this doesn't blow anything up.
				if(item != 'constructor' && !child.__reflection.isTypeOf(arguments[i]) ) {
					//noinspection JSUnfilteredForInLoop
					if (child.prototype[item] === undefined) {
						//noinspection JSUnfilteredForInLoop
						child.prototype[item] = baseProto[item];
					}
				}
			}
			child.__reflection.addParent(arguments[i]);
		}

	};

	//TODO: find Stack Overflow comment and attribute this to that comment.
	prototypeUtilities.constructObjectWithArguments = function (constructor, args) {
		var F = function () {
			return constructor.apply(this, args);
		};

		F.prototype = constructor.prototype;
		return new F();
	};

	return prototypeUtilities;
};

module.exports.buildPrototypeUtilities = buildPrototypeUtilities;