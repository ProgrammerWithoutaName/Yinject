Yinject
=======

JavaScript Dependency Injection



from the outside, it's simply meant to have an array of file locations pumped into it that defines a function called  getDependencyDeclarations(diContainer, diUtilities)

diUtilities is just a set of utilities to make it a bit easier to generate the dependency declarations

diUtilities.pathBuilder - call this with __dir, it will return a function that takes a string. It's equivalent to doing
path = require('path');
var location = path.combine(__dirname,'someFile.js');

makes it a bit more legible when you call the function pathOf('someFile.js');


diContainer is the container itself, which you add the dependencies to.

it's meant to be used to declare a dependency in a more natural language format. Example:
diContainer.forDependency('foo').usePrototype('Foo').from(pathOf('Foo.js')).in.requestScope


all dependency declarations start off with diContainer.forDependency, this is just declaring the common name that is used for the given dependency when you are looking to resolve it.

after that, you have 3 options:

usePrototype( constructorName or constructorFunction)
useModule( location/moduleName )
useCustom( constructorName or constructorFunction)

the difference between Prototype and Custom are how the item is built. useCustom does a call with an empty context to the function passed in, which usePrototype effectively calls new constructorFunction();


after that, usePrototype and useCustom have the option 'from', which is the location of the file containing the export listed as constructorName.  so, in the example listed above (diContainer.forDependency('foo').usePrototype('Foo').from(pathOf('Foo.js')).in.requestScope)

I am saying to use item Foo from Foo.js's exports. (In the backend, I'm literally calling require(locationGiven)[constructorName])

after that, all three have the option to declare the scope via "in"

you have three scopes available:
defaultScope
requestScope
singletonScope

default always returns a new instance of the listed dependency

request returns 1 new instance per call to "resolve", if one item is required multiple times inside of a single resolve call (through dependencies), then the same instance will be used.

singleton will only ever return 1 instance of the item, which isn't instantiated until resolve is called on it the first time.

an example declaration file:
https://github.com/ProgrammerWithoutaName/Yinject/blob/Development/test/testModules/diDeclarations.js

an example for starting the dependency injector:

https://gist.github.com/ProgrammerWithoutaName/cb6641720dc9530572cc


get the container returned from yinject.createDependencyInjectorContainer, then simply call resolve on it.
if there are missing dependency requirements, or circular requirements, a descriptive error will be called on the first call to 'resolve'