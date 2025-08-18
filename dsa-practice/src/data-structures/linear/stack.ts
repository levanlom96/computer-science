/**
 * Stack Implementation (LIFO - Last In, First Out)
 * 
 * Time Complexities:
 * - Push: O(1)
 * - Pop: O(1)
 * - Peek/Top: O(1)
 * - Search: O(n)
 * 
 * Space Complexity: O(n)
 */

export class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Add element to top of stack - O(1)
   */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * Remove and return top element - O(1)
   */
  pop(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items.pop();
  }

  /**
   * Return top element without removing - O(1)
   */
  peek(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Check if stack is empty - O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get stack size - O(1)
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Convert to array (bottom to top) - O(n)
   */
  toArray(): T[] {
    return [...this.items];
  }

  /**
   * Search for element (returns position from top, -1 if not found) - O(n)
   */
  search(item: T): number {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i] === item) {
        return this.items.length - 1 - i; // Position from top
      }
    }
    return -1;
  }
}

/**
 * Stack implementation using Linked List
 * More memory efficient for dynamic sizes
 */

import { ListNode } from './linked-list';

export class LinkedStack<T> {
  private top: ListNode<T> | null;
  private count: number;

  constructor() {
    this.top = null;
    this.count = 0;
  }

  /**
   * Add element to top of stack - O(1)
   */
  push(data: T): void {
    const newNode = new ListNode(data);
    newNode.next = this.top;
    this.top = newNode;
    this.count++;
  }

  /**
   * Remove and return top element - O(1)
   */
  pop(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    
    const data = this.top!.data;
    this.top = this.top!.next;
    this.count--;
    return data;
  }

  /**
   * Return top element without removing - O(1)
   */
  peek(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.top!.data;
  }

  /**
   * Check if stack is empty - O(1)
   */
  isEmpty(): boolean {
    return this.top === null;
  }

  /**
   * Get stack size - O(1)
   */
  size(): number {
    return this.count;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.top = null;
    this.count = 0;
  }
}

/**
 * Common Stack Applications and Algorithms
 */

export class StackApplications {
  /**
   * Check if parentheses are balanced - O(n)
   */
  static isBalanced(expression: string): boolean {
    const stack = new Stack<string>();
    const pairs: { [key: string]: string } = {
      ')': '(',
      '}': '{',
      ']': '['
    };

    for (const char of expression) {
      if ('({['.includes(char)) {
        stack.push(char);
      } else if (')}]'.includes(char)) {
        if (stack.isEmpty() || stack.pop() !== pairs[char]) {
          return false;
        }
      }
    }

    return stack.isEmpty();
  }

  /**
   * Evaluate postfix expression - O(n)
   */
  static evaluatePostfix(expression: string): number {
    const stack = new Stack<number>();
    const tokens = expression.split(' ');

    for (const token of tokens) {
      if (this.isOperator(token)) {
        const b = stack.pop()!;
        const a = stack.pop()!;
        const result = this.performOperation(a, b, token);
        stack.push(result);
      } else {
        stack.push(parseInt(token));
      }
    }

    return stack.pop()!;
  }

  /**
   * Convert infix to postfix notation - O(n)
   */
  static infixToPostfix(expression: string): string {
    const stack = new Stack<string>();
    const output: string[] = [];
    const precedence: { [key: string]: number } = {
      '+': 1, '-': 1,
      '*': 2, '/': 2,
      '^': 3
    };

    for (const char of expression) {
      if (char.match(/[a-zA-Z0-9]/)) {
        output.push(char);
      } else if (char === '(') {
        stack.push(char);
      } else if (char === ')') {
        while (!stack.isEmpty() && stack.peek() !== '(') {
          output.push(stack.pop()!);
        }
        stack.pop(); // Remove '('
      } else if (this.isOperator(char)) {
        while (!stack.isEmpty() && 
               stack.peek() !== '(' && 
               precedence[stack.peek()!] >= precedence[char]) {
          output.push(stack.pop()!);
        }
        stack.push(char);
      }
    }

    while (!stack.isEmpty()) {
      output.push(stack.pop()!);
    }

    return output.join(' ');
  }

  private static isOperator(char: string): boolean {
    return '+-*/^'.includes(char);
  }

  private static performOperation(a: number, b: number, operator: string): number {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case '^': return Math.pow(a, b);
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  }
}
