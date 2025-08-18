/**
 * Binary Heap Implementation (Min-Heap and Max-Heap)
 * 
 * Time Complexities:
 * - Insert: O(log n)
 * - Extract Min/Max: O(log n)
 * - Peek Min/Max: O(1)
 * - Build Heap: O(n)
 * - Heapify: O(log n)
 * 
 * Space Complexity: O(n)
 */

export class MinHeap<T> {
  private heap: T[];
  private compare: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.heap = [];
    // Default comparison function (min-heap)
    this.compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  /**
   * Insert element into heap - O(log n)
   */
  insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Extract minimum element - O(log n)
   */
  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined;
    
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    
    return min;
  }

  /**
   * Peek at minimum element - O(1)
   */
  peek(): T | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  /**
   * Get heap size - O(1)
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Check if heap is empty - O(1)
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Build heap from array - O(n)
   */
  buildHeap(array: T[]): void {
    this.heap = [...array];
    
    // Start from last non-leaf node and heapify down
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  /**
   * Heapify up (used after insertion) - O(log n)
   */
  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      
      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
        break;
      }
      
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  /**
   * Heapify down (used after extraction) - O(log n)
   */
  private heapifyDown(index: number): void {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      
      if (leftChild < this.heap.length && 
          this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
        smallest = leftChild;
      }
      
      if (rightChild < this.heap.length && 
          this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
        smallest = rightChild;
      }
      
      if (smallest === index) {
        break;
      }
      
      this.swap(index, smallest);
      index = smallest;
    }
  }

  /**
   * Swap two elements in the heap
   */
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * Get array representation of heap - O(n)
   */
  toArray(): T[] {
    return [...this.heap];
  }

  /**
   * Clear the heap - O(1)
   */
  clear(): void {
    this.heap = [];
  }

  /**
   * Check if heap property is maintained - O(n)
   */
  isValidHeap(): boolean {
    for (let i = 0; i < Math.floor(this.heap.length / 2); i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;
      
      if (leftChild < this.heap.length && 
          this.compare(this.heap[i], this.heap[leftChild]) > 0) {
        return false;
      }
      
      if (rightChild < this.heap.length && 
          this.compare(this.heap[i], this.heap[rightChild]) > 0) {
        return false;
      }
    }
    
    return true;
  }
}

/**
 * Max Heap Implementation
 */
export class MaxHeap<T> extends MinHeap<T> {
  constructor(compareFn?: (a: T, b: T) => number) {
    // Reverse the comparison for max-heap
    const maxCompareFn = compareFn ? 
      (a: T, b: T) => -compareFn(a, b) :
      (a: T, b: T) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      };
    
    super(maxCompareFn);
  }

  /**
   * Extract maximum element - O(log n)
   */
  extractMax(): T | undefined {
    return this.extractMin(); // Uses parent's extractMin with reversed comparison
  }

  /**
   * Peek at maximum element - O(1)
   */
  peekMax(): T | undefined {
    return this.peek();
  }
}

/**
 * Priority Queue using Heap
 */
export interface PriorityItem<T> {
  data: T;
  priority: number;
}

export class PriorityQueueHeap<T> {
  private heap: MinHeap<PriorityItem<T>>;

  constructor() {
    this.heap = new MinHeap<PriorityItem<T>>(
      (a, b) => a.priority - b.priority
    );
  }

  /**
   * Add element with priority - O(log n)
   */
  enqueue(data: T, priority: number): void {
    this.heap.insert({ data, priority });
  }

  /**
   * Remove highest priority element - O(log n)
   */
  dequeue(): T | undefined {
    const item = this.heap.extractMin();
    return item ? item.data : undefined;
  }

  /**
   * Peek at highest priority element - O(1)
   */
  front(): T | undefined {
    const item = this.heap.peek();
    return item ? item.data : undefined;
  }

  /**
   * Check if queue is empty - O(1)
   */
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  /**
   * Get queue size - O(1)
   */
  size(): number {
    return this.heap.size();
  }

  /**
   * Clear the queue - O(1)
   */
  clear(): void {
    this.heap.clear();
  }
}

/**
 * Heap Sort Implementation
 */
export class HeapSort {
  /**
   * Sort array using heap sort - O(n log n)
   */
  static sort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const maxHeap = new MaxHeap<T>(compareFn);
    maxHeap.buildHeap(array);
    
    const sorted: T[] = [];
    while (!maxHeap.isEmpty()) {
      sorted.push(maxHeap.extractMax()!);
    }
    
    return sorted;
  }

  /**
   * In-place heap sort - O(n log n)
   */
  static sortInPlace<T>(array: T[], compareFn?: (a: T, b: T) => number): void {
    const compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    // Build max heap
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      this.heapify(array, array.length, i, compare);
    }

    // Extract elements one by one
    for (let i = array.length - 1; i > 0; i--) {
      // Move current root to end
      [array[0], array[i]] = [array[i], array[0]];
      
      // Call heapify on the reduced heap
      this.heapify(array, i, 0, compare);
    }
  }

  private static heapify<T>(
    array: T[], 
    heapSize: number, 
    rootIndex: number, 
    compare: (a: T, b: T) => number
  ): void {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    if (leftChild < heapSize && compare(array[leftChild], array[largest]) > 0) {
      largest = leftChild;
    }

    if (rightChild < heapSize && compare(array[rightChild], array[largest]) > 0) {
      largest = rightChild;
    }

    if (largest !== rootIndex) {
      [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
      this.heapify(array, heapSize, largest, compare);
    }
  }
}

/**
 * Median Finder using two heaps
 * Maintains median in O(1) time with O(log n) insertions
 */
export class MedianFinder {
  private maxHeap: MaxHeap<number>; // For smaller half
  private minHeap: MinHeap<number>; // For larger half

  constructor() {
    this.maxHeap = new MaxHeap<number>();
    this.minHeap = new MinHeap<number>();
  }

  /**
   * Add number to data structure - O(log n)
   */
  addNumber(num: number): void {
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peekMax()!) {
      this.maxHeap.insert(num);
    } else {
      this.minHeap.insert(num);
    }

    // Balance the heaps
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.insert(this.maxHeap.extractMax()!);
    } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
      this.maxHeap.insert(this.minHeap.extractMin()!);
    }
  }

  /**
   * Find median - O(1)
   */
  findMedian(): number {
    if (this.maxHeap.size() === this.minHeap.size()) {
      return (this.maxHeap.peekMax()! + this.minHeap.peek()!) / 2;
    } else if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peekMax()!;
    } else {
      return this.minHeap.peek()!;
    }
  }
}
