export const dsaProblems = [
  {
    id: "dsa_arr1",
    category: "Arrays",
    title: "Two Sum",
    difficulty: "Easy",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    inputOutput: "Input: nums = [2,7,11,15], target = 9\nOutput: [0, 1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    solution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
    explanation: "This problem can be resolved efficiently in O(n) time using a HashMap. As we traverse the array, we check if the complement (target - current_value) is already present in our map. If it is, we return the complement's index and current index. Otherwise, we insert the current element and its index into the map. This uses O(n) extra space to store elements in the hash table."
  },
  {
    id: "dsa_str1",
    category: "Strings",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    statement: "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    inputOutput: "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
    solution: `import java.util.HashMap;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), ans = 0;
        HashMap<Character, Integer> map = new HashMap<>(); // character -> index
        
        for (int j = 0, i = 0; j < n; j++) {
            if (map.containsKey(s.charAt(j))) {
                i = Math.max(map.get(s.charAt(j)) + 1, i);
            }
            ans = Math.max(ans, j - i + 1);
            map.put(s.charAt(j), j);
        }
        return ans;
    }
}`,
    explanation: "We utilize a sliding window approach with two pointers (i and j) representing the current substring. A HashMap stores characters and their latest index positions. When we scan a repeating character at index j, we shift the left pointer i to the position right after its last recorded index. This maintains a window containing unique elements, achieving O(n) time complexity and O(min(m, n)) space complexity where m is the character set size."
  },
  {
    id: "dsa_rec1",
    category: "Recursion",
    title: "Climbing Stairs",
    difficulty: "Easy",
    statement: "You are climbing a staircase. It takes n steps to reach the top.\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    constraints: "1 <= n <= 45",
    inputOutput: "Input: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    solution: `public class Solution {
    public int climbStairs(int n) {
        if (n == 1) return 1;
        int first = 1;
        int second = 2;
        for (int i = 3; i <= n; i++) {
            int third = first + second;
            first = second;
            second = third;
        }
        return second;
    }
}`,
    explanation: "This problem resolves to a Fibonacci recurrence relation: ways(n) = ways(n-1) + ways(n-2) because you can reach step n either from n-1 (via a 1-step jump) or n-2 (via a 2-step jump). Instead of a highly inefficient O(2^n) standard recursion, we optimize it iteratively in-place, reducing runtime to O(n) with O(1) auxiliary space."
  },
  {
    id: "dsa_sea1",
    category: "Searching (Binary Search)",
    title: "Search in Rotated Sorted Array",
    difficulty: "Hard",
    statement: "There is an integer array nums sorted in ascending order (with distinct values).\nPrior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not.",
    constraints: "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nnums consists of unique values.\ntarget is an integer.",
    inputOutput: "Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
    solution: `public class Solution {
    public int search(int[] nums, int target) {
        int start = 0, end = nums.length - 1;
        while (start <= end) {
            int mid = start + (end - start) / 2;
            if (nums[mid] == target) return mid;
            
            // Check if left half is sorted
            if (nums[start] <= nums[mid]) {
                if (target >= nums[start] && target < nums[mid]) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            } 
            // Otherwise, right half must be sorted
            else {
                if (target > nums[mid] && target <= nums[end]) {
                    start = mid + 1;
                } else {
                    end = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
    explanation: "Even with rotation, at least one half of the array (left or right) is guaranteed to be sorted at any binary cut. We determine which half is sorted by comparing nums[start] and nums[mid]. If the left is sorted, we check if the target lies within its bounds to search it; otherwise, we search the right. This yields a fast O(log n) time complexity, satisfying hard-tier performance specifications."
  },
  {
    id: "dsa_srt1",
    category: "Sorting (Bubble, Merge, Quick)",
    title: "Merge Intervals",
    difficulty: "Medium",
    statement: "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    constraints: "1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= start_i <= end_i <= 10^4",
    inputOutput: "Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\nExplanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
    solution: `import java.util.Arrays;
import java.util.LinkedList;

public class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        
        // Sort by start times
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        
        LinkedList<int[]> merged = new LinkedList<>();
        for (int[] interval : intervals) {
            // If empty or no overlap, add new
            if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {
                merged.add(interval);
            } 
            // Overlap occurs, merge boundaries
            else {
                merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
    explanation: "We sort the intervals by their start points. This groups potentially overlapping blocks contiguously. We iterate through the intervals, adding the first to a linked list. For subsequent intervals, if the start time is less than or equal to the end time of the last added interval, we merge them by expanding the end boundary. Time complexity is dominated by sorting, resulting in O(n log n) with O(n) storage."
  },
  {
    id: "dsa_ll1",
    category: "Linked List",
    title: "Reverse Linked List",
    difficulty: "Easy",
    statement: "Given the head of a singly linked list, reverse the list, and return its reversed head.",
    constraints: "The number of nodes in the list is in the range [0, 5000].\n-5000 <= Node.val <= 5000",
    inputOutput: "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
    solution: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
    explanation: "Reversing a singly linked list is performed in a single traversal (iteratively) by re-pointing each node's next pointer to its preceding node. We maintain three pointer states: prev, curr, and nextTemp to prevent losing the trailing list references during assignment swaps. This runs in O(n) time and O(1) space."
  },
  {
    id: "dsa_sq1",
    category: "Stack & Queue",
    title: "Valid Parentheses",
    difficulty: "Easy",
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses characters only.",
    inputOutput: "Input: s = \"()[]{}\"\nOutput: true",
    solution: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    explanation: "We iterate through the string and use a Stack to track expected closing brackets. When we encounter an opening bracket, we push its corresponding closing bracket onto the stack. If we see a closing bracket, we pop from the stack and verify it matches the current character. A mismatch or empty stack yields false. This operates in O(n) time and O(n) auxiliary space."
  },
  {
    id: "dsa_hash1",
    category: "Hashing",
    title: "Group Anagrams",
    difficulty: "Medium",
    statement: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    constraints: "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
    inputOutput: "Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
    solution: `import java.util.*;

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) return new ArrayList<>();
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = String.valueOf(ca);
            if (!map.containsKey(key)) map.put(key, new ArrayList<>());
            map.get(key).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
    explanation: "Two strings are anagrams if their sorted character representations are identical. We loop through each string in the array, sort its characters to generate a unique hash key, and map it in a HashMap. Elements sharing the key are added to the corresponding list. Time complexity is O(N * K log K) where N is array length and K is string length."
  },
  {
    id: "dsa_tree1",
    category: "Trees (Binary Tree, BST)",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    statement: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    constraints: "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
    inputOutput: "Input: root = [2,1,3]\nOutput: true",
    solution: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    
    private boolean validate(TreeNode node, Integer low, Integer high) {
        if (node == null) return true;
        
        if ((low != null && node.val <= low) || (high != null && node.val >= high)) {
            return false;
        }
        
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
}`,
    explanation: "A valid BST requires that all nodes in the left subtree have values strictly less than their parent, and all nodes in the right subtree have values strictly greater. Passing simple parent-child comparisons is insufficient, so we recursively pass low and high boundary limits down the tree structure. This executes in O(n) time, using O(n) call stack space in skewed trees."
  },
  {
    id: "dsa_graph1",
    category: "Graphs (Basics)",
    title: "Find if Path Exists in Graph",
    difficulty: "Easy",
    statement: "There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1. Given the edges and source and destination, determine if a valid path exists between source and destination.",
    constraints: "1 <= n <= 2 * 10^5\n0 <= edges.length <= 2 * 10^5\nsource != destination",
    inputOutput: "Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2\nOutput: true",
    solution: `import java.util.*;

public class Solution {
    public boolean validPath(int n, int[][] edges, int source, int destination) {
        // Build Adjacency List
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }
        
        // BFS traversal
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[n];
        
        queue.offer(source);
        visited[source] = true;
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            if (curr == destination) return true;
            
            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        return false;
    }
}`,
    explanation: "We convert the edges list into an adjacency list representation for efficient lookup. We then run a standard Breadth-First Search (BFS) starting from the source vertex. We push visited vertex numbers onto a Queue, marking them to avoid circular traversal. If the destination vertex is polled from the queue, a path exists, yielding true. The overall search is O(V + E) time."
  },
  {
    id: "dsa_dp1",
    category: "Dynamic Programming (Intro)",
    title: "0/1 Knapsack Problem",
    difficulty: "Medium",
    statement: "Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.",
    constraints: "1 <= N <= 1000\n1 <= W <= 1000",
    inputOutput: "Input: N = 3, W = 4, values = [1,2,3], weights = [4,5,1]\nOutput: 3\nExplanation: Choose the third item (weight 1, value 3) to fit in W = 4.",
    solution: `public class Solution {
    public static int knapSack(int W, int[] wt, int[] val, int n) {
        int[][] dp = new int[n + 1][W + 1];
        
        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (i == 0 || w == 0) {
                    dp[i][w] = 0;
                } else if (wt[i - 1] <= w) {
                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][W];
    }
}`,
    explanation: "This classic 0/1 Knapsack is solved using bottom-up 2D Dynamic Programming. A DP table dp[i][w] stores the maximum value obtainable using the first i items under capacity limit w. For each item, we decide whether to exclude it (taking dp[i-1][w]) or include it (val[i-1] + dp[i-1][w - wt[i-1]]) based on maximum yield. This operates in O(N * W) time and space."
  }
];
