/**
 * Practice Problems for Data Structures and Algorithms
 * 
 * This file contains common coding interview problems organized by topic
 * with templates and hints for practice.
 */

/**
 * Array Problems
 */

export namespace ArrayProblems {
  /**
   * Two Sum Problem
   * Given an array of integers and a target, return indices of two numbers that add up to target.
   * Time: O(n), Space: O(n)
   */
  export function twoSum(nums: number[], target: number): number[] {
    // TODO: Implement using hash map
    // Hint: Store complement and index in map
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement)) {
        return [map.get(complement)!, i];
      }
      map.set(nums[i], i);
    }
    
    return [];
  }

  /**
   * Best Time to Buy and Sell Stock
   * Find maximum profit from buying and selling stock once.
   * Time: O(n), Space: O(1)
   */
  export function maxProfit(prices: number[]): number {
    // TODO: Track minimum price and maximum profit
    if (prices.length === 0) return 0;
    
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < minPrice) {
        minPrice = prices[i];
      } else if (prices[i] - minPrice > maxProfit) {
        maxProfit = prices[i] - minPrice;
      }
    }
    
    return maxProfit;
  }

  /**
   * Contains Duplicate
   * Return true if array contains duplicates.
   * Time: O(n), Space: O(n)
   */
  export function containsDuplicate(nums: number[]): boolean {
    // TODO: Use Set to track seen numbers
    const seen = new Set<number>();
    
    for (const num of nums) {
      if (seen.has(num)) {
        return true;
      }
      seen.add(num);
    }
    
    return false;
  }

  /**
   * Product of Array Except Self
   * Return array where each element is product of all others.
   * Time: O(n), Space: O(1) excluding output array
   */
  export function productExceptSelf(nums: number[]): number[] {
    // TODO: Use left and right pass approach
    const result = new Array(nums.length);
    
    // Left pass
    result[0] = 1;
    for (let i = 1; i < nums.length; i++) {
      result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right pass
    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
      result[i] *= right;
      right *= nums[i];
    }
    
    return result;
  }

  /**
   * Maximum Subarray (Kadane's Algorithm)
   * Find contiguous subarray with largest sum.
   * Time: O(n), Space: O(1)
   */
  export function maxSubArray(nums: number[]): number {
    // TODO: Implement Kadane's algorithm
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
      maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
      maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
  }
}

/**
 * String Problems
 */

export namespace StringProblems {
  /**
   * Valid Anagram
   * Check if two strings are anagrams.
   * Time: O(n), Space: O(1) - fixed alphabet size
   */
  export function isAnagram(s: string, t: string): boolean {
    // TODO: Count character frequencies
    if (s.length !== t.length) return false;
    
    const charCount = new Map<string, number>();
    
    for (const char of s) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    for (const char of t) {
      if (!charCount.has(char)) return false;
      charCount.set(char, charCount.get(char)! - 1);
      if (charCount.get(char) === 0) {
        charCount.delete(char);
      }
    }
    
    return charCount.size === 0;
  }

  /**
   * Valid Palindrome
   * Check if string is palindrome (ignoring non-alphanumeric).
   * Time: O(n), Space: O(1)
   */
  export function isPalindrome(s: string): boolean {
    // TODO: Use two pointers from both ends
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      while (left < right && !isAlphanumeric(s[left])) {
        left++;
      }
      while (left < right && !isAlphanumeric(s[right])) {
        right--;
      }
      
      if (s[left].toLowerCase() !== s[right].toLowerCase()) {
        return false;
      }
      
      left++;
      right--;
    }
    
    return true;
  }

  function isAlphanumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
  }

  /**
   * Longest Substring Without Repeating Characters
   * Find length of longest substring without repeating characters.
   * Time: O(n), Space: O(min(m,n)) where m is charset size
   */
  export function lengthOfLongestSubstring(s: string): number {
    // TODO: Use sliding window with hash set
    const charSet = new Set<string>();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
      while (charSet.has(s[right])) {
        charSet.delete(s[left]);
        left++;
      }
      charSet.add(s[right]);
      maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
  }

  /**
   * Group Anagrams
   * Group strings that are anagrams of each other.
   * Time: O(n * k log k) where k is max string length
   * Space: O(n * k)
   */
  export function groupAnagrams(strs: string[]): string[][] {
    // TODO: Use sorted string as key
    const groups = new Map<string, string[]>();
    
    for (const str of strs) {
      const key = str.split('').sort().join('');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(str);
    }
    
    return Array.from(groups.values());
  }
}

/**
 * Linked List Problems
 */

export namespace LinkedListProblems {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  /**
   * Reverse Linked List
   * Reverse a singly linked list.
   * Time: O(n), Space: O(1)
   */
  export function reverseList(head: ListNode | null): ListNode | null {
    // TODO: Use three pointers: prev, curr, next
    let prev: ListNode | null = null;
    let curr = head;
    
    while (curr !== null) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    
    return prev;
  }

  /**
   * Merge Two Sorted Lists
   * Merge two sorted linked lists.
   * Time: O(n + m), Space: O(1)
   */
  export function mergeTwoLists(
    list1: ListNode | null, 
    list2: ListNode | null
  ): ListNode | null {
    // TODO: Use dummy node for easier implementation
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 !== null && list2 !== null) {
      if (list1.val <= list2.val) {
        current.next = list1;
        list1 = list1.next;
      } else {
        current.next = list2;
        list2 = list2.next;
      }
      current = current.next;
    }
    
    current.next = list1 || list2;
    
    return dummy.next;
  }

  /**
   * Linked List Cycle
   * Detect if linked list has a cycle.
   * Time: O(n), Space: O(1)
   */
  export function hasCycle(head: ListNode | null): boolean {
    // TODO: Use Floyd's cycle detection (tortoise and hare)
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head.next;
    
    while (slow !== fast) {
      if (!fast || !fast.next) return false;
      slow = slow.next!;
      fast = fast.next.next!;
    }
    
    return true;
  }

  /**
   * Remove Nth Node From End
   * Remove nth node from end of list.
   * Time: O(n), Space: O(1)
   */
  export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // TODO: Use two pointers with n gap
    const dummy = new ListNode(0);
    dummy.next = head;
    let first = dummy;
    let second = dummy;
    
    // Move first pointer n+1 steps
    for (let i = 0; i <= n; i++) {
      first = first.next!;
    }
    
    // Move both pointers until first reaches end
    while (first !== null) {
      first = first.next!;
      second = second.next!;
    }
    
    // Remove nth node
    second.next = second.next!.next;
    
    return dummy.next;
  }
}

/**
 * Tree Problems
 */

export namespace TreeProblems {
  class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
    }
  }

  /**
   * Maximum Depth of Binary Tree
   * Find maximum depth of binary tree.
   * Time: O(n), Space: O(h) where h is height
   */
  export function maxDepth(root: TreeNode | null): number {
    // TODO: Use recursion or BFS
    if (root === null) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
  }

  /**
   * Same Tree
   * Check if two trees are identical.
   * Time: O(n), Space: O(h)
   */
  export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    // TODO: Compare nodes recursively
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

  /**
   * Invert Binary Tree
   * Invert/mirror a binary tree.
   * Time: O(n), Space: O(h)
   */
  export function invertTree(root: TreeNode | null): TreeNode | null {
    // TODO: Swap left and right children recursively
    if (root === null) return null;
    
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    
    return root;
  }

  /**
   * Lowest Common Ancestor in BST
   * Find LCA of two nodes in BST.
   * Time: O(h), Space: O(1)
   */
  export function lowestCommonAncestor(
    root: TreeNode | null, 
    p: TreeNode, 
    q: TreeNode
  ): TreeNode | null {
    // TODO: Use BST property for efficient search
    if (root === null) return null;
    
    if (p.val < root.val && q.val < root.val) {
      return lowestCommonAncestor(root.left, p, q);
    }
    
    if (p.val > root.val && q.val > root.val) {
      return lowestCommonAncestor(root.right, p, q);
    }
    
    return root;
  }

  /**
   * Binary Tree Level Order Traversal
   * Return level order traversal.
   * Time: O(n), Space: O(n)
   */
  export function levelOrder(root: TreeNode | null): number[][] {
    // TODO: Use BFS with queue
    if (root === null) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel: number[] = [];
      
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()!;
        currentLevel.push(node.val);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      
      result.push(currentLevel);
    }
    
    return result;
  }
}

/**
 * Dynamic Programming Problems
 */

export namespace DynamicProgrammingProblems {
  /**
   * House Robber
   * Rob houses without robbing adjacent ones.
   * Time: O(n), Space: O(1)
   */
  export function rob(nums: number[]): number {
    // TODO: Use DP with space optimization
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
      const current = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = current;
    }
    
    return prev1;
  }

  /**
   * Coin Change
   * Find minimum coins to make amount.
   * Time: O(amount * coins), Space: O(amount)
   */
  export function coinChange(coins: number[], amount: number): number {
    // TODO: Use bottom-up DP
    const dp = new Array(amount + 1).fill(Infinity);
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
   * Unique Paths
   * Count unique paths in grid.
   * Time: O(m * n), Space: O(n)
   */
  export function uniquePaths(m: number, n: number): number {
    // TODO: Use space-optimized DP
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[j] += dp[j - 1];
      }
    }
    
    return dp[n - 1];
  }

  /**
   * Longest Increasing Subsequence
   * Find length of LIS.
   * Time: O(n log n), Space: O(n)
   */
  export function lengthOfLIS(nums: number[]): number {
    // TODO: Use binary search optimization
    const tails: number[] = [];
    
    for (const num of nums) {
      let left = 0;
      let right = tails.length;
      
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (tails[mid] < num) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      
      if (left === tails.length) {
        tails.push(num);
      } else {
        tails[left] = num;
      }
    }
    
    return tails.length;
  }
}

/**
 * Graph Problems
 */

export namespace GraphProblems {
  /**
   * Number of Islands
   * Count islands in 2D grid.
   * Time: O(m * n), Space: O(m * n) worst case
   */
  export function numIslands(grid: string[][]): number {
    // TODO: Use DFS or BFS to mark visited land
    if (grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(row: number, col: number): void {
      if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
        return;
      }
      
      grid[row][col] = '0'; // Mark as visited
      
      // Visit all 4 directions
      dfs(row - 1, col);
      dfs(row + 1, col);
      dfs(row, col - 1);
      dfs(row, col + 1);
    }
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] === '1') {
          islands++;
          dfs(row, col);
        }
      }
    }
    
    return islands;
  }

  /**
   * Course Schedule
   * Check if all courses can be taken (detect cycle).
   * Time: O(V + E), Space: O(V + E)
   */
  export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // TODO: Use topological sort or DFS cycle detection
    const graph = new Map<number, number[]>();
    const inDegree = new Array(numCourses).fill(0);
    
    // Build graph and calculate in-degrees
    for (const [course, prereq] of prerequisites) {
      if (!graph.has(prereq)) {
        graph.set(prereq, []);
      }
      graph.get(prereq)!.push(course);
      inDegree[course]++;
    }
    
    // Find courses with no prerequisites
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
      if (inDegree[i] === 0) {
        queue.push(i);
      }
    }
    
    let completed = 0;
    
    while (queue.length > 0) {
      const course = queue.shift()!;
      completed++;
      
      if (graph.has(course)) {
        for (const nextCourse of graph.get(course)!) {
          inDegree[nextCourse]--;
          if (inDegree[nextCourse] === 0) {
            queue.push(nextCourse);
          }
        }
      }
    }
    
    return completed === numCourses;
  }

  /**
   * Clone Graph
   * Deep clone an undirected graph.
   * Time: O(V + E), Space: O(V)
   */
  class GraphNode {
    val: number;
    neighbors: GraphNode[];
    constructor(val?: number, neighbors?: GraphNode[]) {
      this.val = val === undefined ? 0 : val;
      this.neighbors = neighbors === undefined ? [] : neighbors;
    }
  }

  export function cloneGraph(node: GraphNode | null): GraphNode | null {
    // TODO: Use DFS with hash map to track cloned nodes
    if (!node) return null;
    
    const cloneMap = new Map<GraphNode, GraphNode>();
    
    function dfs(original: GraphNode): GraphNode {
      if (cloneMap.has(original)) {
        return cloneMap.get(original)!;
      }
      
      const clone = new GraphNode(original.val);
      cloneMap.set(original, clone);
      
      for (const neighbor of original.neighbors) {
        clone.neighbors.push(dfs(neighbor));
      }
      
      return clone;
    }
    
    return dfs(node);
  }
}

/**
 * Practice Problem Generator
 */
export class PracticeGenerator {
  static generateArrayProblem(): {
    problem: string;
    input: any;
    expectedOutput: any;
    hints: string[];
  } {
    const problems = [
      {
        problem: "Find two numbers that add up to target",
        input: { nums: [2, 7, 11, 15], target: 9 },
        expectedOutput: [0, 1],
        hints: ["Use a hash map", "Store complement of each number", "Check if complement exists"]
      },
      {
        problem: "Find maximum profit from stock prices",
        input: { prices: [7, 1, 5, 3, 6, 4] },
        expectedOutput: 5,
        hints: ["Track minimum price so far", "Calculate profit at each step", "Keep track of maximum profit"]
      }
    ];
    
    return problems[Math.floor(Math.random() * problems.length)];
  }

  static generateComplexityQuestion(): {
    question: string;
    code: string;
    options: string[];
    correct: number;
  } {
    const questions = [
      {
        question: "What is the time complexity of this code?",
        code: `
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}`,
        options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
        correct: 1
      },
      {
        question: "What is the time complexity of binary search?",
        code: `
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1
      }
    ];
    
    return questions[Math.floor(Math.random() * questions.length)];
  }
}
