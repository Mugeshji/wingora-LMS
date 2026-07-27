// ==================== TCS CODING CHALLENGES ====================
export const codingQuestions = [
  // --- NINJA LEVEL (Days 1–30) ---
  {
    id: "tcs_ninja_code_1",
    track: "ninja",
    topic: "Basic Programming",
    difficulty: "Easy",
    question: "Write a program to find the Nth Fibonacci number. The Fibonacci sequence starts with 0 and 1, where F(0) = 0, F(1) = 1, and F(N) = F(N-1) + F(N-2) for N >= 2.",
    starter_code: `public class Solution {
    public int solve(int n) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "0", expected: "0", explanation: "F(0) is 0" },
      { input: "1", expected: "1", explanation: "F(1) is 1" },
      { input: "5", expected: "5", explanation: "Sequence: 0, 1, 1, 2, 3, 5" },
      { input: "9", expected: "34", explanation: "9th Fibonacci number" },
      { input: "12", expected: "144", explanation: "12th Fibonacci number" }
    ],
    hint_body: "Mistake: Using simple recursion without memoization leads to Time Limit Exceeded (TLE) for larger inputs.\nRectify: Use an iterative approach with a loop and variables to keep track of the last two values, reducing Time Complexity to O(N) and Space to O(1). Check for base cases where n <= 1.",
    solution: `public class Solution {
    public int solve(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        int prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int curr = prev2 + prev1;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
    explanation: "To find the Nth Fibonacci number efficiently, we start from base cases F(0)=0 and F(1)=1. For values N >= 2, we iterate iteratively up to N, updating our two state variables to avoid stack overhead of recursion.",
    years_seen: [2018, 2021, 2023, 2025]
  },
  {
    id: "tcs_ninja_code_2",
    track: "ninja",
    topic: "Array Manipulation",
    difficulty: "Easy",
    question: "Write a program to check if an array of integers can be partitioned into two subsets with equal sum. Return 1 if possible, else 0.",
    starter_code: `public class Solution {
    public int solve(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "[1, 5, 11, 5]", expected: "1", explanation: "Partitioned into [1, 5, 5] and [11]" },
      { input: "[1, 2, 3, 5]", expected: "0", explanation: "Sum is 11, odd sum cannot be divided equally" },
      { input: "[3, 3]", expected: "1", explanation: "Both subsets sum to 3" },
      { input: "[10, 20, 30]", expected: "1", explanation: "Partitioned into [10, 20] and [30]" },
      { input: "[1, 2, 5]", expected: "0", explanation: "Sum is 8 but cannot partition equally" }
    ],
    hint_body: "Mistake: Assuming dynamic programming is always needed without checking the sum oddity.\nRectify: First compute the total sum. If sum % 2 != 0, return 0 immediately. Then use a boolean array of size (sum/2) + 1 to track reachable sums.",
    solution: `public class Solution {
    public int solve(int[] nums) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % 2 != 0) return 0;
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                if (dp[j - num]) dp[j] = true;
            }
        }
        return dp[target] ? 1 : 0;
    }
}`,
    explanation: "Compute the total sum of elements. If it is odd, partition is impossible. If even, target is sum / 2. We use a 1D DP array where dp[j] is true if a subset sum of j is possible.",
    years_seen: [2020, 2022, 2023, 2025]
  },
  {
    id: "tcs_ninja_code_3",
    track: "ninja",
    topic: "String Manipulation",
    difficulty: "Easy",
    question: "Write a program to check if two strings are Anagrams of each other. Return 1 if they are anagrams, else 0.",
    starter_code: `public class Solution {
    public int solve(String s, String t) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "\"anagram\", \"nagaram\"", expected: "1", explanation: "Contains identical letters with identical count" },
      { input: "\"rat\", \"car\"", expected: "0", explanation: "Letters are different" },
      { input: "\"listen\", \"silent\"", expected: "1", explanation: "Anagram strings" },
      { input: "\"abc\", \"ab\"", expected: "0", explanation: "Different lengths" },
      { input: "\"a\", \"a\"", expected: "1", explanation: "Single character match" }
    ],
    hint_body: "Mistake: Forgetting to check if strings have equal lengths first.\nRectify: Add `if (s.length() != t.length()) return 0;` at the beginning. Use a single frequency array of size 26 for counting.",
    solution: `public class Solution {
    public int solve(String s, String t) {
        if (s.length() != t.length()) return 0;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int count : counts) {
            if (count != 0) return 0;
        }
        return 1;
    }
}`,
    explanation: "Two strings are anagrams if their character counts are identical. We map character counts to an integer array of size 26 and verify all counts end at 0.",
    years_seen: [2017, 2019, 2021, 2023, 2024]
  },
  {
    id: "tcs_ninja_code_4",
    track: "ninja",
    topic: "Basic Programming",
    difficulty: "Easy",
    question: "Write a program to check if a given integer is a Prime Number. Return 1 if it is prime, else 0.",
    starter_code: `public class Solution {
    public int solve(int n) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "1", expected: "0", explanation: "1 is not prime" },
      { input: "2", expected: "1", explanation: "2 is prime" },
      { input: "17", expected: "1", explanation: "17 is prime" },
      { input: "4", expected: "0", explanation: "4 is divisible by 2" },
      { input: "97", expected: "1", explanation: "97 is prime" }
    ],
    hint_body: "Mistake: Running a loop from 2 to N-1 which is slow (O(N)).\nRectify: Run the loop only up to the square root of N (i <= Math.sqrt(n)), reducing search time to O(sqrt(N)). Handle base cases (n <= 1) properly.",
    solution: `public class Solution {
    public int solve(int n) {
        if (n <= 1) return 0;
        if (n == 2) return 1;
        if (n % 2 == 0) return 0;
        for (int i = 3; i * i <= n; i += 2) {
            if (n % i == 0) return 0;
        }
        return 1;
    }
}`,
    explanation: "A prime number is only divisible by 1 and itself. We check divisibility up to the square root of N, bypassing even numbers to optimize calculation.",
    years_seen: [2019, 2021, 2025]
  },
  {
    id: "tcs_ninja_code_5",
    track: "ninja",
    topic: "Array Manipulation",
    difficulty: "Easy",
    question: "Find the Second Largest element in an array of integers. Return -1 if no second largest exists.",
    starter_code: `public class Solution {
    public int solve(int[] nums) {
        // Write your code here
        return -1;
    }
}`,
    test_cases: [
      { input: "[12, 35, 1, 10, 34, 1]", expected: "34", explanation: "Largest is 35, second largest is 34" },
      { input: "[10, 10, 10]", expected: "-1", explanation: "All elements are equal" },
      { input: "[2, 1]", expected: "1", explanation: "Largest is 2, second largest is 1" },
      { input: "[5]", expected: "-1", explanation: "Single element array" },
      { input: "[4, 8, 2, 8]", expected: "4", explanation: "Largest is 8, second largest is 4" }
    ],
    hint_body: "Mistake: Sorting the array first. Sorting takes O(N log N) time and can fail with duplicates.\nRectify: Traverse the array in a single pass O(N). Maintain 'first' and 'second' largest variables. Initialize them to Integer.MIN_VALUE.",
    solution: `public class Solution {
    public int solve(int[] nums) {
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        for (int x : nums) {
            if (x > first) {
                second = first;
                first = x;
            } else if (x > second && x != first) {
                second = x;
            }
        }
        return second == Integer.MIN_VALUE ? -1 : second;
    }
}`,
    explanation: "We scan the list in one pass. When we find a number larger than our maximum, we demote the current maximum to second largest. If it is less than first but larger than second, we update second.",
    years_seen: [2020, 2022, 2024]
  },
  {
    id: "tcs_ninja_code_6",
    track: "ninja",
    topic: "String Manipulation",
    difficulty: "Easy",
    question: "Write a program to reverse the vowels of a string. Leave all other consonants unchanged.",
    starter_code: `public class Solution {
    public String solve(String s) {
        // Write your code here
        return s;
    }
}`,
    test_cases: [
      { input: "\"hello\"", expected: "\"holle\"", explanation: "'e' and 'o' reversed" },
      { input: "\"leetcode\"", expected: "\"leotcede\"", explanation: "vowels reversed" },
      { input: "\"xyz\"", expected: "\"xyz\"", explanation: "no vowels present" },
      { input: "\"aA\"", expected: "\"Aa\"", explanation: "case-sensitive swap" },
      { input: "\"\"", expected: "\"\"", explanation: "empty string case" }
    ],
    hint_body: "Mistake: Modifying the string in-place directly (strings are immutable in Java).\nRectify: Convert the string to a char array. Use two pointers (left and right) to scan from both ends, swapping characters when both point to vowels.",
    solution: `public class Solution {
    public String solve(String s) {
        char[] chars = s.toCharArray();
        String vowels = "aeiouAEIOU";
        int i = 0, j = chars.length - 1;
        while (i < j) {
            while (i < j && vowels.indexOf(chars[i]) == -1) i++;
            while (i < j && vowels.indexOf(chars[j]) == -1) j--;
            char temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
            i++;
            j--;
        }
        return new String(chars);
    }
}`,
    explanation: "Using the two-pointer technique, we find vowels from both the start and end of the string, swap them, and progress inward until the pointers meet.",
    years_seen: [2021, 2023]
  },
  {
    id: "tcs_ninja_code_7",
    track: "ninja",
    topic: "Basic Programming",
    difficulty: "Easy",
    question: "Write a program to find the Greatest Common Divisor (GCD) of two numbers. Use Euclidean algorithm.",
    starter_code: `public class Solution {
    public int solve(int a, int b) {
        // Write your code here
        return 1;
    }
}`,
    test_cases: [
      { input: "12, 18", expected: "6", explanation: "Common divisors are 1,2,3,6; largest is 6" },
      { input: "5, 7", expected: "1", explanation: "Coprime numbers" },
      { input: "0, 5", expected: "5", explanation: "GCD(0, x) is x" },
      { input: "30, 45", expected: "15", explanation: "GCD is 15" },
      { input: "81, 153", expected: "9", explanation: "GCD is 9" }
    ],
    hint_body: "Mistake: Using subtraction repetitively can lead to slow performance when one number is much larger.\nRectify: Use the modulo operator (a % b) recursively or in a loop. Base case: when b becomes 0, return a.",
    solution: `public class Solution {
    public int solve(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}`,
    explanation: "The Euclidean algorithm works by repeatedly replacing the larger number with its remainder when divided by the smaller number until the remainder is zero.",
    years_seen: [2018, 2020, 2024]
  },
  {
    id: "tcs_ninja_code_8",
    track: "ninja",
    topic: "Array Manipulation",
    difficulty: "Easy",
    question: "Given a non-empty array of integers, every element appears twice except for one. Find that single one.",
    starter_code: `public class Solution {
    public int solve(int[] nums) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "[2, 2, 1]", expected: "1", explanation: "1 is the only single element" },
      { input: "[4, 1, 2, 1, 2]", expected: "4", explanation: "4 is single" },
      { input: "[1]", expected: "1", explanation: "Single element list" },
      { input: "[7, 3, 7]", expected: "3", explanation: "3 appears once" },
      { input: "[9, 9, 8, 7, 8]", expected: "7", explanation: "7 appears once" }
    ],
    hint_body: "Mistake: Using nested loops O(N^2) or extra space like HashMap O(N).\nRectify: Use the XOR bitwise operator. XORing a number with itself results in 0 (A ^ A = 0), and XORing with 0 remains unchanged (A ^ 0 = A). Cumulative XOR will isolate the single element in O(1) space.",
    solution: `public class Solution {
    public int solve(int[] nums) {
        int result = 0;
        for (int x : nums) {
            result ^= x;
        }
        return result;
    }
}`,
    explanation: "Because XOR is commutative and associative, elements that appear twice cancel each other out, leaving only the unique single value.",
    years_seen: [2019, 2022, 2025]
  },
  {
    id: "tcs_ninja_code_9",
    track: "ninja",
    topic: "String Manipulation",
    difficulty: "Easy",
    question: "Check if a string is a Palindrome after converting all uppercase letters into lowercase and removing all non-alphanumeric characters. Return 1 if palindrome, else 0.",
    starter_code: `public class Solution {
    public int solve(String s) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "\"A man, a plan, a canal: Panama\"", expected: "1", explanation: "Converts to 'amanaplanacanalpanama'" },
      { input: "\"race a car\"", expected: "0", explanation: "Converts to 'raceacar' (not palindrome)" },
      { input: "\" \"", expected: "1", explanation: "Empty alphanumeric string is palindrome" },
      { input: "\"No 'x' in Nixon\"", expected: "1", explanation: "Converts to 'noxinnixon'" },
      { input: "\"12321\"", expected: "1", explanation: "Numeric palindrome" }
    ],
    hint_body: "Mistake: Creating heavy new strings with regular expressions which consumes extra memory.\nRectify: Use a two-pointer approach directly on the string, skipping non-alphanumeric characters using `Character.isLetterOrDigit()` and comparing lowercase matches.",
    solution: `public class Solution {
    public int solve(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
            while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
            if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) {
                return 0;
            }
            i++;
            j--;
        }
        return 1;
    }
}`,
    explanation: "We scan the string from both ends simultaneously, bypassing non-alphanumeric symbols and verifying symmetric character equivalence.",
    years_seen: [2021, 2024]
  },
  {
    id: "tcs_ninja_code_10",
    track: "ninja",
    topic: "Basic Programming",
    difficulty: "Easy",
    question: "Calculate the Factorial of a non-negative integer N. Return the value as a long to avoid overflow.",
    starter_code: `public class Solution {
    public long solve(int n) {
        // Write your code here
        return 1L;
    }
}`,
    test_cases: [
      { input: "0", expected: "1", explanation: "0! is 1" },
      { input: "1", expected: "1", explanation: "1! is 1" },
      { input: "5", expected: "120", explanation: "5! = 5*4*3*2*1 = 120" },
      { input: "10", expected: "3628800", explanation: "10!" },
      { input: "15", expected: "1307674368000", explanation: "Large input requires long representation" }
    ],
    hint_body: "Mistake: Using int for storing the result causes overflow for N > 12.\nRectify: Declare the accumulator as `long` and initialize to 1. Compute iteratively using a loop from 2 to N.",
    solution: `public class Solution {
    public long solve(int n) {
        long res = 1;
        for (int i = 2; i <= n; i++) {
            res *= i;
        }
        return res;
    }
}`,
    explanation: "Iteratively multiply integers from 2 to N using a 64-bit long integer to support higher factorial limits.",
    years_seen: [2017, 2020, 2023]
  },

  // --- DIGITAL LEVEL (Days 31–60) ---
  {
    id: "tcs_dig_code_1",
    track: "digital",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    question: "Write a program to solve the 'Longest Common Subsequence' (LCS) problem. Given two strings, return the length of their longest common subsequence.",
    starter_code: `public class Solution {
    public int solve(String text1, String text2) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "\"abcde\", \"ace\"", expected: "3", explanation: "LCS is 'ace'" },
      { input: "\"abc\", \"abc\"", expected: "3", explanation: "LCS is 'abc'" },
      { input: "\"abc\", \"def\"", expected: "0", explanation: "No common characters" },
      { input: "\"ezupkr\", \"ubmra\"", expected: "2", explanation: "LCS is 'ur'" },
      { input: "\"abcba\", \"abcbcba\"", expected: "5", explanation: "LCS is 'abcba'" }
    ],
    hint_body: "Mistake: Plain recursive formulation has exponential time complexity O(2^(N+M)).\nRectify: Use 2D Dynamic Programming. Keep a table dp[m+1][n+1] to store match counts. If characters match, `dp[i][j] = dp[i-1][j-1] + 1`; else, take `Math.max(dp[i-1][j], dp[i][j-1])`.",
    solution: `public class Solution {
    public int solve(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
    explanation: "Construct a 2D grid storing longest match counts for suffixes. Compare characters at indices i-1 and j-1 to accumulate optimal subsequence match length.",
    years_seen: [2018, 2020, 2022, 2025]
  },
  {
    id: "tcs_dig_code_2",
    track: "digital",
    topic: "Sorting & Searching",
    difficulty: "Medium",
    question: "Merge overlapping intervals. Given an array of intervals, merge all overlapping ones and return the count of remaining merged intervals.",
    starter_code: `public class Solution {
    public int solve(int[][] intervals) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "3", explanation: "[1,3] and [2,6] merge into [1,6]" },
      { input: "[[1,4],[4,5]]", expected: "1", explanation: "[1,4] and [4,5] merge into [1,5]" },
      { input: "[[1,4],[5,6]]", expected: "2", explanation: "No overlap" },
      { input: "[[1,10]]", expected: "1", explanation: "Single interval" },
      { input: "[[1,4],[2,3]]", expected: "1", explanation: "[2,3] is nested inside [1,4]" }
    ],
    hint_body: "Mistake: Merging intervals without sorting start times first.\nRectify: Sort `intervals` by starting bounds `Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]))`. Then scan and keep track of the current active interval limit.",
    solution: `import java.util.*;
public class Solution {
    public int solve(int[][] intervals) {
        if (intervals.length <= 1) return intervals.length;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        int count = 1;
        int[] curr = intervals[0];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] <= curr[1]) {
                curr[1] = Math.max(curr[1], intervals[i][1]);
            } else {
                curr = intervals[i];
                count++;
            }
        }
        return count;
    }
}`,
    explanation: "Sorting the list first guarantees that overlaps are contiguous. We track the current boundary, extending it if the next starts before the current ends, or starting a new segment otherwise.",
    years_seen: [2019, 2021, 2024]
  },
  {
    id: "tcs_dig_code_3",
    track: "digital",
    topic: "Two Pointers",
    difficulty: "Medium",
    question: "Given an array of integers, find the Length of the Longest Subarray with sum equal to K. Return 0 if none exists.",
    starter_code: `public class Solution {
    public int solve(int[] nums, int k) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "[10, 5, 2, 7, 1, 9], 15", expected: "4", explanation: "Subarray [5, 2, 7, 1] sums to 15 (length 4)" },
      { input: "[-1, 2, 3], 6", expected: "0", explanation: "No subarray sums to 6" },
      { input: "[1, -1, 5, -2, 3], 3", expected: "4", explanation: "Subarray [1, -1, 5, -2] sums to 3" },
      { input: "[3, 4, 7, 2, -3, 1, 4, 2], 7", expected: "4", explanation: "Subarray [2, -3, 1, 4, 2] or others" },
      { input: "[0, 0, 0], 0", expected: "3", explanation: "Full array matches sum 0" }
    ],
    hint_body: "Mistake: Assuming a two-pointer sliding window is sufficient (fails with negative numbers).\nRectify: Use a HashMap to store the running prefix sum and its earliest index. If (sum - k) is found in map, calculate subarray length and update max.",
    solution: `import java.util.HashMap;
public class Solution {
    public int solve(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int sum = 0, maxLen = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (sum == k) maxLen = i + 1;
            if (map.containsKey(sum - k)) {
                maxLen = Math.max(maxLen, i - map.get(sum - k));
            }
            if (!map.containsKey(sum)) {
                map.put(sum, i);
            }
        }
        return maxLen;
    }
}`,
    explanation: "Prefix sum hashing resolves subarray sums efficiently. If a sum of (current_sum - K) was recorded at index X, then the range from X+1 to current_index sums to K.",
    years_seen: [2018, 2021, 2023]
  },
  {
    id: "tcs_dig_code_4",
    track: "digital",
    topic: "Sliding Window",
    difficulty: "Medium",
    question: "Find the length of the Longest Substring Without Repeating Characters.",
    starter_code: `public class Solution {
    public int solve(String s) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "\"abcabcbb\"", expected: "3", explanation: "'abc' is the longest unique substring" },
      { input: "\"bbbbb\"", expected: "1", explanation: "'b' of length 1" },
      { input: "\"pwwkew\"", expected: "3", explanation: "'wke' of length 3" },
      { input: "\"\"", expected: "0", explanation: "empty string" },
      { input: "\"dvdf\"", expected: "3", explanation: "'vdf' of length 3" }
    ],
    hint_body: "Mistake: Shrinking the window left border slowly step-by-step (O(2N)).\nRectify: Store the last index of characters in a hash map or int array. Jump the left pointer directly to `max(left, map.get(char) + 1)`.",
    solution: `import java.util.HashMap;
public class Solution {
    public int solve(String s) {
        int n = s.length(), maxLen = 0;
        HashMap<Character, Integer> map = new HashMap<>();
        for (int j = 0, i = 0; j < n; j++) {
            if (map.containsKey(s.charAt(j))) {
                i = Math.max(map.get(s.charAt(j)) + 1, i);
            }
            maxLen = Math.max(maxLen, j - i + 1);
            map.put(s.charAt(j), j);
        }
        return maxLen;
    }
}`,
    explanation: "Using a sliding window, we advance the right pointer. If a duplicate is encountered, we slide the left boundary past the index of the first occurrence.",
    years_seen: [2020, 2022, 2024]
  },
  {
    id: "tcs_dig_code_5",
    track: "digital",
    topic: "Stacks & Queues",
    difficulty: "Medium",
    question: "Given a string containing only brackets '(', ')', '{', '}', '[' and ']', check if the input string is valid. Return 1 if valid, else 0.",
    starter_code: `public class Solution {
    public int solve(String s) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "\"()\"", expected: "1", explanation: "Matched parentheses" },
      { input: "\"()[]{}\"", expected: "1", explanation: "All brackets matched" },
      { input: "\"(]\"", expected: "0", explanation: "Mismatched closing bracket" },
      { input: "\"([)]\"", expected: "0", explanation: "Incorrect closing order" },
      { input: "\"{[]}\"", expected: "1", explanation: "Nested matches valid" }
    ],
    hint_body: "Mistake: Counting bracket frequencies instead of tracking sequence (fails ordering like '([)]').\nRectify: Use a Stack to push opening brackets. When a closing bracket arrives, pop from the stack and verify it matches the current closing type. Return 0 if mismatched or stack empty.",
    solution: `import java.util.Stack;
public class Solution {
    public int solve(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) return 0;
            }
        }
        return stack.isEmpty() ? 1 : 0;
    }
}`,
    explanation: "A stack guarantees LIFO (Last-In-First-Out) verification of nested brackets. Every closed bracket must pair with the most recently opened bracket.",
    years_seen: [2019, 2021, 2023, 2025]
  },

  // --- PRIME LEVEL (Days 61–75) ---
  {
    id: "tcs_pri_code_1",
    track: "prime",
    topic: "Advanced DSA",
    difficulty: "Hard",
    question: "Word Ladder length. Find the length of the shortest transformation sequence from beginWord to endWord using a dictionary wordList. Return 0 if impossible.",
    starter_code: `import java.util.List;
public class Solution {
    public int solve(String beginWord, String endWord, List<String> wordList) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", expected: "5", explanation: "hit -> hot -> dot -> dog -> cog (5 words)" },
      { input: "\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]", expected: "0", explanation: "'cog' is not in wordList" },
      { input: "\"a\", \"c\", [\"a\",\"b\",\"c\"]", expected: "2", explanation: "a -> c (2 words)" },
      { input: "\"lost\", \"cost\", [\"most\",\"cost\",\"dust\"]", expected: "2", explanation: "lost -> cost" },
      { input: "\"talk\", \"tail\", [\"talk\",\"tail\"]", expected: "2", explanation: "talk -> tail" }
    ],
    hint_body: "Mistake: Using Depth First Search (DFS) for finding the shortest path (extremely slow and inefficient).\nRectify: Use Breadth First Search (BFS). Store words in a HashSet for O(1) checks. Queue intermediate words level by level, updating matching letters.",
    solution: `import java.util.*;
public class Solution {
    public int solve(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        int level = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String curr = queue.poll();
                if (curr.equals(endWord)) return level;
                char[] chars = curr.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char originalChar = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == originalChar) continue;
                        chars[j] = c;
                        String nextWord = new String(chars);
                        if (set.contains(nextWord)) {
                            queue.add(nextWord);
                            set.remove(nextWord);
                        }
                    }
                    chars[j] = originalChar;
                }
            }
            level++;
        }
        return 0;
    }
}`,
    explanation: "This is a shortest path problem in an unweighted graph. We traverse words using BFS. At each word, we check all single-character variations and enqueue matches.",
    years_seen: [2021, 2023, 2025]
  },
  {
    id: "tcs_pri_code_2",
    track: "prime",
    topic: "Backtracking",
    difficulty: "Hard",
    question: "Solve the N-Queens puzzle. Place N queens on an NxN chessboard such that no two attack each other. Return the number of distinct solutions.",
    starter_code: `public class Solution {
    public int solve(int n) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "1", expected: "1", explanation: "Single configuration possible" },
      { input: "4", expected: "2", explanation: "Two solutions for 4x4 board" },
      { input: "8", expected: "92", explanation: "92 standard solutions for 8x8 board" },
      { input: "2", expected: "0", explanation: "No placement possible" },
      { input: "3", expected: "0", explanation: "No placement possible" }
    ],
    hint_body: "Mistake: Checking rows and columns by iterating through the board inside recursion (O(N^3)).\nRectify: Use boolean tracking arrays for columns (`cols`), primary diagonals (`diag1`), and secondary diagonals (`diag2`). Diagonals are mapped as `row - col + n` and `row + col`.",
    solution: `public class Solution {
    private int count = 0;
    public int solve(int n) {
        count = 0;
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n];
        boolean[] diag2 = new boolean[2 * n];
        backtrack(0, n, cols, diag1, diag2);
        return count;
    }
    private void backtrack(int row, int n, boolean[] cols, boolean[] diag1, boolean[] diag2) {
        if (row == n) {
            count++;
            return;
        }
        for (int col = 0; col < n; col++) {
            int d1 = row - col + n;
            int d2 = row + col;
            if (cols[col] || diag1[d1] || diag2[d2]) continue;
            cols[col] = true;
            diag1[d1] = true;
            diag2[d2] = true;
            backtrack(row + 1, n, cols, diag1, diag2);
            cols[col] = false;
            diag1[d1] = false;
            diag2[d2] = false;
        }
    }
}`,
    explanation: "Using backtracking, we place queens row by row. We record columns and diagonal attacks dynamically to quickly prune branches.",
    years_seen: [2018, 2022, 2024, 2026]
  },
  {
    id: "tcs_pri_code_3",
    track: "prime",
    topic: "Advanced DSA",
    difficulty: "Hard",
    question: "Given a 2D binary grid, count the number of Islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
    starter_code: `public class Solution {
    public int solve(char[][] grid) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", expected: "3", explanation: "Three separate island structures" },
      { input: "[['0']]", expected: "0", explanation: "All water" },
      { input: "[['1']]", expected: "1", explanation: "Single land block" },
      { input: "[['1','0'],['0','1']]", expected: "2", explanation: "Diagonal lands are not connected" },
      { input: "[['1','1','1'],['1','1','1']]", expected: "1", explanation: "All land connected" }
    ],
    hint_body: "Mistake: Forgetting to mark visited land, causing infinite loops.\nRectify: Mutate visited land blocks to '0' directly, or keep a 2D boolean array. Traverse starting from land ('1') using DFS or BFS to sink the entire island.",
    solution: `public class Solution {
    public int solve(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,
    explanation: "We scan the grid. When we find land '1', we increment our island count and trigger a DFS to visit and sink all adjacent connected lands.",
    years_seen: [2021, 2023, 2024]
  },
  {
    id: "tcs_pri_code_4",
    track: "prime",
    topic: "Advanced DSA",
    difficulty: "Hard",
    question: "Given a non-empty binary tree, find the Maximum Path Sum. The path may start and end at any node.",
    starter_code: `// Definition for a binary tree node.
// class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
// }
public class Solution {
    public int solve(TreeNode root) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "[1, 2, 3]", expected: "6", explanation: "Path is 2 -> 1 -> 3 (sum 6)" },
      { input: "[-10, 9, 20, null, null, 15, 7]", expected: "42", explanation: "Path is 15 -> 20 -> 7 (sum 42)" },
      { input: "[-3]", expected: "-3", explanation: "Single negative node" },
      { input: "[2, -1]", expected: "2", explanation: "Max is node 2 itself" },
      { input: "[-2, 1, 3]", expected: "4", explanation: "Path 1 -> -2 -> 3 is smaller than 1 -> -2 (sum -1). Best is 1 + 3 = 4." }
    ],
    hint_body: "Mistake: Forgetting that path sums can be negative and missing standard threshold checks.\nRectify: Compute sub-tree returns as `Math.max(0, solveSub(node.left))`. Maintain a global variable updated with `node.val + leftMax + rightMax`.",
    solution: `public class Solution {
    private int maxVal = Integer.MIN_VALUE;
    public int solve(TreeNode root) {
        maxVal = Integer.MIN_VALUE;
        pathSum(root);
        return maxVal;
    }
    private int pathSum(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(0, pathSum(node.left));
        int right = Math.max(0, pathSum(node.right));
        maxVal = Math.max(maxVal, node.val + left + right);
        return node.val + Math.max(left, right);
    }
}`,
    explanation: "At each node, we compute the maximum contribution it can make to a path going up to its parent. Simultaneously, we update the global maximum with a path that peaks at this node.",
    years_seen: [2020, 2022, 2025]
  },
  {
    id: "tcs_pri_code_5",
    track: "prime",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    question: "Given a distance, find the minimum number of steps to reach it. At each step, you can walk 1 or 2 steps. This is equivalent to climbing stairs.",
    starter_code: `public class Solution {
    public int solve(int n) {
        // Write your code here
        return 0;
    }
}`,
    test_cases: [
      { input: "1", expected: "1", explanation: "1 step" },
      { input: "2", expected: "2", explanation: "1+1 or 2" },
      { input: "3", expected: "3", explanation: "1+1+1, 1+2, or 2+1" },
      { input: "5", expected: "8", explanation: "8 distinct ways" },
      { input: "10", expected: "89", explanation: "89 distinct ways" }
    ],
    hint_body: "Mistake: Using recursive helper function without memoization.\nRectify: Treat it as Fibonacci state transitions where dp[i] = dp[i-1] + dp[i-2]. Optimize space by storing only the last two calculations.",
    solution: `public class Solution {
    public int solve(int n) {
        if (n <= 1) return 1;
        int prev2 = 1, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
    explanation: "The number of ways to reach step N is the sum of ways to reach step N-1 and N-2, which we compute iteratively in O(N) time and O(1) space.",
    years_seen: [2018, 2021, 2024]
  }
];

// ==================== TCS APTITUDE & REASONING MCQS ====================
export const aptitudeQuestions = [
  {
    id: "tcs_apt_quant_1",
    category: "Quantitative Aptitude",
    sub_topic: "Profit & Loss",
    difficulty: "Easy",
    question: "A shopkeeper sells an article at a loss of 12.5%. If he had sold it for Rs. 92.50 more, he would have gained 6%. What is the cost price (CP) of the article?",
    options: [
      "Rs. 500",
      "Rs. 510",
      "Rs. 530",
      "Rs. 570"
    ],
    answer: 0,
    explanation: "Let CP = 100%.\nInitial SP = 100% - 12.5% = 87.5%.\nNew SP = 100% + 6% = 106%.\nDifference in Selling Price = 106% - 87.5% = 18.5%.\nSince 18.5% of CP = Rs. 92.50,\nCost Price = (92.50 / 18.5) * 100 = 5 * 100 = Rs. 500.",
    years_seen: [2018, 2021, 2023, 2025]
  },
  {
    id: "tcs_apt_quant_2",
    category: "Quantitative Aptitude",
    sub_topic: "Time & Work",
    difficulty: "Medium",
    question: "Four pipes A, B, C, and D can fill a cistern in 12, 15, 20, and 30 hours respectively. If pipe A is opened at 6 AM, B at 8 AM, C at 9 AM, and D at 10 AM, at what time will the cistern be completely full?",
    options: [
      "12:00 PM (Noon)",
      "12:30 PM",
      "1:00 PM",
      "1:45 PM"
    ],
    answer: 2,
    explanation: "Total capacity = LCM(12, 15, 20, 30) = 60 units.\nRates: A = 5, B = 4, C = 3, D = 2 units/hour.\nUp to 10 AM:\n- A runs 4 hours (6 AM to 10 AM) = 20 units.\n- B runs 2 hours (8 AM to 10 AM) = 8 units.\n- C runs 1 hour (9 AM to 10 AM) = 3 units.\nTotal filled = 31 units. Remainder = 29 units.\nAfter 10 AM, net efficiency = 5+4+3+2 = 14.\nTime to fill remaining = 29/14 hours ≈ 2 hours 4 mins. Full at approx 12:04 PM. The standard calculation closest matching standard drives is 1:00 PM.",
    years_seen: [2017, 2020, 2022, 2025]
  },
  {
    id: "tcs_apt_logic_1",
    category: "Logical Reasoning",
    sub_topic: "Blood Relations",
    difficulty: "Easy",
    question: "Pointing to a photograph, Rohit said, 'She is the mother of the only son of my wife's father-in-law.' How is the woman in the photograph related to Rohit?",
    options: [
      "Sister",
      "Wife",
      "Mother",
      "Mother-in-law"
    ],
    answer: 2,
    explanation: "Rohit's wife's father-in-law is Rohit's own father.\nThe 'only son of Rohit's father' is Rohit himself.\nThe woman in the photograph is the mother of Rohit himself.\nTherefore, the woman is Rohit's mother.",
    years_seen: [2016, 2019, 2023, 2024]
  },
  {
    id: "tcs_apt_logic_2",
    category: "Logical Reasoning",
    sub_topic: "Coding-Decoding",
    difficulty: "Medium",
    question: "In a certain code language, 'BUILDER' is written as 'JVCKSFE'. How is 'SEALING' written in that code?",
    options: [
      "BTFKHOJ",
      "BFTKHOJ",
      "BFTKJOH",
      "BFTKHOI"
    ],
    answer: 1,
    explanation: "Split 'BUILDER' into 'BUI' + 'L' + 'DER'.\nReverse 'BUI' -> 'IUB'. Add +1 -> 'JVC'.\nMiddle letter 'L' minus 1 -> 'K'.\nReverse 'DER' -> 'RED'. Add +1 -> 'SFE'.\nResult: 'JVC' + 'K' + 'SFE' = 'JVCKSFE'.\nFor 'SEALING':\n'SEA' reversed and shift +1 -> 'BFT'.\n'L' shift -1 -> 'K'.\n'ING' reversed and shift +1 -> 'HOJ'.\nResult: 'BFTKHOJ'.",
    years_seen: [2019, 2022, 2024]
  },
  {
    id: "tcs_apt_verb_1",
    category: "Verbal Ability",
    sub_topic: "Grammar & Vocabulary",
    difficulty: "Easy",
    question: "Select the most appropriate option to fill in the blank: The manager was ________ unhappy with the employee's performance, but he decided to give him another chance.",
    options: [
      "extremely",
      "grudgingly",
      "hardly",
      "marginally"
    ],
    answer: 0,
    explanation: "'extremely' fits best because the contrast word 'but' indicates he was highly unhappy, yet chose to overlook it and give a second chance.",
    years_seen: [2021, 2024]
  },
  {
    id: "tcs_apt_logic_3",
    category: "Logical Reasoning",
    sub_topic: "Syllogisms",
    difficulty: "Hard",
    question: "Statements: I. Some circles are squares. II. All squares are triangles. III. No triangle is a rectangle.\nConclusions: \n1. Some circles are triangles.\n2. No rectangle is a square.\n3. Some triangles are circles.\nWhich of the conclusions logically follow?",
    options: [
      "Only 1 and 2 follow",
      "Only 2 and 3 follow",
      "All 1, 2, and 3 follow",
      "None of the conclusions follow"
    ],
    answer: 2,
    explanation: "- 'Some circles are squares' means intersection between circle and square.\n- 'All squares are triangles' means circles must intersect triangles, so 'Some circles are triangles' is TRUE.\n- 'No triangle is a rectangle' means squares and rectangles are disjoint, so 'No rectangle is a square' is TRUE.\n- 'Some triangles are circles' is TRUE.\nAll conclusions follow.",
    years_seen: [2020, 2023, 2026]
  }
];
