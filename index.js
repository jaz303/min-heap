function I(v) { return v; }

function MinHeap(scoreFn) {
  this.score = scoreFn || I;
  this.heap = [];
  this.size = 0;
}

MinHeap.prototype = {
  
  insert: function(item) {
    
    var score = this.score(item),
        heap  = this.heap,
        ix    = this.size++;
        
    heap[ix] = item;
    
    var parent = (ix-1)>>1;
    
    while ((ix > 0) && (this.score(heap[parent]) > score)) {
      var tmp = heap[parent];
      heap[parent] = heap[ix];
      heap[ix] = tmp;
      ix = parent;
      parent = (ix-1)>>1;
    }
        
  },
  
  remove: function() {
    
    var heap  = this.heap,
        score = this.score;
    
    if (this.size === 0)
      return undefined;
      
    var out = heap[0];
    
    heap[0] = heap[--this.size];
    heap[this.size] = null;
    
    var ix = 0;
    
    while (true) {
      
      var leftIx  = (ix<<1)+1,
          rightIx = (ix<<1)+2,
          minIx   = ix;
      
      if (leftIx < this.size && score(heap[leftIx]) < score(heap[minIx])) {
        minIx = leftIx;
      }
      
      if (rightIx < this.size && score(heap[rightIx]) < score(heap[minIx])) {
        minIx = rightIx;
      }
      
      if (minIx !== ix) {
        var tmp = heap[ix];
        heap[ix] = heap[minIx];
        heap[minIx] = tmp;
        ix = minIx;
      } else {
        break;
      }
      
    }
    
    return out;
    
  }

};

exports.MinHeap = MinHeap;