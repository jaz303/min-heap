var test = require('tape');
var MinHeap = require('../').MinHeap;

function t(str, fn) {
  test(str, function(assert) {
    fn(assert);
    assert.end();
  })
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
    assert.ok(heap.remove() === check.shift());
  }

  for (var i = 0; i < 50; ++i) {
    var v = Math.random();
    heap.insert(v);
    check.push(v);
  }

  check.sort();
  while (heap.size) {
    assert.ok(heap.remove() === check.shift());
  }

  assert.ok(check.length === 0);

});

t('user defined scoring function', function(assert) {

  var heap = new MinHeap(function(v) { return v.weight; });

  heap.insert({weight: 1, id: "spaghetti"});
  heap.insert({weight: 3, id: "courgettes"});

  assert.ok(heap.remove().id === 'spaghetti');
  assert.ok(heap.remove().id === 'courgettes');

});
