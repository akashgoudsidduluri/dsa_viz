import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import ThemeToggle from "@/components/ui/theme-toggle";
import * as Algo from "@/lib/algorithms";

// Grouped sections for UI: label -> [algorithms]
const algorithmSections: Record<string, string[]> = {
  "Sorting": [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
  ],
  "Searching": [
    "Linear Search",
    "Binary Search",
  ],
  "Graphs": [
    "BFS",
    "DFS",
    "Dijkstra",
    "Topological Sort",
  ],
  "Linked List": [
    "Reverse Linked List",
    "Cycle Detection",
    "Find Middle",
  ],
  "Tree": [
    "In-Order DFS",
    "Level Order BFS",
  ],
};

type AlgorithmStep = {
  description: string;
  highlight: number[];
  array?: number[];
  sorted?: number[];
  pivot?: number;
  left?: number;
  right?: number;
  mid?: number;
  found?: boolean;
  visited?: number[];
  queue?: number[];
  stack?: number[];
  current?: number;
  codeLine?: number[];
};

// Algorithm code snippets organized by algorithm -> approach
const algorithmCode: Record<string, Record<string, string[]>> = {
  "Bubble Sort": {
    Default: [
      "function bubbleSort(arr) {",
      "  for (let i = 0; i < n-1; i++) {",
      "    for (let j = 0; j < n-i-1; j++) {",
      "      if (arr[j] > arr[j+1]) {",
      "        swap(arr[j], arr[j+1]);",
      "      }",
      "    }",
      "  }",
      "  return arr;",
      "}",
    ],
  },
  "Quick Sort": {
    Default: [
      "function quickSort(arr, low, high) {",
      "  if (low < high) {",
      "    pivot = arr[high];",
      "    i = low - 1;",
      "    for (j = low; j < high; j++) {",
      "      if (arr[j] < pivot) {",
      "        i++; swap(arr[i], arr[j]);",
      "      }",
      "    }",
      "    swap(arr[i+1], arr[high]);",
      "    pi = i + 1;",
      "    quickSort(arr, low, pi-1);",
      "    quickSort(arr, pi+1, high);",
      "  }",
      "}",
    ],
  },
  "Merge Sort": {
    Default: [
      "function mergeSort(arr) {",
      "  if (arr.length <= 1) return arr;",
      "  mid = arr.length / 2;",
      "  left = mergeSort(arr[0..mid]);",
      "  right = mergeSort(arr[mid..n]);",
      "  return merge(left, right);",
      "}",
      "",
      "function merge(left, right) {",
      "  result = [];",
      "  while (left && right) {",
      "    if (left[0] <= right[0])",
      "      result.push(left.shift());",
      "    else",
      "      result.push(right.shift());",
      "  }",
      "  return [...result, ...left, ...right];",
      "}",
    ],
  },
  "Binary Search": {
    Default: [
      "function binarySearch(arr, target) {",
      "  left = 0, right = arr.length - 1;",
      "  while (left <= right) {",
      "    mid = Math.floor((left+right)/2);",
      "    if (arr[mid] === target) {",
      "      return mid; // Found!",
      "    }",
      "    if (arr[mid] < target) {",
      "      left = mid + 1;",
      "    } else {",
      "      right = mid - 1;",
      "    }",
      "  }",
      "  return -1; // Not found",
      "}",
    ],
  },
  "BFS": {
    Default: [
      "function BFS(graph, start) {",
      "  visited = new Set();",
      "  queue = [start];",
      "  while (queue.length > 0) {",
      "    node = queue.shift();",
      "    if (visited.has(node)) continue;",
      "    visited.add(node);",
      "    for (neighbor of graph[node]) {",
      "      if (!visited.has(neighbor)) {",
      "        queue.push(neighbor);",
      "      }",
      "    }",
      "  }",
      "  return visited;",
      "}",
    ],
  },
  "DFS": {
    Default: [
      "function DFS(graph, start) {",
      "  visited = new Set();",
      "  stack = [start];",
      "  while (stack.length > 0) {",
      "    node = stack.pop();",
      "    if (visited.has(node)) continue;",
      "    visited.add(node);",
      "    for (neighbor of graph[node]) {",
      "      if (!visited.has(neighbor)) {",
      "        stack.push(neighbor);",
      "      }",
      "    }",
      "  }",
      "  return visited;",
      "}",
    ],
  },
  "Selection Sort": {
    Default: [
      "function selectionSort(arr) {",
      "  for i from 0 to n-1 {",
      "    minIdx = i",
      "    for j from i+1 to n-1 {",
      "      if arr[j] < arr[minIdx] then minIdx = j",
      "    }",
      "    swap(arr[i], arr[minIdx])",
      "  }",
      "  return arr",
      "}",
    ],
  },
  "Insertion Sort": {
    Default: [
      "function insertionSort(arr) {",
      "  for i from 1 to n-1 {",
      "    key = arr[i]",
      "    j = i-1",
      "    while j >= 0 and arr[j] > key {",
      "      arr[j+1] = arr[j]  // shift",
      "      j = j - 1",
      "    }",
      "    arr[j+1] = key  // insert",
      "  }",
      "}",
    ],
  },
  "Linear Search": {
    Default: [
      "function linearSearch(arr, target) {",
      "  for i from 0 to n-1 {",
      "    if arr[i] == target then return i  // found",
      "  }",
      "  return -1",
      "}",
    ],
  },
  "Two Sum": {
    Default: [
      "function twoSum(arr, target) {",
      "  map = {}",
      "  for i from 0 to n-1 {",
      "    need = target - arr[i]",
      "    if need in map then return [map[need], i]",
      "    map[arr[i]] = i",
      "  }",
      "}",
    ],
  },
  "Subarray Sum Equals K": {
    Default: [
      "function subarraySumEqualsK(arr, k) {",
      "  map = {0: -1}",
      "  sum = 0",
      "  for i from 0 to n-1 {",
      "    sum += arr[i]",
      "    if sum - k in map then return [map[sum-k]+1, i]",
      "    map[sum] = i",
      "  }",
      "}",
    ],
  },
  "Reverse Linked List": {
    Default: [
      "function reverseList(head) {",
      "  prev = null",
      "  curr = head",
      "  while curr != null {",
      "    next = curr.next",
      "    curr.next = prev",
      "    prev = curr",
      "    curr = next",
      "  }",
      "  return prev",
      "}",
    ],
  },
  "Cycle Detection": {
    Default: [
      "function hasCycle(head) {",
      "  slow = head, fast = head",
      "  while fast and fast.next {",
      "    slow = slow.next",
      "    fast = fast.next.next",
      "    if slow == fast return true",
      "  }",
      "  return false",
      "}",
    ],
  },
  "Find Middle": {
    Default: [
      "function findMiddle(head) {",
      "  slow = head; fast = head;",
      "  while fast != null && fast.next != null {",
      "    slow = slow.next  // move slow by 1",
      "    fast = fast.next.next  // move fast by 2",
      "  }",
      "  return slow",
      "}",
    ],
  },
  "In-Order DFS": {
    Default: [
      "function inorder(root) {",
      "  dfs(node) {",
      "    if node == null return",
      "    dfs(node.left)",
      "    visit(node)",
      "    dfs(node.right)",
      "  }",
      "}",
    ],
  },
  "Level Order BFS": {
    Default: [
      "function levelOrder(root) {",
      "  if not root return []",
      "  queue = [root]",
      "  while queue not empty {",
      "    node = queue.shift()",
      "    visit(node)",
      "    push children to queue",
      "  }",
      "}",
    ],
  },
  "Dijkstra": {
    Default: [
      "function dijkstra(graph, src) {",
      "  dist = [inf..], dist[src] = 0",
      "  while there are unvisited nodes {",
      "    u = node with smallest dist",
      "    visit(u)",
      "    for edge u->v weight w {",
      "      if dist[u] + w < dist[v] then dist[v] = dist[u] + w  // relax",
      "    }",
      "  }",
      "  return dist",
      "}",
    ],
  },
  "Topological Sort": {
    Default: [
      "function kahn(adj) {",
      "  indeg = compute indegrees",
      "  q = nodes with indeg 0",
      "  while q not empty {",
      "    u = q.shift(); visit(u)",
      "    for v of adj[u] { indeg[v]--; if indeg[v]==0 q.push(v) }",
      "  }",
      "}",
    ],
  },
  "Prime Check": {
    Default: [
      "function isPrime(n) {",
      "  if n < 2 return false",
      "  for i from 2 to sqrt(n) {",
      "    if n % i == 0 return false",
      "  }",
      "  return true",
      "}",
    ],
  },
  "Sieve of Eratosthenes": {
    Default: [
      "function sieve(n) {",
      "  isPrime = [true..n]",
      "  for p from 2 to sqrt(n) {",
      "    if isPrime[p] then for mult = p*p to n step p mark not prime",
      "  }",
      "  return primes",
      "}",
    ],
  },
  "GCD": {
    Default: [
      "function gcd(a,b) {",
      "  while b != 0 {",
      "    t = a % b; a = b; b = t",
      "  }",
      "  return a",
      "}",
    ],
  },
  "LCM": {
    Default: [
      "function lcm(a,b) {",
      "  return abs(a/gcd(a,b)*b)",
      "}",
    ],
  },
  "Binary Exponentiation": {
    Default: [
      "function binexp(b,e) {",
      "  result = 1",
      "  while e > 0 {",
      "    if e & 1 result *= b",
      "    b *= b; e >>= 1",
      "  }",
      "  return result",
      "}",
    ],
  },
  "Modular Exponentiation": {
    Default: [
      "function modexp(b,e,mod) {",
      "  result = 1 % mod",
      "  while e > 0 {",
      "    if e & 1 result = (result * b) % mod",
      "    b = (b*b)%mod; e >>= 1",
      "  }",
      "  return result",
      "}",
    ],
  },
  "nCr": {
    Default: [
      "function nCr(n,r) {",
      "  r = min(r, n-r)",
      "  numer = product(n, n-1, ..)",
      "  denom = factorial(r)",
      "  return numer/denom",
      "}",
    ],
  },
  "Count Set Bits": {
    Default: [
      "function countSetBits(x) {",
      "  cnt = 0",
      "  while x { x &= x-1; cnt++ }",
      "  return cnt",
      "}",
    ],
  },
  "Is Power Of Two": {
    Default: [
      "function isPowerOfTwo(x) {",
      "  return x > 0 and (x & (x-1)) == 0",
      "}",
    ],
  },
  "Single Number": {
    Default: [
      "function singleNumber(nums) {",
      "  x = 0",
      "  for n in nums x ^= n",
      "  return x",
      "}",
    ],
  },
  "Generate Subsets": {
    Default: [
      "function subsets(nums) {",
      "  for mask in 0..(1<<n)-1 {",
      "    build subset from bits",
      "  }",
      "}",
    ],
  },
};

// Adapter: convert Algo.Step[] into AlgorithmStep[] used by this Visualizer
const convertAlgoSteps = (
  events: Algo.Step[],
  initialArr: number[] = [64, 34, 25, 12, 22, 11, 90],
  algoName?: string
): AlgorithmStep[] => {
  const arrState = initialArr.slice();
  const steps: AlgorithmStep[] = [];

  // precise mapping of event types to pseudocode line indices per algorithm
  const codeMap: Record<string, Record<string, number[]>> = {
    "Bubble Sort": { compare: [3], swap: [4] },
    "Selection Sort": { compare: [3], swap: [6] },
    "Insertion Sort": { compare: [4], shift: [5], insert: [6] },
    "Merge Sort": { compare: [10, 11], insert: [12] },
    "Quick Sort": { compare: [4, 5], swap: [6], movePointer: [2] },
    "Binary Search": { compare: [2, 3], movePointer: [3] },
    "Linear Search": { compare: [1], found: [2] },
    "Two Sum": { movePointer: [2], found: [4] },
    "Subarray Sum Equals K": { movePointer: [3], found: [4] },
    "Reverse Linked List": { visit: [2], stack: [3] },
    "Cycle Detection": { movePointer: [2], found: [5] },
    "Find Middle": { movePointer: [3,4], found: [6] },
    "In-Order DFS": { visit: [3] },
    "Level Order BFS": { queue: [2, 3], visit: [4] },
    "BFS": { queue: [2], visit: [4] },
    "DFS": { stack: [2], visit: [4] },
    "Dijkstra": { relax: [4], visit: [2] },
    "Topological Sort": { queue: [2], visit: [3] },
    "Prime Check": { compare: [2] },
    "Sieve of Eratosthenes": { visit: [2] },
    "GCD": { movePointer: [1] },
    "LCM": {},
    "Binary Exponentiation": { movePointer: [1], insert: [3] },
    "Modular Exponentiation": { movePointer: [1], insert: [3] },
    "nCr": { insert: [2, 3] },
    "Count Set Bits": { movePointer: [1] },
    "Is Power Of Two": { compare: [1] },
    "Single Number": { movePointer: [1], insert: [2] },
    "Generate Subsets": { insert: [1] },
  };

  for (const ev of events) {
    switch (ev.type) {
      case "compare": {
        const i = (ev as any).i;
        const j = (ev as any).j;
        const codeLine = algoName && codeMap[algoName] && codeMap[algoName].compare ? codeMap[algoName].compare : [];
        steps.push({
          description: `Compare index ${i} and ${j}`,
          highlight: [i, j].filter((x) => x >= 0),
          array: [...arrState],
          codeLine,
        });
        break;
      }
      case "swap": {
        const { i, j } = ev as any;
        [arrState[i], arrState[j]] = [arrState[j], arrState[i]];
        const codeLine = algoName && codeMap[algoName] && codeMap[algoName].swap ? codeMap[algoName].swap : [];
        steps.push({
          description: `Swap index ${i} and ${j}`,
          highlight: [i, j],
          array: [...arrState],
          codeLine,
        });
        break;
      }
      case "shift": {
        const { from, to } = ev as any;
        const val = arrState.splice(from, 1)[0];
        arrState.splice(to, 0, val);
        const codeLine = algoName && codeMap[algoName] && codeMap[algoName].shift ? codeMap[algoName].shift : [];
        steps.push({
          description: `Shift from ${from} to ${to}`,
          highlight: [from, to],
          array: [...arrState],
          codeLine,
        });
        break;
      }
      case "insert": {
        const { index, value } = ev as any;
        if (index >= 0) arrState.splice(index, 0, value);
        const codeLine = algoName && codeMap[algoName] && codeMap[algoName].insert ? codeMap[algoName].insert : [];
        steps.push({
          description: `Insert ${value} at ${index}`,
          highlight: index >= 0 ? [index] : [],
          array: [...arrState],
          codeLine,
        });
        break;
      }
      case "movePointer": {
        const { name, index } = ev as any;
        const obj: AlgorithmStep = {
          description: `Move pointer ${name} to ${index}`,
          highlight: [],
          array: [...arrState],
          codeLine: [],
        };
        // convey common pointer names used by visualizer
        if (name === "left") obj.left = index;
        if (name === "right") obj.right = index;
        if (name === "key" || name === "pivot") obj.pivot = index;
        // map to codeLine via codeMap if available
        const codeLine = algoName && codeMap[algoName] && codeMap[algoName].movePointer ? codeMap[algoName].movePointer : [];
        if (codeLine.length) obj.codeLine = codeLine;
        steps.push(obj);
        break;
      }
      case "visit": {
        const { nodeId } = ev as any;
        steps.push({
          description: `Visit ${nodeId}`,
          highlight: [],
          array: [...arrState],
          visited: typeof nodeId === "number" ? [nodeId] : [],
          codeLine: [],
        });
        break;
      }
      case "queue": {
        const { state } = ev as any;
        steps.push({
          description: `Queue updated`,
          highlight: [],
          array: [...arrState],
          queue: state as number[],
          codeLine: [],
        });
        break;
      }
      case "stack": {
        const { state } = ev as any;
        steps.push({
          description: `Stack updated`,
          highlight: [],
          array: [...arrState],
          stack: state as number[],
          codeLine: [],
        });
        break;
      }
      case "relax": {
        const { node, distance } = ev as any;
        steps.push({
          description: `Relax node ${node}, distance=${distance}`,
          highlight: [node],
          array: [...arrState],
          codeLine: [],
        });
        break;
      }
      case "found": {
        const { index, node } = ev as any;
        steps.push({
          description: `Found ${index ?? node}`,
          highlight: index !== undefined ? [index] : [],
          array: [...arrState],
          found: true,
          mid: index,
          codeLine: [],
        });
        break;
      }
      default:
        steps.push({ description: "Event", highlight: [], array: [...arrState], codeLine: [] });
    }
  }

  if (steps.length === 0) {
    steps.push({ description: "No steps generated", highlight: [], array: [...arrState], codeLine: [] });
  }

  return steps;
};

// Input generators (module scope) so top-level generators can reuse them
function createLinkedListFromArray(arr: number[]): Algo.ListNode | null {
  if (!arr || arr.length === 0) return null;
  let head: Algo.ListNode = { val: arr[0], next: null } as any;
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    const node: Algo.ListNode = { val: arr[i], next: null } as any;
    curr.next = node;
    curr = node;
  }
  return head;
}

function createTreeFromArray(arr: number[]): Algo.TreeNode | null {
  if (!arr || arr.length === 0) return null;
  const nodes = arr.map((v, i) => ({ id: i, val: v, left: null as any, right: null as any }));
  for (let i = 0; i < nodes.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < nodes.length) nodes[i].left = nodes[left];
    if (right < nodes.length) nodes[i].right = nodes[right];
  }
  return nodes[0];
}

function getInputForAlgorithm(name: string) {
  const defaultArr = [64, 34, 25, 12, 22, 11, 90];
  switch (name) {
    case "Binary Search":
      return { type: "array", data: [11, 12, 22, 25, 34, 64, 90] };
    case "BFS":
    case "DFS":
    case "Dijkstra":
    case "Topological Sort":
      return { type: "graph", data: [[1,3],[2,4],[],[4],[5,6],[],[]] };
    case "Reverse Linked List":
    case "Cycle Detection":
    case "Find Middle":
      return { type: "linkedlist", data: createLinkedListFromArray([1,2,3,4,5,6,7]) };
    case "In-Order DFS":
    case "Level Order BFS":
      return { type: "tree", data: createTreeFromArray([1,2,3,4,5,6,7]) };
    default:
      return { type: "array", data: defaultArr };
  }
}

// Generate steps by delegating to the algorithms module where possible
const generateFromAlgo = (name: string): AlgorithmStep[] => {
  const defaultArr = [64, 34, 25, 12, 22, 11, 90];
  try {
    switch (name) {
      case "Bubble Sort":
        return convertAlgoSteps(Algo.bubbleSort(defaultArr).steps, defaultArr);
      case "Selection Sort":
        return convertAlgoSteps(Algo.selectionSort(defaultArr).steps, defaultArr);
      case "Insertion Sort":
        return convertAlgoSteps(Algo.insertionSort(defaultArr).steps, defaultArr);
      case "Merge Sort":
        return convertAlgoSteps(Algo.mergeSort(defaultArr).steps, defaultArr);
      case "Quick Sort":
        return convertAlgoSteps(Algo.quickSort(defaultArr).steps, defaultArr);
      case "Linear Search":
        return convertAlgoSteps(Algo.linearSearch(defaultArr, 25).steps, defaultArr);
      case "Binary Search":
        return convertAlgoSteps(Algo.binarySearch([11, 12, 22, 25, 34, 64, 90], 25).steps, [11, 12, 22, 25, 34, 64, 90]);
      case "Reverse Linked List":
        return convertAlgoSteps(Algo.reverseLinkedList(createLinkedListFromArray([1,2,3,4,5,6,7])).steps, defaultArr, "Reverse Linked List");
      case "Cycle Detection":
        return convertAlgoSteps(Algo.detectCycle(createLinkedListFromArray([1,2,3,4,5,6,7])).steps, defaultArr, "Cycle Detection");
      case "Find Middle":
        return convertAlgoSteps(Algo.findMiddle(createLinkedListFromArray([1,2,3,4,5,6,7])).steps, defaultArr, "Find Middle");
      case "Two Sum":
        return convertAlgoSteps(Algo.twoSum(defaultArr, 36).steps, defaultArr);
      case "Subarray Sum Equals K":
        return convertAlgoSteps(Algo.subarraySumEqualsK(defaultArr, 58).steps, defaultArr);
      case "BFS":
        return convertAlgoSteps(Algo.bfsGraph([[1, 3], [2, 4], [], [4], [5, 6], [], []], 0).steps, defaultArr, "Level Order BFS");
      case "DFS":
        return convertAlgoSteps(Algo.dfsGraph([[1, 3], [2, 4], [], [4], [5, 6], [], []], 0).steps, defaultArr, "In-Order DFS");
      case "Dijkstra":
        return convertAlgoSteps(Algo.dijkstra([[{ to: 1, weight: 1 }], [{ to: 2, weight: 1 }], []], 0).steps, defaultArr, "Dijkstra");
      case "Topological Sort":
        return convertAlgoSteps(Algo.topologicalSort([[1], [2], []]).steps, defaultArr, "Topological Sort");
      case "Prime Check":
        return convertAlgoSteps(Algo.isPrime(97).steps, defaultArr as any, "Prime Check");
      case "Sieve of Eratosthenes":
        return convertAlgoSteps(Algo.sieve(30).steps, defaultArr as any, "Sieve of Eratosthenes");
      case "GCD":
        return convertAlgoSteps(Algo.gcd(48, 18).steps, defaultArr as any, "GCD");
      case "LCM":
        return convertAlgoSteps(Algo.lcm(12, 18).steps, defaultArr as any, "LCM");
      case "Binary Exponentiation":
        return convertAlgoSteps(Algo.binaryExp(2, 10).steps, defaultArr as any, "Binary Exponentiation");
      case "Modular Exponentiation":
        return convertAlgoSteps(Algo.modExp(2, 10, 1000).steps, defaultArr as any, "Modular Exponentiation");
      case "nCr":
        return convertAlgoSteps(Algo.nCr(5, 2).steps, defaultArr as any, "nCr");
      case "Count Set Bits":
        return convertAlgoSteps(Algo.countSetBits(29).steps, defaultArr as any, "Count Set Bits");
      case "Is Power Of Two":
        return convertAlgoSteps(Algo.isPowerOfTwo(16).steps, defaultArr as any, "Is Power Of Two");
      case "Single Number":
        return convertAlgoSteps(Algo.singleNumber([2,2,1,3,3]).steps, defaultArr as any, "Single Number");
      case "Generate Subsets":
        return convertAlgoSteps(Algo.generateSubsets([1,2,3]).steps, defaultArr as any, "Generate Subsets");
      default:
        return [];
    }
  } catch (err) {
    // If algo module call failed or isn't applicable, return empty steps
    return [];
  }
};

// Generate algorithm-specific steps
const generateBubbleSortSteps = (): AlgorithmStep[] => {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  
  steps.push({
    description: "Initial array - we'll compare adjacent elements and swap if needed",
    highlight: [],
    array: [...arr],
    sorted: [],
    codeLine: [0],
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({
        description: `Compare ${arr[j]} and ${arr[j + 1]}`,
        highlight: [j, j + 1],
        array: [...arr],
        sorted: [...sorted],
        codeLine: [2, 3],
      });
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          description: `${arr[j + 1]} > ${arr[j]}, swap them`,
          highlight: [j, j + 1],
          array: [...arr],
          sorted: [...sorted],
          codeLine: [3, 4],
        });
      } else {
        steps.push({
          description: `${arr[j]} ≤ ${arr[j + 1]}, no swap needed`,
          highlight: [j, j + 1],
          array: [...arr],
          sorted: [...sorted],
          codeLine: [3],
        });
      }
    }
    sorted.unshift(arr.length - 1 - i);
  }
  sorted.unshift(0);
  
  steps.push({
    description: "Array is now sorted!",
    highlight: [],
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [8],
  });

  return steps;
};

const generateQuickSortSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [64, 34, 25, 12, 22, 11, 90];
  
  steps.push({
    description: "Initial array - Quick Sort uses divide and conquer with a pivot",
    highlight: [],
    array: [...arr],
    sorted: [],
    codeLine: [0, 1],
  });

  const quickSort = (array: number[], low: number, high: number, sorted: number[]) => {
    if (low < high) {
      const pivot = array[high];
      steps.push({
        description: `Choose pivot: ${pivot} (last element)`,
        highlight: [high],
        array: [...array],
        pivot: high,
        sorted: [...sorted],
        codeLine: [2],
      });

      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        steps.push({
          description: `Compare ${array[j]} with pivot ${pivot}`,
          highlight: [j, high],
          array: [...array],
          pivot: high,
          sorted: [...sorted],
          codeLine: [4, 5],
        });
        
        if (array[j] < pivot) {
          i++;
          if (i !== j) {
            [array[i], array[j]] = [array[j], array[i]];
            steps.push({
              description: `${array[j]} < ${pivot}, swap to position ${i}`,
              highlight: [i, j],
              array: [...array],
              pivot: high,
              sorted: [...sorted],
              codeLine: [6],
            });
          }
        }
      }
      
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      const pivotIndex = i + 1;
      sorted.push(pivotIndex);
      
      steps.push({
        description: `Place pivot ${pivot} at correct position ${pivotIndex}`,
        highlight: [pivotIndex],
        array: [...array],
        sorted: [...sorted],
        codeLine: [9, 10],
      });

      quickSort(array, low, pivotIndex - 1, sorted);
      quickSort(array, pivotIndex + 1, high, sorted);
    } else if (low === high) {
      sorted.push(low);
    }
  };

  const sortedIndices: number[] = [];
  quickSort([...arr], 0, arr.length - 1, sortedIndices);
  
  steps.push({
    description: "Array is now sorted!",
    highlight: [],
    array: [11, 12, 22, 25, 34, 64, 90],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [14],
  });

  return steps;
};

const generateMergeSortSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Initial array - Merge Sort divides array into halves recursively",
    highlight: [],
    array: [64, 34, 25, 12, 22, 11, 90],
    sorted: [],
    codeLine: [0, 1],
  });

  steps.push({
    description: "Divide: Split array into [64, 34, 25] and [12, 22, 11, 90]",
    highlight: [0, 1, 2],
    array: [64, 34, 25, 12, 22, 11, 90],
    left: 0,
    right: 2,
    codeLine: [2, 3, 4],
  });

  steps.push({
    description: "Divide: Split [64, 34, 25] into [64] and [34, 25]",
    highlight: [0],
    array: [64, 34, 25, 12, 22, 11, 90],
    codeLine: [3],
  });

  steps.push({
    description: "Divide: Split [34, 25] into [34] and [25]",
    highlight: [1, 2],
    array: [64, 34, 25, 12, 22, 11, 90],
    codeLine: [3, 4],
  });

  steps.push({
    description: "Merge: Compare 34 and 25, 25 is smaller",
    highlight: [1, 2],
    array: [64, 34, 25, 12, 22, 11, 90],
    codeLine: [10, 11],
  });

  steps.push({
    description: "Merge: [25, 34] is now sorted",
    highlight: [1, 2],
    array: [64, 25, 34, 12, 22, 11, 90],
    codeLine: [12],
  });

  steps.push({
    description: "Merge: Compare 64 with [25, 34] - 25 < 64",
    highlight: [0, 1, 2],
    array: [64, 25, 34, 12, 22, 11, 90],
    codeLine: [11, 12],
  });

  steps.push({
    description: "Merge: [25, 34, 64] is now sorted",
    highlight: [0, 1, 2],
    array: [25, 34, 64, 12, 22, 11, 90],
    sorted: [0, 1, 2],
    codeLine: [16],
  });

  steps.push({
    description: "Now sort right half: [12, 22, 11, 90]",
    highlight: [3, 4, 5, 6],
    array: [25, 34, 64, 12, 22, 11, 90],
    codeLine: [4],
  });

  steps.push({
    description: "After sorting right half: [11, 12, 22, 90]",
    highlight: [3, 4, 5, 6],
    array: [25, 34, 64, 11, 12, 22, 90],
    sorted: [3, 4, 5, 6],
    codeLine: [5],
  });

  steps.push({
    description: "Final merge: Compare elements from both halves",
    highlight: [0, 3],
    array: [25, 34, 64, 11, 12, 22, 90],
    codeLine: [10, 11],
  });

  steps.push({
    description: "Array is now sorted!",
    highlight: [],
    array: [11, 12, 22, 25, 34, 64, 90],
    sorted: Array.from({ length: 7 }, (_, i) => i),
    codeLine: [16],
  });

  return steps;
};

const generateBinarySearchSteps = (): AlgorithmStep[] => {
  const arr = [11, 12, 22, 25, 34, 64, 90];
  const target = 25;
  const steps: AlgorithmStep[] = [];

  steps.push({
    description: `Sorted array - searching for ${target} using Binary Search`,
    highlight: [],
    array: arr,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [0, 1],
  });

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      description: `Check middle element at index ${mid}: value = ${arr[mid]}`,
      highlight: [mid],
      array: arr,
      left,
      right,
      mid,
      codeLine: [2, 3],
    });

    if (arr[mid] === target) {
      steps.push({
        description: `Found ${target} at index ${mid}!`,
        highlight: [mid],
        array: arr,
        found: true,
        mid,
        codeLine: [4, 5],
      });
      break;
    } else if (arr[mid] < target) {
      steps.push({
        description: `${arr[mid]} < ${target}, search right half`,
        highlight: Array.from({ length: right - mid }, (_, i) => mid + 1 + i),
        array: arr,
        left: mid + 1,
        right,
        codeLine: [7, 8],
      });
      left = mid + 1;
    } else {
      steps.push({
        description: `${arr[mid]} > ${target}, search left half`,
        highlight: Array.from({ length: mid - left }, (_, i) => left + i),
        array: arr,
        left,
        right: mid - 1,
        codeLine: [9, 10],
      });
      right = mid - 1;
    }
  }

  return steps;
};

const generateBFSSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Graph with 7 nodes - BFS explores level by level using a queue",
    highlight: [],
    visited: [],
    queue: [],
    codeLine: [0, 1, 2],
  });

  steps.push({
    description: "Start BFS from node 0, add to queue",
    highlight: [0],
    visited: [],
    queue: [0],
    current: 0,
    codeLine: [2],
  });

  steps.push({
    description: "Visit node 0, add neighbors (1, 3) to queue",
    highlight: [0],
    visited: [0],
    queue: [1, 3],
    current: 0,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Dequeue node 1, add unvisited neighbors (2, 4) to queue",
    highlight: [1],
    visited: [0, 1],
    queue: [3, 2, 4],
    current: 1,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Dequeue node 3, neighbor 4 already in queue",
    highlight: [3],
    visited: [0, 1, 3],
    queue: [2, 4],
    current: 3,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Dequeue node 2, no new neighbors",
    highlight: [2],
    visited: [0, 1, 3, 2],
    queue: [4],
    current: 2,
    codeLine: [4, 6],
  });

  steps.push({
    description: "Dequeue node 4, add unvisited neighbors (5, 6) to queue",
    highlight: [4],
    visited: [0, 1, 3, 2, 4],
    queue: [5, 6],
    current: 4,
    codeLine: [7, 8, 9],
  });

  steps.push({
    description: "Dequeue node 5, no new neighbors",
    highlight: [5],
    visited: [0, 1, 3, 2, 4, 5],
    queue: [6],
    current: 5,
    codeLine: [4, 6],
  });

  steps.push({
    description: "Dequeue node 6, no new neighbors",
    highlight: [6],
    visited: [0, 1, 3, 2, 4, 5, 6],
    queue: [],
    current: 6,
    codeLine: [4, 6],
  });

  steps.push({
    description: "BFS complete! Order: 0 → 1 → 3 → 2 → 4 → 5 → 6",
    highlight: [],
    visited: [0, 1, 3, 2, 4, 5, 6],
    queue: [],
    codeLine: [13],
  });

  return steps;
};

const generateDFSSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Graph with 7 nodes - DFS explores as deep as possible using a stack",
    highlight: [],
    visited: [],
    stack: [],
    codeLine: [0, 1, 2],
  });

  steps.push({
    description: "Start DFS from node 0, push to stack",
    highlight: [0],
    visited: [],
    stack: [0],
    current: 0,
    codeLine: [2],
  });

  steps.push({
    description: "Visit node 0, push unvisited neighbor 1 to stack",
    highlight: [0],
    visited: [0],
    stack: [1],
    current: 0,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Pop node 1, push unvisited neighbor 2 to stack",
    highlight: [1],
    visited: [0, 1],
    stack: [2, 4],
    current: 1,
    codeLine: [4, 6, 7, 8, 9],
  });

  steps.push({
    description: "Pop node 2, no unvisited neighbors",
    highlight: [2],
    visited: [0, 1, 2],
    stack: [4],
    current: 2,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Backtrack, pop node 4, push unvisited neighbors",
    highlight: [4],
    visited: [0, 1, 2, 4],
    stack: [5, 6, 3],
    current: 4,
    codeLine: [7, 8, 9],
  });

  steps.push({
    description: "Pop node 3, no new unvisited neighbors",
    highlight: [3],
    visited: [0, 1, 2, 4, 3],
    stack: [5, 6],
    current: 3,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Pop node 6, no unvisited neighbors",
    highlight: [6],
    visited: [0, 1, 2, 4, 3, 6],
    stack: [5],
    current: 6,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Pop node 5, no unvisited neighbors",
    highlight: [5],
    visited: [0, 1, 2, 4, 3, 6, 5],
    stack: [],
    current: 5,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "DFS complete! Order: 0 → 1 → 2 → 4 → 3 → 6 → 5",
    highlight: [],
    visited: [0, 1, 2, 4, 3, 6, 5],
    stack: [],
    codeLine: [13],
  });

  return steps;
};

const GraphVisualization = ({ step }: { step: AlgorithmStep }) => {
  const nodes = [
    { id: 0, x: 50, y: 30 },
    { id: 1, x: 150, y: 30 },
    { id: 2, x: 250, y: 30 },
    { id: 3, x: 50, y: 110 },
    { id: 4, x: 150, y: 110 },
    { id: 5, x: 250, y: 110 },
    { id: 6, x: 150, y: 190 },
  ];

  const edges = [
    [0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [4, 5], [4, 6]
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="320" height="220" className="mx-auto">
        {edges.map(([from, to], i) => (
          <line
            key={i}
            x1={nodes[from].x + 20}
            y1={nodes[from].y + 20}
            x2={nodes[to].x + 20}
            y2={nodes[to].y + 20}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            opacity="0.5"
          />
        ))}
        
        {nodes.map((node) => {
          const isVisited = step.visited?.includes(node.id);
          const isCurrent = step.current === node.id;
          const isHighlighted = step.highlight.includes(node.id);
          
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x + 20}
                cy={node.y + 20}
                r={20}
                fill={
                  isCurrent
                    ? "hsl(var(--primary))"
                    : isVisited
                    ? "hsl(var(--accent))"
                    : isHighlighted
                    ? "hsl(var(--primary) / 0.5)"
                    : "hsl(var(--secondary))"
                }
                stroke={isCurrent ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="2"
                animate={{ scale: isCurrent ? 1.1 : 1 }}
              />
              <text
                x={node.x + 20}
                y={node.y + 25}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize="14"
                fontWeight="bold"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
      
      <div className="flex gap-4 text-sm">
        {step.queue !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Queue:</span>
            <div className="flex gap-1">
              {step.queue.length > 0 ? step.queue.map((n, i) => (
                <span key={i} className="px-2 py-1 bg-primary/20 rounded text-primary">
                  {n}
                </span>
              )) : <span className="text-muted-foreground">empty</span>}
            </div>
          </div>
        )}
        {step.stack !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Stack:</span>
            <div className="flex gap-1">
              {step.stack.length > 0 ? step.stack.map((n, i) => (
                <span key={i} className="px-2 py-1 bg-accent/20 rounded text-accent">
                  {n}
                </span>
              )) : <span className="text-muted-foreground">empty</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LinkedListVisualization = ({ step, head }: { step: AlgorithmStep; head: Algo.ListNode | null }) => {
  // build linear array of nodes from head
  const nodes: Array<{ id: number; val: number }> = [];
  let curr = head;
  let idx = 0;
  while (curr) {
    nodes.push({ id: idx, val: curr.val as number });
    curr = curr.next as any;
    idx++;
  }

  return (
    <div className="flex items-center gap-3">
      {nodes.map((n, i) => {
        const isHighlighted = step.highlight.includes(n.val) || step.visited?.includes(n.val) || step.current === n.val || step.highlight.includes(i);
        return (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`px-3 py-2 rounded border-2 ${isHighlighted ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/50 text-muted-foreground border-border"}`}
              animate={{ scale: isHighlighted ? 1.08 : 1, y: isHighlighted ? -6 : 0 }}
            >
              {n.val}
            </motion.div>
            {i < nodes.length - 1 && (
              <svg width="24" height="16" viewBox="0 0 24 16" className="text-muted-foreground">
                <line x1="0" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="2" />
                <polyline points="12,2 18,8 12,14" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

const TreeVisualization = ({ step, root }: { step: AlgorithmStep; root: Algo.TreeNode | null }) => {
  if (!root) return <div>No tree</div>;
  // simple BFS layout positions
  const nodes: Array<{ id: number | string; x: number; y: number; val: number }> = [];
  const q: Array<{ node: any; x: number; y: number }> = [{ node: root, x: 160, y: 20 }];
  while (q.length) {
    const { node, x, y } = q.shift()!;
    nodes.push({ id: node.id ?? node.val, x, y, val: node.val });
    if (node.left) q.push({ node: node.left, x: x - 80, y: y + 80 });
    if (node.right) q.push({ node: node.right, x: x + 80, y: y + 80 });
  }

  return (
    <svg width="360" height="260">
      {nodes.map((n, i) => (
        <g key={i}>
          {/* draw edge to children if they exist */}
          {i >= 0 && (() => {
            const node = nodes[i];
            // find children indices by id mapping
            const left = nodes.findIndex((x) => x.id === (node.id as number) * 2 + 1);
            const right = nodes.findIndex((x) => x.id === (node.id as number) * 2 + 2);
            return (
              <g>
                {left !== -1 && <line x1={node.x} y1={node.y + 20} x2={nodes[left].x} y2={nodes[left].y - 20} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />}
                {right !== -1 && <line x1={node.x} y1={node.y + 20} x2={nodes[right].x} y2={nodes[right].y - 20} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />}
              </g>
            );
          })()}
          <motion.circle cx={n.x} cy={n.y} r={20} fill={step.visited?.includes(n.id as any) ? "hsl(var(--accent))" : "hsl(var(--secondary))"} stroke="hsl(var(--border))" animate={{ scale: step.visited?.includes(n.id as any) ? 1.08 : 1 }} />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fill="hsl(var(--foreground))">{n.val}</text>
        </g>
      ))}
    </svg>
  );
};

const CodePanel = ({ 
  code, 
  highlightedLines 
}: { 
  code: string[]; 
  highlightedLines: number[];
}) => {
  
  return (
    <div className="bg-card/80 border border-border rounded-lg overflow-hidden" role="region" aria-labelledby="pseudocode-heading">
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
        <Code className="w-4 h-4 text-primary" />
        <span id="pseudocode-heading" className="text-sm font-medium">Pseudocode</span>
      </div>
      <div className="p-4 overflow-x-auto max-h-[300px] overflow-y-auto">
        <pre className="text-sm font-mono">
          {code.map((line, i) => {
            const isHighlighted = highlightedLines.includes(i);
            return (
              <motion.div
                key={i}
                className={`px-2 py-0.5 rounded transition-all ${
                  isHighlighted 
                    ? "bg-primary/20 border-l-2 border-primary text-foreground" 
                    : "text-muted-foreground"
                }`}
                animate={{
                  backgroundColor: isHighlighted ? "hsl(var(--primary) / 0.2)" : "transparent",
                }}
              >
                <span className="inline-block w-6 text-right mr-3 text-muted-foreground/50 select-none">
                  {i + 1}
                </span>
                <span className={isHighlighted ? "text-foreground" : ""}>
                  {line || " "}
                </span>
              </motion.div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

export const Visualizer = () => {
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5x to 3x
  const [selectedApproach, setSelectedApproach] = useState<string>("Default");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [epoch, setEpoch] = useState(0); // bump to force re-generation of steps/inputs
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = useMemo(() => {
    // First try the algorithms module adapter; fallback to built-in generators
    const modSteps = generateFromAlgo(selectedAlgo);
    if (modSteps && modSteps.length > 0) return modSteps;
    switch (selectedAlgo) {
      case "Bubble Sort":
        return generateBubbleSortSteps();
      case "Quick Sort":
        return generateQuickSortSteps();
      case "Merge Sort":
        return generateMergeSortSteps();
      case "Binary Search":
        return generateBinarySearchSteps();
      case "BFS":
        return generateBFSSteps();
      case "DFS":
        return generateDFSSteps();
      default:
        return generateBubbleSortSteps();
    }
  }, [selectedAlgo, epoch]);

  // determine visualization mode for selected algorithm
  const getVisualType = (name: string) => {
    if (algorithmSections["Graphs"].includes(name)) return "graph";
    if (algorithmSections["Linked List"].includes(name)) return "linkedlist";
    if (algorithmSections["Tree"].includes(name)) return "tree";
    return "array";
  };

  const visualType = getVisualType(selectedAlgo);

  // input generators for each visual type (hoisted as functions so they are available earlier)
  // input helpers are provided at module scope

  const currentInput = useMemo(() => getInputForAlgorithm(selectedAlgo), [selectedAlgo, epoch]);

  const currentStep = steps[step] || steps[0];
  const isGraphAlgo = selectedAlgo === "BFS" || selectedAlgo === "DFS";

  // reset approach when algorithm changes
  useEffect(() => {
    const names = Object.keys(algorithmCode[selectedAlgo] || {});
    setSelectedApproach(names[0] || "Default");
  }, [selectedAlgo]);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      const delay = 1000 / speed;
      intervalRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  // Keyboard shortcuts: Space toggles play/pause, arrows navigate, 'r' resets
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
      if (e.key === "ArrowRight") {
        setStep((s) => Math.min(steps.length - 1, s + 1));
        setIsPlaying(false);
      }
      if (e.key === "ArrowLeft") {
        setStep((s) => Math.max(0, s - 1));
        setIsPlaying(false);
      }
      if (e.key.toLowerCase() === "r") {
        handleReset();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [steps.length]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
    // force re-generate steps and inputs to ensure mutated structures are recreated
    setEpoch((e) => e + 1);
  };

  const handleAlgoChange = (algo: string) => {
    setSelectedAlgo(algo);
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <section id="visualizer" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive <span className="gradient-text-accent">Visualizer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch algorithms come to life with step-by-step visual explanations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Algorithm Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-4 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Select Algorithm</h3>
            <div className="space-y-4">
              {Object.entries(algorithmSections).map(([section, list]) => {
                const isOpen = openSection === section;
                return (
                  <div key={section}>
                    <button
                      onClick={() => setOpenSection((prev) => (prev === section ? null : section))}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between px-2 py-1 rounded text-xs font-semibold text-muted-foreground mb-2 hover:bg-secondary/20"
                    >
                      <span>{section}</span>
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`${section}-content`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 px-1 pb-2 pt-1">
                            {list.map((algo) => (
                              <button
                                key={algo}
                                onClick={() => handleAlgoChange(algo)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                                  selectedAlgo === algo
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary/50 hover:bg-secondary text-foreground"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{algo}</span>
                                  {selectedAlgo === algo && <ChevronRight className="w-4 h-4" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Visualization Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="visualizer-board"
            className="lg:col-span-2 glass-card p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedAlgo}</h3>
              <div className="flex items-center gap-4">
                <ThemeToggle scope="element" elementId="visualizer-board" />
                {/* Speed Control */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Speed:</span>
                  <Slider
                    value={[speed]}
                    onValueChange={([v]) => setSpeed(v)}
                    min={0.5}
                    max={3}
                    step={0.5}
                    className="w-20"
                  />
                  <span className="text-xs font-mono w-8">{speed}x</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={handleReset} aria-label="Reset visualization" title="Reset">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-pressed={isPlaying}
                    aria-label={isPlaying ? "Pause animation" : "Play animation"}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={isPlaying}
                    aria-label="Advance one step"
                    title="Next step"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Visualization */}
            <div className="min-h-[200px] flex items-center justify-center mb-6">
              {visualType === "graph" && (
                <GraphVisualization step={currentStep} />
              )}

              {visualType === "linkedlist" && (
                <LinkedListVisualization step={currentStep} head={(currentInput.data as any) || null} />
              )}

              {visualType === "tree" && (
                <TreeVisualization step={currentStep} root={(currentInput.data as any) || null} />
              )}

              {visualType === "array" && (
                <div className="flex justify-center gap-2 flex-wrap">
                  {(currentStep.array || (currentInput.type === "array" ? (currentInput.data as number[]) : [64, 34, 25, 12, 22, 11, 90])).map((val, i) => {
                    const isHighlighted = currentStep.highlight.includes(i);
                    const isSorted = currentStep.sorted?.includes(i);
                    const isPivot = currentStep.pivot === i;
                    const isFound = currentStep.found && currentStep.mid === i;
                    const isInRange = currentStep.left !== undefined && 
                      currentStep.right !== undefined && 
                      i >= currentStep.left && 
                      i <= currentStep.right;
                    
                    return (
                      <motion.div
                        key={i}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold text-sm border-2 transition-all ${
                          isFound
                            ? "bg-green-500 border-green-400 text-white"
                            : isPivot
                            ? "bg-accent border-accent text-accent-foreground"
                            : isSorted
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : isHighlighted
                            ? "bg-primary border-primary text-primary-foreground glow-primary"
                            : isInRange
                            ? "bg-primary/20 border-primary/50 text-foreground"
                            : "bg-secondary/50 border-border text-muted-foreground"
                        }`}
                        animate={{
                          scale: isHighlighted || isPivot || isFound ? 1.1 : 1,
                          y: isHighlighted ? -5 : 0,
                        }}
                      >
                        {val}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step description (announced to assistive tech) */}
            <div className="bg-secondary/50 rounded-lg p-3 mb-4">
              <p className="text-xs font-mono text-center" aria-live="polite" aria-atomic="true" role="status">
                Step {step + 1}/{steps.length}: {currentStep.description}
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                >
                  Prev
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                  disabled={step === steps.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Code Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Approach selector + pseudocode panel */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <label htmlFor="approach-select" className="text-sm text-muted-foreground">Pseudocode</label>
              <div>
                <select
                  id="approach-select"
                  aria-label="Select pseudocode approach"
                  value={selectedApproach}
                  onChange={(e) => setSelectedApproach(e.target.value)}
                  className="bg-secondary/50 border border-border rounded px-2 py-1 text-sm"
                >
                  {(Object.keys(algorithmCode[selectedAlgo] || {})).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            <CodePanel
              code={(algorithmCode[selectedAlgo] && algorithmCode[selectedAlgo][selectedApproach]) || (algorithmCode[selectedAlgo] && algorithmCode[selectedAlgo].Default) || []}
              highlightedLines={currentStep.codeLine || []}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
