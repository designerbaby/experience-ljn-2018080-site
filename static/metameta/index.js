// Meta core
var {Meta, MetaClass, MetaObject} = require('@aimingoo/metameta');

// Helper methods, all home object safed.
var {isMeta, isAtom, asAtom} = Meta;

// learn case
var Objext = Meta.from(Object);
console.log(Objext.keys(new Objext)); // []
console.log(Meta.isAtom(new Objext)); // true
