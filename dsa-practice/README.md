# Data Structures and Algorithms Practice

A comprehensive TypeScript implementation of fundamental data structures and algorithms for computer science study and interview preparation.

## 🎯 Purpose

This project provides:
- **Complete implementations** of essential data structures
- **Algorithm implementations** with complexity analysis  
- **Practice problems** from coding interviews
- **Performance analysis tools** for understanding Big-O complexity
- **Test suites** to verify correctness
- **Educational examples** with detailed explanations

## 📚 Topics Covered

### Data Structures

#### Linear Data Structures
- **Arrays** - Dynamic arrays with automatic resizing
- **Linked Lists** - Singly and doubly linked lists
- **Stacks** - LIFO operations with applications
- **Queues** - FIFO, circular, priority, and deque implementations
- **Hash Tables** - Hash maps and hash sets with collision handling

#### Trees
- **Binary Search Trees** - Search, insert, delete, traversals
- **Heaps** - Min/max heaps, priority queues, heap sort
- **Tries** - Prefix trees for string operations

#### Graphs
- **Graph Representations** - Adjacency list and matrix
- **Weighted Graphs** - For shortest path algorithms

### Algorithms

#### Sorting Algorithms
- **Comparison-based**: Bubble, Selection, Insertion, Merge, Quick, Heap, Tim
- **Non-comparison**: Counting, Radix, Bucket
- **Time complexities**: O(n²) to O(n log n)

#### Searching Algorithms
- **Linear Search** - O(n) sequential search
- **Binary Search** - O(log n) on sorted arrays
- **Specialized**: Jump, Interpolation, Exponential, Ternary

#### Graph Algorithms
- **Traversals**: BFS, DFS (iterative and recursive)
- **Shortest Paths**: Dijkstra's Algorithm, Bellman-Ford, A*
- **Utilities**: Cycle detection, topological sort, connected components

#### Dynamic Programming
- **Classic Problems**: Fibonacci, Knapsack, LCS, LIS
- **Optimization Problems**: Coin change, house robber, max subarray
- **String Problems**: Edit distance, word break, palindromes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd dsa-practice
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the demo**:
   ```bash
   npm run dev
   ```

4. **Run tests**:
   ```bash
   npm test
   npm run test:watch    # Watch mode
   npm run test:coverage # With coverage report
   ```

5. **Build the project**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── data-structures/
│   ├── linear/              # Arrays, Lists, Stacks, Queues, Hash Tables
│   ├── trees/               # BST, Heap, Trie
│   └── graphs/              # Graph implementations
├── algorithms/
│   ├── sorting/             # All sorting algorithms
│   ├── searching/           # All searching algorithms
│   ├── graph/               # Graph algorithms (BFS, DFS, Dijkstra)
│   └── dynamic-programming/ # DP problems and solutions
├── utils/
│   └── complexity-analyzer.ts # Big-O analysis tools
├── practice/
│   └── practice-problems.ts    # Coding interview problems
├── tests/
│   └── *.test.ts              # Test suites
└── index.ts                   # Main entry point
```

## 🎓 Learning Path

### Beginner (Start Here)
1. **Arrays and Strings** - Basic operations and two-pointer techniques
2. **Linked Lists** - Understanding pointer manipulation
3. **Stacks and Queues** - LIFO/FIFO operations and applications
4. **Basic Sorting** - Bubble, selection, insertion sort
5. **Linear Search** - Sequential search algorithms

### Intermediate 
1. **Hash Tables** - Hash functions, collision resolution
2. **Binary Search Trees** - Tree operations and traversals
3. **Heaps** - Priority queues and heap sort
4. **Advanced Sorting** - Merge sort, quick sort
5. **Binary Search** - Efficient searching in sorted data
6. **Graph Basics** - BFS, DFS traversals

### Advanced
1. **Tries** - String processing and prefix operations
2. **Dynamic Programming** - Optimization problems
3. **Graph Algorithms** - Shortest paths, cycle detection
4. **Advanced Data Structures** - Union-find, segment trees
5. **Complexity Analysis** - Big-O notation mastery

## 📊 Complexity Analysis

The project includes comprehensive complexity analysis for all implementations:

### Time Complexity Examples
- **O(1)** - Hash table access, array indexing
- **O(log n)** - Binary search, heap operations
- **O(n)** - Linear search, array traversal
- **O(n log n)** - Merge sort, heap sort
- **O(n²)** - Bubble sort, nested loops

### Space Complexity Examples
- **O(1)** - In-place algorithms
- **O(n)** - Linear space for data storage
- **O(log n)** - Recursion stack space

## 🧪 Practice Problems

The project includes common coding interview problems organized by category:

### Array Problems
- Two Sum
- Best Time to Buy and Sell Stock
- Maximum Subarray (Kadane's Algorithm)
- Product of Array Except Self

### String Problems
- Valid Anagram
- Valid Palindrome
- Longest Substring Without Repeating Characters
- Group Anagrams

### Linked List Problems
- Reverse Linked List
- Merge Two Sorted Lists
- Linked List Cycle Detection
- Remove Nth Node From End

### Tree Problems
- Maximum Depth of Binary Tree
- Same Tree
- Invert Binary Tree
- Binary Tree Level Order Traversal

### Dynamic Programming Problems
- House Robber
- Coin Change
- Unique Paths
- Longest Increasing Subsequence

### Graph Problems
- Number of Islands
- Course Schedule (Topological Sort)
- Clone Graph

## 🔧 Utility Tools

### Complexity Analyzer
```typescript
import { GrowthRateAnalyzer, PerformanceAnalyzer } from './utils/complexity-analyzer';

// Compare growth rates
GrowthRateAnalyzer.compareComplexities(1000);

// Benchmark algorithms
PerformanceAnalyzer.benchmarkComplexities([
  { name: 'Bubble Sort', func: bubbleSort, complexity: TimeComplexity.QUADRATIC },
  { name: 'Quick Sort', func: quickSort, complexity: TimeComplexity.LINEARITHMIC }
], generateRandomArray);
```

### Practice Problem Generator
```typescript
import { PracticeGenerator } from './practice/practice-problems';

// Generate random practice problems
const problem = PracticeGenerator.generateArrayProblem();
console.log(problem.problem);
console.log('Hints:', problem.hints);
```

## 📝 Usage Examples

### Data Structures
```typescript
// Dynamic Array
const arr = new DynamicArray<number>();
arr.push(1, 2, 3);
console.log(arr.get(0)); // 1

// Hash Table
const map = new HashTable<string, number>();
map.set('key', 42);
console.log(map.get('key')); // 42

// Binary Search Tree
const bst = new BinarySearchTree<number>();
bst.insert(5, 3, 7);
console.log(bst.inorderTraversal()); // [3, 5, 7]
```

### Algorithms
```typescript
// Sorting
const unsorted = [3, 1, 4, 1, 5, 9];
console.log(quickSort(unsorted)); // [1, 1, 3, 4, 5, 9]

// Searching
const sorted = [1, 2, 3, 4, 5];
console.log(binarySearch(sorted, 3)); // 2

// Graph algorithms
const graph = new Graph<string>();
graph.addEdge('A', 'B');
const result = bfs(graph, 'A');
console.log(result.order); // ['A', 'B']
```

## 🎯 Interview Preparation

This project is designed to help with:

1. **Technical Interviews** - Practice common algorithms and data structures
2. **Coding Challenges** - Solve problems with optimal time/space complexity
3. **System Design** - Understand trade-offs between different approaches
4. **Code Reviews** - Learn best practices and clean code principles

### Study Tips
- Start with basic concepts and build up complexity
- Focus on understanding time/space trade-offs
- Practice coding problems daily
- Explain your thought process while coding
- Test your solutions thoroughly

## 🧪 Testing

The project includes comprehensive test suites for all implementations:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Tests cover:
- Correctness of implementations
- Edge cases and error conditions
- Performance characteristics
- API contracts

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional data structures (Red-Black Trees, B-Trees)
- More algorithms (String algorithms, Number theory)
- Performance optimizations
- Better visualization tools
- More practice problems

## 📖 Additional Resources

### Books
- "Introduction to Algorithms" by CLRS
- "Algorithm Design Manual" by Steven Skiena
- "Cracking the Coding Interview" by Gayle McDowell

### Online Platforms
- LeetCode
- HackerRank
- CodeSignal
- GeeksforGeeks

### Complexity Analysis
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Algorithm Visualizations](https://visualgo.net/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Computer Science curriculum from leading universities
- Open source algorithm implementations
- Coding interview preparation resources
- TypeScript and Node.js communities
