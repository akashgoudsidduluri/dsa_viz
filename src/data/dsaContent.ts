// DSA Learning Data Model

export type Approach = {
  name: string;
  idea: string;
  steps?: string[];
  time_complexity: string;
  space_complexity: string;
  when_to_use?: string;
  notes?: string;
  logic?: string;
  tracking?: string;
};

export type Problem = {
  id: string;
  title: string;
  why_it_matters?: string;
  core_pattern: string;
  pattern?: string;
  tags?: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance_rate?: string;
  approaches?: Approach[];
  complexity_summary?: string;
  interview_tip?: string;
  external_links?: { label: string; url: string }[];
};

export type DifficultySection = {
  level: "Easy" | "Medium" | "Hard";
  problems: Problem[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  lesson_count: number;
  difficulty_sections: DifficultySection[];
};

export const dsaContent: Topic[] = [
  {
    id: "arrays_hashing",
    title: "Arrays & Hashing",
    description: "Core linear data structure problems using hashing, prefix sums, and greedy scanning.",
    lesson_count: 15,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "two_sum",
            title: "Two Sum",
            why_it_matters: "Introduces hashing and fast lookup — every interviewer expects this.",
            core_pattern: "Hash Map",
            tags: ["array", "hashing"],
            difficulty: "Easy",
            acceptance_rate: "49.5%",
            approaches: [
              {
                name: "Brute Force",
                idea: "Test every pair.",
                steps: ["Loop i", "Loop j", "Check sum"],
                time_complexity: "O(n²)",
                space_complexity: "O(1)",
                when_to_use: "Small input only"
              },
              {
                name: "Hash Map",
                idea: "Store seen numbers and lookup complement.",
                steps: ["Iterate array", "Compute complement", "Check map", "Insert current"],
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "Always in interviews"
              }
            ],
            complexity_summary: "Improves from O(n²) to O(n)",
            interview_tip: "Explain lookup and collision handling.",
            external_links: [
              { label: "LeetCode", url: "https://leetcode.com/problems/two-sum/" },
              { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/two-sum/" }
            ]
          },
          {
            id: "contains_duplicate",
            title: "Contains Duplicate",
            why_it_matters: "Tests hashing and set understanding.",
            core_pattern: "Hash Set",
            tags: ["hashing"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sorting",
                idea: "Duplicates become adjacent",
                time_complexity: "O(n log n)",
                space_complexity: "O(1)"
              },
              {
                name: "Hash Set",
                idea: "Track seen numbers",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ],
            interview_tip: "Mention expected O(1) set lookup."
          },
          {
            id: "valid_anagram",
            title: "Valid Anagram",
            core_pattern: "Frequency Counting",
            tags: ["string", "hashing"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sorting",
                idea: "Compare sorted strings",
                time_complexity: "O(n log n)",
                space_complexity: "O(n)"
              },
              {
                name: "Hash Count",
                idea: "Count chars",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "plus_one",
            title: "Plus One",
            core_pattern: "Simulation",
            difficulty: "Easy",
            approaches: [
              {
                name: "Reverse Iteration",
                idea: "Handle carry from last digit",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "intersection_two_arrays",
            title: "Intersection of Two Arrays",
            core_pattern: "Hashing / Set",
            difficulty: "Easy",
            approaches: [
              {
                name: "Two Sets",
                idea: "Use set intersection",
                time_complexity: "O(n + m)",
                space_complexity: "O(n)"
              }
            ]
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "maximum_subarray",
            title: "Maximum Subarray",
            core_pattern: "Kadane",
            difficulty: "Medium",
            acceptance_rate: "34.2%",
            why_it_matters: "Classic DP problem, tests understanding of optimal substructure.",
            approaches: [
              {
                name: "Brute Force",
                idea: "Try every subarray and compute its sum",
                steps: ["For i from 0..n-1", "For j from i..n-1", "Compute sum of arr[i..j] and track max"],
                time_complexity: "O(n²) to O(n³) depending on whether sums are reused",
                space_complexity: "O(1)",
                when_to_use: "Only for tiny inputs or to reason about correctness"
              },
              {
                name: "Divide and Conquer",
                idea: "Recurse on halves and combine max crossing subarray",
                steps: ["Divide array in half", "Compute max in left, right and crossing middle", "Return max of three"],
                time_complexity: "O(n log n)",
                space_complexity: "O(log n) recursion",
                when_to_use: "Good to reason about recursive patterns and complexity trade-offs"
              },
              {
                name: "Kadane's Algorithm",
                idea: "Greedy / dynamic approach tracking best ending-at index",
                steps: ["Initialize maxSoFar and maxEndingHere to arr[0]", "For each element, maxEndingHere = max(element, maxEndingHere + element)", "Update maxSoFar = max(maxSoFar, maxEndingHere)"],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Preferred solution in interviews for O(n) time and O(1) space"
              }
            ],
            complexity_summary: "Brute force is quadratic; divide-and-conquer gives O(n log n); Kadane gives optimal O(n) and O(1) space.",
            interview_tip: "Start by describing brute force and then show how Kadane reduces overlapping work to O(n)."
          },
          {
            id: "three_sum",
            title: "3-Sum",
            core_pattern: "Sorting + Two Pointers",
            difficulty: "Medium",
            approaches: [
              {
                name: "Sort + Two Pointers",
                idea: "Fix one element, use two pointers for rest",
                time_complexity: "O(n²)",
                space_complexity: "O(1)"
              }
            ],
            interview_tip: "Handle duplicates carefully."
          },
          {
            id: "subarray_sum_equals_k",
            title: "Subarray Sum Equals K",
            core_pattern: "Prefix Sum + Hash",
            difficulty: "Medium",
            approaches: [
              {
                name: "Prefix Sum + HashMap",
                idea: "Track prefix sums and count complements",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ]
          },
          {
            id: "product_except_self",
            title: "Product of Array Except Self",
            core_pattern: "Prefix & Suffix",
            difficulty: "Medium",
            approaches: [
              {
                name: "Left-Right Products",
                idea: "Calculate prefix and suffix products",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "longest_consecutive_sequence",
            title: "Longest Consecutive Sequence",
            core_pattern: "Hash Set",
            difficulty: "Medium",
            approaches: [
              {
                name: "Hash Set + Sequence Start",
                idea: "Only start counting from sequence beginnings",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ]
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "trapping_rain_water",
            title: "Trapping Rain Water",
            core_pattern: "Two Pointer / Prefix Max",
            difficulty: "Hard",
            acceptance_rate: "40.6%",
            why_it_matters: "Tests ability to optimize space from O(n) to O(1).",
            approaches: [
              {
                name: "Prefix Max Arrays",
                idea: "Precompute left and right max heights",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              },
              {
                name: "Two Pointers",
                idea: "Move pointers from both ends",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ],
            interview_tip: "Start with brute force, optimize to two pointers.",
            external_links: [
              { label: "LeetCode", url: "https://leetcode.com/problems/trapping-rain-water/" },
              { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/trapping-rain-water/" }
            ]
          },
          {
            id: "minimum_window_substring",
            title: "Minimum Window Substring",
            core_pattern: "Sliding Window",
            difficulty: "Hard",
            approaches: [
              {
                name: "Sliding Window + HashMap",
                idea: "Expand right, shrink left when valid",
                time_complexity: "O(n)",
                space_complexity: "O(k)"
              }
            ]
          },
          {
            id: "sliding_window_max",
            title: "Sliding Window Maximum",
            core_pattern: "Monotonic Deque",
            difficulty: "Hard",
            approaches: [
              {
                name: "Monotonic Deque",
                idea: "Maintain decreasing deque of indices",
                time_complexity: "O(n)",
                space_complexity: "O(k)"
              }
            ]
          },
          {
            id: "first_missing_positive",
            title: "First Missing Positive",
            core_pattern: "Index Mapping",
            difficulty: "Hard",
            approaches: [
              {
                name: "Cyclic Sort",
                idea: "Place each number at its index",
                time_complexity: "O(n)",
                space_complexity: "O(1)"
              }
            ]
          },
          {
            id: "largest_rectangle_histogram",
            title: "Largest Rectangle in Histogram",
            core_pattern: "Monotonic Stack",
            difficulty: "Hard",
            approaches: [
              {
                name: "Monotonic Stack",
                idea: "Track indices of increasing heights",
                time_complexity: "O(n)",
                space_complexity: "O(n)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "two_pointers",
    title: "Two Pointers",
    description: "Fast/slow pointers and inward shrinking window patterns.",
    lesson_count: 10,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "reverse_string", title: "Reverse String", core_pattern: "Two Pointer", difficulty: "Easy", approaches: [{ name: "Two Pointers", idea: "Swap from both ends", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "valid_palindrome", title: "Valid Palindrome", core_pattern: "Two Pointer", difficulty: "Easy", approaches: [{ name: "Two Pointers", idea: "Compare from both ends, skip non-alphanumeric", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "merge_sorted_arrays", title: "Merge Sorted Arrays", core_pattern: "Two Pointer Merge", difficulty: "Easy", approaches: [{ name: "Merge from End", idea: "Place larger elements first", time_complexity: "O(n + m)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "container_most_water", title: "Container With Most Water", core_pattern: "Two Pointer", difficulty: "Medium", approaches: [{ name: "Two Pointers", idea: "Move the shorter line inward", time_complexity: "O(n)", space_complexity: "O(1)" }], interview_tip: "Explain why moving shorter line is optimal." },
          { id: "remove_duplicates_sorted", title: "Remove Duplicates from Sorted Array", core_pattern: "Two Pointer", difficulty: "Medium", approaches: [{ name: "Slow/Fast Pointers", idea: "Slow pointer tracks unique position", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "sort_colors", title: "Sort Colors", core_pattern: "Dutch National Flag", difficulty: "Medium", approaches: [{ name: "Dutch National Flag", idea: "Three pointers for 0, 1, 2 regions", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "minimum_difference_pair", title: "Minimum Difference Pair", core_pattern: "Two Pointer", difficulty: "Medium", approaches: [{ name: "Sort + Two Pointers", idea: "Compare closest elements in sorted arrays", time_complexity: "O(n log n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "trapping_rain_water_opt", title: "Trapping Rain Water Optimized", core_pattern: "Two Pointer", difficulty: "Hard", approaches: [{ name: "Two Pointers", idea: "Track left and right max while moving inward", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "shortest_subarray_sort", title: "Shortest Subarray to Sort", core_pattern: "Two Pointer", difficulty: "Hard", approaches: [{ name: "Find Bounds", idea: "Find leftmost and rightmost out-of-place elements", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "sliding_window",
    title: "Sliding Window",
    description: "Dynamic window problems using frequency maps and deques.",
    lesson_count: 8,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "max_sum_k", title: "Max Sum Subarray of Size K", core_pattern: "Fixed Window", difficulty: "Easy", approaches: [{ name: "Sliding Window", idea: "Add new, remove old element", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "longest_substring_k_distinct_variant", title: "K Distinct Variant", core_pattern: "Variable Window", difficulty: "Easy", approaches: [{ name: "HashMap + Window", idea: "Track character counts", time_complexity: "O(n)", space_complexity: "O(k)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "longest_substring_no_repeat", title: "Longest Substring Without Repeating", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window + Set", idea: "Shrink window on duplicate", time_complexity: "O(n)", space_complexity: "O(k)" }], interview_tip: "Use set or map for O(1) lookup." },
          { id: "character_replacement", title: "Longest Repeating Character Replacement", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window", idea: "Track max frequency character", time_complexity: "O(n)", space_complexity: "O(26)" }] },
          { id: "min_size_subarray_sum", title: "Minimum Size Subarray Sum", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window", idea: "Shrink when sum >= target", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "fruits_into_baskets", title: "Fruits Into Baskets", core_pattern: "Variable Window", difficulty: "Medium", approaches: [{ name: "Sliding Window", idea: "Max window with 2 distinct fruits", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "minimum_window_substring_sw", title: "Minimum Window Substring", core_pattern: "Variable Window", difficulty: "Hard", approaches: [{ name: "Sliding Window + HashMap", idea: "Expand to find, shrink to minimize", time_complexity: "O(n)", space_complexity: "O(k)" }] },
          { id: "sliding_window_max_sw", title: "Sliding Window Maximum", core_pattern: "Monotonic Deque", difficulty: "Hard", approaches: [{ name: "Monotonic Deque", idea: "Maintain decreasing order", time_complexity: "O(n)", space_complexity: "O(k)" }] }
        ]
      }
    ]
  },
  {
    id: "binary_search",
    title: "Searching & Binary Search",
    description: "Classic binary search & binary search on answer.",
    lesson_count: 9,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "binary_search", title: "Binary Search", core_pattern: "Binary Search", difficulty: "Easy", approaches: [{ name: "Iterative Binary Search", idea: "Divide search space in half", time_complexity: "O(log n)", space_complexity: "O(1)" }] },
          { id: "first_last_pos", title: "First and Last Position", core_pattern: "Binary Search", difficulty: "Easy", approaches: [{ name: "Two Binary Searches", idea: "Find left bound then right bound", time_complexity: "O(log n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "rotated_array", title: "Search in Rotated Array", core_pattern: "Modified Binary Search", difficulty: "Medium", approaches: [{ name: "Binary Search with Pivot", idea: "Identify sorted half, search accordingly", time_complexity: "O(log n)", space_complexity: "O(1)" }], interview_tip: "Handle duplicates separately." },
          { id: "find_peak", title: "Find Peak Element", core_pattern: "Binary Search", difficulty: "Medium", approaches: [{ name: "Binary Search", idea: "Move towards larger neighbor", time_complexity: "O(log n)", space_complexity: "O(1)" }] },
          { id: "kth_smallest_matrix", title: "Kth Smallest in Matrix", core_pattern: "Binary Search on Value", difficulty: "Medium", approaches: [{ name: "Binary Search + Count", idea: "Binary search on value range, count elements <= mid", time_complexity: "O(n log(max-min))", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "median_two_arrays", title: "Median of Two Sorted Arrays", core_pattern: "Binary Search", difficulty: "Hard", approaches: [{ name: "Binary Search on Partition", idea: "Binary search to find correct partition", time_complexity: "O(log min(n,m))", space_complexity: "O(1)" }], interview_tip: "Practice the edge cases thoroughly." },
          { id: "median_two_arrays_alt", title: "Median of Two Sorted Arrays (Explanation)", core_pattern: "Partitioning / Kth Element", difficulty: "Hard", approaches: [
            { name: "Merge-like (conceptual)", idea: "Merge first k elements from both arrays until median", steps: ["Walk two pointers merging until median position"], time_complexity: "O(n + m)", space_complexity: "O(1)", when_to_use: "Simple to explain but not optimal" },
            { name: "Binary Search Partition", idea: "Binary search on smaller array to find partition where left max ≤ right min", steps: ["Ensure A is smaller", "Binary search cut point", "Compute left/right max/min and check condition"], time_complexity: "O(log min(n,m))", space_complexity: "O(1)", when_to_use: "Use in interviews for optimal solution" }
          ], complexity_summary: "Naive merge is linear; partitioning yields O(log min(n,m)).", interview_tip: "Carefully reason about offsets and edge cases (empty partitions)." },
          { id: "aggressive_cows", title: "Aggressive Cows", core_pattern: "Binary Search on Answer", difficulty: "Hard", approaches: [{ name: "Binary Search on Distance", idea: "Binary search on minimum distance, validate placement", time_complexity: "O(n log d)", space_complexity: "O(1)" }] },
          { id: "koko_eating_bananas", title: "Koko Eating Bananas", core_pattern: "Binary Search on Answer", difficulty: "Hard", approaches: [{ name: "Binary Search on Speed", idea: "Binary search on eating speed", time_complexity: "O(n log m)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "linked_list",
    title: "Linked Lists",
    description: "Singly, doubly linked lists and pointer manipulation.",
    lesson_count: 12,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "reverse_linked_list", title: "Reverse Linked List", core_pattern: "Pointer Manipulation", difficulty: "Easy", approaches: [{ name: "Iterative", idea: "Reverse pointers one by one", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "merge_two_sorted_lists", title: "Merge Two Sorted Lists", core_pattern: "Two Pointers", difficulty: "Easy", approaches: [{ name: "Merge", idea: "Compare heads and link smaller", time_complexity: "O(n + m)", space_complexity: "O(1)" }] },
          { id: "linked_list_cycle", title: "Linked List Cycle", core_pattern: "Fast/Slow Pointers", difficulty: "Easy", approaches: [{ name: "Floyd's Cycle Detection", idea: "Fast and slow pointers meet if cycle exists", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "remove_nth_from_end", title: "Remove Nth Node From End", core_pattern: "Two Pointers", difficulty: "Medium", approaches: [{ name: "Two Pass", idea: "Find length then remove", time_complexity: "O(n)", space_complexity: "O(1)" }, { name: "One Pass", idea: "Use gap between two pointers", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "reorder_list", title: "Reorder List", core_pattern: "Multiple Steps", difficulty: "Medium", approaches: [{ name: "Find Mid + Reverse + Merge", idea: "Split, reverse second half, merge alternately", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "copy_random_pointer", title: "Copy List with Random Pointer", core_pattern: "HashMap / Interweaving", difficulty: "Medium", approaches: [{ name: "HashMap", idea: "Map old nodes to new nodes", time_complexity: "O(n)", space_complexity: "O(n)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "merge_k_sorted_lists", title: "Merge K Sorted Lists", core_pattern: "Heap / Divide Conquer", difficulty: "Hard", approaches: [{ name: "Min Heap", idea: "Use heap to get minimum efficiently", time_complexity: "O(n log k)", space_complexity: "O(k)" }], external_links: [{ label: "LeetCode", url: "https://leetcode.com/problems/merge-k-sorted-lists/" }] },
          { id: "reverse_nodes_k_group", title: "Reverse Nodes in K-Group", core_pattern: "Pointer Manipulation", difficulty: "Hard", approaches: [{ name: "Iterative K-Reverse", idea: "Reverse k nodes at a time", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "trees",
    title: "Trees",
    description: "Binary trees, BST, and tree traversal algorithms. Trees are hierarchical data structures with a root node and child nodes forming a parent-child relationship.",
    lesson_count: 18,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { 
            id: "invert_binary_tree", 
            title: "Invert Binary Tree", 
            why_it_matters: "Classic recursive problem that tests understanding of tree structure manipulation. Asked frequently as a warmup question.",
            core_pattern: "DFS / Recursion", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "Recursive DFS", 
                idea: "At each node, swap its left and right children, then recursively invert the subtrees. The base case is when node is null.", 
                steps: [
                  "If node is null, return null (base case)",
                  "Recursively invert the left subtree",
                  "Recursively invert the right subtree",
                  "Swap node.left and node.right",
                  "Return the node"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(h) - recursion stack depth equals tree height, O(log n) for balanced, O(n) for skewed",
                when_to_use: "Default approach, clean and intuitive"
              },
              {
                name: "Iterative BFS",
                idea: "Use a queue to process nodes level by level. For each node, swap its children before adding them to the queue.",
                steps: [
                  "Initialize queue with root",
                  "While queue is not empty, dequeue a node",
                  "Swap its left and right children",
                  "Enqueue left and right children if they exist"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) - queue can hold up to n/2 nodes at the last level",
                when_to_use: "When you want to avoid recursion or need level-order processing"
              }
            ],
            complexity_summary: "Both approaches are O(n) time. Recursive uses O(h) space, iterative uses O(n) space.",
            interview_tip: "Start with recursive solution, mention you can also do it iteratively. Discuss space trade-offs."
          },
          { 
            id: "max_depth", 
            title: "Maximum Depth of Binary Tree", 
            why_it_matters: "Fundamental tree problem that introduces the concept of tree height. Foundation for many harder problems.",
            core_pattern: "DFS / Recursion", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "Recursive DFS (Post-order)", 
                idea: "The depth of a tree is 1 + max(depth of left subtree, depth of right subtree). Null nodes have depth 0.", 
                steps: [
                  "If node is null, return 0",
                  "Recursively get depth of left subtree",
                  "Recursively get depth of right subtree",
                  "Return 1 + max(leftDepth, rightDepth)"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(h) - recursion stack",
                when_to_use: "Most intuitive approach for tree depth problems"
              },
              {
                name: "Iterative BFS",
                idea: "Count the number of levels using level-order traversal. Each level adds 1 to depth.",
                steps: [
                  "Initialize queue with root, depth = 0",
                  "While queue not empty, process all nodes at current level",
                  "Increment depth after processing each level",
                  "Return depth when queue is empty"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) - queue width",
                when_to_use: "When you need to track level information explicitly"
              }
            ],
            complexity_summary: "Both O(n) time. DFS uses O(h) space, BFS uses O(w) space where w is max width.",
            interview_tip: "Mention the difference between height (edges) and depth (nodes). Some definitions vary."
          },
          { 
            id: "same_tree", 
            title: "Same Tree", 
            why_it_matters: "Tests ability to compare two data structures simultaneously. Good introduction to parallel tree traversal.",
            core_pattern: "DFS / Parallel Traversal", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "Recursive Comparison", 
                idea: "Two trees are identical if: roots have same value AND left subtrees are identical AND right subtrees are identical.", 
                steps: [
                  "If both nodes are null, return true (both empty)",
                  "If one is null and other is not, return false (structure differs)",
                  "If values differ, return false",
                  "Recursively compare left subtrees AND right subtrees"
                ],
                time_complexity: "O(min(n, m)) - stop at first difference",
                space_complexity: "O(min(h1, h2)) - recursion depth",
                when_to_use: "Standard approach for tree comparison"
              }
            ],
            complexity_summary: "O(n) time in worst case (identical trees), O(h) space for recursion.",
            interview_tip: "Handle null cases first. This pattern extends to checking symmetric trees, subtree matching, etc."
          },
          {
            id: "diameter_binary_tree",
            title: "Diameter of Binary Tree",
            why_it_matters: "Introduces the concept of global vs local optimization in trees. The longest path may not pass through root.",
            core_pattern: "DFS with Global Variable",
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              {
                name: "DFS with Height Tracking",
                idea: "At each node, the diameter passing through it = left height + right height. Track the global maximum while computing heights.",
                steps: [
                  "Initialize global maxDiameter = 0",
                  "Define height(node) that returns height of subtree",
                  "For each node: localDiameter = height(left) + height(right)",
                  "Update maxDiameter if localDiameter is larger",
                  "Return maxDiameter after traversing all nodes"
                ],
                time_complexity: "O(n) - each node visited once",
                space_complexity: "O(h) - recursion stack",
                when_to_use: "When you need to track a global property while computing local properties"
              }
            ],
            complexity_summary: "O(n) time, O(h) space. Key insight: diameter through a node = left_height + right_height.",
            interview_tip: "Common mistake: only checking diameter through root. The longest path might be entirely in a subtree."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          { 
            id: "level_order", 
            title: "Binary Tree Level Order Traversal", 
            why_it_matters: "Foundation for all level-based tree problems. BFS is the natural fit for level-order processing.",
            core_pattern: "BFS with Queue", 
            tags: ["tree", "bfs", "queue"],
            difficulty: "Medium",
            approaches: [
              { 
                name: "BFS with Level Tracking", 
                idea: "Use a queue to process nodes. Track level boundaries by processing all nodes at current level before moving to next.", 
                steps: [
                  "Initialize queue with root, result = []",
                  "While queue not empty: get current level size",
                  "Process exactly that many nodes (one level)",
                  "Add each node's value to current level array",
                  "Enqueue children for next level",
                  "Add level array to result"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(n) - queue can hold n/2 nodes at widest level",
                when_to_use: "Any problem requiring level-by-level processing"
              },
              {
                name: "DFS with Level Parameter",
                idea: "Pass level index during DFS. Add to appropriate result index based on level.",
                steps: [
                  "Create result array",
                  "DFS(node, level): if new level, add new array to result",
                  "Add node.val to result[level]",
                  "Recurse with level + 1 for children"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(h) recursion + O(n) result",
                when_to_use: "When you prefer recursive style or need pre/post-order within levels"
              }
            ],
            complexity_summary: "Both O(n) time. BFS more intuitive for level problems, DFS useful for variations.",
            interview_tip: "Mention variations: zigzag order, right side view, level averages all use similar pattern."
          },
          { 
            id: "validate_bst", 
            title: "Validate Binary Search Tree", 
            why_it_matters: "Tests understanding of BST property: ALL nodes in left subtree must be < root, ALL in right must be > root.",
            core_pattern: "DFS with Valid Range", 
            tags: ["tree", "bst", "dfs", "recursion"],
            difficulty: "Medium",
            approaches: [
              { 
                name: "Range Validation (Min/Max Bounds)", 
                idea: "Each node must fall within a valid range. Going left shrinks upper bound, going right shrinks lower bound.", 
                steps: [
                  "validate(node, min, max): if null return true",
                  "If node.val <= min or node.val >= max, return false",
                  "Recurse left with (min, node.val) as new range",
                  "Recurse right with (node.val, max) as new range",
                  "Start with (-∞, +∞)"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(h) - recursion stack",
                when_to_use: "Most intuitive and commonly expected solution"
              },
              {
                name: "Inorder Traversal Check",
                idea: "BST inorder traversal produces sorted sequence. Track previous value and ensure current > previous.",
                steps: [
                  "Perform inorder traversal (left, root, right)",
                  "Track prev value (initially -∞)",
                  "At each node: if node.val <= prev, return false",
                  "Update prev = node.val",
                  "Continue traversal"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(h)",
                when_to_use: "When you want to leverage inorder property of BST"
              }
            ],
            complexity_summary: "Both O(n) time, O(h) space. Range method is more explicit about BST invariant.",
            interview_tip: "Common mistake: only comparing node with immediate children. Must compare with ALL ancestors."
          },
          { 
            id: "lca", 
            title: "Lowest Common Ancestor of Binary Tree", 
            why_it_matters: "Classic interview problem. LCA appears in many applications: file systems, network routing, version control.",
            core_pattern: "DFS / Post-order", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Medium",
            approaches: [
              { 
                name: "Recursive Post-order", 
                idea: "Search for p and q. If a node is p or q, return it. If left and right both return non-null, current node is LCA.", 
                steps: [
                  "If node is null, return null",
                  "If node equals p or q, return node",
                  "Recursively search left subtree",
                  "Recursively search right subtree",
                  "If both left and right are non-null, node is LCA",
                  "Otherwise return whichever is non-null"
                ],
                time_complexity: "O(n) - may need to search entire tree",
                space_complexity: "O(h) - recursion stack",
                when_to_use: "Standard approach for LCA in binary tree (not BST)"
              }
            ],
            complexity_summary: "O(n) time, O(h) space. For BST, can be O(h) time using BST property.",
            interview_tip: "Clarify if it's BST (can use value comparisons) or general binary tree (need full search)."
          },
          { 
            id: "construct_tree", 
            title: "Construct Tree from Preorder and Inorder", 
            why_it_matters: "Tests deep understanding of tree traversals. Preorder gives root, inorder gives left/right split.",
            core_pattern: "Divide and Conquer with HashMap", 
            tags: ["tree", "recursion", "divide-and-conquer"],
            difficulty: "Medium",
            approaches: [
              { 
                name: "Recursive with Index Map", 
                idea: "Preorder first element is root. Find root in inorder to determine left/right subtree sizes. Use hashmap for O(1) lookup.", 
                steps: [
                  "Build hashmap: inorder value → index",
                  "build(preStart, preEnd, inStart, inEnd)",
                  "root = preorder[preStart]",
                  "Find rootIdx in inorder using hashmap",
                  "leftSize = rootIdx - inStart",
                  "Recursively build left and right subtrees with appropriate ranges"
                ],
                time_complexity: "O(n) - each node processed once",
                space_complexity: "O(n) - hashmap + O(h) recursion",
                when_to_use: "Standard approach for tree construction problems"
              }
            ],
            complexity_summary: "O(n) time and space. Without hashmap would be O(n²) due to linear search.",
            interview_tip: "Draw out example with indices. Clarify that values are unique. Similar pattern for postorder+inorder."
          },
          {
            id: "path_sum_ii",
            title: "Path Sum II (Root to Leaf Paths)",
            why_it_matters: "Introduces backtracking in trees. Pattern extends to all path-finding problems.",
            core_pattern: "DFS + Backtracking",
            tags: ["tree", "dfs", "backtracking"],
            difficulty: "Medium",
            approaches: [
              {
                name: "DFS with Path Tracking",
                idea: "Maintain current path as you traverse. Add to result when reaching a leaf with target sum. Backtrack by removing last element.",
                steps: [
                  "DFS(node, remainingSum, currentPath)",
                  "Add node.val to currentPath",
                  "If leaf and remainingSum == node.val, add path copy to result",
                  "Recurse on children with remainingSum - node.val",
                  "Remove node.val from path (backtrack)"
                ],
                time_complexity: "O(n²) - visit n nodes, copy paths up to O(n) length",
                space_complexity: "O(n) - path storage + recursion",
                when_to_use: "When you need to find all paths, not just check existence"
              }
            ],
            complexity_summary: "O(n²) worst case time due to path copying. O(n) space for path + recursion.",
            interview_tip: "Remember to COPY the path before adding to result, otherwise it will be modified later."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          { 
            id: "serialize_tree", 
            title: "Serialize and Deserialize Binary Tree", 
            why_it_matters: "Tests ability to design encoding scheme. Real-world application in distributed systems, caching.",
            core_pattern: "BFS or Preorder DFS", 
            tags: ["tree", "design", "dfs", "bfs"],
            difficulty: "Hard",
            approaches: [
              { 
                name: "Preorder DFS with Null Markers", 
                idea: "Serialize using preorder (root, left, right). Mark null nodes with special character. Deserialize by reading tokens in same order.", 
                steps: [
                  "Serialize: preorder traversal, output value or 'null'",
                  "Join with delimiter (comma)",
                  "Deserialize: split by delimiter into queue/array",
                  "Build tree by consuming tokens in preorder",
                  "If token is 'null', return null",
                  "Else create node, recursively build left then right"
                ],
                time_complexity: "O(n) for both operations",
                space_complexity: "O(n) for the string/tokens",
                when_to_use: "Clean recursive solution, easy to implement"
              },
              {
                name: "BFS Level-order",
                idea: "Serialize level by level, including nulls for missing children. Deserialize by processing nodes level by level.",
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "When you want level-order representation"
              }
            ],
            complexity_summary: "Both O(n) time and space. Preorder is simpler to implement.",
            interview_tip: "Clarify format: comma-separated, JSON-like, etc. Mention handling of negative numbers and multi-digit values."
          },
          { 
            id: "binary_tree_max_path", 
            title: "Binary Tree Maximum Path Sum", 
            why_it_matters: "Hard problem combining global tracking with local computation. Path can start and end at any nodes.",
            core_pattern: "DFS with Global Maximum", 
            tags: ["tree", "dfs", "dynamic-programming"],
            difficulty: "Hard",
            approaches: [
              { 
                name: "Post-order DFS with Path Gain", 
                idea: "At each node, compute max 'gain' if path continues upward (can only go one direction). Track global max for paths that bend at current node.", 
                steps: [
                  "maxSum = -infinity (global variable)",
                  "maxGain(node): returns max contribution if continuing upward",
                  "leftGain = max(0, maxGain(left)) - ignore negative gains",
                  "rightGain = max(0, maxGain(right))",
                  "localMax = node.val + leftGain + rightGain (path bends here)",
                  "Update global maxSum if localMax is larger",
                  "Return node.val + max(leftGain, rightGain) (can only go one way up)"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(h) - recursion stack",
                when_to_use: "Standard approach for max path sum variants"
              }
            ],
            complexity_summary: "O(n) time, O(h) space. Key insight: path through node = val + leftGain + rightGain, but continuing path can only pick one child.",
            interview_tip: "Draw examples. Explain why we use max(0, gain) - negative paths should be ignored. This is similar to Kadane's algorithm intuition."
          },
          {
            id: "vertical_order",
            title: "Binary Tree Vertical Order Traversal",
            why_it_matters: "Combines BFS with coordinate tracking. Tests ability to handle complex ordering requirements.",
            core_pattern: "BFS + Column Tracking",
            tags: ["tree", "bfs", "hash-map"],
            difficulty: "Hard",
            approaches: [
              {
                name: "BFS with Column Index",
                idea: "Assign column index to each node (root=0, left=col-1, right=col+1). Group by column, maintaining top-to-bottom order within column.",
                steps: [
                  "BFS traversal, tracking (node, column) pairs",
                  "Use HashMap: column → list of values",
                  "Track minCol and maxCol for final ordering",
                  "Iterate columns from minCol to maxCol",
                  "BFS ensures top-to-bottom order within each column"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "When vertical ordering is required"
              }
            ],
            complexity_summary: "O(n) time and space. BFS naturally handles same-row ordering.",
            interview_tip: "Clarify tie-breaking: same row AND same column - should it be left-to-right or by value?"
          }
        ]
      }
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "BFS, DFS, shortest paths, and graph algorithms.",
    lesson_count: 15,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "number_of_islands", title: "Number of Islands", core_pattern: "DFS/BFS", difficulty: "Easy", approaches: [{ name: "DFS Flood Fill", idea: "Mark visited and count components", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "flood_fill", title: "Flood Fill", core_pattern: "DFS/BFS", difficulty: "Easy", approaches: [{ name: "DFS", idea: "Recursively fill connected cells", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "clone_graph", title: "Clone Graph", core_pattern: "DFS + HashMap", difficulty: "Medium", approaches: [{ name: "DFS with HashMap", idea: "Map old nodes to cloned nodes", time_complexity: "O(V + E)", space_complexity: "O(V)" }] },
          { id: "course_schedule", title: "Course Schedule", core_pattern: "Topological Sort", difficulty: "Medium", approaches: [{ name: "Kahn's Algorithm", idea: "BFS with indegree tracking", time_complexity: "O(V + E)", space_complexity: "O(V)" }] },
          { id: "rotting_oranges", title: "Rotting Oranges", core_pattern: "Multi-source BFS", difficulty: "Medium", approaches: [{ name: "BFS", idea: "Start from all rotten oranges simultaneously", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "pacific_atlantic", title: "Pacific Atlantic Water Flow", core_pattern: "DFS", difficulty: "Medium", approaches: [{ name: "Reverse DFS", idea: "Start from oceans, find intersection", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "word_ladder", title: "Word Ladder", core_pattern: "BFS", difficulty: "Hard", approaches: [{ name: "BFS + Pattern Matching", idea: "Generate neighbors, BFS for shortest path", time_complexity: "O(n*m²)", space_complexity: "O(n*m)" }] },
          { id: "alien_dictionary", title: "Alien Dictionary", core_pattern: "Topological Sort", difficulty: "Hard", approaches: [{ name: "Build Graph + Topo Sort", idea: "Extract order from word pairs", time_complexity: "O(C)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "dynamic_programming",
    title: "Dynamic Programming",
    description: "Memoization, tabulation, and classic DP problems.",
    lesson_count: 20,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { id: "climbing_stairs", title: "Climbing Stairs", core_pattern: "1D DP", difficulty: "Easy", approaches: [{ name: "Bottom-up DP", idea: "dp[i] = dp[i-1] + dp[i-2]", time_complexity: "O(n)", space_complexity: "O(1)" }] },
          { id: "house_robber", title: "House Robber", core_pattern: "1D DP", difficulty: "Easy", approaches: [{ name: "DP", idea: "Rob or skip current house", time_complexity: "O(n)", space_complexity: "O(1)" }] }
        ]
      },
      {
        level: "Medium",
        problems: [
          { id: "coin_change", title: "Coin Change", core_pattern: "Unbounded Knapsack", difficulty: "Medium", approaches: [{ name: "Bottom-up DP", idea: "Min coins for each amount", time_complexity: "O(n*m)", space_complexity: "O(n)" }], interview_tip: "Classic interview problem, know it well." },
          { id: "longest_increasing_subseq", title: "Longest Increasing Subsequence", core_pattern: "1D DP / Binary Search", difficulty: "Medium", approaches: [{ name: "DP", idea: "For each element, find longest ending there", time_complexity: "O(n²)", space_complexity: "O(n)" }, { name: "Binary Search", idea: "Maintain smallest tail for each length", time_complexity: "O(n log n)", space_complexity: "O(n)" }] },
          { id: "unique_paths", title: "Unique Paths", core_pattern: "2D DP", difficulty: "Medium", approaches: [{ name: "DP Grid", idea: "Sum paths from top and left", time_complexity: "O(m*n)", space_complexity: "O(n)" }] },
          { id: "word_break", title: "Word Break", core_pattern: "1D DP", difficulty: "Medium", approaches: [{ name: "DP with Set", idea: "Check if any prefix + suffix works", time_complexity: "O(n²)", space_complexity: "O(n)" }] }
        ]
      },
      {
        level: "Hard",
        problems: [
          { id: "edit_distance", title: "Edit Distance", core_pattern: "2D DP", difficulty: "Hard", approaches: [{ name: "DP Table", idea: "Min of insert, delete, replace", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "regular_expression", title: "Regular Expression Matching", core_pattern: "2D DP", difficulty: "Hard", approaches: [{ name: "DP", idea: "Handle . and * cases", time_complexity: "O(m*n)", space_complexity: "O(m*n)" }] },
          { id: "burst_balloons", title: "Burst Balloons", core_pattern: "Interval DP", difficulty: "Hard", approaches: [{ name: "DP on Intervals", idea: "Think of last balloon to burst", time_complexity: "O(n³)", space_complexity: "O(n²)" }] }
        ]
      }
    ]
  }
];

// Mathematics & Number Theory topic (added per user request)
dsaContent.push({
  id: "math_number_theory",
  title: "Mathematics & Number Theory",
  description: "Core mathematical tools needed for coding interviews",
  lesson_count: 26,
  difficulty_sections: [
    {
      level: "Easy",
      problems: [
        { id: "prime_check", title: "Prime Check (√n)", core_pattern: "Primes", difficulty: "Easy" },
        { id: "sieve_eratosthenes", title: "Sieve of Eratosthenes", core_pattern: "Sieve", difficulty: "Easy" },
        { id: "prime_factorization", title: "Prime Factorization", core_pattern: "Factorization", difficulty: "Easy" },
        { id: "count_divisors", title: "Count Divisors", core_pattern: "Divisors", difficulty: "Easy" },
        { id: "sum_divisors", title: "Sum of Divisors", core_pattern: "Divisors", difficulty: "Easy" },
        { id: "gcd_euclid", title: "Euclid GCD", core_pattern: "GCD", difficulty: "Easy" },
        { id: "lcm_using_gcd", title: "LCM using GCD", core_pattern: "LCM", difficulty: "Easy" },
        { id: "fast_power", title: "Fast Power (Binary Exponentiation)", core_pattern: "Binary Exponentiation", difficulty: "Easy" },
        { id: "prefix_sum_math", title: "Prefix Sum (Math)", core_pattern: "Prefix Sum", difficulty: "Easy" },
        { id: "difference_array", title: "Difference Array", core_pattern: "Difference Array", difficulty: "Easy" }
      ]
    },
    {
      level: "Medium",
      problems: [
        { id: "extended_euclid", title: "Extended Euclid (basic)", core_pattern: "Extended GCD", difficulty: "Medium" },
        { id: "modular_inverse", title: "Modular Inverse (intro)", core_pattern: "Modular Arithmetic", difficulty: "Medium" },
        { id: "combinatorics_factorials", title: "Factorials", core_pattern: "Combinatorics", difficulty: "Medium" },
        { id: "permutations_nPr", title: "Permutations (nPr)", core_pattern: "Combinatorics", difficulty: "Medium" },
        { id: "combinations_nCr", title: "Combinations (nCr)", core_pattern: "Combinatorics", difficulty: "Medium" },
        { id: "pascal_triangle", title: "Pascal's Triangle", core_pattern: "Combinatorics", difficulty: "Medium" },
        { id: "bit_binary_representation", title: "Binary Representation", core_pattern: "Bit Math", difficulty: "Medium" },
        { id: "xor_tricks", title: "XOR tricks", core_pattern: "Bit Math", difficulty: "Medium" },
        { id: "count_set_bits", title: "Count set bits", core_pattern: "Bit Math", difficulty: "Medium" },
        { id: "subset_mask", title: "Subset mask", core_pattern: "Bit Math", difficulty: "Medium" }
      ]
    },
    {
      level: "Medium",
      problems: [
        { id: "range_update", title: "Range Update", core_pattern: "Range Math", difficulty: "Medium" },
        { id: "overflow_safety", title: "Overflow Safety", core_pattern: "Numeric Safety", difficulty: "Medium" },
        { id: "geometry_distance", title: "Distance formula", core_pattern: "Geometry", difficulty: "Medium" },
        { id: "triangle_check", title: "Triangle check", core_pattern: "Geometry", difficulty: "Medium" },
        { id: "orientation_basics", title: "Orientation basics", core_pattern: "Geometry", difficulty: "Medium" }
      ]
    }
  ]
});

// Additional topics: Heaps and Greedy algorithms with problems and clear approach explanations
export const additionalTopics: Topic[] = [
  {
    id: "heaps",
    title: "Heaps & Priority Queues",
    description: "Priority queue problems and heap-based optimizations.",
    lesson_count: 8,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "top_k_elements",
            title: "Top K Frequent Elements",
            core_pattern: "Heap / Hash Map",
            difficulty: "Easy",
            approaches: [
              {
                name: "Hash Map + Heap",
                idea: "Count frequencies and keep a size-k heap of top frequencies",
                steps: ["Count frequencies into map", "Iterate map and push into min-heap of size k", "Heap contains top k"],
                time_complexity: "O(n log k)",
                space_complexity: "O(n)",
                when_to_use: "When k ≪ n or streaming input"
              },
              {
                name: "Bucket Sort",
                idea: "Group numbers by frequency and read buckets from high to low",
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "Good when frequencies range is small or you need linear time"
              }
            ],
            complexity_summary: "Heap approach is O(n log k); bucket approach can be O(n).",
            interview_tip: "Discuss stability and memory trade-offs."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "merge_k_sorted_lists_heap",
            title: "Merge K Sorted Lists (Heap)",
            core_pattern: "Heap",
            difficulty: "Medium",
            approaches: [
              {
                name: "Min Heap",
                idea: "Push head of each list into heap and pop smallest repeatedly",
                steps: ["Initialize heap with k heads", "Pop smallest and push next from that list"],
                time_complexity: "O(n log k)",
                space_complexity: "O(k)",
                when_to_use: "When merging many short lists"
              },
              {
                name: "Divide and Conquer",
                idea: "Pairwise merge lists like merge sort",
                time_complexity: "O(n log k)",
                space_complexity: "O(1) extra",
                when_to_use: "When you prefer iterative merging without heap dependency"
              }
            ],
            interview_tip: "Explain why both approaches have similar complexity but different constant factors."
          }
        ]
      }
    ]
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    description: "Problems where local optimal choices lead to a global optimum.",
    lesson_count: 10,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "activity_selection",
            title: "Activity Selection / Interval Scheduling",
            core_pattern: "Greedy",
            difficulty: "Easy",
            approaches: [
              {
                name: "Sort by Finish Time",
                idea: "Choose earliest finishing activity and discard overlaps",
                steps: ["Sort activities by end time", "Iterate and pick next compatible activity"],
                time_complexity: "O(n log n)",
                space_complexity: "O(1)",
                when_to_use: "Standard interval scheduling problems"
              }
            ],
            complexity_summary: "Sorting dominates: O(n log n). Greedy choice is provably optimal here.",
            interview_tip: "Explain the exchange argument to justify greedy correctness."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "fractional_knapsack",
            title: "Fractional Knapsack",
            core_pattern: "Greedy + Sorting",
            difficulty: "Medium",
            approaches: [
              {
                name: "Greedy by Value Density",
                idea: "Pick items with highest value/weight ratio first",
                steps: ["Compute value density", "Sort by density", "Take as much as possible from highest density"],
                time_complexity: "O(n log n)",
                space_complexity: "O(1)",
                when_to_use: "Fractional items allowed; not applicable to 0/1 knapsack"
              }
            ],
            interview_tip: "Clarify fractional vs 0/1 knapsack distinction."
          }
        ]
      }
    ]
  }
];

// Merge additionalTopics into main dsaContent array so UI picks them up
dsaContent.push(...additionalTopics);

export const getTopicById = (id: string): Topic | undefined => {
  return dsaContent.find(topic => topic.id === id);
};

export const getProblemById = (topicId: string, problemId: string): Problem | undefined => {
  const topic = getTopicById(topicId);
  if (!topic) return undefined;
  
  for (const section of topic.difficulty_sections) {
    const problem = section.problems.find(p => p.id === problemId);
    if (problem) return problem;
  }
  return undefined;
};

export const getAllProblems = (): (Problem & { topicId: string; topicTitle: string })[] => {
  const problems: (Problem & { topicId: string; topicTitle: string })[] = [];
  
  for (const topic of dsaContent) {
    for (const section of topic.difficulty_sections) {
      for (const problem of section.problems) {
        problems.push({ ...problem, topicId: topic.id, topicTitle: topic.title });
      }
    }
  }
  
  return problems;
};
