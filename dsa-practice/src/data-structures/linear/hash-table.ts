/**
 * Hash Table Implementation
 * 
 * Time Complexities (Average case):
 * - Insert: O(1)
 * - Delete: O(1)
 * - Search: O(1)
 * 
 * Time Complexities (Worst case - all collisions):
 * - Insert: O(n)
 * - Delete: O(n)
 * - Search: O(n)
 * 
 * Space Complexity: O(n)
 */


// Crutial things to know:
// Clustering: When two keys hash to the same index, they are said to be clustered.
// Collision: When two keys hash to the same index, they are said to be collided.
// Load Factor: The ratio of the number of elements to the number of buckets.
// Resizing: When the load factor is greater than the load factor threshold, the hash table is resized.
// Rehashing: When the hash table is resized, all the elements are rehashed and redistributed into the new buckets.
// Hash Function: A function that converts a key into an index.
// Hash Table: A data structure that stores key-value pairs and uses a hash function to compute the index of the key.

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

export class HashTable<K, V> {
  private buckets: KeyValuePair<K, V>[][];
  private size: number;
  private capacity: number;
  private loadFactorThreshold: number;

  constructor(initialCapacity: number = 16, loadFactorThreshold: number = 0.75) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.loadFactorThreshold = loadFactorThreshold;
    this.buckets = new Array(this.capacity);
    
    // Initialize each bucket as an empty array
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  /**
   * Hash function - O(1)
   */
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash * 31 + keyString.charCodeAt(i)) % this.capacity;
    }
    
    return Math.abs(hash);
  }

  /**
   * Insert key-value pair - O(1) average, O(n) worst case
   */
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value; // Update existing value
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push({ key, value });
    this.size++;
    
    // Check if resize is needed
    if (this.loadFactor() > this.loadFactorThreshold) {
      this.resize();
    }
  }

  /**
   * Get value by key - O(1) average, O(n) worst case
   */
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (const pair of bucket) {
      if (pair.key === key) {
        return pair.value;
      }
    }
    
    return undefined;
  }

  /**
   * Check if key exists - O(1) average, O(n) worst case
   */
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Delete key-value pair - O(1) average, O(n) worst case
   */
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get all keys - O(n)
   */
  keys(): K[] {
    const keys: K[] = [];
    
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        keys.push(pair.key);
      }
    }
    
    return keys;
  }

  /**
   * Get all values - O(n)
   */
  values(): V[] {
    const values: V[] = [];
    
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        values.push(pair.value);
      }
    }
    
    return values;
  }

  /**
   * Get all key-value pairs - O(n)
   */
  entries(): [K, V][] {
    const entries: [K, V][] = [];
    
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        entries.push([pair.key, pair.value]);
      }
    }
    
    return entries;
  }

  /**
   * Get current size - O(1)
   */
  length(): number {
    return this.size;
  }

  /**
   * Check if empty - O(1)
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    this.size = 0;
  }

  /**
   * Get current load factor - O(1)
   */
  loadFactor(): number {
    return this.size / this.capacity;
  }

  /**
   * Resize hash table when load factor exceeds threshold - O(n)
   */
  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity);
    
    // Initialize new buckets
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    
    // Rehash all existing pairs
    for (const bucket of oldBuckets) {
      for (const pair of bucket) {
        this.set(pair.key, pair.value);
      }
    }
  }

  /**
   * Get statistics about the hash table - O(n)
   */
  getStats(): {
    size: number;
    capacity: number;
    loadFactor: number;
    maxBucketSize: number;
    averageBucketSize: number;
    emptyBuckets: number;
  } {
    let maxBucketSize = 0;
    let emptyBuckets = 0;
    let totalItems = 0;

    for (const bucket of this.buckets) {
      maxBucketSize = Math.max(maxBucketSize, bucket.length);
      if (bucket.length === 0) {
        emptyBuckets++;
      }
      totalItems += bucket.length;
    }

    return {
      size: this.size,
      capacity: this.capacity,
      loadFactor: this.loadFactor(),
      maxBucketSize,
      averageBucketSize: totalItems / this.capacity,
      emptyBuckets
    };
  }
}

/**
 * Hash Set Implementation
 * Similar to Hash Table but only stores keys (no values)
 */

export class HashSet<T> {
  private hashTable: HashTable<T, boolean>;

  constructor(initialCapacity?: number) {
    this.hashTable = new HashTable<T, boolean>(initialCapacity);
  }

  /**
   * Add element to set - O(1) average
   */
  add(item: T): void {
    this.hashTable.set(item, true);
  }

  /**
   * Check if set contains element - O(1) average
   */
  has(item: T): boolean {
    return this.hashTable.has(item);
  }

  /**
   * Remove element from set - O(1) average
   */
  delete(item: T): boolean {
    return this.hashTable.delete(item);
  }

  /**
   * Get all elements - O(n)
   */
  values(): T[] {
    return this.hashTable.keys();
  }

  /**
   * Get set size - O(1)
   */
  size(): number {
    return this.hashTable.length();
  }

  /**
   * Check if set is empty - O(1)
   */
  isEmpty(): boolean {
    return this.hashTable.isEmpty();
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.hashTable.clear();
  }

  /**
   * Union with another set - O(n + m)
   */
  union(otherSet: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>();
    
    // Add all elements from this set
    for (const item of this.values()) {
      result.add(item);
    }
    
    // Add all elements from other set
    for (const item of otherSet.values()) {
      result.add(item);
    }
    
    return result;
  }

  /**
   * Intersection with another set - O(min(n, m))
   */
  intersection(otherSet: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>();
    const smaller = this.size() < otherSet.size() ? this : otherSet;
    const larger = this.size() < otherSet.size() ? otherSet : this;
    
    for (const item of smaller.values()) {
      if (larger.has(item)) {
        result.add(item);
      }
    }
    
    return result;
  }

  /**
   * Difference (elements in this set but not in other) - O(n)
   */
  difference(otherSet: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>();
    
    for (const item of this.values()) {
      if (!otherSet.has(item)) {
        result.add(item);
      }
    }
    
    return result;
  }

  /**
   * Check if this set is subset of another - O(n)
   */
  isSubsetOf(otherSet: HashSet<T>): boolean {
    for (const item of this.values()) {
      if (!otherSet.has(item)) {
        return false;
      }
    }
    return true;
  }
}
