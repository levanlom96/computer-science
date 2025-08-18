/**
 * Graph Implementation (Adjacency List and Adjacency Matrix)
 * 
 * Time Complexities:
 * Adjacency List:
 * - Add Vertex: O(1)
 * - Add Edge: O(1)
 * - Remove Vertex: O(V + E)
 * - Remove Edge: O(V)
 * - Has Edge: O(V)
 * - Get Neighbors: O(1)
 * 
 * Adjacency Matrix:
 * - Add Vertex: O(V²) due to matrix resize
 * - Add Edge: O(1)
 * - Remove Vertex: O(V²)
 * - Remove Edge: O(1)
 * - Has Edge: O(1)
 * - Get Neighbors: O(V)
 * 
 * Space Complexity: 
 * - Adjacency List: O(V + E)
 * - Adjacency Matrix: O(V²)
 */

/**
 * Graph using Adjacency List (most common implementation)
 */
export class Graph<T> {
  private adjacencyList: Map<T, Set<T>>;
  private directed: boolean;

  constructor(directed: boolean = false) {
    this.adjacencyList = new Map();
    this.directed = directed;
  }

  /**
   * Add a vertex to the graph - O(1)
   */
  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  /**
   * Add an edge between two vertices - O(1)
   */
  addEdge(from: T, to: T): void {
    this.addVertex(from);
    this.addVertex(to);
    
    this.adjacencyList.get(from)!.add(to);
    
    if (!this.directed) {
      this.adjacencyList.get(to)!.add(from);
    }
  }

  /**
   * Remove a vertex and all its edges - O(V + E)
   */
  removeVertex(vertex: T): boolean {
    if (!this.adjacencyList.has(vertex)) {
      return false;
    }

    // Remove all edges to this vertex
    for (const [v, neighbors] of this.adjacencyList) {
      neighbors.delete(vertex);
    }

    // Remove the vertex itself
    this.adjacencyList.delete(vertex);
    return true;
  }

  /**
   * Remove an edge between two vertices - O(1)
   */
  removeEdge(from: T, to: T): boolean {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
      return false;
    }

    const removed1 = this.adjacencyList.get(from)!.delete(to);
    
    if (!this.directed) {
      const removed2 = this.adjacencyList.get(to)!.delete(from);
      return removed1 || removed2;
    }
    
    return removed1;
  }

  /**
   * Check if there's an edge between two vertices - O(1)
   */
  hasEdge(from: T, to: T): boolean {
    return this.adjacencyList.has(from) && 
           this.adjacencyList.get(from)!.has(to);
  }

  /**
   * Get all neighbors of a vertex - O(1)
   */
  getNeighbors(vertex: T): T[] {
    const neighbors = this.adjacencyList.get(vertex);
    return neighbors ? Array.from(neighbors) : [];
  }

  /**
   * Get all vertices - O(V)
   */
  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  /**
   * Get all edges - O(V + E)
   */
  getEdges(): [T, T][] {
    const edges: [T, T][] = [];
    
    for (const [from, neighbors] of this.adjacencyList) {
      for (const to of neighbors) {
        if (this.directed || from <= to) { // Avoid duplicates in undirected graph
          edges.push([from, to]);
        }
      }
    }
    
    return edges;
  }

  /**
   * Get number of vertices - O(1)
   */
  vertexCount(): number {
    return this.adjacencyList.size;
  }

  /**
   * Get number of edges - O(V + E)
   */
  edgeCount(): number {
    let count = 0;
    for (const neighbors of this.adjacencyList.values()) {
      count += neighbors.size;
    }
    return this.directed ? count : count / 2;
  }

  /**
   * Check if graph is directed - O(1)
   */
  isDirected(): boolean {
    return this.directed;
  }

  /**
   * Clear the graph - O(1)
   */
  clear(): void {
    this.adjacencyList.clear();
  }

  /**
   * Get degree of a vertex - O(1)
   */
  getDegree(vertex: T): number {
    const neighbors = this.adjacencyList.get(vertex);
    return neighbors ? neighbors.size : 0;
  }

  /**
   * Check if graph is empty - O(1)
   */
  isEmpty(): boolean {
    return this.adjacencyList.size === 0;
  }

  /**
   * Clone the graph - O(V + E)
   */
  clone(): Graph<T> {
    const newGraph = new Graph<T>(this.directed);
    
    for (const [vertex, neighbors] of this.adjacencyList) {
      newGraph.addVertex(vertex);
      for (const neighbor of neighbors) {
        newGraph.addEdge(vertex, neighbor);
      }
    }
    
    return newGraph;
  }
}

/**
 * Weighted Graph Implementation
 */
export interface WeightedEdge<T> {
  to: T;
  weight: number;
}

export class WeightedGraph<T> {
  private adjacencyList: Map<T, WeightedEdge<T>[]>;
  private directed: boolean;

  constructor(directed: boolean = false) {
    this.adjacencyList = new Map();
    this.directed = directed;
  }

  /**
   * Add a vertex to the graph - O(1)
   */
  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  /**
   * Add a weighted edge between two vertices - O(1)
   */
  addEdge(from: T, to: T, weight: number): void {
    this.addVertex(from);
    this.addVertex(to);
    
    this.adjacencyList.get(from)!.push({ to, weight });
    
    if (!this.directed) {
      this.adjacencyList.get(to)!.push({ to: from, weight });
    }
  }

  /**
   * Get weight of edge between two vertices - O(V)
   */
  getEdgeWeight(from: T, to: T): number | null {
    const neighbors = this.adjacencyList.get(from);
    if (!neighbors) return null;
    
    const edge = neighbors.find(neighbor => neighbor.to === to);
    return edge ? edge.weight : null;
  }

  /**
   * Get weighted neighbors of a vertex - O(1)
   */
  getWeightedNeighbors(vertex: T): WeightedEdge<T>[] {
    return this.adjacencyList.get(vertex) || [];
  }

  /**
   * Get all vertices - O(V)
   */
  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  /**
   * Update edge weight - O(V)
   */
  updateEdgeWeight(from: T, to: T, newWeight: number): boolean {
    const fromNeighbors = this.adjacencyList.get(from);
    if (!fromNeighbors) return false;
    
    const edge = fromNeighbors.find(neighbor => neighbor.to === to);
    if (!edge) return false;
    
    edge.weight = newWeight;
    
    if (!this.directed) {
      const toNeighbors = this.adjacencyList.get(to);
      if (toNeighbors) {
        const reverseEdge = toNeighbors.find(neighbor => neighbor.to === from);
        if (reverseEdge) {
          reverseEdge.weight = newWeight;
        }
      }
    }
    
    return true;
  }

  /**
   * Check if there's an edge between two vertices - O(V)
   */
  hasEdge(from: T, to: T): boolean {
    const neighbors = this.adjacencyList.get(from);
    return neighbors ? neighbors.some(neighbor => neighbor.to === to) : false;
  }

  /**
   * Remove an edge - O(V)
   */
  removeEdge(from: T, to: T): boolean {
    const fromNeighbors = this.adjacencyList.get(from);
    if (!fromNeighbors) return false;
    
    const initialLength = fromNeighbors.length;
    const newNeighbors = fromNeighbors.filter(neighbor => neighbor.to !== to);
    this.adjacencyList.set(from, newNeighbors);
    
    if (!this.directed) {
      const toNeighbors = this.adjacencyList.get(to);
      if (toNeighbors) {
        const newToNeighbors = toNeighbors.filter(neighbor => neighbor.to !== from);
        this.adjacencyList.set(to, newToNeighbors);
      }
    }
    
    return newNeighbors.length < initialLength;
  }
}

/**
 * Graph using Adjacency Matrix (better for dense graphs)
 */
export class GraphMatrix<T> {
  private matrix: number[][];
  private vertices: T[];
  private vertexMap: Map<T, number>;
  private directed: boolean;

  constructor(directed: boolean = false) {
    this.matrix = [];
    this.vertices = [];
    this.vertexMap = new Map();
    this.directed = directed;
  }

  /**
   * Add a vertex to the graph - O(V²) due to matrix resize
   */
  addVertex(vertex: T): void {
    if (this.vertexMap.has(vertex)) return;
    
    const index = this.vertices.length;
    this.vertices.push(vertex);
    this.vertexMap.set(vertex, index);
    
    // Resize matrix
    this.matrix.push(new Array(this.vertices.length).fill(0));
    for (let i = 0; i < this.vertices.length - 1; i++) {
      this.matrix[i].push(0);
    }
  }

  /**
   * Add an edge between two vertices - O(1)
   */
  addEdge(from: T, to: T, weight: number = 1): void {
    this.addVertex(from);
    this.addVertex(to);
    
    const fromIndex = this.vertexMap.get(from)!;
    const toIndex = this.vertexMap.get(to)!;
    
    this.matrix[fromIndex][toIndex] = weight;
    
    if (!this.directed) {
      this.matrix[toIndex][fromIndex] = weight;
    }
  }

  /**
   * Check if there's an edge between two vertices - O(1)
   */
  hasEdge(from: T, to: T): boolean {
    const fromIndex = this.vertexMap.get(from);
    const toIndex = this.vertexMap.get(to);
    
    if (fromIndex === undefined || toIndex === undefined) return false;
    
    return this.matrix[fromIndex][toIndex] !== 0;
  }

  /**
   * Get edge weight - O(1)
   */
  getEdgeWeight(from: T, to: T): number {
    const fromIndex = this.vertexMap.get(from);
    const toIndex = this.vertexMap.get(to);
    
    if (fromIndex === undefined || toIndex === undefined) return 0;
    
    return this.matrix[fromIndex][toIndex];
  }

  /**
   * Get neighbors of a vertex - O(V)
   */
  getNeighbors(vertex: T): T[] {
    const index = this.vertexMap.get(vertex);
    if (index === undefined) return [];
    
    const neighbors: T[] = [];
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.matrix[index][i] !== 0) {
        neighbors.push(this.vertices[i]);
      }
    }
    
    return neighbors;
  }

  /**
   * Get all vertices - O(V)
   */
  getVertices(): T[] {
    return [...this.vertices];
  }

  /**
   * Get the adjacency matrix - O(V²)
   */
  getMatrix(): number[][] {
    return this.matrix.map(row => [...row]);
  }

  /**
   * Remove an edge - O(1)
   */
  removeEdge(from: T, to: T): boolean {
    const fromIndex = this.vertexMap.get(from);
    const toIndex = this.vertexMap.get(to);
    
    if (fromIndex === undefined || toIndex === undefined) return false;
    
    const hadEdge = this.matrix[fromIndex][toIndex] !== 0;
    this.matrix[fromIndex][toIndex] = 0;
    
    if (!this.directed) {
      this.matrix[toIndex][fromIndex] = 0;
    }
    
    return hadEdge;
  }

  /**
   * Get vertex count - O(1)
   */
  vertexCount(): number {
    return this.vertices.length;
  }
}
