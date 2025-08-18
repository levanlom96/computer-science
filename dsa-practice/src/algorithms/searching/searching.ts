/**
 * Searching Algorithms Implementation
 * 
 * This file contains implementations of major searching algorithms with their
 * time and space complexity analysis.
 */

/**
 * Linear Search
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Works on: Unsorted and sorted arrays
 */
export function linearSearch<T>(arr: T[], target: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

/**
 * Binary Search (iterative)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Works on: Sorted arrays only
 */
export function binarySearch<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

/**
 * Binary Search (recursive)
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to recursion stack
 */
export function binarySearchRecursive<T>(
  arr: T[], 
  target: T, 
  left: number = 0, 
  right: number = arr.length - 1
): number {
  if (left > right) {
    return -1;
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

/**
 * Binary Search with custom comparator
 */
export function binarySearchWithComparator<T>(
  arr: T[], 
  target: T, 
  compareFn: (a: T, b: T) => number
): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = compareFn(arr[mid], target);
    
    if (comparison === 0) {
      return mid;
    } else if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

/**
 * Find first occurrence of target in sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findFirst<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // Continue searching in left half
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

/**
 * Find last occurrence of target in sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findLast<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      left = mid + 1; // Continue searching in right half
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

/**
 * Count occurrences of target in sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function countOccurrences<T>(arr: T[], target: T): number {
  const first = findFirst(arr, target);
  if (first === -1) return 0;
  
  const last = findLast(arr, target);
  return last - first + 1;
}

/**
 * Find insertion point for target in sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findInsertionPoint<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}

/**
 * Search in rotated sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function searchRotatedArray<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    // Check if left half is sorted
    if (arr[left] <= arr[mid]) {
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}

/**
 * Find minimum in rotated sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findMinInRotatedArray<T>(arr: T[]): T | null {
  if (arr.length === 0) return null;
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return arr[left];
}

/**
 * Jump Search
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 * Works on: Sorted arrays
 */
export function jumpSearch<T>(arr: T[], target: T): number {
  const n = arr.length;
  let jump = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  // Find the block where element is present
  let jumpSize = Math.floor(Math.sqrt(n));
  while (arr[Math.min(jump, n) - 1] < target) {
    prev = jump;
    jump += jumpSize;
    
    if (prev >= n) {
      return -1;
    }
  }
  
  // Linear search in the identified block
  while (arr[prev] < target) {
    prev++;
    
    if (prev === Math.min(jump, n)) {
      return -1;
    }
  }
  
  if (arr[prev] === target) {
    return prev;
  }
  
  return -1;
}

/**
 * Interpolation Search
 * Time Complexity: O(log log n) for uniformly distributed data, O(n) worst case
 * Space Complexity: O(1)
 * Works on: Sorted arrays with uniformly distributed values
 */
export function interpolationSearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    if (left === right) {
      return arr[left] === target ? left : -1;
    }
    
    // Calculate position using interpolation formula
    const pos = left + Math.floor(
      ((target - arr[left]) / (arr[right] - arr[left])) * (right - left)
    );
    
    if (arr[pos] === target) {
      return pos;
    } else if (arr[pos] < target) {
      left = pos + 1;
    } else {
      right = pos - 1;
    }
  }
  
  return -1;
}

/**
 * Exponential Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Works on: Sorted arrays, especially when target is close to beginning
 */
export function exponentialSearch<T>(arr: T[], target: T): number {
  if (arr.length === 0) return -1;
  if (arr[0] === target) return 0;
  
  // Find range for binary search
  let bound = 1;
  while (bound < arr.length && arr[bound] < target) {
    bound *= 2;
  }
  
  // Perform binary search in the found range
  return binarySearchRange(arr, target, bound / 2, Math.min(bound, arr.length - 1));
}

function binarySearchRange<T>(arr: T[], target: T, left: number, right: number): number {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

/**
 * Ternary Search
 * Time Complexity: O(log₃ n)
 * Space Complexity: O(1)
 * Works on: Sorted arrays
 */
export function ternarySearch<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    if (arr[mid1] === target) {
      return mid1;
    }
    if (arr[mid2] === target) {
      return mid2;
    }
    
    if (target < arr[mid1]) {
      right = mid1 - 1;
    } else if (target > arr[mid2]) {
      left = mid2 + 1;
    } else {
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }
  
  return -1;
}

/**
 * Search in 2D Matrix (sorted row-wise and column-wise)
 * Time Complexity: O(m + n) where m is rows, n is columns
 * Space Complexity: O(1)
 */
export function searchMatrix<T>(matrix: T[][], target: T): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  
  let row = 0;
  let col = matrix[0].length - 1;
  
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }
  
  return false;
}

/**
 * Search in sorted 2D Matrix (each row sorted, first element of each row > last element of previous row)
 * Time Complexity: O(log(m*n))
 * Space Complexity: O(1)
 */
export function searchSortedMatrix<T>(matrix: T[][], target: T): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = matrix[Math.floor(mid / n)][mid % n];
    
    if (midValue === target) {
      return true;
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return false;
}

/**
 * Peak Finding in 1D Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findPeak(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] < arr[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  
  return left;
}

/**
 * Square Root using Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function sqrt(x: number): number {
  if (x < 2) return x;
  
  let left = 2;
  let right = Math.floor(x / 2);
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;
    
    if (square === x) {
      return mid;
    } else if (square < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return right;
}

/**
 * Search Algorithm Analyzer
 */
export class SearchAnalyzer {
  static analyzePerformance<T>(
    arr: T[], 
    target: T, 
    searchFunction: (arr: T[], target: T) => number
  ): {
    result: number;
    executionTime: number;
    comparisons: number;
  } {
    let comparisons = 0;
    
    const start = performance.now();
    const result = searchFunction(arr, target);
    const end = performance.now();
    
    return {
      result,
      executionTime: end - start,
      comparisons
    };
  }
  
  static compareSearchAlgorithms<T>(arr: T[], target: T): void {
    console.log('Search Algorithm Comparison:');
    console.log('Array length:', arr.length);
    console.log('Target:', target);
    console.log('---');
    
    // Linear Search
    const linearResult = this.analyzePerformance(arr, target, linearSearch);
    console.log('Linear Search:', linearResult);
    
    // Binary Search (assuming array is sorted)
    const sortedArr = [...arr].sort();
    const binaryResult = this.analyzePerformance(sortedArr, target, binarySearch);
    console.log('Binary Search:', binaryResult);
    
    // Jump Search
    const jumpResult = this.analyzePerformance(sortedArr, target, jumpSearch);
    console.log('Jump Search:', jumpResult);
  }
}
