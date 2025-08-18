/**
 * Test Suite for Data Structures
 */

import { DynamicArray } from '../data-structures/linear/array';
import { SinglyLinkedList } from '../data-structures/linear/linked-list';
import { Stack } from '../data-structures/linear/stack';
import { Queue } from '../data-structures/linear/queue';
import { HashTable } from '../data-structures/linear/hash-table';
import { BinarySearchTree } from '../data-structures/trees/binary-search-tree';
import { MinHeap } from '../data-structures/trees/heap';
import { Trie } from '../data-structures/trees/trie';
import { Graph } from '../data-structures/graphs/graph';

describe('DynamicArray', () => {
  let arr: DynamicArray<number>;

  beforeEach(() => {
    arr = new DynamicArray<number>();
  });

  test('should start empty', () => {
    expect(arr.length()).toBe(0);
    expect(arr.isEmpty()).toBe(true);
  });

  test('should push and access elements', () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    
    expect(arr.length()).toBe(3);
    expect(arr.get(0)).toBe(1);
    expect(arr.get(1)).toBe(2);
    expect(arr.get(2)).toBe(3);
  });

  test('should pop elements', () => {
    arr.push(1);
    arr.push(2);
    
    expect(arr.pop()).toBe(2);
    expect(arr.length()).toBe(1);
    expect(arr.pop()).toBe(1);
    expect(arr.isEmpty()).toBe(true);
  });

  test('should insert at specific index', () => {
    arr.push(1);
    arr.push(3);
    arr.insert(1, 2);
    
    expect(arr.toArray()).toEqual([1, 2, 3]);
  });

  test('should remove at specific index', () => {
    arr.push(1);
    arr.push(2);
    arr.push(3);
    
    const removed = arr.remove(1);
    expect(removed).toBe(2);
    expect(arr.toArray()).toEqual([1, 3]);
  });

  test('should find index of element', () => {
    arr.push(10);
    arr.push(20);
    arr.push(30);
    
    expect(arr.indexOf(20)).toBe(1);
    expect(arr.indexOf(40)).toBe(-1);
  });
});

describe('SinglyLinkedList', () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList<number>();
  });

  test('should start empty', () => {
    expect(list.length()).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  test('should prepend elements', () => {
    list.prepend(1);
    list.prepend(2);
    
    expect(list.toArray()).toEqual([2, 1]);
  });

  test('should append elements', () => {
    list.append(1);
    list.append(2);
    
    expect(list.toArray()).toEqual([1, 2]);
  });

  test('should insert at specific index', () => {
    list.append(1);
    list.append(3);
    list.insert(1, 2);
    
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test('should remove elements', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    
    expect(list.remove(2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3]);
    expect(list.remove(4)).toBe(false);
  });

  test('should reverse the list', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    
    list.reverse();
    expect(list.toArray()).toEqual([3, 2, 1]);
  });
});

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('should start empty', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test('should push and pop elements', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    
    expect(stack.size()).toBe(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
  });

  test('should peek at top element', () => {
    stack.push(1);
    stack.push(2);
    
    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(2); // Should not remove element
  });

  test('should throw error when popping empty stack', () => {
    expect(() => stack.pop()).toThrow('Stack is empty');
  });
});

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('should start empty', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  test('should enqueue and dequeue elements', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    
    expect(queue.size()).toBe(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.size()).toBe(1);
  });

  test('should peek at front element', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    
    expect(queue.front()).toBe(1);
    expect(queue.size()).toBe(2); // Should not remove element
  });
});

describe('HashTable', () => {
  let hashTable: HashTable<string, number>;

  beforeEach(() => {
    hashTable = new HashTable<string, number>();
  });

  test('should start empty', () => {
    expect(hashTable.length()).toBe(0);
    expect(hashTable.isEmpty()).toBe(true);
  });

  test('should set and get values', () => {
    hashTable.set('key1', 100);
    hashTable.set('key2', 200);
    
    expect(hashTable.get('key1')).toBe(100);
    expect(hashTable.get('key2')).toBe(200);
    expect(hashTable.get('key3')).toBe(undefined);
  });

  test('should check if key exists', () => {
    hashTable.set('key1', 100);
    
    expect(hashTable.has('key1')).toBe(true);
    expect(hashTable.has('key2')).toBe(false);
  });

  test('should delete keys', () => {
    hashTable.set('key1', 100);
    hashTable.set('key2', 200);
    
    expect(hashTable.delete('key1')).toBe(true);
    expect(hashTable.has('key1')).toBe(false);
    expect(hashTable.delete('key3')).toBe(false);
  });

  test('should get all keys and values', () => {
    hashTable.set('a', 1);
    hashTable.set('b', 2);
    
    const keys = hashTable.keys();
    const values = hashTable.values();
    
    expect(keys).toContain('a');
    expect(keys).toContain('b');
    expect(values).toContain(1);
    expect(values).toContain(2);
  });
});

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  test('should start empty', () => {
    expect(bst.isEmpty()).toBe(true);
    expect(bst.count()).toBe(0);
  });

  test('should insert and search elements', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(1);
    bst.insert(9);
    
    expect(bst.search(5)).toBe(true);
    expect(bst.search(3)).toBe(true);
    expect(bst.search(7)).toBe(true);
    expect(bst.search(2)).toBe(false);
  });

  test('should find min and max', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(1);
    bst.insert(9);
    
    expect(bst.findMin()).toBe(1);
    expect(bst.findMax()).toBe(9);
  });

  test('should perform inorder traversal', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(1);
    bst.insert(9);
    
    expect(bst.inorderTraversal()).toEqual([1, 3, 5, 7, 9]);
  });

  test('should delete elements', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    
    expect(bst.delete(3)).toBe(true);
    expect(bst.search(3)).toBe(false);
    expect(bst.delete(10)).toBe(false);
  });
});

describe('MinHeap', () => {
  let heap: MinHeap<number>;

  beforeEach(() => {
    heap = new MinHeap<number>();
  });

  test('should start empty', () => {
    expect(heap.isEmpty()).toBe(true);
    expect(heap.size()).toBe(0);
  });

  test('should insert and extract min', () => {
    heap.insert(5);
    heap.insert(3);
    heap.insert(7);
    heap.insert(1);
    
    expect(heap.peek()).toBe(1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(3);
    expect(heap.size()).toBe(2);
  });

  test('should build heap from array', () => {
    heap.buildHeap([5, 3, 7, 1, 9, 2]);
    
    expect(heap.peek()).toBe(1);
    expect(heap.size()).toBe(6);
  });

  test('should validate heap property', () => {
    heap.insert(5);
    heap.insert(3);
    heap.insert(7);
    
    expect(heap.isValidHeap()).toBe(true);
  });
});

describe('Trie', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test('should start empty', () => {
    expect(trie.isEmpty()).toBe(true);
    expect(trie.size()).toBe(0);
  });

  test('should insert and search words', () => {
    trie.insert('hello');
    trie.insert('world');
    trie.insert('help');
    
    expect(trie.search('hello')).toBe(true);
    expect(trie.search('world')).toBe(true);
    expect(trie.search('help')).toBe(true);
    expect(trie.search('hell')).toBe(false);
  });

  test('should check prefixes', () => {
    trie.insert('hello');
    trie.insert('help');
    
    expect(trie.startsWith('hel')).toBe(true);
    expect(trie.startsWith('hello')).toBe(true);
    expect(trie.startsWith('world')).toBe(false);
  });

  test('should get words with prefix', () => {
    trie.insert('hello');
    trie.insert('help');
    trie.insert('world');
    
    const helWords = trie.getWordsWithPrefix('hel');
    expect(helWords).toContain('hello');
    expect(helWords).toContain('help');
    expect(helWords).not.toContain('world');
  });

  test('should delete words', () => {
    trie.insert('hello');
    trie.insert('help');
    
    expect(trie.delete('hello')).toBe(true);
    expect(trie.search('hello')).toBe(false);
    expect(trie.search('help')).toBe(true);
  });
});

describe('Graph', () => {
  let graph: Graph<string>;

  beforeEach(() => {
    graph = new Graph<string>();
  });

  test('should start empty', () => {
    expect(graph.isEmpty()).toBe(true);
    expect(graph.vertexCount()).toBe(0);
  });

  test('should add vertices and edges', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addEdge('A', 'B');
    
    expect(graph.vertexCount()).toBe(2);
    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('B', 'A')).toBe(true); // Undirected
  });

  test('should get neighbors', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    
    const neighbors = graph.getNeighbors('A');
    expect(neighbors).toContain('B');
    expect(neighbors).toContain('C');
  });

  test('should remove vertices and edges', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    
    expect(graph.removeEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('A', 'B')).toBe(false);
    
    expect(graph.removeVertex('A')).toBe(true);
    expect(graph.vertexCount()).toBe(2); // B and C remain
  });
});
