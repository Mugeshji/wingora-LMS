export const javaBasics = [
  {
    id: "variables-data-types",
    title: "Variables & Data Types",
    explanation: "Java is a statically-typed language, meaning all variables must be declared before they can be used. This involves specifying the variable's type and name. Java has two main categories of data types: Primitive Data Types (byte, short, int, long, float, double, boolean, char) which are predefined by the language and named by a reserved keyword, and Reference/Object Data Types (Strings, Arrays, Classes, Interfaces) which are created using defined constructors of the classes.",
    problems: [
      {
        id: "v1",
        title: "Primitive Range Checker",
        description: "Write a program that takes an integer inputs and determines the smallest primitive data type (byte, short, int, long) that can hold it.",
        starterTemplate: `public class Solution {
    public static String getSmallestType(long x) {
        // TODO: Return "byte", "short", "int", or "long"
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println("120 fits in: " + getSmallestType(120));
    }
}`,
        solution: `public class Solution {
    public static String getSmallestType(long x) {
        if (x >= Byte.MIN_VALUE && x <= Byte.MAX_VALUE) {
            return "byte";
        } else if (x >= Short.MIN_VALUE && x <= Short.MAX_VALUE) {
            return "short";
        } else if (x >= Integer.MIN_VALUE && x <= Integer.MAX_VALUE) {
            return "int";
        } else {
            return "long";
        }
    }
    
    public static void main(String[] args) {
        System.out.println("120 fits in: " + getSmallestType(120));
    }
}`,
        output: "120 fits in: byte",
        validationKeywords: ["Byte.MIN_VALUE", "Short.MIN_VALUE", "Integer.MIN_VALUE"],
        simulatedErrors: [
          "Compile Error: ';' expected at line 5. Did you forget a semicolon?",
          "Logic Error: Range checks are incorrect or incomplete."
        ]
      },
      {
        id: "v2",
        title: "Temperature Converter",
        description: "Convert a double value representing Fahrenheit to Celsius with double precision.",
        starterTemplate: `public class Solution {
    public static double fahrenheitToCelsius(double fahrenheit) {
        // TODO: Complete conversion logic
        return 0.0;
    }
}`,
        solution: `public class Solution {
    public static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32.0) * 5.0 / 9.0;
    }
}`,
        output: "37.0",
        validationKeywords: ["- 32.0", "* 5.0", "/ 9.0"],
        simulatedErrors: [
          "Compile Error: operator '*' cannot be applied to String, double",
          "Logic Error: Mathematical formula is missing double precision constants (e.g. 5.0 vs 5)."
        ]
      },
      {
        id: "v3",
        title: "Char ASCII Value",
        description: "Write a program to find the ASCII value of a given character, representing the widening primitive conversion.",
        starterTemplate: `public class Solution {
    public static int getAscii(char ch) {
        // TODO: cast character to integer
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int getAscii(char ch) {
        return (int) ch;
    }
}`,
        output: "65",
        validationKeywords: ["(int)"],
        simulatedErrors: [
          "Compile Error: Type mismatch: cannot convert from char to String",
          "Logic Error: Casting to integer type was missing or incorrect."
        ]
      },
      {
        id: "v4",
        title: "Boolean Toggle Simulator",
        description: "Given a state, toggle the boolean value without conditional statements.",
        starterTemplate: `public class Solution {
    public static boolean toggle(boolean state) {
        // TODO: Toggle state
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean toggle(boolean state) {
        return !state;
    }
}`,
        output: "false",
        validationKeywords: ["!"],
        simulatedErrors: [
          "Compile Error: unexpected token 'not'",
          "Logic Error: You must toggle the boolean value using the ! operator."
        ]
      },
      {
        id: "v5",
        title: "Type Promotion Evaluator",
        description: "Demonstrate automatic type promotion in expressions when performing arithmetic on byte and short values.",
        starterTemplate: `public class Solution {
    public static double promote(byte b, short s, double d) {
        // TODO: Return sum promoted to double
        return 0.0;
    }
}`,
        solution: `public class Solution {
    public static double promote(byte b, short s, double d) {
        return b + s + d;
    }
}`,
        output: "100.5",
        validationKeywords: ["b + s + d"],
        simulatedErrors: [
          "Compile Error: Incompatible types: possible lossy conversion from double to float",
          "Logic Error: Type promotion did not execute correctly."
        ]
      },
      {
        id: "v6",
        title: "Float vs Double Precision Check",
        description: "Show that double calculations preserve precision longer than single-precision floats in Java.",
        starterTemplate: `public class Solution {
    public static void main(String[] args) {
        float fVal = 0.1f * 7.0f;
        double dVal = 0.1 * 7.0;
        // TODO: Print both variables
    }
}`,
        solution: `public class Solution {
    public static void main(String[] args) {
        float fVal = 0.1f * 7.0f;
        double dVal = 0.1 * 7.0;
        System.out.println("Float: " + fVal + ", Double: " + dVal);
    }
}`,
        output: "Float: 0.7, Double: 0.7000000000000001",
        validationKeywords: ["fVal", "dVal", "System.out.println"],
        simulatedErrors: [
          "Compile Error: Type mismatch: cannot convert from double to float",
          "Logic Error: Float and double print statements were missing."
        ]
      },
      {
        id: "v7",
        title: "Long Integer Overflow Demo",
        description: "Show how an overflow occurs when using 'int' instead of 'long' to hold values above 2 billion.",
        starterTemplate: `public class Solution {
    public static long calculateLargeVal() {
        // TODO: Return 3 billion using standard long syntax
        return 0L;
    }
}`,
        solution: `public class Solution {
    public static long calculateLargeVal() {
        return 3000000000L;
    }
}`,
        output: "3000000000",
        validationKeywords: ["3000000000L"],
        simulatedErrors: [
          "Compile Error: Integer number too large: 3000000000. Did you forget the 'L' suffix?",
          "Logic Error: Suffix 'L' or 'l' was missing from the large value."
        ]
      },
      {
        id: "v8",
        title: "Static vs Instance Variable Scope",
        description: "Declare a static counter and an instance counter, demonstrating static persistence across objects.",
        starterTemplate: `class VariableScope {
    // TODO: Declare static count and instance count
}`,
        solution: `class VariableScope {
    public static int staticCount = 0;
    public int instanceCount = 0;
    public void increment() {
        staticCount++;
        instanceCount++;
    }
}`,
        output: "Success",
        validationKeywords: ["static int staticCount", "int instanceCount"],
        simulatedErrors: [
          "Compile Error: Cannot make a static reference to the non-static field instanceCount",
          "Logic Error: The static variable is not tracking globally."
        ]
      },
      {
        id: "v9",
        title: "Explicit Type Casting Checker",
        description: "Demonstrate explicit casting from a larger double variable to a narrow integer variable.",
        starterTemplate: `public class Solution {
    public static int castDouble(double val) {
        // TODO: Cast double val to int
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int castDouble(double val) {
        return (int) val;
    }
}`,
        output: "10",
        validationKeywords: ["(int)"],
        simulatedErrors: [
          "Compile Error: Type mismatch: cannot convert from double to int",
          "Logic Error: Explicit cast (int) was missing."
        ]
      },
      {
        id: "v10",
        title: "Final Constant Variable Security",
        description: "Declare a final constant value PI = 3.14159, demonstrating modification security.",
        starterTemplate: `public class Solution {
    // TODO: Declare public static final PI
}`,
        solution: `public class Solution {
    public static final double PI = 3.14159;
}`,
        output: "Success",
        validationKeywords: ["final double PI", "3.14159"],
        simulatedErrors: [
          "Compile Error: Modifier final not allowed here",
          "Logic Error: The final keyword is missing or incorrect."
        ]
      }
    ]
  },
  {
    id: "operators",
    title: "Operators",
    explanation: "Operators are symbols that perform operations on variables and values. Java provides multiple categories of operators: Arithmetic (+, -, *, /, %, ++, --) for mathematical calculations; Relational (==, !=, >, <, >=, <=) for comparisons; Logical (&&, ||, !) for logical conditions; and Bitwise (&, |, ^, ~, <<, >>, >>>) for manipulating individual bits of integer values.",
    problems: [
      {
        id: "op1",
        title: "Bitwise Swapper",
        description: "Swap two integer values without using a temporary variable, relying solely on Bitwise XOR.",
        starterTemplate: `public class Solution {
    public static void swap(int a, int b) {
        // TODO: Swap using bitwise XOR operator '^'
    }
}`,
        solution: `public class Solution {
    public static void swap(int a, int b) {
        a = a ^ b;
        b = a ^ b;
        a = a ^ b;
        System.out.println("a=" + a + ", b=" + b);
    }
}`,
        output: "a=25, b=12",
        validationKeywords: ["^"],
        simulatedErrors: [
          "Compile Error: operator '^' undefined for types int, String",
          "Logic Error: Swap logic did not correctly swap a and b using XOR."
        ]
      },
      {
        id: "op2",
        title: "Leap Year Ternary Operator",
        description: "Determine whether a year is a leap year using nested ternary operators instead of traditional if-else blocks.",
        starterTemplate: `public class Solution {
    public static boolean isLeapYear(int year) {
        // TODO: Complete using ternary operator '?'
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean isLeapYear(int year) {
        return (year % 4 == 0) ? ((year % 100 == 0) ? (year % 400 == 0) : true) : false;
    }
}`,
        output: "true",
        validationKeywords: ["?", ":"],
        simulatedErrors: [
          "Compile Error: ';' expected instead of ':'",
          "Logic Error: Ternary leap logic is missing centennial or quad-centennial leap checks."
        ]
      },
      {
        id: "op3",
        title: "Power of Two Checker",
        description: "Check if a number is a power of 2 using Bitwise operators in constant O(1) time complexity.",
        starterTemplate: `public class Solution {
    public static boolean isPowerOfTwo(int n) {
        // TODO: Bitwise O(1) checker
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
        output: "true",
        validationKeywords: ["&", "- 1"],
        simulatedErrors: [
          "Compile Error: operator '&' has incorrect precedence. Add brackets!",
          "Logic Error: Power-of-two check failed for negative inputs or zero."
        ]
      },
      {
        id: "op4",
        title: "Count Set Bits",
        description: "Find the number of set bits (1s) in the binary representation of an integer.",
        starterTemplate: `public class Solution {
    public static int countBits(int n) {
        // TODO: Count bits using dynamic bit operations
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int countBits(int n) {
        int count = 0;
        while (n > 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}`,
        output: "4",
        validationKeywords: ["& (n - 1)"],
        simulatedErrors: [
          "Compile Error: variable n might not have been initialized",
          "Logic Error: Infinite loop encountered. Make sure n moves toward 0."
        ]
      },
      {
        id: "op5",
        title: "Arithmetic Evaluator",
        description: "Evaluate expression precedence: static analysis of logical and comparison priorities.",
        starterTemplate: `public class Solution {
    public static boolean evaluate(int a, int b, int c) {
        // TODO: Return evaluation: a < b && ++c > 10 || b < c
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean evaluate(int a, int b, int c) {
        return a < b && ++c > 10 || b < c;
    }
}`,
        output: "true",
        validationKeywords: ["&&", "||", "++"],
        simulatedErrors: [
          "Compile Error: Operator priority collision. Parentheses might help.",
          "Logic Error: Boolean operators evaluate incorrectly."
        ]
      },
      {
        id: "op6",
        title: "Shift Left Multiplier",
        description: "Multiply a number by 8 using Bitwise shift operators instead of arithmetic multiplication.",
        starterTemplate: `public class Solution {
    public static int multiplyByEight(int n) {
        // TODO: Bitwise shift logic
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int multiplyByEight(int n) {
        return n << 3;
    }
}`,
        output: "40",
        validationKeywords: ["<< 3"],
        simulatedErrors: [
          "Compile Error: operator '<<' needs integer operands",
          "Logic Error: Shift operation value should be << 3 to multiply by 8."
        ]
      },
      {
        id: "op7",
        title: "Logical Short-Circuit Evaluator",
        description: "Demonstrate that the right side of a logical double-AND (&&) operator is never executed if the left side evaluates to false.",
        starterTemplate: `public class Solution {
    public static void main(String[] args) {
        int val = 10;
        boolean result = (val > 20) && (++val < 30);
        // TODO: Print val and result
    }
}`,
        solution: `public class Solution {
    public static void main(String[] args) {
        int val = 10;
        boolean result = (val > 20) && (++val < 30);
        System.out.println("Result: " + result + ", Val: " + val);
    }
}`,
        output: "Result: false, Val: 10",
        validationKeywords: ["&&", "++val"],
        simulatedErrors: [
          "Compile Error: unreachable code in expression",
          "Logic Error: Increment operation executed, indicating short-circuit failed (did you use single '&'?)."
        ]
      },
      {
        id: "op8",
        title: "Relational Equality Check",
        description: "Compare primitive floating numbers using small threshold epsilons instead of simple logical double-equals (==).",
        starterTemplate: `public class Solution {
    public static boolean checkEquality(double a, double b) {
        // TODO: Return if difference is below 0.00001
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean checkEquality(double a, double b) {
        return Math.abs(a - b) < 0.00001;
    }
}`,
        output: "true",
        validationKeywords: ["Math.abs", "< 0.00001"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class abs in Math",
          "Logic Error: Double numbers cannot be checked reliably with == due to floating rounding."
        ]
      },
      {
        id: "op9",
        title: "Modulo Pattern Matcher",
        description: "Extract the last digit of an arbitrary positive integer using mathematical division operators.",
        starterTemplate: `public class Solution {
    public static int lastDigit(int num) {
        // TODO: Modulo operation
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int lastDigit(int num) {
        return num % 10;
    }
}`,
        output: "7",
        validationKeywords: ["% 10"],
        simulatedErrors: [
          "Compile Error: operator '%' division by zero",
          "Logic Error: The modulo operator is not used correctly."
        ]
      },
      {
        id: "op10",
        title: "Unary Operator Progression",
        description: "Predict the final value of variable 'x' after complex incremental and decremental unary operations.",
        starterTemplate: `public class Solution {
    public static int evaluateUnary() {
        int x = 5;
        // TODO: evaluate: x++ + ++x - x--
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int evaluateUnary() {
        int x = 5;
        return x++ + ++x - x--;
    }
}`,
        output: "7",
        validationKeywords: ["x++", "++x", "x--"],
        simulatedErrors: [
          "Compile Error: Invalid assignment operator at ++",
          "Logic Error: Evaluation did not return 7. Check operation orders carefully."
        ]
      }
    ]
  },
  {
    id: "conditional-statements",
    title: "Conditional Statements",
    explanation: "Conditional statements control the execution path of a program based on specific boolean criteria. Java supports 'if', 'else if', 'else', and 'switch' statements. Switch statements have evolved in recent Java versions to include switch expressions, arrow syntaxes, and multi-constant blocks, which prevent standard fall-through issues.",
    problems: [
      {
        id: "cs1",
        title: "Calculator with Modern Switch",
        description: "Write a simple calculator using the modern Java switch expression returning the arithmetic result.",
        starterTemplate: `public class Solution {
    public static double calculate(double x, double y, char operator) {
        // TODO: Use switch expressions (->)
        return 0.0;
    }
}`,
        solution: `public class Solution {
    public static double calculate(double x, double y, char operator) {
        return switch (operator) {
            case '+' -> x + y;
            case '-' -> x - y;
            case '*' -> x * y;
            case '/' -> {
                if (y == 0) throw new ArithmeticException("Division by zero!");
                yield x / y;
            }
            default -> throw new IllegalArgumentException("Unknown operator: " + operator);
        };
    }
}`,
        output: "5.0",
        validationKeywords: ["switch (operator)", "case '+' ->", "yield"],
        simulatedErrors: [
          "Compile Error: switch expressions require arrows (->) or standard syntax",
          "Logic Error: Division by zero case throws wrong or empty exception."
        ]
      },
      {
        id: "cs2",
        title: "Quadratic Equation Solver",
        description: "Find the roots of a quadratic equation (ax^2 + bx + c = 0) based on positive, zero, or negative discriminant values.",
        starterTemplate: `public class Solution {
    public static void solveRoots(double a, double b, double c) {
        // TODO: Complete quadratic formula
    }
}`,
        solution: `public class Solution {
    public static void solveRoots(double a, double b, double c) {
        double d = b * b - 4 * a * c;
        if (d > 0) {
            double r1 = (-b + Math.sqrt(d)) / (2 * a);
            double r2 = (-b - Math.sqrt(d)) / (2 * a);
            System.out.println("Distinct: " + r1 + ", " + r2);
        } else if (d == 0) {
            double r = -b / (2 * a);
            System.out.println("Equal: " + r);
        } else {
            System.out.println("Complex");
        }
    }
}`,
        output: "Distinct: 3.0, 2.0",
        validationKeywords: ["b * b - 4 * a * c", "Math.sqrt"],
        simulatedErrors: [
          "Compile Error: Math.sqrt cannot be applied on complex discriminant",
          "Logic Error: The discriminant formula does not account for d == 0."
        ]
      },
      {
        id: "cs3",
        title: "Tax Bracket Calculator",
        description: "Calculate progressive income tax based on brackets: 10% up to $10k, 15% up to $50k, 25% for values above $50k.",
        starterTemplate: `public class Solution {
    public static double computeTax(double income) {
        // TODO: calculate bracket logic
        return 0.0;
    }
}`,
        solution: `public class Solution {
    public static double computeTax(double income) {
        double tax = 0;
        if (income <= 10000) {
            tax = income * 0.10;
        } else if (income <= 50000) {
            tax = (10000 * 0.10) + ((income - 10000) * 0.15);
        } else {
            tax = (10000 * 0.10) + (40000 * 0.15) + ((income - 50000) * 0.25);
        }
        return tax;
    }
}`,
        output: "10750.0",
        validationKeywords: ["if (income <=", "else if"],
        simulatedErrors: [
          "Compile Error: else without if block match at line 8",
          "Logic Error: Bracket deductions are flat rather than progressive."
        ]
      },
      {
        id: "cs4",
        title: "Vowel / Consonant Tester",
        description: "Write a short module testing if a character is a vowel or consonant, including validation checks for non-alphabets.",
        starterTemplate: `public class Solution {
    public static String testChar(char ch) {
        // TODO: test character
        return "";
    }
}`,
        solution: `public class Solution {
    public static String testChar(char ch) {
        if (!Character.isLetter(ch)) return "Invalid";
        char lower = Character.toLowerCase(ch);
        return switch(lower) {
            case 'a', 'e', 'i', 'o', 'u' -> "Vowel";
            default -> "Consonant";
        };
    }
}`,
        output: "Vowel",
        validationKeywords: ["!Character.isLetter", "case 'a', 'e'"],
        simulatedErrors: [
          "Compile Error: case labels require unique constant values",
          "Logic Error: Character check fails to sanitize upper-case letters."
        ]
      },
      {
        id: "cs5",
        title: "BMICategory Calculator",
        description: "Evaluate weight and height using floating scale values representing BMI indices.",
        starterTemplate: `public class Solution {
    public static String getCategory(double weightKg, double heightM) {
        // TODO: Calculate BMI = weightKg / (heightM * heightM)
        return "";
    }
}`,
        solution: `public class Solution {
    public static String getCategory(double weightKg, double heightM) {
        double bmi = weightKg / (heightM * heightM);
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25.0) return "Normal";
        if (bmi < 30.0) return "Overweight";
        return "Obese";
    }
}`,
        output: "Normal",
        validationKeywords: ["weightKg / (heightM * heightM)", "bmi < 18.5"],
        simulatedErrors: [
          "Compile Error: division by zero checks not validated",
          "Logic Error: BMI bounds calculations are mismatched."
        ]
      },
      {
        id: "cs6",
        title: "Grade Range Classifier",
        description: "Use conditional branches to map score values to letters (A for >=90, B for >=80, C for >=70, F otherwise).",
        starterTemplate: `public class Solution {
    public static char getGrade(int score) {
        // TODO: Return letter grade
        return 'F';
    }
}`,
        solution: `public class Solution {
    public static char getGrade(int score) {
        if (score >= 90) return 'A';
        else if (score >= 80) return 'B';
        else if (score >= 70) return 'C';
        else return 'F';
    }
}`,
        output: "B",
        validationKeywords: ["score >= 90", "score >= 80"],
        simulatedErrors: [
          "Compile Error: return type missing from path",
          "Logic Error: Grade classification ranges have overlapping boundaries."
        ]
      },
      {
        id: "cs7",
        title: "Nested If Triangle Type",
        description: "Given three lengths, classify if they form an Equilateral, Isosceles, or Scalene triangle.",
        starterTemplate: `public class Solution {
    public static String getTriangleType(int a, int b, int c) {
        // TODO: Tri-side classifications
        return "";
    }
}`,
        solution: `public class Solution {
    public static String getTriangleType(int a, int b, int c) {
        if (a <= 0 || b <= 0 || c <= 0) return "Invalid";
        if (a == b && b == c) return "Equilateral";
        if (a == b || b == c || a == c) return "Isosceles";
        return "Scalene";
    }
}`,
        output: "Isosceles",
        validationKeywords: ["a == b", "b == c", "a == c"],
        simulatedErrors: [
          "Compile Error: invalid syntax: a == b == c",
          "Logic Error: Classifications fail to validate basic side length properties."
        ]
      },
      {
        id: "cs8",
        title: "Switch Arrow Yield Return",
        description: "Write a modern switch expression yielding string descriptions based on standard HTTP status codes.",
        starterTemplate: `public class Solution {
    public static String getHttpStatus(int code) {
        // TODO: Switch expression yielding response
        return "";
    }
}`,
        solution: `public class Solution {
    public static String getHttpStatus(int code) {
        return switch (code) {
            case 200 -> "OK";
            case 404 -> "Not Found";
            case 500 -> "Server Error";
            default -> "Unknown";
        };
    }
}`,
        output: "Not Found",
        validationKeywords: ["switch (code)", "case 200 ->"],
        simulatedErrors: [
          "Compile Error: arrow switch syntax (->) is not supported in legacy compilers",
          "Logic Error: Switch fails to process the default code case."
        ]
      },
      {
        id: "cs9",
        title: "Days in Month Leap Handler",
        description: "Get the count of days in a month (1-12) for a specified year, incorporating leap year checks.",
        starterTemplate: `public class Solution {
    public static int getDays(int month, int year) {
        // TODO: Return count
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int getDays(int month, int year) {
        return switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 29 : 28;
            default -> 0;
        };
    }
}`,
        output: "29",
        validationKeywords: ["case 1, 3, 5", "case 2 ->"],
        simulatedErrors: [
          "Compile Error: duplicate case label value",
          "Logic Error: Leap year validation is not checking correct centennial divisions."
        ]
      },
      {
        id: "cs10",
        title: "Ternary Max of Three",
        description: "Return the maximum of three integers using inline ternary operators instead of if statements.",
        starterTemplate: `public class Solution {
    public static int maxOfThree(int a, int b, int c) {
        // TODO: Inline ternary comparisons
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int maxOfThree(int a, int b, int c) {
        return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
    }
}`,
        output: "30",
        validationKeywords: ["?" , ":"],
        simulatedErrors: [
          "Compile Error: invalid operator match in ternary chain",
          "Logic Error: Evaluator does not compare all three sides correctly."
        ]
      }
    ]
  },
  {
    id: "loops",
    title: "Loops",
    explanation: "Loops are control structures used to repeatedly execute a block of code as long as a condition is satisfied. Java supports three basic loop statements: 'for' loops (perfect for iteration when the count is predefined), 'while' loops (ideal for conditional iteration when the bounds are unknown), and 'do-while' loops (which guarantee the block of code executes at least once). High-performance looping patterns leverage keywords like 'break' and 'continue' to skip iterations or terminate early.",
    problems: [
      {
        id: "l1",
        title: "Fibonacci Sequence Generator",
        description: "Write a program that prints the first N Fibonacci numbers in sequence using simple iterative looping.",
        starterTemplate: `public class Solution {
    public static void printFibonacci(int n) {
        // TODO: Loop to compute fibonacci sequence
    }
}`,
        solution: `public class Solution {
    public static void printFibonacci(int n) {
        int a = 0, b = 1;
        System.out.print(a + " " + b + " ");
        for (int i = 2; i < n; i++) {
            int next = a + b;
            System.out.print(next + " ");
            a = b;
            b = next;
        }
    }
}`,
        output: "0 1 1 2 3 5 8 13 ",
        validationKeywords: ["for", "a + b"],
        simulatedErrors: [
          "Compile Error: variable next might not have been declared",
          "Logic Error: Loop bounds start offset is incorrect."
        ]
      },
      {
        id: "l2",
        title: "Collatz Conjecture Simulator",
        description: "Compute the series of Collatz loops where odd numbers follow 3n + 1 and even numbers follow n/2, counting the steps to reach 1.",
        starterTemplate: `public class Solution {
    public static int collatzSteps(int n) {
        // TODO: while loop counting steps
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int collatzSteps(int n) {
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) n = n / 2;
            else n = 3 * n + 1;
            steps++;
        }
        return steps;
    }
}`,
        output: "8",
        validationKeywords: ["while (n !=", "n % 2 == 0", "steps++"],
        simulatedErrors: [
          "Compile Error: variable steps has not been initialized",
          "Logic Error: Loop runs infinitely because n is not modified."
        ]
      },
      {
        id: "l3",
        title: "Armstrong Number Checker",
        description: "Use loops to extract each digit of a number, raising it to the power of the length to check for an Armstrong match.",
        starterTemplate: `public class Solution {
    public static boolean isArmstrong(int n) {
        // TODO: Extract digit sum powers
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean isArmstrong(int n) {
        int original = n;
        int digits = String.valueOf(n).length();
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += Math.pow(digit, digits);
            n /= 10;
        }
        return sum == original;
    }
}`,
        output: "true",
        validationKeywords: ["while (n > 0)", "n % 10", "Math.pow"],
        simulatedErrors: [
          "Compile Error: Math.pow arguments must be doubles",
          "Logic Error: Variable original tracking got corrupted by modifying loop."
        ]
      },
      {
        id: "l4",
        title: "Prime Number Finder",
        description: "Write a program that prints all prime numbers between a range (Low to High) using optimized square-root iteration.",
        starterTemplate: `public class Solution {
    public static boolean isPrime(int n) {
        // TODO: Optimised prime checking
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}`,
        output: "true",
        validationKeywords: ["for (int i = 2", "i * i <= n", "n % i == 0"],
        simulatedErrors: [
          "Compile Error: invalid operator logic inside prime loop",
          "Logic Error: Square root bound is not checked recursively (use i * i <= n)."
        ]
      },
      {
        id: "l5",
        title: "Pattern Printing",
        description: "Create a program printing a pyramid pattern using nested loops based on input row dimensions.",
        starterTemplate: `public class Solution {
    public static void drawPyramid(int rows) {
        // TODO: Nested loops printing spaces and asterisks
    }
}`,
        solution: `public class Solution {
    public static void drawPyramid(int rows) {
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= rows - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        output: "   *\n  ***\n *****\n*******",
        validationKeywords: ["for (int i", "rows - i", "2 * i - 1"],
        simulatedErrors: [
          "Compile Error: nested loop identifier variables must be unique",
          "Logic Error: Pyramid prints with misaligned offset spacing."
        ]
      },
      {
        id: "l6",
        title: "GCD Iterative Solver",
        description: "Compute the Greatest Common Divisor of two integers iteratively using Euclid's modular loops.",
        starterTemplate: `public class Solution {
    public static int getGcd(int a, int b) {
        // TODO: while modular loop
        return 1;
    }
}`,
        solution: `public class Solution {
    public static int getGcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}`,
        output: "6",
        validationKeywords: ["while (b !=", "a % b"],
        simulatedErrors: [
          "Compile Error: variable temp declared twice in parent scope",
          "Logic Error: Shift operation order caused value corruption."
        ]
      },
      {
        id: "l7",
        title: "Sum of Digits Loop",
        description: "Compute the sum of all individual digits inside an integer using mathematical divisions.",
        starterTemplate: `public class Solution {
    public static int sumDigits(int num) {
        // TODO: Extract digit sum
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int sumDigits(int num) {
        int sum = 0;
        while (num != 0) {
            sum += Math.abs(num % 10);
            num /= 10;
        }
        return sum;
    }
}`,
        output: "15",
        validationKeywords: ["while (num", "num % 10", "num /= 10"],
        simulatedErrors: [
          "Compile Error: division by zero checks not validated",
          "Logic Error: Failure to account for negative integers."
        ]
      },
      {
        id: "l8",
        title: "Nested Multiplier Table",
        description: "Print a grid representing a multiplication table up to N x N using nested loops.",
        starterTemplate: `public class Solution {
    public static void printTable(int n) {
        // TODO: nested loops printing grid
    }
}`,
        solution: `public class Solution {
    public static void printTable(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.print((i * j) + " ");
            }
            System.out.println();
        }
    }
}`,
        output: "1 2 \n2 4 \n",
        validationKeywords: ["for (int i", "for (int j", "i * j"],
        simulatedErrors: [
          "Compile Error: index check error on inner loop",
          "Logic Error: Multiplication bounds fail to output a symmetric grid."
        ]
      },
      {
        id: "l9",
        title: "Continue Skip Evens",
        description: "Calculate the sum of odd numbers between 1 and N, using the 'continue' keyword to skip even numbers.",
        starterTemplate: `public class Solution {
    public static int sumOdds(int n) {
        // TODO: loop using 'continue' keyword
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int sumOdds(int n) {
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            if (i % 2 == 0) continue;
            sum += i;
        }
        return sum;
    }
}`,
        output: "9",
        validationKeywords: ["continue", "i % 2 == 0"],
        simulatedErrors: [
          "Compile Error: continue statement outside loop boundaries",
          "Logic Error: The program sums up even values instead of skipping."
        ]
      },
      {
        id: "l10",
        title: "Infinite Loop Break Escape",
        description: "Sum up positive integers starting from 1 sequentially inside a 'while(true)' infinite loop, escaping via 'break' when the sum exceeds 100.",
        starterTemplate: `public class Solution {
    public static int sumToHundred() {
        // TODO: while(true) loop with break statement
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int sumToHundred() {
        int sum = 0;
        int i = 1;
        while (true) {
            sum += i;
            if (sum > 100) break;
            i++;
        }
        return sum;
    }
}`,
        output: "105",
        validationKeywords: ["while (true)", "break", "sum > 100"],
        simulatedErrors: [
          "Compile Error: unreachable statement at line 12",
          "Logic Error: Break check never triggers, leading to infinite loop execution."
        ]
      }
    ]
  },
  {
    id: "arrays",
    title: "Arrays",
    explanation: "An array is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created, and cannot be resized. Java supports 1D arrays and multidimensional arrays (which are actually arrays of arrays, allowing for staggered or jagged sizes). Processing multidimensional arrays requires deep understanding of nested iteration structures.",
    problems: [
      {
        id: "a1",
        title: "Rotate Array",
        description: "Given a 1D array of integers, rotate it to the right by K steps in-place with O(1) space complexity.",
        starterTemplate: `public class Solution {
    public static void rotate(int[] nums, int k) {
        // TODO: In-place array rotation
    }
}`,
        solution: `public class Solution {
    public static void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++; end--;
        }
    }
}`,
        output: "Success",
        validationKeywords: ["reverse", "k %= nums.length"],
        simulatedErrors: [
          "Compile Error: helper method reverse must be declared static",
          "Logic Error: Index Out of Bounds occurred because k was not modulated (k %= length)."
        ]
      },
      {
        id: "a2",
        title: "Matrix Multiplication",
        description: "Perform arithmetic multiplication on two 2D matrices, ensuring dimensions align, throwing exceptions if mismatched.",
        starterTemplate: `public class Solution {
    public static int[][] multiply(int[][] A, int[][] B) {
        // TODO: Multi-layer matrix multiplications
        return null;
    }
}`,
        solution: `public class Solution {
    public static int[][] multiply(int[][] A, int[][] B) {
        int r1 = A.length, c1 = A[0].length;
        int r2 = B.length, c2 = B[0].length;
        if (c1 != r2) throw new IllegalArgumentException("Invalid dimensions");
        int[][] C = new int[r1][c2];
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                for (int k = 0; k < c1; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }
}`,
        output: "Success",
        validationKeywords: ["C[i][j] += A[i][k] * B[k][j]", "A[0].length"],
        simulatedErrors: [
          "Compile Error: Array dimensions are not defined on initialization",
          "Logic Error: Loop bounds are mismatched, triggering index out of range."
        ]
      },
      {
        id: "a3",
        title: "Find Duplicate Elements",
        description: "Find duplicate entries in a 1D array using single traversal and marking operations.",
        starterTemplate: `import java.util.HashSet;
public class Solution {
    public static HashSet<Integer> findDuplicates(int[] arr) {
        // TODO: return set containing duplicate numbers
        return null;
    }
}`,
        solution: `import java.util.HashSet;
public class Solution {
    public static HashSet<Integer> findDuplicates(int[] arr) {
        HashSet<Integer> seen = new HashSet<>();
        HashSet<Integer> dups = new HashSet<>();
        for (int n : arr) {
            if (!seen.add(n)) {
                dups.add(n);
            }
        }
        return dups;
    }
}`,
        output: "Success",
        validationKeywords: ["seen.add", "dups.add"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class HashSet. Add imports!",
          "Logic Error: Single items are mistakenly tagged as duplicates."
        ]
      },
      {
        id: "a4",
        title: "Transpose of a Matrix",
        description: "Transpose an arbitrary row-by-column 2D matrix, swapping rows and columns.",
        starterTemplate: `public class Solution {
    public static int[][] transpose(int[][] matrix) {
        // TODO: Swap matrix rows and columns
        return null;
    }
}`,
        solution: `public class Solution {
    public static int[][] transpose(int[][] matrix) {
        int r = matrix.length, c = matrix[0].length;
        int[][] t = new int[c][r];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                t[j][i] = matrix[i][j];
            }
        }
        return t;
    }
}`,
        output: "Success",
        validationKeywords: ["t[j][i] = matrix[i][j]"],
        simulatedErrors: [
          "Compile Error: subscript indices require nested structures",
          "Logic Error: Matrix index is out of bounds due to static cell transpositions."
        ]
      },
      {
        id: "a5",
        title: "Jagged Array Constructor",
        description: "Create and populate a jagged 2D array where each row matches step size indices representing basic pascal triangles.",
        starterTemplate: `public class Solution {
    public static int[][] makeJagged(int rows) {
        // TODO: Jagged array configuration
        return null;
    }
}`,
        solution: `public class Solution {
    public static int[][] makeJagged(int rows) {
        int[][] jagged = new int[rows][];
        for (int i = 0; i < rows; i++) {
            jagged[i] = new int[i + 1];
            for (int j = 0; j <= i; j++) {
                jagged[i][j] = i + j;
            }
        }
        return jagged;
    }
}`,
        output: "Success",
        validationKeywords: ["new int[rows][]", "jagged[i] = new int"],
        simulatedErrors: [
          "Compile Error: cannot initialize multi-dimension arrays without dimensions",
          "Logic Error: Jagged array rows are initialized with equal, non-variable bounds."
        ]
      },
      {
        id: "a6",
        title: "Max & Min Element Finder",
        description: "Scan a 1D integer array to locate the maximum and minimum elements in a single pass.",
        starterTemplate: `public class Solution {
    public static void printMinMax(int[] arr) {
        // TODO: single-pass search
    }
}`,
        solution: `public class Solution {
    public static void printMinMax(int[] arr) {
        if (arr == null || arr.length == 0) return;
        int min = arr[0], max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
            if (arr[i] > max) max = arr[i];
        }
        System.out.println("Min: " + min + ", Max: " + max);
    }
}`,
        output: "Min: 1, Max: 10",
        validationKeywords: ["int min = arr[0]", "arr[i] < min", "arr[i] > max"],
        simulatedErrors: [
          "Compile Error: variable min might not have been declared",
          "Logic Error: Initializing max and min variables to 0 causes bugs with negative array inputs."
        ]
      },
      {
        id: "a7",
        title: "Reverse Array In-Place",
        description: "Reverse all elements of a 1D integer array in-place, without allocating helper array memory blocks.",
        starterTemplate: `public class Solution {
    public static void reverse(int[] arr) {
        // TODO: Two-pointer swapping loop
    }
}`,
        solution: `public class Solution {
    public static void reverse(int[] arr) {
        int start = 0, end = arr.length - 1;
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++; end--;
        }
    }
}`,
        output: "Success",
        validationKeywords: ["start < end", "start++", "end--"],
        simulatedErrors: [
          "Compile Error: variable temp declared outside block is inaccessible",
          "Logic Error: Swapping index calculation is off-by-one."
        ]
      },
      {
        id: "a8",
        title: "Second Largest Element Scanner",
        description: "Find the second largest integer in a 1D array in a single traversal pass.",
        starterTemplate: `public class Solution {
    public static int getSecondLargest(int[] arr) {
        // TODO: single-pass scanner
        return -1;
    }
}`,
        solution: `public class Solution {
    public static int getSecondLargest(int[] arr) {
        int largest = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int n : arr) {
            if (n > largest) {
                second = largest;
                largest = n;
            } else if (n > second && n != largest) {
                second = n;
            }
        }
        return second;
    }
}`,
        output: "8",
        validationKeywords: ["Integer.MIN_VALUE", "second = largest", "n != largest"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class MIN_VALUE in Integer",
          "Logic Error: Scanning does not filter duplicate values when updating second."
        ]
      },
      {
        id: "a9",
        title: "Merge Two Sorted Arrays",
        description: "Merge two sorted integer arrays into a single, combined sorted array in O(N + M) runtime.",
        starterTemplate: `public class Solution {
    public static int[] merge(int[] A, int[] B) {
        // TODO: Two-pointer merge algorithm
        return null;
    }
}`,
        solution: `public class Solution {
    public static int[] merge(int[] A, int[] B) {
        int[] C = new int[A.length + B.length];
        int i = 0, j = 0, k = 0;
        while (i < A.length && j < B.length) {
            if (A[i] < B[j]) C[k++] = A[i++];
            else C[k++] = B[j++];
        }
        while (i < A.length) C[k++] = A[i++];
        while (j < B.length) C[k++] = B[j++];
        return C;
    }
}`,
        output: "Success",
        validationKeywords: ["C[k++] = A[i++]", "A.length", "B.length"],
        simulatedErrors: [
          "Compile Error: incompatible types when matching index counts",
          "Logic Error: Remainder merge arrays loops are omitted."
        ]
      },
      {
        id: "a10",
        title: "Subarray with Given Sum",
        description: "Locate a contiguous subarray inside an array of positive integers that sums to a specific target.",
        starterTemplate: `public class Solution {
    public static void findSubarray(int[] arr, int target) {
        // TODO: Sliding window algorithm
    }
}`,
        solution: `public class Solution {
    public static void findSubarray(int[] arr, int target) {
        int sum = 0, start = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
            while (sum > target && start < i) {
                sum -= arr[start++];
            }
            if (sum == target) {
                System.out.println("Range: " + start + " to " + i);
                return;
            }
        }
    }
}`,
        output: "Range: 1 to 3",
        validationKeywords: ["sum += arr[i]", "sum > target", "sum == target"],
        simulatedErrors: [
          "Compile Error: slider loops requires double index assignments",
          "Logic Error: Subarray index tracking is incorrect (sliding window boundary shifts)."
        ]
      }
    ]
  },
  {
    id: "strings",
    title: "Strings",
    explanation: "In Java, a String is an object that represents a sequence of char values. String objects are immutable, meaning they cannot be modified after creation; operations that seem to alter a String actually return a brand new String object. This immutability supports the String Pool (optimizing memory allocations). For scenarios requiring intensive modifications, StringBuilder or StringBuffer are used to allow mutable character sequences without heap overhead.",
    problems: [
      {
        id: "str1",
        title: "String Anagrams Checker",
        description: "Determine if two strings are anagrams of each other, disregarding casing differences.",
        starterTemplate: `import java.util.Arrays;
public class Solution {
    public static boolean areAnagrams(String s1, String s2) {
        // TODO: Anagrams checker logic
        return false;
    }
}`,
        solution: `import java.util.Arrays;
public class Solution {
    public static boolean areAnagrams(String s1, String s2) {
        String clean1 = s1.replaceAll("\\\\s", "").toLowerCase();
        String clean2 = s2.replaceAll("\\\\s", "").toLowerCase();
        if (clean1.length() != clean2.length()) return false;
        char[] c1 = clean1.toCharArray();
        char[] c2 = clean2.toCharArray();
        Arrays.sort(c1); Arrays.sort(c2);
        return Arrays.equals(c1, c2);
    }
}`,
        output: "true",
        validationKeywords: ["Arrays.sort", "Arrays.equals"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class Arrays in Java.util",
          "Logic Error: Space characters or uppercase letters cause incorrect comparisons."
        ]
      },
      {
        id: "str2",
        title: "Reverse with StringBuilder",
        description: "Reverse a sentence word-by-word (e.g., 'Hello World' -> 'World Hello') using StringBuilder.",
        starterTemplate: `public class Solution {
    public static String reverseWords(String s) {
        // TODO: Reverse word arrangements
        return "";
    }
}`,
        solution: `public class Solution {
    public static String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }
}`,
        output: "fun super is Java",
        validationKeywords: ["split", "StringBuilder", "append"],
        simulatedErrors: [
          "Compile Error: constructor StringBuilder in class cannot be applied to target type",
          "Logic Error: Word strings are separated by incorrect delimiter formatting."
        ]
      },
      {
        id: "str3",
        title: "Longest Common Prefix",
        description: "Find the longest common prefix among an array of strings.",
        starterTemplate: `public class Solution {
    public static String longestPrefix(String[] strs) {
        // TODO: Common prefix finder
        return "";
    }
}`,
        solution: `public class Solution {
    public static String longestPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
        output: "fl",
        validationKeywords: ["indexOf(prefix)", "substring"],
        simulatedErrors: [
          "Compile Error: variable prefix might not have been declared",
          "Logic Error: Substring parameters are negative or index values exceed limits."
        ]
      },
      {
        id: "str4",
        title: "First Non-Repeating Character",
        description: "Locate the first non-repeating character in a string using single frequency scan structures.",
        starterTemplate: `public class Solution {
    public static char firstNonRepeated(String s) {
        // TODO: Find first non-repeating char
        return '\\0';
    }
}`,
        solution: `public class Solution {
    public static char firstNonRepeated(String s) {
        int[] freq = new int[256];
        for (char ch : s.toCharArray()) freq[ch]++;
        for (char ch : s.toCharArray()) {
            if (freq[ch] == 1) return ch;
        }
        return '\\0';
    }
}`,
        output: "w",
        validationKeywords: ["freq[ch]++", "freq[ch] == 1"],
        simulatedErrors: [
          "Compile Error: subscript indices require integer types",
          "Logic Error: The scanner did not execute correctly for duplicate values."
        ]
      },
      {
        id: "str5",
        title: "String Compression Converter",
        description: "Perform basic string compression using the counts of repeated characters (e.g. 'aabcccccaaa' -> 'a2b1c5a3').",
        starterTemplate: `public class Solution {
    public static String compress(String str) {
        // TODO: Run-length compression logic
        return "";
    }
}`,
        solution: `public class Solution {
    public static String compress(String str) {
        StringBuilder sb = new StringBuilder();
        int count = 0;
        for (int i = 0; i < str.length(); i++) {
            count++;
            if (i + 1 >= str.length() || str.charAt(i) != str.charAt(i + 1)) {
                sb.append(str.charAt(i)).append(count);
                count = 0;
            }
        }
        return sb.length() < str.length() ? sb.toString() : str;
    }
}`,
        output: "a2b1c5a3",
        validationKeywords: ["charAt(i)", "append", "sb.length()"],
        simulatedErrors: [
          "Compile Error: variable count is undeclared in block scope",
          "Logic Error: Result is returned in non-compressed, unaltered format."
        ]
      },
      {
        id: "str6",
        title: "Palindrome String Matcher",
        description: "Verify if an input string is a palindrome, ignoring non-alphanumeric characters and casing.",
        starterTemplate: `public class Solution {
    public static boolean isPalindrome(String s) {
        // TODO: Two-pointer match logic
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
            while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
            if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;
            i++; j--;
        }
        return true;
    }
}`,
        output: "true",
        validationKeywords: ["isLetterOrDigit", "toLowerCase", "charAt"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class letterOrDigit in Character",
          "Logic Error: Special characters cause false positive triggers."
        ]
      },
      {
        id: "str7",
        title: "Count Vowels & Consonants",
        description: "Count the number of vowels and consonants in a string.",
        starterTemplate: `public class Solution {
    public static void countVowelsConsonants(String s) {
        // TODO: Print vowels and consonants count
    }
}`,
        solution: `public class Solution {
    public static void countVowelsConsonants(String s) {
        int v = 0, c = 0;
        for (char ch : s.toLowerCase().toCharArray()) {
            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') v++;
                else c++;
            }
        }
        System.out.println("Vowels: " + v + ", Consonants: " + c);
    }
}`,
        output: "Vowels: 3, Consonants: 4",
        validationKeywords: ["toCharArray", "ch == 'a'", "v++"],
        simulatedErrors: [
          "Compile Error: operator '==' cannot compare String type and char",
          "Logic Error: Whitespace and punctuation characters are incorrectly incremented as consonants."
        ]
      },
      {
        id: "str8",
        title: "Substring Finder Manual Scan",
        description: "Implement Java's string `indexOf` manually to locate the start index of a target substring without using built-in search functions.",
        starterTemplate: `public class Solution {
    public static int search(String text, String pat) {
        // TODO: Manual matching logic
        return -1;
    }
}`,
        solution: `public class Solution {
    public static int search(String text, String pat) {
        int n = text.length(), m = pat.length();
        for (int i = 0; i <= n - m; i++) {
            int j;
            for (j = 0; j < m; j++) {
                if (text.charAt(i + j) != pat.charAt(j)) break;
            }
            if (j == m) return i;
        }
        return -1;
    }
}`,
        output: "2",
        validationKeywords: ["charAt(i + j)", "charAt(j)", "return i"],
        simulatedErrors: [
          "Compile Error: loop indices are off-bounds on empty strings",
          "Logic Error: Match returns negative index instead of true position."
        ]
      },
      {
        id: "str9",
        title: "Rotation of String Checker",
        description: "Determine if a string is a valid rotation of another (e.g. 'waterbottle' is a rotation of 'erbottlewat').",
        starterTemplate: `public class Solution {
    public static boolean isRotation(String s1, String s2) {
        // TODO: check rotation properties
        return false;
    }
}`,
        solution: `public class Solution {
    public static boolean isRotation(String s1, String s2) {
        return s1.length() == s2.length() && (s1 + s1).contains(s2);
    }
}`,
        output: "true",
        validationKeywords: ["s1.length()", "s1 + s1", "contains"],
        simulatedErrors: [
          "Compile Error: method contains undefined for target object",
          "Logic Error: Substring length checks are missing."
        ]
      },
      {
        id: "str10",
        title: "String Joiner Delimiter",
        description: "Join an array of words with a target delimiter using a StringBuilder.",
        starterTemplate: `public class Solution {
    public static String join(String[] words, String delim) {
        // TODO: join words
        return "";
    }
}`,
        solution: `public class Solution {
    public static String join(String[] words, String delim) {
        if (words == null || words.length == 0) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            sb.append(words[i]);
            if (i < words.length - 1) sb.append(delim);
        }
        return sb.toString();
    }
}`,
        output: "Java,React,CSS",
        validationKeywords: ["StringBuilder", "append(delim)", "words.length - 1"],
        simulatedErrors: [
          "Compile Error: cannot append dynamic delim string to sb object type",
          "Logic Error: Trailing delimiter remains at the end of the returned string."
        ]
      }
    ]
  },
  {
    id: "methods-functions",
    title: "Methods & Functions",
    explanation: "A method is a block of code which only runs when it is called. You can pass data, known as parameters, into a method. Methods are used to perform certain actions, and they are also known as functions. Java methods support Pass-by-Value where actual variable references are not passed but copies are, meaning object fields can be altered while initial object allocations cannot be modified inside the stack.",
    problems: [
      {
        id: "m1",
        title: "Pass By Value Experiment",
        description: "Demonstrate Java's Pass-by-Value behavior with primitives and object references.",
        starterTemplate: `class Holder { int val; Holder(int v) { this.val = v; } }
public class Solution {
    public static void modify(int x, Holder h) {
        // TODO: Demonstrate copy-value mutations
    }
}`,
        solution: `class Holder { int val; Holder(int v) { this.val = v; } }
public class Solution {
    public static void modify(int x, Holder h) {
        x = 999;
        h.val = 888;
    }
}`,
        output: "Success",
        validationKeywords: ["h.val =", "x = 999"],
        simulatedErrors: [
          "Compile Error: non-static method modification is unreachable",
          "Logic Error: Mutating object references fails to affect parent reference val."
        ]
      },
      {
        id: "m2",
        title: "Recursive Factorial",
        description: "Write a recursive method to calculate the factorial of a number, establishing bounds.",
        starterTemplate: `public class Solution {
    public static long factorial(int n) {
        // TODO: recursion loop
        return 1L;
    }
}`,
        solution: `public class Solution {
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}`,
        output: "120",
        validationKeywords: ["if (n <= 1)", "factorial(n - 1)"],
        simulatedErrors: [
          "Compile Error: long values cannot be multiplied by floating values directly",
          "Logic Error: Missing base case causing StackOverflowError."
        ]
      },
      {
        id: "m3",
        title: "Method Overloading Demo",
        description: "Create multiple overloaded versions of a method to sum integers, doubles, and integer arrays.",
        starterTemplate: `public class Solution {
    // TODO: Overload static sum methods
}`,
        solution: `public class Solution {
    public static int sum(int a, int b) { return a + b; }
    public static double sum(double a, double b) { return a + b; }
    public static int sum(int[] arr) {
        int total = 0;
        for (int n : arr) total += n;
        return total;
    }
}`,
        output: "Success",
        validationKeywords: ["int sum(", "double sum(", "int[] arr"],
        simulatedErrors: [
          "Compile Error: duplicate method declaration in class Solution",
          "Logic Error: The method parameters must differ in signatures."
        ]
      },
      {
        id: "m4",
        title: "Varargs Logger",
        description: "Implement a utility method that uses Variable Arguments (varargs) to print dynamic arrays of tags.",
        starterTemplate: `public class Solution {
    public static void log(String... tags) {
        // TODO: varargs loop
    }
}`,
        solution: `public class Solution {
    public static void log(String... tags) {
        for (String t : tags) {
            System.out.print("[" + t + "] ");
        }
    }
}`,
        output: "[A] [B] ",
        validationKeywords: ["String... tags", "for (String"],
        simulatedErrors: [
          "Compile Error: varargs argument must be the last parameter in the signature",
          "Logic Error: Array properties cannot be traversed directly."
        ]
      },
      {
        id: "m5",
        title: "GCD Euclidean Solver",
        description: "Implement the classic Euclidean algorithm for calculating the greatest common divisor recursively.",
        starterTemplate: `public class Solution {
    public static int gcd(int a, int b) {
        // TODO: Recursive Euclidean GCD
        return 1;
    }
}`,
        solution: `public class Solution {
    public static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}`,
        output: "6",
        validationKeywords: ["b == 0 ? a", "gcd(b, a % b)"],
        simulatedErrors: [
          "Compile Error: invalid return type match on ternary branches",
          "Logic Error: Base case for b == 0 is missing, inducing stack crashes."
        ]
      },
      {
        id: "m6",
        title: "Method Pass Array Check",
        description: "Mutate array content inside a method, confirming Java passes the reference memory value copy.",
        starterTemplate: `public class Solution {
    public static void setZero(int[] arr) {
        // TODO: set first element to zero
    }
}`,
        solution: `public class Solution {
    public static void setZero(int[] arr) {
        if (arr != null && arr.length > 0) {
            arr[0] = 0;
        }
    }
}`,
        output: "Success",
        validationKeywords: ["arr[0] = 0"],
        simulatedErrors: [
          "Compile Error: subscript bounds checked array is inaccessible",
          "Logic Error: Modified element does not persist in the caller's scope."
        ]
      },
      {
        id: "m7",
        title: "Recursive Binary Search",
        description: "Find an element's index in a sorted array recursively, maintaining left and right bounds.",
        starterTemplate: `public class Solution {
    public static int search(int[] arr, int target, int l, int r) {
        // TODO: recursive binary search
        return -1;
    }
}`,
        solution: `public class Solution {
    public static int search(int[] arr, int target, int l, int r) {
        if (l > r) return -1;
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] > target) return search(arr, target, l, mid - 1);
        return search(arr, target, mid + 1, r);
    }
}`,
        output: "2",
        validationKeywords: ["l + (r - l) / 2", "search(arr, target", "mid - 1"],
        simulatedErrors: [
          "Compile Error: return type missing from search path",
          "Logic Error: Calculating mid using (l+r)/2 can cause integer overflow."
        ]
      },
      {
        id: "m8",
        title: "Shadowing Variable Scope",
        description: "Write code showcasing the shadowing of class variables by local method parameters.",
        starterTemplate: `public class Solution {
    static int x = 10;
    public static void printVal(int x) {
        // TODO: Print the shadowed parameter and global variable
    }
}`,
        solution: `public class Solution {
    static int x = 10;
    public static void printVal(int x) {
        System.out.println("Local: " + x + ", Class: " + Solution.x);
    }
}`,
        output: "Local: 5, Class: 10",
        validationKeywords: ["Solution.x", "printVal"],
        simulatedErrors: [
          "Compile Error: Cannot access shadowed variable fields directly",
          "Logic Error: Class level variable is incorrectly modified by local parameter declarations."
        ]
      },
      {
        id: "m9",
        title: "Return Multiple Fields Object Wrapper",
        description: "Design a class wrap that allows a method to return two distinct integer outcomes (Min and Max) at once.",
        starterTemplate: `class Range {
    // TODO: Create holder fields
}
public class Solution {
    public static Range getRange(int[] nums) {
        return null;
    }
}`,
        solution: `class Range {
    int min, max;
    Range(int min, int max) { this.min = min; this.max = max; }
}
public class Solution {
    public static Range getRange(int[] nums) {
        int min = nums[0], max = nums[0];
        for (int n : nums) {
            if (n < min) min = n;
            if (n > max) max = n;
        }
        return new Range(min, max);
    }
}`,
        output: "Success",
        validationKeywords: ["new Range", "min", "max"],
        simulatedErrors: [
          "Compile Error: cannot find constructor Range matching params",
          "Logic Error: Multiple fields are returned as separate array variables."
        ]
      },
      {
        id: "m10",
        title: "Method Chaining Builder",
        description: "Implement a fluent API pattern where methods mutate fields and return 'this' to chain calls together.",
        starterTemplate: `class Person {
    // TODO: Chaining setters
}`,
        solution: `class Person {
    String name;
    int age;
    public Person setName(String name) { this.name = name; return this; }
    public Person setAge(int age) { this.age = age; return this; }
}`,
        output: "Success",
        validationKeywords: ["return this", "Person setName"],
        simulatedErrors: [
          "Compile Error: return type missing from fluent setters",
          "Logic Error: Setters return void, preventing call chaining."
        ]
      }
    ]
  },
  {
    id: "exception-handling",
    title: "Exception Handling",
    explanation: "Exception handling is a mechanism to handle runtime errors, ensuring that the normal flow of the application can be maintained. Java uses try, catch, finally, throw, and throws keywords. Exceptions are categorized into checked exceptions (must be declared/handled at compile time) and unchecked exceptions (runtime occurrences deriving from RuntimeException).",
    problems: [
      {
        id: "e1",
        title: "Try-With-Resources Simulator",
        description: "Demonstrate modern try-with-resources statement ensuring AutoCloseable resources release safely.",
        starterTemplate: `class Resource implements AutoCloseable {
    public void close() { /* TODO: Close resource */ }
}
public class Solution {
    public static void main(String[] args) {
        // TODO: Try with resource
    }
}`,
        solution: `class Resource implements AutoCloseable {
    public void doWork() { System.out.println("Working..."); }
    public void close() { System.out.println("Closed!"); }
}
public class Solution {
    public static void main(String[] args) {
        try (Resource res = new Resource()) {
            res.doWork();
        }
    }
}`,
        output: "Working...\nClosed!",
        validationKeywords: ["try (Resource", "AutoCloseable"],
        simulatedErrors: [
          "Compile Error: Resource does not implement AutoCloseable",
          "Logic Error: Try-with-resources syntax does not declare the close block."
        ]
      },
      {
        id: "e2",
        title: "Custom Exception Builder",
        description: "Build a custom checked exception 'InvalidAgeException' and write code throwing and handling it.",
        starterTemplate: `class InvalidAgeException extends Exception {
    // TODO: Constructor
}
public class Solution {
    // TODO: Throw exception if age < 18
}`,
        solution: `class InvalidAgeException extends Exception {
    public InvalidAgeException(String msg) { super(msg); }
}
public class Solution {
    public static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) throw new InvalidAgeException("Minor");
    }
}`,
        output: "Success",
        validationKeywords: ["extends Exception", "throws InvalidAgeException", "throw new InvalidAgeException"],
        simulatedErrors: [
          "Compile Error: Unhandled exception: InvalidAgeException",
          "Logic Error: The custom exception extends RuntimeException instead of checked Exception."
        ]
      },
      {
        id: "e3",
        title: "Multiple Catch Blocks",
        description: "Handle specific exceptions (ArithmeticException, NullPointerException) in discrete catch structures.",
        starterTemplate: `public class Solution {
    public static void handle(String s) {
        // TODO: try with multiple catch blocks
    }
}`,
        solution: `public class Solution {
    public static void handle(String s) {
        try {
            int len = s.length();
            int div = 10 / len;
        } catch (NullPointerException e) {
            System.out.println("NPE");
        } catch (ArithmeticException e) {
            System.out.println("AE");
        }
    }
}`,
        output: "Success",
        validationKeywords: ["catch (NullPointerException", "catch (ArithmeticException"],
        simulatedErrors: [
          "Compile Error: exception ArithmeticException has already been caught",
          "Logic Error: Specific exceptions are masked by catching the parent Exception first."
        ]
      },
      {
        id: "e4",
        title: "Exception Propagation Test",
        description: "Demonstrate exception bubble behavior down the call stack if left uncaught in helper methods.",
        starterTemplate: `public class Solution {
    public static void main(String[] args) {
        // TODO: Catch propagated exception
    }
}`,
        solution: `public class Solution {
    public static void methodA() { throw new RuntimeException("Bubbling!"); }
    public static void main(String[] args) {
        try {
            methodA();
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}`,
        output: "Caught: Bubbling!",
        validationKeywords: ["throw new RuntimeException", "catch (Exception e)"],
        simulatedErrors: [
          "Compile Error: uncaught checked exceptions are blocked from propagation",
          "Logic Error: Method does not throw exception downstream."
        ]
      },
      {
        id: "e5",
        title: "Finally Execution Guarantee",
        description: "Show that finally blocks execute even when a catch block contains an explicit 'return' statement.",
        starterTemplate: `public class Solution {
    public static int testFinally() {
        // TODO: try block with return and finally blocks
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int testFinally() {
        try {
            return 10;
        } finally {
            System.out.println("Finally!");
        }
    }
}`,
        output: "Finally!",
        validationKeywords: ["try", "finally", "return 10"],
        simulatedErrors: [
          "Compile Error: finally block cannot be placed here without try block match",
          "Logic Error: Return interrupts execution before the finally block is triggered."
        ]
      },
      {
        id: "e6",
        title: "Try Catch Null Pointer Safety",
        description: "Safeguard method calls against null pointers using try-catch blocks to prevent JVM crashing.",
        starterTemplate: `public class Solution {
    public static void safePrint(String s) {
        // TODO: Null pointer safety handling
    }
}`,
        solution: `public class Solution {
    public static void safePrint(String s) {
        try {
            System.out.println(s.toUpperCase());
        } catch (NullPointerException e) {
            System.out.println("Null input handled");
        }
    }
}`,
        output: "Null input handled",
        validationKeywords: ["catch (NullPointerException"],
        simulatedErrors: [
          "Compile Error: variable e might not have been declared",
          "Logic Error: Safe default printing value is not output."
        ]
      },
      {
        id: "e7",
        title: "Throw vs Throws Hierarchy",
        description: "Differentiate checked throws keyword declaring method contracts and throw statements initiating the JVM exception throw.",
        starterTemplate: `public class Solution {
    // TODO: Throw checked exception and declare signature throws
}`,
        solution: `import java.io.IOException;
public class Solution {
    public static void readFile() throws IOException {
        throw new IOException("File missing");
    }
}`,
        output: "Success",
        validationKeywords: ["throws IOException", "throw new IOException"],
        simulatedErrors: [
          "Compile Error: Unhandled exception type IOException",
          "Logic Error: Throws keyword is missing from the method declaration signature."
        ]
      },
      {
        id: "e8",
        title: "Multi-Catch Block Grouping",
        description: "Catch both ArithmeticException and NullPointerException inside a single, piped catch block statement (Java 7+ feature).",
        starterTemplate: `public class Solution {
    public static void multiCatch(String s) {
        // TODO: Grouped multi-catch block (AE | NPE)
    }
}`,
        solution: `public class Solution {
    public static void multiCatch(String s) {
        try {
            int len = s.length();
            int d = 10 / len;
        } catch (ArithmeticException | NullPointerException e) {
            System.out.println("Error handled");
        }
    }
}`,
        output: "Error handled",
        validationKeywords: ["catch (ArithmeticException | NullPointerException e)"],
        simulatedErrors: [
          "Compile Error: Alternative exceptions in a multi-catch statement cannot be related by subclassing",
          "Logic Error: catch pipes are missing correct syntaxes (use | separator)."
        ]
      },
      {
        id: "e9",
        title: "Chained Exception Builder",
        description: "Wrap an occurring ArithmeticException inside a newly generated high-level CustomException using initCause.",
        starterTemplate: `public class Solution {
    public static void process() {
        // TODO: Exception chaining
    }
}`,
        solution: `public class Solution {
    public static void process() {
        try {
            int div = 10 / 0;
        } catch (ArithmeticException e) {
            throw new RuntimeException("High-level error", e);
        }
    }
}`,
        output: "Success",
        validationKeywords: ["throw new RuntimeException", "e"],
        simulatedErrors: [
          "Compile Error: constructor RuntimeException with cause parameter is not resolved",
          "Logic Error: The root cause exception was omitted from the chained constructor."
        ]
      },
      {
        id: "e10",
        title: "Stack Overflow Exception Inducer",
        description: "Intentionally trigger a stack overflow recursively, capturing and handling the resulting JRE StackOverflowError safely.",
        starterTemplate: `public class Solution {
    public static void induceOverflow() {
        // TODO: recursive call inducing overflow
    }
}`,
        solution: `public class Solution {
    public static void induceOverflow() {
        induceOverflow();
    }
    public static void main(String[] args) {
        try {
            induceOverflow();
        } catch (StackOverflowError e) {
            System.out.println("Handled Stack Overflow!");
        }
    }
}`,
        output: "Handled Stack Overflow!",
        validationKeywords: ["catch (StackOverflowError e)", "induceOverflow()"],
        simulatedErrors: [
          "Compile Error: Infinite recursion loop is blocked by lint compilation checks",
          "Logic Error: Throwing the wrong error type (Exception instead of StackOverflowError, which extends Error)."
        ]
      }
    ]
  },
  {
    id: "file-handling",
    title: "File Handling (Basic)",
    explanation: "File handling in Java involves reading and writing to files using stream classes. Java provides basic file interactions in the `java.io` package (like File, FileReader, FileWriter, BufferedReader) and modern, high-performance NIO path-based classes in `java.nio.file`. Proper resource teardown or try-with-resources is essential to avoid file lock or system handle leaks.",
    problems: [
      {
        id: "f1",
        title: "File Writer & Reader Combo",
        description: "Write a short module writing a text line to a file, then reading it using buffered readers.",
        starterTemplate: `import java.io.*;
public class Solution {
    public static void main(String[] args) {
        // TODO: file read/write try block
    }
}`,
        solution: `import java.io.*;
public class Solution {
    public static void main(String[] args) {
        File file = new File("test.txt");
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            bw.write("Data");
        } catch (IOException e) {}
    }
}`,
        output: "Success",
        validationKeywords: ["BufferedWriter", "FileWriter", "IOException"],
        simulatedErrors: [
          "Compile Error: Unhandled exception type IOException on close stream",
          "Logic Error: FileWriter does not release paths after buffer executions."
        ]
      },
      {
        id: "f2",
        title: "Word Frequency Counter",
        description: "Read a mock file content and count occurrences of a target search word.",
        starterTemplate: `public class Solution {
    public static int count(String content, String word) {
        // TODO: word count logic
        return 0;
    }
}`,
        solution: `public class Solution {
    public static int count(String content, String word) {
        String[] tokens = content.split("\\\\s+");
        int count = 0;
        for (String t : tokens) {
            if (t.equalsIgnoreCase(word)) count++;
        }
        return count;
    }
}`,
        output: "2",
        validationKeywords: ["split", "equalsIgnoreCase"],
        simulatedErrors: [
          "Compile Error: variable content is null check not declared",
          "Logic Error: Split regex does not clean trailing punctuations."
        ]
      },
      {
        id: "f3",
        title: "File Validation Tester",
        description: "Write code to check if a file path exists, if it is a directory, and output total length size metrics.",
        starterTemplate: `import java.io.File;
public class Solution {
    public static boolean checkDir(String path) {
        // TODO: File status checker
        return false;
    }
}`,
        solution: `import java.io.File;
public class Solution {
    public static boolean checkDir(String path) {
        File f = new File(path);
        return f.exists() && f.isDirectory();
    }
}`,
        output: "false",
        validationKeywords: ["f.exists()", "f.isDirectory()"],
        simulatedErrors: [
          "Compile Error: File constructor is undefined for parameter type path",
          "Logic Error: Check returns true even if the path exists as a regular file."
        ]
      },
      {
        id: "f4",
        title: "Read File Line-by-Line",
        description: "Demonstrate reading a file line-by-line using Java 8 Files.lines() stream for memory efficiency.",
        starterTemplate: `import java.util.stream.Stream;
public class Solution {
    public static void readLines() {
        // TODO: lazy stream reading
    }
}`,
        solution: `import java.util.stream.Stream;
public class Solution {
    public static void readLines() {
        try (Stream<String> lines = Stream.of("1", "2")) {
            lines.forEach(System.out::println);
        }
    }
}`,
        output: "1\n2",
        validationKeywords: ["Stream.of", "forEach"],
        simulatedErrors: [
          "Compile Error: Streams require AutoCloseable wraps",
          "Logic Error: File stream leaks because try-with-resources wrap is missing."
        ]
      },
      {
        id: "f5",
        title: "NIO File Copier",
        description: "Demonstrate copying files using modern NIO2 Files class paths.",
        starterTemplate: `import java.nio.file.*;
public class Solution {
    public static void copy(Path src, Path dest) {
        // TODO: NIO File copier
    }
}`,
        solution: `import java.nio.file.*;
import java.io.IOException;
public class Solution {
    public static void copy(Path src, Path dest) throws IOException {
        Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING);
    }
}`,
        output: "Success",
        validationKeywords: ["Files.copy", "StandardCopyOption.REPLACE_EXISTING"],
        simulatedErrors: [
          "Compile Error: cannot find symbol StandardCopyOption class",
          "Logic Error: Copy throws exception because REPLACE_EXISTING flag is missing."
        ]
      },
      {
        id: "f6",
        title: "File Size Calculator",
        description: "Calculate and return the file size in bytes for a specific file path.",
        starterTemplate: `import java.io.File;
public class Solution {
    public static long getSizeBytes(String path) {
        // TODO: return file size
        return 0L;
    }
}`,
        solution: `import java.io.File;
public class Solution {
    public static long getSizeBytes(String path) {
        File f = new File(path);
        return f.length();
    }
}`,
        output: "0",
        validationKeywords: ["f.length()"],
        simulatedErrors: [
          "Compile Error: return value mismatch: cannot convert from int to long",
          "Logic Error: Check returns length size for missing or uninitialized paths."
        ]
      },
      {
        id: "f7",
        title: "File Extension Filter",
        description: "Given a list of file names, filter and print only those ending with '.java' extension.",
        starterTemplate: `public class Solution {
    public static void filterJavaFiles(String[] files) {
        // TODO: Filter and print files
    }
}`,
        solution: `public class Solution {
    public static void filterJavaFiles(String[] files) {
        for (String f : files) {
            if (f.endsWith(".java")) {
                System.out.println(f);
            }
        }
    }
}`,
        output: "Main.java",
        validationKeywords: ["endsWith(\".java\")"],
        simulatedErrors: [
          "Compile Error: method endsWith undefined for type String",
          "Logic Error: String comparison is case-sensitive, missing '.JAVA' uppercase files."
        ]
      },
      {
        id: "f8",
        title: "Append Content Writer",
        description: "Write code to append a text line to an existing file using FileWriter without overwriting original content.",
        starterTemplate: `import java.io.*;
public class Solution {
    public static void appendText(String path, String data) {
        // TODO: Append writing logic
    }
}`,
        solution: `import java.io.*;
public class Solution {
    public static void appendText(String path, String data) throws IOException {
        try (FileWriter fw = new FileWriter(path, true);
             BufferedWriter bw = new BufferedWriter(fw)) {
            bw.write(data);
        }
    }
}`,
        output: "Success",
        validationKeywords: ["new FileWriter(path, true)", "BufferedWriter"],
        simulatedErrors: [
          "Compile Error: FileWriter constructors arguments mismatch",
          "Logic Error: Appending fails because boolean append flag inside FileWriter constructor is set to false or omitted."
        ]
      },
      {
        id: "f9",
        title: "Temporary File Creator",
        description: "Create a temporary file in the default JRE system directory using NIO Files patterns.",
        starterTemplate: `import java.nio.file.*;
public class Solution {
    public static void createTemp() {
        // TODO: Create temp file
    }
}`,
        solution: `import java.nio.file.*;
import java.io.IOException;
public class Solution {
    public static void createTemp() throws IOException {
        Path tempFile = Files.createTempFile("app-", ".log");
        System.out.println("Created: " + tempFile.getFileName());
    }
}`,
        output: "Success",
        validationKeywords: ["Files.createTempFile", "getFileName()"],
        simulatedErrors: [
          "Compile Error: cannot find symbol Path class in nio module",
          "Logic Error: Custom prefix or suffix parameters are omitted during temporary creation."
        ]
      },
      {
        id: "f10",
        title: "Buffer Stream Copy Speedup",
        description: "Demonstrate fast stream copying using a 1024-byte block buffer array instead of single byte reads.",
        starterTemplate: `import java.io.*;
public class Solution {
    public static void copyStreams(InputStream in, OutputStream out) {
        // TODO: Buffer-based copy loops
    }
}`,
        solution: `import java.io.*;
public class Solution {
    public static void copyStreams(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) != -1) {
            out.write(buffer, 0, bytesRead);
        }
    }
}`,
        output: "Success",
        validationKeywords: ["byte[] buffer = new byte[1024]", "in.read(buffer)", "out.write(buffer, 0"],
        simulatedErrors: [
          "Compile Error: variable bytesRead initialized inside expression scope is inaccessible",
          "Logic Error: Copy writes complete 1024 buffer arrays, leaking trailing null bytes."
        ]
      }
    ]
  },
  {
    id: "multithreading",
    title: "Multithreading (Intro)",
    explanation: "Multithreading in Java is a process of executing multiple threads simultaneously. A thread is a lightweight sub-process, the smallest unit of processing. Multithreading is achieved in two ways: extending the Thread class, or implementing the Runnable interface. Modern multi-core concurrency systems resolve resource locks using synchronized blocks, locks, and atomic elements.",
    problems: [
      {
        id: "th1",
        title: "Thread Extension vs Runnable",
        description: "Write code to spawn threads using both Thread class extensions and Runnable interfaces.",
        starterTemplate: `public class Solution {
    public static void spawnThreads() {
        // TODO: Create and start dynamic threads
    }
}`,
        solution: `public class Solution {
    public static void spawnThreads() {
        Thread t1 = new Thread(() -> System.out.println("Runnable"));
        Thread t2 = new Thread() {
            public void run() { System.out.println("Thread"); }
        };
        t1.start(); t2.start();
    }
}`,
        output: "Success",
        validationKeywords: ["new Thread", "start()"],
        simulatedErrors: [
          "Compile Error: run() method lacks signature override matches",
          "Logic Error: Method t.run() was executed directly instead of start(), failing to spawn thread stack branches."
        ]
      },
      {
        id: "th2",
        title: "Synchronized Thread Counter",
        description: "Demonstrate a shared counter object updated by multiple threads, resolving race conditions with synchronized blocks.",
        starterTemplate: `class Counter {
    private int count = 0;
    // TODO: Thread-safe increment
}`,
        solution: `class Counter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public int getCount() { return count; }
}`,
        output: "Success",
        validationKeywords: ["synchronized", "count++"],
        simulatedErrors: [
          "Compile Error: synchronized blocks require intrinsic lock parameters",
          "Logic Error: Increment is unsafe, causing race conditions in multi-thread updates."
        ]
      },
      {
        id: "th3",
        title: "Thread Join Alignment",
        description: "Show how the Thread.join() method works, blocking main execution until a child thread terminates.",
        starterTemplate: `public class Solution {
    public static void executeJoined(Thread worker) {
        // TODO: start worker and align execution
    }
}`,
        solution: `public class Solution {
    public static void executeJoined(Thread worker) throws InterruptedException {
        worker.start();
        worker.join();
    }
}`,
        output: "Success",
        validationKeywords: ["worker.start()", "worker.join()"],
        simulatedErrors: [
          "Compile Error: Unhandled exception: InterruptedException",
          "Logic Error: main method returns before child thread completion because join was omitted."
        ]
      },
      {
        id: "th4",
        title: "Deadlock Simulator",
        description: "Demonstrate a simple scenario where thread locks align into a Deadlock state, explaining how to prevent it.",
        starterTemplate: `public class Solution {
    public static void deadLock() {
        // TODO: Simulate thread deadlock locks
    }
}`,
        solution: `public class Solution {
    public static void deadLock() {
        Object res1 = "1", res2 = "2";
        System.out.println("Locked. Ordering locks systematically prevents this.");
    }
}`,
        output: "Success",
        validationKeywords: ["Ordering locks"],
        simulatedErrors: [
          "Compile Error: variable deadlock lock cannot be resolved to type Object",
          "Logic Error: Threads lock structures without overlapping dependencies."
        ]
      },
      {
        id: "th5",
        title: "Volatile Keyword Demo",
        description: "Demonstrate how the 'volatile' keyword prevents caching threads from storing local stale copies of states.",
        starterTemplate: `public class Solution {
    // TODO: Declare volatile exit flag variable
}`,
        solution: `public class Solution {
    private static volatile boolean exit = false;
}`,
        output: "Success",
        validationKeywords: ["volatile boolean"],
        simulatedErrors: [
          "Compile Error: modifier volatile is not allowed in local method variable scopes",
          "Logic Error: Thread loops indefinitely because the exit variable changes are cached and invisible."
        ]
      },
      {
        id: "th6",
        title: "Thread Sleep Interrupter",
        description: "Put a thread to sleep for 5 seconds, catching and handling the checked InterruptedException correctly.",
        starterTemplate: `public class Solution {
    public static void sleepThread() {
        // TODO: Try sleeping thread
    }
}`,
        solution: `public class Solution {
    public static void sleepThread() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            System.out.println("Interrupted!");
        }
    }
}`,
        output: "Success",
        validationKeywords: ["Thread.sleep(5000)", "catch (InterruptedException e)"],
        simulatedErrors: [
          "Compile Error: Unhandled exception type InterruptedException on sleep call",
          "Logic Error: Invalid sleeping period specified (negative value)."
        ]
      },
      {
        id: "th7",
        title: "ExecutorService ThreadPool",
        description: "Spawn a static pool of 3 worker threads using ExecutorService to execute task objects in parallel.",
        starterTemplate: `import java.util.concurrent.*;
public class Solution {
    public static void runTasks() {
        // TODO: Spawn pool and run tasks
    }
}`,
        solution: `import java.util.concurrent.*;
public class Solution {
    public static void runTasks() {
        ExecutorService exec = Executors.newFixedThreadPool(3);
        exec.submit(() -> System.out.println("Task"));
        exec.shutdown();
    }
}`,
        output: "Success",
        validationKeywords: ["Executors.newFixedThreadPool(3)", "exec.submit", "exec.shutdown()"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: ExecutorService class in concurrent module",
          "Logic Error: ThreadPool leaks threads because executor shutdown was omitted."
        ]
      },
      {
        id: "th8",
        title: "Callable Future Sum Calculator",
        description: "Submit a Callable calculation task to an ExecutorService, capturing and returning the integer value via Future.get().",
        starterTemplate: `import java.util.concurrent.*;
public class Solution {
    public static int getAsyncSum() {
        // TODO: Submit callable task and return Future outcome
        return 0;
    }
}`,
        solution: `import java.util.concurrent.*;
public class Solution {
    public static int getAsyncSum() throws Exception {
        ExecutorService exec = Executors.newSingleThreadExecutor();
        Future<Integer> future = exec.submit(() -> 5 + 5);
        int result = future.get();
        exec.shutdown();
        return result;
    }
}`,
        output: "10",
        validationKeywords: ["exec.submit", "Future<Integer>", "future.get()"],
        simulatedErrors: [
          "Compile Error: Unhandled exception type InterruptedException | ExecutionException",
          "Logic Error: Future.get is called asynchronously without blocking check status."
        ]
      },
      {
        id: "th9",
        title: "Producer-Consumer BlockingQueue",
        description: "Coordinate message passing between a producer and consumer thread safely using an ArrayBlockingQueue collection.",
        starterTemplate: `import java.util.concurrent.*;
public class Solution {
    // TODO: Put element into ArrayBlockingQueue safely
}`,
        solution: `import java.util.concurrent.*;
public class Solution {
    public static void produce(ArrayBlockingQueue<String> queue, String msg) throws InterruptedException {
        queue.put(msg);
    }
}`,
        output: "Success",
        validationKeywords: ["ArrayBlockingQueue", "queue.put(msg)"],
        simulatedErrors: [
          "Compile Error: ArrayBlockingQueue size constructor bounds is not declared",
          "Logic Error: Non-blocking offer method used instead of blocking put, leading to data drop."
        ]
      },
      {
        id: "th10",
        title: "ThreadLocal Value Isolation",
        description: "Isolate distinct integer parameters unique to threads executing shared runnables using ThreadLocal variables.",
        starterTemplate: `public class Solution {
    // TODO: Create ThreadLocal isolate field
}`,
        solution: `public class Solution {
    public static ThreadLocal<Integer> isolate = ThreadLocal.withInitial(() -> 0);
}`,
        output: "Success",
        validationKeywords: ["ThreadLocal<Integer>", "ThreadLocal.withInitial"],
        simulatedErrors: [
          "Compile Error: local generic initialization type mismatch",
          "Logic Error: Initial isolation context defaults to null, triggering NPEs."
        ]
      }
    ]
  },
  {
    id: "collections",
    title: "Collections",
    explanation: "The Java Collections Framework provides an architecture to store and manipulate a group of objects. Key interfaces include: List (an ordered collection that allows duplicate elements), Set (an unordered collection that does not allow duplicates), and Map (mapping keys to values, prohibiting duplicate keys). Selecting the correct Collection implementation (e.g. ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap) is key to optimal runtime efficiency.",
    problems: [
      {
        id: "col1",
        title: "ArrayList vs LinkedList Removal",
        description: "Demonstrate performance trade-offs of ArrayList and LinkedList during extensive mid-index removal operations.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        // TODO: Show removal metrics
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static void main(String[] args) {
        List<Integer> al = new ArrayList<>();
        List<Integer> ll = new LinkedList<>();
        System.out.println("ArrayList and LinkedList initialized.");
    }
}`,
        output: "ArrayList and LinkedList initialized.",
        validationKeywords: ["List<Integer>", "ArrayList", "LinkedList"],
        simulatedErrors: [
          "Compile Error: type parameter collision in Lists",
          "Logic Error: Benchmarking loop bounds do not cover mid-elements."
        ]
      },
      {
        id: "col2",
        title: "HashSet Unique Element Scan",
        description: "Filter out all duplicate strings in an input list using a HashSet, preserving sorting order with a TreeSet.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static TreeSet<String> uniqueSorted(List<String> list) {
        // TODO: Unique sorted conversions
        return null;
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static TreeSet<String> uniqueSorted(List<String> list) {
        return new TreeSet<>(list);
    }
}`,
        output: "Success",
        validationKeywords: ["new TreeSet<>", "TreeSet<String>"],
        simulatedErrors: [
          "Compile Error: cannot resolve constructor parameters",
          "Logic Error: Sorting fails because list is processed into a simple HashSet."
        ]
      },
      {
        id: "col3",
        title: "HashMap Frequency Map",
        description: "Build a frequency map of characters in a string, outputting the occurrences in sorted layout.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static TreeMap<Character, Integer> buildFreq(String s) {
        // TODO: Map characters to count
        return null;
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static TreeMap<Character, Integer> buildFreq(String s) {
        TreeMap<Character, Integer> map = new TreeMap<>();
        for (char ch : s.toCharArray()) {
            map.put(ch, map.getOrDefault(ch, 0) + 1);
        }
        return map;
    }
}`,
        output: "Success",
        validationKeywords: ["new TreeMap<>", "getOrDefault"],
        simulatedErrors: [
          "Compile Error: type mismatch: cannot convert HashMap to TreeMap",
          "Logic Error: Characters count are initialized without default offsets."
        ]
      },
      {
        id: "col4",
        title: "PriorityQueue Min-Heap",
        description: "Use a PriorityQueue to extract the K smallest elements in a continuous stream of integer arrays.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static List<Integer> kSmallest(int[] arr, int k) {
        // TODO: PriorityQueue extractor
        return null;
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static List<Integer> kSmallest(int[] arr, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int n : arr) pq.offer(n);
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < k; i++) res.add(pq.poll());
        return res;
    }
}`,
        output: "Success",
        validationKeywords: ["PriorityQueue<Integer>", "pq.offer", "pq.poll()"],
        simulatedErrors: [
          "Compile Error: PriorityQueue class lacks default parameter definitions",
          "Logic Error: PQ ordering is Max-Heap instead of Min-Heap."
        ]
      },
      {
        id: "col5",
        title: "Stack Balance Evaluator",
        description: "Evaluate balanced brackets (e.g. '{[()]}' -> true) using stack collections.",
        starterTemplate: `import java.util.Stack;
public class Solution {
    public static boolean isBalanced(String expr) {
        // TODO: Stack balance parser
        return false;
    }
}`,
        solution: `import java.util.Stack;
public class Solution {
    public static boolean isBalanced(String expr) {
        Stack<Character> stack = new Stack<>();
        for (char ch : expr.toCharArray()) {
            if (ch == '{' || ch == '[' || ch == '(') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (ch == '}' && top != '{') return false;
                if (ch == ']' && top != '[') return false;
                if (ch == ')' && top != '(') return false;
            }
        }
        return stack.isEmpty();
    }
}`,
        output: "true",
        validationKeywords: ["stack.push", "stack.pop()", "stack.isEmpty()"],
        simulatedErrors: [
          "Compile Error: Stack method pop is void and cannot be assigned",
          "Logic Error: Stack balance evaluator skips trailing open brackets."
        ]
      },
      {
        id: "col6",
        title: "LinkedHashMap Access Order LRU",
        description: "Instantiate a LinkedHashMap maintaining access order to act as a basic Least Recently Used (LRU) cache.",
        starterTemplate: `import java.util.LinkedHashMap;
public class Solution {
    // TODO: Create access-order LinkedHashMap
}`,
        solution: `import java.util.LinkedHashMap;
public class Solution {
    public static LinkedHashMap<Integer, String> getLruCache(int cap) {
        return new LinkedHashMap<Integer, String>(cap, 0.75f, true);
    }
}`,
        output: "Success",
        validationKeywords: ["new LinkedHashMap", "0.75f, true"],
        simulatedErrors: [
          "Compile Error: constructor parameter mismatch in LinkedHashMap",
          "Logic Error: Access ordering parameter is missing (defaults to insertion order)."
        ]
      },
      {
        id: "col7",
        title: "TreeMap Custom Comparator Sort",
        description: "Instantiate a TreeMap sorting string keys in descending order using a custom lambda comparator.",
        starterTemplate: `import java.util.*;
public class Solution {
    // TODO: Create custom sorted TreeMap
}`,
        solution: `import java.util.*;
public class Solution {
    public static TreeMap<String, Integer> getDescTree() {
        return new TreeMap<String, Integer>((s1, s2) -> s2.compareTo(s1));
    }
}`,
        output: "Success",
        validationKeywords: ["new TreeMap", "s2.compareTo(s1)"],
        simulatedErrors: [
          "Compile Error: comparator lambda cannot resolve String target classes",
          "Logic Error: Sorting order remains default ascending order."
        ]
      },
      {
        id: "col8",
        title: "Vector vs ArrayList Thread Sync Check",
        description: "Demonstrate that Vector methods are synchronized (thread-safe) while ArrayList is not.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static void testSync() {
        // TODO: Initialize Vector and ArrayList
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static void testSync() {
        List<String> vec = new Vector<>();
        List<String> al = new ArrayList<>();
        System.out.println("Vector and ArrayList compared.");
    }
}`,
        output: "Vector and ArrayList compared.",
        validationKeywords: ["Vector", "ArrayList"],
        simulatedErrors: [
          "Compile Error: vector class is not imported or resolved",
          "Logic Error: Synchronization assertions are not tested."
        ]
      },
      {
        id: "col9",
        title: "Collection List Iterator Traversal",
        description: "Traverse a List backwards using ListIterator to print elements in reverse order.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static void printReverse(List<String> list) {
        // TODO: list iterator backwards traversal
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static void printReverse(List<String> list) {
        ListIterator<String> it = list.listIterator(list.size());
        while (it.hasPrevious()) {
            System.out.print(it.previous() + " ");
        }
    }
}`,
        output: "cherry banana apple ",
        validationKeywords: ["list.listIterator", "it.hasPrevious()", "it.previous()"],
        simulatedErrors: [
          "Compile Error: cannot find class ListIterator in generic context",
          "Logic Error: Iterator begins traversal from zero index, missing items."
        ]
      },
      {
        id: "col10",
        title: "Deque ArrayDeque Stack Queue Combo",
        description: "Use a Deque as a LIFO Stack using push/pop, then as a FIFO Queue using offer/poll.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static void dequeDemo() {
        // TODO: Demo push/pop and offer/poll
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static void dequeDemo() {
        Deque<String> d = new ArrayDeque<>();
        d.push("A");
        d.pop();
        d.offer("B");
        d.poll();
    }
}`,
        output: "Success",
        validationKeywords: ["Deque<String>", "ArrayDeque", "d.push", "d.pop()", "d.offer", "d.poll()"],
        simulatedErrors: [
          "Compile Error: pop method undefined for ArrayDeque type references",
          "Logic Error: Element ordering is compromised by mixing head/tail operations."
        ]
      }
    ]
  },
  {
    id: "java-8-features",
    title: "Java 8 Features",
    explanation: "Java 8 marked a paradigm shift toward functional programming. It introduced Lambda expressions (representing dynamic functional interfaces), Streams API (enabling parallel processing, filtration, and pipelines), Functional Interfaces (interfaces with exactly one abstract method), and Default Methods (interfaces declaring concrete implementations).",
    problems: [
      {
        id: "j8_1",
        title: "Stream Filter & Transform",
        description: "Given a list of strings, filter out entries starting with 'A', convert remaining entries to uppercase, and join them with commas.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static String process(List<String> list) {
        // TODO: Streams pipeline filter and uppercase
        return "";
    }
}`,
        solution: `import java.util.*;
import java.util.stream.Collectors;
public class Solution {
    public static String process(List<String> list) {
        return list.stream()
            .filter(s -> !s.startsWith("A"))
            .map(String::toUpperCase)
            .collect(Collectors.joining(", "));
    }
}`,
        output: "Success",
        validationKeywords: ["stream()", "filter", "map", "Collectors.joining"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class Collectors",
          "Logic Error: Stream result does not filter matching values correctly."
        ]
      },
      {
        id: "j8_2",
        title: "Custom Functional Interface",
        description: "Define a functional interface MathOp and invoke its implementation using Lambdas.",
        starterTemplate: `@FunctionalInterface
interface MathOp {
    // TODO: Single abstract method
}
public class Solution {
    // TODO: Lambda implementation
}`,
        solution: `@FunctionalInterface
interface MathOp {
    int operate(int a, int b);
}
public class Solution {
    public static int run(int a, int b) {
        MathOp add = (x, y) -> x + y;
        return add.operate(a, b);
    }
}`,
        output: "Success",
        validationKeywords: ["@FunctionalInterface", "operate(int", "(x, y) ->"],
        simulatedErrors: [
          "Compile Error: invalid functional interface: too many methods defined",
          "Logic Error: The target interface is missing the @FunctionalInterface check."
        ]
      },
      {
        id: "j8_3",
        title: "Optional Null Avoidance",
        description: "Wrap potential null variables in Optionals, demonstrating flatMap and orElseThrow behaviors.",
        starterTemplate: `import java.util.Optional;
public class Solution {
    public static String getSafe(String val) {
        // TODO: Optional wrap and fallback
        return "";
    }
}`,
        solution: `import java.util.Optional;
public class Solution {
    public static String getSafe(String val) {
        return Optional.ofNullable(val).orElse("Fallback");
    }
}`,
        output: "Fallback",
        validationKeywords: ["Optional.ofNullable", "orElse"],
        simulatedErrors: [
          "Compile Error: method orElse undefined for target type parameters",
          "Logic Error: Wrapping null variable with Optional.of raises NullPointerException."
        ]
      },
      {
        id: "j8_4",
        title: "Stream GroupBy Classifier",
        description: "Given a list of employees, group them by department using Collectors.groupingBy().",
        starterTemplate: `import java.util.*;
public class Solution {
    // TODO: Grouping map
}`,
        solution: `import java.util.*;
import java.util.stream.Collectors;
class Emp { String name, dept; Emp(String n, String d) { name=n; dept=d; } public String getDept() { return dept; } }
public class Solution {
    public static Map<String, List<Emp>> groupByDept(List<Emp> emps) {
        return emps.stream().collect(Collectors.groupingBy(Emp::getDept));
    }
}`,
        output: "Success",
        validationKeywords: ["Collectors.groupingBy", "Emp::getDept"],
        simulatedErrors: [
          "Compile Error: generic collector grouping type conversion failure",
          "Logic Error: Classifier method references are not resolved."
        ]
      },
      {
        id: "j8_5",
        title: "Parallel Streams Speed Test",
        description: "Perform an aggregation task using parallelStream to observe speed differences on multi-core environments.",
        starterTemplate: `import java.util.stream.LongStream;
public class Solution {
    public static long sumParallel() {
        // TODO: Parallel aggregation
        return 0;
    }
}`,
        solution: `import java.util.stream.LongStream;
public class Solution {
    public static long sumParallel() {
        return LongStream.rangeClosed(1, 1000000).parallel().sum();
    }
}`,
        output: "500000500000",
        validationKeywords: ["parallel()", "rangeClosed"],
        simulatedErrors: [
          "Compile Error: class LongStream cannot find symbol: parallel stream",
          "Logic Error: Sequential summing used, neglecting parallel scheduling."
        ]
      },
      {
        id: "j8_6",
        title: "BiFunction Lambda Adder",
        description: "Declare a BiFunction interface to sum two integers and print the resulting value.",
        starterTemplate: `import java.util.function.BiFunction;
public class Solution {
    public static int sumBi(int a, int b) {
        // TODO: BiFunction summation
        return 0;
    }
}`,
        solution: `import java.util.function.BiFunction;
public class Solution {
    public static int sumBi(int a, int b) {
        BiFunction<Integer, Integer, Integer> adder = (x, y) -> x + y;
        return adder.apply(a, b);
    }
}`,
        output: "15",
        validationKeywords: ["BiFunction<Integer, Integer, Integer>", "adder.apply"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class BiFunction in java.util.function",
          "Logic Error: BiFunction parameters are typed incorrectly."
        ]
      },
      {
        id: "j8_7",
        title: "Stream Reduce Accumulator",
        description: "Calculate the product of all integers in a list using the Stream.reduce() accumulator method.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static int getProduct(List<Integer> list) {
        // TODO: Stream reduction multiplication
        return 0;
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static int getProduct(List<Integer> list) {
        return list.stream().reduce(1, (a, b) -> a * b);
    }
}`,
        output: "24",
        validationKeywords: ["reduce(1,", "(a, b) -> a * b"],
        simulatedErrors: [
          "Compile Error: reduce parameter type mismatch: identity cannot be resolved",
          "Logic Error: Accumulator identity is initialized to 0, making product always 0."
        ]
      },
      {
        id: "j8_8",
        title: "Local Date Time Chrono API",
        description: "Get the current date-time and add exactly 2 weeks to it using Java 8 modern java.time package.",
        starterTemplate: `import java.time.LocalDate;
public class Solution {
    public static LocalDate addWeeks(LocalDate date) {
        // TODO: Add two weeks
        return null;
    }
}`,
        solution: `import java.time.LocalDate;
public class Solution {
    public static LocalDate addWeeks(LocalDate date) {
        return date.plusWeeks(2);
    }
}`,
        output: "Success",
        validationKeywords: ["date.plusWeeks(2)", "LocalDate"],
        simulatedErrors: [
          "Compile Error: cannot find symbol: class LocalDate in java.time",
          "Logic Error: Immutable date object modification is attempted without return reassignment."
        ]
      },
      {
        id: "j8_9",
        title: "Interface Default Method Extension",
        description: "Add a default concrete method printLog() inside a Logger interface, showing non-override executions.",
        starterTemplate: `interface Logger {
    void log(String msg);
    // TODO: Create default method printLog()
}`,
        solution: `interface Logger {
    void log(String msg);
    default void printLog(String msg) {
        System.out.println("Log: " + msg);
    }
}`,
        output: "Success",
        validationKeywords: ["default void printLog", "System.out.println"],
        simulatedErrors: [
          "Compile Error: interface concrete methods require default or static modifiers",
          "Logic Error: Default keyword is omitted on interface definition."
        ]
      },
      {
        id: "j8_10",
        title: "Method Reference Constructor",
        description: "Instantiate an object factory using Java 8 constructor method references (e.g. ClassName::new).",
        starterTemplate: `import java.util.function.Supplier;
class Car { Car() {} }
public class Solution {
    public static Car makeCar() {
        // TODO: Supplier constructor reference
        return null;
    }
}`,
        solution: `import java.util.function.Supplier;
class Car { Car() {} }
public class Solution {
    public static Car makeCar() {
        Supplier<Car> factory = Car::new;
        return factory.get();
    }
}`,
        output: "Success",
        validationKeywords: ["Supplier<Car>", "Car::new", "factory.get()"],
        simulatedErrors: [
          "Compile Error: cannot resolve constructor method reference parameters",
          "Logic Error: Reference represents lambda instantiation instead of direct constructor reference Class::new."
        ]
      }
    ]
  },
  {
    id: "inner-classes",
    title: "Inner Classes",
    explanation: "Inner classes (nested classes) allow logical grouping of classes in Java. They are of 4 types: Non-static Nested (Inner Member) Classes which require parent outer objects, Static Nested Classes which can exist without parent objects, Method-Local Inner Classes declared inside specific methods, and Anonymous Inner Classes which declare classes and instantiations inline without names.",
    problems: [
      {
        id: "ic1",
        title: "Member Inner Class Nesting",
        description: "Define a Member Inner class nested inside an Outer class, instantiating it correctly using outer instance references.",
        starterTemplate: `class Outer {
    // TODO: Define non-static class Inner
}`,
        solution: `class Outer {
    class Inner {
        void show() { System.out.println("Inner"); }
    }
    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.show();
    }
}`,
        output: "Inner",
        validationKeywords: ["class Inner", "outer.new Inner()", "Outer.Inner"],
        simulatedErrors: [
          "Compile Error: No enclosing instance of type Outer is accessible. Must allocate parent context!",
          "Logic Error: Attempting to instantiate the inner class statically using new Outer.Inner()."
        ]
      },
      {
        id: "ic2",
        title: "Static Nested Outer Connector",
        description: "Create a Static Nested class inside an Outer class, instantiating it directly without parent outer objects.",
        starterTemplate: `class Outer {
    // TODO: Define static class Nested
}`,
        solution: `class Outer {
    static class Nested {
        void show() { System.out.println("Static Nested"); }
    }
    public static void main(String[] args) {
        Outer.Nested nested = new Outer.Nested();
        nested.show();
    }
}`,
        output: "Static Nested",
        validationKeywords: ["static class Nested", "new Outer.Nested()"],
        simulatedErrors: [
          "Compile Error: Outer.Nested enclosing instance is required on static instantiations",
          "Logic Error: Static keyword is missing from nested class definition."
        ]
      },
      {
        id: "ic3",
        title: "Method Local Class Validation",
        description: "Implement a class declared entirely inside a method, instantiating and running it inside the same method.",
        starterTemplate: `public class Solution {
    public static void process() {
        // TODO: Declare local class and instantiate
    }
}`,
        solution: `public class Solution {
    public static void process() {
        class Local {
            void run() { System.out.println("Local Class"); }
        }
        Local l = new Local();
        l.run();
    }
}`,
        output: "Local Class",
        validationKeywords: ["class Local", "Local l = new Local()"],
        simulatedErrors: [
          "Compile Error: local class definitions cannot have access modifiers (public, private)",
          "Logic Error: Instantiation is attempted outside of the host method scope."
        ]
      },
      {
        id: "ic4",
        title: "Anonymous Thread Runnable",
        description: "Spawn a new thread executing an anonymous class implementing Runnable inline.",
        starterTemplate: `public class Solution {
    public static void runThread() {
        // TODO: Start thread with Anonymous Runnable
    }
}`,
        solution: `public class Solution {
    public static void runThread() {
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() { System.out.println("Anonymous Run"); }
        });
        t.start();
    }
}`,
        output: "Anonymous Run",
        validationKeywords: ["new Runnable() {", "@Override", "public void run()"],
        simulatedErrors: [
          "Compile Error: Anonymous class body is missing required brackets or semicolon",
          "Logic Error: The target thread.start() method is not invoked."
        ]
      },
      {
        id: "ic5",
        title: "Anonymous Interface Comparator",
        description: "Sort a list of strings descending using an anonymous Comparator class instantiation.",
        starterTemplate: `import java.util.*;
public class Solution {
    public static void sortDesc(List<String> list) {
        // TODO: Collections.sort with anonymous Comparator
    }
}`,
        solution: `import java.util.*;
public class Solution {
    public static void sortDesc(List<String> list) {
        Collections.sort(list, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return s2.compareTo(s1);
            }
        });
    }
}`,
        output: "Success",
        validationKeywords: ["new Comparator<String>()", "public int compare", "return s2.compareTo(s1)"],
        simulatedErrors: [
          "Compile Error: Comparator anonymous instantiations missing generic type arguments",
          "Logic Error: compare method signature uses incorrect arguments types."
        ]
      },
      {
        id: "ic6",
        title: "Inner Class Access Outer Private",
        description: "Prove that a member inner class can access private instance variables of the surrounding outer class directly.",
        starterTemplate: `class Outer {
    private int privateVal = 99;
    // TODO: Define member Inner accessing privateVal
}`,
        solution: `class Outer {
    private int privateVal = 99;
    class Inner {
        void printOuter() { System.out.println("Val: " + privateVal); }
    }
}`,
        output: "Success",
        validationKeywords: ["class Inner", "privateVal"],
        simulatedErrors: [
          "Compile Error: Cannot access private field of enclosing type from local classes",
          "Logic Error: Inner class declares a shadow variable, blocking direct parent variable access."
        ]
      },
      {
        id: "ic7",
        title: "Local Class Variable Final check",
        description: "Show that a local method-level class can only access local variables of the method that are effectively final.",
        starterTemplate: `public class Solution {
    public static void test() {
        int x = 10;
        // TODO: access effectively final x inside Local class
    }
}`,
        solution: `public class Solution {
    public static void test() {
        int x = 10;
        class Local {
            void print() { System.out.println(x); }
        }
        new Local().print();
    }
}`,
        output: "10",
        validationKeywords: ["class Local", "new Local().print()", "System.out.println(x)"],
        simulatedErrors: [
          "Compile Error: local variables referenced from an inner class must be final or effectively final",
          "Logic Error: Modification of variable x after class declaration breaks finality properties."
        ]
      },
      {
        id: "ic8",
        title: "Static Nested Class Static Context",
        description: "Verify that a static nested class cannot access non-static member variables of the outer class directly.",
        starterTemplate: `class Outer {
    int instanceVal = 5;
    // TODO: static nested class attempting direct access must fail
}`,
        solution: `class Outer {
    int instanceVal = 5;
    static class Nested {
        void show(Outer o) {
            // Must access via outer object reference, not directly
            System.out.println(o.instanceVal);
        }
    }
}`,
        output: "Success",
        validationKeywords: ["static class Nested", "o.instanceVal"],
        simulatedErrors: [
          "Compile Error: Cannot make a static reference to the non-static field instanceVal",
          "Logic Error: Accessing outer variables without a valid Outer instance reference parameter."
        ]
      },
      {
        id: "ic9",
        title: "Inner Class Shadowing Outer Variable",
        description: "Access a shadowed outer variable scope from an inner class using the 'OuterClassName.this.variableName' syntax.",
        starterTemplate: `class Outer {
    int x = 10;
    class Inner {
        int x = 20;
        void print() {
            // TODO: Print both local x and Outer x
        }
    }
}`,
        solution: `class Outer {
    int x = 10;
    class Inner {
        int x = 20;
        void print() {
            System.out.println("Inner: " + x + ", Outer: " + Outer.this.x);
        }
    }
}`,
        output: "Inner: 20, Outer: 10",
        validationKeywords: ["Outer.this.x", "Inner"],
        simulatedErrors: [
          "Compile Error: cannot resolve keyword 'this' in non-instance context",
          "Logic Error: The parent value is accessed using Outer.x statically instead of Outer.this.x instance syntax."
        ]
      },
      {
        id: "ic10",
        title: "Anonymous Event Handler Mocker",
        description: "Create an anonymous class implementing a mock CustomListener interface that logs click notifications.",
        starterTemplate: `interface CustomListener { void onClick(); }
public class Solution {
    // TODO: Implement anonymous CustomListener click handler
}`,
        solution: `interface CustomListener { void onClick(); }
public class Solution {
    public static void runMock() {
        CustomListener listener = new CustomListener() {
            @Override
            public void onClick() { System.out.println("Clicked!"); }
        };
        listener.onClick();
    }
}`,
        output: "Clicked!",
        validationKeywords: ["new CustomListener() {", "@Override", "onClick()"],
        simulatedErrors: [
          "Compile Error: CustomListener abstract interface instantiation is prohibited without body brackets",
          "Logic Error: The listener onClick method is never invoked."
        ]
      }
    ]
  },
  {
    id: "oops-concepts-basics",
    title: "OOPs Concepts",
    explanation: "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data and code. Java incorporates 4 core OOPs pillars: Encapsulation (hiding data using private fields and getters/seters), Inheritance (reusing characteristics of parent classes using extends), Abstraction (declaring layouts without concrete implementations using abstract classes/interfaces), and Polymorphism (methods executing dynamically in multiple forms).",
    problems: [
      {
        id: "opc1",
        title: "Class Instantiation & Constructors",
        description: "Design a simple Car class containing name and year parameters with a parameterized constructor to instantiate objects.",
        starterTemplate: `class Car {
    // TODO: Define fields, constructor and printInfo() method
}`,
        solution: `class Car {
    String name;
    int year;
    Car(String name, int year) {
        this.name = name;
        this.year = year;
    }
    void printInfo() {
        System.out.println("Car: " + name + ", Year: " + year);
    }
}`,
        output: "Success",
        validationKeywords: ["Car(String name", "this.name = name", "this.year = year"],
        simulatedErrors: [
          "Compile Error: constructor Car in class cannot be applied to given types",
          "Logic Error: Constructor parameters shadow fields but lack 'this' keyword, failing field assignments."
        ]
      },
      {
        id: "opc2",
        title: "Single Inheritance Base Sub",
        description: "Design an Animal parent class and a Dog subclass that extends Animal, calling overridden speak methods.",
        starterTemplate: `class Animal {
    // TODO: Parent speak()
}
class Dog extends Animal {
    // TODO: Subclass overrides speak()
}`,
        solution: `class Animal {
    void speak() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Bark"); }
}`,
        output: "Success",
        validationKeywords: ["class Dog extends Animal", "@Override", "void speak()"],
        simulatedErrors: [
          "Compile Error: cannot override final method speak from Animal class",
          "Logic Error: Subclass dog fails to extends the Animal base class."
        ]
      },
      {
        id: "opc3",
        title: "Interface Method Override",
        description: "Create a Vehicle interface containing abstract start() method and a Bicycle class implementing it.",
        starterTemplate: `interface Vehicle {
    // TODO: start declaration
}
class Bicycle implements Vehicle {
    // TODO: start implementation
}`,
        solution: `interface Vehicle {
    void start();
}
class Bicycle implements Vehicle {
    @Override
    public void start() { System.out.println("Bicycle start"); }
}`,
        output: "Success",
        validationKeywords: ["interface Vehicle", "implements Vehicle", "public void start()"],
        simulatedErrors: [
          "Compile Error: start() in Bicycle cannot implement start() in Vehicle; attempting to assign weaker access privileges (did you forget public?).",
          "Logic Error: Bicycle implements the interface but leaves start method abstract."
        ]
      },
      {
        id: "opc4",
        title: "Abstract Class Base Variable",
        description: "Create an abstract class Appliance containing concrete and abstract method signatures.",
        starterTemplate: `abstract class Appliance {
    // TODO: Define abstract turnOn and concrete turnOff methods
}`,
        solution: `abstract class Appliance {
    abstract void turnOn();
    void turnOff() { System.out.println("Off"); }
}`,
        output: "Success",
        validationKeywords: ["abstract class Appliance", "abstract void turnOn()", "void turnOff()"],
        simulatedErrors: [
          "Compile Error: Appliance concrete class cannot declare abstract methods without abstract class modifier",
          "Logic Error: Abstract method is instantiated with concrete curly braces body."
        ]
      },
      {
        id: "opc5",
        title: "Private Field Getter Setter",
        description: "Secure data fields (balance) inside a BankAccount class, providing public getters and setters with validation.",
        starterTemplate: `class BankAccount {
    // TODO: Encapsulate private balance
}`,
        solution: `class BankAccount {
    private double balance;
    public double getBalance() { return balance; }
    public void setBalance(double balance) {
        if (balance >= 0) this.balance = balance;
    }
}`,
        output: "Success",
        validationKeywords: ["private double balance", "public double getBalance()", "public void setBalance"],
        simulatedErrors: [
          "Compile Error: variable balance has private access in BankAccount and is inaccessible",
          "Logic Error: Setters fail to check negative balance boundary parameters."
        ]
      },
      {
        id: "opc6",
        title: "Polymorphism Dynamic Dispatch",
        description: "Demonstrate dynamic method dispatch: invoke Animal parent references assigned to Dog subclasses at runtime.",
        starterTemplate: `public class Solution {
    public static void run() {
        // TODO: Animal ref = new Dog(), call speak()
    }
}`,
        solution: `public class Solution {
    public static void run() {
        Animal ref = new Dog();
        ref.speak();
    }
}`,
        output: "Bark",
        validationKeywords: ["Animal ref = new Dog()", "ref.speak()"],
        simulatedErrors: [
          "Compile Error: Dog cannot be converted to Animal parent class",
          "Logic Error: Subclass is instantiated directly without dynamic polymorphic assignment."
        ]
      },
      {
        id: "opc7",
        title: "Super Constructor Argument",
        description: "Invoke parent constructor parameters from a subclass constructor using the 'super' keyword.",
        starterTemplate: `class Parent {
    Parent(String msg) {}
}
class Child extends Parent {
    // TODO: Invoke super in constructor
}`,
        solution: `class Parent {
    Parent(String msg) { System.out.println("Parent: " + msg); }
}
class Child extends Parent {
    Child(String msg) {
        super(msg);
    }
}`,
        output: "Success",
        validationKeywords: ["super(msg)"],
        simulatedErrors: [
          "Compile Error: constructor Parent in class Parent cannot be applied to given types: requires String, got no arguments",
          "Logic Error: super() is called after other lines of the child constructor (super must be the first statement)."
        ]
      },
      {
        id: "opc8",
        title: "Co-variant Return Overrides",
        description: "Show co-variant method overriding where a subclass overrides a method returning a subclass type of the parent return class type.",
        starterTemplate: `class Food {}
class Meat extends Food {}
class Parent { Food get() { return null; } }
class Child extends Parent {
    // TODO: Override get returning Meat instead of Food
}`,
        solution: `class Food {}
class Meat extends Food {}
class Parent { Food get() { return new Food(); } }
class Child extends Parent {
    @Override
    Meat get() { return new Meat(); }
}`,
        output: "Success",
        validationKeywords: ["@Override", "Meat get()", "return new Meat()"],
        simulatedErrors: [
          "Compile Error: return type is incompatible with overridden parent return type",
          "Logic Error: Method overridden returns parent Food type instead of narrower Meat type."
        ]
      },
      {
        id: "opc9",
        title: "Package Access Modifier Scope",
        description: "Describe class-level variable accessibility: investigate the difference between private, default (package-private), protected, and public.",
        starterTemplate: `class Base {
    // TODO: Declare variables with all 4 access levels
}`,
        solution: `class Base {
    private int privateVal;
    int defaultVal;
    protected int protectedVal;
    public int publicVal;
}`,
        output: "Success",
        validationKeywords: ["private int", "int defaultVal", "protected int", "public int"],
        simulatedErrors: [
          "Compile Error: default modifier cannot be used for class field levels",
          "Logic Error: Default package scope is declared with concrete keywords instead of leaving empty."
        ]
      },
      {
        id: "opc10",
        title: "Shallow vs Deep Copy Constructor",
        description: "Design a deep copy constructor that instantiates new references for nested array objects inside a class.",
        starterTemplate: `class Document {
    int[] data;
    // TODO: Design deep copy constructor Document(Document other)
}`,
        solution: `class Document {
    int[] data;
    Document(int[] data) { this.data = data; }
    Document(Document other) {
        // Deep copy array values
        this.data = new int[other.data.length];
        System.arraycopy(other.data, 0, this.data, 0, other.data.length);
    }
}`,
        output: "Success",
        validationKeywords: ["Document(Document other)", "new int[", "System.arraycopy"],
        simulatedErrors: [
          "Compile Error: constructor copy is recursive or undefined",
          "Logic Error: A shallow copy is made, sharing the same array reference between objects."
        ]
      }
    ]
  }
];
