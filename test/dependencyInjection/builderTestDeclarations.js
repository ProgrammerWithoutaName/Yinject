'use strict';

// useful example and test.
// rework locations.
var getDependencyDeclarations = function (diContainer, diUtilities) {

	if(!diContainer.testWasSuccessful) {
		diContainer.testWasSuccessful = [];
		diContainer.diUtilities = [];
	}
	diContainer.testWasSuccessful.push( true );
	diContainer.diUtilities.push( diUtilities );


	return diContainer;
};

module.exports.getDependencyDeclarations = getDependencyDeclarations;