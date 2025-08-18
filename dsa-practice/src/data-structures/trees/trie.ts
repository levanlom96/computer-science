/**
 * Trie (Prefix Tree) Implementation
 * 
 * Time Complexities:
 * - Insert: O(m) where m is the length of the word
 * - Search: O(m) where m is the length of the word
 * - Delete: O(m) where m is the length of the word
 * - StartsWith: O(m) where m is the length of the prefix
 * 
 * Space Complexity: O(ALPHABET_SIZE * N * M) where N is number of words and M is average length
 */

export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  wordCount: number; // For counting words with this prefix

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.wordCount = 0;
  }
}

export class Trie {
  private root: TrieNode;
  private totalWords: number;

  constructor() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Insert a word into the trie - O(m)
   */
  insert(word: string): void {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
      current.wordCount++;
    }
    
    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      this.totalWords++;
    }
  }

  /**
   * Search for a word in the trie - O(m)
   */
  search(word: string): boolean {
    const node = this.searchNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Check if any word starts with the given prefix - O(m)
   */
  startsWith(prefix: string): boolean {
    return this.searchNode(prefix) !== null;
  }

  /**
   * Helper method to find a node by word/prefix
   */
  private searchNode(word: string): TrieNode | null {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }
    
    return current;
  }

  /**
   * Delete a word from the trie - O(m)
   */
  delete(word: string): boolean {
    const initialSize = this.totalWords;
    this.deleteHelper(this.root, word, 0);
    return this.totalWords < initialSize;
  }

  private deleteHelper(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      // We've reached the end of the word
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }
      
      node.isEndOfWord = false;
      this.totalWords--;
      
      // Return true if current node has no children (can be deleted)
      return node.children.size === 0;
    }
    
    const char = word[index];
    const childNode = node.children.get(char);
    
    if (!childNode) {
      return false; // Word doesn't exist
    }
    
    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);
    
    if (shouldDeleteChild) {
      node.children.delete(char);
      childNode.wordCount--;
      
      // Return true if current node has no children and is not end of another word
      return !node.isEndOfWord && node.children.size === 0;
    }
    
    return false;
  }

  /**
   * Get all words with the given prefix - O(p + n) where p is prefix length, n is number of nodes in subtree
   */
  getWordsWithPrefix(prefix: string): string[] {
    const prefixNode = this.searchNode(prefix);
    if (!prefixNode) {
      return [];
    }
    
    const words: string[] = [];
    this.collectWords(prefixNode, prefix, words);
    return words;
  }

  private collectWords(node: TrieNode, currentWord: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, currentWord + char, words);
    }
  }

  /**
   * Get all words in the trie - O(n)
   */
  getAllWords(): string[] {
    return this.getWordsWithPrefix('');
  }

  /**
   * Count words with given prefix - O(1) if using wordCount, O(p + n) otherwise
   */
  countWordsWithPrefix(prefix: string): number {
    const prefixNode = this.searchNode(prefix);
    return prefixNode ? prefixNode.wordCount : 0;
  }

  /**
   * Get total number of words in trie - O(1)
   */
  size(): number {
    return this.totalWords;
  }

  /**
   * Check if trie is empty - O(1)
   */
  isEmpty(): boolean {
    return this.totalWords === 0;
  }

  /**
   * Clear all words from trie - O(1)
   */
  clear(): void {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Find longest common prefix of all words - O(m * n) worst case
   */
  longestCommonPrefix(): string {
    let prefix = '';
    let current = this.root;
    
    while (current.children.size === 1 && !current.isEndOfWord) {
      const entry = current.children.entries().next().value;
      if (entry) {
        const [char, childNode] = entry;
        prefix += char;
        current = childNode;
      } else {
        break;
      }
    }
    
    return prefix;
  }

  /**
   * Find the shortest unique prefix for each word - O(n * m)
   */
  getShortestUniquePrefixes(): Map<string, string> {
    const words = this.getAllWords();
    const prefixMap = new Map<string, string>();
    
    for (const word of words) {
      let prefix = '';
      let current = this.root;
      
      for (const char of word) {
        prefix += char;
        current = current.children.get(char)!;
        
        // If this prefix is unique (wordCount = 1) or we've reached the end
        if (current.wordCount === 1) {
          break;
        }
      }
      
      prefixMap.set(word, prefix);
    }
    
    return prefixMap;
  }

  /**
   * Auto-complete functionality - get suggestions for a prefix
   */
  autoComplete(prefix: string, maxSuggestions: number = 10): string[] {
    const suggestions = this.getWordsWithPrefix(prefix);
    return suggestions.slice(0, maxSuggestions);
  }

  /**
   * Check if the trie contains any word with the given pattern (supports '.' as wildcard)
   */
  searchWithWildcard(pattern: string): boolean {
    return this.searchWildcardHelper(this.root, pattern, 0);
  }

  private searchWildcardHelper(node: TrieNode, pattern: string, index: number): boolean {
    if (index === pattern.length) {
      return node.isEndOfWord;
    }
    
    const char = pattern[index];
    
    if (char === '.') {
      // Wildcard: try all possible characters
      for (const childNode of node.children.values()) {
        if (this.searchWildcardHelper(childNode, pattern, index + 1)) {
          return true;
        }
      }
      return false;
    } else {
      // Regular character
      const childNode = node.children.get(char);
      if (!childNode) {
        return false;
      }
      return this.searchWildcardHelper(childNode, pattern, index + 1);
    }
  }

  /**
   * Find all words matching a pattern with wildcards
   */
  findWordsWithPattern(pattern: string): string[] {
    const results: string[] = [];
    this.findPatternHelper(this.root, pattern, 0, '', results);
    return results;
  }

  private findPatternHelper(
    node: TrieNode, 
    pattern: string, 
    index: number, 
    currentWord: string, 
    results: string[]
  ): void {
    if (index === pattern.length) {
      if (node.isEndOfWord) {
        results.push(currentWord);
      }
      return;
    }
    
    const char = pattern[index];
    
    if (char === '.') {
      for (const [childChar, childNode] of node.children) {
        this.findPatternHelper(childNode, pattern, index + 1, currentWord + childChar, results);
      }
    } else {
      const childNode = node.children.get(char);
      if (childNode) {
        this.findPatternHelper(childNode, pattern, index + 1, currentWord + char, results);
      }
    }
  }
}

/**
 * Suffix Trie for substring search
 */
export class SuffixTrie {
  private trie: Trie;

  constructor(text: string) {
    this.trie = new Trie();
    this.buildSuffixTrie(text);
  }

  private buildSuffixTrie(text: string): void {
    // Add all suffixes to the trie
    for (let i = 0; i < text.length; i++) {
      this.trie.insert(text.slice(i));
    }
  }

  /**
   * Check if the text contains the given substring - O(m)
   */
  contains(substring: string): boolean {
    return this.trie.startsWith(substring);
  }

  /**
   * Find all occurrences of a substring
   */
  findAllOccurrences(substring: string, originalText: string): number[] {
    const occurrences: number[] = [];
    
    for (let i = 0; i <= originalText.length - substring.length; i++) {
      if (originalText.slice(i, i + substring.length) === substring) {
        occurrences.push(i);
      }
    }
    
    return occurrences;
  }
}
