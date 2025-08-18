/**
 * Dynamic Array Implementation
 * 
 * Time Complexities:
 * - Access: O(1)
 * - Search: O(n)
 * - Insert (at end): O(1) amortized, O(n) worst case
 * - Insert (at position): O(n)
 * - Delete (at end): O(1)
 * - Delete (at position): O(n)
 * 
 * Space Complexity: O(n)
 */

export class DynamicArray<T> {
  private data: T[];
  private size: number;
  private capacity: number;

  constructor(initialCapacity: number = 10) {
    this.data = new Array(initialCapacity);
    this.size = 0;
    this.capacity = initialCapacity;
  }

  /**
   * Get element at index - O(1)
   */
  get(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    return this.data[index];
  }

  /**
   * Set element at index - O(1)
   */
  set(index: number, value: T): void {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    this.data[index] = value;
  }

  /**
   * Add element to end - O(1) amortized
   */
  push(value: T): void {
    if (this.size >= this.capacity) {
      this.resize();
    }
    this.data[this.size++] = value;
  }

  /**
   * Remove and return last element - O(1)
   */
  pop(): T | undefined {
    if (this.size === 0) return undefined;
    const value = this.data[--this.size];
    this.data[this.size] = undefined as any; // Clear reference
    return value;
  }

  /**
   * Insert element at specific index - O(n)
   */
  insert(index: number, value: T): void {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }
    
    if (this.size >= this.capacity) {
      this.resize();
    }

    // Shift elements to the right
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    
    this.data[index] = value;
    this.size++;
  }

  /**
   * Remove element at specific index - O(n)
   */
  remove(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    const value = this.data[index];
    
    // Shift elements to the left
    for (let i = index; i < this.size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    
    this.size--;
    this.data[this.size] = undefined as any; // Clear reference
    return value;
  }

  /**
   * Find index of element - O(n)
   */
  indexOf(value: T): number {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Check if array contains element - O(n)
   */
  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  /**
   * Get current size - O(1)
   */
  length(): number {
    return this.size;
  }

  /**
   * Check if array is empty - O(1)
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Convert to regular array - O(n)
   */
  toArray(): T[] {
    return this.data.slice(0, this.size);
  }

  /**
   * Resize array when capacity is reached - O(n)
   */
  private resize(): void {
    this.capacity *= 2;
    const newData = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.data = new Array(this.capacity);
    this.size = 0;
  }
}
