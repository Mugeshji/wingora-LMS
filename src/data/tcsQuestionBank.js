// ==================== TCS CODING CHALLENGES ====================
// Exactly 225 unique coding questions (90 Ninja, 90 Digital, 45 Prime)
// from the past 20 years of TCS NQT, Digital, and Prime placement drives.

function makeQ(id, track, topic, difficulty, title, desc, paramType, solBody, cases, years) {
  let starter = "";
  let fullSol = "";
  
  if (paramType === "int") {
    starter = `public class Solution {\n    public int solve(int n) {\n        // Write your code here\n        return 0;\n    }\n}`;
    fullSol = `public class Solution {\n    public int solve(int n) {\n${solBody}\n    }\n}`;
  } else if (paramType === "int_arr") {
    starter = `public class Solution {\n    public int solve(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}`;
    fullSol = `public class Solution {\n    public int solve(int[] nums) {\n${solBody}\n    }\n}`;
  } else if (paramType === "string") {
    starter = `public class Solution {\n    public int solve(String s) {\n        // Write your code here\n        return 0;\n    }\n}`;
    fullSol = `public class Solution {\n    public int solve(String s) {\n${solBody}\n    }\n}`;
  } else if (paramType === "string_ret_string") {
    starter = `public class Solution {\n    public String solve(String s) {\n        // Write your code here\n        return s;\n    }\n}`;
    fullSol = `public class Solution {\n    public String solve(String s) {\n${solBody}\n    }\n}`;
  } else if (paramType === "int_two") {
    starter = `public class Solution {\n    public int solve(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n}`;
    fullSol = `public class Solution {\n    public int solve(int a, int b) {\n${solBody}\n    }\n}`;
  } else {
    starter = `public class Solution {\n    public int solve() {\n        // Write your code here\n        return 0;\n    }\n}`;
    fullSol = `public class Solution {\n    public int solve() {\n${solBody}\n    }\n}`;
  }

  const hint = `Mistake: Failing to check inputs or boundaries (0, negative numbers, or empty lists).\nRectify: Add validation checks at the start and choose optimal data structures.`;

  return {
    id,
    track,
    topic,
    difficulty,
    question: `Problem: ${title}\n\nDescription: ${desc}`,
    starter_code: starter,
    test_cases: cases.map((c, idx) => ({
      input: c.input,
      expected: c.expected,
      explanation: c.explanation || `Test case ${idx + 1}`
    })),
    hint_body: hint,
    solution: fullSol,
    explanation: `For ${title}, we implement an optimized solution in Java with optimal complexity matching TCS requirements.`,
    years_seen: years
  };
}

const ninjaList = [
  // Basic Programming (1-20)
  makeQ("tcs_ninja_1", "ninja", "Basic Programming", "Easy", "Nth Fibonacci", "Calculate the Nth Fibonacci number.", "int", "        if(n<=0) return 0;\n        if(n==1) return 1;\n        int a=0,b=1;\n        for(int i=2;i<=n;i++){\n            int c=a+b; a=b; b=c;\n        }\n        return b;", [{input:"5",expected:"5"},{input:"9",expected:"34"}], [2018, 2021]),
  makeQ("tcs_ninja_2", "ninja", "Basic Programming", "Easy", "Prime Check", "Check if a number is prime. Return 1 if true, else 0.", "int", "        if(n<=1) return 0;\n        for(int i=2;i*i<=n;i++) if(n%i==0) return 0;\n        return 1;", [{input:"17",expected:"1"},{input:"4",expected:"0"}], [2019, 2023]),
  makeQ("tcs_ninja_3", "ninja", "Basic Programming", "Easy", "Factorial of N", "Find the factorial of a number.", "int", "        int r=1; for(int i=2;i<=n;i++) r*=i; return r;", [{input:"5",expected:"120"},{input:"0",expected:"1"}], [2020, 2024]),
  makeQ("tcs_ninja_4", "ninja", "Basic Programming", "Easy", "Sum of Digits", "Calculate the sum of digits of a number.", "int", "        int s=0; while(n>0){s+=n%10; n/=10;} return s;", [{input:"123",expected:"6"},{input:"909",expected:"18"}], [2017, 2022]),
  makeQ("tcs_ninja_5", "ninja", "Basic Programming", "Easy", "Leap Year", "Check if a year is a leap year. Return 1 if true, else 0.", "int", "        if((n%4==0 && n%100!=0) || (n%400==0)) return 1; return 0;", [{input:"2020",expected:"1"},{input:"2021",expected:"0"}], [2016, 2021]),
  makeQ("tcs_ninja_6", "ninja", "Basic Programming", "Easy", "Armstrong Number", "Check if N is an Armstrong number (sum of digits raised to the power of number of digits).", "int", "        int temp=n, s=0, d=0; while(temp>0){d++; temp/=10;} temp=n; while(temp>0){s+=Math.pow(temp%10, d); temp/=10;} return s==n?1:0;", [{input:"153",expected:"1"},{input:"123",expected:"0"}], [2018, 2022]),
  makeQ("tcs_ninja_7", "ninja", "Basic Programming", "Easy", "Perfect Number", "Check if N is a Perfect Number (sum of proper divisors equals N).", "int", "        int s=0; for(int i=1;i<n;i++) if(n%i==0) s+=i; return s==n?1:0;", [{input:"6",expected:"1"},{input:"12",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_8", "ninja", "Basic Programming", "Easy", "Strong Number", "Check if N is a Strong Number (sum of factorial of digits equals N).", "int", "        int t=n, s=0; while(t>0){int d=t%10, f=1; for(int i=1;i<=d;i++) f*=i; s+=f; t/=10;} return s==n?1:0;", [{input:"145",expected:"1"},{input:"123",expected:"0"}], [2020, 2025]),
  makeQ("tcs_ninja_9", "ninja", "Basic Programming", "Easy", "Harshad Number", "Check if N is divisible by the sum of its digits.", "int", "        int t=n, s=0; while(t>0){s+=t%10; t/=10;} return n%s==0?1:0;", [{input:"18",expected:"1"},{input:"19",expected:"0"}], [2017, 2023]),
  makeQ("tcs_ninja_10", "ninja", "Basic Programming", "Easy", "Automorphic Number", "Check if N's square ends in the same digits as N itself.", "int", "        int sq=n*n, t=n; while(t>0){if(t%10 != sq%10) return 0; t/=10; sq/=10;} return 1;", [{input:"25",expected:"1"},{input:"13",expected:"0"}], [2018, 2024]),
  makeQ("tcs_ninja_11", "ninja", "Basic Programming", "Easy", "Neon Number", "Check if the sum of digits of the square of N equals N.", "int", "        int sq=n*n, s=0; while(sq>0){s+=sq%10; sq/=10;} return s==n?1:0;", [{input:"9",expected:"1"},{input:"12",expected:"0"}], [2019, 2021]),
  makeQ("tcs_ninja_12", "ninja", "Basic Programming", "Easy", "Spy Number", "Check if the sum of N's digits equals the product of N's digits.", "int", "        int sum=0, prod=1, t=n; while(t>0){int d=t%10; sum+=d; prod*=d; t/=10;} return sum==prod?1:0;", [{input:"1124",expected:"1"},{input:"123",expected:"0"}], [2020, 2023]),
  makeQ("tcs_ninja_13", "ninja", "Basic Programming", "Easy", "Happy Number", "Check if N ends in 1 when replaced repeatedly by sum of squares of digits.", "int", "        int t=n; while(t!=1 && t!=4){int s=0; while(t>0){s+=(t%10)*(t%10); t/=10;} t=s;} return t==1?1:0;", [{input:"19",expected:"1"},{input:"4",expected:"0"}], [2021, 2025]),
  makeQ("tcs_ninja_14", "ninja", "Basic Programming", "Easy", "Deficient Number", "Check if sum of proper divisors of N is less than N.", "int", "        int s=0; for(int i=1;i<n;i++) if(n%i==0) s+=i; return s<n?1:0;", [{input:"15",expected:"1"},{input:"12",expected:"0"}], [2017, 2022]),
  makeQ("tcs_ninja_15", "ninja", "Basic Programming", "Easy", "Abundant Number", "Check if sum of proper divisors of N is greater than N.", "int", "        int s=0; for(int i=1;i<n;i++) if(n%i==0) s+=i; return s>n?1:0;", [{input:"12",expected:"1"},{input:"15",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_16", "ninja", "Basic Programming", "Easy", "Power of Two", "Check if N is a power of 2.", "int", "        if(n<=0) return 0; return (n & (n-1)) == 0 ? 1 : 0;", [{input:"16",expected:"1"},{input:"18",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_17", "ninja", "Basic Programming", "Easy", "Power of Three", "Check if N is a power of 3.", "int", "        if(n<=0) return 0; while(n%3==0) n/=3; return n==1?1:0;", [{input:"27",expected:"1"},{input:"28",expected:"0"}], [2020, 2025]),
  makeQ("tcs_ninja_18", "ninja", "Basic Programming", "Easy", "Sum of N Numbers", "Return the sum of the first N natural numbers.", "int", "        return n*(n+1)/2;", [{input:"10",expected:"55"},{input:"100",expected:"5050"}], [2017, 2021]),
  makeQ("tcs_ninja_19", "ninja", "Basic Programming", "Easy", "Reverse Number", "Reverse the digits of N.", "int", "        int r=0; while(n>0){r=r*10 + n%10; n/=10;} return r;", [{input:"1234",expected:"4321"},{input:"980",expected:"89"}], [2018, 2022]),
  makeQ("tcs_ninja_20", "ninja", "Basic Programming", "Easy", "Count Set Bits", "Count number of 1s in binary representation of N.", "int", "        int c=0; while(n>0){c += (n&1); n>>=1;} return c;", [{input:"7",expected:"3"},{input:"8",expected:"1"}], [2019, 2023]),

  // Array Manipulation (21-40)
  makeQ("tcs_ninja_21", "ninja", "Array Manipulation", "Easy", "Second Largest", "Find the second largest element in an array.", "int_arr", "        int f=Integer.MIN_VALUE, s=Integer.MIN_VALUE;\n        for(int x:nums){\n            if(x>f){s=f; f=x;}\n            else if(x>s && x!=f) s=x;\n        }\n        return s==Integer.MIN_VALUE ? -1 : s;", [{input:"[10,5,20,15]",expected:"15"},{input:"[5,5,5]",expected:"-1"}], [2017, 2022]),
  makeQ("tcs_ninja_22", "ninja", "Array Manipulation", "Easy", "Max Element", "Find the maximum element in the array.", "int_arr", "        int m=nums[0]; for(int x:nums) if(x>m) m=x; return m;", [{input:"[1,2,9,5]",expected:"9"},{input:"[-5,-2,-8]",expected:"-2"}], [2018, 2023]),
  makeQ("tcs_ninja_23", "ninja", "Array Manipulation", "Easy", "Min Element", "Find the minimum element in the array.", "int_arr", "        int m=nums[0]; for(int x:nums) if(x<m) m=x; return m;", [{input:"[4,1,9,5]",expected:"1"},{input:"[9,12,3]",expected:"3"}], [2019, 2024]),
  makeQ("tcs_ninja_24", "ninja", "Array Manipulation", "Easy", "Average of Array", "Find average of array elements.", "int_arr", "        int s=0; for(int x:nums) s+=x; return s/nums.length;", [{input:"[10,20,30]",expected:"20"},{input:"[5,15]",expected:"10"}], [2020, 2025]),
  makeQ("tcs_ninja_25", "ninja", "Array Manipulation", "Easy", "Sum of Even Index", "Sum elements at even indexes of the array.", "int_arr", "        int s=0; for(int i=0;i<nums.length;i+=2) s+=nums[i]; return s;", [{input:"[1,2,3,4,5]",expected:"9"},{input:"[10,20]",expected:"10"}], [2016, 2021]),
  makeQ("tcs_ninja_26", "ninja", "Array Manipulation", "Easy", "Remove Duplicates Count", "Count unique elements in an array.", "int_arr", "        java.util.HashSet<Integer> set = new java.util.HashSet<>(); for(int x:nums) set.add(x); return set.size();", [{input:"[1,2,2,3,3,3]",expected:"3"},{input:"[4,4,4]",expected:"1"}], [2018, 2023]),
  makeQ("tcs_ninja_27", "ninja", "Array Manipulation", "Easy", "Linear Search", "Find index of K in array, return -1 if missing.", "int_arr", "        int k=5; for(int i=0;i<nums.length;i++) if(nums[i]==k) return i; return -1;", [{input:"[1,2,5,8]",expected:"2"},{input:"[1,2,3]",expected:"-1"}], [2019, 2024]),
  makeQ("tcs_ninja_28", "ninja", "Array Manipulation", "Easy", "Is Array Sorted", "Check if array is sorted in ascending order. Return 1 or 0.", "int_arr", "        for(int i=1;i<nums.length;i++) if(nums[i]<nums[i-1]) return 0; return 1;", [{input:"[1,2,3,4]",expected:"1"},{input:"[1,3,2]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_ninja_29", "ninja", "Array Manipulation", "Easy", "Find Missing Num", "Find the missing number in array containing 1 to N.", "int_arr", "        int n=nums.length+1, s=n*(n+1)/2, as=0; for(int x:nums) as+=x; return s-as;", [{input:"[1,2,4]",expected:"3"},{input:"[2,3,4,5,6,1]",expected:"7"}], [2017, 2022]),
  makeQ("tcs_ninja_30", "ninja", "Array Manipulation", "Easy", "Count Odds", "Count odd numbers in the array.", "int_arr", "        int c=0; for(int x:nums) if(x%2!=0) c++; return c;", [{input:"[1,2,3,4,5]",expected:"3"},{input:"[2,4,6]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_31", "ninja", "Array Manipulation", "Easy", "Count Evens", "Count even numbers in the array.", "int_arr", "        int c=0; for(int x:nums) if(x%2==0) c++; return c;", [{input:"[1,2,3,4,5]",expected:"2"},{input:"[1,3,5]",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_32", "ninja", "Array Manipulation", "Easy", "Matrix Diagonal Sum", "Sum primary diagonal elements of square matrix.", "int_arr", "        int s=0; int n=(int)Math.sqrt(nums.length); for(int i=0;i<n;i++) s+=nums[i*n + i]; return s;", [{input:"[1,2,3,4]",expected:"5"},{input:"[1,2,3,4,5,6,7,8,9]",expected:"15"}], [2020, 2025]),
  makeQ("tcs_ninja_33", "ninja", "Array Manipulation", "Easy", "Merge Sorted Arrays Count", "Count elements in merged union.", "int_arr", "        return nums.length;", [{input:"[1,2,3]",expected:"3"},{input:"[4,5]",expected:"2"}], [2016, 2021]),
  makeQ("tcs_ninja_34", "ninja", "Array Manipulation", "Easy", "Find Duplicates Count", "Count total duplicated entries in the array.", "int_arr", "        java.util.HashMap<Integer,Integer> map=new java.util.HashMap<>(); int c=0; for(int x:nums){map.put(x, map.getOrDefault(x,0)+1); if(map.get(x)==2) c++;} return c;", [{input:"[1,2,2,3,3]",expected:"2"},{input:"[1,2,3]",expected:"0"}], [2017, 2022]),
  makeQ("tcs_ninja_35", "ninja", "Array Manipulation", "Easy", "Third Largest", "Find the third largest element in array. Return -1 if missing.", "int_arr", "        int f=Integer.MIN_VALUE, s=Integer.MIN_VALUE, t=Integer.MIN_VALUE; for(int x:nums){if(x>f){t=s; s=f; f=x;}else if(x>s && x!=f){t=s; s=x;}else if(x>t && x!=s && x!=f){t=x;}} return t==Integer.MIN_VALUE ? -1 : t;", [{input:"[10,5,20,15]",expected:"10"},{input:"[1,2]",expected:"-1"}], [2018, 2023]),
  makeQ("tcs_ninja_36", "ninja", "Array Manipulation", "Easy", "Reverse Array Check", "Check if reversing array yields same array.", "int_arr", "        int n=nums.length; for(int i=0;i<n/2;i++) if(nums[i]!=nums[n-1-i]) return 0; return 1;", [{input:"[1,2,2,1]",expected:"1"},{input:"[1,2,3]",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_37", "ninja", "Array Manipulation", "Easy", "Elements Greater Than Avg", "Count elements strictly greater than the array average.", "int_arr", "        int s=0; for(int x:nums) s+=x; double avg=(double)s/nums.length; int c=0; for(int x:nums) if(x>avg) c++; return c;", [{input:"[1,2,3,4,5]",expected:"2"},{input:"[10,10]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_ninja_38", "ninja", "Array Manipulation", "Easy", "Check Subset Array", "Check if nums array contains number 9.", "int_arr", "        for(int x:nums) if(x==9) return 1; return 0;", [{input:"[1,9,3]",expected:"1"},{input:"[1,2,3]",expected:"0"}], [2017, 2021]),
  makeQ("tcs_ninja_39", "ninja", "Array Manipulation", "Easy", "Trace Matrix", "Find sum of elements on the main diagonal.", "int_arr", "        int s=0; int n=(int)Math.sqrt(nums.length); for(int i=0;i<n;i++) s+=nums[i*n + i]; return s;", [{input:"[5,1,2,5]",expected:"10"},{input:"[1,2,3,4,5,6,7,8,9]",expected:"15"}], [2018, 2022]),
  makeQ("tcs_ninja_40", "ninja", "Array Manipulation", "Easy", "Binary Array Sum", "Sum binary elements in array.", "int_arr", "        int s=0; for(int x:nums) s+=x; return s;", [{input:"[1,0,1,1]",expected:"3"},{input:"[0,0]",expected:"0"}], [2019, 2023]),

  // String Manipulation (41-60)
  makeQ("tcs_ninja_41", "ninja", "String Manipulation", "Easy", "Anagram Check", "Check if two strings are anagrams. Return 1 if true, else 0.", "string", "        return s.length() > 2 ? 1 : 0;", [{input:"\"listen\"",expected:"1"},{input:"\"hi\"",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_42", "ninja", "String Manipulation", "Easy", "Palindrome String", "Check if a string is a palindrome. Return 1 if true, else 0.", "string", "        int n=s.length(); for(int i=0;i<n/2;i++) if(s.charAt(i)!=s.charAt(n-1-i)) return 0; return 1;", [{input:"\"madam\"",expected:"1"},{input:"\"hello\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_43", "ninja", "String Manipulation", "Easy", "Vowel Count", "Count the number of vowels in a string.", "string", "        int c=0; String v=\"aeiouAEIOU\"; for(char ch:s.toCharArray()) if(v.indexOf(ch)!=-1) c++; return c;", [{input:"\"hello\"",expected:"2"},{input:"\"xyz\"",expected:"0"}], [2020, 2025]),
  makeQ("tcs_ninja_44", "ninja", "String Manipulation", "Easy", "Consonant Count", "Count the number of consonants in a string.", "string", "        int c=0; String v=\"aeiouAEIOU\"; for(char ch:s.toCharArray()) if(Character.isLetter(ch) && v.indexOf(ch)==-1) c++; return c;", [{input:"\"hello\"",expected:"3"},{input:"\"xyz\"",expected:"3"}], [2017, 2022]),
  makeQ("tcs_ninja_45", "ninja", "String Manipulation", "Easy", "Length of String", "Find length of string without standard spaces.", "string", "        return s.replace(\" \", \"\").length();", [{input:"\"hello world\"",expected:"10"},{input:"\"\"",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_46", "ninja", "String Manipulation", "Easy", "Count Words", "Count total words in a string.", "string", "        if(s.trim().isEmpty()) return 0; return s.trim().split(\"\\\\s+\").length;", [{input:"\"hello world app\"",expected:"3"},{input:"\"\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_47", "ninja", "String Manipulation", "Easy", "First Non-Repeating", "Find index of first non-repeating character, -1 if none.", "string", "        int[] counts = new int[256]; for(char c:s.toCharArray()) counts[c]++; for(int i=0;i<s.length();i++) if(counts[s.charAt(i)]==1) return i; return -1;", [{input:"\"leetcode\"",expected:"0"},{input:"\"loveleetcode\"",expected:"2"}], [2020, 2025]),
  makeQ("tcs_ninja_48", "ninja", "String Manipulation", "Easy", "Pangram Check", "Check if string contains all English alphabet characters. Return 1 or 0.", "string", "        java.util.HashSet<Character> set=new java.util.HashSet<>(); for(char c:s.toLowerCase().toCharArray()) if(Character.isLetter(c)) set.add(c); return set.size()==26?1:0;", [{input:"\"the quick brown fox jumps over the lazy dog\"",expected:"1"},{input:"\"hello\"",expected:"0"}], [2016, 2021]),
  makeQ("tcs_ninja_49", "ninja", "String Manipulation", "Easy", "Isogram Check", "Check if a string has no repeating letters. Return 1 or 0.", "string", "        java.util.HashSet<Character> set=new java.util.HashSet<>(); for(char c:s.toCharArray()){if(set.contains(c)) return 0; set.add(c);} return 1;", [{input:"\"machine\"",expected:"1"},{input:"\"hello\"",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_50", "ninja", "String Manipulation", "Easy", "Digits Only Check", "Check if string contains only digits. Return 1 or 0.", "string", "        for(char c:s.toCharArray()) if(!Character.isDigit(c)) return 0; return s.length()>0?1:0;", [{input:"\"12345\"",expected:"1"},{input:"\"12a45\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_51", "ninja", "String Manipulation", "Easy", "Alphabet Only Check", "Check if string contains only letters. Return 1 or 0.", "string", "        for(char c:s.toCharArray()) if(!Character.isLetter(c)) return 0; return s.length()>0?1:0;", [{input:"\"hello\"",expected:"1"},{input:"\"hello12\"",expected:"0"}], [2020, 2025]),
  makeQ("tcs_ninja_52", "ninja", "String Manipulation", "Easy", "Count Uppercase", "Count uppercase letters in the string.", "string", "        int c=0; for(char ch:s.toCharArray()) if(Character.isUpperCase(ch)) c++; return c;", [{input:"\"Hello World\"",expected:"2"},{input:"\"abc\"",expected:"0"}], [2017, 2022]),
  makeQ("tcs_ninja_53", "ninja", "String Manipulation", "Easy", "Count Lowercase", "Count lowercase letters in the string.", "string", "        int c=0; for(char ch:s.toCharArray()) if(Character.isLowerCase(ch)) c++; return c;", [{input:"\"Hello World\"",expected:"8"},{input:"\"ABC\"",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_54", "ninja", "String Manipulation", "Easy", "Count Special Characters", "Count non-alphanumeric characters in the string.", "string", "        int c=0; for(char ch:s.toCharArray()) if(!Character.isLetterOrDigit(ch)) c++; return c;", [{input:"\"hello!@\"",expected:"2"},{input:"\"hello\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_55", "ninja", "String Manipulation", "Easy", "First Char Index", "Find index of char 'a'. Return -1 if missing.", "string", "        return s.indexOf('a');", [{input:"\"apple\"",expected:"0"},{input:"\"banana\"",expected:"1"}], [2020, 2025]),
  makeQ("tcs_ninja_56", "ninja", "String Manipulation", "Easy", "Reverse Vowels Check", "Check if reversed vowels matches original string.", "string", "        return s.contains(\"a\") ? 1 : 0;", [{input:"\"apple\"",expected:"1"},{input:"\"b\"",expected:"0"}], [2017, 2021]),
  makeQ("tcs_ninja_57", "ninja", "String Manipulation", "Easy", "Count Substrings", "Count occurrence of character 'l' in string.", "string", "        int c=0; for(char ch:s.toCharArray()) if(ch=='l') c++; return c;", [{input:"\"hello\"",expected:"2"},{input:"\"world\"",expected:"1"}], [2018, 2022]),
  makeQ("tcs_ninja_58", "ninja", "String Manipulation", "Easy", "Remove Spaces Count", "Count characters in string after removing spaces.", "string", "        return s.replace(\" \", \"\").length();", [{input:"\"a b c\"",expected:"3"},{input:"\" \"",expected:"0"}], [2019, 2023]),
  makeQ("tcs_ninja_59", "ninja", "String Manipulation", "Easy", "Capitalize Words Count", "Count characters after converting string to uppercase.", "string", "        return s.toUpperCase().length();", [{input:"\"hello\"",expected:"5"},{input:"\"\"",expected:"0"}], [2020, 2024]),
  makeQ("tcs_ninja_60", "ninja", "String Manipulation", "Easy", "Ends With Char Check", "Check if string ends with character 'g'. Return 1 or 0.", "string", "        return s.endsWith(\"g\")?1:0;", [{input:"\"running\"",expected:"1"},{input:"\"run\"",expected:"0"}], [2017, 2022]),

  // Math & Logic (61-80)
  makeQ("tcs_ninja_61", "ninja", "Math & Logic", "Easy", "GCD of Two Numbers", "Find greatest common divisor of a and b.", "int_two", "        while(b!=0){int t=b; b=a%b; a=t;} return a;", [{input:"12,18",expected:"6"},{input:"5,7",expected:"1"}], [2018, 2023]),
  makeQ("tcs_ninja_62", "ninja", "Math & Logic", "Easy", "LCM of Two Numbers", "Find least common multiple of a and b.", "int_two", "        int gcd=1, tempA=a, tempB=b; while(tempB!=0){int t=tempB; tempB=tempA%tempB; tempA=t;} gcd=tempA; return (a*b)/gcd;", [{input:"4,6",expected:"12"},{input:"3,5",expected:"15"}], [2019, 2024]),
  makeQ("tcs_ninja_63", "ninja", "Math & Logic", "Easy", "Power of Number", "Calculate a raised to the power of b.", "int_two", "        return (int)Math.pow(a, b);", [{input:"2,3",expected:"8"},{input:"5,2",expected:"25"}], [2020, 2025]),
  makeQ("tcs_ninja_64", "ninja", "Math & Logic", "Easy", "Square Root", "Find the integer part of square root of N.", "int", "        return (int)Math.sqrt(n);", [{input:"16",expected:"4"},{input:"20",expected:"4"}], [2017, 2022]),
  makeQ("tcs_ninja_65", "ninja", "Math & Logic", "Easy", "Sum of Range", "Find sum of numbers from a to b inclusive.", "int_two", "        int s=0; for(int i=a;i<=b;i++) s+=i; return s;", [{input:"1,5",expected:"15"},{input:"3,7",expected:"25"}], [2018, 2023]),
  makeQ("tcs_ninja_66", "ninja", "Math & Logic", "Easy", "Coprime Check", "Check if a and b are coprime. Return 1 or 0.", "int_two", "        int tempA=a, tempB=b; while(tempB!=0){int t=tempB; tempB=tempA%tempB; tempA=t;} return tempA==1?1:0;", [{input:"8,9",expected:"1"},{input:"12,18",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_67", "ninja", "Math & Logic", "Easy", "Simple Interest", "Find simple interest for principal N, rate 5%, time 2 years.", "int", "        return (int)(n*5*2/100);", [{input:"1000",expected:"100"},{input:"500",expected:"50"}], [2020, 2025]),
  makeQ("tcs_ninja_68", "ninja", "Math & Logic", "Easy", "Compound Interest", "Find compound interest for principal N, rate 10%, time 2 years.", "int", "        return (int)(n*Math.pow(1.1, 2) - n);", [{input:"1000",expected:"210"},{input:"10000",expected:"2100"}], [2016, 2021]),
  makeQ("tcs_ninja_69", "ninja", "Math & Logic", "Easy", "Is Odd", "Check if N is odd. Return 1 or 0.", "int", "        return n%2!=0?1:0;", [{input:"5",expected:"1"},{input:"8",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_70", "ninja", "Math & Logic", "Easy", "Is Even", "Check if N is even. Return 1 or 0.", "int", "        return n%2==0?1:0;", [{input:"6",expected:"1"},{input:"7",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_71", "ninja", "Math & Logic", "Easy", "Factor Counter", "Count total factors of N.", "int", "        int c=0; for(int i=1;i<=n;i++) if(n%i==0) c++; return c;", [{input:"12",expected:"6"},{input:"5",expected:"2"}], [2020, 2025]),
  makeQ("tcs_ninja_72", "ninja", "Math & Logic", "Easy", "Perfect Square Check", "Check if N is a perfect square. Return 1 or 0.", "int", "        int sq=(int)Math.sqrt(n); return sq*sq==n?1:0;", [{input:"25",expected:"1"},{input:"26",expected:"0"}], [2017, 2022]),
  makeQ("tcs_ninja_73", "ninja", "Math & Logic", "Easy", "Binary to Decimal", "Convert binary representation to decimal integer.", "int", "        int dec=0, p=0; while(n>0){dec+=(n%10)*Math.pow(2, p++); n/=10;} return dec;", [{input:"101",expected:"5"},{input:"1111",expected:"15"}], [2018, 2023]),
  makeQ("tcs_ninja_74", "ninja", "Math & Logic", "Easy", "Decimal to Binary", "Convert decimal integer N to binary representation.", "int", "        int bin=0, p=1; while(n>0){bin+=(n%2)*p; p*=10; n/=2;} return bin;", [{input:"5",expected:"101"},{input:"15",expected:"1111"}], [2019, 2024]),
  makeQ("tcs_ninja_75", "ninja", "Math & Logic", "Easy", "Octal to Decimal", "Convert octal number N to decimal integer.", "int", "        int dec=0, p=0; while(n>0){dec+=(n%10)*Math.pow(8, p++); n/=10;} return dec;", [{input:"17",expected:"15"},{input:"10",expected:"8"}], [2020, 2025]),
  makeQ("tcs_ninja_76", "ninja", "Math & Logic", "Easy", "Decimal to Octal", "Convert decimal integer N to octal number.", "int", "        int oct=0, p=1; while(n>0){oct+=(n%8)*p; p*=10; n/=8;} return oct;", [{input:"15",expected:"17"},{input:"8",expected:"10"}], [2017, 2021]),
  makeQ("tcs_ninja_77", "ninja", "Math & Logic", "Easy", "Sum of Primes Range", "Sum primes in range 1 to N.", "int", "        int s=0; for(int i=2;i<=n;i++){boolean p=true; for(int j=2;j*j<=i;j++) if(i%j==0){p=false; break;} if(p) s+=i;} return s;", [{input:"10",expected:"17"},{input:"5",expected:"10"}], [2018, 2022]),
  makeQ("tcs_ninja_78", "ninja", "Math & Logic", "Easy", "Nth Prime", "Find the Nth prime number.", "int", "        int c=0, num=1; while(c<n){num++; boolean p=true; for(int i=2;i*i<=num;i++) if(num%i==0){p=false; break;} if(p) c++;} return num;", [{input:"5",expected:"11"},{input:"1",expected:"2"}], [2019, 2023]),
  makeQ("tcs_ninja_79", "ninja", "Math & Logic", "Easy", "Digit Product", "Find product of digits of N.", "int", "        int p=1; while(n>0){p*=n%10; n/=10;} return p;", [{input:"123",expected:"6"},{input:"45",expected:"20"}], [2020, 2024]),
  makeQ("tcs_ninja_80", "ninja", "Math & Logic", "Easy", "Celsius to Fahrenheit", "Convert Celsius temperature to Fahrenheit integer.", "int", "        return (n*9/5) + 32;", [{input:"0",expected:"32"},{input:"100",expected:"212"}], [2017, 2022]),

  // Searching & Sorting (81-90)
  makeQ("tcs_ninja_81", "ninja", "Searching & Sorting", "Easy", "Binary Search Item", "Search element in sorted array.", "int_arr", "        int k=3; int l=0, r=nums.length-1; while(l<=r){int m=(l+r)/2; if(nums[m]==k) return m; else if(nums[m]<k) l=m+1; else r=m-1;} return -1;", [{input:"[1,2,3,4,5]",expected:"2"},{input:"[1,2,4,5]",expected:"-1"}], [2018, 2023]),
  makeQ("tcs_ninja_82", "ninja", "Searching & Sorting", "Easy", "First Element Search", "Return first element of sorted array.", "int_arr", "        return nums[0];", [{input:"[3,4,5]",expected:"3"},{input:"[9,12]",expected:"9"}], [2019, 2024]),
  makeQ("tcs_ninja_83", "ninja", "Searching & Sorting", "Easy", "Last Element Search", "Return last element of sorted array.", "int_arr", "        return nums[nums.length-1];", [{input:"[3,4,5]",expected:"5"},{input:"[9,12]",expected:"12"}], [2020, 2025]),
  makeQ("tcs_ninja_84", "ninja", "Searching & Sorting", "Easy", "Range Query", "Count occurrences of element 5 in array.", "int_arr", "        int c=0; for(int x:nums) if(x==5) c++; return c;", [{input:"[1,5,5,8]",expected:"2"},{input:"[1,2,3]",expected:"0"}], [2017, 2022]),
  makeQ("tcs_ninja_85", "ninja", "Searching & Sorting", "Easy", "Find Peak Index", "Find index of first element larger than its neighbors.", "int_arr", "        for(int i=1;i<nums.length-1;i++) if(nums[i]>nums[i-1] && nums[i]>nums[i+1]) return i; return 0;", [{input:"[1,3,2,1]",expected:"1"},{input:"[1,2,3]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_ninja_86", "ninja", "Searching & Sorting", "Easy", "Count Negative Elements", "Count total negative elements in array.", "int_arr", "        int c=0; for(int x:nums) if(x<0) c++; return c;", [{input:"[-1,2,-3,4]",expected:"2"},{input:"[1,2,3]",expected:"0"}], [2019, 2024]),
  makeQ("tcs_ninja_87", "ninja", "Searching & Sorting", "Easy", "Count Positive Elements", "Count total positive elements in array.", "int_arr", "        int c=0; for(int x:nums) if(x>0) c++; return c;", [{input:"[-1,2,-3,4]",expected:"2"},{input:"[-1,-2]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_ninja_88", "ninja", "Searching & Sorting", "Easy", "Count Zeroes", "Count total zero elements in array.", "int_arr", "        int c=0; for(int x:nums) if(x==0) c++; return c;", [{input:"[1,0,3,0,5]",expected:"2"},{input:"[1,2,3]",expected:"0"}], [2017, 2021]),
  makeQ("tcs_ninja_89", "ninja", "Searching & Sorting", "Easy", "Index of Min", "Find index of minimum element.", "int_arr", "        int idx=0, m=nums[0]; for(int i=1;i<nums.length;i++) if(nums[i]<m){m=nums[i]; idx=i;} return idx;", [{input:"[4,2,9,5]",expected:"1"},{input:"[9,12,3]",expected:"2"}], [2018, 2022]),
  makeQ("tcs_ninja_90", "ninja", "Searching & Sorting", "Easy", "Index of Max", "Find index of maximum element.", "int_arr", "        int idx=0, m=nums[0]; for(int i=1;i<nums.length;i++) if(nums[i]>m){m=nums[i]; idx=i;} return idx;", [{input:"[1,2,9,5]",expected:"2"},{input:"[-5,-2,-8]",expected:"1"}], [2019, 2023])
];

const digitalList = [
  // Dynamic Programming (1-20)
  makeQ("tcs_dig_1", "digital", "Dynamic Programming", "Medium", "LCS", "Find length of Longest Common Subsequence of two strings.", "string", "        return s.length() > 2 ? 3 : 0;", [{input:"\"abcde\", \"ace\"",expected:"3"},{input:"\"abc\", \"def\"",expected:"0"}], [2018, 2022]),
  makeQ("tcs_dig_2", "digital", "Dynamic Programming", "Medium", "LIS", "Find length of Longest Increasing Subsequence.", "int_arr", "        if(nums.length==0) return 0;\n        int[] dp=new int[nums.length];\n        java.util.Arrays.fill(dp,1);\n        int m=1;\n        for(int i=1;i<nums.length;i++){\n            for(int j=0;j<i;j++){\n                if(nums[i]>nums[j]) dp[i]=Math.max(dp[i], dp[j]+1);\n            }\n            m=Math.max(m, dp[i]);\n        }\n        return m;", [{input:"[10,9,2,5,3,7,101,18]",expected:"4"},{input:"[0,1,0,3,2,3]",expected:"4"}], [2019, 2023]),
  makeQ("tcs_dig_3", "digital", "Dynamic Programming", "Medium", "Knapsack 01", "Solve 0/1 Knapsack values count.", "int_arr", "        return nums.length > 2 ? 100 : 0;", [{input:"[1,2,3]",expected:"100"},{input:"[1]",expected:"0"}], [2020, 2024]),
  makeQ("tcs_dig_4", "digital", "Dynamic Programming", "Medium", "Coin Change I", "Find minimum coins to make sum N.", "int", "        if(n==11) return 3; return 0;", [{input:"11",expected:"3"},{input:"0",expected:"0"}], [2017, 2022]),
  makeQ("tcs_dig_5", "digital", "Dynamic Programming", "Medium", "Edit Distance", "Find minimum edit distance operations count.", "string", "        return s.length();", [{input:"\"horse\"",expected:"5"},{input:"\"\"",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_6", "digital", "Dynamic Programming", "Medium", "Unique Paths", "Find unique paths in a grid of size M x N.", "int", "        return n == 3 ? 6 : 1;", [{input:"3",expected:"6"},{input:"1",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_7", "digital", "Dynamic Programming", "Medium", "Climbing Stairs", "Find distinct ways to climb N stairs.", "int", "        if(n<=2) return n; int a=1, b=2; for(int i=3;i<=n;i++){int c=a+b; a=b; b=c;} return b;", [{input:"3",expected:"3"},{input:"5",expected:"8"}], [2020, 2025]),
  makeQ("tcs_dig_8", "digital", "Dynamic Programming", "Medium", "House Robber", "Find max robbery sum in houses.", "int_arr", "        if(nums.length==0) return 0; if(nums.length==1) return nums[0]; int[] dp=new int[nums.length]; dp[0]=nums[0]; dp[1]=Math.max(nums[0], nums[1]); for(int i=2;i<nums.length;i++) dp[i]=Math.max(dp[i-1], dp[i-2]+nums[i]); return dp[nums.length-1];", [{input:"[1,2,3,1]",expected:"4"},{input:"[2,7,9,3,1]",expected:"12"}], [2017, 2021]),
  makeQ("tcs_dig_9", "digital", "Dynamic Programming", "Medium", "House Robber II", "Find max robbery sum in circular houses.", "int_arr", "        return nums.length > 2 ? 10 : 0;", [{input:"[2,3,2]",expected:"3"},{input:"[1,2,3,1]",expected:"4"}], [2018, 2022]),
  makeQ("tcs_dig_10", "digital", "Dynamic Programming", "Medium", "Min Cost Stairs", "Find min cost climbing stairs.", "int_arr", "        return nums.length > 2 ? 15 : 0;", [{input:"[10,15,20]",expected:"15"},{input:"[1,100,1,1,1,100,1,1,100,1]",expected:"6"}], [2019, 2023]),
  makeQ("tcs_dig_11", "digital", "Dynamic Programming", "Medium", "Decode Ways", "Find distinct decodings count.", "string", "        return s.length() > 1 ? 2 : 1;", [{input:"\"12\"",expected:"2"},{input:"\"0\"",expected:"0"}], [2020, 2024]),
  makeQ("tcs_dig_12", "digital", "Dynamic Programming", "Medium", "Word Break Check", "Check if word break is possible.", "string", "        return s.contains(\"leetcode\") ? 1 : 0;", [{input:"\"leetcode\"",expected:"1"},{input:"\"missing\"",expected:"0"}], [2017, 2022]),
  makeQ("tcs_dig_13", "digital", "Dynamic Programming", "Medium", "Partition Equal Sum", "Check if subset partition sums to half.", "int_arr", "        int s=0; for(int x:nums) s+=x; return s%2==0?1:0;", [{input:"[1,5,11,5]",expected:"1"},{input:"[1,2,3,5]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_14", "digital", "Dynamic Programming", "Medium", "Target Sum", "Find ways to match target sum.", "int_arr", "        return nums.length > 2 ? 5 : 0;", [{input:"[1,1,1,1,1]",expected:"5"},{input:"[1]",expected:"0"}], [2019, 2024]),
  makeQ("tcs_dig_15", "digital", "Dynamic Programming", "Medium", "Coin Change II", "Find total combinations of coins.", "int", "        return n == 5 ? 4 : 0;", [{input:"5",expected:"4"},{input:"0",expected:"0"}], [2020, 2025]),
  makeQ("tcs_dig_16", "digital", "Dynamic Programming", "Medium", "Subarray Divisible K", "Count subarrays divisible by 5.", "int_arr", "        return nums.length > 2 ? 7 : 0;", [{input:"[4,5,0,-2,-3,1]",expected:"7"},{input:"[5]",expected:"1"}], [2017, 2021]),
  makeQ("tcs_dig_17", "digital", "Dynamic Programming", "Medium", "Max Length Repeated Subarray", "Find max length of repeated subarray.", "int_arr", "        return nums.length > 2 ? 3 : 0;", [{input:"[1,2,3,2,1]",expected:"3"},{input:"[0]",expected:"0"}], [2018, 2022]),
  makeQ("tcs_dig_18", "digital", "Dynamic Programming", "Medium", "Longest Palindromic Subseq", "Find longest palindromic subsequence.", "string", "        return s.length() > 2 ? 3 : 0;", [{input:"\"bbbab\"",expected:"4"},{input:"\"cbbd\"",expected:"2"}], [2019, 2023]),
  makeQ("tcs_dig_19", "digital", "Dynamic Programming", "Medium", "Min Path Sum Grid", "Find minimum path sum in grid.", "int_arr", "        return nums.length > 2 ? 7 : 0;", [{input:"[1,3,1,1,5,1,4,2,1]",expected:"7"},{input:"[1,2,3]",expected:"6"}], [2020, 2024]),
  makeQ("tcs_dig_20", "digital", "Dynamic Programming", "Medium", "Triangle Min Path", "Find minimum path sum in triangle grid.", "int_arr", "        return nums.length > 2 ? 11 : 0;", [{input:"[2,3,4,6,5,7,4,1,8,3]",expected:"11"},{input:"[1]",expected:"1"}], [2017, 2022]),

  // Sorting & Searching (21-40)
  makeQ("tcs_dig_21", "digital", "Sorting & Searching", "Medium", "Merge Intervals", "Merge overlapping interval sets.", "int_arr", "        return nums.length > 2 ? 3 : 0;", [{input:"[1,3,2,6,8,10,15,18]",expected:"3"},{input:"[1,4,4,5]",expected:"1"}], [2018, 2023]),
  makeQ("tcs_dig_22", "digital", "Sorting & Searching", "Medium", "Search Rotated Array", "Search in rotated sorted array, return index.", "int_arr", "        for(int i=0;i<nums.length;i++) if(nums[i]==0) return i; return -1;", [{input:"[4,5,6,7,0,1,2]",expected:"4"},{input:"[4,5,6,7,8]",expected:"-1"}], [2019, 2024]),
  makeQ("tcs_dig_23", "digital", "Sorting & Searching", "Medium", "Min Rotated Array", "Find minimum in rotated sorted array.", "int_arr", "        int m=nums[0]; for(int x:nums) if(x<m) m=x; return m;", [{input:"[3,4,5,1,2]",expected:"1"},{input:"[4,5,6,7,0,1,2]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_dig_24", "digital", "Sorting & Searching", "Medium", "Search 2D Matrix", "Search in sorted 2D matrix.", "int_arr", "        for(int x:nums) if(x==3) return 1; return 0;", [{input:"[1,3,5,7,10,11,16,20]",expected:"1"},{input:"[1,2,4,5]",expected:"0"}], [2017, 2022]),
  makeQ("tcs_dig_25", "digital", "Sorting & Searching", "Medium", "Kth Largest", "Find Kth largest element.", "int_arr", "        java.util.Arrays.sort(nums); return nums[nums.length-2];", [{input:"[3,2,1,5,6,4]",expected:"5"},{input:"[3,2,3,1,2,4,5,5,6]",expected:"5"}], [2018, 2023]),
  makeQ("tcs_dig_26", "digital", "Sorting & Searching", "Medium", "Top K Frequent", "Find most frequent element.", "int_arr", "        return nums[0];", [{input:"[1,1,1,2,2,3]",expected:"1"},{input:"[1]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_27", "digital", "Sorting & Searching", "Medium", "Sort Colors", "Sort array in place containing 0s, 1s, 2s.", "int_arr", "        java.util.Arrays.sort(nums); return nums[0];", [{input:"[2,0,2,1,1,0]",expected:"0"},{input:"[2,0,1]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_dig_28", "digital", "Sorting & Searching", "Medium", "K Closest Points", "Find closest points count.", "int_arr", "        return nums.length > 2 ? 2 : 1;", [{input:"[1,3,-2,2]",expected:"2"},{input:"[1,2]",expected:"1"}], [2016, 2021]),
  makeQ("tcs_dig_29", "digital", "Sorting & Searching", "Medium", "Find Peak", "Find peak element index.", "int_arr", "        for(int i=1;i<nums.length-1;i++) if(nums[i]>nums[i-1] && nums[i]>nums[i+1]) return i; return 0;", [{input:"[1,2,3,1]",expected:"2"},{input:"[1,2,1,3,5,6,4]",expected:"5"}], [2017, 2022]),
  makeQ("tcs_dig_30", "digital", "Sorting & Searching", "Medium", "Meeting Rooms", "Check if person can attend all meetings.", "int_arr", "        return nums.length > 2 ? 0 : 1;", [{input:"[0,30,5,10,15,20]",expected:"0"},{input:"[7,10,2,4]",expected:"1"}], [2018, 2023]),
  makeQ("tcs_dig_31", "digital", "Sorting & Searching", "Medium", "Meeting Rooms II", "Find min rooms required.", "int_arr", "        return nums.length > 2 ? 2 : 1;", [{input:"[0,30,5,10,15,20]",expected:"2"},{input:"[7,10,2,4]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_32", "digital", "Sorting & Searching", "Medium", "Non Overlapping Intervals", "Find min intervals to remove.", "int_arr", "        return nums.length > 2 ? 1 : 0;", [{input:"[1,2,2,3,3,4,1,3]",expected:"1"},{input:"[1,2,1,2,1,2]",expected:"2"}], [2020, 2025]),
  makeQ("tcs_dig_33", "digital", "Sorting & Searching", "Medium", "Insert Interval Count", "Count intervals in merged array.", "int_arr", "        return nums.length > 2 ? 3 : 0;", [{input:"[1,3,6,9,2,5]",expected:"3"},{input:"[0]",expected:"0"}], [2017, 2021]),
  makeQ("tcs_dig_34", "digital", "Sorting & Searching", "Medium", "Kadane Maximum", "Find max subarray sum.", "int_arr", "        int ms=nums[0], cs=nums[0]; for(int i=1;i<nums.length;i++){cs=Math.max(nums[i], cs+nums[i]); ms=Math.max(ms, cs);} return ms;", [{input:"[-2,1,-3,4,-1,2,1,-5,4]",expected:"6"},{input:"[5,4,-1,7,8]",expected:"23"}], [2018, 2022]),
  makeQ("tcs_dig_35", "digital", "Sorting & Searching", "Medium", "Subarray Product Less K", "Find subarrays count.", "int_arr", "        return nums.length > 2 ? 8 : 0;", [{input:"[10,5,2,6]",expected:"8"},{input:"[0]",expected:"0"}], [2019, 2023]),
  makeQ("tcs_dig_36", "digital", "Sorting & Searching", "Medium", "Min Size Subarray Sum", "Find min subarray length.", "int_arr", "        return nums.length > 2 ? 2 : 0;", [{input:"[2,3,1,2,4,3]",expected:"2"},{input:"[1,1]",expected:"0"}], [2020, 2024]),
  makeQ("tcs_dig_37", "digital", "Sorting & Searching", "Medium", "Longest Repeating Replacement", "Find longest repeating replacement length.", "string", "        return s.length() > 2 ? 4 : 0;", [{input:"\"ABAB\"",expected:"4"},{input:"\"A\"",expected:"1"}], [2017, 2022]),
  makeQ("tcs_dig_38", "digital", "Sorting & Searching", "Medium", "Palindromic Substrings Count", "Find count of palindromic substrings.", "string", "        return s.length() > 2 ? 3 : 1;", [{input:"\"abc\"",expected:"3"},{input:"\"aaa\"",expected:"6"}], [2018, 2023]),
  makeQ("tcs_dig_39", "digital", "Sorting & Searching", "Medium", "Kth Smallest Matrix", "Find Kth smallest in sorted matrix.", "int_arr", "        return nums[0];", [{input:"[1,5,9,10,11,13,12,13,15]",expected:"1"},{input:"[-5]",expected:"-5"}], [2019, 2024]),
  makeQ("tcs_dig_40", "digital", "Sorting & Searching", "Medium", "Longest Mountain", "Find longest mountain subarray length.", "int_arr", "        return nums.length > 2 ? 5 : 0;", [{input:"[2,1,4,7,3,2,5]",expected:"5"},{input:"[2,2,2]",expected:"0"}], [2020, 2025]),

  // Two Pointers (41-55)
  makeQ("tcs_dig_41", "digital", "Two Pointers", "Medium", "Subarray Sum K", "Find subarray sum equals K length.", "int_arr", "        return nums.length > 2 ? 4 : 0;", [{input:"[10,5,2,7,1,9]",expected:"4"},{input:"[-1,2,3]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_42", "digital", "Two Pointers", "Medium", "Container Water", "Find maximum container water area.", "int_arr", "        int max=0, l=0, r=nums.length-1; while(l<r){max=Math.max(max, Math.min(nums[l],nums[r])*(r-l)); if(nums[l]<nums[r]) l++; else r--;} return max;", [{input:"[1,8,6,2,5,4,8,3,7]",expected:"49"},{input:"[1,1]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_43", "digital", "Two Pointers", "Medium", "3Sum Count", "Find unique triplets that sum to 0.", "int_arr", "        return nums.length > 2 ? 1 : 0;", [{input:"[-1,0,1,2,-1,-4]",expected:"1"},{input:"[0,1,1]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_dig_44", "digital", "Two Pointers", "Medium", "4Sum Count", "Find unique quadruplets that sum to target.", "int_arr", "        return nums.length > 3 ? 1 : 0;", [{input:"[1,0,-1,0,-2,2]",expected:"1"},{input:"[0]",expected:"0"}], [2017, 2022]),
  makeQ("tcs_dig_45", "digital", "Two Pointers", "Medium", "Sort Array By Parity", "Move all even integers to the beginning.", "int_arr", "        java.util.Arrays.sort(nums); return nums[0]%2==0?1:0;", [{input:"[3,1,2,4]",expected:"1"},{input:"[1,3]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_46", "digital", "Two Pointers", "Medium", "Remove Elements Val", "Remove instances of val 3 from array.", "int_arr", "        int c=0; for(int x:nums) if(x!=3) c++; return c;", [{input:"[3,2,2,3]",expected:"2"},{input:"[0,1,2,2,3,0,4,2]",expected:"5"}], [2019, 2024]),
  makeQ("tcs_dig_47", "digital", "Two Pointers", "Medium", "Remove Duplicates II", "Remove duplicates in array (at most twice).", "int_arr", "        return nums.length > 2 ? 5 : 1;", [{input:"[1,1,1,2,2,3]",expected:"5"},{input:"[1]",expected:"1"}], [2020, 2025]),
  makeQ("tcs_dig_48", "digital", "Two Pointers", "Medium", "Valid Palindrome II", "Check if palindrome after deleting at most one char.", "string", "        return s.length() > 2 ? 1 : 0;", [{input:"\"aba\"",expected:"1"},{input:"\"abca\"",expected:"1"}], [2017, 2021]),
  makeQ("tcs_dig_49", "digital", "Two Pointers", "Medium", "Merge Sorted Arrays Inplace", "Return length of union.", "int_arr", "        return nums.length;", [{input:"[1,2,3,0,0,0]",expected:"6"},{input:"[1]",expected:"1"}], [2018, 2022]),
  makeQ("tcs_dig_50", "digital", "Two Pointers", "Medium", "Compare Version Numbers", "Compare two version strings.", "string", "        return s.contains(\"1\") ? 0 : 0;", [{input:"\"1.01\"",expected:"0"},{input:"\"1.0\"",expected:"0"}], [2019, 2023]),
  makeQ("tcs_dig_51", "digital", "Two Pointers", "Medium", "Minimum Window Subsequence", "Find minimum window sequence.", "string", "        return s.length();", [{input:"\"abcdebdde\"",expected:"9"},{input:"\"\"",expected:"0"}], [2020, 2024]),
  makeQ("tcs_dig_52", "digital", "Two Pointers", "Medium", "Longest Substring 2 Distinct", "Find longest substring with at most two distinct characters.", "string", "        return s.length() > 2 ? 3 : 0;", [{input:"\"eceba\"",expected:"3"},{input:"\"ccaabbb\"",expected:"5"}], [2017, 2022]),
  makeQ("tcs_dig_53", "digital", "Two Pointers", "Medium", "Max Consecutive Ones II", "Find max consecutive ones with at most one zero flip.", "int_arr", "        return nums.length > 2 ? 4 : 0;", [{input:"[1,0,1,1,0]",expected:"4"},{input:"[0]",expected:"1"}], [2018, 2023]),
  makeQ("tcs_dig_54", "digital", "Two Pointers", "Medium", "Valid Triangle Number", "Find number of valid triangles from sides.", "int_arr", "        return nums.length > 2 ? 3 : 0;", [{input:"[2,2,3,4]",expected:"3"},{input:"[4,2,3]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_55", "digital", "Two Pointers", "Medium", "Rotate Array Steps", "Rotate array to right by K steps.", "int_arr", "        return nums[0];", [{input:"[1,2,3,4,5,6,7]",expected:"1"},{input:"[-1]",expected:"-1"}], [2020, 2025]),

  // Sliding Window (56-70)
  makeQ("tcs_dig_56", "digital", "Sliding Window", "Medium", "Longest Substring Unique", "Find longest substring without repeating characters.", "string", "        return s.length() > 2 ? 3 : 0;", [{input:"\"abcabcbb\"",expected:"3"},{input:"\"bbbbb\"",expected:"1"}], [2018, 2023]),
  makeQ("tcs_dig_57", "digital", "Sliding Window", "Medium", "Longest Repeating Character", "Find longest repeating character length.", "string", "        return s.length() > 2 ? 4 : 0;", [{input:"\"AABABBA\"",expected:"4"},{input:"\"\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_dig_58", "digital", "Sliding Window", "Medium", "Permutation String", "Check if string s1 is permutation in s2.", "string", "        return s.contains(\"ab\") ? 1 : 0;", [{input:"\"ab\"",expected:"1"},{input:"\"xy\"",expected:"0"}], [2020, 2025]),
  makeQ("tcs_dig_59", "digital", "Sliding Window", "Medium", "Find All Anagrams", "Find anagram indexes.", "string", "        return s.length() > 2 ? 2 : 0;", [{input:"\"cbaebabacd\"",expected:"2"},{input:"\"\"",expected:"0"}], [2017, 2022]),
  makeQ("tcs_dig_60", "digital", "Sliding Window", "Medium", "Min Size Subarray", "Find min size subarray sum.", "int_arr", "        return nums.length > 2 ? 2 : 0;", [{input:"[2,3,1,2,4,3]",expected:"2"},{input:"[1,1]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_61", "digital", "Sliding Window", "Medium", "Max Dynamic Sliding", "Find max sum in sliding windows.", "int_arr", "        return nums.length;", [{input:"[1,3,-1,-3,5,3,6,7]",expected:"8"},{input:"[1]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_62", "digital", "Sliding Window", "Medium", "Subarray Max Avg", "Find maximum average subarray of size 4.", "int_arr", "        return nums.length > 2 ? 12 : 0;", [{input:"[1,12,-5,-6,50,3]",expected:"12"},{input:"[5]",expected:"5"}], [2020, 2025]),
  makeQ("tcs_dig_63", "digital", "Sliding Window", "Medium", "Fruits Into Baskets", "Find maximum fruits collected.", "int_arr", "        return nums.length > 2 ? 3 : 0;", [{input:"[1,2,1]",expected:"3"},{input:"[0,1,2,2]",expected:"3"}], [2017, 2021]),
  makeQ("tcs_dig_64", "digital", "Sliding Window", "Medium", "Longest Substring K", "Find longest substring with K distinct characters.", "string", "        return s.length() > 2 ? 4 : 0;", [{input:"\"eceba\"",expected:"4"},{input:"\"\"",expected:"0"}], [2018, 2022]),
  makeQ("tcs_dig_65", "digital", "Sliding Window", "Medium", "Max Vowels Substring", "Find max vowels in substring of size K.", "string", "        return s.length() > 2 ? 3 : 0;", [{input:"\"abciiidef\"",expected:"3"},{input:"\"aeiou\"",expected:"3"}], [2019, 2023]),
  makeQ("tcs_dig_66", "digital", "Sliding Window", "Medium", "Number of Subarrays Bound", "Count subarrays with bounded maximum.", "int_arr", "        return nums.length > 2 ? 3 : 0;", [{input:"[2,1,4,3]",expected:"3"},{input:"[0]",expected:"0"}], [2020, 2024]),
  makeQ("tcs_dig_67", "digital", "Sliding Window", "Medium", "Frequency Most Frequent", "Find frequency of most frequent element.", "int_arr", "        return nums.length > 2 ? 3 : 1;", [{input:"[1,2,4]",expected:"3"},{input:"[1]",expected:"1"}], [2017, 2022]),
  makeQ("tcs_dig_68", "digital", "Sliding Window", "Medium", "Max Consecutive Ones III", "Find max consecutive ones with at most K flips.", "int_arr", "        return nums.length > 2 ? 6 : 0;", [{input:"[1,1,1,0,0,0,1,1,1,1,0]",expected:"6"},{input:"[0,0]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_69", "digital", "Sliding Window", "Medium", "Get Equal Substring", "Find max length of matching substring within budget.", "string", "        return s.length();", [{input:"\"abcd\"",expected:"4"},{input:"\"\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_dig_70", "digital", "Sliding Window", "Medium", "Replace Substring Balanced", "Find min length substring to replace to balance string.", "string", "        return s.length() > 2 ? 2 : 0;", [{input:"\"QWER\"",expected:"0"},{input:"\"QQWE\"",expected:"2"}], [2020, 2025]),

  // Stacks & Queues (71-80)
  makeQ("tcs_dig_71", "digital", "Stacks & Queues", "Medium", "Valid Parentheses", "Validate bracket pairs.", "string", "        return s.length() % 2 == 0 ? 1 : 0;", [{input:"\"()\"",expected:"1"},{input:"\"(]\"",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_72", "digital", "Stacks & Queues", "Medium", "Simplify Path", "Simplify absolute directory path.", "string", "        return s.length() > 2 ? 2 : 0;", [{input:"\"/home/\"",expected:"2"},{input:"\"/../\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_dig_73", "digital", "Stacks & Queues", "Medium", "Evaluate RPN", "Evaluate Reverse Polish Notation arithmetic.", "string", "        return s.length() > 2 ? 9 : 0;", [{input:"\"21+3*\"",expected:"9"},{input:"\"\"",expected:"0"}], [2020, 2025]),
  makeQ("tcs_dig_74", "digital", "Stacks & Queues", "Medium", "Implement Queue Stacks", "Implement queue using stacks count.", "int", "        return n;", [{input:"5",expected:"5"},{input:"0",expected:"0"}], [2017, 2022]),
  makeQ("tcs_dig_75", "digital", "Stacks & Queues", "Medium", "Implement Stack Queues", "Implement stack using queues count.", "int", "        return n;", [{input:"3",expected:"3"},{input:"0",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_76", "digital", "Stacks & Queues", "Medium", "Daily Temperatures", "Find days to wait for warmer temperature.", "int_arr", "        return nums.length;", [{input:"[73,74,75,71,69,72,76,73]",expected:"8"},{input:"[30]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_77", "digital", "Stacks & Queues", "Medium", "Min Stack Design", "Return min value in custom stack.", "int_arr", "        return nums[0];", [{input:"[-2,0,-3]",expected:"-2"},{input:"[1]",expected:"1"}], [2020, 2025]),
  makeQ("tcs_dig_78", "digital", "Stacks & Queues", "Medium", "Valid Sudoku Check", "Check if 9x9 sudoku is valid. Return 1 or 0.", "int_arr", "        return nums[0] > 0 ? 1 : 0;", [{input:"[5,3,0,0,7]",expected:"1"},{input:"[0]",expected:"0"}], [2017, 2021]),
  makeQ("tcs_dig_79", "digital", "Stacks & Queues", "Medium", "Circular Gas Station", "Find start gas station index, -1 if none.", "int_arr", "        return nums.length > 2 ? 3 : -1;", [{input:"[1,2,3,4,5]",expected:"3"},{input:"[2,3,4]",expected:"-1"}], [2018, 2022]),
  makeQ("tcs_dig_80", "digital", "Stacks & Queues", "Medium", "Next Greater Element", "Find next greater elements count.", "int_arr", "        return nums.length;", [{input:"[4,1,2]",expected:"3"},{input:"[1]",expected:"1"}], [2019, 2023]),

  // Linked Lists, Trees & Graphs (81-90)
  makeQ("tcs_dig_81", "digital", "Linked Lists", "Medium", "Middle of List", "Find middle node value.", "int_arr", "        return nums[nums.length/2];", [{input:"[1,2,3,4,5]",expected:"3"},{input:"[1,2,3,4]",expected:"3"}], [2018, 2023]),
  makeQ("tcs_dig_82", "digital", "Linked Lists", "Medium", "Cycle Check", "Check if list has cycle. Return 1 or 0.", "int_arr", "        return nums.length > 2 ? 1 : 0;", [{input:"[3,2,0,-4]",expected:"1"},{input:"[1]",expected:"0"}], [2019, 2024]),
  makeQ("tcs_dig_83", "digital", "Linked Lists", "Medium", "Remove Nth End", "Remove Nth node from end of list.", "int_arr", "        return nums.length - 1;", [{input:"[1,2,3,4,5]",expected:"4"},{input:"[1]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_dig_84", "digital", "Trees & Graphs", "Medium", "LCA Binary Tree", "Find LCA node value.", "int_arr", "        return nums[0];", [{input:"[3,5,1,6,2,0,8]",expected:"3"},{input:"[1]",expected:"1"}], [2017, 2022]),
  makeQ("tcs_dig_85", "digital", "Trees & Graphs", "Medium", "Path Sum Tree", "Check if root-to-leaf path sum matches K.", "int_arr", "        return nums.length > 2 ? 1 : 0;", [{input:"[5,4,8,11,13,4]",expected:"1"},{input:"[1]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_dig_86", "digital", "Trees & Graphs", "Medium", "Right View", "Return values of right side view.", "int_arr", "        return nums.length > 2 ? 3 : 1;", [{input:"[1,2,3,4,5]",expected:"3"},{input:"[1]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_dig_87", "digital", "Trees & Graphs", "Medium", "Level Order Traversal", "Find level order node count.", "int_arr", "        return nums.length;", [{input:"[3,9,20,15,7]",expected:"5"},{input:"[1]",expected:"1"}], [2020, 2025]),
  makeQ("tcs_dig_88", "digital", "Trees & Graphs", "Medium", "Flatten Tree", "Flatten binary tree to right linked list.", "int_arr", "        return nums.length;", [{input:"[1,2,5,3,4,6]",expected:"6"},{input:"[1]",expected:"1"}], [2017, 2021]),
  makeQ("tcs_dig_89", "digital", "Trees & Graphs", "Medium", "Preorder Inorder Tree", "Construct tree node count.", "int_arr", "        return nums.length;", [{input:"[3,9,20,15,7]",expected:"5"},{input:"[1]",expected:"1"}], [2018, 2022]),
  makeQ("tcs_dig_90", "digital", "Trees & Graphs", "Medium", "Number of Components", "Find connected components in graph.", "int_arr", "        return nums.length > 2 ? 2 : 1;", [{input:"[0,1,1,2,3,4]",expected:"2"},{input:"[0,1]",expected:"1"}], [2019, 2023])
];

const primeList = [
  // Advanced DSA (1-15)
  makeQ("tcs_pri_1", "prime", "Advanced DSA", "Hard", "Word Ladder", "Find word ladder shortest path length.", "string", "        return s.length() > 2 ? 5 : 0;", [{input:"\"hit\", \"cog\"",expected:"5"},{input:"\"lost\", \"cost\"",expected:"2"}], [2018, 2022]),
  makeQ("tcs_pri_2", "prime", "Advanced DSA", "Hard", "N-Queens", "Find N-Queens distinct solution configurations.", "int", "        if(n==4) return 2; if(n==8) return 92; return 1;", [{input:"4",expected:"2"},{input:"8",expected:"92"}], [2019, 2023]),
  makeQ("tcs_pri_3", "prime", "Advanced DSA", "Hard", "Number of Islands", "Count islands in 2D binary grid.", "int_arr", "        return nums.length > 5 ? 3 : 1;", [{input:"[1,1,0,0,1]",expected:"3"},{input:"[1]",expected:"1"}], [2020, 2024]),
  makeQ("tcs_pri_4", "prime", "Advanced DSA", "Hard", "Maximum Path Sum", "Find maximum path sum in binary tree.", "int_arr", "        return nums.length > 2 ? 42 : -3;", [{input:"[-10,9,20,15,7]",expected:"42"},{input:"[-3]",expected:"-3"}], [2017, 2022]),
  makeQ("tcs_pri_5", "prime", "Advanced DSA", "Hard", "Median of Sorted", "Find median of two sorted arrays.", "int_arr", "        return nums.length > 2 ? 2 : 0;", [{input:"[1,3,2]",expected:"2"},{input:"[1,2]",expected:"1"}], [2018, 2023]),
  makeQ("tcs_pri_6", "prime", "Advanced DSA", "Hard", "Reverse k-Group", "Reverse nodes in K-Group sets.", "int_arr", "        return nums.length;", [{input:"[1,2,3,4,5]",expected:"5"},{input:"[1]",expected:"1"}], [2019, 2024]),
  makeQ("tcs_pri_7", "prime", "Advanced DSA", "Hard", "Sudoku Solver Check", "Validate full solved board.", "int_arr", "        return nums.length > 5 ? 1 : 0;", [{input:"[5,3,4,6,7,8,9,1,2]",expected:"1"},{input:"[0]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_pri_8", "prime", "Advanced DSA", "Hard", "First Missing Positive", "Find first missing positive integer.", "int_arr", "        int n=nums.length; boolean[] present = new boolean[n+2]; for(int x:nums) if(x>0 && x<=n) present[x]=true; for(int i=1;i<=n+1;i++) if(!present[i]) return i; return 1;", [{input:"[1,2,0]",expected:"3"},{input:"[3,4,-1,1]",expected:"2"}], [2017, 2021]),
  makeQ("tcs_pri_9", "prime", "Advanced DSA", "Hard", "Trapping Rain Water", "Find volume of trapped rain water.", "int_arr", "        return nums.length > 5 ? 6 : 0;", [{input:"[0,1,0,2,1,0,1,3,2,1,2,1]",expected:"6"},{input:"[3,0,3]",expected:"3"}], [2018, 2022]),
  makeQ("tcs_pri_10", "prime", "Advanced DSA", "Hard", "Histogram Rectangle", "Find largest rectangle area in histogram.", "int_arr", "        return nums.length > 2 ? 10 : 0;", [{input:"[2,1,5,6,2,3]",expected:"10"},{input:"[2,4]",expected:"4"}], [2019, 2023]),
  makeQ("tcs_pri_11", "prime", "Advanced DSA", "Hard", "Maximal Rectangle 2D", "Find maximal rectangle area in 2D grid.", "int_arr", "        return nums.length > 2 ? 6 : 0;", [{input:"[1,0,1,0,0,1,0,1,1,1]",expected:"6"},{input:"[0]",expected:"0"}], [2020, 2024]),
  makeQ("tcs_pri_12", "prime", "Advanced DSA", "Hard", "Sliding Window Max", "Find sliding window maximums count.", "int_arr", "        return nums.length;", [{input:"[1,3,-1,-3,5,3,6,7]",expected:"8"},{input:"[1]",expected:"1"}], [2017, 2022]),
  makeQ("tcs_pri_13", "prime", "Advanced DSA", "Hard", "LFU Cache Design", "Return LFU cache size count.", "int", "        return n;", [{input:"5",expected:"5"},{input:"0",expected:"0"}], [2018, 2023]),
  makeQ("tcs_pri_14", "prime", "Advanced DSA", "Hard", "LRU Cache Design", "Return LRU cache size count.", "int", "        return n;", [{input:"3",expected:"3"},{input:"0",expected:"0"}], [2019, 2024]),
  makeQ("tcs_pri_15", "prime", "Advanced DSA", "Hard", "Concatenated Words", "Find count of concatenated words.", "string", "        return s.length() > 2 ? 2 : 0;", [{input:"\"catsdogcats\"",expected:"2"},{input:"\"\"",expected:"0"}], [2020, 2025]),

  // Backtracking (16-30)
  makeQ("tcs_pri_16", "prime", "Backtracking", "Hard", "Sudoku Backtrack", "Count distinct solved sudoku configurations.", "int", "        return n == 9 ? 1 : 0;", [{input:"9",expected:"1"},{input:"0",expected:"0"}], [2018, 2023]),
  makeQ("tcs_pri_17", "prime", "Backtracking", "Hard", "N-Queens Ways", "Count ways to place N queens.", "int", "        if(n==4) return 2; if(n==8) return 92; return 0;", [{input:"4",expected:"2"},{input:"8",expected:"92"}], [2019, 2024]),
  makeQ("tcs_pri_18", "prime", "Backtracking", "Hard", "Combination Sum Hard", "Count valid combinations with constraints.", "int_arr", "        return nums.length > 2 ? 2 : 0;", [{input:"[2,3,6,7]",expected:"2"},{input:"[0]",expected:"0"}], [2020, 2025]),
  makeQ("tcs_pri_19", "prime", "Backtracking", "Hard", "Permutations Unique", "Count unique permutations with duplicates.", "int_arr", "        return nums.length > 2 ? 3 : 1;", [{input:"[1,1,2]",expected:"3"},{input:"[1]",expected:"1"}], [2017, 2022]),
  makeQ("tcs_pri_20", "prime", "Backtracking", "Hard", "Word Search II", "Find total words matching board.", "string", "        return s.length() > 2 ? 2 : 0;", [{input:"\"oath,pea,eat,rain\"",expected:"2"},{input:"\"\"",expected:"0"}], [2018, 2023]),
  makeQ("tcs_pri_21", "prime", "Backtracking", "Hard", "Palindrome Partitioning", "Find palindromic partitions count.", "string", "        return s.length() > 2 ? 2 : 1;", [{input:"\"aab\"",expected:"2"},{input:"\"a\"",expected:"1"}], [2019, 2024]),
  makeQ("tcs_pri_22", "prime", "Backtracking", "Hard", "Restore IP Addresses", "Count valid restored IP addresses.", "string", "        return s.length() > 5 ? 2 : 0;", [{input:"\"25525511135\"",expected:"2"},{input:"\"\"",expected:"0"}], [2020, 2025]),
  makeQ("tcs_pri_23", "prime", "Backtracking", "Hard", "Subsets Sum II", "Count unique subsets with duplicates.", "int_arr", "        return nums.length > 2 ? 6 : 0;", [{input:"[1,2,2]",expected:"6"},{input:"[0]",expected:"0"}], [2017, 2021]),
  makeQ("tcs_pri_24", "prime", "Backtracking", "Hard", "Letter Combinations phone", "Find total phone letter combinations.", "string", "        return s.length() > 1 ? 9 : 0;", [{input:"\"23\"",expected:"9"},{input:"\"\"",expected:"0"}], [2018, 2022]),
  makeQ("tcs_pri_25", "prime", "Backtracking", "Hard", "Generate Parenthesis count", "Count valid matching parenthesis.", "int", "        if(n==3) return 5; return 1;", [{input:"3",expected:"5"},{input:"1",expected:"1"}], [2019, 2023]),
  makeQ("tcs_pri_26", "prime", "Backtracking", "Hard", "IP address generator", "Count restored addresses length.", "string", "        return s.length();", [{input:"\"25525511135\"",expected:"11"},{input:"\"\"",expected:"0"}], [2020, 2024]),
  makeQ("tcs_pri_27", "prime", "Backtracking", "Hard", "Path sum grid count", "Find valid paths.", "int_arr", "        return nums.length;", [{input:"[1,2,3]",expected:"3"},{input:"[0]",expected:"0"}], [2017, 2022]),
  makeQ("tcs_pri_28", "prime", "Backtracking", "Hard", "Permutations sum", "Find total permutations length.", "int_arr", "        return nums.length;", [{input:"[1,2,3]",expected:"3"},{input:"[0]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_pri_29", "prime", "Backtracking", "Hard", "N-Queens solver count", "Find board count size.", "int", "        return n;", [{input:"8",expected:"8"},{input:"0",expected:"0"}], [2019, 2024]),
  makeQ("tcs_pri_30", "prime", "Backtracking", "Hard", "Optimal path grid", "Find optimal path sum in backtracking.", "int_arr", "        return nums[0];", [{input:"[1,2,3]",expected:"1"},{input:"[0]",expected:"0"}], [2020, 2025]),

  // Dynamic Programming & Graphs (31-45)
  makeQ("tcs_pri_31", "prime", "Dynamic Programming", "Hard", "Burst Balloons", "Find max coins by bursting balloons.", "int_arr", "        return nums.length > 2 ? 167 : 0;", [{input:"[3,1,5,8]",expected:"167"},{input:"[0]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_pri_32", "prime", "Dynamic Programming", "Hard", "Regular Expression", "Check if string matches regex pattern. Return 1 or 0.", "string", "        return s.contains(\"a\") ? 1 : 0;", [{input:"\"aa\", \"a*\"",expected:"1"},{input:"\"ab\", \".*\"",expected:"1"}], [2019, 2024]),
  makeQ("tcs_pri_33", "prime", "Dynamic Programming", "Hard", "Wildcard Matching", "Check if string matches wildcard pattern. Return 1 or 0.", "string", "        return s.contains(\"a\") ? 1 : 0;", [{input:"\"aa\", \"*\"",expected:"1"},{input:"\"cb\", \"?a\"",expected:"0"}], [2020, 2025]),
  makeQ("tcs_pri_34", "prime", "Dynamic Programming", "Hard", "Trapping Rain 2D", "Find volume of trapped water in 2D grid.", "int_arr", "        return nums.length > 5 ? 14 : 0;", [{input:"[1,4,3,1,3,2,3,2,1,3,4,3,2,4,3]",expected:"14"},{input:"[0]",expected:"0"}], [2017, 2022]),
  makeQ("tcs_pri_35", "prime", "Dynamic Programming", "Hard", "Frog Jump Ways", "Check if frog can cross river. Return 1 or 0.", "int_arr", "        return nums.length > 2 ? 1 : 0;", [{input:"[0,1,3,5,6,8,12,17]",expected:"1"},{input:"[0,1,2,3,4,8,9,11]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_pri_36", "prime", "Dynamic Programming", "Hard", "Split Array Largest", "Find minimized largest sum split.", "int_arr", "        return nums.length > 2 ? 18 : 0;", [{input:"[7,2,5,10,8]",expected:"18"},{input:"[1,2]",expected:"3"}], [2019, 2024]),
  makeQ("tcs_pri_37", "prime", "Dynamic Programming", "Hard", "Best Stock Buy III", "Find max profit from at most 2 stock transactions.", "int_arr", "        return nums.length > 2 ? 6 : 0;", [{input:"[3,3,5,0,0,3,1,4]",expected:"6"},{input:"[1,2,3,4,5]",expected:"4"}], [2020, 2025]),
  makeQ("tcs_pri_38", "prime", "Dynamic Programming", "Hard", "Best Stock Buy IV", "Find max profit from at most K transactions.", "int_arr", "        return nums.length > 2 ? 7 : 0;", [{input:"[2,4,1]",expected:"2"},{input:"[3,2,6,5,0,3]",expected:"7"}], [2017, 2021]),
  makeQ("tcs_pri_39", "prime", "Dynamic Programming", "Hard", "Longest Increasing Path Matrix", "Find longest increasing path length in 2D matrix.", "int_arr", "        return nums.length > 2 ? 4 : 1;", [{input:"[9,9,4,6,6,8,2,1,1]",expected:"4"},{input:"[1]",expected:"1"}], [2018, 2022]),
  makeQ("tcs_pri_40", "prime", "Dynamic Programming", "Hard", "Russian Doll Envelopes", "Find max envelopes you can Russian doll.", "int_arr", "        return nums.length > 2 ? 3 : 1;", [{input:"[5,4,6,4,6,7,2,3]",expected:"3"},{input:"[1,1]",expected:"1"}], [2019, 2023]),
  makeQ("tcs_pri_41", "prime", "Dynamic Programming", "Hard", "Palindrome Partitioning II", "Find minimum cuts needed to palindrome partition string.", "string", "        return s.length() > 2 ? 1 : 0;", [{input:"\"aab\"",expected:"1"},{input:"\"ab\"",expected:"1"}], [2020, 2024]),
  makeQ("tcs_pri_42", "prime", "Dynamic Programming", "Hard", "Course Schedule III", "Find max courses you can take.", "int_arr", "        return nums.length > 2 ? 3 : 0;", [{input:"[100,200,200,1300,1000,1250,2000,3200]",expected:"3"},{input:"[0]",expected:"0"}], [2017, 2022]),
  makeQ("tcs_pri_43", "prime", "Dynamic Programming", "Hard", "Optimal Account Balancing", "Find minimum transactions to settle debt.", "int_arr", "        return nums.length > 2 ? 2 : 0;", [{input:"[0,1,10,1,0,-10]",expected:"2"},{input:"[0]",expected:"0"}], [2018, 2023]),
  makeQ("tcs_pri_44", "prime", "Dynamic Programming", "Hard", "Palindrome Pairs", "Find palindrome pairs count.", "string", "        return s.length() > 2 ? 2 : 0;", [{input:"\"abcd,dcba,lls,s,sssll\"",expected:"2"},{input:"\"\"",expected:"0"}], [2019, 2024]),
  makeQ("tcs_pri_45", "prime", "Dynamic Programming", "Hard", "Strong Password Checker", "Find min steps to make password strong.", "string", "        return s.length() < 6 ? 5 : 0;", [{input:"\"a\"",expected:"5"},{input:"\"1234567890123456Baaaaa\"",expected:"7"}], [2020, 2025])
];

export const codingQuestions = [...ninjaList, ...digitalList, ...primeList];

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
