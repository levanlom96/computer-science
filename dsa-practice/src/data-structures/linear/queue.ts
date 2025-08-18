/**
 * Queue Implementation (FIFO - First In, First Out)
 * 
 * Time Complexities:
 * - Enqueue: O(1)
 * - Dequeue: O(1) for linked list, O(n) for array-based
 * - Front/Peek: O(1)
 * - Search: O(n)
 * 
 * Space Complexity: O(n)
 */

export class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Add element to rear of queue - O(1)
   */
  enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * Remove and return front element - O(n) due to array shift
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items.shift();
  }

  /**
   * Return front element without removing - O(1)
   */
  front(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items[0];
  }

  /**
   * Return rear element without removing - O(1)
   */
  rear(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Check if queue is empty - O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get queue size - O(1)
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Convert to array - O(n)
   */
  toArray(): T[] {
    return [...this.items];
  }
}

/**
 * Circular Queue Implementation
 * More efficient than regular array-based queue
 */

export class CircularQueue<T> {
  private items: (T | undefined)[];
  private frontIndex: number;
  private rearIndex: number;
  private count: number;
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.items = new Array(capacity);
    this.frontIndex = 0;
    this.rearIndex = -1;
    this.count = 0;
  }

  /**
   * Add element to rear of queue - O(1)
   */
  enqueue(item: T): void {
    if (this.isFull()) {
      throw new Error('Queue is full');
    }
    this.rearIndex = (this.rearIndex + 1) % this.capacity;
    this.items[this.rearIndex] = item;
    this.count++;
  }

  /**
   * Remove and return front element - O(1)
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    const item = this.items[this.frontIndex];
    this.items[this.frontIndex] = undefined;
    this.frontIndex = (this.frontIndex + 1) % this.capacity;
    this.count--;
    return item;
  }

  /**
   * Return front element without removing - O(1)
   */
  front(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items[this.frontIndex];
  }

  /**
   * Check if queue is empty - O(1)
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Check if queue is full - O(1)
   */
  isFull(): boolean {
    return this.count === this.capacity;
  }

  /**
   * Get queue size - O(1)
   */
  size(): number {
    return this.count;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.items = new Array(this.capacity);
    this.frontIndex = 0;
    this.rearIndex = -1;
    this.count = 0;
  }
}

/**
 * Queue implementation using Linked List
 * O(1) for all operations
 */

import { ListNode } from './linked-list';

export class LinkedQueue<T> {
  private front: ListNode<T> | null;
  private rear: ListNode<T> | null;
  private count: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }

  /**
   * Add element to rear of queue - O(1)
   */
  enqueue(data: T): void {
    const newNode = new ListNode(data);
    
    if (this.rear === null) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    
    this.count++;
  }

  /**
   * Remove and return front element - O(1)
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    
    const data = this.front!.data;
    this.front = this.front!.next;
    
    if (this.front === null) {
      this.rear = null;
    }
    
    this.count--;
    return data;
  }

  /**
   * Return front element without removing - O(1)
   */
  frontValue(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.front!.data;
  }

  /**
   * Check if queue is empty - O(1)
   */
  isEmpty(): boolean {
    return this.front === null;
  }

  /**
   * Get queue size - O(1)
   */
  size(): number {
    return this.count;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }
}

/**
 * Priority Queue Implementation
 * Elements are dequeued based on priority rather than insertion order
 */

interface PriorityItem<T> {
  data: T;
  priority: number;
}

export class PriorityQueue<T> {
  private items: PriorityItem<T>[];

  constructor() {
    this.items = [];
  }

  /**
   * Add element with priority - O(n) for insertion at correct position
   */
  enqueue(data: T, priority: number): void {
    const newItem: PriorityItem<T> = { data, priority };
    
    // Find correct position to insert based on priority
    let inserted = false;
    for (let i = 0; i < this.items.length; i++) {
      if (newItem.priority > this.items[i].priority) {
        this.items.splice(i, 0, newItem);
        inserted = true;
        break;
      }
    }
    
    if (!inserted) {
      this.items.push(newItem);
    }
  }

  /**
   * Remove and return highest priority element - O(1)
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Priority queue is empty');
    }
    return this.items.shift()!.data;
  }

  /**
   * Return highest priority element without removing - O(1)
   */
  front(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Priority queue is empty');
    }
    return this.items[0].data;
  }

  /**
   * Check if queue is empty - O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get queue size - O(1)
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.items = [];
  }
}

/**
 * Deque (Double-ended queue) Implementation
 * Supports insertion and deletion at both ends
 */

export class Deque<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Add element to front - O(n) due to array unshift
   */
  addFront(item: T): void {
    this.items.unshift(item);
  }

  /**
   * Add element to rear - O(1)
   */
  addRear(item: T): void {
    this.items.push(item);
  }

  /**
   * Remove element from front - O(n) due to array shift
   */
  removeFront(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items.shift();
  }

  /**
   * Remove element from rear - O(1)
   */
  removeRear(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items.pop();
  }

  /**
   * Peek front element - O(1)
   */
  peekFront(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items[0];
  }

  /**
   * Peek rear element - O(1)
   */
  peekRear(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Deque is empty');
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Check if deque is empty - O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get deque size - O(1)
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.items = [];
  }
}
