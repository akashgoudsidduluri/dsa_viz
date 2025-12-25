// Shared Step type and many algorithm implementations used by the Visualizer.
// Each algorithm returns { result, steps } and does NOT mutate inputs.

export type Step =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "shift"; from: number; to: number }
  | { type: "insert"; index: number; value: number }
  | { type: "movePointer"; name: string; index: number }
  | { type: "visit"; nodeId: string | number }
  | { type: "queue"; state: Array<number | string> }
  | { type: "stack"; state: Array<number | string> }
  | { type: "relax"; node: number; distance: number }
  | { type: "found"; index?: number; node?: number };

// ----------------------
// SORTING ALGORITHMS
// ----------------------

// Bubble Sort
export function bubbleSort(arr: number[]) {
  const a = arr.slice();
  const steps: Step[] = [];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ type: "compare", i: j, j: j + 1 }); // comparing j and j+1
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // local swap
        steps.push({ type: "swap", i: j, j: j + 1 }); // swapped positions
      }
    }
  }
  return { result: a, steps };
}

// Selection Sort
export function selectionSort(arr: number[]) {
  const a = arr.slice();
  const steps: Step[] = [];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: "compare", i: minIdx, j });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ type: "swap", i, j: minIdx });
    }
    steps.push({ type: "movePointer", name: "sorted", index: i });
  }
  return { result: a, steps };
}

// Insertion Sort
export function insertionSort(arr: number[]) {
  const a = arr.slice();
  const steps: Step[] = [];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    steps.push({ type: "movePointer", name: "key", index: i });
    while (j >= 0 && a[j] > key) {
      steps.push({ type: "compare", i: j, j: i });
      a[j + 1] = a[j];
      steps.push({ type: "shift", from: j, to: j + 1 });
      j--;
    }
    a[j + 1] = key;
    steps.push({ type: "insert", index: j + 1, value: key });
  }
  return { result: a, steps };
}

// Merge Sort
export function mergeSort(arr: number[]) {
  const steps: Step[] = [];
  function merge(a: number[], l: number, m: number, r: number) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;
    while (i < left.length && j < right.length) {
      steps.push({ type: "compare", i: l + i, j: m + 1 + j });
      if (left[i] <= right[j]) {
        a[k] = left[i];
        steps.push({ type: "insert", index: k, value: left[i] });
        i++;
      } else {
        a[k] = right[j];
        steps.push({ type: "insert", index: k, value: right[j] });
        j++;
      }
      k++;
    }
    while (i < left.length) {
      a[k] = left[i];
      steps.push({ type: "insert", index: k, value: left[i] });
      i++;
      k++;
    }
    while (j < right.length) {
      a[k] = right[j];
      steps.push({ type: "insert", index: k, value: right[j] });
      j++;
      k++;
    }
  }
  function sort(a: number[], l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    sort(a, l, m);
    sort(a, m + 1, r);
    merge(a, l, m, r);
  }
  const a = arr.slice();
  sort(a, 0, a.length - 1);
  return { result: a, steps };
}

// Quick Sort (Lomuto partition)
export function quickSort(arr: number[]) {
  const a = arr.slice();
  const steps: Step[] = [];
  function partition(l: number, r: number) {
    const pivot = a[r];
    let i = l - 1;
    for (let j = l; j < r; j++) {
      steps.push({ type: "compare", i: j, j: r });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ type: "swap", i, j });
      }
    }
    [a[i + 1], a[r]] = [a[r], a[i + 1]];
    steps.push({ type: "swap", i: i + 1, j: r });
    return i + 1;
  }
  function qs(l: number, r: number) {
    if (l < r) {
      const p = partition(l, r);
      qs(l, p - 1);
      qs(p + 1, r);
    }
  }
  qs(0, a.length - 1);
  return { result: a, steps };
}

// ----------------------
// SEARCHING
// ----------------------

// Linear Search
export function linearSearch(arr: number[], target: number) {
  const a = arr.slice();
  const steps: Step[] = [];
  for (let i = 0; i < a.length; i++) {
    steps.push({ type: "compare", i, j: -1 }); // compare index i against target
    if (a[i] === target) {
      steps.push({ type: "found", index: i });
      return { result: i, steps };
    }
  }
  return { result: -1, steps };
}

// Binary Search (array must be sorted)
export function binarySearch(arr: number[], target: number) {
  const a = arr.slice();
  const steps: Step[] = [];
  let l = 0,
    r = a.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    steps.push({ type: "compare", i: m, j: -1 });
    if (a[m] === target) {
      steps.push({ type: "found", index: m });
      return { result: m, steps };
    } else if (a[m] < target) {
      l = m + 1;
      steps.push({ type: "movePointer", name: "left", index: l });
    } else {
      r = m - 1;
      steps.push({ type: "movePointer", name: "right", index: r });
    }
  }
  return { result: -1, steps };
}

// ----------------------
// HASHING + PREFIX SUM
// ----------------------

// Two Sum (hashmap) - returns indices of two elements summing to target
export function twoSum(arr: number[], target: number) {
  const a = arr.slice();
  const steps: Step[] = [];
  const map = new Map<number, number>();
  for (let i = 0; i < a.length; i++) {
    const need = target - a[i];
    steps.push({ type: "movePointer", name: "i", index: i });
    if (map.has(need)) {
      const j = map.get(need)!;
      steps.push({ type: "found", index: i });
      return { result: [j, i], steps };
    }
    map.set(a[i], i);
  }
  return { result: null, steps };
}

// Subarray Sum Equals K - prefix sum + hashmap
export function subarraySumEqualsK(arr: number[], k: number) {
  const a = arr.slice();
  const steps: Step[] = [];
  const map = new Map<number, number>();
  map.set(0, -1);
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i];
    steps.push({ type: "movePointer", name: "i", index: i });
    if (map.has(sum - k)) {
      const start = map.get(sum - k)! + 1;
      steps.push({ type: "found", index: start });
      return { result: [start, i], steps };
    }
    map.set(sum, i);
  }
  return { result: null, steps };
}

// ----------------------
// LINKED LISTS
// ----------------------

export type ListNode = { val: number; next: ListNode | null } | null;

// Reverse Linked List (iterative)
export function reverseLinkedList(head: ListNode) {
  const steps: Step[] = [];
  let prev: ListNode = null;
  let curr = head;
  while (curr) {
    // indicate pointers for visualization: curr, prev, next
    steps.push({ type: "movePointer", name: "curr", index: curr.val as any });
    steps.push({ type: "movePointer", name: "prev", index: prev ? (prev.val as any) : -1 });
    steps.push({ type: "visit", nodeId: curr.val });
    const next = curr.next;
    // perform reversal of pointer
    curr.next = prev;
    steps.push({ type: "stack", state: [prev ? (prev.val as any) : "null", curr.val as any] });
    prev = curr;
    curr = next;
    // show updated pointers
    steps.push({ type: "movePointer", name: "curr", index: curr ? (curr.val as any) : -1 });
    steps.push({ type: "movePointer", name: "prev", index: prev ? (prev.val as any) : -1 });
  }
  return { result: prev, steps };
}

// Cycle Detection (Floyd's algorithm)
export function detectCycle(head: ListNode) {
  const steps: Step[] = [];
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    steps.push({ type: "movePointer", name: "slow", index: slow ? (slow.val as any) : -1 });
    steps.push({ type: "movePointer", name: "fast", index: fast ? (fast.val as any) : -1 });
    if (slow === fast) {
      steps.push({ type: "found", node: slow ? (slow.val as any) : undefined });
      return { result: true, steps };
    }
  }
  return { result: false, steps };
}

// Find middle node of linked list (fast/slow)
export function findMiddle(head: ListNode) {
  const steps: Step[] = [];
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    steps.push({ type: "movePointer", name: "slow", index: slow ? slow.val as any : -1 });
    steps.push({ type: "movePointer", name: "fast", index: fast ? fast.val as any : -1 });
    slow = slow!.next;
    fast = fast.next.next;
  }
  steps.push({ type: "found", node: slow ? (slow.val as any) : undefined });
  return { result: slow, steps };
}

// ----------------------
// TREE TRAVERSALS
// ----------------------

export type TreeNode = { id?: string | number; val: number; left?: TreeNode | null; right?: TreeNode | null } | null;

// In-order DFS
export function inorderTraversal(root: TreeNode) {
  const steps: Step[] = [];
  const res: number[] = [];
  function dfs(node: TreeNode) {
    if (!node) return;
    dfs(node.left || null);
    steps.push({ type: "visit", nodeId: node.id ?? node.val });
    res.push(node.val);
    dfs(node.right || null);
  }
  dfs(root);
  return { result: res, steps };
}

// Level-order BFS
export function levelOrder(root: TreeNode) {
  const steps: Step[] = [];
  const res: number[] = [];
  if (!root) return { result: res, steps };
  const q: TreeNode[] = [root];
  steps.push({ type: "queue", state: [root.id ?? root.val] });
  while (q.length) {
    const node = q.shift()!;
    steps.push({ type: "visit", nodeId: node.id ?? node.val });
    res.push(node.val);
    if (node.left) {
      q.push(node.left);
      steps.push({ type: "queue", state: q.map((n) => n.id ?? n.val) });
    }
    if (node.right) {
      q.push(node.right);
      steps.push({ type: "queue", state: q.map((n) => n.id ?? n.val) });
    }
  }
  return { result: res, steps };
}

// ----------------------
// GRAPH TRAVERSALS
// ----------------------

// Graph represented as adjacency list: number -> number[]
export function bfsGraph(adj: number[][], start = 0) {
  const steps: Step[] = [];
  const visited = new Array(adj.length).fill(false);
  const q: number[] = [start];
  visited[start] = true;
  steps.push({ type: "queue", state: [...q] });
  const order: number[] = [];
  while (q.length) {
    const u = q.shift()!;
    steps.push({ type: "visit", nodeId: u });
    order.push(u);
    for (const v of adj[u] || []) {
      if (!visited[v]) {
        visited[v] = true;
        q.push(v);
        steps.push({ type: "queue", state: [...q] });
      }
    }
  }
  return { result: order, steps };
}

export function dfsGraph(adj: number[][], start = 0) {
  const steps: Step[] = [];
  const visited = new Array(adj.length).fill(false);
  const order: number[] = [];
  function dfs(u: number) {
    visited[u] = true;
    steps.push({ type: "visit", nodeId: u });
    order.push(u);
    for (const v of adj[u] || []) {
      if (!visited[v]) dfs(v);
    }
  }
  dfs(start);
  return { result: order, steps };
}

// ----------------------
// SHORTEST PATH
// ----------------------

// Dijkstra's algorithm - graph as adjacency list of {to, weight}
export function dijkstra(adjacency: Array<Array<{ to: number; weight: number }>>, src = 0) {
  const steps: Step[] = [];
  const n = adjacency.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  dist[src] = 0;
  for (let i = 0; i < n; i++) {
    let u = -1;
    let best = Infinity;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && dist[v] < best) {
        best = dist[v];
        u = v;
      }
    }
    if (u === -1) break;
    visited[u] = true;
    steps.push({ type: "visit", nodeId: u });
    for (const e of adjacency[u]) {
      const nd = dist[u] + e.weight;
      if (nd < dist[e.to]) {
        dist[e.to] = nd;
        steps.push({ type: "relax", node: e.to, distance: nd });
      }
    }
  }
  return { result: dist, steps };
}

// Topological sort (Kahn's algorithm)
export function topologicalSort(adj: number[][]) {
  const steps: Step[] = [];
  const n = adj.length;
  const indeg = new Array(n).fill(0);
  for (let u = 0; u < n; u++) for (const v of adj[u] || []) indeg[v]++;
  const q: number[] = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  steps.push({ type: "queue", state: [...q] });
  const order: number[] = [];
  while (q.length) {
    const u = q.shift()!;
    order.push(u);
    steps.push({ type: "visit", nodeId: u });
    for (const v of adj[u] || []) {
      indeg[v]--;
      if (indeg[v] === 0) {
        q.push(v);
        steps.push({ type: "queue", state: [...q] });
      }
    }
  }
  if (order.length !== n) return { result: null, steps }; // cycle exists
  return { result: order, steps };
}

// ----------------------
// MATH & NUMBER THEORY
// ----------------------

// Prime check (trial division)
export function isPrime(n: number) {
  const steps: Step[] = [];
  if (n < 2) return { result: false, steps };
  for (let i = 2; i * i <= n; i++) {
    steps.push({ type: "compare", i, j: -1 });
    if (n % i === 0) return { result: false, steps };
  }
  return { result: true, steps };
}

// Sieve of Eratosthenes
export function sieve(n: number) {
  const steps: Step[] = [];
  const isPrimeArr = new Array(n + 1).fill(true);
  isPrimeArr[0] = isPrimeArr[1] = false;
  for (let p = 2; p * p <= n; p++) {
    if (isPrimeArr[p]) {
      for (let mult = p * p; mult <= n; mult += p) {
        isPrimeArr[mult] = false;
        steps.push({ type: "visit", nodeId: mult });
      }
    }
  }
  const primes = [] as number[];
  for (let i = 2; i <= n; i++) if (isPrimeArr[i]) primes.push(i);
  return { result: primes, steps };
}

// GCD (Euclid)
export function gcd(a: number, b: number) {
  const steps: Step[] = [];
  let x = Math.abs(a),
    y = Math.abs(b);
  while (y !== 0) {
    steps.push({ type: "movePointer", name: "gcd_step", index: y });
    const t = x % y;
    x = y;
    y = t;
  }
  return { result: x, steps };
}

// LCM using GCD
export function lcm(a: number, b: number) {
  const g = gcd(a, b).result as number;
  return { result: Math.abs((a / g) * b), steps: [] };
}

// Binary exponentiation
export function binaryExp(base: number, exp: number) {
  const steps: Step[] = [];
  let result = 1;
  let b = base;
  let e = exp;
  while (e > 0) {
    steps.push({ type: "movePointer", name: "exp_bit", index: e & 1 });
    if (e & 1) {
      result = result * b;
      steps.push({ type: "insert", index: -1, value: result });
    }
    b = b * b;
    e >>= 1;
  }
  return { result, steps };
}

// Modular exponentiation
export function modExp(base: number, exp: number, mod: number) {
  const steps: Step[] = [];
  let result = 1 % mod;
  let b = base % mod;
  let e = exp;
  while (e > 0) {
    steps.push({ type: "movePointer", name: "exp_bit", index: e & 1 });
    if (e & 1) {
      result = (result * b) % mod;
      steps.push({ type: "insert", index: -1, value: result });
    }
    b = (b * b) % mod;
    e >>= 1;
  }
  return { result, steps };
}

// nCr using factorials (no mod) - returns binomial coefficient
export function nCr(n: number, r: number) {
  const steps: Step[] = [];
  if (r < 0 || r > n) return { result: 0, steps };
  r = Math.min(r, n - r);
  let numer = 1;
  for (let i = 0; i < r; i++) {
    numer *= n - i;
    steps.push({ type: "insert", index: -1, value: numer });
  }
  let denom = 1;
  for (let i = 1; i <= r; i++) {
    denom *= i;
    steps.push({ type: "insert", index: -1, value: denom });
  }
  return { result: Math.round(numer / denom), steps };
}

// ----------------------
// BIT MANIPULATION
// ----------------------

// Count set bits (Brian Kernighan)
export function countSetBits(x: number) {
  const steps: Step[] = [];
  let cnt = 0;
  let v = x;
  while (v) {
    v &= v - 1;
    cnt++;
    steps.push({ type: "movePointer", name: "bit_clear", index: v });
  }
  return { result: cnt, steps };
}

// Check power of 2
export function isPowerOfTwo(x: number) {
  const steps: Step[] = [];
  if (x <= 0) return { result: false, steps };
  const res = (x & (x - 1)) === 0;
  steps.push({ type: "compare", i: x, j: x - 1 });
  return { result: res, steps };
}

// Single number (XOR) - find element appearing once where others appear twice
export function singleNumber(nums: number[]) {
  const a = nums.slice();
  const steps: Step[] = [];
  let x = 0;
  for (let i = 0; i < a.length; i++) {
    steps.push({ type: "movePointer", name: "i", index: i });
    x ^= a[i];
    steps.push({ type: "insert", index: -1, value: x });
  }
  return { result: x, steps };
}

// Generate subsets using bitmask
export function generateSubsets(nums: number[]) {
  const steps: Step[] = [];
  const n = nums.length;
  const all: number[][] = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    const subset: number[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(nums[i]);
    }
    steps.push({ type: "insert", index: -1, value: subset.length });
    all.push(subset);
  }
  return { result: all, steps };
}

// ----------------------
// End of module
// ----------------------
