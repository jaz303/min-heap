function CMP(l,r) { return l-r; }

function MinHeap(scoreFn) {
  this.cmp = scoreFn || CMP;
  this.heap = [];
  this.size = 0;
}

MinHeap.prototype = {
  
  insert: function(item) {
    
    var heap  = this.heap,
        ix    = this.size++;
        
    heap[ix] = item;
    
    var parent = (ix-1)>>1;
    
    while ((ix > 0) && this.cmp(heap[parent], item) > 0) {
      var tmp = heap[parent];
      heap[parent] = heap[ix];
      heap[ix] = tmp;
      ix = parent;
      parent = (ix-1)>>1;
    }
        
  },
  
  removeHead: function() {
    
    var heap  = this.heap,
        cmp   = this.cmp;
    
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
      
      if (leftIx < this.size && cmp(heap[leftIx], heap[minIx]) < 0) {
        minIx = leftIx;
      }
      
      if (rightIx < this.size && cmp(heap[rightIx], heap[minIx]) < 0) {
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