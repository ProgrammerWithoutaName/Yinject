"use strict";

// Pulled from amirharel, specifically http://www.amirharel.com/2010/06/11/implementing-multiple-inheritance-in-javascript/
// modified to work. Good idea though, for sure. this implements multiple inheritence.
function extend(child){
	var i;
	for(i = 1; i < arguments.length; i++) {
		var baseProto = arguments[i].prototype;
		for(var item in baseProto) {
			// should we inherit non function base items??
			// used to be typeof baseProto[item] === 'function'
			// make sure this doesn't blow anything up.
			if(item != 'constructor' ) {
				if (child.prototype[item] === undefined) {
					child.prototype[item] = baseProto[item];
				}
			}
		}
	}

}

//TODO: find Stack Overflow comment and attribute this to that comment.
var constructObjectWithArguments = function (constructor, args) {
    var F = function () {
        return constructor.apply(this, args);
    };

    F.prototype = constructor.prototype;
    return new F();
};



module.exports.extend = extend;
module.exports.constructObjectWithArguments = constructObjectWithArguments;