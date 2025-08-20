/**
 * AVL Binary Search Tree Implementation
 * 
 * AVL Tree is a self-balancing binary search tree where the height difference
 * between the left and right subtrees of any node is at most 1.
 * 
 * Time Complexities (guaranteed):
 * - Search: O(log n)
 * - Insert: O(log n)
 * - Delete: O(log n)
 * 
 * Space Complexity: O(n)
 */

export class AvlNode<T> {
  data: T;
  left: AvlNode<T> | null;
  right: AvlNode<T> | null;
  height: number;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
}

export class AvlBinarySearchTree<T> {
  private root: AvlNode<T> | null;
  private size: number;
  private compare: (a: T, b: T) => number;

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

  /**
   * Get height of a node - O(1)
   */
  private getHeight(node: AvlNode<T> | null): number {
    return node ? node.height : -1;
  }

  /**
   * Update height of a node - O(1)
   */
  private updateHeight(node: AvlNode<T>): void {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  /**
   * Get balance factor of a node - O(1)
   */
  private getBalanceFactor(node: AvlNode<T>): number {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  /**
   * Right rotation - O(1)
   *     y                x
   *    / \              / \
   *   x   C    -->     A   y
   *  / \                  / \
   * A   B                B   C
   */
  private rotateRight(y: AvlNode<T>): AvlNode<T> {
    const x = y.left!;
    const B = x.right;

    // Perform rotation
    x.right = y;
    y.left = B;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  /**
   * Left rotation - O(1)
   *   x                    y
   *  / \                  / \
   * A   y      -->       x   C
   *    / \              / \
   *   B   C            A   B
   */
  private rotateLeft(x: AvlNode<T>): AvlNode<T> {
    const y = x.right!;
    const B = y.left;

    // Perform rotation
    y.left = x;
    x.right = B;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  /**
   * Left-Right rotation - O(1)
   */
  private rotateLeftRight(node: AvlNode<T>): AvlNode<T> {
    node.left = this.rotateLeft(node.left!);
    return this.rotateRight(node);
  }

  /**
   * Right-Left rotation - O(1)
   */
  private rotateRightLeft(node: AvlNode<T>): AvlNode<T> {
    node.right = this.rotateRight(node.right!);
    return this.rotateLeft(node);
  }

  /**
   * Balance a node - O(1)
   */
  private balance(node: AvlNode<T>): AvlNode<T> {
    this.updateHeight(node);
    const balanceFactor = this.getBalanceFactor(node);

    // Left heavy
    if (balanceFactor > 1) {
      // Left-Right case
      if (this.getBalanceFactor(node.left!) < 0) {
        return this.rotateLeftRight(node);
      }
      // Left-Left case
      return this.rotateRight(node);
    }

    // Right heavy
    if (balanceFactor < -1) {
      // Right-Left case
      if (this.getBalanceFactor(node.right!) > 0) {
        return this.rotateRightLeft(node);
      }
      // Right-Right case
      return this.rotateLeft(node);
    }

    return node;
  }

  /**
   * Insert value into AVL tree - O(log n)
   */
  insert(data: T): void {
    this.root = this.insertNode(this.root, data);
    this.size++;
  }

  private insertNode(node: AvlNode<T> | null, data: T): AvlNode<T> {
    // Standard BST insertion
    if (node === null) {
      return new AvlNode(data);
    }

    const comparison = this.compare(data, node.data);
    if (comparison < 0) {
      node.left = this.insertNode(node.left, data);
    } else if (comparison > 0) {
      node.right = this.insertNode(node.right, data);
    } else {
      // Equal values not allowed
      this.size--; // Compensate for the increment in insert()
      return node;
    }

    // Balance the node
    return this.balance(node);
  }

  /**
   * Search for value in AVL tree - O(log n)
   */
  search(data: T): boolean {
    return this.searchNode(this.root, data) !== null;
  }

  private searchNode(node: AvlNode<T> | null, data: T): AvlNode<T> | null {
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
   * Delete value from AVL tree - O(log n)
   */
  delete(data: T): boolean {
    const initialSize = this.size;
    this.root = this.deleteNode(this.root, data);
    return this.size < initialSize;
  }

  private deleteNode(node: AvlNode<T> | null, data: T): AvlNode<T> | null {
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

    // Balance the node
    return this.balance(node);
  }

  /**
   * Find minimum value - O(log n)
   */
  findMin(): T | null {
    if (this.root === null) return null;
    return this.findMinNode(this.root).data;
  }

  private findMinNode(node: AvlNode<T>): AvlNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /**
   * Find maximum value - O(log n)
   */
  findMax(): T | null {
    if (this.root === null) return null;
    return this.findMaxNode(this.root).data;
  }

  private findMaxNode(node: AvlNode<T>): AvlNode<T> {
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

  private inorderHelper(node: AvlNode<T> | null, result: T[]): void {
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

  private preorderHelper(node: AvlNode<T> | null, result: T[]): void {
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

  private postorderHelper(node: AvlNode<T> | null, result: T[]): void {
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
    const queue: AvlNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.data);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }

  /**
   * Get height of tree - O(1)
   */
  height(): number {
    return this.getHeight(this.root);
  }

  /**
   * Check if tree is balanced (always true for AVL) - O(1)
   */
  isBalanced(): boolean {
    return true; // AVL trees are always balanced by definition
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

  private kthSmallestHelper(node: AvlNode<T> | null, k: number, result: { count: number, value: T | null }): void {
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
   * Find lowest common ancestor - O(log n)
   */
  lowestCommonAncestor(val1: T, val2: T): T | null {
    const node = this.findLCA(this.root, val1, val2);
    return node ? node.data : null;
  }

  private findLCA(node: AvlNode<T> | null, val1: T, val2: T): AvlNode<T> | null {
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

  private validateBST(node: AvlNode<T> | null, min: T | null, max: T | null): boolean {
    if (node === null) return true;
    
    if ((min !== null && this.compare(node.data, min) <= 0) ||
        (max !== null && this.compare(node.data, max) >= 0)) {
      return false;
    }
    
    return this.validateBST(node.left, min, node.data) &&
           this.validateBST(node.right, node.data, max);
  }

  /**
   * Validate if tree maintains AVL property - O(n)
   */
  isValidAVL(): boolean {
    return this.validateAVL(this.root);
  }

  private validateAVL(node: AvlNode<T> | null): boolean {
    if (node === null) return true;
    
    // Check if balance factor is valid (-1, 0, or 1)
    const balanceFactor = this.getBalanceFactor(node);
    if (Math.abs(balanceFactor) > 1) {
      return false;
    }
    
    // Check if height is correctly calculated
    const expectedHeight = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    if (node.height !== expectedHeight) {
      return false;
    }
    
    return this.validateAVL(node.left) && this.validateAVL(node.right);
  }

  /**
   * Get balance factors for all nodes (for debugging) - O(n)
   */
  getBalanceFactors(): { data: T, balance: number }[] {
    const result: { data: T, balance: number }[] = [];
    this.collectBalanceFactors(this.root, result);
    return result;
  }

  private collectBalanceFactors(node: AvlNode<T> | null, result: { data: T, balance: number }[]): void {
    if (node !== null) {
      result.push({ data: node.data, balance: this.getBalanceFactor(node) });
      this.collectBalanceFactors(node.left, result);
      this.collectBalanceFactors(node.right, result);
    }
  }
}