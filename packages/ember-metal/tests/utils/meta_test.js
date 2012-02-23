// ==========================================================================
// Project:  Ember Runtime
// Copyright: ©2011 Strobe Inc. and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

module("Ember.meta");

test("should return the same hash for an object", function() {
  var obj = {};

  Ember.meta(obj).foo = "bar";

  equal(Ember.meta(obj).foo, "bar", "returns same hash with multiple calls to Ember.meta()");
});

module("Ember.metaPath");

test("should not create nested objects if writable is false", function() {
  var obj = {};

  ok(!Ember.meta(obj).foo, "precond - foo property on meta does not yet exist");
  equal(Ember.metaPath(obj, ['foo', 'bar', 'baz'], false), undefined, "should return undefined when writable is false and doesn't already exist") ;
  equal(Ember.meta(obj).foo, undefined, "foo property is not created");
});

test("should create nested objects if writable is true", function() {
  var obj = {};

  ok(!Ember.meta(obj).foo, "precond - foo property on meta does not yet exist");

  equal(typeof Ember.metaPath(obj, ['foo', 'bar', 'baz'], true), "object", "should return hash when writable is true and doesn't already exist") ;
  ok(Ember.meta(obj).foo.bar.baz['bat'] = true, "can set a property on the newly created hash");
});

test("getMeta and setMeta", function() {
  var obj = {};

  ok(!Ember.getMeta(obj, 'foo'), "precond - foo property on meta does not yet exist");
  Ember.setMeta(obj, 'foo', "bar");
  equal(Ember.getMeta(obj, 'foo'), "bar", "foo property on meta now exists");
});

if (window.jQuery) {
  // Tests fix for https://github.com/emberjs/ember.js/issues/344
  // This is primarily for older browsers such as IE8
  // We would use NativeArray but it's not defined in metal
  test("jQuery.extend works on an extended Array", function() {
    var mixin = Ember.Mixin.create({ prop: 'val' })
        array = mixin.apply([1,2,3]),
        result = {};

    jQuery.extend(true, result, { arr: array });

    equals(result.arr.length, 3);
  });
}
