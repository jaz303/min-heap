var test = require('tape');
var MinHeap = require('../').MinHeap;

function t(str, fn) {
  test(str, function(assert) {
    fn(assert);
    assert.end();
  })
}

function testRemoval(heap, assert) {
  var last = -Infinity;
  while (heap.size) {
    var head = heap.removeHead();
    assert.ok(head >= last);
    last = head;
  }
}

t('initial .size', function(assert) {
  var heap = new MinHeap;
  assert.ok(heap.size === 0);
});

t('size after 100 inserts', function(assert) {
  var heap = new MinHeap;
  for (var i = 0; i < 100; ++i) {
    heap.insert(Math.random());
  }
  assert.ok(heap.size === 100);
});

t('fuzz test', function(assert) {

  var heap = new MinHeap;
  var check = [];

  for (var i = 0; i < 50; ++i) {
    var v = Math.random();
    heap.insert(v);
    check.push(v);
  }

  check.sort();
  for (var i = 0; i < 20; ++i) {
    assert.ok(heap.removeHead() === check.shift());
  }

  for (var i = 0; i < 50; ++i) {
    var v = Math.random();
    heap.insert(v);
    check.push(v);
  }

  check.sort();
  while (heap.size) {
    assert.ok(heap.removeHead() === check.shift());
  }

  assert.ok(check.length === 0);

});

t('remove item', function(assert) {

  var heap = new MinHeap;

  heap.insert(4);
  heap.insert(1);
  heap.insert(3);
  heap.insert(5);

  assert.ok(heap.remove(3));
  assert.ok(heap.size === 3);

  testRemoval(heap, assert);

});

t('remove biggest item', function(assert) {

  var heap = new MinHeap;

  heap.insert(1);
  heap.insert(2);
  heap.insert(3);
  heap.insert(4);
  heap.insert(5);

  assert.ok(heap.remove(5));
  assert.ok(heap.size === 4);

  testRemoval(heap, assert);

});

t('remove non-existant item', function(assert) {

  var heap = new MinHeap;

  heap.insert(1);
  heap.insert(2);
  heap.insert(3);

  assert.ok(!heap.remove(4));
  assert.ok(heap.size === 3);

});

t('user defined scoring function', function(assert) {

  var heap = new MinHeap(function(l,r) { return l.weight - r.weight; });

  heap.insert({weight: 1, id: "spaghetti"});
  heap.insert({weight: 3, id: "courgettes"});

  assert.ok(heap.removeHead().id === 'spaghetti');
  assert.ok(heap.removeHead().id === 'courgettes');

});
