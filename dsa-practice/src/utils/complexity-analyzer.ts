/**
 * Big-O Complexity Analyzer
 * 
 * This utility helps analyze and understand time and space complexity
 * of algorithms and data structures.
 */

export enum TimeComplexity {
  CONSTANT = 'O(1)',
  LOGARITHMIC = 'O(log n)',
  LINEAR = 'O(n)',
  LINEARITHMIC = 'O(n log n)',
  QUADRATIC = 'O(n²)',
  CUBIC = 'O(n³)',
  EXPONENTIAL = 'O(2^n)',
  FACTORIAL = 'O(n!)'
}

export enum SpaceComplexity {
  CONSTANT = 'O(1)',
  LOGARITHMIC = 'O(log n)',
  LINEAR = 'O(n)',
  QUADRATIC = 'O(n²)'
}

export interface ComplexityInfo {
  timeComplexity: {
    best: TimeComplexity;
    average: TimeComplexity;
    worst: TimeComplexity;
  };
  spaceComplexity: SpaceComplexity;
  description: string;
  tradeoffs: string[];
  whenToUse: string[];
}

/**
 * Data Structure Complexities
 */
export const DATA_STRUCTURE_COMPLEXITIES: Record<string, ComplexityInfo> = {
  'Array': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,    // Access
      average: TimeComplexity.CONSTANT, // Access
      worst: TimeComplexity.LINEAR      // Search/Insert/Delete
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Contiguous memory allocation with constant-time access',
    tradeoffs: [
      'Fast access by index but slow insertion/deletion',
      'Fixed size in some implementations',
      'Cache-friendly due to memory locality'
    ],
    whenToUse: [
      'When you need fast random access',
      'When memory usage is critical',
      'When the size is relatively stable'
    ]
  },

  'Linked List': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,    // Insert at head
      average: TimeComplexity.LINEAR,   // Search
      worst: TimeComplexity.LINEAR      // Search/Insert/Delete
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Dynamic size with pointer-based structure',
    tradeoffs: [
      'Dynamic size but no random access',
      'Extra memory for pointers',
      'Poor cache performance'
    ],
    whenToUse: [
      'When size varies significantly',
      'When frequent insertion/deletion at head',
      'When you don\'t need random access'
    ]
  },

  'Stack': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,
      average: TimeComplexity.CONSTANT,
      worst: TimeComplexity.CONSTANT
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'LIFO (Last In, First Out) data structure',
    tradeoffs: [
      'Very fast for LIFO operations',
      'Limited access pattern',
      'Can cause stack overflow if too deep'
    ],
    whenToUse: [
      'Function call management',
      'Expression evaluation',
      'Undo operations',
      'Backtracking algorithms'
    ]
  },

  'Queue': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,
      average: TimeComplexity.CONSTANT,
      worst: TimeComplexity.CONSTANT
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'FIFO (First In, First Out) data structure',
    tradeoffs: [
      'Fast for FIFO operations',
      'Limited access pattern',
      'May waste space in circular implementations'
    ],
    whenToUse: [
      'BFS traversal',
      'Task scheduling',
      'Buffer for data streams',
      'Print job management'
    ]
  },

  'Hash Table': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,
      average: TimeComplexity.CONSTANT,
      worst: TimeComplexity.LINEAR
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Key-value pairs with hash-based access',
    tradeoffs: [
      'Very fast average case',
      'No ordering of elements',
      'Hash collisions can degrade performance',
      'Memory overhead for hash table'
    ],
    whenToUse: [
      'Fast key-value lookups',
      'Implementing caches',
      'Counting frequency',
      'Removing duplicates'
    ]
  },

  'Binary Search Tree': {
    timeComplexity: {
      best: TimeComplexity.LOGARITHMIC,
      average: TimeComplexity.LOGARITHMIC,
      worst: TimeComplexity.LINEAR
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Tree structure maintaining sorted order',
    tradeoffs: [
      'Ordered operations possible',
      'Can degenerate to linked list',
      'No guaranteed balance',
      'More complex than arrays/lists'
    ],
    whenToUse: [
      'Need both search and ordering',
      'Range queries',
      'Dynamic sorted data',
      'When balance can be maintained'
    ]
  },

  'Heap': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,     // Peek
      average: TimeComplexity.LOGARITHMIC, // Insert/Delete
      worst: TimeComplexity.LOGARITHMIC
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Complete binary tree with heap property',
    tradeoffs: [
      'Fast min/max access',
      'Efficient priority queue',
      'No arbitrary access',
      'Building heap is O(n)'
    ],
    whenToUse: [
      'Priority queues',
      'Heap sort',
      'Finding k largest/smallest',
      'Dijkstra\'s algorithm'
    ]
  },

  'Trie': {
    timeComplexity: {
      best: TimeComplexity.LINEAR,      // Length of key
      average: TimeComplexity.LINEAR,
      worst: TimeComplexity.LINEAR
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Tree for storing strings with common prefixes',
    tradeoffs: [
      'Excellent for prefix operations',
      'Memory intensive',
      'Fast string search',
      'Complex implementation'
    ],
    whenToUse: [
      'Autocomplete features',
      'Spell checkers',
      'IP routing tables',
      'String matching with prefixes'
    ]
  },

  'Graph (Adjacency List)': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,    // Add vertex
      average: TimeComplexity.LINEAR,   // Find edge
      worst: TimeComplexity.LINEAR
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Graph representation using lists',
    tradeoffs: [
      'Space efficient for sparse graphs',
      'Slow edge lookup',
      'Easy to iterate over neighbors',
      'Complex for dense graphs'
    ],
    whenToUse: [
      'Sparse graphs',
      'When you need to iterate neighbors',
      'Social networks',
      'Web crawling'
    ]
  },

  'Graph (Adjacency Matrix)': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,
      average: TimeComplexity.CONSTANT,
      worst: TimeComplexity.CONSTANT
    },
    spaceComplexity: SpaceComplexity.QUADRATIC,
    description: 'Graph representation using 2D matrix',
    tradeoffs: [
      'Fast edge lookup',
      'Space inefficient for sparse graphs',
      'Simple implementation',
      'Fixed size'
    ],
    whenToUse: [
      'Dense graphs',
      'Fast edge queries needed',
      'Graph algorithms requiring matrix operations',
      'Small graphs'
    ]
  }
};

/**
 * Algorithm Complexities
 */
export const ALGORITHM_COMPLEXITIES: Record<string, ComplexityInfo> = {
  'Linear Search': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,
      average: TimeComplexity.LINEAR,
      worst: TimeComplexity.LINEAR
    },
    spaceComplexity: SpaceComplexity.CONSTANT,
    description: 'Sequential search through elements',
    tradeoffs: [
      'Works on unsorted data',
      'Simple implementation',
      'Slow for large datasets',
      'No preprocessing required'
    ],
    whenToUse: [
      'Small datasets',
      'Unsorted data',
      'One-time searches',
      'When simplicity is preferred'
    ]
  },

  'Binary Search': {
    timeComplexity: {
      best: TimeComplexity.CONSTANT,
      average: TimeComplexity.LOGARITHMIC,
      worst: TimeComplexity.LOGARITHMIC
    },
    spaceComplexity: SpaceComplexity.CONSTANT,
    description: 'Search by dividing sorted array in half',
    tradeoffs: [
      'Very fast on sorted data',
      'Requires sorted input',
      'Logarithmic time complexity',
      'More complex than linear search'
    ],
    whenToUse: [
      'Large sorted datasets',
      'Multiple searches on same data',
      'When logarithmic time is needed',
      'Space is limited'
    ]
  },

  'Bubble Sort': {
    timeComplexity: {
      best: TimeComplexity.LINEAR,
      average: TimeComplexity.QUADRATIC,
      worst: TimeComplexity.QUADRATIC
    },
    spaceComplexity: SpaceComplexity.CONSTANT,
    description: 'Compare adjacent elements and swap',
    tradeoffs: [
      'Simple implementation',
      'Stable sorting',
      'Very slow for large data',
      'Early termination possible'
    ],
    whenToUse: [
      'Educational purposes',
      'Very small datasets',
      'When simplicity is crucial',
      'Nearly sorted data'
    ]
  },

  'Quick Sort': {
    timeComplexity: {
      best: TimeComplexity.LINEARITHMIC,
      average: TimeComplexity.LINEARITHMIC,
      worst: TimeComplexity.QUADRATIC
    },
    spaceComplexity: SpaceComplexity.LOGARITHMIC,
    description: 'Divide and conquer with pivot selection',
    tradeoffs: [
      'Fast average case',
      'In-place sorting',
      'Worst case is quadratic',
      'Not stable'
    ],
    whenToUse: [
      'General purpose sorting',
      'Large datasets',
      'When average case performance matters',
      'Memory is limited'
    ]
  },

  'Merge Sort': {
    timeComplexity: {
      best: TimeComplexity.LINEARITHMIC,
      average: TimeComplexity.LINEARITHMIC,
      worst: TimeComplexity.LINEARITHMIC
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Divide and conquer with merging',
    tradeoffs: [
      'Guaranteed O(n log n)',
      'Stable sorting',
      'Requires extra space',
      'Good for linked lists'
    ],
    whenToUse: [
      'When stability is required',
      'Worst-case performance is critical',
      'Sorting linked lists',
      'External sorting'
    ]
  },

  'Heap Sort': {
    timeComplexity: {
      best: TimeComplexity.LINEARITHMIC,
      average: TimeComplexity.LINEARITHMIC,
      worst: TimeComplexity.LINEARITHMIC
    },
    spaceComplexity: SpaceComplexity.CONSTANT,
    description: 'Build heap and extract elements',
    tradeoffs: [
      'Guaranteed O(n log n)',
      'In-place sorting',
      'Not stable',
      'Poor cache performance'
    ],
    whenToUse: [
      'Guaranteed time bounds needed',
      'Memory is limited',
      'When stability not required',
      'Priority queue available'
    ]
  },

  'BFS': {
    timeComplexity: {
      best: TimeComplexity.LINEAR,
      average: TimeComplexity.LINEAR,
      worst: TimeComplexity.LINEAR
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Level-by-level graph traversal',
    tradeoffs: [
      'Finds shortest path (unweighted)',
      'High space complexity',
      'Level-order traversal',
      'Good for wide graphs'
    ],
    whenToUse: [
      'Shortest path in unweighted graphs',
      'Level-order traversal',
      'Finding connected components',
      'Minimum spanning tree'
    ]
  },

  'DFS': {
    timeComplexity: {
      best: TimeComplexity.LINEAR,
      average: TimeComplexity.LINEAR,
      worst: TimeComplexity.LINEAR
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Deep exploration before backtracking',
    tradeoffs: [
      'Lower space complexity than BFS',
      'Doesn\'t find shortest path',
      'Good for deep graphs',
      'Can detect cycles'
    ],
    whenToUse: [
      'Topological sorting',
      'Detecting cycles',
      'Path finding (not shortest)',
      'Maze solving'
    ]
  },

  'Dijkstra': {
    timeComplexity: {
      best: TimeComplexity.LINEARITHMIC,
      average: TimeComplexity.LINEARITHMIC,
      worst: TimeComplexity.LINEARITHMIC
    },
    spaceComplexity: SpaceComplexity.LINEAR,
    description: 'Shortest path with non-negative weights',
    tradeoffs: [
      'Finds shortest paths',
      'Only works with non-negative weights',
      'More complex than BFS',
      'Requires priority queue'
    ],
    whenToUse: [
      'Weighted graph shortest paths',
      'GPS navigation',
      'Network routing',
      'Game AI pathfinding'
    ]
  }
};

/**
 * Growth Rate Functions
 */
export class GrowthRateAnalyzer {
  static calculateGrowthRate(complexity: TimeComplexity, n: number): number {
    switch (complexity) {
      case TimeComplexity.CONSTANT:
        return 1;
      case TimeComplexity.LOGARITHMIC:
        return Math.log2(n);
      case TimeComplexity.LINEAR:
        return n;
      case TimeComplexity.LINEARITHMIC:
        return n * Math.log2(n);
      case TimeComplexity.QUADRATIC:
        return n * n;
      case TimeComplexity.CUBIC:
        return n * n * n;
      case TimeComplexity.EXPONENTIAL:
        return Math.pow(2, n);
      case TimeComplexity.FACTORIAL:
        return this.factorial(n);
      default:
        return n;
    }
  }

  private static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }

  static compareComplexities(n: number): void {
    console.log(`Growth rates for n = ${n}:`);
    console.log('---');
    
    Object.values(TimeComplexity).forEach(complexity => {
      const operations = this.calculateGrowthRate(complexity, n);
      console.log(`${complexity}: ${operations.toLocaleString()}`);
    });
  }

  static generateComplexityChart(maxN: number = 100): void {
    console.log('n\tO(1)\tO(log n)\tO(n)\tO(n log n)\tO(n²)\tO(2^n)');
    console.log('---');
    
    for (let n = 1; n <= maxN; n *= 10) {
      const constant = this.calculateGrowthRate(TimeComplexity.CONSTANT, n);
      const logarithmic = this.calculateGrowthRate(TimeComplexity.LOGARITHMIC, n);
      const linear = this.calculateGrowthRate(TimeComplexity.LINEAR, n);
      const linearithmic = this.calculateGrowthRate(TimeComplexity.LINEARITHMIC, n);
      const quadratic = this.calculateGrowthRate(TimeComplexity.QUADRATIC, n);
      const exponential = Math.min(this.calculateGrowthRate(TimeComplexity.EXPONENTIAL, n), 1e10);
      
      console.log(
        `${n}\t${constant}\t${Math.round(logarithmic)}\t${linear}\t` +
        `${Math.round(linearithmic)}\t${quadratic}\t${exponential.toExponential(2)}`
      );
    }
  }
}

/**
 * Performance Analyzer
 */
export class PerformanceAnalyzer {
  static analyzeFunction<T, R>(
    func: (input: T) => R,
    input: T,
    expectedComplexity: TimeComplexity
  ): {
    result: R;
    executionTime: number;
    memoryUsage: number;
    expectedComplexity: TimeComplexity;
    analysis: string;
  } {
    const startMemory = this.getMemoryUsage();
    const startTime = performance.now();
    
    const result = func(input);
    
    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();
    
    const executionTime = endTime - startTime;
    const memoryUsage = endMemory - startMemory;
    
    const analysis = this.generateAnalysis(executionTime, expectedComplexity);
    
    return {
      result,
      executionTime,
      memoryUsage,
      expectedComplexity,
      analysis
    };
  }

  private static getMemoryUsage(): number {
    // In a real environment, you might use process.memoryUsage() in Node.js
    // or performance.memory in browsers (if available)
    return 0; // Placeholder
  }

  private static generateAnalysis(executionTime: number, expectedComplexity: TimeComplexity): string {
    return `Function executed in ${executionTime.toFixed(2)}ms with expected complexity ${expectedComplexity}`;
  }

  static benchmarkComplexities<T>(
    algorithms: Array<{ name: string; func: (input: T) => any; complexity: TimeComplexity }>,
    generateInput: (size: number) => T,
    sizes: number[] = [10, 100, 1000, 10000]
  ): void {
    console.log('Algorithm Benchmark Results:');
    console.log('Size\t' + algorithms.map(alg => alg.name).join('\t'));
    console.log('---');

    for (const size of sizes) {
      const input = generateInput(size);
      const times: number[] = [];

      for (const algorithm of algorithms) {
        const startTime = performance.now();
        algorithm.func(input);
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      console.log(`${size}\t${times.map(time => time.toFixed(2) + 'ms').join('\t')}`);
    }
  }
}

/**
 * Complexity Quiz Generator
 */
export class ComplexityQuiz {
  static generateQuestions(): Array<{
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }> {
    return [
      {
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 0,
        explanation: 'Array access by index is constant time because arrays use contiguous memory.'
      },
      {
        question: 'What is the worst-case time complexity of Quick Sort?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correct: 1,
        explanation: 'Quick Sort\'s worst case occurs when the pivot is always the smallest or largest element.'
      },
      {
        question: 'Which algorithm is best for finding the shortest path in a weighted graph?',
        options: ['BFS', 'DFS', 'Dijkstra', 'Linear Search'],
        correct: 2,
        explanation: 'Dijkstra\'s algorithm finds shortest paths in weighted graphs with non-negative edges.'
      },
      {
        question: 'What is the space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 2,
        explanation: 'Merge sort requires O(n) additional space for the temporary arrays during merging.'
      },
      {
        question: 'What is the average time complexity of hash table operations?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct: 0,
        explanation: 'Hash tables provide O(1) average case for insert, delete, and search operations.'
      }
    ];
  }

  static takeQuiz(): void {
    const questions = this.generateQuestions();
    let score = 0;

    console.log('Big-O Complexity Quiz');
    console.log('====================');

    questions.forEach((q, index) => {
      console.log(`\nQuestion ${index + 1}: ${q.question}`);
      q.options.forEach((option, i) => {
        console.log(`${i + 1}. ${option}`);
      });
      
      // In a real implementation, you would get user input here
      console.log(`\nCorrect answer: ${q.options[q.correct]}`);
      console.log(`Explanation: ${q.explanation}`);
    });

    console.log(`\nQuiz completed! Study the explanations to improve your understanding.`);
  }
}
