# min-heap

## API

    var MinHeap = require('min-heap').MinHeap;

    var heap = new MinHeap;
    heap.insert(5);
    heap.insert(1);
    heap.insert(3);
    heap.insert(2);

    heap.remove(); // => 1
    heap.remove(); // => 2
    heap.remove(); // => 3
    heap.remove(); // => 5

## User-defined scoring function

    // Pass user-defined scoring function as first param
    // Return value is not cached so should be a fast, pure function
    var heap = new MinHeap(function(v) { return v.weight; });

    heap.insert({weight: 1, id: "spaghetti"});
    heap.insert({weight: 3, id: "courgettes"});

    heap.remove(); // => {weight: 1, id: "spaghetti"}
