# min-heap

## API

    var MinHeap = require('min-heap');

    var heap = new MinHeap;
    heap.insert(5);
    heap.insert(1);
    heap.insert(3);
    heap.insert(2);

    heap.removeHead(); // => 1
    heap.removeHead(); // => 2
    heap.removeHead(); // => 3
    heap.removeHead(); // => 5

## User-defined comparison function

    // Pass user-defined comparison function as first param
    var heap = new MinHeap(function(l,r) {
        return l.weight - r.weight;
    });

    heap.insert({weight: 1, id: "spaghetti"});
    heap.insert({weight: 3, id: "courgettes"});

    heap.removeHead(); // => {weight: 1, id: "spaghetti"}
