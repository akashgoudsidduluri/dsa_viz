import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Algorithm sections
const algorithmSections: Record<string, string[]> = {
  "Sorting": ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
  "Searching": ["Linear Search", "Binary Search"],
  "Graphs": ["BFS", "DFS"],
  "Linked List": ["Reverse Linked List", "Cycle Detection", "Find Middle"],
  "Tree": ["Pre-Order", "In-Order", "Post-Order", "Level Order"],
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
  pointers?: { slow?: number; fast?: number; prev?: number; curr?: number };
  // Linked list "next" pointers represented as indices (null = end)
  links?: Array<number | null>;
};

// Algorithm code snippets
const algorithmCode: Record<string, string[]> = {
  "Bubble Sort": [
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
  "Selection Sort": [
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
  "Insertion Sort": [
    "function insertionSort(arr) {",
    "  for i from 1 to n-1 {",
    "    key = arr[i]",
    "    j = i - 1",
    "    while j >= 0 and arr[j] > key {",
    "      arr[j+1] = arr[j]  // shift right",
    "      j = j - 1",
    "    }",
    "    arr[j+1] = key  // insert key",
    "  }",
    "}",
  ],
  "Merge Sort": [
    "function mergeSort(arr, l, r) {",
    "  if (l >= r) return;",
    "  mid = (l + r) / 2;",
    "  mergeSort(arr, l, mid);",
    "  mergeSort(arr, mid+1, r);",
    "  merge(arr, l, mid, r);",
    "}",
    "",
    "function merge(arr, l, m, r) {",
    "  // Compare elements from left and right",
    "  // Place smaller element first",
    "  // Copy remaining elements",
    "}",
  ],
  "Quick Sort": [
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
  "Linear Search": [
    "function linearSearch(arr, target) {",
    "  for i from 0 to n-1 {",
    "    if arr[i] == target",
    "      return i  // found!",
    "  }",
    "  return -1  // not found",
    "}",
  ],
  "Binary Search": [
    "function binarySearch(arr, target) {",
    "  left = 0, right = n - 1;",
    "  while (left <= right) {",
    "    mid = (left + right) / 2;",
    "    if (arr[mid] == target)",
    "      return mid;  // Found!",
    "    else if (arr[mid] < target)",
    "      left = mid + 1;",
    "    else",
    "      right = mid - 1;",
    "  }",
    "  return -1;",
    "}",
  ],
  "BFS": [
    "function BFS(graph, start) {",
    "  visited = new Set();",
    "  queue = [start];",
    "  while (queue.length > 0) {",
    "    node = queue.shift();",
    "    if (visited.has(node)) continue;",
    "    visited.add(node);",
    "    for (neighbor of graph[node]) {",
    "      if (!visited.has(neighbor))",
    "        queue.push(neighbor);",
    "    }",
    "  }",
    "}",
  ],
  "DFS": [
    "function DFS(graph, start) {",
    "  visited = new Set();",
    "  stack = [start];",
    "  while (stack.length > 0) {",
    "    node = stack.pop();",
    "    if (visited.has(node)) continue;",
    "    visited.add(node);",
    "    for (neighbor of graph[node]) {",
    "      if (!visited.has(neighbor))",
    "        stack.push(neighbor);",
    "    }",
    "  }",
    "}",
  ],
  "Reverse Linked List": [
    "function reverseList(head) {",
    "  prev = null, curr = head;",
    "  while (curr != null) {",
    "    next = curr.next;",
    "    curr.next = prev;  // reverse pointer",
    "    prev = curr;",
    "    curr = next;",
    "  }",
    "  return prev;",
    "}",
  ],
  "Cycle Detection": [
    "function hasCycle(head) {",
    "  slow = fast = head;",
    "  while (fast && fast.next) {",
    "    slow = slow.next;",
    "    fast = fast.next.next;",
    "    if (slow == fast)",
    "      return true;  // Cycle found!",
    "  }",
    "  return false;",
    "}",
  ],
  "Find Middle": [
    "function findMiddle(head) {",
    "  slow = fast = head;",
    "  while (fast && fast.next) {",
    "    slow = slow.next;      // 1 step",
    "    fast = fast.next.next; // 2 steps",
    "  }",
    "  return slow;  // Middle node",
    "}",
  ],
  "Pre-Order": [
    "function preorder(node) {",
    "  if (!node) return;",
    "  visit(node);      // Root first",
    "  preorder(node.left);",
    "  preorder(node.right);",
    "}",
  ],
  "In-Order": [
    "function inorder(node) {",
    "  if (!node) return;",
    "  inorder(node.left);",
    "  visit(node);      // Root middle",
    "  inorder(node.right);",
    "}",
  ],
  "Post-Order": [
    "function postorder(node) {",
    "  if (!node) return;",
    "  postorder(node.left);",
    "  postorder(node.right);",
    "  visit(node);      // Root last",
    "}",
  ],
  "Level Order": [
    "function levelOrder(root) {",
    "  if (!root) return;",
    "  queue = [root];",
    "  while (queue not empty) {",
    "    node = queue.shift();",
    "    visit(node);",
    "    if (node.left) queue.push(node.left);",
    "    if (node.right) queue.push(node.right);",
    "  }",
    "}",
  ],
};

// Step generators
const generateBubbleSortSteps = (): AlgorithmStep[] => {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  
  steps.push({
    description: "Starting Bubble Sort: Compare adjacent pairs and swap if left > right",
    highlight: [],
    array: [...arr],
    sorted: [],
    codeLine: [0],
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({
        description: `Compare arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}`,
        highlight: [j, j + 1],
        array: [...arr],
        sorted: [...sorted],
        codeLine: [2, 3],
      });
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          description: `Swap! ${arr[j + 1]} > ${arr[j]}, positions swapped`,
          highlight: [j, j + 1],
          array: [...arr],
          sorted: [...sorted],
          codeLine: [4],
        });
      }
    }
    sorted.unshift(arr.length - 1 - i);
  }
  sorted.unshift(0);
  
  steps.push({
    description: "Bubble Sort complete! Array is sorted",
    highlight: [],
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [8, 9],
  });

  return steps;
};

const generateSelectionSortSteps = (): AlgorithmStep[] => {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  
  steps.push({
    description: "Starting Selection Sort: Find minimum and swap to front",
    highlight: [],
    array: [...arr],
    sorted: [],
    codeLine: [0],
  });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    steps.push({
      description: `Finding minimum from index ${i} onwards`,
      highlight: [i],
      array: [...arr],
      sorted: [...sorted],
      codeLine: [2],
    });
    
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        description: `Compare arr[${minIdx}]=${arr[minIdx]} with arr[${j}]=${arr[j]}`,
        highlight: [minIdx, j],
        array: [...arr],
        sorted: [...sorted],
        codeLine: [3, 4],
      });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        description: `Swap arr[${i}] with arr[${minIdx}] (minimum found)`,
        highlight: [i, minIdx],
        array: [...arr],
        sorted: [...sorted],
        codeLine: [6],
      });
    }
    sorted.push(i);
  }
  sorted.push(arr.length - 1);
  
  steps.push({
    description: "Selection Sort complete!",
    highlight: [],
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [8, 9],
  });

  return steps;
};

const generateInsertionSortSteps = (): AlgorithmStep[] => {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Starting Insertion Sort: Build sorted portion from left",
    highlight: [],
    array: [...arr],
    sorted: [0],
    codeLine: [0],
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    steps.push({
      description: `Taking key=${key} at index ${i} to insert into sorted portion`,
      highlight: [i],
      array: [...arr],
      sorted: Array.from({ length: i }, (_, k) => k),
      pivot: i,
      codeLine: [2, 3],
    });
    
    // Find the correct position for key by shifting larger elements
    let insertPos = i;
    while (j >= 0 && arr[j] > key) {
      steps.push({
        description: `arr[${j}]=${arr[j]} > ${key}, will shift right`,
        highlight: [j, j + 1],
        array: [...arr],
        sorted: Array.from({ length: i }, (_, k) => k),
        codeLine: [4, 5],
      });
      arr[j + 1] = arr[j];
      insertPos = j;
      steps.push({
        description: `Shifted ${arr[j + 1]} from position ${j} to ${j + 1}`,
        highlight: [j + 1],
        array: [...arr],
        sorted: Array.from({ length: i }, (_, k) => k),
        codeLine: [5],
      });
      j--;
    }
    
    // Insert the key at the correct position
    arr[insertPos] = key;
    steps.push({
      description: `Inserted key ${key} at position ${insertPos}`,
      highlight: [insertPos],
      array: [...arr],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      codeLine: [8],
    });
  }
  
  steps.push({
    description: "Insertion Sort complete!",
    highlight: [],
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [9],
  });

  return steps;
};

const generateMergeSortSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [64, 34, 25, 12, 22, 11, 90];

  const push = (partial: Omit<AlgorithmStep, "array" | "highlight"> & { highlight?: number[] }) => {
    steps.push({
      highlight: partial.highlight ?? [],
      array: [...arr],
      ...partial,
    });
  };

  push({
    description: "Starting Merge Sort: Split array, then merge sorted halves",
    codeLine: [0, 1, 2],
  });

  const merge = (l: number, m: number, r: number) => {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    let i = 0;
    let j = 0;
    let k = l;

    push({
      description: `Merge ranges [${l}..${m}] and [${m + 1}..${r}]`,
      highlight: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
      left: l,
      right: r,
      codeLine: [8, 9],
    });

    while (i < left.length && j < right.length) {
      const leftIdx = l + i;
      const rightIdx = m + 1 + j;
      push({
        description: `Compare ${left[i]} and ${right[j]}`,
        highlight: [leftIdx, rightIdx],
        codeLine: [9],
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        push({
          description: `Write ${left[i]} at index ${k}`,
          highlight: [k],
          codeLine: [9],
        });
        i++;
      } else {
        arr[k] = right[j];
        push({
          description: `Write ${right[j]} at index ${k}`,
          highlight: [k],
          codeLine: [9],
        });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      push({
        description: `Copy remaining ${left[i]} to index ${k}`,
        highlight: [k],
        codeLine: [11],
      });
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      push({
        description: `Copy remaining ${right[j]} to index ${k}`,
        highlight: [k],
        codeLine: [11],
      });
      j++;
      k++;
    }

    push({
      description: `Merged segment [${l}..${r}] is now sorted`,
      highlight: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
      codeLine: [5],
    });
  };

  const sort = (l: number, r: number) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    push({
      description: `Split range [${l}..${r}] at mid=${m}`,
      highlight: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
      left: l,
      right: r,
      mid: m,
      codeLine: [0, 1, 2, 3],
    });
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  };

  sort(0, arr.length - 1);

  push({
    description: "Merge Sort complete! Array is sorted.",
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    highlight: [],
    codeLine: [6],
  });

  return steps;
};

const generateQuickSortSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const sortedSet = new Set<number>();

  const push = (partial: Omit<AlgorithmStep, "array" | "highlight"> & { highlight?: number[] }) => {
    steps.push({
      highlight: partial.highlight ?? [],
      array: [...arr],
      sorted: partial.sorted ?? Array.from(sortedSet),
      ...partial,
    });
  };

  push({
    description: "Starting Quick Sort: partition around a pivot and recurse",
    codeLine: [0, 1],
  });

  const partition = (low: number, high: number) => {
    const pivotVal = arr[high];

    push({
      description: `Choose pivot = ${pivotVal} at index ${high}`,
      highlight: [high],
      pivot: high,
      codeLine: [2],
    });

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      push({
        description: `Compare arr[${j}]=${arr[j]} with pivot ${pivotVal}`,
        highlight: [j, high],
        pivot: high,
        left: low,
        right: high,
        codeLine: [4, 5],
      });

      if (arr[j] < pivotVal) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          push({
            description: `Swap: move ${arr[i]} left of pivot region`,
            highlight: [i, j],
            pivot: high,
            codeLine: [5],
          });
        }
      }
    }

    // Place pivot in its final position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    push({
      description: `Place pivot ${pivotVal} at its final index ${i + 1}`,
      highlight: [i + 1, high],
      pivot: i + 1,
      codeLine: [9],
    });

    return i + 1;
  };

  const quickSort = (low: number, high: number) => {
    if (low > high) return;
    if (low === high) {
      sortedSet.add(low);
      push({
        description: `Single element at index ${low} is sorted`,
        highlight: [low],
        codeLine: [0],
      });
      return;
    }

    const pi = partition(low, high);
    sortedSet.add(pi);

    push({
      description: `Pivot fixed at index ${pi}. Recurse left and right.`,
      highlight: [pi],
      pivot: pi,
      codeLine: [10, 11],
    });

    quickSort(low, pi - 1);
    quickSort(pi + 1, high);
  };

  quickSort(0, arr.length - 1);

  push({
    description: "Quick Sort complete! Array is sorted.",
    highlight: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    codeLine: [14],
  });

  return steps;
};

const generateLinearSearchSteps = (): AlgorithmStep[] => {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  const target = 22;
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: `Linear Search: Find ${target} by checking each element`,
    highlight: [],
    array: arr,
    codeLine: [0],
  });

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      steps.push({
        description: `Found! arr[${i}] = ${target}`,
        highlight: [i],
        array: arr,
        found: true,
        mid: i,
        codeLine: [2, 3],
      });
      break;
    } else {
      steps.push({
        description: `arr[${i}] = ${arr[i]} ≠ ${target}, continue`,
        highlight: [i],
        array: arr,
        codeLine: [1, 2],
      });
    }
  }

  return steps;
};

const generateBinarySearchSteps = (): AlgorithmStep[] => {
  // Use sorted array, target at position that requires full traversal
  const arr = [11, 12, 22, 25, 34, 64, 90];
  const target = 90; // Target at the end to show more steps
  const steps: AlgorithmStep[] = [];

  steps.push({
    description: `Binary Search: Find ${target} in sorted array by halving search space`,
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
      description: `Search [${left}..${right}], mid=${mid}, arr[${mid}]=${arr[mid]}`,
      highlight: [mid],
      array: arr,
      left,
      right,
      mid,
      codeLine: [2, 3],
    });

    if (arr[mid] === target) {
      steps.push({
        description: `Found! arr[${mid}] = ${target}`,
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
        codeLine: [6, 7],
      });
      left = mid + 1;
    } else {
      steps.push({
        description: `${arr[mid]} > ${target}, search left half`,
        highlight: Array.from({ length: mid - left }, (_, i) => left + i),
        array: arr,
        left,
        right: mid - 1,
        codeLine: [8, 9],
      });
      right = mid - 1;
    }
  }

  return steps;
};

const generateBFSSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "BFS: Explore level by level using a Queue (FIFO)",
    highlight: [],
    visited: [],
    queue: [],
    codeLine: [0, 1],
  });

  steps.push({
    description: "Start from node 0, add to queue",
    highlight: [0],
    visited: [],
    queue: [0],
    current: 0,
    codeLine: [2],
  });

  steps.push({
    description: "Dequeue 0, mark visited, add neighbors 1, 2 to queue",
    highlight: [0],
    visited: [0],
    queue: [1, 2],
    current: 0,
    codeLine: [4, 5, 6, 7, 8, 9],
  });

  steps.push({
    description: "Dequeue 1, mark visited, add neighbors 3, 4 to queue",
    highlight: [1],
    visited: [0, 1],
    queue: [2, 3, 4],
    current: 1,
    codeLine: [4, 5, 6, 7, 8, 9],
  });

  steps.push({
    description: "Dequeue 2, mark visited, add neighbors 5, 6 to queue",
    highlight: [2],
    visited: [0, 1, 2],
    queue: [3, 4, 5, 6],
    current: 2,
    codeLine: [4, 5, 6, 7, 8, 9],
  });

  steps.push({
    description: "Dequeue 3, mark visited, no new neighbors",
    highlight: [3],
    visited: [0, 1, 2, 3],
    queue: [4, 5, 6],
    current: 3,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Dequeue 4, mark visited, no new neighbors",
    highlight: [4],
    visited: [0, 1, 2, 3, 4],
    queue: [5, 6],
    current: 4,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Dequeue 5, mark visited",
    highlight: [5],
    visited: [0, 1, 2, 3, 4, 5],
    queue: [6],
    current: 5,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Dequeue 6, mark visited, queue empty",
    highlight: [6],
    visited: [0, 1, 2, 3, 4, 5, 6],
    queue: [],
    current: 6,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "BFS Complete! Order: 0→1→2→3→4→5→6 (level by level)",
    highlight: [],
    visited: [0, 1, 2, 3, 4, 5, 6],
    queue: [],
    codeLine: [12],
  });

  return steps;
};

const generateDFSSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "DFS: Go deep before backtracking using a Stack (LIFO)",
    highlight: [],
    visited: [],
    stack: [],
    codeLine: [0, 1],
  });

  steps.push({
    description: "Start from node 0, push to stack",
    highlight: [0],
    visited: [],
    stack: [0],
    current: 0,
    codeLine: [2],
  });

  steps.push({
    description: "Pop 0, mark visited, push neighbors 2, 1 to stack",
    highlight: [0],
    visited: [0],
    stack: [2, 1],
    current: 0,
    codeLine: [4, 5, 6, 7, 8, 9],
  });

  steps.push({
    description: "Pop 1, mark visited, push neighbors 4, 3 to stack",
    highlight: [1],
    visited: [0, 1],
    stack: [2, 4, 3],
    current: 1,
    codeLine: [4, 5, 6, 7, 8, 9],
  });

  steps.push({
    description: "Pop 3, mark visited (leaf node)",
    highlight: [3],
    visited: [0, 1, 3],
    stack: [2, 4],
    current: 3,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Pop 4, mark visited (leaf node)",
    highlight: [4],
    visited: [0, 1, 3, 4],
    stack: [2],
    current: 4,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Pop 2, mark visited, push neighbors 6, 5 to stack",
    highlight: [2],
    visited: [0, 1, 3, 4, 2],
    stack: [6, 5],
    current: 2,
    codeLine: [4, 5, 6, 7, 8, 9],
  });

  steps.push({
    description: "Pop 5, mark visited",
    highlight: [5],
    visited: [0, 1, 3, 4, 2, 5],
    stack: [6],
    current: 5,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "Pop 6, mark visited, stack empty",
    highlight: [6],
    visited: [0, 1, 3, 4, 2, 5, 6],
    stack: [],
    current: 6,
    codeLine: [4, 5, 6],
  });

  steps.push({
    description: "DFS Complete! Order: 0→1→3→4→2→5→6 (depth first)",
    highlight: [],
    visited: [0, 1, 3, 4, 2, 5, 6],
    stack: [],
    codeLine: [12],
  });

  return steps;
};

const generateReverseLinkedListSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const nodes = [1, 2, 3, 4, 5, 6, 7];

  // links[i] = index of next node (null = end)
  const links: Array<number | null> = nodes.map((_, i) => (i === nodes.length - 1 ? null : i + 1));

  const push = (partial: Omit<AlgorithmStep, "links"> & { links?: Array<number | null> }) => {
    steps.push({
      links: partial.links ?? [...links],
      ...partial,
    });
  };

  push({
    description: "Reverse Linked List: reverse pointers one-by-one (prev, curr, next)",
    highlight: [],
    pointers: { prev: -1, curr: 0 },
    codeLine: [0, 1],
  });

  let prev: number | null = null;
  let curr: number | null = 0;

  while (curr !== null) {
    const next = links[curr];

    push({
      description: `Save next of ${nodes[curr]} (next = ${next === null ? "null" : nodes[next]})`,
      highlight: [curr],
      pointers: { prev: prev ?? -1, curr },
      codeLine: [3],
    });

    // Reverse pointer
    links[curr] = prev;

    push({
      description: `Reverse: ${nodes[curr]}.next → ${prev === null ? "null" : nodes[prev]}`,
      highlight: [curr],
      pointers: { prev: prev ?? -1, curr },
      codeLine: [4],
    });

    prev = curr;
    curr = next;

    push({
      description: `Move pointers: prev=${prev === null ? "null" : nodes[prev]}, curr=${curr === null ? "null" : nodes[curr]}`,
      highlight: prev === null ? [] : [prev],
      pointers: { prev: prev ?? -1, curr: curr ?? -1 },
      codeLine: [5, 6],
    });
  }

  push({
    description: "Reversal complete! Head is now 7 (list points left)",
    highlight: [],
    pointers: { prev: prev ?? -1, curr: -1 },
    codeLine: [8],
  });

  return steps;
};

const generateCycleDetectionSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  // Cycle list: 1→2→3→4→5→3
  const links: Array<number | null> = [1, 2, 3, 4, 2];

  steps.push({
    description: "Cycle Detection (Floyd): slow=1 step, fast=2 steps",
    highlight: [],
    pointers: { slow: 0, fast: 0 },
    links: [...links],
    codeLine: [0, 1],
  });

  const push = (partial: Omit<AlgorithmStep, "links">) => {
    steps.push({
      links: [...links],
      ...partial,
    });
  };

  // slow=1, fast=2
  push({
    description: "Step 1: slow→2, fast→3",
    highlight: [1, 2],
    pointers: { slow: 1, fast: 2 },
    codeLine: [3, 4],
  });

  // slow=2, fast=4
  push({
    description: "Step 2: slow→3, fast→5",
    highlight: [2, 4],
    pointers: { slow: 2, fast: 4 },
    codeLine: [3, 4],
  });

  // slow=3, fast=3 (meeting)
  push({
    description: "Step 3: slow→4, fast→4 (cycle causes meeting)",
    highlight: [3],
    pointers: { slow: 3, fast: 3 },
    codeLine: [3, 4],
  });

  push({
    description: "Cycle detected! slow == fast",
    highlight: [3],
    pointers: { slow: 3, fast: 3 },
    found: true,
    codeLine: [5, 6],
  });

  return steps;
};

const generateFindMiddleSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Find Middle: slow moves 1 step, fast moves 2 steps",
    highlight: [],
    pointers: { slow: 0, fast: 0 },
    codeLine: [0, 1],
  });

  // For 7 nodes: 1,2,3,4,5,6,7
  steps.push({
    description: "Step 1: slow at 2, fast at 3",
    highlight: [1, 2],
    pointers: { slow: 1, fast: 2 },
    codeLine: [2, 3, 4],
  });

  steps.push({
    description: "Step 2: slow at 3, fast at 5",
    highlight: [2, 4],
    pointers: { slow: 2, fast: 4 },
    codeLine: [2, 3, 4],
  });

  steps.push({
    description: "Step 3: slow at 4, fast at 7",
    highlight: [3, 6],
    pointers: { slow: 3, fast: 6 },
    codeLine: [2, 3, 4],
  });

  steps.push({
    description: "Fast reached end! Middle node is 4",
    highlight: [3],
    pointers: { slow: 3, fast: 6 },
    found: true,
    mid: 3,
    codeLine: [6],
  });

  return steps;
};

const generatePreOrderSteps = (): AlgorithmStep[] => {
  // Tree:       1
  //           /   \
  //          2     3
  //         / \   / \
  //        4   5 6   7
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Pre-Order: Visit Root → Left → Right",
    highlight: [],
    visited: [],
    codeLine: [0],
  });

  const order = [0, 1, 3, 4, 2, 5, 6]; // Tree indices in pre-order
  const names = [1, 2, 4, 5, 3, 6, 7]; // Node values
  
  for (let i = 0; i < order.length; i++) {
    steps.push({
      description: `Visit node ${names[i]}`,
      highlight: [order[i]],
      visited: order.slice(0, i + 1),
      current: order[i],
      codeLine: [2],
    });
  }

  steps.push({
    description: "Pre-Order complete: 1→2→4→5→3→6→7",
    highlight: [],
    visited: order,
    codeLine: [5],
  });

  return steps;
};

const generateInOrderSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "In-Order: Visit Left → Root → Right (gives sorted order for BST)",
    highlight: [],
    visited: [],
    codeLine: [0],
  });

  const order = [3, 1, 4, 0, 5, 2, 6]; // Tree indices in in-order
  const names = [4, 2, 5, 1, 6, 3, 7]; // Node values
  
  for (let i = 0; i < order.length; i++) {
    steps.push({
      description: `Visit node ${names[i]}`,
      highlight: [order[i]],
      visited: order.slice(0, i + 1),
      current: order[i],
      codeLine: [3],
    });
  }

  steps.push({
    description: "In-Order complete: 4→2→5→1→6→3→7",
    highlight: [],
    visited: order,
    codeLine: [5],
  });

  return steps;
};

const generatePostOrderSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Post-Order: Visit Left → Right → Root",
    highlight: [],
    visited: [],
    codeLine: [0],
  });

  const order = [3, 4, 1, 5, 6, 2, 0]; // Tree indices in post-order
  const names = [4, 5, 2, 6, 7, 3, 1]; // Node values
  
  for (let i = 0; i < order.length; i++) {
    steps.push({
      description: `Visit node ${names[i]}`,
      highlight: [order[i]],
      visited: order.slice(0, i + 1),
      current: order[i],
      codeLine: [4],
    });
  }

  steps.push({
    description: "Post-Order complete: 4→5→2→6→7→3→1",
    highlight: [],
    visited: order,
    codeLine: [5],
  });

  return steps;
};

const generateLevelOrderSteps = (): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  
  steps.push({
    description: "Level-Order (BFS): Visit level by level using queue",
    highlight: [],
    visited: [],
    queue: [],
    codeLine: [0, 1],
  });

  steps.push({
    description: "Add root (1) to queue",
    highlight: [0],
    visited: [],
    queue: [0],
    codeLine: [2],
  });

  const order = [0, 1, 2, 3, 4, 5, 6];
  const names = [1, 2, 3, 4, 5, 6, 7];
  
  steps.push({
    description: "Dequeue 1, add children 2, 3",
    highlight: [0],
    visited: [0],
    queue: [1, 2],
    current: 0,
    codeLine: [4, 5, 6, 7],
  });

  steps.push({
    description: "Dequeue 2, add children 4, 5",
    highlight: [1],
    visited: [0, 1],
    queue: [2, 3, 4],
    current: 1,
    codeLine: [4, 5, 6, 7],
  });

  steps.push({
    description: "Dequeue 3, add children 6, 7",
    highlight: [2],
    visited: [0, 1, 2],
    queue: [3, 4, 5, 6],
    current: 2,
    codeLine: [4, 5, 6, 7],
  });

  steps.push({
    description: "Dequeue 4 (leaf)",
    highlight: [3],
    visited: [0, 1, 2, 3],
    queue: [4, 5, 6],
    current: 3,
    codeLine: [4, 5],
  });

  steps.push({
    description: "Dequeue 5 (leaf)",
    highlight: [4],
    visited: [0, 1, 2, 3, 4],
    queue: [5, 6],
    current: 4,
    codeLine: [4, 5],
  });

  steps.push({
    description: "Dequeue 6 (leaf)",
    highlight: [5],
    visited: [0, 1, 2, 3, 4, 5],
    queue: [6],
    current: 5,
    codeLine: [4, 5],
  });

  steps.push({
    description: "Dequeue 7 (leaf), queue empty",
    highlight: [6],
    visited: [0, 1, 2, 3, 4, 5, 6],
    queue: [],
    current: 6,
    codeLine: [4, 5],
  });

  steps.push({
    description: "Level-Order complete: 1→2→3→4→5→6→7",
    highlight: [],
    visited: order,
    queue: [],
    codeLine: [9],
  });

  return steps;
};

// Graph Visualization Component
const GraphVisualization = ({ step }: { step: AlgorithmStep }) => {
  // Non-tree layout (still uses same nodes 0..6), bigger and cleaner
  const nodes = [
    { id: 0, x: 260, y: 60, label: "0" },
    { id: 1, x: 420, y: 120, label: "1" },
    { id: 2, x: 420, y: 240, label: "2" },
    { id: 3, x: 260, y: 300, label: "3" },
    { id: 4, x: 100, y: 240, label: "4" },
    { id: 5, x: 100, y: 120, label: "5" },
    { id: 6, x: 260, y: 180, label: "6" },
  ];

  // Keep edges consistent with BFS/DFS step generators
  const edges: Array<[number, number]> = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <svg
        width="520"
        height="360"
        className="mx-auto max-w-full"
        viewBox="0 0 520 360"
      >
        {/* Edges */}
        {edges.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            opacity="0.45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => {
          const isVisited = step.visited?.includes(node.id);
          const isCurrent = step.current === node.id;
          const isInQueue = step.queue?.includes(node.id);
          const isInStack = step.stack?.includes(node.id);

          return (
            <g key={node.id}>
              {/* Halo for current */}
              {isCurrent && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={34}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  opacity="0.45"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.2, 0.45] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                />
              )}

              <motion.circle
                cx={node.x}
                cy={node.y}
                r={26}
                className="transition-colors duration-300"
                fill={
                  isCurrent
                    ? "hsl(var(--primary))"
                    : isVisited
                    ? "hsl(var(--success))"
                    : isInQueue || isInStack
                    ? "hsl(var(--warning))"
                    : "hsl(var(--secondary))"
                }
                stroke="hsl(var(--border))"
                strokeWidth="3"
                animate={{ scale: isCurrent ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <text
                x={node.x}
                y={node.y + 6}
                textAnchor="middle"
                className="text-sm font-bold fill-foreground"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Queue/Stack display */}
      <div className="flex gap-6 text-sm flex-wrap justify-center">
        {step.queue !== undefined && (
          <div className="flex items-center gap-2 bg-card/50 dark:bg-card/80 px-4 py-2 rounded-lg border border-border">
            <span className="text-muted-foreground font-medium">Queue:</span>
            <div className="flex gap-1">
              {step.queue.length > 0 ? (
                step.queue.map((n, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 bg-warning/20 rounded text-warning font-mono text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {n}
                  </motion.span>
                ))
              ) : (
                <span className="text-muted-foreground italic">empty</span>
              )}
            </div>
          </div>
        )}
        {step.stack !== undefined && (
          <div className="flex items-center gap-2 bg-card/50 dark:bg-card/80 px-4 py-2 rounded-lg border border-border">
            <span className="text-muted-foreground font-medium">Stack:</span>
            <div className="flex gap-1">
              {step.stack.length > 0 ? (
                step.stack.map((n, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 bg-accent/20 rounded text-accent-foreground font-mono text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {n}
                  </motion.span>
                ))
              ) : (
                <span className="text-muted-foreground italic">empty</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Linked List Visualization with cycle support
const LinkedListVisualization = ({
  step,
  hasCycle,
  algo,
}: {
  step: AlgorithmStep;
  hasCycle: boolean;
  algo: string;
}) => {
  const nodes = hasCycle ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6, 7];

  const slowIdx = step.pointers?.slow ?? -1;
  const fastIdx = step.pointers?.fast ?? -1;
  const prevIdx = step.pointers?.prev ?? -1;
  const currIdx = step.pointers?.curr ?? -1;

  const defaultLinks: Array<number | null> = nodes.map((_, i) => (i === nodes.length - 1 ? null : i + 1));
  const links = step.links ?? defaultLinks;

  const renderArrowBetween = (i: number) => {
    // Determine direction for the edge between i and i+1
    const right = links[i] === i + 1;
    const left = links[i + 1] === i;

    if (!right && !left) {
      return (
        <svg width="36" height="16" viewBox="0 0 36 16" className="text-muted-foreground/40">
          <line x1="0" y1="8" x2="36" y2="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
        </svg>
      );
    }

    if (right) {
      return (
        <svg width="36" height="16" viewBox="0 0 36 16" className="text-muted-foreground">
          <line x1="0" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="2" />
          <polyline points="22,2 28,8 22,14" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }

    // left
    return (
      <svg width="36" height="16" viewBox="0 0 36 16" className="text-muted-foreground">
        <line x1="36" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="2" />
        <polyline points="14,2 8,8 14,14" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {nodes.map((val, i) => {
          const isSlow = slowIdx === i;
          const isFast = fastIdx === i;
          const isPrev = prevIdx === i;
          const isCurr = currIdx === i;
          const isHighlighted = step.highlight.includes(i) || (step.found && step.mid === i);
          const isActive = isSlow || isFast || isPrev || isCurr || isHighlighted;

          return (
            <div key={i} className="flex items-center gap-1">
              <motion.div
                className={`relative px-4 py-3 rounded-lg border-2 font-mono text-lg transition-all duration-300 ${
                  step.found && step.mid === i
                    ? "bg-success/20 border-success text-success"
                    : isActive
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-card dark:bg-card/80 border-border text-foreground"
                }`}
                animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -6 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {val}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
                  {isSlow && (
                    <span className="text-xs bg-info/80 text-info-foreground px-1.5 py-0.5 rounded">S</span>
                  )}
                  {isFast && (
                    <span className="text-xs bg-warning/80 text-warning-foreground px-1.5 py-0.5 rounded">F</span>
                  )}
                  {isPrev && (
                    <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">P</span>
                  )}
                  {isCurr && (
                    <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">C</span>
                  )}
                </div>
              </motion.div>

              {i < nodes.length - 1 && renderArrowBetween(i)}
            </div>
          );
        })}

        {hasCycle && (
          <div className="ml-2 text-muted-foreground">
            <svg width="80" height="44" viewBox="0 0 80 44">
              <path
                d="M4,28 Q40,-6 76,28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              <polyline
                points="68,20 76,28 66,32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <text x="40" y="42" className="text-xs fill-warning" textAnchor="middle">
                5 → 3
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-muted-foreground flex-wrap justify-center">
        {step.pointers?.slow !== undefined && (
          <div className="flex items-center gap-1">
            <span className="bg-info/80 text-info-foreground px-1.5 py-0.5 rounded">S</span>
            <span>Slow</span>
          </div>
        )}
        {step.pointers?.fast !== undefined && (
          <div className="flex items-center gap-1">
            <span className="bg-warning/80 text-warning-foreground px-1.5 py-0.5 rounded">F</span>
            <span>Fast</span>
          </div>
        )}
        {step.pointers?.prev !== undefined && algo === "Reverse Linked List" && (
          <div className="flex items-center gap-1">
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded">P</span>
            <span>Prev</span>
          </div>
        )}
        {step.pointers?.curr !== undefined && algo === "Reverse Linked List" && (
          <div className="flex items-center gap-1">
            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded">C</span>
            <span>Curr</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Tree Visualization Component
const TreeVisualization = ({ step }: { step: AlgorithmStep }) => {
  // Binary tree layout:       1
  //                         /   \
  //                        2     3
  //                       / \   / \
  //                      4   5 6   7
  const nodes = [
    { id: 0, x: 200, y: 30, val: 1 },
    { id: 1, x: 100, y: 100, val: 2 },
    { id: 2, x: 300, y: 100, val: 3 },
    { id: 3, x: 50, y: 170, val: 4 },
    { id: 4, x: 150, y: 170, val: 5 },
    { id: 5, x: 250, y: 170, val: 6 },
    { id: 6, x: 350, y: 170, val: 7 },
  ];

  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="400" height="220" viewBox="0 0 400 220" className="mx-auto">
        {/* Edges */}
        {edges.map(([from, to], i) => (
          <line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y + 20}
            x2={nodes[to].x}
            y2={nodes[to].y - 20}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            opacity="0.4"
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => {
          const isVisited = step.visited?.includes(node.id);
          const isCurrent = step.current === node.id;
          
          return (
            <g key={node.id}>
              {isCurrent && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={28}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={22}
                fill={
                  isCurrent
                    ? "hsl(var(--primary))"
                    : isVisited
                    ? "hsl(var(--success))"
                    : "hsl(var(--secondary))"
                }
                stroke="hsl(var(--border))"
                strokeWidth="2"
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="text-sm font-bold fill-foreground"
              >
                {node.val}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Queue display for level order */}
      {step.queue !== undefined && (
        <div className="flex items-center gap-2 bg-card/50 dark:bg-card/80 px-4 py-2 rounded-lg border border-border">
          <span className="text-muted-foreground font-medium text-sm">Queue:</span>
          <div className="flex gap-1">
            {step.queue.length > 0 ? step.queue.map((n, i) => (
              <span key={i} className="px-2 py-1 bg-warning/20 rounded text-warning font-mono text-sm">
                {typeof n === 'number' ? nodes[n]?.val ?? n : n}
              </span>
            )) : <span className="text-muted-foreground italic text-sm">empty</span>}
          </div>
        </div>
      )}
    </div>
  );
};

// Code Panel Component
const CodePanel = ({ code, highlightedLines }: { code: string[]; highlightedLines: number[] }) => {
  return (
    <div className="bg-card dark:bg-card/90 border border-border rounded-xl overflow-hidden shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 dark:bg-muted/30 border-b border-border">
        <Code className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Pseudocode</span>
      </div>
      <div className="p-4 overflow-x-auto max-h-[320px] overflow-y-auto">
        <pre className="text-sm font-mono">
          {code.map((line, i) => {
            const isHighlighted = highlightedLines.includes(i);
            return (
              <motion.div
                key={i}
                className={`px-3 py-1 rounded transition-all duration-300 ${
                  isHighlighted 
                    ? "bg-primary/20 dark:bg-primary/30 border-l-3 border-primary text-foreground font-medium" 
                    : "text-muted-foreground"
                }`}
                animate={{
                  backgroundColor: isHighlighted ? "hsl(var(--primary) / 0.2)" : "hsl(var(--background) / 0)",
                  x: isHighlighted ? 4 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="inline-block w-6 text-right mr-4 text-muted-foreground/50 select-none text-xs">
                  {i + 1}
                </span>
                <span>{line || " "}</span>
              </motion.div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

// Main Visualizer Component
export const Visualizer = () => {
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("Sorting");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = useMemo(() => {
    switch (selectedAlgo) {
      case "Bubble Sort": return generateBubbleSortSteps();
      case "Selection Sort": return generateSelectionSortSteps();
      case "Insertion Sort": return generateInsertionSortSteps();
      case "Merge Sort": return generateMergeSortSteps();
      case "Quick Sort": return generateQuickSortSteps();
      case "Linear Search": return generateLinearSearchSteps();
      case "Binary Search": return generateBinarySearchSteps();
      case "BFS": return generateBFSSteps();
      case "DFS": return generateDFSSteps();
      case "Reverse Linked List": return generateReverseLinkedListSteps();
      case "Cycle Detection": return generateCycleDetectionSteps();
      case "Find Middle": return generateFindMiddleSteps();
      case "Pre-Order": return generatePreOrderSteps();
      case "In-Order": return generateInOrderSteps();
      case "Post-Order": return generatePostOrderSteps();
      case "Level Order": return generateLevelOrderSteps();
      default: return generateBubbleSortSteps();
    }
  }, [selectedAlgo]);

  const getVisualType = (name: string) => {
    if (algorithmSections["Graphs"].includes(name)) return "graph";
    if (algorithmSections["Linked List"].includes(name)) return "linkedlist";
    if (algorithmSections["Tree"].includes(name)) return "tree";
    return "array";
  };

  const visualType = getVisualType(selectedAlgo);
  const currentStep = steps[step] || steps[0];

  // Auto-play logic
  useEffect(() => {
    // Always clear any previous interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPlaying) return;

    const delay = 1200 / speed;
    intervalRef.current = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speed, steps.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
      if (e.key === "ArrowRight") {
        setStep(s => Math.min(steps.length - 1, s + 1));
        setIsPlaying(false);
      }
      if (e.key === "ArrowLeft") {
        setStep(s => Math.max(0, s - 1));
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
          {/* Algorithm Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card dark:bg-card/90 border border-border rounded-xl p-4 shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Select Algorithm</h3>
            <div className="space-y-3">
              {Object.entries(algorithmSections).map(([section, list]) => {
                const isOpen = openSection === section;
                return (
                  <div key={section}>
                    <button
                      onClick={() => setOpenSection(prev => prev === section ? null : section)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
                    >
                      <span>{section}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pl-2 pt-1">
                            {list.map((algo) => (
                              <button
                                key={algo}
                                onClick={() => handleAlgoChange(algo)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                                  selectedAlgo === algo
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : "hover:bg-muted/50 text-foreground"
                                }`}
                              >
                                {algo}
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

          {/* Visualization Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card dark:bg-card/90 border border-border rounded-xl p-6 shadow-lg"
          >
            {/* Header with controls */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{selectedAlgo}</h3>
              <div className="flex items-center gap-4">
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
                  <Button variant="ghost" size="icon" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (isPlaying) {
                        setIsPlaying(false);
                        return;
                      }
                      if (step >= steps.length - 1) setStep(0);
                      setIsPlaying(true);
                    }}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={isPlaying}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Visualization Area */}
            <div className="min-h-[280px] flex items-center justify-center mb-6">
              {visualType === "graph" && <GraphVisualization step={currentStep} />}
              {visualType === "linkedlist" && (
                <LinkedListVisualization
                  step={currentStep}
                  hasCycle={selectedAlgo === "Cycle Detection"}
                  algo={selectedAlgo}
                />
              )}
              {visualType === "tree" && <TreeVisualization step={currentStep} />}
              {visualType === "array" && (
                <div className="w-full">
                  <div className="flex items-end justify-center gap-2 md:gap-3 h-52 mb-4 px-4">
                    {(currentStep.array || [64, 34, 25, 12, 22, 11, 90]).map((val, i) => {
                      const isHighlighted = currentStep.highlight.includes(i);
                      const isSorted = currentStep.sorted?.includes(i);
                      const isPivot = currentStep.pivot === i;
                      const isFound = currentStep.found && currentStep.mid === i;
                      const isInRange = currentStep.left !== undefined && 
                        currentStep.right !== undefined && 
                        i >= currentStep.left && 
                        i <= currentStep.right;
                      
                      const maxVal = Math.max(...(currentStep.array || [90]));
                      const heightPercent = (val / maxVal) * 100;
                      
                      return (
                        <motion.div
                          key={i}
                          className="relative flex flex-col items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03, type: "spring", stiffness: 200 }}
                        >
                          <motion.div
                            className={`w-10 md:w-14 rounded-t-lg relative overflow-hidden transition-colors duration-300 ${
                              isFound
                                ? "bg-gradient-to-t from-success to-success/70"
                                : isPivot
                                ? "bg-gradient-to-t from-warning to-warning/70"
                                : isSorted
                                ? "bg-gradient-to-t from-success/80 to-success/50"
                                : isHighlighted
                                ? "bg-gradient-to-t from-primary to-primary/70"
                                : isInRange
                                ? "bg-gradient-to-t from-info/50 to-info/30"
                                : "bg-gradient-to-t from-muted to-muted/50"
                            }`}
                            style={{ height: `${Math.max(heightPercent * 1.8, 24)}px` }}
                            animate={{
                              scale: isHighlighted || isPivot || isFound ? 1.08 : 1,
                              y: isHighlighted || isPivot ? -10 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            {(isHighlighted || isPivot || isFound) && (
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              />
                            )}
                          </motion.div>
                          
                          <motion.span 
                            className={`mt-2 text-sm font-mono font-semibold ${
                              isHighlighted || isPivot || isFound 
                                ? "text-primary" 
                                : isSorted 
                                ? "text-success" 
                                : "text-muted-foreground"
                            }`}
                            animate={{ scale: isHighlighted ? 1.1 : 1 }}
                          >
                            {val}
                          </motion.span>
                          
                          <span className="text-[10px] text-muted-foreground/60 mt-0.5">[{i}]</span>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Legend */}
                  <div className="flex justify-center gap-4 md:gap-6 flex-wrap mt-2 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-t from-primary to-primary/70" />
                      <span className="text-xs text-muted-foreground">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-t from-success/80 to-success/50" />
                      <span className="text-xs text-muted-foreground">Sorted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-t from-warning to-warning/70" />
                      <span className="text-xs text-muted-foreground">Pivot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gradient-to-t from-muted to-muted/50" />
                      <span className="text-xs text-muted-foreground">Unsorted</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step description */}
            <div className="bg-muted/50 dark:bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-center">
                Step {step + 1}/{steps.length}: {currentStep.description}
              </p>
            </div>

            {/* Progress bar and controls */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/70"
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.2 }}
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
                  variant="default"
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
            <CodePanel
              code={algorithmCode[selectedAlgo] || []}
              highlightedLines={currentStep.codeLine || []}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
