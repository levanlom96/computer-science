/**
 * Dynamic Programming Algorithms Implementation
 * 
 * This file contains implementations of common dynamic programming problems
 * with both recursive and iterative solutions, including memoization.
 */

/**
 * Fibonacci Sequence
 */

// Naive recursive approach - O(2^n) time, O(n) space
export function fibonacciRecursive(n: number): number {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Memoized approach - O(n) time, O(n) space
export function fibonacciMemoized(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  
  if (memo.has(n)) {
    return memo.get(n)!;
  }
  
  const result = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Bottom-up iterative approach - O(n) time, O(1) space
export function fibonacciIterative(n: number): number {
  if (n <= 1) return n;
  
  let prev = 0;
  let curr = 1;
  
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  
  return curr;
}

/**
 * Climbing Stairs Problem
 * You can climb 1 or 2 steps at a time. How many ways to reach step n?
 * Time Complexity: O(n), Space Complexity: O(1)
 */
export function climbingStairs(n: number): number {
  if (n <= 2) return n;
  
  let prev = 1;
  let curr = 2;
  
  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  
  return curr;
}

/**
 * 0/1 Knapsack Problem
 * Time Complexity: O(n * capacity), Space Complexity: O(n * capacity)
 */
export function knapsack01(
  weights: number[], 
  values: number[], 
  capacity: number
): { maxValue: number; selectedItems: number[] } {
  const n = weights.length;
  const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  // Fill the dp table
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]], // Include item
          dp[i - 1][w] // Exclude item
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  // Backtrack to find selected items
  const selectedItems: number[] = [];
  let w = capacity;
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(i - 1);
      w -= weights[i - 1];
    }
  }
  
  return {
    maxValue: dp[n][capacity],
    selectedItems: selectedItems.reverse()
  };
}

/**
 * Longest Common Subsequence (LCS)
 * Time Complexity: O(m * n), Space Complexity: O(m * n)
 */
export function longestCommonSubsequence(str1: string, str2: string): {
  length: number;
  sequence: string;
} {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Fill the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Reconstruct the LCS
  let lcs = '';
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return {
    length: dp[m][n],
    sequence: lcs
  };
}

/**
 * Longest Increasing Subsequence (LIS)
 * Time Complexity: O(n^2), Space Complexity: O(n)
 */
export function longestIncreasingSubsequence(arr: number[]): {
  length: number;
  sequence: number[];
} {
  const n = arr.length;
  if (n === 0) return { length: 0, sequence: [] };
  
  const dp: number[] = Array(n).fill(1);
  const parent: number[] = Array(n).fill(-1);
  
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        parent[i] = j;
      }
    }
  }
  
  // Find the maximum length and its index
  let maxLength = Math.max(...dp);
  let maxIndex = dp.indexOf(maxLength);
  
  // Reconstruct the sequence
  const sequence: number[] = [];
  let current = maxIndex;
  while (current !== -1) {
    sequence.unshift(arr[current]);
    current = parent[current];
  }
  
  return { length: maxLength, sequence };
}

/**
 * Edit Distance (Levenshtein Distance)
 * Time Complexity: O(m * n), Space Complexity: O(m * n)
 */
export function editDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  // Fill the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Replace
        );
      }
    }
  }
  
  return dp[m][n];
}

/**
 * Coin Change Problem
 * Time Complexity: O(amount * coins.length), Space Complexity: O(amount)
 */
export function coinChange(coins: number[], amount: number): number {
  const dp: number[] = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Coin Change - Count number of ways
 * Time Complexity: O(amount * coins.length), Space Complexity: O(amount)
 */
export function coinChangeWays(coins: number[], amount: number): number {
  const dp: number[] = Array(amount + 1).fill(0);
  dp[0] = 1;
  
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  
  return dp[amount];
}

/**
 * House Robber Problem
 * Time Complexity: O(n), Space Complexity: O(1)
 */
export function houseRobber(houses: number[]): number {
  if (houses.length === 0) return 0;
  if (houses.length === 1) return houses[0];
  
  let prev2 = houses[0];
  let prev1 = Math.max(houses[0], houses[1]);
  
  for (let i = 2; i < houses.length; i++) {
    const current = Math.max(prev1, prev2 + houses[i]);
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

/**
 * Maximum Subarray Sum (Kadane's Algorithm)
 * Time Complexity: O(n), Space Complexity: O(1)
 */
export function maxSubarraySum(arr: number[]): {
  maxSum: number;
  startIndex: number;
  endIndex: number;
} {
  if (arr.length === 0) return { maxSum: 0, startIndex: -1, endIndex: -1 };
  
  let maxSum = arr[0];
  let currentSum = arr[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;
  
  for (let i = 1; i < arr.length; i++) {
    if (currentSum < 0) {
      currentSum = arr[i];
      tempStart = i;
    } else {
      currentSum += arr[i];
    }
    
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }
  
  return { maxSum, startIndex: start, endIndex: end };
}

/**
 * Unique Paths in Grid
 * Time Complexity: O(m * n), Space Complexity: O(m * n)
 */
export function uniquePaths(m: number, n: number): number {
  const dp: number[][] = Array(m).fill(null).map(() => Array(n).fill(1));
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  
  return dp[m - 1][n - 1];
}

/**
 * Unique Paths with Obstacles
 * Time Complexity: O(m * n), Space Complexity: O(m * n)
 */
export function uniquePathsWithObstacles(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  
  if (grid[0][0] === 1) return 0;
  
  const dp: number[][] = Array(m).fill(null).map(() => Array(n).fill(0));
  dp[0][0] = 1;
  
  // Fill first row
  for (let j = 1; j < n; j++) {
    dp[0][j] = grid[0][j] === 1 ? 0 : dp[0][j - 1];
  }
  
  // Fill first column
  for (let i = 1; i < m; i++) {
    dp[i][0] = grid[i][0] === 1 ? 0 : dp[i - 1][0];
  }
  
  // Fill the rest
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (grid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  
  return dp[m - 1][n - 1];
}

/**
 * Palindromic Substrings Count
 * Time Complexity: O(n^2), Space Complexity: O(n^2)
 */
export function countPalindromicSubstrings(s: string): number {
  const n = s.length;
  const dp: boolean[][] = Array(n).fill(null).map(() => Array(n).fill(false));
  let count = 0;
  
  // Single characters are palindromes
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
    count++;
  }
  
  // Check for 2-character palindromes
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      count++;
    }
  }
  
  // Check for palindromes of length 3 and more
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        count++;
      }
    }
  }
  
  return count;
}

/**
 * Word Break Problem
 * Time Complexity: O(n^2), Space Complexity: O(n)
 */
export function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const dp: boolean[] = Array(s.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
}

/**
 * Subset Sum Problem
 * Time Complexity: O(n * sum), Space Complexity: O(n * sum)
 */
export function subsetSum(arr: number[], targetSum: number): boolean {
  const n = arr.length;
  const dp: boolean[][] = Array(n + 1).fill(null).map(() => Array(targetSum + 1).fill(false));
  
  // Base case: sum 0 is always possible (empty subset)
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  
  for (let i = 1; i <= n; i++) {
    for (let sum = 1; sum <= targetSum; sum++) {
      if (arr[i - 1] > sum) {
        dp[i][sum] = dp[i - 1][sum];
      } else {
        dp[i][sum] = dp[i - 1][sum] || dp[i - 1][sum - arr[i - 1]];
      }
    }
  }
  
  return dp[n][targetSum];
}

/**
 * Partition Equal Subset Sum
 * Time Complexity: O(n * sum), Space Complexity: O(sum)
 */
export function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  
  if (sum % 2 !== 0) return false;
  
  const target = sum / 2;
  const dp: boolean[] = Array(target + 1).fill(false);
  dp[0] = true;
  
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  
  return dp[target];
}

/**
 * DP Problem Analyzer
 */
export class DPAnalyzer {
  static analyzeOptimalSubstructure<T>(
    problem: string,
    input: T,
    solver: (input: T) => any
  ): {
    result: any;
    executionTime: number;
    hasOptimalSubstructure: boolean;
    hasOverlappingSubproblems: boolean;
  } {
    const start = performance.now();
    const result = solver(input);
    const end = performance.now();
    
    return {
      result,
      executionTime: end - start,
      hasOptimalSubstructure: true, // Assume true for DP problems
      hasOverlappingSubproblems: true // Assume true for DP problems
    };
  }
  
  static compareApproaches<T>(
    input: T,
    recursiveSolver: (input: T) => any,
    dpSolver: (input: T) => any
  ): void {
    console.log('DP Approach Comparison:');
    
    const recursiveResult = this.analyzeOptimalSubstructure('Recursive', input, recursiveSolver);
    console.log('Recursive approach:', recursiveResult);
    
    const dpResult = this.analyzeOptimalSubstructure('DP', input, dpSolver);
    console.log('DP approach:', dpResult);
    
    const speedup = recursiveResult.executionTime / dpResult.executionTime;
    console.log(`DP is ${speedup.toFixed(2)}x faster`);
  }
}
