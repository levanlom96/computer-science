/**
 * Sorting Algorithms Implementation
 * 
 * This file contains implementations of major sorting algorithms with their
 * time and space complexity analysis.
 */

/**
 * Bubble Sort
 * Time Complexity: O(n²) average and worst case, O(n) best case (optimized version)
 * Space Complexity: O(1)
 * Stable: Yes
 * In-place: Yes
 */
export function bubbleSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  const result = [...arr];
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (compare(result[j], result[j + 1]) > 0) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // Optimization: if no swaps occurred, array is sorted
    if (!swapped) break;
  }
  
  return result;
}

/**
 * Selection Sort
 * Time Complexity: O(n²) all cases
 * Space Complexity: O(1)
 * Stable: No (can be made stable)
 * In-place: Yes
 */
export function selectionSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  const result = [...arr];
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (compare(result[j], result[minIndex]) < 0) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  
  return result;
}

/**
 * Insertion Sort
 * Time Complexity: O(n²) average and worst case, O(n) best case
 * Space Complexity: O(1)
 * Stable: Yes
 * In-place: Yes
 */
export function insertionSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  const result = [...arr];
  
  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;
    
    while (j >= 0 && compare(result[j], key) > 0) {
      result[j + 1] = result[j];
      j--;
    }
    
    result[j + 1] = key;
  }
  
  return result;
}

/**
 * Merge Sort
 * Time Complexity: O(n log n) all cases
 * Space Complexity: O(n)
 * Stable: Yes
 * In-place: No
 */
export function mergeSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  
  if (arr.length <= 1) return [...arr];
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);
  
  return merge(left, right, compare);
}

function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (compare(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

/**
 * Quick Sort
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n) average case (recursion stack)
 * Stable: No (can be made stable with modifications)
 * In-place: Yes
 */
export function quickSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  const result = [...arr];
  quickSortHelper(result, 0, result.length - 1, compare);
  return result;
}

function quickSortHelper<T>(
  arr: T[], 
  low: number, 
  high: number, 
  compare: (a: T, b: T) => number
): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, compare);
    quickSortHelper(arr, low, pivotIndex - 1, compare);
    quickSortHelper(arr, pivotIndex + 1, high, compare);
  }
}

function partition<T>(
  arr: T[], 
  low: number, 
  high: number, 
  compare: (a: T, b: T) => number
): number {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (compare(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

/**
 * Quick Sort with Random Pivot (to avoid worst case on sorted arrays)
 */
export function quickSortRandomized<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  const result = [...arr];
  quickSortRandomizedHelper(result, 0, result.length - 1, compare);
  return result;
}

function quickSortRandomizedHelper<T>(
  arr: T[], 
  low: number, 
  high: number, 
  compare: (a: T, b: T) => number
): void {
  if (low < high) {
    // Randomize pivot
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
    
    const pivotIndex = partition(arr, low, high, compare);
    quickSortRandomizedHelper(arr, low, pivotIndex - 1, compare);
    quickSortRandomizedHelper(arr, pivotIndex + 1, high, compare);
  }
}

/**
 * Heap Sort
 * Time Complexity: O(n log n) all cases
 * Space Complexity: O(1)
 * Stable: No
 * In-place: Yes
 */
export function heapSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  const result = [...arr];
  const n = result.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i, compare);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [result[0], result[i]] = [result[i], result[0]];
    heapify(result, i, 0, compare);
  }
  
  return result;
}

function heapify<T>(
  arr: T[], 
  heapSize: number, 
  rootIndex: number, 
  compare: (a: T, b: T) => number
): void {
  let largest = rootIndex;
  const leftChild = 2 * rootIndex + 1;
  const rightChild = 2 * rootIndex + 2;
  
  if (leftChild < heapSize && compare(arr[leftChild], arr[largest]) > 0) {
    largest = leftChild;
  }
  
  if (rightChild < heapSize && compare(arr[rightChild], arr[largest]) > 0) {
    largest = rightChild;
  }
  
  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    heapify(arr, heapSize, largest, compare);
  }
}

/**
 * Counting Sort (for integers only)
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 * Stable: Yes
 * In-place: No
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  
  const count = new Array(range).fill(0);
  const result = new Array(arr.length);
  
  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }
  
  // Calculate cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  
  // Build result array
  for (let i = arr.length - 1; i >= 0; i--) {
    result[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  return result;
}

/**
 * Radix Sort (for non-negative integers)
 * Time Complexity: O(d * (n + k)) where d is number of digits, k is radix
 * Space Complexity: O(n + k)
 * Stable: Yes
 * In-place: No
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  
  const max = Math.max(...arr);
  const result = [...arr];
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(result, exp);
  }
  
  return result;
}

function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Count occurrences of each digit
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }
  
  // Change count[i] to actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }
  
  // Copy output array to arr[]
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

/**
 * Bucket Sort
 * Time Complexity: O(n + k) average case, O(n²) worst case
 * Space Complexity: O(n)
 * Stable: Yes (if underlying sort is stable)
 * In-place: No
 */
export function bucketSort(arr: number[], bucketCount: number = 10): number[] {
  if (arr.length === 0) return [];
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketSize = (max - min) / bucketCount;
  
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
  
  // Distribute elements into buckets
  for (const num of arr) {
    const bucketIndex = Math.floor((num - min) / bucketSize);
    const index = Math.min(bucketIndex, bucketCount - 1);
    buckets[index].push(num);
  }
  
  // Sort individual buckets and concatenate
  const result: number[] = [];
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    result.push(...bucket);
  }
  
  return result;
}

/**
 * Tim Sort (JavaScript's native sort algorithm inspiration)
 * Hybrid stable sorting algorithm, derived from merge sort and insertion sort
 * Time Complexity: O(n log n) worst case, O(n) best case
 * Space Complexity: O(n)
 * Stable: Yes
 * In-place: No
 */
export function timSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
  const MIN_MERGE = 32;
  
  if (arr.length < 2) return [...arr];
  
  const result = [...arr];
  const n = result.length;
  
  // Sort individual subarrays of size MIN_MERGE using insertion sort
  for (let i = 0; i < n; i += MIN_MERGE) {
    const end = Math.min(i + MIN_MERGE - 1, n - 1);
    insertionSortRange(result, i, end, compare);
  }
  
  // Start merging from size MIN_MERGE
  for (let size = MIN_MERGE; size < n; size *= 2) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size - 1;
      const end = Math.min(start + size * 2 - 1, n - 1);
      
      if (mid < end) {
        mergeRange(result, start, mid, end, compare);
      }
    }
  }
  
  return result;
}

function insertionSortRange<T>(
  arr: T[], 
  left: number, 
  right: number, 
  compare: (a: T, b: T) => number
): void {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= left && compare(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
}

function mergeRange<T>(
  arr: T[], 
  left: number, 
  mid: number, 
  right: number, 
  compare: (a: T, b: T) => number
): void {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    if (compare(leftArr[i], rightArr[j]) <= 0) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }
  
  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }
  
  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

/**
 * Sorting Algorithm Analyzer
 */
export class SortingAnalyzer {
  static analyzePerformance<T>(
    arr: T[], 
    sortingFunction: (arr: T[]) => T[]
  ): {
    sortedArray: T[];
    executionTime: number;
    comparisons: number;
    swaps: number;
  } {
    let comparisons = 0;
    let swaps = 0;
    
    const instrumentedCompare = (a: T, b: T): number => {
      comparisons++;
      return a > b ? 1 : a < b ? -1 : 0;
    };
    
    const start = performance.now();
    const sortedArray = sortingFunction([...arr]);
    const end = performance.now();
    
    return {
      sortedArray,
      executionTime: end - start,
      comparisons,
      swaps
    };
  }
  
  static isSorted<T>(arr: T[], compareFn?: (a: T, b: T) => number): boolean {
    const compare = compareFn || ((a: T, b: T) => a > b ? 1 : a < b ? -1 : 0);
    
    for (let i = 1; i < arr.length; i++) {
      if (compare(arr[i - 1], arr[i]) > 0) {
        return false;
      }
    }
    
    return true;
  }
}
