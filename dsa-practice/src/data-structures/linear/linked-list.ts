/**
 * Singly Linked List Implementation
 * 
 * Time Complexities:
 * - Access: O(n)
 * - Search: O(n)
 * - Insert (at head): O(1)
 * - Insert (at tail): O(1) if tail reference, O(n) otherwise
 * - Insert (at position): O(n)
 * - Delete (at head): O(1)
 * - Delete (at tail): O(n)
 * - Delete (at position): O(n)
 * 
 * Space Complexity: O(n)
 */

export class ListNode<T> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class SinglyLinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Add element to the beginning - O(1)
   */
  prepend(data: T): void {
    const newNode = new ListNode(data);
    
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.size++;
  }

  /**
   * Add element to the end - O(1)
   */
  append(data: T): void {
    const newNode = new ListNode(data);
    
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  /**
   * Insert element at specific index - O(n)
   */
  insert(index: number, data: T): void {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    if (index === this.size) {
      this.append(data);
      return;
    }

    const newNode = new ListNode(data);
    let current = this.head;
    
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }
    
    newNode.next = current!.next;
    current!.next = newNode;
    this.size++;
  }

  /**
   * Remove first occurrence of element - O(n)
   */
  remove(data: T): boolean {
    if (this.head === null) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      if (current.next === this.tail) {
        this.tail = current;
      }
      current.next = current.next.next;
      this.size--;
      return true;
    }

    return false;
  }

  /**
   * Remove element at specific index - O(n)
   */
  removeAt(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      const data = this.head!.data;
      this.head = this.head!.next;
      if (this.head === null) {
        this.tail = null;
      }
      this.size--;
      return data;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    const data = current!.next!.data;
    if (current!.next === this.tail) {
      this.tail = current;
    }
    current!.next = current!.next!.next;
    this.size--;
    return data;
  }

  /**
   * Get element at specific index - O(n)
   */
  get(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.data;
  }

  /**
   * Find index of element - O(n)
   */
  indexOf(data: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /**
   * Check if list contains element - O(n)
   */
  contains(data: T): boolean {
    return this.indexOf(data) !== -1;
  }

  /**
   * Get current size - O(1)
   */
  length(): number {
    return this.size;
  }

  /**
   * Check if list is empty - O(1)
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Convert to array - O(n)
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Reverse the linked list - O(n)
   */
  reverse(): void {
    if (this.size <= 1) return;

    let prev: ListNode<T> | null = null;
    let current = this.head;
    this.tail = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }
}

/**
 * Doubly Linked List Implementation
 * Better for operations requiring backward traversal
 */

export class DoublyListNode<T> {
  data: T;
  next: DoublyListNode<T> | null;
  prev: DoublyListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList<T> {
  private head: DoublyListNode<T> | null;
  private tail: DoublyListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Add element to the beginning - O(1)
   */
  prepend(data: T): void {
    const newNode = new DoublyListNode(data);
    
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
  }

  /**
   * Add element to the end - O(1)
   */
  append(data: T): void {
    const newNode = new DoublyListNode(data);
    
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  /**
   * Remove element - O(1) if node reference is given, O(n) otherwise
   */
  removeNode(node: DoublyListNode<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    this.size--;
  }

  // Additional methods similar to SinglyLinkedList can be implemented
  // with the advantage of O(1) backward traversal
}
