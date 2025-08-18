/**
 * Binary Search Tree Implementation
 * 
 * Time Complexities (Average case - balanced tree):
 * - Search: O(log n)
 * - Insert: O(log n)
 * - Delete: O(log n)
 * 
 * Time Complexities (Worst case - unbalanced tree):
 * - Search: O(n)
 * - Insert: O(n)
 * - Delete: O(n)
 * 
 * Space Complexity: O(n)
 */

export class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null;
  private size: number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this.root = null;
    this.size = 0;
    // Default comparison function for numbers/strings
    this.compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  private compare: (a: T, b: T) => number;

  /**
   * Insert value into BST - O(log n) average, O(n) worst case
   */
  insert(data: T): void {
    this.root = this.insertNode(this.root, data);
    this.size++;
  }

  private insertNode(node: TreeNode<T> | null, data: T): TreeNode<T> {
    if (node === null) {
      return new TreeNode(data);
    }

    const comparison = this.compare(data, node.data);
    if (comparison < 0) {
      node.left = this.insertNode(node.left, data);
    } else if (comparison > 0) {
      node.right = this.insertNode(node.right, data);
    }
    // If equal, don't insert (no duplicates)

    return node;
  }

  /**
   * Search for value in BST - O(log n) average, O(n) worst case
   */
  search(data: T): boolean {
    return this.searchNode(this.root, data) !== null;
  }

  private searchNode(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    const comparison = this.compare(data, node.data);
    if (comparison === 0) {
      return node;
    } else if (comparison < 0) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }

  /**
   * Delete value from BST - O(log n) average, O(n) worst case
   */
  delete(data: T): boolean {
    const initialSize = this.size;
    this.root = this.deleteNode(this.root, data);
    return this.size < initialSize;
  }

  private deleteNode(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    const comparison = this.compare(data, node.data);
    
    if (comparison < 0) {
      node.left = this.deleteNode(node.left, data);
    } else if (comparison > 0) {
      node.right = this.deleteNode(node.right, data);
    } else {
      // Found the node to delete
      this.size--;
      
      // Case 1: Node has no children
      if (node.left === null && node.right === null) {
        return null;
      }
      
      // Case 2: Node has one child
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      
      // Case 3: Node has two children
      // Find inorder successor (smallest in right subtree)
      const successor = this.findMinNode(node.right);
      node.data = successor.data;
      node.right = this.deleteNode(node.right, successor.data);
      this.size++; // Compensate for the decrement above
    }

    return node;
  }

  /**
   * Find minimum value - O(log n) average, O(n) worst case
   */
  findMin(): T | null {
    if (this.root === null) return null;
    return this.findMinNode(this.root).data;
  }

  private findMinNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /**
   * Find maximum value - O(log n) average, O(n) worst case
   */
  findMax(): T | null {
    if (this.root === null) return null;
    return this.findMaxNode(this.root).data;
  }

  private findMaxNode(node: TreeNode<T>): TreeNode<T> {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }

  /**
   * Inorder traversal (sorted order) - O(n)
   */
  inorderTraversal(): T[] {
    const result: T[] = [];
    this.inorderHelper(this.root, result);
    return result;
  }

  private inorderHelper(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorderHelper(node.left, result);
      result.push(node.data);
      this.inorderHelper(node.right, result);
    }
  }

  /**
   * Preorder traversal - O(n)
   */
  preorderTraversal(): T[] {
    const result: T[] = [];
    this.preorderHelper(this.root, result);
    return result;
  }

  private preorderHelper(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.data);
      this.preorderHelper(node.left, result);
      this.preorderHelper(node.right, result);
    }
  }

  /**
   * Postorder traversal - O(n)
   */
  postorderTraversal(): T[] {
    const result: T[] = [];
    this.postorderHelper(this.root, result);
    return result;
  }

  private postorderHelper(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postorderHelper(node.left, result);
      this.postorderHelper(node.right, result);
      result.push(node.data);
    }
  }

  /**
   * Level order traversal (BFS) - O(n)
   */
  levelOrderTraversal(): T[] {
    if (this.root === null) return [];
    
    const result: T[] = [];
    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.data);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }

  /**
   * Get height of tree - O(n)
   */
  height(): number {
    return this.getHeight(this.root);
  }

  private getHeight(node: TreeNode<T> | null): number {
    if (node === null) return -1;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  /**
   * Check if tree is balanced - O(n)
   */
  isBalanced(): boolean {
    return this.checkBalance(this.root) !== -1;
  }

  private checkBalance(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    
    const leftHeight = this.checkBalance(node.left);
    if (leftHeight === -1) return -1;
    
    const rightHeight = this.checkBalance(node.right);
    if (rightHeight === -1) return -1;
    
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }
    
    return 1 + Math.max(leftHeight, rightHeight);
  }

  /**
   * Count total nodes - O(1)
   */
  count(): number {
    return this.size;
  }

  /**
   * Check if tree is empty - O(1)
   */
  isEmpty(): boolean {
    return this.root === null;
  }

  /**
   * Clear all nodes - O(1)
   */
  clear(): void {
    this.root = null;
    this.size = 0;
  }

  /**
   * Find kth smallest element - O(k) where k is the position
   */
  kthSmallest(k: number): T | null {
    if (k <= 0 || k > this.size) return null;
    
    const result = { count: 0, value: null as T | null };
    this.kthSmallestHelper(this.root, k, result);
    return result.value;
  }

  private kthSmallestHelper(node: TreeNode<T> | null, k: number, result: { count: number, value: T | null }): void {
    if (node === null || result.value !== null) return;
    
    this.kthSmallestHelper(node.left, k, result);
    
    result.count++;
    if (result.count === k) {
      result.value = node.data;
      return;
    }
    
    this.kthSmallestHelper(node.right, k, result);
  }

  /**
   * Find lowest common ancestor - O(log n) average, O(n) worst case
   */
  lowestCommonAncestor(val1: T, val2: T): T | null {
    const node = this.findLCA(this.root, val1, val2);
    return node ? node.data : null;
  }

  private findLCA(node: TreeNode<T> | null, val1: T, val2: T): TreeNode<T> | null {
    if (node === null) return null;
    
    const comp1 = this.compare(val1, node.data);
    const comp2 = this.compare(val2, node.data);
    
    if (comp1 < 0 && comp2 < 0) {
      return this.findLCA(node.left, val1, val2);
    }
    
    if (comp1 > 0 && comp2 > 0) {
      return this.findLCA(node.right, val1, val2);
    }
    
    return node;
  }

  /**
   * Validate if tree maintains BST property - O(n)
   */
  isValidBST(): boolean {
    return this.validateBST(this.root, null, null);
  }

  private validateBST(node: TreeNode<T> | null, min: T | null, max: T | null): boolean {
    if (node === null) return true;
    
    if ((min !== null && this.compare(node.data, min) <= 0) ||
        (max !== null && this.compare(node.data, max) >= 0)) {
      return false;
    }
    
    return this.validateBST(node.left, min, node.data) &&
           this.validateBST(node.right, node.data, max);
  }
}
