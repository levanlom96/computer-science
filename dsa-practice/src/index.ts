/**
 * Data Structures and Algorithms Practice
 * Main entry point for the DSA practice project
 */

// Data Structures
export * from './data-structures/linear/array';
export * from './data-structures/linear/linked-list';
export * from './data-structures/linear/stack';
export * from './data-structures/linear/queue';
export * from './data-structures/linear/hash-table';
export * from './data-structures/trees/binary-search-tree';
export * from './data-structures/trees/heap';
export * from './data-structures/trees/trie';
export * from './data-structures/graphs/graph';

// Algorithms
export * from './algorithms/sorting/sorting';
export * from './algorithms/searching/searching';
export * from './algorithms/graph/graph-algorithms';
export * from './algorithms/dynamic-programming/dp';

// Utilities
export * from './utils/complexity-analyzer';

// Practice Problems
export * from './practice/practice-problems';

/**
 * Demo function to showcase various data structures and algorithms
 */
export function runDemos(): void {
  console.log('🚀 Data Structures and Algorithms Demo\n');
  
  // Array Demo
  console.log('📊 Dynamic Array Demo:');
  const arr = new DynamicArray<number>();
  arr.push(1);
  arr.push(2);
  arr.push(3);
  console.log('Array contents:', arr.toArray());
  console.log('Array size:', arr.length());
  console.log('Element at index 1:', arr.get(1));
  console.log();

  // Linked List Demo
  console.log('🔗 Linked List Demo:');
  const list = new SinglyLinkedList<string>();
  list.append('Hello');
  list.append('World');
  list.prepend('Hi');
  console.log('List contents:', list.toArray());
  list.reverse();
  console.log('Reversed list:', list.toArray());
  console.log();

  // Stack Demo
  console.log('📚 Stack Demo:');
  const stack = new Stack<number>();
  stack.push(10);
  stack.push(20);
  stack.push(30);
  console.log('Stack size:', stack.size());
  console.log('Top element:', stack.peek());
  console.log('Popped element:', stack.pop());
  console.log('Stack after pop:', stack.toArray());
  console.log();

  // Queue Demo
  console.log('🚶 Queue Demo:');
  const queue = new Queue<string>();
  queue.enqueue('First');
  queue.enqueue('Second');
  queue.enqueue('Third');
  console.log('Queue size:', queue.size());
  console.log('Front element:', queue.front());
  console.log('Dequeued element:', queue.dequeue());
  console.log('Queue after dequeue:', queue.toArray());
  console.log();

  // Hash Table Demo
  console.log('🗂️  Hash Table Demo:');
  const hashTable = new HashTable<string, number>();
  hashTable.set('apple', 5);
  hashTable.set('banana', 3);
  hashTable.set('orange', 8);
  console.log('Value for "apple":', hashTable.get('apple'));
  console.log('Contains "banana":', hashTable.has('banana'));
  console.log('All keys:', hashTable.keys());
  console.log('All values:', hashTable.values());
  console.log();

  // Binary Search Tree Demo
  console.log('🌳 Binary Search Tree Demo:');
  const bst = new BinarySearchTree<number>();
  [5, 3, 7, 1, 9, 4, 6, 8].forEach(val => bst.insert(val));
  console.log('Tree size:', bst.count());
  console.log('Inorder traversal (sorted):', bst.inorderTraversal());
  console.log('Min value:', bst.findMin());
  console.log('Max value:', bst.findMax());
  console.log('Search for 7:', bst.search(7));
  console.log('Search for 10:', bst.search(10));
  console.log();

  // Heap Demo
  console.log('⛰️  Min Heap Demo:');
  const heap = new MinHeap<number>();
  [5, 3, 7, 1, 9, 4, 6, 8].forEach(val => heap.insert(val));
  console.log('Heap size:', heap.size());
  console.log('Min element:', heap.peek());
  console.log('Extracted min:', heap.extractMin());
  console.log('New min after extraction:', heap.peek());
  console.log();

  // Trie Demo
  console.log('🌲 Trie Demo:');
  const trie = new Trie();
  ['hello', 'help', 'world', 'word', 'work'].forEach(word => trie.insert(word));
  console.log('Trie size:', trie.size());
  console.log('Search "hello":', trie.search('hello'));
  console.log('Search "hell":', trie.search('hell'));
  console.log('Starts with "hel":', trie.startsWith('hel'));
  console.log('Words with prefix "wor":', trie.getWordsWithPrefix('wor'));
  console.log();

  // Graph Demo
  console.log('🕸️  Graph Demo:');
  const graph = new Graph<string>();
  // Create a simple graph: A-B-C
  //                        |   |
  //                        D-E-F
  graph.addEdge('A', 'B');
  graph.addEdge('B', 'C');
  graph.addEdge('A', 'D');
  graph.addEdge('B', 'E');
  graph.addEdge('C', 'F');
  graph.addEdge('D', 'E');
  graph.addEdge('E', 'F');
  
  console.log('Graph vertices:', graph.getVertices());
  console.log('Neighbors of B:', graph.getNeighbors('B'));
  console.log('Has edge A-B:', graph.hasEdge('A', 'B'));
  console.log('Has edge A-C:', graph.hasEdge('A', 'C'));
  console.log();

  // Sorting Demo
  console.log('🔄 Sorting Algorithms Demo:');
  const unsorted = [64, 34, 25, 12, 22, 11, 90];
  console.log('Original array:', unsorted);
  console.log('Bubble sort:', bubbleSort(unsorted));
  console.log('Quick sort:', quickSort(unsorted));
  console.log('Merge sort:', mergeSort(unsorted));
  console.log('Heap sort:', heapSort(unsorted));
  console.log();

  // Searching Demo
  console.log('🔍 Searching Algorithms Demo:');
  const sorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const target = 7;
  console.log('Sorted array:', sorted);
  console.log(`Linear search for ${target}:`, linearSearch(sorted, target));
  console.log(`Binary search for ${target}:`, binarySearch(sorted, target));
  console.log(`Jump search for ${target}:`, jumpSearch(sorted, target));
  console.log();

  // Dynamic Programming Demo
  console.log('🧮 Dynamic Programming Demo:');
  console.log('Fibonacci(10) - Recursive:', fibonacciRecursive(10));
  console.log('Fibonacci(10) - Memoized:', fibonacciMemoized(10));
  console.log('Fibonacci(10) - Iterative:', fibonacciIterative(10));
  
  const coins = [1, 5, 10, 25];
  const amount = 30;
  console.log(`Coin change for ${amount} with coins [${coins}]:`, coinChange(coins, amount));
  
  const houses = [2, 7, 9, 3, 1];
  console.log(`House robber with houses [${houses}]:`, houseRobber(houses));
  console.log();

  // Complexity Analysis Demo
  console.log('📈 Complexity Analysis Demo:');
  console.log('Growth rates for n = 1000:');
  GrowthRateAnalyzer.compareComplexities(1000);
  console.log();

  console.log('🎯 Practice Problems Available:');
  console.log('- Array Problems: Two Sum, Best Time to Buy Stock, etc.');
  console.log('- String Problems: Valid Anagram, Valid Palindrome, etc.');
  console.log('- Linked List Problems: Reverse List, Merge Lists, etc.');
  console.log('- Tree Problems: Max Depth, Same Tree, Invert Tree, etc.');
  console.log('- Dynamic Programming: House Robber, Coin Change, etc.');
  console.log('- Graph Problems: Number of Islands, Course Schedule, etc.');
  console.log();

  console.log('✅ Demo completed! Start practicing with the problems in /practice directory.');
  console.log('💡 Run tests with: npm test');
  console.log('📚 Check complexity analysis with the ComplexityAnalyzer utilities.');
}

// Import necessary classes and functions for the demo
import { DynamicArray } from './data-structures/linear/array';
import { SinglyLinkedList } from './data-structures/linear/linked-list';
import { Stack } from './data-structures/linear/stack';
import { Queue } from './data-structures/linear/queue';
import { HashTable } from './data-structures/linear/hash-table';
import { BinarySearchTree } from './data-structures/trees/binary-search-tree';
import { MinHeap } from './data-structures/trees/heap';
import { Trie } from './data-structures/trees/trie';
import { Graph } from './data-structures/graphs/graph';
import { bubbleSort, quickSort, mergeSort, heapSort } from './algorithms/sorting/sorting';
import { linearSearch, binarySearch, jumpSearch } from './algorithms/searching/searching';
import { fibonacciRecursive, fibonacciMemoized, fibonacciIterative, coinChange, houseRobber } from './algorithms/dynamic-programming/dp';
import { GrowthRateAnalyzer } from './utils/complexity-analyzer';

// Run demo if this file is executed directly
if (require.main === module) {
  runDemos();
}
