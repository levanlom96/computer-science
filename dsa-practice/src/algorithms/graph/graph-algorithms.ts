/**
 * Graph Algorithms Implementation
 * 
 * This file contains implementations of major graph algorithms including
 * BFS, DFS, Dijkstra's algorithm, and other graph traversal/shortest path algorithms.
 */

import { Graph, WeightedGraph, WeightedEdge } from '../../data-structures/graphs/graph';

/**
 * Breadth-First Search (BFS)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function bfs<T>(graph: Graph<T>, startVertex: T): {
  visited: Set<T>;
  order: T[];
  distances: Map<T, number>;
  predecessors: Map<T, T | null>;
} {
  const visited = new Set<T>();
  const order: T[] = [];
  const distances = new Map<T, number>();
  const predecessors = new Map<T, T | null>();
  const queue: T[] = [];
  
  queue.push(startVertex);
  visited.add(startVertex);
  distances.set(startVertex, 0);
  predecessors.set(startVertex, null);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    order.push(current);
    
    const neighbors = graph.getNeighbors(current);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        distances.set(neighbor, distances.get(current)! + 1);
        predecessors.set(neighbor, current);
      }
    }
  }
  
  return { visited, order, distances, predecessors };
}

/**
 * Depth-First Search (DFS) - Iterative
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function dfsIterative<T>(graph: Graph<T>, startVertex: T): {
  visited: Set<T>;
  order: T[];
  predecessors: Map<T, T | null>;
} {
  const visited = new Set<T>();
  const order: T[] = [];
  const predecessors = new Map<T, T | null>();
  const stack: T[] = [];
  
  stack.push(startVertex);
  predecessors.set(startVertex, null);
  
  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (!visited.has(current)) {
      visited.add(current);
      order.push(current);
      
      const neighbors = graph.getNeighbors(current);
      for (const neighbor of neighbors.reverse()) { // Reverse to maintain left-to-right order
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
          if (!predecessors.has(neighbor)) {
            predecessors.set(neighbor, current);
          }
        }
      }
    }
  }
  
  return { visited, order, predecessors };
}

/**
 * Depth-First Search (DFS) - Recursive
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function dfsRecursive<T>(graph: Graph<T>, startVertex: T): {
  visited: Set<T>;
  order: T[];
  predecessors: Map<T, T | null>;
} {
  const visited = new Set<T>();
  const order: T[] = [];
  const predecessors = new Map<T, T | null>();
  
  function dfsHelper(vertex: T, predecessor: T | null = null): void {
    visited.add(vertex);
    order.push(vertex);
    predecessors.set(vertex, predecessor);
    
    const neighbors = graph.getNeighbors(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor, vertex);
      }
    }
  }
  
  dfsHelper(startVertex);
  return { visited, order, predecessors };
}

/**
 * Find path between two vertices using BFS
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function findPath<T>(graph: Graph<T>, start: T, end: T): T[] | null {
  const { visited, predecessors } = bfs(graph, start);
  
  if (!visited.has(end)) {
    return null; // No path exists
  }
  
  const path: T[] = [];
  let current: T | null = end;
  
  while (current !== null) {
    path.unshift(current);
    current = predecessors.get(current)!;
  }
  
  return path;
}

/**
 * Check if graph is connected (for undirected graphs)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function isConnected<T>(graph: Graph<T>): boolean {
  const vertices = graph.getVertices();
  if (vertices.length === 0) return true;
  
  const { visited } = bfs(graph, vertices[0]);
  return visited.size === vertices.length;
}

/**
 * Find all connected components
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function findConnectedComponents<T>(graph: Graph<T>): T[][] {
  const visited = new Set<T>();
  const components: T[][] = [];
  
  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      const { visited: componentVertices } = bfs(graph, vertex);
      components.push(Array.from(componentVertices));
      
      // Mark all vertices in this component as visited
      for (const v of componentVertices) {
        visited.add(v);
      }
    }
  }
  
  return components;
}

/**
 * Detect cycle in undirected graph using DFS
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function hasCycleUndirected<T>(graph: Graph<T>): boolean {
  const visited = new Set<T>();
  
  function dfsHasCycle(vertex: T, parent: T | null): boolean {
    visited.add(vertex);
    
    const neighbors = graph.getNeighbors(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfsHasCycle(neighbor, vertex)) {
          return true;
        }
      } else if (neighbor !== parent) {
        return true; // Back edge found
      }
    }
    
    return false;
  }
  
  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      if (dfsHasCycle(vertex, null)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Detect cycle in directed graph using DFS (with colors)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function hasCycleDirected<T>(graph: Graph<T>): boolean {
  const white = new Set<T>(graph.getVertices()); // Unvisited
  const gray = new Set<T>(); // Currently being processed
  const black = new Set<T>(); // Completely processed
  
  function dfsHasCycle(vertex: T): boolean {
    white.delete(vertex);
    gray.add(vertex);
    
    const neighbors = graph.getNeighbors(vertex);
    for (const neighbor of neighbors) {
      if (gray.has(neighbor)) {
        return true; // Back edge found
      }
      if (white.has(neighbor) && dfsHasCycle(neighbor)) {
        return true;
      }
    }
    
    gray.delete(vertex);
    black.add(vertex);
    return false;
  }
  
  while (white.size > 0) {
    const vertex = white.values().next().value as T;
    if (dfsHasCycle(vertex)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Topological Sort using DFS
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function topologicalSort<T>(graph: Graph<T>): T[] | null {
  if (hasCycleDirected(graph)) {
    return null; // Cannot perform topological sort on cyclic graph
  }
  
  const visited = new Set<T>();
  const stack: T[] = [];
  
  function dfsTopological(vertex: T): void {
    visited.add(vertex);
    
    const neighbors = graph.getNeighbors(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfsTopological(neighbor);
      }
    }
    
    stack.push(vertex); // Add to stack after visiting all neighbors
  }
  
  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      dfsTopological(vertex);
    }
  }
  
  return stack.reverse();
}

/**
 * Dijkstra's Shortest Path Algorithm
 * Time Complexity: O((V + E) log V) with binary heap
 * Space Complexity: O(V)
 */
export function dijkstra<T>(
  graph: WeightedGraph<T>, 
  startVertex: T
): {
  distances: Map<T, number>;
  predecessors: Map<T, T | null>;
  shortestPath: (target: T) => T[] | null;
} {
  const distances = new Map<T, number>();
  const predecessors = new Map<T, T | null>();
  const visited = new Set<T>();
  const vertices = graph.getVertices();
  
  // Initialize distances
  for (const vertex of vertices) {
    distances.set(vertex, Infinity);
    predecessors.set(vertex, null);
  }
  distances.set(startVertex, 0);
  
  // Priority queue implementation using array (can be optimized with heap)
  const unvisited = [...vertices];
  
  while (unvisited.length > 0) {
    // Find vertex with minimum distance
    let minVertex = unvisited[0];
    for (const vertex of unvisited) {
      if (distances.get(vertex)! < distances.get(minVertex)!) {
        minVertex = vertex;
      }
    }
    
    // Remove from unvisited
    const index = unvisited.indexOf(minVertex);
    unvisited.splice(index, 1);
    visited.add(minVertex);
    
    // Update distances to neighbors
    const neighbors = graph.getWeightedNeighbors(minVertex);
    for (const { to: neighbor, weight } of neighbors) {
      if (!visited.has(neighbor)) {
        const newDistance = distances.get(minVertex)! + weight;
        if (newDistance < distances.get(neighbor)!) {
          distances.set(neighbor, newDistance);
          predecessors.set(neighbor, minVertex);
        }
      }
    }
  }
  
  const shortestPath = (target: T): T[] | null => {
    if (distances.get(target) === Infinity) {
      return null; // No path exists
    }
    
    const path: T[] = [];
    let current: T | null = target;
    
    while (current !== null) {
      path.unshift(current);
      current = predecessors.get(current)!;
    }
    
    return path;
  };
  
  return { distances, predecessors, shortestPath };
}

/**
 * Bellman-Ford Algorithm (handles negative weights)
 * Time Complexity: O(VE)
 * Space Complexity: O(V)
 */
export function bellmanFord<T>(
  graph: WeightedGraph<T>, 
  startVertex: T
): {
  distances: Map<T, number>;
  predecessors: Map<T, T | null>;
  hasNegativeCycle: boolean;
} {
  const distances = new Map<T, number>();
  const predecessors = new Map<T, T | null>();
  const vertices = graph.getVertices();
  
  // Initialize distances
  for (const vertex of vertices) {
    distances.set(vertex, Infinity);
    predecessors.set(vertex, null);
  }
  distances.set(startVertex, 0);
  
  // Relax edges V-1 times
  for (let i = 0; i < vertices.length - 1; i++) {
    for (const vertex of vertices) {
      const neighbors = graph.getWeightedNeighbors(vertex);
      for (const { to: neighbor, weight } of neighbors) {
        const newDistance = distances.get(vertex)! + weight;
        if (newDistance < distances.get(neighbor)!) {
          distances.set(neighbor, newDistance);
          predecessors.set(neighbor, vertex);
        }
      }
    }
  }
  
  // Check for negative cycles
  let hasNegativeCycle = false;
  for (const vertex of vertices) {
    const neighbors = graph.getWeightedNeighbors(vertex);
    for (const { to: neighbor, weight } of neighbors) {
      if (distances.get(vertex)! + weight < distances.get(neighbor)!) {
        hasNegativeCycle = true;
        break;
      }
    }
    if (hasNegativeCycle) break;
  }
  
  return { distances, predecessors, hasNegativeCycle };
}

/**
 * A* Search Algorithm
 * Time Complexity: O(b^d) where b is branching factor, d is depth
 * Space Complexity: O(b^d)
 */
export function aStar<T>(
  graph: WeightedGraph<T>,
  start: T,
  goal: T,
  heuristic: (vertex: T) => number
): T[] | null {
  const openSet = new Set<T>([start]);
  const cameFrom = new Map<T, T>();
  const gScore = new Map<T, number>();
  const fScore = new Map<T, number>();
  
  // Initialize scores
  for (const vertex of graph.getVertices()) {
    gScore.set(vertex, Infinity);
    fScore.set(vertex, Infinity);
  }
  gScore.set(start, 0);
  fScore.set(start, heuristic(start));
  
  while (openSet.size > 0) {
    // Find vertex in openSet with lowest fScore
    let current = Array.from(openSet)[0];
    for (const vertex of openSet) {
      if (fScore.get(vertex)! < fScore.get(current)!) {
        current = vertex;
      }
    }
    
    if (current === goal) {
      // Reconstruct path
      const path: T[] = [];
      let temp: T | undefined = current;
      while (temp !== undefined) {
        path.unshift(temp);
        temp = cameFrom.get(temp);
      }
      return path;
    }
    
    openSet.delete(current);
    
    const neighbors = graph.getWeightedNeighbors(current);
    for (const { to: neighbor, weight } of neighbors) {
      const tentativeGScore = gScore.get(current)! + weight;
      
      if (tentativeGScore < gScore.get(neighbor)!) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + heuristic(neighbor));
        
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }
  
  return null; // No path found
}

/**
 * Minimum Spanning Tree - Kruskal's Algorithm
 * Time Complexity: O(E log E)
 * Space Complexity: O(V)
 */
export function kruskalMST<T>(graph: WeightedGraph<T>): WeightedEdge<T>[] {
  const edges: { from: T; to: T; weight: number }[] = [];
  const vertices = graph.getVertices();
  
  // Collect all edges
  for (const vertex of vertices) {
    const neighbors = graph.getWeightedNeighbors(vertex);
    for (const { to, weight } of neighbors) {
      edges.push({ from: vertex, to, weight });
    }
  }
  
  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);
  
  // Union-Find data structure
  const parent = new Map<T, T>();
  const rank = new Map<T, number>();
  
  function makeSet(vertex: T): void {
    parent.set(vertex, vertex);
    rank.set(vertex, 0);
  }
  
  function find(vertex: T): T {
    if (parent.get(vertex) !== vertex) {
      parent.set(vertex, find(parent.get(vertex)!));
    }
    return parent.get(vertex)!;
  }
  
  function union(x: T, y: T): boolean {
    const rootX = find(x);
    const rootY = find(y);
    
    if (rootX === rootY) return false;
    
    const rankX = rank.get(rootX)!;
    const rankY = rank.get(rootY)!;
    
    if (rankX < rankY) {
      parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      parent.set(rootY, rootX);
    } else {
      parent.set(rootY, rootX);
      rank.set(rootX, rankX + 1);
    }
    
    return true;
  }
  
  // Initialize Union-Find
  for (const vertex of vertices) {
    makeSet(vertex);
  }
  
  const mst: WeightedEdge<T>[] = [];
  
  for (const { from, to, weight } of edges) {
    if (union(from, to)) {
      mst.push({ to, weight });
      if (mst.length === vertices.length - 1) {
        break;
      }
    }
  }
  
  return mst;
}

/**
 * Check if graph is bipartite using BFS
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
export function isBipartite<T>(graph: Graph<T>): boolean {
  const colors = new Map<T, number>();
  
  for (const startVertex of graph.getVertices()) {
    if (colors.has(startVertex)) continue;
    
    const queue: T[] = [startVertex];
    colors.set(startVertex, 0);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentColor = colors.get(current)!;
      
      const neighbors = graph.getNeighbors(current);
      for (const neighbor of neighbors) {
        if (!colors.has(neighbor)) {
          colors.set(neighbor, 1 - currentColor);
          queue.push(neighbor);
        } else if (colors.get(neighbor) === currentColor) {
          return false;
        }
      }
    }
  }
  
  return true;
}
