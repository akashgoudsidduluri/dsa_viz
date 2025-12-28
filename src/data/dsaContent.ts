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
            why_it_matters: "Introduces hashing and fast lookup — every interviewer expects this. This problem teaches you how to trade space for time by using a hash map to achieve O(1) lookup instead of O(n) scanning.",
            core_pattern: "Hash Map",
            tags: ["array", "hashing"],
            difficulty: "Easy",
            acceptance_rate: "49.5%",
            approaches: [
              {
                name: "Brute Force",
                idea: "Test every possible pair of numbers to find two that sum to target. For each element, scan all elements after it to check if any forms the required sum.",
                steps: [
                  "Loop through each element with index i from 0 to n-2",
                  "For each i, loop through elements with index j from i+1 to n-1",
                  "Check if nums[i] + nums[j] equals target",
                  "If found, return [i, j]",
                  "If no pair found after all iterations, return empty or indicate not found"
                ],
                time_complexity: "O(n²) - nested loops checking all pairs",
                space_complexity: "O(1) - no extra data structures used",
                when_to_use: "Only for very small inputs or as initial brute force to understand the problem"
              },
              {
                name: "Hash Map (Optimal)",
                idea: "For each number, calculate what number we need (complement = target - current). Use a hash map to store numbers we've seen. If complement exists in map, we found our pair!",
                steps: [
                  "Create an empty hash map to store {number: index}",
                  "Iterate through the array with index i",
                  "Calculate complement = target - nums[i]",
                  "If complement exists in hash map, return [map[complement], i]",
                  "Otherwise, add current number to map: map[nums[i]] = i",
                  "Continue until pair is found"
                ],
                time_complexity: "O(n) - single pass through array",
                space_complexity: "O(n) - hash map stores up to n elements",
                when_to_use: "Standard interview solution. Always use this approach."
              }
            ],
            complexity_summary: "Brute force O(n²) → Hash Map O(n). This is a classic example of trading space for time.",
            interview_tip: "Explain hash map collision handling (chaining vs open addressing). Mention that this pattern extends to k-sum problems.",
            external_links: [
              { label: "LeetCode", url: "https://leetcode.com/problems/two-sum/" },
              { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/two-sum/" }
            ]
          },
          {
            id: "contains_duplicate",
            title: "Contains Duplicate",
            why_it_matters: "Tests your understanding of hash sets and their O(1) lookup property. A simple problem that forms the foundation for more complex duplicate detection scenarios.",
            core_pattern: "Hash Set",
            tags: ["hashing", "array"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sorting",
                idea: "Sort the array first. After sorting, duplicates will be adjacent to each other. Simply scan once to check if any consecutive elements are equal.",
                steps: [
                  "Sort the array in-place or create a sorted copy",
                  "Iterate from index 1 to n-1",
                  "Compare each element with its previous element",
                  "If arr[i] equals arr[i-1], return true (duplicate found)",
                  "If loop completes, return false"
                ],
                time_complexity: "O(n log n) - dominated by sorting",
                space_complexity: "O(1) if in-place sort, O(n) if using a copy",
                when_to_use: "When space is limited and you can modify the array"
              },
              {
                name: "Hash Set (Optimal)",
                idea: "Use a set to track seen numbers. As you iterate, check if the current number already exists in the set. If yes, it's a duplicate. If no, add it to the set.",
                steps: [
                  "Create an empty hash set",
                  "Iterate through each number in the array",
                  "If number already exists in set, return true",
                  "Otherwise, add the number to the set",
                  "If loop completes without finding duplicate, return false"
                ],
                time_complexity: "O(n) - single pass with O(1) set operations",
                space_complexity: "O(n) - set stores unique elements",
                when_to_use: "Preferred solution when time is the priority"
              }
            ],
            complexity_summary: "Hash Set gives O(n) time. Sorting is O(n log n) but uses less space.",
            interview_tip: "Mention that HashSet has expected O(1) lookup due to hashing. Discuss when sorting might be preferred (memory constraints)."
          },
          {
            id: "valid_anagram",
            title: "Valid Anagram",
            why_it_matters: "Introduces frequency counting pattern which is fundamental for many string problems. An anagram has the same characters with the same frequencies.",
            core_pattern: "Frequency Counting",
            tags: ["string", "hashing"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sorting",
                idea: "If two strings are anagrams, their sorted versions will be identical. Sort both strings and compare.",
                steps: [
                  "If lengths differ, return false immediately",
                  "Sort both strings alphabetically",
                  "Compare the sorted strings character by character",
                  "Return true if identical, false otherwise"
                ],
                time_complexity: "O(n log n) - sorting dominates",
                space_complexity: "O(n) - for sorted copies (or O(1) if modifying in-place)"
              },
              {
                name: "Hash Map / Frequency Count",
                idea: "Count the frequency of each character in both strings. If frequencies match exactly, they are anagrams.",
                steps: [
                  "If lengths differ, return false",
                  "Create a frequency map for string s",
                  "Iterate through string t, decrementing counts",
                  "If any character not found or count goes negative, return false",
                  "Verify all counts are zero"
                ],
                time_complexity: "O(n) - single pass through each string",
                space_complexity: "O(1) - only 26 characters for lowercase English"
              }
            ],
            complexity_summary: "Frequency counting is O(n) time and O(1) space for fixed alphabet size.",
            interview_tip: "Ask clarifying questions: Are inputs always lowercase? Are there unicode characters? This changes the space complexity analysis."
          },
          {
            id: "plus_one",
            title: "Plus One",
            why_it_matters: "Tests understanding of carry propagation in arithmetic. This simulation pattern appears in problems involving big integer arithmetic.",
            core_pattern: "Simulation / Carry Propagation",
            tags: ["array", "math"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Reverse Iteration with Carry",
                idea: "Start from the last digit (least significant). Add 1 and handle carry propagation towards the most significant digit. If carry remains after processing all digits, prepend a 1.",
                steps: [
                  "Start from the last index (rightmost digit)",
                  "Add 1 to the current digit",
                  "If digit becomes 10, set it to 0 and continue (carry)",
                  "If digit is less than 10, no more carry needed, return",
                  "If we exit the loop with carry, prepend 1 to the array",
                  "Return the result"
                ],
                time_complexity: "O(n) - worst case we traverse all digits (e.g., 999 → 1000)",
                space_complexity: "O(1) - in-place modification (O(n) if new array needed)",
                when_to_use: "Standard approach for this problem"
              }
            ],
            complexity_summary: "O(n) time, O(1) space for in-place. Edge case: all 9s require a new array.",
            interview_tip: "Handle edge case 999...9 explicitly. Show you understand carry propagation can cascade."
          },
          {
            id: "intersection_two_arrays",
            title: "Intersection of Two Arrays",
            why_it_matters: "Teaches set operations and their efficiency. This pattern is useful for finding common elements in multiple collections.",
            core_pattern: "Hash Set Intersection",
            tags: ["array", "hashing", "set"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Two Sets",
                idea: "Convert one array to a set. Iterate through the other array and collect elements that exist in the set. Use another set for result to avoid duplicates.",
                steps: [
                  "Convert nums1 to a hash set for O(1) lookup",
                  "Create a result set (to avoid duplicate results)",
                  "Iterate through nums2",
                  "If element exists in set1, add to result set",
                  "Convert result set to array and return"
                ],
                time_complexity: "O(n + m) - where n and m are array lengths",
                space_complexity: "O(min(n, m)) - store the smaller array in set"
              },
              {
                name: "Sorting + Two Pointers",
                idea: "Sort both arrays. Use two pointers to find common elements by advancing the pointer with the smaller value.",
                steps: [
                  "Sort both arrays",
                  "Initialize two pointers i = 0, j = 0",
                  "While both pointers in bounds:",
                  "  If equal, add to result (skip duplicates), advance both",
                  "  If nums1[i] < nums2[j], advance i",
                  "  Else advance j"
                ],
                time_complexity: "O(n log n + m log m) - sorting dominated",
                space_complexity: "O(1) - if sorting in-place",
                when_to_use: "When space is limited and arrays can be modified"
              }
            ],
            complexity_summary: "Set approach is O(n+m) time. Sorting approach is O(n log n) but uses less space.",
            interview_tip: "Discuss trade-offs between the approaches. Ask if arrays are already sorted (changes optimal approach)."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "maximum_subarray",
            title: "Maximum Subarray",
            why_it_matters: "Classic dynamic programming problem that introduces Kadane's algorithm. Tests understanding of optimal substructure and greedy choices. This pattern appears in many optimization problems.",
            core_pattern: "Kadane's Algorithm",
            tags: ["array", "dynamic-programming", "greedy"],
            difficulty: "Medium",
            acceptance_rate: "34.2%",
            approaches: [
              {
                name: "Brute Force",
                idea: "Try every possible subarray by fixing start and end points. Calculate sum for each subarray and track the maximum.",
                steps: [
                  "For each starting index i from 0 to n-1",
                  "For each ending index j from i to n-1",
                  "Calculate sum of subarray from i to j",
                  "Update max if current sum is larger",
                  "Return the maximum sum found"
                ],
                time_complexity: "O(n³) naive, O(n²) with running sum optimization",
                space_complexity: "O(1)",
                when_to_use: "Only for understanding the problem, never in interviews"
              },
              {
                name: "Divide and Conquer",
                idea: "Split array in half. Maximum subarray is either entirely in left half, entirely in right half, or crosses the middle. Recursively solve and combine.",
                steps: [
                  "Base case: single element returns itself",
                  "Recursively find max subarray in left half",
                  "Recursively find max subarray in right half",
                  "Find max subarray crossing middle (expand from center)",
                  "Return maximum of these three"
                ],
                time_complexity: "O(n log n) - T(n) = 2T(n/2) + O(n)",
                space_complexity: "O(log n) - recursion stack",
                when_to_use: "To demonstrate divide and conquer understanding"
              },
              {
                name: "Kadane's Algorithm (Optimal)",
                idea: "At each position, decide: should we extend the previous subarray or start fresh? The answer depends on whether the previous sum is positive (helpful) or negative (harmful).",
                steps: [
                  "Initialize maxEndingHere = arr[0], maxSoFar = arr[0]",
                  "For each element from index 1 to n-1:",
                  "  maxEndingHere = max(element, maxEndingHere + element)",
                  "  This decides: start new subarray or extend previous",
                  "  maxSoFar = max(maxSoFar, maxEndingHere)",
                  "Return maxSoFar"
                ],
                time_complexity: "O(n) - single pass",
                space_complexity: "O(1) - only two variables",
                when_to_use: "Always use this in interviews. It's the optimal solution."
              }
            ],
            complexity_summary: "Kadane's O(n) time, O(1) space is optimal. The key insight: if current sum becomes negative, start fresh.",
            interview_tip: "Explain the intuition: negative prefix sum only hurts future sums. Handle all-negative arrays properly. Mention this is a form of DP with space optimization."
          },
          {
            id: "three_sum",
            title: "3-Sum",
            why_it_matters: "Combines sorting with two-pointer technique. Tests ability to handle duplicates and optimize from O(n³) to O(n²). Very common interview problem.",
            core_pattern: "Sorting + Two Pointers",
            tags: ["array", "two-pointers", "sorting"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Brute Force",
                idea: "Try all triplet combinations. Use a set to avoid duplicate triplets.",
                steps: [
                  "Three nested loops for indices i, j, k",
                  "Check if nums[i] + nums[j] + nums[k] == 0",
                  "Add valid triplets to result (handling duplicates)"
                ],
                time_complexity: "O(n³)",
                space_complexity: "O(1) or O(n) for storing results",
                when_to_use: "Only to understand the problem"
              },
              {
                name: "Sort + Two Pointers (Optimal)",
                idea: "Sort the array first. Fix one element, then use two pointers on the remaining elements to find pairs that sum to the negative of the fixed element.",
                steps: [
                  "Sort the array",
                  "For each element nums[i] (fix it as first number):",
                  "  If nums[i] > 0, break (can't sum to 0 with larger positive numbers)",
                  "  Skip duplicates: if nums[i] == nums[i-1], continue",
                  "  Use two pointers left = i+1, right = n-1",
                  "  While left < right:",
                  "    Calculate sum = nums[i] + nums[left] + nums[right]",
                  "    If sum < 0, left++ (need larger value)",
                  "    If sum > 0, right-- (need smaller value)",
                  "    If sum == 0, add triplet, skip duplicates for left and right"
                ],
                time_complexity: "O(n²) - O(n log n) sort + O(n²) two-pointer passes",
                space_complexity: "O(1) or O(n) depending on sort implementation",
                when_to_use: "Standard interview approach"
              }
            ],
            complexity_summary: "Sorting enables O(n²) solution. Without sorting, hash-based approach is also O(n²) but more complex.",
            interview_tip: "Duplicate handling is crucial! Show how to skip same values for all three positions. Early termination when nums[i] > 0 is a nice optimization."
          },
          {
            id: "subarray_sum_equals_k",
            title: "Subarray Sum Equals K",
            why_it_matters: "Introduces prefix sum + hash map pattern. This is a powerful technique for range sum queries and appears in many problems.",
            core_pattern: "Prefix Sum + Hash Map",
            tags: ["array", "hashing", "prefix-sum"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Brute Force",
                idea: "Check all subarrays by trying every start and end point.",
                time_complexity: "O(n²)",
                space_complexity: "O(1)",
                when_to_use: "Only for small inputs"
              },
              {
                name: "Prefix Sum + HashMap (Optimal)",
                idea: "If prefix_sum[j] - prefix_sum[i] = k, then subarray (i, j] sums to k. Use hash map to count prefix sums. For each position, check how many times (current_sum - k) appeared before.",
                steps: [
                  "Initialize prefixSum = 0, count = 0",
                  "Create hashmap with {0: 1} (empty prefix has sum 0)",
                  "For each element:",
                  "  prefixSum += current element",
                  "  If (prefixSum - k) exists in map, add its count to result",
                  "  Increment map[prefixSum]",
                  "Return count"
                ],
                time_complexity: "O(n) - single pass",
                space_complexity: "O(n) - hash map for prefix sums",
                when_to_use: "Standard optimal solution"
              }
            ],
            complexity_summary: "O(n) time with prefix sum + hash map. Key insight: sum(i,j) = prefix[j] - prefix[i-1].",
            interview_tip: "Don't forget to initialize map with {0: 1} for subarrays starting from index 0. This handles edge cases."
          },
          {
            id: "product_except_self",
            title: "Product of Array Except Self",
            why_it_matters: "Tests ability to think in terms of prefix and suffix computations. Constraint: no division allowed, which requires creative thinking.",
            core_pattern: "Prefix & Suffix Products",
            tags: ["array", "prefix"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Two Pass with Extra Space",
                idea: "For each position, the answer is (product of all elements to the left) × (product of all elements to the right). Compute left products array and right products array separately.",
                steps: [
                  "Create left array: left[i] = product of nums[0..i-1]",
                  "Create right array: right[i] = product of nums[i+1..n-1]",
                  "result[i] = left[i] × right[i]"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) for left and right arrays",
                when_to_use: "Easier to understand, good for explanation"
              },
              {
                name: "Single Output Array (Space Optimized)",
                idea: "Use the output array to store left products first. Then iterate from right, maintaining a running right product, and multiply into the output.",
                steps: [
                  "First pass (left to right): output[i] = product of all left elements",
                  "Second pass (right to left):",
                  "  Maintain rightProduct variable",
                  "  output[i] *= rightProduct",
                  "  rightProduct *= nums[i]",
                  "Return output array"
                ],
                time_complexity: "O(n) - two passes",
                space_complexity: "O(1) - output array doesn't count as extra space",
                when_to_use: "Optimal solution for interviews"
              }
            ],
            complexity_summary: "O(n) time, O(1) extra space (excluding output). Division would be simpler but not allowed.",
            interview_tip: "Handle zeros carefully! One zero: only that position has non-zero result. Two+ zeros: all results are zero."
          },
          {
            id: "longest_consecutive_sequence",
            title: "Longest Consecutive Sequence",
            why_it_matters: "Teaches how to achieve O(n) when O(n log n) sorting seems necessary. The key insight: only start counting from sequence beginnings.",
            core_pattern: "Hash Set + Smart Traversal",
            tags: ["array", "hashing"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Sorting",
                idea: "Sort the array and count consecutive elements.",
                time_complexity: "O(n log n)",
                space_complexity: "O(1)",
                when_to_use: "When simpler solution is preferred over optimal"
              },
              {
                name: "Hash Set + Sequence Start (Optimal)",
                idea: "Put all numbers in a set. For each number, only start counting if it's the beginning of a sequence (num-1 is not in set). Then count forward.",
                steps: [
                  "Add all numbers to a hash set",
                  "For each number in the set:",
                  "  If (num - 1) is NOT in set, this is a sequence start",
                  "  Count consecutive numbers: num, num+1, num+2, ...",
                  "  Update max length",
                  "Return max length"
                ],
                time_complexity: "O(n) - each number checked at most twice",
                space_complexity: "O(n) - hash set",
                when_to_use: "When O(n) time is required"
              }
            ],
            complexity_summary: "O(n) because we only traverse each sequence once. The 'is this a start?' check prevents redundant counting.",
            interview_tip: "Explain why it's O(n): each number is visited at most twice (once when checking if it's a start, once when counting). The inner while loop doesn't make it O(n²)."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "trapping_rain_water",
            title: "Trapping Rain Water",
            why_it_matters: "Classic problem testing multiple approaches: brute force → DP → two pointers. Tests ability to optimize space from O(n) to O(1).",
            core_pattern: "Two Pointer / Prefix Max",
            tags: ["array", "two-pointers", "dynamic-programming"],
            difficulty: "Hard",
            acceptance_rate: "40.6%",
            approaches: [
              {
                name: "Brute Force",
                idea: "For each position, find the maximum height to its left and right. Water at that position = min(leftMax, rightMax) - height[i].",
                steps: [
                  "For each index i:",
                  "  Scan left to find max height",
                  "  Scan right to find max height",
                  "  Water at i = min(leftMax, rightMax) - height[i]",
                  "Sum all water amounts"
                ],
                time_complexity: "O(n²) - for each element, scan left and right",
                space_complexity: "O(1)",
                when_to_use: "Initial understanding only"
              },
              {
                name: "Prefix Max Arrays (DP)",
                idea: "Precompute leftMax[i] and rightMax[i] arrays. Then calculate water at each position in one pass.",
                steps: [
                  "leftMax[i] = max(height[0..i])",
                  "rightMax[i] = max(height[i..n-1])",
                  "water[i] = min(leftMax[i], rightMax[i]) - height[i]",
                  "Sum all positive water values"
                ],
                time_complexity: "O(n) - three passes",
                space_complexity: "O(n) - two extra arrays",
                when_to_use: "When you need to explain the concept clearly"
              },
              {
                name: "Two Pointers (Optimal)",
                idea: "Use two pointers from both ends. At each step, move the pointer with the smaller max height. We can safely calculate water because the other side has a taller (or equal) wall.",
                steps: [
                  "Initialize left = 0, right = n-1",
                  "Track leftMax = 0, rightMax = 0",
                  "While left < right:",
                  "  If height[left] < height[right]:",
                  "    If height[left] >= leftMax: update leftMax",
                  "    Else: add (leftMax - height[left]) to water",
                  "    left++",
                  "  Else: (symmetric logic for right side)",
                  "Return total water"
                ],
                time_complexity: "O(n) - single pass",
                space_complexity: "O(1) - only pointers and max trackers",
                when_to_use: "Optimal interview solution"
              }
            ],
            complexity_summary: "Two pointers achieves O(n) time, O(1) space. Key insight: we only need to know the max on the limiting side.",
            interview_tip: "Start with brute force, optimize to DP arrays, then show two pointers. This demonstrates problem-solving progression.",
            external_links: [
              { label: "LeetCode", url: "https://leetcode.com/problems/trapping-rain-water/" },
              { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/trapping-rain-water/" }
            ]
          },
          {
            id: "minimum_window_substring",
            title: "Minimum Window Substring",
            why_it_matters: "One of the hardest sliding window problems. Tests ability to track multiple character frequencies and optimize window shrinking.",
            core_pattern: "Sliding Window + Two HashMaps",
            tags: ["string", "sliding-window", "hash-map"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Sliding Window + Frequency Maps",
                idea: "Expand window until all required characters are covered. Then shrink from left while maintaining validity to find minimum window. Use 'have' and 'need' counters to avoid rechecking all frequencies.",
                steps: [
                  "Build frequency map for target string t (what we need)",
                  "Initialize window map (what we have in current window)",
                  "Track 'have' = 0, 'need' = unique chars in t",
                  "Expand right pointer, update window map",
                  "When window map[char] == target map[char], increment 'have'",
                  "While have == need:",
                  "  Update result if current window is smaller",
                  "  Shrink from left, decrement window map",
                  "  If window map[char] < target map[char], decrement 'have'",
                  "Return minimum window found"
                ],
                time_complexity: "O(n + m) where n = |s|, m = |t|",
                space_complexity: "O(k) where k = unique characters",
                when_to_use: "Standard approach for minimum window problems"
              }
            ],
            complexity_summary: "O(n + m) time, O(k) space. The 'have/need' optimization avoids O(k) comparison at each step.",
            interview_tip: "This is a hard problem. Draw the window state at each step. Handle edge cases: empty strings, no valid window exists."
          },
          {
            id: "sliding_window_max",
            title: "Sliding Window Maximum",
            why_it_matters: "Introduces monotonic deque data structure. This pattern is useful for problems needing efficient min/max queries in a sliding window.",
            core_pattern: "Monotonic Deque",
            tags: ["array", "sliding-window", "deque"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Brute Force",
                idea: "For each window position, scan all k elements to find maximum.",
                time_complexity: "O(n × k)",
                space_complexity: "O(1)",
                when_to_use: "Only for understanding"
              },
              {
                name: "Monotonic Decreasing Deque (Optimal)",
                idea: "Maintain a deque where elements are in decreasing order. The front always has the maximum. Remove elements outside window and smaller elements that can never be the max.",
                steps: [
                  "Use deque to store indices (not values)",
                  "For each new element:",
                  "  Remove indices outside current window from front",
                  "  Remove smaller elements from back (they can never be max)",
                  "  Add current index to back",
                  "Front of deque is the max for current window"
                ],
                time_complexity: "O(n) - each element added/removed at most once",
                space_complexity: "O(k) - deque holds at most k elements",
                when_to_use: "When you need O(1) access to min/max in sliding window"
              }
            ],
            complexity_summary: "O(n) time, O(k) space. Each element enters and leaves the deque exactly once.",
            interview_tip: "Store indices, not values (to check if element is still in window). Explain why removing smaller elements is correct: they can never be the maximum while the larger element exists in the window."
          },
          {
            id: "first_missing_positive",
            title: "First Missing Positive",
            why_it_matters: "Tests ability to use the array itself as a hash map. Achieves O(n) time with O(1) space through clever index manipulation.",
            core_pattern: "Index as Hash / Cyclic Sort",
            tags: ["array", "hash-map"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Cyclic Sort (Optimal)",
                idea: "Place each number at its 'correct' index (number 1 at index 0, number 2 at index 1, etc.). Then scan to find the first position where the number doesn't match.",
                steps: [
                  "For each position i:",
                  "  While nums[i] is in range [1, n] and not in correct position:",
                  "    Swap nums[i] with nums[nums[i] - 1]",
                  "After placing, scan array:",
                  "  If nums[i] != i + 1, return i + 1",
                  "If all positions correct, return n + 1"
                ],
                time_complexity: "O(n) - each number swapped at most once",
                space_complexity: "O(1) - in-place",
                when_to_use: "When O(1) space is required"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. The key insight: answer must be in range [1, n+1].",
            interview_tip: "Explain why the answer is bounded by n+1. The while loop looks O(n²) but each element moves at most once, making total swaps O(n)."
          },
          {
            id: "largest_rectangle_histogram",
            title: "Largest Rectangle in Histogram",
            why_it_matters: "Classic monotonic stack problem. Understanding this unlocks many 2D problems like maximal rectangle in a binary matrix.",
            core_pattern: "Monotonic Stack",
            tags: ["array", "stack"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Brute Force",
                idea: "For each bar, expand left and right to find how far the rectangle extends.",
                time_complexity: "O(n²)",
                space_complexity: "O(1)",
                when_to_use: "Initial understanding"
              },
              {
                name: "Monotonic Stack (Optimal)",
                idea: "Maintain a stack of increasing heights. When we encounter a shorter bar, pop taller bars and calculate their maximum rectangle width.",
                steps: [
                  "Initialize stack with -1 (sentinel for width calculation)",
                  "For each bar:",
                  "  While stack top is taller than current:",
                  "    Pop the bar, calculate its rectangle area",
                  "    Width = current_index - stack.top() - 1",
                  "    Update max area",
                  "  Push current index",
                  "Process remaining bars in stack",
                  "Return max area"
                ],
                time_complexity: "O(n) - each bar pushed and popped once",
                space_complexity: "O(n) - stack",
                when_to_use: "Optimal solution for interviews"
              }
            ],
            complexity_summary: "O(n) time and space. When a bar is popped, we know exactly how far its rectangle can extend.",
            interview_tip: "Draw examples step by step. The sentinel -1 in stack simplifies width calculation. This problem is the building block for 'Maximal Rectangle' in a matrix."
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
          { 
            id: "reverse_string", 
            title: "Reverse String", 
            why_it_matters: "Fundamental string manipulation that introduces the two-pointer technique. This pattern appears in many harder problems.",
            core_pattern: "Two Pointer", 
            tags: ["string", "two-pointers"],
            difficulty: "Easy", 
            approaches: [
              { 
                name: "Two Pointers", 
                idea: "Use two pointers starting from both ends. Swap characters at left and right pointers, then move them towards center until they meet.", 
                steps: [
                  "Initialize left = 0, right = length - 1",
                  "While left < right: swap chars at left and right",
                  "Increment left, decrement right",
                  "Stop when pointers meet or cross"
                ],
                time_complexity: "O(n) - each character visited once", 
                space_complexity: "O(1) - in-place swap, no extra space",
                when_to_use: "When you need to reverse any sequence in-place"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. Classic in-place reversal pattern.",
            interview_tip: "This is a warm-up problem. Mention you can also use recursion (O(n) stack space) but iterative is preferred."
          },
          { 
            id: "valid_palindrome", 
            title: "Valid Palindrome", 
            why_it_matters: "Tests string comparison with character filtering. A common pattern in string problems.",
            core_pattern: "Two Pointer", 
            tags: ["string", "two-pointers"],
            difficulty: "Easy", 
            approaches: [
              { 
                name: "Two Pointers", 
                idea: "Compare characters from both ends while skipping non-alphanumeric characters. Convert to lowercase for case-insensitive comparison.", 
                steps: [
                  "Initialize left = 0, right = length - 1",
                  "Skip non-alphanumeric characters by moving pointers",
                  "Compare lowercase versions of chars at both pointers",
                  "If mismatch found, return false",
                  "If pointers meet, return true"
                ],
                time_complexity: "O(n) - single pass through string", 
                space_complexity: "O(1) - no extra data structures",
                when_to_use: "Any problem requiring symmetric comparison with filtering"
              }
            ],
            complexity_summary: "O(n) time, O(1) space.",
            interview_tip: "Clarify what counts as alphanumeric. Handle edge cases: empty string, single char, all non-alphanumeric."
          },
          { 
            id: "merge_sorted_arrays", 
            title: "Merge Sorted Arrays", 
            why_it_matters: "Core building block for merge sort. Tests understanding of in-place array manipulation.",
            core_pattern: "Two Pointer Merge", 
            tags: ["array", "two-pointers", "sorting"],
            difficulty: "Easy", 
            approaches: [
              { 
                name: "Merge from End", 
                idea: "Start from the end of both arrays. Compare elements and place the larger one at the end of the first array. This avoids overwriting elements we haven't processed.", 
                steps: [
                  "p1 = m - 1 (last element of nums1's data)",
                  "p2 = n - 1 (last element of nums2)",
                  "p = m + n - 1 (last position of merged array)",
                  "While p2 >= 0: compare and place larger element at p",
                  "Decrement appropriate pointers"
                ],
                time_complexity: "O(n + m) - process each element once", 
                space_complexity: "O(1) - merge in-place",
                when_to_use: "When merging into an array with pre-allocated space"
              }
            ],
            complexity_summary: "O(n + m) time, O(1) space. Key insight: work backwards to avoid overwriting.",
            interview_tip: "The trick is starting from the end. If you start from the beginning, you'd overwrite elements in nums1."
          }
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
          { 
            id: "max_sum_k", 
            title: "Max Sum Subarray of Size K", 
            why_it_matters: "Introduces the sliding window technique. This optimization pattern reduces O(n*k) brute force to O(n).",
            core_pattern: "Fixed Window", 
            tags: ["array", "sliding-window"],
            difficulty: "Easy", 
            approaches: [
              { 
                name: "Sliding Window", 
                idea: "Maintain a window of exactly k elements. Slide by removing the leftmost element and adding the next element on the right.", 
                steps: [
                  "Calculate sum of first k elements",
                  "Store this as currentMax",
                  "For each subsequent position: subtract element leaving window, add element entering window",
                  "Update max if current sum is larger",
                  "Return max after processing all windows"
                ],
                time_complexity: "O(n) - single pass through array", 
                space_complexity: "O(1) - only track current sum and max",
                when_to_use: "Any problem asking for max/min/sum of contiguous elements of fixed size"
              }
            ],
            complexity_summary: "O(n) time vs O(n*k) brute force. Fixed-size window is simpler than variable window.",
            interview_tip: "This is the foundation for harder sliding window problems. Master this before moving to variable-size windows."
          },
          { 
            id: "longest_substring_k_distinct_variant", 
            title: "Longest Substring with K Distinct Characters", 
            why_it_matters: "Introduces variable-size sliding window with a constraint. Common pattern in string problems.",
            core_pattern: "Variable Window", 
            tags: ["string", "sliding-window", "hashmap"],
            difficulty: "Easy", 
            approaches: [
              { 
                name: "HashMap + Sliding Window", 
                idea: "Expand window by adding characters. When distinct count exceeds k, shrink from left until constraint is satisfied.", 
                steps: [
                  "Use HashMap to track character frequencies in window",
                  "Expand right pointer, add char to map",
                  "While map.size > k: shrink from left, remove chars with 0 count",
                  "Update maxLength at each valid window",
                  "Return maxLength"
                ],
                time_complexity: "O(n) - each character added and removed at most once", 
                space_complexity: "O(k) - map stores at most k+1 characters",
                when_to_use: "When window size varies based on a constraint (count, sum, etc.)"
              }
            ],
            complexity_summary: "O(n) time, O(k) space. Variable window = expand until invalid, shrink until valid.",
            interview_tip: "The key insight: both pointers only move forward, so total operations are O(n), not O(n²)."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          { 
            id: "longest_substring_no_repeat", 
            title: "Longest Substring Without Repeating Characters", 
            why_it_matters: "One of the most frequently asked string problems. Tests your understanding of variable-size sliding window.",
            core_pattern: "Variable Window", 
            tags: ["string", "sliding-window", "hashmap"],
            difficulty: "Medium", 
            approaches: [
              { 
                name: "Sliding Window + HashSet", 
                idea: "Expand the window by moving right pointer. When a duplicate is found, shrink from left until the duplicate is removed.", 
                steps: [
                  "Use a Set to track characters in current window",
                  "Move right pointer: if char not in set, add it and update maxLength",
                  "If char already in set: remove chars from left until duplicate is gone",
                  "Continue until right reaches end",
                  "Return maxLength"
                ],
                time_complexity: "O(n) - each char added/removed at most once", 
                space_complexity: "O(min(n, alphabet)) - set stores unique chars",
                when_to_use: "When you need to find longest substring with unique constraint"
              },
              {
                name: "Sliding Window + HashMap (Optimized)",
                idea: "Store each character's last seen index. When duplicate found, jump left pointer directly to position after previous occurrence.",
                steps: [
                  "Use HashMap: char -> last index",
                  "For each char at right: if in map and index >= left, move left to map[char] + 1",
                  "Update map[char] = right",
                  "Update maxLength = max(maxLength, right - left + 1)"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(min(n, alphabet))",
                when_to_use: "Slightly faster as left pointer can jump instead of sliding one by one"
              }
            ],
            complexity_summary: "Both O(n) time. HashMap approach is slightly more efficient in practice.",
            interview_tip: "Use set or map for O(1) lookup. Be clear about what 'substring' vs 'subsequence' means."
          },
          { 
            id: "character_replacement", 
            title: "Longest Repeating Character Replacement", 
            why_it_matters: "Introduces the concept of tracking the most frequent element in a window. Common pattern in optimization problems.",
            core_pattern: "Variable Window", 
            tags: ["string", "sliding-window"],
            difficulty: "Medium", 
            approaches: [
              { 
                name: "Sliding Window + Frequency Count", 
                idea: "Track the count of the most frequent character in the window. If (window size - max frequency) > k, shrink the window.", 
                steps: [
                  "Maintain frequency count array for 26 letters",
                  "Track maxFreq = max count of any single char in window",
                  "If (right - left + 1) - maxFreq > k: shrink from left",
                  "Update result with current window size",
                  "Key insight: maxFreq doesn't need to be accurate when shrinking"
                ],
                time_complexity: "O(n) - single pass", 
                space_complexity: "O(26) = O(1) - fixed size frequency array",
                when_to_use: "When allowed to change k elements to maximize a uniform sequence"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. The trick is the 'at most k replacements' translates to window_size - max_freq <= k.",
            interview_tip: "The maxFreq optimization is tricky to explain. Practice articulating why it's correct."
          },
          { 
            id: "min_size_subarray_sum", 
            title: "Minimum Size Subarray Sum", 
            why_it_matters: "Classic variable window problem. Find smallest window that satisfies a condition.",
            core_pattern: "Variable Window", 
            tags: ["array", "sliding-window"],
            difficulty: "Medium", 
            approaches: [
              { 
                name: "Sliding Window", 
                idea: "Expand window until sum >= target, then shrink from left while maintaining the condition to find minimum length.", 
                steps: [
                  "Initialize left = 0, currentSum = 0, minLength = infinity",
                  "For each right: add arr[right] to currentSum",
                  "While currentSum >= target: update minLength, subtract arr[left], increment left",
                  "Return minLength (or 0 if never found)"
                ],
                time_complexity: "O(n) - each element processed twice at most", 
                space_complexity: "O(1)",
                when_to_use: "Finding minimum window that satisfies a sum/count threshold"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. Note: this is minimum length, so we shrink while valid.",
            interview_tip: "Contrast with maximum length problems where you expand while valid and shrink when invalid."
          },
          { 
            id: "fruits_into_baskets", 
            title: "Fruits Into Baskets", 
            why_it_matters: "Same as longest substring with at most k distinct characters (k=2). Good practice for pattern recognition.",
            core_pattern: "Variable Window", 
            tags: ["array", "sliding-window", "hashmap"],
            difficulty: "Medium", 
            approaches: [
              { 
                name: "Sliding Window + HashMap", 
                idea: "Maintain a window with at most 2 distinct fruit types. Shrink when you have more than 2 types.", 
                steps: [
                  "Use HashMap to track count of each fruit type in window",
                  "Expand right, add fruit to map",
                  "While map.size > 2: shrink from left, remove fruits with count 0",
                  "Update maxLength with current window size"
                ],
                time_complexity: "O(n)", 
                space_complexity: "O(1) - map has at most 3 entries",
                when_to_use: "Maximum subarray with at most k distinct elements"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. Identical to 'Longest Substring with At Most K Distinct' with k=2.",
            interview_tip: "Recognize this as a disguised version of the k-distinct problem. Pattern recognition is key."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          { 
            id: "minimum_window_substring_sw", 
            title: "Minimum Window Substring", 
            why_it_matters: "One of the hardest sliding window problems. Tests ability to track multiple character frequencies.",
            core_pattern: "Variable Window", 
            tags: ["string", "sliding-window", "hashmap"],
            difficulty: "Hard", 
            approaches: [
              { 
                name: "Sliding Window + Two HashMaps", 
                idea: "Expand until all required characters are covered, then shrink to find minimum window. Track how many unique characters have sufficient count.", 
                steps: [
                  "Build frequency map for target string t",
                  "Use 'have' counter for chars meeting required frequency",
                  "Expand right: update window freq, increment 'have' when freq matches required",
                  "While have == need: update result, shrink from left, decrement 'have' when freq drops below required",
                  "Return minimum window found"
                ],
                time_complexity: "O(n + m) where n = length of s, m = length of t", 
                space_complexity: "O(k) where k = unique characters",
                when_to_use: "Finding minimum window containing all required elements"
              }
            ],
            complexity_summary: "O(n + m) time, O(k) space. The 'have/need' counter optimization avoids checking all frequencies each time.",
            interview_tip: "This is a hard problem. Draw out the window state at each step. Handle edge cases: empty strings, no valid window."
          },
          { 
            id: "sliding_window_max_sw", 
            title: "Sliding Window Maximum", 
            why_it_matters: "Introduces monotonic deque data structure. Useful for problems needing efficient min/max in a sliding window.",
            core_pattern: "Monotonic Deque", 
            tags: ["array", "sliding-window", "deque"],
            difficulty: "Hard", 
            approaches: [
              { 
                name: "Monotonic Decreasing Deque", 
                idea: "Maintain a deque of indices where elements are in decreasing order. The front always has the maximum for current window.", 
                steps: [
                  "Use deque to store indices (not values)",
                  "For each element: remove smaller elements from back (they can't be max)",
                  "Add current index to back",
                  "Remove front if it's outside window (index <= i - k)",
                  "Front of deque is the max for current window"
                ],
                time_complexity: "O(n) - each element added/removed from deque at most once", 
                space_complexity: "O(k) - deque holds at most k elements",
                when_to_use: "When you need O(1) access to min/max in a sliding window"
              }
            ],
            complexity_summary: "O(n) time, O(k) space. Monotonic deque maintains order property efficiently.",
            interview_tip: "Explain why we store indices instead of values (to check if element is still in window). Draw the deque state."
          }
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
          { 
            id: "binary_search", 
            title: "Binary Search", 
            why_it_matters: "Fundamental algorithm that achieves O(log n) search in sorted data. The basis for many optimization techniques.",
            core_pattern: "Binary Search", 
            tags: ["array", "binary-search"],
            difficulty: "Easy", 
            approaches: [
              { 
                name: "Iterative Binary Search", 
                idea: "Repeatedly halve the search space by comparing target with middle element. Eliminate half the remaining elements each iteration.", 
                steps: [
                  "Initialize left = 0, right = n - 1",
                  "While left <= right:",
                  "  Calculate mid = left + (right - left) / 2 (avoids overflow)",
                  "  If arr[mid] == target: return mid",
                  "  If arr[mid] < target: search right half (left = mid + 1)",
                  "  Else: search left half (right = mid - 1)",
                  "Return -1 if not found"
                ],
                time_complexity: "O(log n) - halve search space each step", 
                space_complexity: "O(1) - only use pointers",
                when_to_use: "Searching in sorted arrays, or when search space can be halved based on a condition"
              }
            ],
            complexity_summary: "O(log n) time, O(1) space. Each iteration eliminates half the candidates.",
            interview_tip: "Use mid = left + (right - left) / 2 instead of (left + right) / 2 to prevent integer overflow."
          },
          { 
            id: "first_last_pos", 
            title: "First and Last Position of Element", 
            why_it_matters: "Extends binary search to find boundaries. Essential for problems involving ranges or counts.",
            core_pattern: "Binary Search", 
            tags: ["array", "binary-search"],
            difficulty: "Easy", 
            approaches: [
              { 
                name: "Two Binary Searches", 
                idea: "Run binary search twice: once to find leftmost occurrence, once to find rightmost. Modify the search to continue even after finding target.", 
                steps: [
                  "Find left bound: when arr[mid] == target, continue searching left (right = mid - 1)",
                  "Find right bound: when arr[mid] == target, continue searching right (left = mid + 1)",
                  "Track the last found position in each search",
                  "Return [leftBound, rightBound] or [-1, -1] if not found"
                ],
                time_complexity: "O(log n) - two binary searches are still O(log n)", 
                space_complexity: "O(1)",
                when_to_use: "When you need to find the range of duplicates in a sorted array"
              }
            ],
            complexity_summary: "O(log n) time for both searches combined. Key: don't stop when you find target.",
            interview_tip: "This pattern is useful for counting occurrences: count = rightBound - leftBound + 1."
          }
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
          { id: "median_sorted_arrays", title: "Median of Two Sorted Arrays", core_pattern: "Binary Search", difficulty: "Hard", approaches: [{ name: "Binary Search on Partition", idea: "Find partition where left halves equal right", time_complexity: "O(log min(m,n))", space_complexity: "O(1)" }], interview_tip: "Binary search on smaller array." },
          { id: "split_array_largest", title: "Split Array Largest Sum", core_pattern: "Binary Search on Answer", difficulty: "Hard", approaches: [{ name: "Binary Search + Greedy", idea: "Binary search on answer, verify with greedy", time_complexity: "O(n log sum)", space_complexity: "O(1)" }] }
        ]
      }
    ]
  },
  {
    id: "linked_lists",
    title: "Linked Lists",
    description: "Pointer manipulation patterns for singly and doubly linked lists.",
    lesson_count: 12,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "reverse_linked_list",
            title: "Reverse Linked List",
            why_it_matters: "The most fundamental linked list operation. This pattern of pointer manipulation is the building block for many advanced problems. Mastering this opens doors to reversing sublists, palindrome checks, and more.",
            core_pattern: "Pointer Manipulation",
            tags: ["linked-list", "pointers"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Iterative (Three Pointers)",
                idea: "Use three pointers: prev, current, and next. At each step, reverse the current node's pointer to point to prev instead of next.",
                steps: [
                  "Initialize prev = null, current = head",
                  "While current is not null:",
                  "  Store next = current.next (save reference before overwriting)",
                  "  Reverse: current.next = prev",
                  "  Move pointers: prev = current, current = next",
                  "Return prev (new head)"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(1) - only three pointers",
                when_to_use: "Preferred solution in interviews due to O(1) space"
              },
              {
                name: "Recursive",
                idea: "Recursively reverse the rest of the list, then fix the pointers. The key insight: after reversing the rest, the next node should point back to current.",
                steps: [
                  "Base case: if head is null or head.next is null, return head",
                  "Recursively reverse rest: newHead = reverse(head.next)",
                  "Fix pointer: head.next.next = head",
                  "Set head.next = null (new tail)",
                  "Return newHead"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) - recursion stack",
                when_to_use: "When recursion is allowed and stack space isn't a concern"
              }
            ],
            complexity_summary: "Iterative: O(n) time, O(1) space. Recursive: O(n) time, O(n) space.",
            interview_tip: "Draw the pointers at each step! Common mistake: forgetting to save next before overwriting current.next."
          },
          {
            id: "merge_two_sorted_lists",
            title: "Merge Two Sorted Lists",
            why_it_matters: "Building block for merge sort on linked lists. Tests ability to work with two pointers and handle edge cases cleanly.",
            core_pattern: "Two Pointer Merge",
            tags: ["linked-list", "two-pointers"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Iterative with Dummy Head",
                idea: "Use a dummy head to simplify edge cases. Compare nodes from both lists and attach the smaller one to the result. Move the pointer of the list we took from.",
                steps: [
                  "Create dummy node to simplify handling",
                  "current = dummy",
                  "While both lists have nodes:",
                  "  Attach smaller node to current.next",
                  "  Advance pointer of the list we took from",
                  "  Move current to current.next",
                  "Attach remaining nodes (one list might have extras)",
                  "Return dummy.next"
                ],
                time_complexity: "O(n + m)",
                space_complexity: "O(1) - just pointers",
                when_to_use: "Standard approach for merging sorted lists"
              },
              {
                name: "Recursive",
                idea: "If list1's head is smaller, it's the new head and its next is the merge of (list1.next, list2). Otherwise, list2's head is the new head.",
                steps: [
                  "Base cases: if either list is null, return the other",
                  "If list1.val <= list2.val:",
                  "  list1.next = merge(list1.next, list2)",
                  "  return list1",
                  "Else:",
                  "  list2.next = merge(list1, list2.next)",
                  "  return list2"
                ],
                time_complexity: "O(n + m)",
                space_complexity: "O(n + m) - recursion stack",
                when_to_use: "Clean code, but uses stack space"
              }
            ],
            complexity_summary: "O(n + m) time for both. Iterative uses O(1) space.",
            interview_tip: "The dummy head trick avoids special-casing the first node. This is a common pattern in linked list problems."
          },
          {
            id: "linked_list_cycle",
            title: "Linked List Cycle",
            why_it_matters: "Introduces Floyd's cycle detection (slow/fast pointers). This technique is used in many problems involving cycles, finding middle elements, and more.",
            core_pattern: "Fast/Slow Pointers (Floyd's)",
            tags: ["linked-list", "two-pointers"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Hash Set",
                idea: "Track visited nodes in a set. If we visit a node twice, there's a cycle.",
                steps: [
                  "Create empty hash set",
                  "Traverse the list",
                  "For each node: if in set, return true; else add to set",
                  "If we reach null, return false (no cycle)"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) - storing all nodes",
                when_to_use: "Simple approach when space isn't constrained"
              },
              {
                name: "Floyd's Cycle Detection (Optimal)",
                idea: "Use slow pointer (moves 1 step) and fast pointer (moves 2 steps). If there's a cycle, they will eventually meet. If fast reaches null, no cycle.",
                steps: [
                  "Initialize slow = head, fast = head",
                  "While fast and fast.next exist:",
                  "  slow = slow.next (1 step)",
                  "  fast = fast.next.next (2 steps)",
                  "  If slow == fast, return true (cycle detected)",
                  "Return false (fast reached end)"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1) - just two pointers",
                when_to_use: "When O(1) space is required"
              }
            ],
            complexity_summary: "Floyd's algorithm: O(n) time, O(1) space. The key insight: in a cycle, faster pointer will lap the slower one.",
            interview_tip: "Be ready to prove why they meet: fast gains 1 step per iteration, so it eventually catches slow."
          },
          {
            id: "middle_linked_list",
            title: "Middle of the Linked List",
            why_it_matters: "Another application of slow/fast pointers. When fast reaches the end, slow is at the middle. Useful for divide and conquer on linked lists.",
            core_pattern: "Fast/Slow Pointers",
            tags: ["linked-list", "two-pointers"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Two Pass (Count then Find)",
                idea: "First pass: count total nodes. Second pass: traverse to n/2.",
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Simple but requires two passes"
              },
              {
                name: "Slow/Fast Pointers (Optimal)",
                idea: "Move slow by 1 and fast by 2. When fast reaches end, slow is at middle.",
                steps: [
                  "Initialize slow = head, fast = head",
                  "While fast and fast.next exist:",
                  "  slow = slow.next",
                  "  fast = fast.next.next",
                  "Return slow (it's at the middle)"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "One pass solution"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. For even length lists, this returns the second middle.",
            interview_tip: "Clarify behavior for even-length lists. Some problems want the first middle, some want the second."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "remove_nth_from_end",
            title: "Remove Nth Node From End",
            why_it_matters: "Classic two-pointer problem with a gap. Demonstrates how to find the nth node from end in one pass.",
            core_pattern: "Two Pointers with Gap",
            tags: ["linked-list", "two-pointers"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Two Pointers with Gap",
                idea: "Move first pointer n steps ahead. Then move both pointers together. When first reaches end, second is at the node before the one to remove.",
                steps: [
                  "Create dummy node pointing to head (handles edge case)",
                  "Move first pointer n+1 steps from dummy",
                  "Move both pointers until first reaches null",
                  "second.next = second.next.next (skip the target node)",
                  "Return dummy.next"
                ],
                time_complexity: "O(n) - one pass",
                space_complexity: "O(1)",
                when_to_use: "Standard one-pass solution"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. The n+1 gap ensures we stop at the node BEFORE the target.",
            interview_tip: "Use a dummy node to handle removing the head. Edge case: removing the only node in the list."
          },
          {
            id: "reorder_list",
            title: "Reorder List",
            why_it_matters: "Combines three patterns: finding middle, reversing list, and merging. Tests your ability to decompose problems.",
            core_pattern: "Decomposition: Middle + Reverse + Merge",
            tags: ["linked-list", "two-pointers"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Three Steps",
                idea: "1) Find middle of list. 2) Reverse second half. 3) Merge the two halves alternating.",
                steps: [
                  "Use slow/fast pointers to find middle",
                  "Split list into two halves",
                  "Reverse the second half",
                  "Merge: take one from first, one from second, alternating",
                  "The result is L0 → Ln → L1 → Ln-1 → ..."
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Standard approach combining basic patterns"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. Each step is O(n), total is still O(n).",
            interview_tip: "Break down into helper functions. This shows clean code organization."
          },
          {
            id: "copy_list_random_pointer",
            title: "Copy List with Random Pointer",
            why_it_matters: "Tests ability to handle complex pointer relationships. The interweaving technique is elegant and space-efficient.",
            core_pattern: "Interweaving or HashMap",
            tags: ["linked-list", "hash-map"],
            difficulty: "Medium",
            approaches: [
              {
                name: "HashMap",
                idea: "First pass: create mapping from original to copy nodes. Second pass: set next and random pointers using the map.",
                steps: [
                  "First pass: create new nodes and map old → new",
                  "Second pass: for each old node, set:",
                  "  copy.next = map[old.next]",
                  "  copy.random = map[old.random]",
                  "Return map[head]"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) for the map",
                when_to_use: "Intuitive solution"
              },
              {
                name: "Interweaving (O(1) Space)",
                idea: "Interleave copied nodes with original: A → A' → B → B' → ... Then set random pointers, then separate lists.",
                steps: [
                  "Insert copy after each original: A → A' → B → B'",
                  "Set random: copy.random = original.random.next",
                  "Separate into two lists"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "When O(1) extra space is required"
              }
            ],
            complexity_summary: "HashMap: O(n) space. Interweaving: O(1) extra space.",
            interview_tip: "The interweaving approach is tricky to implement correctly. Practice it!"
          },
          {
            id: "add_two_numbers",
            title: "Add Two Numbers",
            why_it_matters: "Simulates addition with carry using linked lists. Tests handling of edge cases like different lengths and final carry.",
            core_pattern: "Simulation",
            tags: ["linked-list", "math"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Elementary Math Simulation",
                idea: "Add digits from both lists plus carry. Create new node for each digit. Handle different lengths and final carry.",
                steps: [
                  "Initialize dummy head and carry = 0",
                  "While either list has nodes OR carry exists:",
                  "  Sum = val1 + val2 + carry",
                  "  New digit = sum % 10, new carry = sum / 10",
                  "  Create node with digit, advance pointers",
                  "Return dummy.next"
                ],
                time_complexity: "O(max(n, m))",
                space_complexity: "O(max(n, m)) for result",
                when_to_use: "Standard approach"
              }
            ],
            complexity_summary: "O(max(n, m)) time and space.",
            interview_tip: "Don't forget the final carry! E.g., 5 + 5 = 10 needs an extra node."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "merge_k_sorted_lists",
            title: "Merge K Sorted Lists",
            why_it_matters: "Extends merge two lists to k lists. Multiple approaches test different optimization strategies.",
            core_pattern: "Heap or Divide and Conquer",
            tags: ["linked-list", "heap", "divide-and-conquer"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Min Heap",
                idea: "Push head of each list into min heap. Pop smallest, add its next to heap. Build result by repeatedly extracting min.",
                steps: [
                  "Add all k heads to min heap (by value)",
                  "While heap not empty:",
                  "  Pop smallest node, add to result",
                  "  If popped node has next, push next to heap",
                  "Return result"
                ],
                time_complexity: "O(n log k) - n total nodes, log k heap operations",
                space_complexity: "O(k) for heap",
                when_to_use: "When you have many lists to merge"
              },
              {
                name: "Divide and Conquer",
                idea: "Recursively merge pairs of lists until one remains. Like merge sort's merge step.",
                steps: [
                  "Pair up lists and merge each pair",
                  "Repeat until one list remains",
                  "Each level halves the number of lists"
                ],
                time_complexity: "O(n log k)",
                space_complexity: "O(1) or O(log k) for recursion",
                when_to_use: "Alternative to heap approach"
              }
            ],
            complexity_summary: "Both O(n log k). Heap uses O(k) space, D&C can be O(1).",
            interview_tip: "Discuss trade-offs: heap is simpler to implement, D&C can be more cache-friendly."
          },
          {
            id: "reverse_nodes_k_group",
            title: "Reverse Nodes in k-Group",
            why_it_matters: "Extends basic reverse to reversing sublists. Tests careful pointer management and edge case handling.",
            core_pattern: "Sublist Reversal",
            tags: ["linked-list"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Iterative with Helper",
                idea: "Process k nodes at a time. Count k nodes ahead to ensure we have enough. Reverse k nodes, connect to previous part, move to next group.",
                steps: [
                  "Create dummy head",
                  "For each group of k:",
                  "  Check if k nodes exist ahead",
                  "  If not, keep remaining as-is",
                  "  If yes, reverse k nodes using three pointers",
                  "  Connect reversed group to previous and next parts",
                  "  Move to next group"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Standard approach"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. Each node is visited at most twice.",
            interview_tip: "Draw the pointers before and after reversal. The connection logic is tricky."
          }
        ]
      }
    ]
  },
  {
    id: "trees",
    title: "Trees",
    description: "Binary trees, BSTs, and recursive tree patterns.",
    lesson_count: 18,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          { 
            id: "invert_tree", 
            title: "Invert Binary Tree", 
            why_it_matters: "Simple but elegant recursion that tests understanding of tree structure. Famous for being the interview question that Max Howell (Homebrew creator) allegedly failed.",
            core_pattern: "DFS / Recursion", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "Recursive DFS", 
                idea: "For each node, swap its left and right children, then recursively invert the subtrees. The base case is null nodes.", 
                steps: [
                  "Base case: if node is null, return null",
                  "Swap left and right children: temp = node.left, node.left = node.right, node.right = temp",
                  "Recursively invert left subtree: invert(node.left)",
                  "Recursively invert right subtree: invert(node.right)",
                  "Return the node"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(h) where h is height - recursion stack",
                when_to_use: "Clean recursive solution for any tree transformation"
              },
              {
                name: "Iterative BFS",
                idea: "Use a queue to process nodes level by level. For each node, swap its children and add them to the queue.",
                steps: [
                  "Initialize queue with root",
                  "While queue not empty: pop node, swap children",
                  "Add non-null children to queue",
                  "Return root"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) for queue at widest level",
                when_to_use: "When you want to avoid recursion"
              }
            ],
            complexity_summary: "O(n) time for both. Recursive uses O(h) stack space, iterative uses O(n) queue space.",
            interview_tip: "This is a warm-up problem. Solve it quickly and confidently to set a good tone."
          },
          { 
            id: "max_depth", 
            title: "Maximum Depth of Binary Tree", 
            why_it_matters: "Fundamental tree traversal that introduces the recursive depth calculation pattern. This pattern extends to many tree problems.",
            core_pattern: "DFS / Recursion", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "Recursive DFS", 
                idea: "Depth of a tree is 1 + max(depth of left subtree, depth of right subtree). Base case: null node has depth 0.", 
                steps: [
                  "Base case: if node is null, return 0",
                  "Recursively find depth of left subtree",
                  "Recursively find depth of right subtree",
                  "Return 1 + max(leftDepth, rightDepth)"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(h) - recursion stack depth",
                when_to_use: "Most natural solution for tree depth problems"
              },
              {
                name: "Iterative BFS (Level Order)",
                idea: "Process tree level by level. Count the number of levels.",
                steps: [
                  "Use queue for BFS",
                  "Process all nodes at current level before moving to next",
                  "Increment depth counter after each level",
                  "Return final depth count"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) for queue",
                when_to_use: "When counting levels explicitly"
              }
            ],
            complexity_summary: "O(n) time. Space is O(h) for DFS, O(n) for BFS.",
            interview_tip: "Start with the recursive solution. Mention BFS alternative if asked about iterative approach."
          },
          { 
            id: "same_tree", 
            title: "Same Tree", 
            why_it_matters: "Tests simultaneous traversal of two trees. The pattern of comparing two structures recursively is common in tree problems.",
            core_pattern: "DFS / Recursion", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "Recursive Comparison", 
                idea: "Two trees are the same if: roots have same value, left subtrees are same, and right subtrees are same. Handle null cases.", 
                steps: [
                  "If both null: return true (both empty)",
                  "If one null: return false (structure differs)",
                  "If values differ: return false",
                  "Return isSame(p.left, q.left) AND isSame(p.right, q.right)"
                ],
                time_complexity: "O(min(n, m)) where n, m are tree sizes",
                space_complexity: "O(min(h1, h2)) - recursion depth",
                when_to_use: "Standard recursive tree comparison"
              }
            ],
            complexity_summary: "O(n) time, O(h) space. Stops early if mismatch found.",
            interview_tip: "Handle null cases first, then compare values, then recurse. This order prevents null pointer errors."
          },
          { 
            id: "diameter_tree", 
            title: "Diameter of Binary Tree", 
            why_it_matters: "Introduces the pattern of tracking a global variable while computing local results. The diameter might not pass through the root.",
            core_pattern: "DFS with Global Tracking", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "DFS with Height Calculation", 
                idea: "At each node, diameter through that node = leftHeight + rightHeight. Track global maximum while computing heights.", 
                steps: [
                  "Create global variable maxDiameter = 0",
                  "Define height(node) function:",
                  "  If null, return 0",
                  "  leftH = height(left), rightH = height(right)",
                  "  Update maxDiameter = max(maxDiameter, leftH + rightH)",
                  "  Return 1 + max(leftH, rightH)",
                  "Call height(root), return maxDiameter"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(h) - recursion stack",
                when_to_use: "When you need to track a global optimum while computing local values"
              }
            ],
            complexity_summary: "O(n) time, O(h) space. Each node is visited exactly once.",
            interview_tip: "The key insight: diameter at node = leftHeight + rightHeight, not max(leftDiameter, rightDiameter) + 1. The longest path might be entirely in a subtree."
          },
          { 
            id: "subtree_of_another", 
            title: "Subtree of Another Tree", 
            why_it_matters: "Combines tree traversal with same-tree comparison. Tests ability to compose solutions from simpler problems.",
            core_pattern: "DFS + Same Tree Check", 
            tags: ["tree", "recursion", "dfs"],
            difficulty: "Easy",
            approaches: [
              { 
                name: "Recursive Check at Each Node", 
                idea: "At each node of the main tree, check if the subtree rooted there is identical to the target. If any match, return true.", 
                steps: [
                  "If main tree root is null, return false",
                  "If isSameTree(root, subRoot), return true",
                  "Recursively check: isSubtree(root.left, subRoot) OR isSubtree(root.right, subRoot)"
                ],
                time_complexity: "O(m × n) where m, n are tree sizes",
                space_complexity: "O(m + n) for recursion",
                when_to_use: "Simple but potentially slow approach"
              }
            ],
            complexity_summary: "O(m × n) worst case. Can be optimized with string serialization + KMP to O(m + n).",
            interview_tip: "Start with the simple O(m×n) solution. Mention that O(m+n) is possible with tree serialization if asked about optimization."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          { 
            id: "level_order", 
            title: "Level Order Traversal", 
            why_it_matters: "Fundamental BFS on trees. This pattern is the basis for many tree problems requiring level-by-level processing.",
            core_pattern: "BFS", 
            tags: ["tree", "bfs", "queue"],
            difficulty: "Medium",
            approaches: [
              { 
                name: "BFS with Queue", 
                idea: "Process all nodes at each level before moving to the next. Use queue size to know when a level ends.", 
                steps: [
                  "Initialize queue with root (if not null)",
                  "While queue not empty:",
                  "  levelSize = queue.size()",
                  "  Create empty level array",
                  "  For i in 0..levelSize-1:",
                  "    Pop node, add value to level array",
                  "    Add non-null children to queue",
                  "  Add level array to result",
                  "Return result"
                ],
                time_complexity: "O(n) - visit each node once",
                space_complexity: "O(n) - queue stores nodes at widest level",
                when_to_use: "Standard BFS traversal"
              }
            ],
            complexity_summary: "O(n) time and space. The key trick: use queue size at the start of each level.",
            interview_tip: "This pattern enables many variants: zigzag order, right side view, level averages, etc."
          },
          { 
            id: "validate_bst", 
            title: "Validate Binary Search Tree", 
            why_it_matters: "Tests deep understanding of BST property. Common mistake: only checking node with immediate children instead of maintaining valid range.",
            core_pattern: "DFS with Range Validation", 
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
          {
            id: "number_of_islands",
            title: "Number of Islands",
            why_it_matters: "The classic graph traversal problem on a grid. Introduces the concept of connected components and how to count them using DFS/BFS flood fill.",
            core_pattern: "DFS/BFS Flood Fill",
            tags: ["graph", "dfs", "bfs", "matrix"],
            difficulty: "Easy",
            approaches: [
              {
                name: "DFS Flood Fill",
                idea: "For each unvisited land cell, start a DFS that marks all connected land cells as visited. Each DFS start represents a new island.",
                steps: [
                  "Iterate through each cell in the grid",
                  "When you find an unvisited '1' (land):",
                  "  Increment island count",
                  "  DFS from this cell to mark all connected land as visited",
                  "DFS: mark current as visited, recurse on 4 neighbors if they're land",
                  "Return total island count"
                ],
                time_complexity: "O(m × n) - visit each cell at most once",
                space_complexity: "O(m × n) - recursion stack in worst case (entire grid is one island)",
                when_to_use: "Standard approach for connected component counting"
              },
              {
                name: "BFS",
                idea: "Same logic but use BFS with a queue instead of recursion.",
                steps: [
                  "When finding unvisited land, add to queue",
                  "Process queue: for each cell, add unvisited land neighbors",
                  "Mark cells as visited when adding to queue (not when processing)"
                ],
                time_complexity: "O(m × n)",
                space_complexity: "O(min(m, n)) - queue size at most one level",
                when_to_use: "When you want to avoid deep recursion"
              }
            ],
            complexity_summary: "O(m × n) time for both. DFS can have O(m × n) stack space, BFS is O(min(m, n)).",
            interview_tip: "Modify grid in-place (change '1' to '0' or '#') to mark visited if allowed. Otherwise use a visited set."
          },
          {
            id: "flood_fill",
            title: "Flood Fill",
            why_it_matters: "The paint bucket tool algorithm. Simple DFS/BFS on a grid that extends to many image processing problems.",
            core_pattern: "DFS/BFS",
            tags: ["graph", "dfs", "bfs", "matrix"],
            difficulty: "Easy",
            approaches: [
              {
                name: "DFS Recursive",
                idea: "Starting from the given cell, change its color and recursively fill all connected cells of the same original color.",
                steps: [
                  "Store the original color",
                  "If original color equals new color, return (avoid infinite loop)",
                  "DFS(r, c): change color, recurse on 4 neighbors with same original color",
                  "Return modified image"
                ],
                time_complexity: "O(m × n) - visit each cell at most once",
                space_complexity: "O(m × n) - recursion stack",
                when_to_use: "Simple and clean implementation"
              }
            ],
            complexity_summary: "O(m × n) time and space.",
            interview_tip: "Edge case: if new color equals old color, return immediately to avoid infinite recursion!"
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "clone_graph",
            title: "Clone Graph",
            why_it_matters: "Tests ability to deep copy a complex data structure. The key insight: use a hash map to track original → clone mapping to handle cycles.",
            core_pattern: "DFS + HashMap",
            tags: ["graph", "dfs", "hash-map"],
            difficulty: "Medium",
            approaches: [
              {
                name: "DFS with HashMap",
                idea: "Create a mapping from original nodes to their clones. DFS through the graph; for each node, clone it if not already cloned, then recursively clone neighbors.",
                steps: [
                  "If node is null, return null",
                  "If node already cloned (in map), return the clone",
                  "Create clone of current node, add to map",
                  "For each neighbor: clone it recursively and add to clone's neighbors",
                  "Return the clone"
                ],
                time_complexity: "O(V + E) - visit each node and edge once",
                space_complexity: "O(V) - hashmap and recursion stack",
                when_to_use: "Standard approach for graph cloning"
              },
              {
                name: "BFS with HashMap",
                idea: "Same logic but use BFS. Clone nodes when first encountered, process neighbors level by level.",
                time_complexity: "O(V + E)",
                space_complexity: "O(V)",
                when_to_use: "Alternative when you prefer iterative approach"
              }
            ],
            complexity_summary: "O(V + E) time, O(V) space for both.",
            interview_tip: "The hashmap is crucial for handling cycles and avoiding duplicate nodes."
          },
          {
            id: "course_schedule",
            title: "Course Schedule",
            why_it_matters: "Classic topological sort problem. Detecting cycles in a directed graph is fundamental for dependency resolution.",
            core_pattern: "Topological Sort / Cycle Detection",
            tags: ["graph", "topological-sort", "bfs", "dfs"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Kahn's Algorithm (BFS)",
                idea: "Start with nodes having no prerequisites (indegree 0). Process them, reduce indegree of their dependents. If all nodes processed, no cycle exists.",
                steps: [
                  "Build adjacency list and compute indegrees",
                  "Add all indegree-0 nodes to queue",
                  "While queue not empty:",
                  "  Pop node, add to result",
                  "  For each neighbor: decrement indegree, if 0 add to queue",
                  "If result size equals number of courses, return true"
                ],
                time_complexity: "O(V + E)",
                space_complexity: "O(V + E) for adjacency list",
                when_to_use: "Clean iterative solution, naturally produces topological order"
              },
              {
                name: "DFS with Cycle Detection",
                idea: "Use three states: unvisited, visiting (in current DFS path), visited. If we encounter a 'visiting' node, there's a cycle.",
                steps: [
                  "For each unvisited node, start DFS",
                  "Mark as 'visiting' at start, 'visited' at end",
                  "If we see 'visiting' node, cycle detected → return false",
                  "If all nodes can be fully visited, return true"
                ],
                time_complexity: "O(V + E)",
                space_complexity: "O(V + E)",
                when_to_use: "When you're comfortable with DFS state management"
              }
            ],
            complexity_summary: "O(V + E) for both. Kahn's is more intuitive for beginners.",
            interview_tip: "Clarify: does Course Schedule I ask if possible (detect cycle) or for the order (Course Schedule II)?"
          },
          {
            id: "rotting_oranges",
            title: "Rotting Oranges",
            why_it_matters: "Multi-source BFS problem. Instead of starting from one point, start from all 'sources' simultaneously. Models infection/fire spread.",
            core_pattern: "Multi-source BFS",
            tags: ["graph", "bfs", "matrix"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Multi-source BFS",
                idea: "Add all rotten oranges to queue initially. Process level by level; each level = 1 minute. Count fresh oranges; if any remain at end, return -1.",
                steps: [
                  "Count fresh oranges, add all rotten to queue",
                  "BFS: for each level (minute):",
                  "  Process all oranges in queue",
                  "  For each: rot adjacent fresh oranges, decrement fresh count",
                  "  Increment minutes if we rotted any",
                  "If fresh > 0, return -1; else return minutes"
                ],
                time_complexity: "O(m × n)",
                space_complexity: "O(m × n) for queue",
                when_to_use: "Any problem with multiple simultaneous sources spreading"
              }
            ],
            complexity_summary: "O(m × n) time and space. Key: add ALL sources to queue before starting BFS.",
            interview_tip: "Common mistake: starting separate BFS from each source. That's inefficient. Multi-source BFS processes all in parallel."
          },
          {
            id: "pacific_atlantic",
            title: "Pacific Atlantic Water Flow",
            why_it_matters: "Reverse-thinking problem. Instead of flowing water down from each cell, flow water UP from the oceans. Find cells reachable from both.",
            core_pattern: "Multi-source DFS/BFS from Boundaries",
            tags: ["graph", "dfs", "bfs", "matrix"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Reverse DFS from Oceans",
                idea: "DFS from Pacific border (top + left) to find cells that can reach Pacific. DFS from Atlantic border (bottom + right) similarly. Return intersection.",
                steps: [
                  "Create two visited sets: pacificReachable, atlanticReachable",
                  "DFS from all Pacific border cells (water flows UP to higher cells)",
                  "DFS from all Atlantic border cells",
                  "Find intersection of both sets",
                  "Return cells in both sets"
                ],
                time_complexity: "O(m × n)",
                space_complexity: "O(m × n)",
                when_to_use: "When problem involves reaching boundaries"
              }
            ],
            complexity_summary: "O(m × n) time and space. Reverse thinking avoids O((m×n)²) brute force.",
            interview_tip: "The insight: instead of checking each cell → can it reach both oceans, check each ocean → which cells can reach me."
          },
          {
            id: "graph_valid_tree",
            title: "Graph Valid Tree",
            why_it_matters: "A valid tree has exactly n-1 edges and is fully connected with no cycles. Tests understanding of tree properties.",
            core_pattern: "Union-Find or DFS",
            tags: ["graph", "union-find", "dfs"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Check Edge Count + Connectivity",
                idea: "A tree with n nodes must have exactly n-1 edges. Then check if all nodes are connected using DFS/BFS.",
                steps: [
                  "If edges != n-1, return false (not a tree)",
                  "Build adjacency list",
                  "DFS/BFS from node 0",
                  "If all n nodes visited, return true; else false"
                ],
                time_complexity: "O(V + E)",
                space_complexity: "O(V + E)",
                when_to_use: "Simple and intuitive"
              },
              {
                name: "Union-Find",
                idea: "For each edge, union the two nodes. If they're already in the same set, adding this edge creates a cycle → not a tree.",
                steps: [
                  "Initialize union-find with n nodes",
                  "For each edge (a, b):",
                  "  If find(a) == find(b), cycle exists → return false",
                  "  Union(a, b)",
                  "After all edges, check if exactly one connected component"
                ],
                time_complexity: "O(E × α(V)) ≈ O(E)",
                space_complexity: "O(V)",
                when_to_use: "Classic union-find application"
              }
            ],
            complexity_summary: "O(V + E) time for both approaches.",
            interview_tip: "Remember: tree = connected + no cycles = connected + exactly n-1 edges."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "word_ladder",
            title: "Word Ladder",
            why_it_matters: "BFS for shortest path in an unweighted graph. The graph is implicit: nodes are words, edges connect words differing by one letter.",
            core_pattern: "BFS Shortest Path",
            tags: ["graph", "bfs", "string"],
            difficulty: "Hard",
            approaches: [
              {
                name: "BFS with Pattern Matching",
                idea: "BFS from start word. For each word, generate all neighbors (words differing by one char). Use a set for O(1) word lookup and to mark visited.",
                steps: [
                  "Put all words in a set for O(1) lookup",
                  "BFS from beginWord, tracking distance",
                  "For each word, generate all possible one-char mutations",
                  "If mutation in wordList and not visited, add to queue",
                  "When endWord reached, return distance",
                  "If queue exhausts, return 0"
                ],
                time_complexity: "O(M² × N) where M = word length, N = wordlist size",
                space_complexity: "O(M × N)",
                when_to_use: "Standard BFS for shortest transformation"
              },
              {
                name: "Bidirectional BFS (Optimization)",
                idea: "BFS from both start and end simultaneously. Stop when frontiers meet. Reduces time significantly.",
                time_complexity: "O(M² × N) but much faster in practice",
                space_complexity: "O(M × N)",
                when_to_use: "When wordlist is large and path exists"
              }
            ],
            complexity_summary: "O(M² × N) time where M is word length. Bidirectional BFS is a powerful optimization.",
            interview_tip: "Generating neighbors: for each position, try all 26 letters. Pre-computing adjacency is also valid."
          },
          {
            id: "alien_dictionary",
            title: "Alien Dictionary",
            why_it_matters: "Advanced topological sort. Build a graph from word ordering constraints, then find valid ordering. Tests ability to extract information from comparisons.",
            core_pattern: "Build Graph + Topological Sort",
            tags: ["graph", "topological-sort", "string"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Extract Order + Topo Sort",
                idea: "Compare adjacent words to extract character ordering. Build directed graph, then topological sort. Handle invalid inputs (cycles, prefix cases).",
                steps: [
                  "Compare adjacent words pairwise:",
                  "  Find first differing character → add edge (earlier → later)",
                  "  Edge case: if word1 is prefix of word2 but comes after, invalid",
                  "Build adjacency list and indegree map",
                  "Topological sort (Kahn's algorithm)",
                  "If not all chars included, there's a cycle → return \"\""
                ],
                time_complexity: "O(C) where C = total characters in all words",
                space_complexity: "O(1) or O(26) for alphabet",
                when_to_use: "Standard approach for order extraction"
              }
            ],
            complexity_summary: "O(C) time where C = total chars. Space O(1) since alphabet is fixed size.",
            interview_tip: "Edge cases: (1) cycle in graph, (2) word comes before its prefix (e.g., 'abc' after 'ab'), (3) only one word."
          },
          {
            id: "shortest_path_binary_matrix",
            title: "Shortest Path in Binary Matrix",
            why_it_matters: "BFS on 8-directional grid. Demonstrates that BFS finds shortest path in unweighted graphs.",
            core_pattern: "BFS Shortest Path",
            tags: ["graph", "bfs", "matrix"],
            difficulty: "Hard",
            approaches: [
              {
                name: "BFS 8-directional",
                idea: "BFS from top-left, exploring 8 neighbors. Track distance. Return distance when bottom-right reached.",
                steps: [
                  "If start or end is blocked (1), return -1",
                  "BFS from (0,0) with 8 directions",
                  "Mark visited when adding to queue",
                  "Track distance for each cell",
                  "When reaching (n-1, n-1), return distance"
                ],
                time_complexity: "O(n²)",
                space_complexity: "O(n²)",
                when_to_use: "Standard shortest path in unweighted grid"
              }
            ],
            complexity_summary: "O(n²) time and space. BFS guarantees shortest path in unweighted graphs.",
            interview_tip: "Remember 8 directions: add diagonals to the usual 4. Use direction array for clean code."
          }
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
          {
            id: "climbing_stairs",
            title: "Climbing Stairs",
            why_it_matters: "The 'Hello World' of dynamic programming. Identical to Fibonacci sequence. Introduces the concept of overlapping subproblems and optimal substructure.",
            core_pattern: "1D DP / Fibonacci",
            tags: ["dynamic-programming", "math"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Recursive with Memoization",
                idea: "ways(n) = ways(n-1) + ways(n-2). Use memoization to avoid recomputing.",
                steps: [
                  "Base cases: ways(0) = 1, ways(1) = 1",
                  "Recursive relation: ways(n) = ways(n-1) + ways(n-2)",
                  "Store results in array/map to avoid recomputation"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) for memo array + recursion",
                when_to_use: "Top-down approach when thinking recursively is easier"
              },
              {
                name: "Bottom-up DP",
                idea: "Build solution from base cases upward. dp[i] = dp[i-1] + dp[i-2].",
                steps: [
                  "dp[0] = 1, dp[1] = 1",
                  "For i from 2 to n: dp[i] = dp[i-1] + dp[i-2]",
                  "Return dp[n]"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) for dp array",
                when_to_use: "When iterative solution is cleaner"
              },
              {
                name: "Space Optimized",
                idea: "Only need last two values. Use two variables instead of array.",
                steps: [
                  "prev2 = 1, prev1 = 1",
                  "For i from 2 to n: curr = prev1 + prev2, update prev2 = prev1, prev1 = curr",
                  "Return prev1"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Optimal solution for interviews"
              }
            ],
            complexity_summary: "O(n) time, O(1) space with optimization. This is exactly the Fibonacci sequence!",
            interview_tip: "Start with recursive thinking, then optimize. Mention matrix exponentiation for O(log n) if asked for further optimization."
          },
          {
            id: "house_robber",
            title: "House Robber",
            why_it_matters: "Classic 1D DP with a constraint: can't take adjacent elements. Introduces the concept of making optimal choices at each step.",
            core_pattern: "1D DP with Constraint",
            tags: ["dynamic-programming", "array"],
            difficulty: "Easy",
            approaches: [
              {
                name: "DP Array",
                idea: "At each house, choose: rob this house (add its value to max from 2 houses back) OR skip it (take max from previous house).",
                steps: [
                  "dp[i] = max money robbing houses 0..i",
                  "dp[0] = nums[0]",
                  "dp[1] = max(nums[0], nums[1])",
                  "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
                  "Return dp[n-1]"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "Clear DP formulation"
              },
              {
                name: "Space Optimized",
                idea: "Only need previous two values.",
                steps: [
                  "prev2 = 0, prev1 = 0",
                  "For each house: curr = max(prev1, prev2 + nums[i])",
                  "Update prev2 = prev1, prev1 = curr"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Optimal interview solution"
              }
            ],
            complexity_summary: "O(n) time, O(1) space. The key decision at each house: rob or skip.",
            interview_tip: "The recurrence captures the constraint naturally. For House Robber II (circular), solve twice excluding first/last house."
          },
          {
            id: "min_cost_climbing_stairs",
            title: "Min Cost Climbing Stairs",
            why_it_matters: "Variation of climbing stairs with costs. Demonstrates how DP handles optimization objectives.",
            core_pattern: "1D DP",
            tags: ["dynamic-programming", "array"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Bottom-up DP",
                idea: "dp[i] = min cost to reach step i. Can come from step i-1 or i-2.",
                steps: [
                  "dp[0] = cost[0], dp[1] = cost[1]",
                  "dp[i] = cost[i] + min(dp[i-1], dp[i-2])",
                  "Return min(dp[n-1], dp[n-2]) (can step past last step)"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n) or O(1) with optimization",
                when_to_use: "Standard DP approach"
              }
            ],
            complexity_summary: "O(n) time, O(1) space possible.",
            interview_tip: "The final answer is min(dp[n-1], dp[n-2]) because you can reach the top from either of the last two steps."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "coin_change",
            title: "Coin Change",
            why_it_matters: "Classic unbounded knapsack problem. Demonstrates how DP handles 'minimum number of items' problems with unlimited supply.",
            core_pattern: "Unbounded Knapsack",
            tags: ["dynamic-programming", "array"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Bottom-up DP",
                idea: "dp[amount] = minimum coins needed. For each amount, try all coins and take minimum.",
                steps: [
                  "dp[0] = 0 (0 coins for amount 0)",
                  "dp[1..amount] = infinity initially",
                  "For each amount a from 1 to target:",
                  "  For each coin c: if a >= c, dp[a] = min(dp[a], dp[a-c] + 1)",
                  "Return dp[amount] if not infinity, else -1"
                ],
                time_complexity: "O(amount × numCoins)",
                space_complexity: "O(amount)",
                when_to_use: "Standard approach for minimum coins problems"
              }
            ],
            complexity_summary: "O(amount × coins) time, O(amount) space.",
            interview_tip: "Initialize dp values to amount+1 (effectively infinity). This is a classic 'must-know' problem."
          },
          {
            id: "longest_increasing_subseq",
            title: "Longest Increasing Subsequence",
            why_it_matters: "One of the most important DP problems. Has both O(n²) DP and O(n log n) binary search solutions. Tests understanding of subsequences vs subarrays.",
            core_pattern: "1D DP / Binary Search",
            tags: ["dynamic-programming", "binary-search", "array"],
            difficulty: "Medium",
            approaches: [
              {
                name: "DP O(n²)",
                idea: "dp[i] = LIS ending at index i. For each j < i, if nums[j] < nums[i], we can extend LIS ending at j.",
                steps: [
                  "dp[i] = 1 for all (each element is a subsequence of length 1)",
                  "For each i from 1 to n-1:",
                  "  For each j from 0 to i-1:",
                  "    If nums[j] < nums[i]: dp[i] = max(dp[i], dp[j] + 1)",
                  "Return max(dp)"
                ],
                time_complexity: "O(n²)",
                space_complexity: "O(n)",
                when_to_use: "When O(n²) is acceptable"
              },
              {
                name: "Binary Search O(n log n)",
                idea: "Maintain array 'tails' where tails[i] = smallest ending element of all increasing subsequences of length i+1. Binary search to update.",
                steps: [
                  "tails = []",
                  "For each num in array:",
                  "  Binary search for position to insert num in tails",
                  "  If pos == len(tails): append num",
                  "  Else: tails[pos] = num",
                  "Return len(tails)"
                ],
                time_complexity: "O(n log n)",
                space_complexity: "O(n)",
                when_to_use: "When O(n log n) is required"
              }
            ],
            complexity_summary: "DP is O(n²), binary search is O(n log n).",
            interview_tip: "Know both solutions! The binary search approach is tricky but important. 'tails' array doesn't store the actual LIS, just its length."
          },
          {
            id: "unique_paths",
            title: "Unique Paths",
            why_it_matters: "Introduces 2D DP on a grid. Simple problem that demonstrates how paths accumulate from multiple directions.",
            core_pattern: "2D DP",
            tags: ["dynamic-programming", "math"],
            difficulty: "Medium",
            approaches: [
              {
                name: "2D DP",
                idea: "dp[i][j] = number of ways to reach cell (i,j). Can come from top (i-1,j) or left (i,j-1).",
                steps: [
                  "First row and column: all 1s (only one way)",
                  "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
                  "Return dp[m-1][n-1]"
                ],
                time_complexity: "O(m × n)",
                space_complexity: "O(m × n) or O(n) with optimization",
                when_to_use: "Standard 2D DP approach"
              },
              {
                name: "Combinatorics",
                idea: "Need to make (m-1) down moves and (n-1) right moves. Choose positions for down moves out of (m+n-2) total moves.",
                steps: [
                  "Answer = C(m+n-2, m-1) = (m+n-2)! / ((m-1)! × (n-1)!)"
                ],
                time_complexity: "O(m + n)",
                space_complexity: "O(1)",
                when_to_use: "When you recognize the combinatorial nature"
              }
            ],
            complexity_summary: "DP: O(mn) time, O(n) space. Math: O(m+n) time, O(1) space.",
            interview_tip: "The combinatorics solution is elegant but DP generalizes to obstacles (Unique Paths II)."
          },
          {
            id: "word_break",
            title: "Word Break",
            why_it_matters: "String DP problem. Tests ability to check if a string can be segmented into dictionary words.",
            core_pattern: "1D DP with String Matching",
            tags: ["dynamic-programming", "string", "hash-set"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Bottom-up DP",
                idea: "dp[i] = true if s[0..i-1] can be segmented. For each position, check all possible last words.",
                steps: [
                  "Put dictionary in a set for O(1) lookup",
                  "dp[0] = true (empty string is valid)",
                  "For i from 1 to n:",
                  "  For j from 0 to i-1:",
                  "    If dp[j] and s[j..i-1] in dictionary: dp[i] = true",
                  "Return dp[n]"
                ],
                time_complexity: "O(n² × k) where k = avg word length for substring creation",
                space_complexity: "O(n) for dp + O(dictionary size)",
                when_to_use: "Standard approach"
              }
            ],
            complexity_summary: "O(n²) time. Optimizations: check only up to max word length, use trie for dictionary.",
            interview_tip: "Handle edge cases: empty string, single character. For Word Break II (return all segmentations), use backtracking with memoization."
          },
          {
            id: "longest_palindromic_substring",
            title: "Longest Palindromic Substring",
            why_it_matters: "Classic 2D DP or expand-from-center problem. Demonstrates interval DP pattern.",
            core_pattern: "2D DP or Expand from Center",
            tags: ["dynamic-programming", "string"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Expand from Center",
                idea: "For each position (and gap between positions), expand outward while palindrome. Track longest found.",
                steps: [
                  "For each center i (and i, i+1 for even length):",
                  "  Expand while s[left] == s[right]",
                  "  Track longest palindrome found",
                  "Return longest"
                ],
                time_complexity: "O(n²)",
                space_complexity: "O(1)",
                when_to_use: "Most intuitive and space-efficient"
              },
              {
                name: "2D DP",
                idea: "dp[i][j] = true if s[i..j] is palindrome. Build from smaller substrings.",
                steps: [
                  "dp[i][i] = true (single chars)",
                  "dp[i][i+1] = (s[i] == s[i+1]) (pairs)",
                  "For length 3 to n:",
                  "  dp[i][j] = dp[i+1][j-1] and s[i] == s[j]",
                  "Track longest palindrome"
                ],
                time_complexity: "O(n²)",
                space_complexity: "O(n²)",
                when_to_use: "When you need to know all palindromic substrings"
              }
            ],
            complexity_summary: "Both O(n²) time. Center expansion uses O(1) space.",
            interview_tip: "Manacher's algorithm achieves O(n) but is rarely expected in interviews. Know center expansion well."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "edit_distance",
            title: "Edit Distance",
            why_it_matters: "Classic string DP. Used in spell checkers, DNA sequence alignment, and diff algorithms. The recurrence is a template for many string problems.",
            core_pattern: "2D String DP",
            tags: ["dynamic-programming", "string"],
            difficulty: "Hard",
            approaches: [
              {
                name: "2D DP Table",
                idea: "dp[i][j] = min operations to convert s1[0..i-1] to s2[0..j-1]. Three choices: insert, delete, replace.",
                steps: [
                  "Base cases: dp[i][0] = i, dp[0][j] = j",
                  "If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] (no op needed)",
                  "Else: dp[i][j] = 1 + min(",
                  "  dp[i-1][j-1] (replace),",
                  "  dp[i][j-1] (insert),",
                  "  dp[i-1][j] (delete))",
                  "Return dp[m][n]"
                ],
                time_complexity: "O(m × n)",
                space_complexity: "O(m × n) or O(n) with optimization",
                when_to_use: "Standard approach for string transformation problems"
              }
            ],
            complexity_summary: "O(mn) time, O(n) space with optimization.",
            interview_tip: "Draw out the DP table for a small example. Trace back through the table to find the actual operations."
          },
          {
            id: "regular_expression",
            title: "Regular Expression Matching",
            why_it_matters: "Complex string DP. Understanding how to handle special characters (* and .) tests deep DP skills.",
            core_pattern: "2D String DP",
            tags: ["dynamic-programming", "string", "recursion"],
            difficulty: "Hard",
            approaches: [
              {
                name: "2D DP",
                idea: "dp[i][j] = true if s[0..i-1] matches p[0..j-1]. Handle '.' (any char) and '*' (zero or more of previous).",
                steps: [
                  "dp[0][0] = true (empty matches empty)",
                  "Handle patterns like a*, a*b*, etc. matching empty string",
                  "If p[j-1] == '.' or p[j-1] == s[i-1]: dp[i][j] = dp[i-1][j-1]",
                  "If p[j-1] == '*':",
                  "  Zero occurrences: dp[i][j] |= dp[i][j-2]",
                  "  One+ occurrences (if char matches): dp[i][j] |= dp[i-1][j]"
                ],
                time_complexity: "O(m × n)",
                space_complexity: "O(m × n)",
                when_to_use: "Standard approach for regex matching"
              }
            ],
            complexity_summary: "O(mn) time and space.",
            interview_tip: "The '*' case is tricky: it can match zero or more of the preceding element. Draw out examples like 'aa' and 'a*'."
          },
          {
            id: "burst_balloons",
            title: "Burst Balloons",
            why_it_matters: "Interval DP problem. The key insight: think of the LAST balloon to burst in each interval, not the first.",
            core_pattern: "Interval DP",
            tags: ["dynamic-programming", "interval"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Interval DP",
                idea: "dp[i][j] = max coins from bursting balloons in range (i, j). Think of last balloon k to burst: its value is nums[i] × nums[k] × nums[j].",
                steps: [
                  "Add 1 to both ends of array (boundary balloons)",
                  "dp[i][j] = max coins for interval (i, j) exclusive",
                  "For each k in (i, j) as last balloon:",
                  "  dp[i][j] = max(dp[i][j], dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j])",
                  "Process intervals by increasing length"
                ],
                time_complexity: "O(n³)",
                space_complexity: "O(n²)",
                when_to_use: "When order of operations affects result"
              }
            ],
            complexity_summary: "O(n³) time, O(n²) space.",
            interview_tip: "The insight to think about the LAST balloon to burst is counterintuitive but crucial. It makes subproblems independent."
          },
          {
            id: "longest_valid_parentheses",
            title: "Longest Valid Parentheses",
            why_it_matters: "Tricky string DP problem. Multiple approaches: DP, stack, two-pass.",
            core_pattern: "1D DP / Stack",
            tags: ["dynamic-programming", "string", "stack"],
            difficulty: "Hard",
            approaches: [
              {
                name: "DP",
                idea: "dp[i] = length of longest valid parentheses ending at i. Only update if s[i] = ')'.",
                steps: [
                  "If s[i] = ')' and s[i-1] = '(': dp[i] = dp[i-2] + 2",
                  "If s[i] = ')' and s[i-1] = ')' and s[i - dp[i-1] - 1] = '(':",
                  "  dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]",
                  "Return max(dp)"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "DP approach"
              },
              {
                name: "Stack",
                idea: "Push indices to stack. Push -1 initially as base. Pop on ')', length = i - stack.top().",
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "Often cleaner than DP for this problem"
              }
            ],
            complexity_summary: "O(n) time and space for both.",
            interview_tip: "The two-pass O(1) space solution exists: scan left-to-right then right-to-left counting parentheses."
          }
        ]
      }
    ]
  },
  {
    id: "math_number_theory",
    title: "Mathematics & Number Theory",
    description: "Core mathematical tools for coding interviews: primes, GCD, modular arithmetic, bit manipulation, and combinatorics.",
    lesson_count: 26,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "prime_check",
            title: "Prime Check (√n)",
            why_it_matters: "Fundamental primality test. Understanding why we only check up to √n demonstrates mathematical reasoning that impresses interviewers.",
            core_pattern: "Primes",
            tags: ["math", "primes"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Trial Division",
                idea: "A number n is prime if it has no divisors other than 1 and n. We only need to check up to √n because if n = a × b with a ≤ b, then a ≤ √n.",
                steps: [
                  "Handle edge cases: n < 2 is not prime",
                  "Check divisibility by 2 (handle even numbers)",
                  "Check odd divisors from 3 to √n",
                  "If any divides n evenly, not prime",
                  "Otherwise, prime"
                ],
                time_complexity: "O(√n)",
                space_complexity: "O(1)",
                when_to_use: "Checking if a single number is prime"
              }
            ],
            complexity_summary: "O(√n) time, O(1) space. For multiple numbers, use Sieve of Eratosthenes.",
            interview_tip: "Explain WHY √n works: if n = a × b, one factor must be ≤ √n. Also, check 2 first then only odd numbers for 2× speedup."
          },
          {
            id: "sieve_eratosthenes",
            title: "Sieve of Eratosthenes",
            why_it_matters: "Efficient algorithm to find all primes up to n. Used when you need to check primality of many numbers.",
            core_pattern: "Sieve",
            tags: ["math", "primes", "array"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Classic Sieve",
                idea: "Create boolean array. Starting from 2, mark all multiples of each prime as composite. Remaining unmarked numbers are primes.",
                steps: [
                  "Create boolean array isPrime[0..n], initialize all true",
                  "isPrime[0] = isPrime[1] = false",
                  "For each p from 2 to √n:",
                  "  If isPrime[p]: mark all multiples p², p²+p, p²+2p, ... as false",
                  "Return all i where isPrime[i] is true"
                ],
                time_complexity: "O(n log log n)",
                space_complexity: "O(n)",
                when_to_use: "Finding all primes up to n"
              }
            ],
            complexity_summary: "O(n log log n) time, O(n) space. Very efficient for finding multiple primes.",
            interview_tip: "Start marking from p² (not 2p) since smaller multiples were already marked. This is a common optimization."
          },
          {
            id: "prime_factorization",
            title: "Prime Factorization",
            why_it_matters: "Decomposing a number into prime factors. Used in GCD/LCM problems, number theory, and cryptography basics.",
            core_pattern: "Factorization",
            tags: ["math", "primes"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Trial Division",
                idea: "Divide by smallest factor repeatedly. Any remaining value > 1 is a prime factor.",
                steps: [
                  "For d from 2 to √n:",
                  "  While n divisible by d: record d as factor, divide n by d",
                  "If n > 1 after loop, n itself is a prime factor"
                ],
                time_complexity: "O(√n)",
                space_complexity: "O(number of factors)",
                when_to_use: "Factoring a single number"
              }
            ],
            complexity_summary: "O(√n) time. For many numbers, precompute smallest prime factors using sieve.",
            interview_tip: "The key insight: we divide repeatedly by each factor, so we naturally get the full prime factorization."
          },
          {
            id: "gcd_euclid",
            title: "Euclidean GCD",
            why_it_matters: "The Euclidean algorithm for GCD is fundamental. It's used in LCM, modular inverse, and many number theory problems.",
            core_pattern: "GCD",
            tags: ["math", "recursion"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Euclidean Algorithm",
                idea: "GCD(a, b) = GCD(b, a mod b). Base case: GCD(a, 0) = a.",
                steps: [
                  "If b == 0, return a",
                  "Return GCD(b, a mod b)"
                ],
                time_complexity: "O(log(min(a, b)))",
                space_complexity: "O(1) iterative, O(log n) recursive",
                when_to_use: "Finding greatest common divisor"
              }
            ],
            complexity_summary: "O(log n) time. Each step reduces the problem size significantly.",
            interview_tip: "The iterative version is: while (b != 0) { temp = b; b = a % b; a = temp; } return a;"
          },
          {
            id: "lcm_using_gcd",
            title: "LCM using GCD",
            why_it_matters: "LCM is needed for problems involving cycles, scheduling, and number theory. Using GCD makes it efficient.",
            core_pattern: "LCM",
            tags: ["math"],
            difficulty: "Easy",
            approaches: [
              {
                name: "LCM from GCD",
                idea: "LCM(a, b) = (a × b) / GCD(a, b). This avoids computing LCM directly which could overflow.",
                steps: [
                  "Compute GCD using Euclidean algorithm",
                  "LCM = (a / GCD) × b (divide first to prevent overflow)"
                ],
                time_complexity: "O(log(min(a, b)))",
                space_complexity: "O(1)",
                when_to_use: "Finding least common multiple"
              }
            ],
            complexity_summary: "O(log n) time from GCD computation.",
            interview_tip: "Divide before multiplying to avoid overflow: lcm = (a / gcd(a,b)) * b."
          },
          {
            id: "fast_power",
            title: "Fast Power (Binary Exponentiation)",
            why_it_matters: "Computes a^n in O(log n) time. Essential for modular exponentiation in cryptography and competitive programming.",
            core_pattern: "Binary Exponentiation",
            tags: ["math", "bit-manipulation"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Binary Exponentiation",
                idea: "Use the binary representation of n. a^n = a^(n/2) × a^(n/2) if n even, a × a^(n-1) if n odd.",
                steps: [
                  "If n == 0, return 1",
                  "If n is odd: return a × pow(a, n-1)",
                  "If n is even: half = pow(a, n/2); return half × half"
                ],
                time_complexity: "O(log n)",
                space_complexity: "O(log n) recursive, O(1) iterative",
                when_to_use: "Computing large powers efficiently"
              }
            ],
            complexity_summary: "O(log n) time. For modular exponentiation, take mod at each step.",
            interview_tip: "The iterative version uses bit manipulation: result *= a when (n & 1), then a *= a, n >>= 1."
          },
          {
            id: "prefix_sum_math",
            title: "Prefix Sum",
            why_it_matters: "Enables O(1) range sum queries after O(n) preprocessing. Foundation for many array problems.",
            core_pattern: "Prefix Sum",
            tags: ["array", "math"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Prefix Sum Array",
                idea: "prefix[i] = sum of arr[0..i-1]. Range sum [l, r] = prefix[r+1] - prefix[l].",
                steps: [
                  "Build prefix: prefix[0] = 0, prefix[i] = prefix[i-1] + arr[i-1]",
                  "Query sum [l, r]: return prefix[r+1] - prefix[l]"
                ],
                time_complexity: "O(n) build, O(1) query",
                space_complexity: "O(n)",
                when_to_use: "Multiple range sum queries on static array"
              }
            ],
            complexity_summary: "O(n) preprocessing, O(1) per query.",
            interview_tip: "For 2D arrays, use 2D prefix sums with inclusion-exclusion formula."
          },
          {
            id: "difference_array",
            title: "Difference Array",
            why_it_matters: "Enables O(1) range updates. The inverse of prefix sum: prefix sum answers queries, difference array handles updates.",
            core_pattern: "Difference Array",
            tags: ["array", "math"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Difference Array",
                idea: "diff[i] = arr[i] - arr[i-1]. To add val to range [l, r]: diff[l] += val, diff[r+1] -= val. Reconstruct with prefix sum.",
                steps: [
                  "Build difference array from original",
                  "For range update [l, r] += val: diff[l] += val, diff[r+1] -= val",
                  "To get final array: prefix sum of difference array"
                ],
                time_complexity: "O(n) build, O(1) update, O(n) reconstruct",
                space_complexity: "O(n)",
                when_to_use: "Multiple range updates, then one final read"
              }
            ],
            complexity_summary: "O(1) per update, O(n) to get final result.",
            interview_tip: "Perfect for problems like 'apply multiple range increments then return final array'."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "extended_euclid",
            title: "Extended Euclidean Algorithm",
            why_it_matters: "Finds x, y such that ax + by = GCD(a, b). Used for modular inverse and solving linear Diophantine equations.",
            core_pattern: "Extended GCD",
            tags: ["math", "recursion"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Extended Euclid",
                idea: "Along with GCD, compute coefficients x, y. Use back-substitution from recursive calls.",
                steps: [
                  "Base case: GCD(a, 0) = a, x = 1, y = 0",
                  "Recursive: GCD, x, y = extGCD(b, a mod b)",
                  "Update: x = y, y = x - (a/b) × y",
                  "Return GCD and new x, y"
                ],
                time_complexity: "O(log n)",
                space_complexity: "O(log n)",
                when_to_use: "Finding modular inverse, solving ax + by = c"
              }
            ],
            complexity_summary: "O(log n) time. Essential for modular arithmetic.",
            interview_tip: "Used to find modular inverse: if GCD(a, m) = 1, then a^(-1) mod m = x where ax + my = 1."
          },
          {
            id: "modular_inverse",
            title: "Modular Inverse",
            why_it_matters: "Finding a^(-1) mod m where a × a^(-1) ≡ 1 (mod m). Essential for division in modular arithmetic.",
            core_pattern: "Modular Arithmetic",
            tags: ["math"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Fermat's Little Theorem",
                idea: "If m is prime, a^(-1) ≡ a^(m-2) mod m. Use fast exponentiation.",
                steps: [
                  "Verify m is prime (or coprime with a)",
                  "Compute a^(m-2) mod m using binary exponentiation"
                ],
                time_complexity: "O(log m)",
                space_complexity: "O(1)",
                when_to_use: "When modulus is prime"
              },
              {
                name: "Extended Euclid",
                idea: "Find x such that ax ≡ 1 (mod m) using extended Euclidean algorithm.",
                time_complexity: "O(log m)",
                space_complexity: "O(log m)",
                when_to_use: "When modulus might not be prime"
              }
            ],
            complexity_summary: "O(log m) for both methods.",
            interview_tip: "Modular inverse exists iff GCD(a, m) = 1. For prime m, Fermat's method is simpler."
          },
          {
            id: "combinations_nCr",
            title: "Combinations (nCr)",
            why_it_matters: "Counting combinations is fundamental in probability, counting problems, and DP. Multiple computation methods exist.",
            core_pattern: "Combinatorics",
            tags: ["math", "combinatorics"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Pascal's Triangle / DP",
                idea: "C(n,r) = C(n-1,r-1) + C(n-1,r). Build bottom-up.",
                steps: [
                  "Base: C(n,0) = C(n,n) = 1",
                  "Build: C(n,r) = C(n-1,r-1) + C(n-1,r)"
                ],
                time_complexity: "O(n²) for table, O(n) for single row",
                space_complexity: "O(n) with optimization",
                when_to_use: "Precomputing many values, or avoiding division"
              },
              {
                name: "Formula with Modular Inverse",
                idea: "C(n,r) = n! / (r! × (n-r)!). Use modular inverse for division.",
                steps: [
                  "Precompute factorials and inverse factorials",
                  "C(n,r) = fact[n] × inv_fact[r] × inv_fact[n-r] mod m"
                ],
                time_complexity: "O(n) precompute, O(1) per query",
                space_complexity: "O(n)",
                when_to_use: "Many queries with modular arithmetic"
              }
            ],
            complexity_summary: "O(n) precompute enables O(1) queries.",
            interview_tip: "For large n with mod, use precomputed factorials. For small n without mod, use Pascal's triangle."
          },
          {
            id: "xor_tricks",
            title: "XOR Tricks",
            why_it_matters: "XOR has unique properties: a⊕a=0, a⊕0=a, commutative, associative. Used in many clever bit manipulation solutions.",
            core_pattern: "Bit Manipulation",
            tags: ["bit-manipulation"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Find Single Number",
                idea: "XOR all elements. Pairs cancel out, leaving the single element.",
                steps: [
                  "result = 0",
                  "For each num: result ^= num",
                  "Return result"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Finding unique element when others appear twice"
              },
              {
                name: "Swap Without Temp",
                idea: "a ^= b; b ^= a; a ^= b swaps a and b.",
                time_complexity: "O(1)",
                space_complexity: "O(1)",
                when_to_use: "When you can't use extra space (rarely needed)"
              }
            ],
            complexity_summary: "XOR operations are O(1). Extremely useful for 'find single element' problems.",
            interview_tip: "Key properties: XOR is its own inverse, order doesn't matter. Used in 'Single Number' and its variants."
          },
          {
            id: "count_set_bits",
            title: "Count Set Bits (Popcount)",
            why_it_matters: "Counting 1s in binary representation. Used in Hamming distance, subset enumeration, and many bit manipulation problems.",
            core_pattern: "Bit Manipulation",
            tags: ["bit-manipulation"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Brian Kernighan's Algorithm",
                idea: "n & (n-1) clears the rightmost set bit. Count how many times we can do this.",
                steps: [
                  "count = 0",
                  "While n > 0: n = n & (n-1), count++",
                  "Return count"
                ],
                time_complexity: "O(number of set bits)",
                space_complexity: "O(1)",
                when_to_use: "When number has few set bits"
              },
              {
                name: "Lookup Table",
                idea: "Precompute popcount for all bytes (0-255). Split number into bytes and sum.",
                time_complexity: "O(1) for fixed-width integers",
                space_complexity: "O(256)",
                when_to_use: "When counting many numbers"
              }
            ],
            complexity_summary: "Brian Kernighan is O(bits set). Lookup table is O(1).",
            interview_tip: "Most languages have __builtin_popcount or Integer.bitCount. Know the algorithm but mention the builtin."
          },
          {
            id: "subset_mask",
            title: "Subset Generation with Bitmask",
            why_it_matters: "Iterating through all 2^n subsets using bitmask. Foundation for subset DP and brute force on small sets.",
            core_pattern: "Bit Manipulation / Bitmask",
            tags: ["bit-manipulation", "enumeration"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Bitmask Enumeration",
                idea: "For n elements, iterate masks from 0 to 2^n - 1. Each bit represents inclusion of that element.",
                steps: [
                  "For mask from 0 to (1 << n) - 1:",
                  "  For each bit i set in mask: include arr[i] in subset",
                  "  Process current subset"
                ],
                time_complexity: "O(2^n × n) to enumerate all subsets",
                space_complexity: "O(1) excluding output",
                when_to_use: "When n is small (n ≤ 20)"
              }
            ],
            complexity_summary: "O(2^n) subsets. Only feasible for n ≤ ~20.",
            interview_tip: "Check if bit i is set: (mask >> i) & 1. This technique enables subset DP."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "matrix_exponentiation",
            title: "Matrix Exponentiation",
            why_it_matters: "Computes n-th term of linear recurrences in O(log n). Useful for advanced DP problems with linear state transitions.",
            core_pattern: "Matrix Exponentiation",
            tags: ["math", "matrix", "dp"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Matrix Power",
                idea: "Express recurrence as matrix multiplication. Use binary exponentiation on the matrix.",
                steps: [
                  "Express f(n) = a×f(n-1) + b×f(n-2) as matrix form",
                  "Apply binary exponentiation to the transformation matrix",
                  "Extract result from final matrix"
                ],
                time_complexity: "O(k³ log n) where k is matrix size",
                space_complexity: "O(k²)",
                when_to_use: "Linear recurrences with large n"
              }
            ],
            complexity_summary: "O(k³ log n) where k is typically small (2-3).",
            interview_tip: "Rarely asked but impressive if you know it. Apply to Fibonacci: F(n) in O(log n)."
          },
          {
            id: "chinese_remainder_theorem",
            title: "Chinese Remainder Theorem",
            why_it_matters: "Solves systems of modular equations. Used in competitive programming for combining constraints from different moduli.",
            core_pattern: "Number Theory",
            tags: ["math", "number-theory"],
            difficulty: "Hard",
            approaches: [
              {
                name: "CRT Construction",
                idea: "Given x ≡ r1 (mod m1), x ≡ r2 (mod m2), ..., find unique x mod (m1×m2×...) when moduli are coprime.",
                steps: [
                  "Compute M = product of all moduli",
                  "For each i: Mi = M/mi, yi = modular inverse of Mi mod mi",
                  "x = sum(ri × Mi × yi) mod M"
                ],
                time_complexity: "O(n log M) where n is number of equations",
                space_complexity: "O(n)",
                when_to_use: "Combining modular constraints"
              }
            ],
            complexity_summary: "O(n log M) using extended Euclidean for inverses.",
            interview_tip: "Useful when answer is 'mod 10^9+7' but intermediate steps use different moduli."
          }
        ]
      }
    ]
  },
  {
    id: "heaps",
    title: "Heaps & Priority Queues",
    description: "Priority queue problems and heap-based optimizations for efficient min/max operations.",
    lesson_count: 12,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "kth_largest_element",
            title: "Kth Largest Element in Array",
            why_it_matters: "Classic heap problem. Demonstrates when to use min-heap vs max-heap based on what you want to track.",
            core_pattern: "Heap",
            tags: ["heap", "array"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Min Heap of Size K",
                idea: "Maintain a min-heap of size k. The root is always the k-th largest. For each element, if larger than root, replace root.",
                steps: [
                  "Add first k elements to min-heap",
                  "For remaining elements:",
                  "  If element > heap root: remove root, add element",
                  "Return heap root"
                ],
                time_complexity: "O(n log k)",
                space_complexity: "O(k)",
                when_to_use: "When k is small relative to n"
              },
              {
                name: "QuickSelect",
                idea: "Partition-based selection like quicksort. Average O(n) but worst case O(n²).",
                time_complexity: "O(n) average, O(n²) worst",
                space_complexity: "O(1)",
                when_to_use: "When expected O(n) is acceptable"
              }
            ],
            complexity_summary: "Heap: O(n log k). QuickSelect: O(n) average.",
            interview_tip: "Use min-heap for k-th largest (not max-heap!). Min-heap ensures the k-th largest stays at the top."
          },
          {
            id: "top_k_frequent",
            title: "Top K Frequent Elements",
            why_it_matters: "Combines hashing with heap. Shows how to maintain top-k items by frequency.",
            core_pattern: "Hash Map + Heap",
            tags: ["heap", "hash-map"],
            difficulty: "Easy",
            approaches: [
              {
                name: "HashMap + Min Heap",
                idea: "Count frequencies with hashmap. Use min-heap of size k to keep top k frequent elements.",
                steps: [
                  "Count frequencies in hashmap",
                  "Add elements to min-heap (by frequency)",
                  "Keep heap size at k by removing smallest",
                  "Heap contains top k frequent elements"
                ],
                time_complexity: "O(n log k)",
                space_complexity: "O(n)",
                when_to_use: "Standard approach"
              },
              {
                name: "Bucket Sort",
                idea: "Create buckets where bucket[i] contains elements with frequency i. Scan from high to low.",
                steps: [
                  "Count frequencies",
                  "Create buckets of size n+1",
                  "Place elements in bucket[frequency]",
                  "Collect k elements from highest buckets"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "When O(n) time is required"
              }
            ],
            complexity_summary: "Heap: O(n log k). Bucket sort: O(n).",
            interview_tip: "Bucket sort is faster but heap is more general and works for streaming data."
          },
          {
            id: "last_stone_weight",
            title: "Last Stone Weight",
            why_it_matters: "Simple simulation problem using max-heap. Good introduction to heap operations.",
            core_pattern: "Max Heap Simulation",
            tags: ["heap", "simulation"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Max Heap Simulation",
                idea: "Use max-heap to always get two heaviest stones. Smash them and put remainder back.",
                steps: [
                  "Build max-heap from all stones",
                  "While heap has more than 1 stone:",
                  "  Pop two largest: x, y",
                  "  If x != y, push |x - y| back",
                  "Return remaining stone (or 0 if empty)"
                ],
                time_complexity: "O(n log n)",
                space_complexity: "O(n)",
                when_to_use: "Any repeated max extraction problem"
              }
            ],
            complexity_summary: "O(n log n) time, O(n) space.",
            interview_tip: "In Python, use negative values with min-heap to simulate max-heap."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "merge_k_sorted_lists_heap",
            title: "Merge K Sorted Lists",
            why_it_matters: "Classic heap application. Merging k sorted sequences efficiently is a fundamental operation.",
            core_pattern: "K-way Merge with Heap",
            tags: ["heap", "linked-list"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Min Heap",
                idea: "Push head of each list into min-heap. Pop smallest, push its next. Repeat until heap empty.",
                steps: [
                  "Add head of each non-empty list to min-heap",
                  "While heap not empty:",
                  "  Pop smallest node, add to result",
                  "  If popped node has next, push next to heap",
                  "Return merged list"
                ],
                time_complexity: "O(N log k) where N = total nodes, k = number of lists",
                space_complexity: "O(k) for heap",
                when_to_use: "Standard k-way merge"
              },
              {
                name: "Divide and Conquer",
                idea: "Pair up lists and merge. Repeat until one list remains.",
                time_complexity: "O(N log k)",
                space_complexity: "O(1) or O(log k) for recursion",
                when_to_use: "Alternative approach with same complexity"
              }
            ],
            complexity_summary: "Both O(N log k). Heap is O(k) space, D&C can be O(1).",
            interview_tip: "Know both approaches. Heap is more intuitive; D&C can be slightly faster due to cache locality."
          },
          {
            id: "find_median_stream",
            title: "Find Median from Data Stream",
            why_it_matters: "Classic two-heap problem. Demonstrates how to maintain a dynamic median efficiently.",
            core_pattern: "Two Heaps",
            tags: ["heap", "design", "data-stream"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Two Heaps (Max + Min)",
                idea: "Use max-heap for lower half, min-heap for upper half. Balance sizes to keep median accessible.",
                steps: [
                  "maxHeap stores smaller half (max at top)",
                  "minHeap stores larger half (min at top)",
                  "addNum: add to maxHeap, move max to minHeap if needed, balance sizes",
                  "findMedian: if equal sizes, average of tops; else top of larger heap"
                ],
                time_complexity: "O(log n) add, O(1) find median",
                space_complexity: "O(n)",
                when_to_use: "Streaming median problems"
              }
            ],
            complexity_summary: "O(log n) insertion, O(1) median query.",
            interview_tip: "Keep heaps balanced (size difference ≤ 1). This ensures median is always at the top(s)."
          },
          {
            id: "task_scheduler",
            title: "Task Scheduler",
            why_it_matters: "Greedy + heap problem. Schedule tasks with cooling time constraint.",
            core_pattern: "Greedy with Max Heap",
            tags: ["heap", "greedy", "hash-map"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Max Heap + Queue",
                idea: "Always execute the most frequent available task. Track cooling tasks in a queue.",
                steps: [
                  "Count task frequencies, add to max-heap",
                  "While heap or cooling queue not empty:",
                  "  Pop most frequent task, execute, decrement count",
                  "  Add to cooling queue with available time",
                  "  If cooling queue front is ready, add back to heap",
                  "  Increment time"
                ],
                time_complexity: "O(n log 26) = O(n)",
                space_complexity: "O(26) = O(1)",
                when_to_use: "Task scheduling with constraints"
              },
              {
                name: "Math Formula",
                idea: "Optimal schedule based on most frequent task and cooling time.",
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Faster but less intuitive"
              }
            ],
            complexity_summary: "O(n) for both approaches.",
            interview_tip: "The heap approach is more intuitive. The math formula is elegant: result = max(n, (maxFreq-1)*(n+1) + countOfMaxFreq)."
          },
          {
            id: "reorganize_string",
            title: "Reorganize String",
            why_it_matters: "Greedy heap problem. Arrange characters so no two adjacent are the same.",
            core_pattern: "Greedy with Max Heap",
            tags: ["heap", "greedy", "string"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Max Heap",
                idea: "Always place the most frequent character that wasn't just placed. Use heap to track frequencies.",
                steps: [
                  "Count character frequencies",
                  "Add all to max-heap",
                  "While heap not empty:",
                  "  Pop most frequent, add to result",
                  "  If previous char still has count > 0, push it back",
                  "  Track current as 'previous'",
                  "Return result if valid length, else ''"
                ],
                time_complexity: "O(n log 26) = O(n)",
                space_complexity: "O(26) = O(1)",
                when_to_use: "Rearranging with adjacency constraint"
              }
            ],
            complexity_summary: "O(n) time, O(1) space (26 chars max).",
            interview_tip: "Impossible if any char appears > (n+1)/2 times. Check this first."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "sliding_window_median",
            title: "Sliding Window Median",
            why_it_matters: "Combines two-heap median with sliding window. Handling removals from heaps is the challenge.",
            core_pattern: "Two Heaps with Lazy Deletion",
            tags: ["heap", "sliding-window", "design"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Two Heaps with Delayed Deletion",
                idea: "Use two heaps like Find Median, but track deleted elements and lazily remove when they reach top.",
                steps: [
                  "Maintain maxHeap (lower half) and minHeap (upper half)",
                  "For each new window position:",
                  "  Add new element to appropriate heap",
                  "  Mark outgoing element as deleted (in hash map)",
                  "  Rebalance heaps, skip deleted elements at tops",
                  "  Record median"
                ],
                time_complexity: "O(n log k) where k is window size",
                space_complexity: "O(n) for deletion tracking",
                when_to_use: "When exact removal from heap is needed"
              }
            ],
            complexity_summary: "O(n log k) time. Lazy deletion avoids expensive heap removal.",
            interview_tip: "Lazy deletion is key: don't remove immediately, just mark and skip when element reaches top."
          },
          {
            id: "smallest_range_k_lists",
            title: "Smallest Range Covering Elements from K Lists",
            why_it_matters: "Advanced heap problem. Find smallest range that includes at least one element from each list.",
            core_pattern: "Min Heap with Max Tracking",
            tags: ["heap", "sliding-window"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Min Heap + Track Max",
                idea: "Maintain one element from each list in heap. Range = [heap min, current max]. Advance minimum's list to try smaller range.",
                steps: [
                  "Initialize heap with first element of each list, track max",
                  "Current range = [heap min, max]",
                  "Pop minimum, add next element from that list to heap",
                  "Update max if needed, update best range if smaller",
                  "Repeat until any list is exhausted"
                ],
                time_complexity: "O(n log k) where n = total elements",
                space_complexity: "O(k)",
                when_to_use: "Range covering problems"
              }
            ],
            complexity_summary: "O(n log k) time, O(k) space.",
            interview_tip: "Key insight: always advance the list that contains the current minimum. This is the only way to potentially reduce range."
          }
        ]
      }
    ]
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    description: "Problems where making the locally optimal choice at each step leads to a globally optimal solution.",
    lesson_count: 15,
    difficulty_sections: [
      {
        level: "Easy",
        problems: [
          {
            id: "activity_selection",
            title: "Activity Selection / Interval Scheduling",
            why_it_matters: "The canonical greedy problem. Choosing earliest-finishing activities maximizes the number of non-overlapping activities.",
            core_pattern: "Greedy by End Time",
            tags: ["greedy", "sorting", "intervals"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sort by Finish Time",
                idea: "Always pick the activity that finishes earliest (among non-overlapping ones). This leaves maximum room for future activities.",
                steps: [
                  "Sort activities by end time",
                  "Initialize: select first activity, set lastEnd = its end time",
                  "For each remaining activity:",
                  "  If start >= lastEnd: select it, update lastEnd",
                  "Return count of selected activities"
                ],
                time_complexity: "O(n log n) - dominated by sorting",
                space_complexity: "O(1) if sort in-place",
                when_to_use: "Maximizing count of non-overlapping intervals"
              }
            ],
            complexity_summary: "O(n log n) due to sorting. The greedy choice is provably optimal.",
            interview_tip: "Explain WHY this works: by choosing earliest finish, we leave maximum time for remaining activities. This is the 'exchange argument' proof."
          },
          {
            id: "assign_cookies",
            title: "Assign Cookies",
            why_it_matters: "Simple greedy matching. Match smallest cookie to smallest child that it satisfies.",
            core_pattern: "Two-Pointer Greedy",
            tags: ["greedy", "sorting", "two-pointers"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Sort Both, Two Pointers",
                idea: "Sort children by greed, cookies by size. Try to satisfy each child with smallest sufficient cookie.",
                steps: [
                  "Sort children (greed) and cookies (size)",
                  "i = 0 (child), j = 0 (cookie)",
                  "While both in bounds:",
                  "  If cookie[j] >= child[i]: satisfied, i++, j++",
                  "  Else: cookie too small, j++",
                  "Return i (number satisfied)"
                ],
                time_complexity: "O(n log n + m log m)",
                space_complexity: "O(1)",
                when_to_use: "Matching resources to requirements"
              }
            ],
            complexity_summary: "O(n log n) for sorting.",
            interview_tip: "Greedy works because satisfying a greedier child with a small cookie wastes resources. Always satisfy the least greedy first."
          },
          {
            id: "best_time_buy_sell",
            title: "Best Time to Buy and Sell Stock",
            why_it_matters: "One-pass greedy solution. Track minimum price seen so far and calculate max profit at each step.",
            core_pattern: "Greedy / One Pass",
            tags: ["greedy", "array"],
            difficulty: "Easy",
            approaches: [
              {
                name: "Track Minimum",
                idea: "At each day, either it's a new minimum (potential buy day) or calculate profit from previous minimum.",
                steps: [
                  "minPrice = infinity, maxProfit = 0",
                  "For each price:",
                  "  If price < minPrice: minPrice = price",
                  "  Else: maxProfit = max(maxProfit, price - minPrice)",
                  "Return maxProfit"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "One transaction problems"
              }
            ],
            complexity_summary: "O(n) time, O(1) space.",
            interview_tip: "For multiple transactions, sum all profitable consecutive increases. For k transactions, use DP."
          }
        ]
      },
      {
        level: "Medium",
        problems: [
          {
            id: "jump_game",
            title: "Jump Game",
            why_it_matters: "Greedy reachability problem. Track the farthest position reachable and check if we can extend it to the end.",
            core_pattern: "Greedy Reachability",
            tags: ["greedy", "array"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Track Farthest",
                idea: "At each position, update the farthest reachable position. If we can reach the end, return true.",
                steps: [
                  "farthest = 0",
                  "For each index i from 0 to n-1:",
                  "  If i > farthest: can't reach here, return false",
                  "  farthest = max(farthest, i + nums[i])",
                  "  If farthest >= n-1: return true",
                  "Return true"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Checking if target is reachable with variable jumps"
              }
            ],
            complexity_summary: "O(n) time, O(1) space.",
            interview_tip: "Jump Game II (min jumps) uses BFS-like levels. This version only asks if reachable, so greedy suffices."
          },
          {
            id: "jump_game_ii",
            title: "Jump Game II (Minimum Jumps)",
            why_it_matters: "Extends Jump Game to find minimum jumps. Uses a greedy BFS-like approach with levels.",
            core_pattern: "Greedy / BFS-like",
            tags: ["greedy", "array"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Greedy with Levels",
                idea: "Treat each 'level' as positions reachable with k jumps. Find the farthest reachable in next level.",
                steps: [
                  "jumps = 0, currentEnd = 0, farthest = 0",
                  "For each index i from 0 to n-2:",
                  "  farthest = max(farthest, i + nums[i])",
                  "  If i == currentEnd:",
                  "    jumps++, currentEnd = farthest",
                  "Return jumps"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Minimum jumps/moves to reach target"
              }
            ],
            complexity_summary: "O(n) time, O(1) space.",
            interview_tip: "Think of it as BFS levels: all positions reachable with k jumps form level k. We greedily expand each level."
          },
          {
            id: "gas_station",
            title: "Gas Station",
            why_it_matters: "Circular greedy problem. Find the starting station to complete a circular route.",
            core_pattern: "Greedy with Reset",
            tags: ["greedy", "array"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Greedy with Total Check",
                idea: "If total gas >= total cost, a solution exists. Start from position where running sum doesn't go negative.",
                steps: [
                  "totalGas = 0, tank = 0, start = 0",
                  "For each station i:",
                  "  totalGas += gas[i] - cost[i]",
                  "  tank += gas[i] - cost[i]",
                  "  If tank < 0: start = i + 1, tank = 0 (reset)",
                  "Return totalGas >= 0 ? start : -1"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(1)",
                when_to_use: "Circular routes with resources and costs"
              }
            ],
            complexity_summary: "O(n) time, O(1) space.",
            interview_tip: "Key insight: if we fail at station i starting from station s, any station between s and i will also fail. So try i+1."
          },
          {
            id: "meeting_rooms_ii",
            title: "Meeting Rooms II (Min Rooms)",
            why_it_matters: "Classic interval problem. Find minimum rooms for overlapping meetings.",
            core_pattern: "Greedy with Heap or Line Sweep",
            tags: ["greedy", "heap", "intervals"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Min Heap",
                idea: "Sort by start time. Use heap to track end times. If earliest end < new start, reuse that room.",
                steps: [
                  "Sort meetings by start time",
                  "Min heap of end times (active meetings)",
                  "For each meeting:",
                  "  If heap.top() <= meeting.start: pop (room freed)",
                  "  Push meeting.end",
                  "Return heap size"
                ],
                time_complexity: "O(n log n)",
                space_complexity: "O(n)",
                when_to_use: "When you need to track active intervals"
              },
              {
                name: "Line Sweep",
                idea: "Create events for starts (+1) and ends (-1). Sort and sweep, tracking max concurrent.",
                steps: [
                  "Create list of (time, +1 for start, -1 for end)",
                  "Sort by time (end before start on ties)",
                  "Sweep: count += delta, track max count",
                  "Return max count"
                ],
                time_complexity: "O(n log n)",
                space_complexity: "O(n)",
                when_to_use: "When only max overlap matters"
              }
            ],
            complexity_summary: "O(n log n) for both approaches.",
            interview_tip: "Heap approach simulates room allocation. Line sweep just counts overlaps. Both give same answer."
          },
          {
            id: "fractional_knapsack",
            title: "Fractional Knapsack",
            why_it_matters: "Classic greedy problem. Unlike 0/1 knapsack (DP), fractional allows greedy by value density.",
            core_pattern: "Greedy by Value Density",
            tags: ["greedy", "sorting"],
            difficulty: "Medium",
            approaches: [
              {
                name: "Sort by Value/Weight Ratio",
                idea: "Take items with highest value-to-weight ratio first. Take fractional amount of last item if needed.",
                steps: [
                  "Calculate value density for each item: value/weight",
                  "Sort items by density (descending)",
                  "For each item:",
                  "  If item fits: take all, add value",
                  "  Else: take fraction that fits, add proportional value, stop",
                  "Return total value"
                ],
                time_complexity: "O(n log n)",
                space_complexity: "O(1)",
                when_to_use: "When items can be fractionally taken"
              }
            ],
            complexity_summary: "O(n log n) due to sorting.",
            interview_tip: "Greedy works ONLY for fractional knapsack. 0/1 knapsack requires DP."
          }
        ]
      },
      {
        level: "Hard",
        problems: [
          {
            id: "minimum_number_arrows",
            title: "Minimum Number of Arrows to Burst Balloons",
            why_it_matters: "Interval covering problem. Find minimum points that cover all intervals.",
            core_pattern: "Greedy Interval Covering",
            tags: ["greedy", "intervals", "sorting"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Sort by End, Greedy Shoot",
                idea: "Sort by right edge. Shoot at the rightmost point of each group of overlapping balloons.",
                steps: [
                  "Sort balloons by end coordinate",
                  "arrows = 1, arrowPos = first balloon's end",
                  "For each subsequent balloon:",
                  "  If balloon.start > arrowPos:",
                  "    Need new arrow, arrows++, arrowPos = balloon.end",
                  "Return arrows"
                ],
                time_complexity: "O(n log n)",
                space_complexity: "O(1)",
                when_to_use: "Minimum points to cover intervals"
              }
            ],
            complexity_summary: "O(n log n) due to sorting.",
            interview_tip: "Similar to interval scheduling. Sorting by end ensures we make optimal local choices."
          },
          {
            id: "task_scheduler_greedy",
            title: "Task Scheduler (Greedy Analysis)",
            why_it_matters: "Greedy scheduling with constraints. The math formula reveals the structure of optimal solutions.",
            core_pattern: "Greedy with Math",
            tags: ["greedy", "math"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Greedy Formula",
                idea: "Arrange most frequent tasks first with n gaps between them. Fill gaps with other tasks.",
                steps: [
                  "Count frequencies, find max frequency and count of tasks with max freq",
                  "Minimum slots = (maxFreq - 1) * (n + 1) + countOfMax",
                  "Result = max(total tasks, minimum slots)",
                  "If more tasks than slots, they fill gaps (no idle time)"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(26)",
                when_to_use: "When math formula is cleaner than simulation"
              }
            ],
            complexity_summary: "O(n) time, O(1) space.",
            interview_tip: "The formula handles both cases: when we need idle time and when we don't. Draw examples to understand."
          },
          {
            id: "candy",
            title: "Candy Distribution",
            why_it_matters: "Two-pass greedy. Satisfy constraints from left-to-right then right-to-left.",
            core_pattern: "Two-Pass Greedy",
            tags: ["greedy", "array"],
            difficulty: "Hard",
            approaches: [
              {
                name: "Two Passes",
                idea: "First pass: ensure higher-rated child has more candy than left neighbor. Second pass: ensure more than right neighbor.",
                steps: [
                  "Initialize all candies to 1",
                  "Left to right: if ratings[i] > ratings[i-1], candies[i] = candies[i-1] + 1",
                  "Right to left: if ratings[i] > ratings[i+1], candies[i] = max(candies[i], candies[i+1] + 1)",
                  "Sum all candies"
                ],
                time_complexity: "O(n)",
                space_complexity: "O(n)",
                when_to_use: "When constraints come from both sides"
              }
            ],
            complexity_summary: "O(n) time and space.",
            interview_tip: "The two-pass pattern is common: first pass handles one direction, second pass handles the other."
          }
        ]
      }
    ]
  }
];

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
