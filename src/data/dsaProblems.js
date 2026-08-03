export const dsaProblems = [
  // 1. variables
  {
    id: "dsa_var1",
    category: "variables",
    title: "LeetCode 2235: Add Two Integers",
    difficulty: "Easy",
    statement: "Given two integers num1 and num2, return their sum.",
    constraints: "-100 <= num1, num2 <= 100",
    inputOutput: "Input: num1 = 12, num2 = 5\nOutput: 17\nExplanation: num1 + num2 = 17.",
    solution: `public class Solution {
    public int sum(int num1, int num2) {
        return num1 + num2;
    }
}`,
    explanation: "This problem only tests basic variable passing and returning types in Java. By returning num1 + num2, we perform a constant time O(1) addition operation."
  },
  {
    id: "dsa_var2",
    category: "variables",
    title: "LeetCode 2769: Find the Maximum Achievable Number",
    difficulty: "Easy",
    statement: "Given two integers num and t. An integer x is achievable if it can become equal to num after applying the operation (decrement x by 1, and simultaneously increment num by 1) at most t times. Return the maximum achievable number x.",
    constraints: "1 <= num, t <= 50",
    inputOutput: "Input: num = 4, t = 1\nOutput: 6\nExplanation: Decrement x=6 by 1 and increment num=4 by 1, both become 5.",
    solution: `public class Solution {
    public int theMaximumAchievableX(int num, int t) {
        return num + 2 * t;
    }
}`,
    explanation: "Since each operation brings num and x closer by 2 units (num increments, x decrements), the maximum achievable number is num + 2 * t. This runs in O(1) time and space using primitive variables."
  },

  // 2. operators
  {
    id: "dsa_op1",
    category: "operators",
    title: "LeetCode 231: Power of Two",
    difficulty: "Easy",
    statement: "Given an integer n, return true if it is a power of two. Otherwise, return false.\nAn integer n is a power of two if there exists an integer x such that n == 2^x.",
    constraints: "-2^31 <= n <= 2^31 - 1",
    inputOutput: "Input: n = 16\nOutput: true\nExplanation: 2^4 = 16.",
    solution: `public class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
    explanation: "A power of two in binary has exactly one set bit (e.g., 8 is 1000). When we subtract 1 from it, all trailing bits flip to 1 and the set bit becomes 0 (7 is 0111). Doing a bitwise AND operator '&' between n and n - 1 yields 0. This runs in constant O(1) time."
  },
  {
    id: "dsa_op2",
    category: "operators",
    title: "LeetCode 258: Add Digits (O(1) Math)",
    difficulty: "Easy",
    statement: "Given an integer num, repeatedly add all its digits until the result has only one digit, and return it. Do not use loops.",
    constraints: "0 <= num <= 2^31 - 1",
    inputOutput: "Input: num = 38\nOutput: 2\nExplanation: 38 -> 3+8 = 11 -> 1+1 = 2.",
    solution: `public class Solution {
    public int addDigits(int num) {
        if (num == 0) return 0;
        return 1 + (num - 1) % 9;
    }
}`,
    explanation: "This problem uses the digital root mathematical theorem. The digital root of a number base 10 corresponds to the remainder of division by 9 using the modulo operator '%'. Runs in O(1) time."
  },

  // 3. if-else statement
  {
    id: "dsa_ifelse1",
    category: "if-else statement",
    title: "LeetCode 2413: Smallest Even Multiple",
    difficulty: "Easy",
    statement: "Given a positive integer n, return the smallest multiple of both 2 and n.",
    constraints: "1 <= n <= 150",
    inputOutput: "Input: n = 5\nOutput: 10\nExplanation: The smallest multiple of both 2 and 5 is 10.",
    solution: `public class Solution {
    public int smallestEvenMultiple(int n) {
        if (n % 2 == 0) {
            return n;
        } else {
            return n * 2;
        }
    }
}`,
    explanation: "Tests basic conditional branching. If n is already even (n % 2 == 0), n is a multiple of 2, so we return n. Otherwise, we return n * 2. Time complexity is O(1)."
  },
  {
    id: "dsa_ifelse2",
    category: "if-else statement",
    title: "Sign of a Number",
    difficulty: "Easy",
    statement: "Given an integer x, return 1 if x is positive, -1 if x is negative, and 0 if x is zero.",
    constraints: "-1000 <= x <= 1000",
    inputOutput: "Input: x = -45\nOutput: -1\nExplanation: Since x is negative, return -1.",
    solution: `public class Solution {
    public int checkSign(int x) {
        if (x > 0) {
            return 1;
        } else if (x < 0) {
            return -1;
        } else {
            return 0;
        }
    }
}`,
    explanation: "Tests cascading if-else conditions. It evaluates the sign of a number in O(1) time and space."
  },

  // 4. switch case statement
  {
    id: "dsa_switch1",
    category: "switch case statement",
    title: "HTTP Status Descriptor",
    difficulty: "Easy",
    statement: "Given an integer code representing an HTTP status, return 'Success' for 200, 'Redirect' for 301, 'Client Error' for 404, 'Server Error' for 500, and 'Unknown' otherwise.",
    constraints: "100 <= code <= 599",
    inputOutput: "Input: code = 404\nOutput: \"Client Error\"",
    solution: `public class Solution {
    public String getStatusDescription(int code) {
        switch (code) {
            case 200: return "Success";
            case 301: return "Redirect";
            case 404: return "Client Error";
            case 500: return "Server Error";
            default: return "Unknown";
        }
    }
}`,
    explanation: "Tests multi-way branching using a switch-case statement. It matches the HTTP code and returns the associated response string in O(1) time."
  },
  {
    id: "dsa_switch2",
    category: "switch case statement",
    title: "Day of Week name finder",
    difficulty: "Easy",
    statement: "Given an integer day (1 to 7), return the name of the day starting with 'Monday' for 1 and ending with 'Sunday' for 7. Return 'Invalid' if out of bounds.",
    constraints: "0 <= day <= 10",
    inputOutput: "Input: day = 3\nOutput: \"Wednesday\"",
    solution: `public class Solution {
    public String getDayName(int day) {
        switch (day) {
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            case 7: return "Sunday";
            default: return "Invalid";
        }
    }
}`,
    explanation: "Uses switch-case syntax to match numerical day inputs to their corresponding string equivalents in O(1) time."
  },

  // 5. for-loop
  {
    id: "dsa_for1",
    category: "for-loop",
    title: "Sum of First N Integers",
    difficulty: "Easy",
    statement: "Write a program that takes an integer N and calculates the sum of all integers from 1 up to N using a for-loop.",
    constraints: "1 <= N <= 10000",
    inputOutput: "Input: N = 5\nOutput: 15\nExplanation: 1 + 2 + 3 + 4 + 5 = 15.",
    solution: `public class Solution {
    public int calculateSum(int N) {
        int sum = 0;
        for (int i = 1; i <= N; i++) {
            sum += i;
        }
        return sum;
    }
}`,
    explanation: "Introduces loop accumulation. The for-loop runs from 1 to N, updating the sum. Runs in O(N) time with O(1) auxiliary space."
  },
  {
    id: "dsa_for2",
    category: "for-loop",
    title: "Factorial Calculator",
    difficulty: "Easy",
    statement: "Given an integer N, compute its factorial N! (N * (N-1) * ... * 1) using a for-loop. Return a long to prevent overflow.",
    constraints: "1 <= N <= 20",
    inputOutput: "Input: N = 5\nOutput: 120\nExplanation: 5 * 4 * 3 * 2 * 1 = 120.",
    solution: `public class Solution {
    public long calculateFactorial(int N) {
        long result = 1;
        for (int i = 1; i <= N; i++) {
            result *= i;
        }
        return result;
    }
}`,
    explanation: "Iterates using a loop to compute N! incrementally, demonstrating arithmetic accumulation. Runs in O(N) time with O(1) space."
  },

  // 6. while-loop
  {
    id: "dsa_while1",
    category: "while-loop",
    title: "LeetCode 7: Reverse Integer (Digits Check)",
    difficulty: "Easy",
    statement: "Given a non-negative integer x, return its reversed digits. Do not worry about boundary overflows.",
    constraints: "0 <= x <= 10^7",
    inputOutput: "Input: x = 123\nOutput: 321",
    solution: `public class Solution {
    public int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            rev = rev * 10 + pop;
        }
        return rev;
    }
}`,
    explanation: "Demonstrates basic digit extraction using a while-loop. We pop the last digit of x using the modulo operator and append it to our reversed collector. Runs in O(log10(x)) time."
  },
  {
    id: "dsa_while2",
    category: "while-loop",
    title: "Binary Representation Set Bits Counter",
    difficulty: "Easy",
    statement: "Given a positive integer n, return the count of 1 bits in its binary representation using a while-loop division algorithm.",
    constraints: "1 <= n <= 10^6",
    inputOutput: "Input: n = 11\nOutput: 3\nExplanation: 11 in binary is 1011 (three 1s).",
    solution: `public class Solution {
    public int countOnes(int n) {
        int count = 0;
        while (n > 0) {
            if (n % 2 == 1) {
                count++;
            }
            n /= 2;
        }
        return count;
    }
}`,
    explanation: "Repeatedly checks if the least significant bit is 1 (n % 2 == 1) and shifts right by dividing by 2. Time: O(log N)."
  },

  // 7. do-while loop
  {
    id: "dsa_dowhile1",
    category: "do-while loop",
    title: "Guaranteed Single Collatz Step",
    difficulty: "Easy",
    statement: "Given a positive integer n, compute at least one step of the Collatz conjecture using a do-while loop: if odd, n = 3n + 1; if even, n = n/2. Return the new value of n.",
    constraints: "1 <= n <= 1000",
    inputOutput: "Input: n = 6\nOutput: 3",
    solution: `public class Solution {
    public int getCollatzStep(int n) {
        do {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = n * 3 + 1;
            }
        } while (false); // Executes exactly once
        return n;
    }
}`,
    explanation: "Illustrates the key trait of the do-while loop: executing the loop body at least once, even if the condition is false. Runs in O(1) time."
  },
  {
    id: "dsa_dowhile2",
    category: "do-while loop",
    title: "Digital Root Modulo Reducer",
    difficulty: "Easy",
    statement: "Given an integer n, continuously sum its digits until n is less than 10. You must use a do-while loop.",
    constraints: "0 <= n <= 10^4",
    inputOutput: "Input: n = 98\nOutput: 8\nExplanation: 9+8 = 17 -> 1+7 = 8.",
    solution: `public class Solution {
    public int getDigitalRoot(int n) {
        do {
            int sum = 0;
            int temp = n;
            while (temp > 0) {
                sum += temp % 10;
                temp /= 10;
            }
            n = sum;
        } while (n >= 10);
        return n;
    }
}`,
    explanation: "A do-while loop executes the digit summation body, then checks if the resulting single digit condition is met. Time complexity: O(number of digits)."
  },

  // 8. wrapper class
  {
    id: "dsa_wrap1",
    category: "wrapper class",
    title: "Primitive to Wrapper Autoboxing",
    difficulty: "Easy",
    statement: "Given an int primitive value, autobox it into an Integer object. Increment the value using helper methods and return its string representation.",
    constraints: "Primitive int input",
    inputOutput: "Input: x = 10\nOutput: \"11\"",
    solution: `public class Solution {
    public String autoboxIncrement(int x) {
        Integer val = x; // Autoboxing
        val++; // Unboxing and autoboxing
        return val.toString();
    }
}`,
    explanation: "Tests autoboxing and unboxing. Java automatically converts primitives to their wrapper equivalent (e.g. int to Integer). Calling toString() converts it to a string. Time: O(1)."
  },
  {
    id: "dsa_wrap2",
    category: "wrapper class",
    title: "Character Wrapper Digits Checker",
    difficulty: "Easy",
    statement: "Given a character ch, use Character wrapper class methods to check if the character is a digit or letter.",
    constraints: "Single char input",
    inputOutput: "Input: ch = '5'\nOutput: true",
    solution: `public class Solution {
    public boolean isDigitCharacter(char ch) {
        return Character.isDigit(ch) || Character.isLetter(ch);
    }
}`,
    explanation: "Demonstrates using the static helper methods of the Character wrapper class, such as isDigit() and isLetter(), operating in O(1) time."
  },

  // 9. typecasting
  {
    id: "dsa_cast1",
    category: "typecasting",
    title: "Explicit Downcasting",
    difficulty: "Easy",
    statement: "Given a double value, explicitly cast it to an integer. If the result is negative, return -1, otherwise return the integer value.",
    constraints: "double input",
    inputOutput: "Input: val = 15.6\nOutput: 15",
    solution: `public class Solution {
    public int castDoubleToInt(double val) {
        int result = (int) val; // Downcasting
        if (result < 0) {
            return -1;
        }
        return result;
    }
}`,
    explanation: "Demonstrates explicit narrowing conversion (downcasting) from double to int in Java. Narrowing must be done manually using casting operators. Time: O(1)."
  },
  {
    id: "dsa_cast2",
    category: "typecasting",
    title: "Widening Division Precision",
    difficulty: "Easy",
    statement: "Given two integers a and b, compute their division result as a double value preserving double precision (use widening typecasting on one of the operands).",
    constraints: "b != 0",
    inputOutput: "Input: a = 5, b = 2\nOutput: 2.5",
    solution: `public class Solution {
    public double getPrecisionDivision(int a, int b) {
        return (double) a / b;
    }
}`,
    explanation: "Demonstrates explicit widening typecasting. Casting 'a' to double triggers widening conversion for the operation, preventing integer division truncation. Time: O(1)."
  },

  // 10. class and object
  {
    id: "dsa_class1",
    category: "class and object",
    title: "Coordinate Point distance",
    difficulty: "Easy",
    statement: "Create a simple class Point containing variables x and y. Implement a constructor and a method getManhattanDistance(Point other) that calculates the Manhattan distance (|x1 - x2| + |y1 - y2|) between two points.",
    constraints: "Coordinate bounds within 1000",
    inputOutput: "Input: p1 = (0,0), p2 = (3,4)\nOutput: 7",
    solution: `class Point {
    int x;
    int y;
    
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    int getManhattanDistance(Point other) {
        int dx = this.x - other.x;
        int dy = this.y - other.y;
        if (dx < 0) dx = -dx;
        if (dy < 0) dy = -dy;
        return dx + dy;
    }
}

public class Solution {
    public int findDistance(int x1, int y1, int x2, int y2) {
        Point p1 = new Point(x1, y1);
        Point p2 = new Point(x2, y2);
        return p1.getManhattanDistance(p2);
    }
}`,
    explanation: "Tests class declaration, constructor initialization, reference parameters, and basic instance fields in Java. Time: O(1)."
  },
  {
    id: "dsa_class2",
    category: "class and object",
    title: "Product Inventory Item",
    difficulty: "Easy",
    statement: "Create a class Item with name and price. Implement a method checkAffordability(double budget) that returns true if the price is within the budget, and false otherwise.",
    constraints: "Positive price",
    inputOutput: "Input: price = 49.99, budget = 50.0\nOutput: true",
    solution: `class Item {
    String name;
    double price;
    
    Item(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    boolean isAffordable(double budget) {
        return this.price <= budget;
    }
}

public class Solution {
    public boolean checkItem(double price, double budget) {
        Item item = new Item("Gadget", price);
        return item.isAffordable(budget);
    }
}`,
    explanation: "Tests instance creation using constructors and calling instance methods on created objects. Time complexity is O(1)."
  },

  // 11. inheritance
  {
    id: "dsa_inherit1",
    category: "inheritance",
    title: "Base Employee Salary and Manager Bonus",
    difficulty: "Easy",
    statement: "Create a parent class Employee with field baseSalary. Create a child class Manager extending Employee that has a field bonus. Implement a method getTotalCompensation() in Manager that returns the sum of baseSalary and bonus.",
    constraints: "Positive salary/bonus values",
    inputOutput: "Input: baseSalary = 50000, bonus = 12000\nOutput: 62000",
    solution: `class Employee {
    int baseSalary;
    
    Employee(int baseSalary) {
        this.baseSalary = baseSalary;
    }
}

class Manager extends Employee {
    int bonus;
    
    Manager(int baseSalary, int bonus) {
        super(baseSalary);
        this.bonus = bonus;
    }
    
    int getTotalCompensation() {
        return this.baseSalary + this.bonus;
    }
}

public class Solution {
    public int getPayout(int salary, int bonus) {
        Manager mgr = new Manager(salary, bonus);
        return mgr.getTotalCompensation();
    }
}`,
    explanation: "Tests single inheritance. Subclasses inherit fields of the superclass. Constructors chain to super using `super()`. Time: O(1)."
  },
  {
    id: "dsa_inherit2",
    category: "inheritance",
    title: "Vehicle and Electric Car Speed",
    difficulty: "Easy",
    statement: "Create a class Vehicle with variable maxSpeed. Create a subclass ElectricCar that has a batteryCapacity variable. Initialize both using a constructor in ElectricCar and return maxSpeed.",
    constraints: "Constructors only",
    inputOutput: "Input: speed = 180, battery = 85\nOutput: 180",
    solution: `class Vehicle {
    int maxSpeed;
    
    Vehicle(int maxSpeed) {
        this.maxSpeed = maxSpeed;
    }
}

class ElectricCar extends Vehicle {
    int batteryCapacity;
    
    ElectricCar(int maxSpeed, int batteryCapacity) {
        super(maxSpeed);
        this.batteryCapacity = batteryCapacity;
    }
}

public class Solution {
    public int getCarSpeed(int speed, int battery) {
        ElectricCar car = new ElectricCar(speed, battery);
        return car.maxSpeed;
    }
}`,
    explanation: "Tests constructor forwarding to parent classes. Demonstrates fields inheritance in derived objects. Time: O(1)."
  },

  // 12. polymorphism
  {
    id: "dsa_poly1",
    category: "polymorphism",
    title: "Dynamic Overriding shape area",
    difficulty: "Easy",
    statement: "Create a class Shape with method getArea() returning 0. Create a subclass Square overriding getArea() to return side * side. Call getArea() dynamically using a Shape reference.",
    constraints: "Dynamic binding rules",
    inputOutput: "Input: side = 4\nOutput: 16",
    solution: `class Shape {
    int getArea() {
        return 0;
    }
}

class Square extends Shape {
    int side;
    
    Square(int side) {
        this.side = side;
    }
    
    @Override
    int getArea() {
        return side * side;
    }
}

public class Solution {
    public int computeArea(int side) {
        Shape shp = new Square(side); // Upcasting
        return shp.getArea(); // Dynamic Dispatch
    }
}`,
    explanation: "Tests Runtime Polymorphism (method overriding). The method to execute is resolved dynamically at runtime based on object type, not reference type. Time: O(1)."
  },
  {
    id: "dsa_poly2",
    category: "polymorphism",
    title: "Calculator Method Overloading",
    difficulty: "Easy",
    statement: "Implement method overloading: a method add(int a, int b) returning their sum, and add(int a, int b, int c) returning their sum.",
    constraints: "Method signatures",
    inputOutput: "Input: a = 2, b = 3, c = 4\nOutput: 9",
    solution: `public class Solution {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public int runOverload(int a, int b, int c) {
        return add(a, b, c);
    }
}`,
    explanation: "Tests Compile-time Polymorphism (method overloading). Methods have the same name but different parameters (compile-time signatures). Time: O(1)."
  },

  // 13. abstraction
  {
    id: "dsa_abs1",
    category: "abstraction",
    title: "Abstract Appliance Power",
    difficulty: "Easy",
    statement: "Create an abstract class Appliance with fields powerRating and abstract method getMonthlyUsage(). Create concrete subclass Fan overriding the abstract method to return powerRating * 24 * 30.",
    constraints: "Abstract rules",
    inputOutput: "Input: power = 75\nOutput: 54000",
    solution: `abstract class Appliance {
    int powerRating;
    
    Appliance(int powerRating) {
        this.powerRating = powerRating;
    }
    
    abstract int getMonthlyUsage();
}

class Fan extends Appliance {
    Fan(int powerRating) {
        super(powerRating);
    }
    
    @Override
    int getMonthlyUsage() {
        return this.powerRating * 24 * 30;
    }
}

public class Solution {
    public int getUsage(int power) {
        Appliance app = new Fan(power);
        return app.getMonthlyUsage();
    }
}`,
    explanation: "Abstract classes cannot be instantiated. They define abstract method templates that concrete subclasses must implement. Time: O(1)."
  },
  {
    id: "dsa_abs2",
    category: "abstraction",
    title: "Abstract Bank Account Interest",
    difficulty: "Easy",
    statement: "Define abstract class BankAccount with balance. Define abstract method addInterest(). Subclass SavingsAccount overrides addInterest() to add 5% to the balance.",
    constraints: "Abstract method overriding",
    inputOutput: "Input: balance = 1000\nOutput: 1050",
    solution: `abstract class BankAccount {
    double balance;
    
    BankAccount(double balance) {
        this.balance = balance;
    }
    
    abstract void addInterest();
}

class SavingsAccount extends BankAccount {
    SavingsAccount(double balance) {
        super(balance);
    }
    
    @Override
    void addInterest() {
        this.balance += this.balance * 0.05;
    }
}

public class Solution {
    public double getMaturedBalance(double bal) {
        BankAccount acc = new SavingsAccount(bal);
        acc.addInterest();
        return acc.balance;
    }
}`,
    explanation: "Hides implementation details of adding interest while enforcing the contract on derived subclasses. Time: O(1)."
  },

  // 14. interface
  {
    id: "dsa_interface1",
    category: "interface",
    title: "Interface Printer Print Status",
    difficulty: "Easy",
    statement: "Create an interface Printer with method getStatus(). Implement Printer in LaserPrinter to return 'Laser Printing'. Call using a reference of type Printer.",
    constraints: "Interface implementation",
    inputOutput: "Input: None\nOutput: \"Laser Printing\"",
    solution: `interface Printer {
    String getStatus();
}

class LaserPrinter implements Printer {
    public String getStatus() {
        return "Laser Printing";
    }
}

public class Solution {
    public String printLaser() {
        Printer p = new LaserPrinter();
        return p.getStatus();
    }
}`,
    explanation: "Interfaces define pure contracts containing public abstract methods. Classes use `implements` to conform to them. Time: O(1)."
  },
  {
    id: "dsa_interface2",
    category: "interface",
    title: "Double Interface Implementation",
    difficulty: "Easy",
    statement: "Create interfaces Clickable and Hoverable. Implement both in Button. getClickResponse() returns 'Clicked' and getHoverResponse() returns 'Hovered'.",
    constraints: "Multiple interfaces",
    inputOutput: "Input: None\nOutput: \"ClickedHovered\"",
    solution: `interface Clickable {
    String getClickResponse();
}

interface Hoverable {
    String getHoverResponse();
}

class Button implements Clickable, Hoverable {
    public String getClickResponse() {
        return "Clicked";
    }
    public String getHoverResponse() {
        return "Hovered";
    }
}

public class Solution {
    public String testInputs() {
        Button btn = new Button();
        return btn.getClickResponse() + btn.getHoverResponse();
    }
}`,
    explanation: "Java allows a class to implement multiple interfaces, enabling a form of multiple inheritance of types. Time: O(1)."
  },

  // 15. package and access modifier
  {
    id: "dsa_access1",
    category: "package and access modifier",
    title: "Access Protected Members",
    difficulty: "Easy",
    statement: "Create a class Base in package a with protected field code. Create subclass Derived in package b. Use a method to access code and return it.",
    constraints: "Access modifier boundaries",
    inputOutput: "Input: code = 99\nOutput: 99",
    solution: `// Simulated packages in single code runner
class Base {
    protected int code;
    
    Base(int code) {
        this.code = code;
    }
}

class Derived extends Base {
    Derived(int code) {
        super(code);
    }
    
    int getProtectedCode() {
        return this.code; // Accessible within subclasses
    }
}

public class Solution {
    public int getCode(int val) {
        Derived d = new Derived(val);
        return d.getProtectedCode();
    }
}`,
    explanation: "Protected variables are accessible only within the package or through inheritance subclasses in other packages. Time: O(1)."
  },
  {
    id: "dsa_access2",
    category: "package and access modifier",
    title: "Private Field Encapsulation Test",
    difficulty: "Easy",
    statement: "Define class Secret. It holds a private field key. Provide a package-private method setKey(int k) and public getKey() to retrieve it.",
    constraints: "Private boundary restrictions",
    inputOutput: "Input: key = 404\nOutput: 404",
    solution: `class Secret {
    private int key;
    
    void setKey(int k) { // Package-private
        this.key = k;
    }
    
    public int getKey() { // Public
        return this.key;
    }
}

public class Solution {
    public int accessSecret(int k) {
        Secret s = new Secret();
        s.setKey(k);
        return s.getKey();
    }
}`,
    explanation: "Private fields are strictly hidden inside class bounds. Public or package-private helper methods handle external modification. Time: O(1)."
  },

  // 16. encapsulation
  {
    id: "dsa_encap1",
    category: "encapsulation",
    title: "Encapsulated Student Scores",
    difficulty: "Easy",
    statement: "Create a class Student with private field score. Implement getter getScore() and setter setScore(int score). The setter must clamp scores between 0 and 100.",
    constraints: "Data validation constraints",
    inputOutput: "Input: score = 105\nOutput: 100",
    solution: `class Student {
    private int score;
    
    public int getScore() {
        return this.score;
    }
    
    public void setScore(int score) {
        if (score > 100) {
            this.score = 100;
        } else if (score < 0) {
            this.score = 0;
        } else {
            this.score = score;
        }
    }
}

public class Solution {
    public int getClampedScore(int val) {
        Student stu = new Student();
        stu.setScore(val);
        return stu.getScore();
    }
}`,
    explanation: "Encapsulation hides field variables and exposes setter validation. It protects internal objects from invalid configurations. Time: O(1)."
  },
  {
    id: "dsa_encap2",
    category: "encapsulation",
    title: "Safe Banking Deposit",
    difficulty: "Easy",
    statement: "Define a Bank account class with a private field double balance. Setter deposit(double amt) ignores values <= 0.",
    constraints: "Non-negative balances",
    inputOutput: "Input: deposit = -50, initial = 100\nOutput: 100",
    solution: `class Account {
    private double balance;
    
    Account(double initial) {
        this.balance = initial;
    }
    
    public double getBalance() {
        return this.balance;
    }
    
    public void deposit(double amt) {
        if (amt > 0) {
            this.balance += amt;
        }
    }
}

public class Solution {
    public double tryTransaction(double depositVal, double initialVal) {
        Account acc = new Account(initialVal);
        acc.deposit(depositVal);
        return acc.getBalance();
    }
}`,
    explanation: "Protects balance against corruption by using validation rules inside public set methods. Time: O(1)."
  },

  // 17. array
  {
    id: "dsa_arr1",
    category: "array",
    title: "LeetCode 1929: Concatenation of Array",
    difficulty: "Medium",
    statement: "Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed). Return the array ans.",
    constraints: "1 <= nums.length <= 1000",
    inputOutput: "Input: [1,2,1]\nOutput: [1,2,1,1,2,1]",
    solution: `public class Solution {
    public int[] getConcatenation(int[] nums) {
        int n = nums.length;
        int[] ans = new int[2 * n];
        for (int i = 0; i < n; i++) {
            ans[i] = nums[i];
            ans[i + n] = nums[i];
        }
        return ans;
    }
}`,
    explanation: "Tests array allocation and sequential index access. We initialize an array of double-size and copy elements in a simple O(N) loop."
  },
  {
    id: "dsa_arr2",
    category: "array",
    title: "LeetCode 1480: Running Sum of 1D Array",
    difficulty: "Medium",
    statement: "Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]). Return the running sum of nums.",
    constraints: "1 <= nums.length <= 1000",
    inputOutput: "Input: [1,2,3,4]\nOutput: [1,3,6,10]\nExplanation: [1, 1+2, 1+2+3, 1+2+3+4].",
    solution: `public class Solution {
    public int[] runningSum(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            nums[i] += nums[i - 1];
        }
        return nums;
    }
}`,
    explanation: "Computes prefix aggregates in-place. Modifies the array directly by accumulating previous running sums in O(N) time and O(1) extra space."
  },

  // 18. string
  {
    id: "dsa_str1",
    category: "string",
    title: "LeetCode 1108: Defanging an IP Address",
    difficulty: "Medium",
    statement: "Given a valid (IPv4) IP address, return a defanged version of that IP address. A defanged IP address replaces every period '.' with '[.]'.",
    constraints: "Valid IP address length",
    inputOutput: "Input: address = \"1.1.1.1\"\nOutput: \"1[.]1[.]1[.]1\"",
    solution: `public class Solution {
    public String defangIPaddr(String address) {
        return address.replace(".", "[.]");
    }
}`,
    explanation: "Tests Java String replacement behaviors. String class has internal optimizations for regex replacements. Runs in linear O(N) time."
  },
  {
    id: "dsa_str2",
    category: "string",
    title: "LeetCode 2011: Final Value of Variable After Performing Operations",
    difficulty: "Medium",
    statement: "There is a programming language with only four operations and one variable X, initially 0:\n- ++X and X++ increment the value of the variable X by 1.\n- --X and X-- decrement the value of the variable X by 1.\nGiven an array of strings operations containing a list of operations, return the final value of X.",
    constraints: "1 <= operations.length <= 100",
    inputOutput: "Input: [\"--X\",\"X++\",\"X++\"]\nOutput: 1",
    solution: `public class Solution {
    public int finalValueAfterOperations(String[] operations) {
        int x = 0;
        for (int i = 0; i < operations.length; i++) {
            String op = operations[i];
            if (op.charAt(1) == '+') {
                x++;
            } else {
                x--;
            }
        }
        return x;
    }
}`,
    explanation: "Looks up index characters in strings. Checking index 1 of the operation string ('+' or '-') indicates increment/decrement. Time: O(N)."
  },

  // 19. exceptional handling
  {
    id: "dsa_ex1",
    category: "exceptional handling",
    title: "Safe String to Integer Parser",
    difficulty: "Medium",
    statement: "Given a String s representing an integer, parse it using `Integer.parseInt(s)`. If the parsing fails due to `NumberFormatException`, catch the exception and return -1. Otherwise, return the parsed integer.",
    constraints: "Try-catch blocks",
    inputOutput: "Input: s = \"12a\"\nOutput: -1",
    solution: `public class Solution {
    public int safeParseInt(String s) {
        try {
            return Integer.parseInt(s);
        } catch (NumberFormatException e) {
            return -1;
        }
    }
}`,
    explanation: "Demonstrates using standard try-catch block to handle runtime exceptions in Java. It intercepts NumberFormatException when parsing invalid numerical string formats. Time: O(N) where N is string length."
  },
  {
    id: "dsa_ex2",
    category: "exceptional handling",
    title: "Custom Age Validator Exception",
    difficulty: "Medium",
    statement: "Create a custom Checked Exception `InvalidAgeException`. Write a class AgeValidator with a method validate(int age) that throws `InvalidAgeException` with message 'Age must be between 18 and 100' if age is not in range [18, 100]. Implement.",
    constraints: "Custom exceptions",
    inputOutput: "Input: age = 155\nOutput: \"Age must be between 18 and 100\"",
    solution: `class InvalidAgeException extends Exception {
    InvalidAgeException(String msg) {
        super(msg);
    }
}

public class Solution {
    public String checkAge(int age) {
        try {
            if (age < 18 || age > 100) {
                throw new InvalidAgeException("Age must be between 18 and 100");
            }
            return "Valid Age";
        } catch (InvalidAgeException e) {
            return e.getMessage();
        }
    }
}`,
    explanation: "Tests custom exception definitions extending Exception class. Throwing instances must be declared or handled within try-catch wrapper logic. Time: O(1)."
  },

  // 20. i/o
  {
    id: "dsa_io1",
    category: "i/o",
    title: "Line Count Scanner Reader",
    difficulty: "Medium",
    statement: "Given a multiline string simulating system inputs, write a parser using java.util.Scanner to count the number of lines present.",
    constraints: "Scanner usage",
    inputOutput: "Input: \"Line1\\nLine2\\nLine3\"\nOutput: 3",
    solution: `import java.util.Scanner;

public class Solution {
    public int countLines(String input) {
        Scanner sc = new Scanner(input);
        int count = 0;
        while (sc.hasNextLine()) {
            sc.nextLine();
            count++;
        }
        sc.close();
        return count;
    }
}`,
    explanation: "Demonstrates using the java.util.Scanner class to consume input streams iteratively. Time complexity: O(chars)."
  },
  {
    id: "dsa_io2",
    category: "i/o",
    title: "Scanner Sum of Integers",
    difficulty: "Medium",
    statement: "Use a Scanner to parse a space-separated sequence of integer values and return their total sum.",
    constraints: "Space separation format",
    inputOutput: "Input: \"10 20 30\"\nOutput: 60",
    solution: `import java.util.Scanner;

public class Solution {
    public int sumInputIntegers(String input) {
        Scanner sc = new Scanner(input);
        int sum = 0;
        while (sc.hasNextInt()) {
            sum += sc.nextInt();
        }
        sc.close();
        return sum;
    }
}`,
    explanation: "Demonstrates token-based parsing of numeric data using `hasNextInt()` and `nextInt()` static inputs. Time: O(N)."
  },

  // 21. multithreading
  {
    id: "dsa_thread1",
    category: "multithreading",
    title: "Thread Worker Execution",
    difficulty: "Medium",
    statement: "Create a simple class ThreadWorker extending Thread. Set a private counter variable. Inside run(), increment counter to 1. Instantiate, start, and join the thread to verify it completed.",
    constraints: "Thread state synchronization",
    inputOutput: "Input: None\nOutput: 1",
    solution: `class ThreadWorker extends Thread {
    int counter = 0;
    
    @Override
    public void run() {
        counter++;
    }
}

public class Solution {
    public int runWorker() throws InterruptedException {
        ThreadWorker worker = new ThreadWorker();
        worker.start();
        worker.join(); // Wait for completion
        return worker.counter;
    }
}`,
    explanation: "Tests thread spawning and standard synchronization (`join()`) to ensure asynchronous modifications have completed. Time: O(1)."
  },
  {
    id: "dsa_thread2",
    category: "multithreading",
    title: "Runnable Task Runner",
    difficulty: "Medium",
    statement: "Define a task implementing Runnable that increments a shared class variable. Instantiate, load it into a Thread wrapper, run, and wait.",
    constraints: "Runnable interfaces",
    inputOutput: "Input: Initial val = 5\nOutput: 6",
    solution: `class Task implements Runnable {
    int val;
    
    Task(int val) {
        this.val = val;
    }
    
    public void run() {
        val++;
    }
}

public class Solution {
    public int executeTask(int start) throws InterruptedException {
        Task task = new Task(start);
        Thread thread = new Thread(task);
        thread.start();
        thread.join();
        return task.val;
    }
}`,
    explanation: "Demonstrates starting subtasks by encapsulating logical statements inside the Runnable interface model. Time: O(1)."
  },

  // 22. inner class
  {
    id: "dsa_inner1",
    category: "inner class",
    title: "Outer Inner Field Multiplier",
    difficulty: "Medium",
    statement: "Define an outer class Calculator with private field factor. Define non-static inner class Estimator with method multiply(int val) that returns val * factor.",
    constraints: "Inner class linkages",
    inputOutput: "Input: factor = 5, val = 10\nOutput: 50",
    solution: `class Calculator {
    private int factor;
    
    Calculator(int factor) {
        this.factor = factor;
    }
    
    class Estimator {
        int multiply(int val) {
            return val * factor; // Accesses outer private field
        }
    }
}

public class Solution {
    public int calculate(int factor, int val) {
        Calculator calc = new Calculator(factor);
        Calculator.Estimator est = calc.new Estimator();
        return est.multiply(val);
    }
}`,
    explanation: "Non-static inner classes retain an implicit reference to their outer instance, enabling access to outer private fields. Time: O(1)."
  },
  {
    id: "dsa_inner2",
    category: "inner class",
    title: "Static Nested Helper",
    difficulty: "Medium",
    statement: "Create outer class Container. Define static nested class Helper with static method getGreeting() returning 'Hello Nested'.",
    constraints: "Static inner rules",
    inputOutput: "Input: None\nOutput: \"Hello Nested\"",
    solution: `class Container {
    static class Helper {
        static String getGreeting() {
            return "Hello Nested";
        }
    }
}

public class Solution {
    public String getGreeting() {
        return Container.Helper.getGreeting();
    }
}`,
    explanation: "Static nested classes do not have references to outer class instances. They act as nested namespaces. Time: O(1)."
  },

  // 23. arraylist
  {
    id: "dsa_list1",
    category: "arraylist",
    title: "ArrayList Odd Filters",
    difficulty: "Medium",
    statement: "Given an array of integers, insert them into an ArrayList. Write a method to filter out all odd values and return the updated ArrayList.",
    constraints: "Dynamic array storage",
    inputOutput: "Input: [1, 2, 3, 4, 5]\nOutput: [2, 4]",
    solution: `import java.util.ArrayList;

public class Solution {
    public ArrayList<Integer> filterOdds(int[] nums) {
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            list.add(nums[i]);
        }
        
        ArrayList<Integer> evens = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            int val = list.get(i);
            if (val % 2 == 0) {
                evens.add(val);
            }
        }
        return evens;
    }
}`,
    explanation: "Tests dynamic resize structures (ArrayList). Demonstrates additions and index lookup iterations. Time complexity: O(N)."
  },
  {
    id: "dsa_list2",
    category: "arraylist",
    title: "List Element Finder index",
    difficulty: "Medium",
    statement: "Write a program that searches for an element in an ArrayList of strings, returning its 0-indexed position, or -1 if absent.",
    constraints: "String containment check",
    inputOutput: "Input: list = [\"A\",\"B\",\"C\"], target = \"B\"\nOutput: 1",
    solution: `import java.util.ArrayList;

public class Solution {
    public int findElement(ArrayList<String> list, String target) {
        return list.indexOf(target);
    }
}`,
    explanation: "Uses index searching helpers of ArrayList. Runs in O(N) time with sequential equality comparisons."
  },

  // 24. linkedlist
  {
    id: "dsa_linkedlist1",
    category: "linkedlist",
    title: "LinkedList Queue Simulator",
    difficulty: "Medium",
    statement: "Given an array of integers, add them one by one to a LinkedList using addLast(). Remove the first element using removeFirst() and return it.",
    constraints: "Queue interface simulation",
    inputOutput: "Input: [10, 20, 30]\nOutput: 10",
    solution: `import java.util.LinkedList;

public class Solution {
    public int simulateQueue(int[] inputs) {
        LinkedList<Integer> list = new LinkedList<>();
        for (int i = 0; i < inputs.length; i++) {
            list.addLast(inputs[i]);
        }
        return list.removeFirst();
    }
}`,
    explanation: "LinkedList acts as a doubly-linked list. Inserting at tail and extracting from head are fast constant-time O(1) operations."
  },
  {
    id: "dsa_linkedlist2",
    category: "linkedlist",
    title: "LinkedList Reverse Traversal",
    difficulty: "Medium",
    statement: "Use LinkedList descendingIterator() to extract items in reverse order. Return them as a new ArrayList.",
    constraints: "Reverse iteration",
    inputOutput: "Input: [1, 2, 3]\nOutput: [3, 2, 1]",
    solution: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;

public class Solution {
    public ArrayList<Integer> reverseList(LinkedList<Integer> list) {
        ArrayList<Integer> result = new ArrayList<>();
        Iterator<Integer> it = list.descendingIterator();
        while (it.hasNext()) {
            result.add(it.next());
        }
        return result;
    }
}`,
    explanation: "descendingIterator traversing of LinkedList permits sequential reverse pointer navigation in O(N) time."
  },

  // 25. vector
  {
    id: "dsa_vector1",
    category: "vector",
    title: "Vector Capacity Doubles",
    difficulty: "Medium",
    statement: "Create a Vector of integers. Write a program to add 11 elements to a default Vector and return its internal capacity size.",
    constraints: "Capacity tracking",
    inputOutput: "Input: None\nOutput: 20\nExplanation: Default capacity 10 doubles to 20.",
    solution: `import java.util.Vector;

public class Solution {
    public int getVectorCapacity() {
        Vector<Integer> vec = new Vector<>(10);
        for (int i = 1; i <= 11; i++) {
            vec.add(i);
        }
        return vec.capacity();
    }
}`,
    explanation: "Vectors automatically double their internal memory allocation boundaries when reaching full constraints capacity. Time: O(N)."
  },
  {
    id: "dsa_vector2",
    category: "vector",
    title: "Thread Safe Vector Search",
    difficulty: "Medium",
    statement: "Given a Vector of strings, search for a target element. Return true if present, false otherwise.",
    constraints: "Vector search methods",
    inputOutput: "Input: vec = [\"X\",\"Y\"], target = \"Y\"\nOutput: true",
    solution: `import java.util.Vector;

public class Solution {
    public boolean searchVector(Vector<String> vec, String target) {
        return vec.contains(target);
    }
}`,
    explanation: "Vector contains() is thread-safe due to synchronized keywords on elements searching processes. Time: O(N)."
  },

  // 26. stack
  {
    id: "dsa_stack1",
    category: "stack",
    title: "LeetCode 20: Valid Parentheses (Simplified)",
    difficulty: "Medium",
    statement: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if brackets close in the correct order.",
    constraints: "Balanced bracket count",
    inputOutput: "Input: \"()[]{}\"\nOutput: true",
    solution: `import java.util.Stack;

public class Solution {
    public boolean isValidBrackets(String s) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }
}`,
    explanation: "Uses a LIFO Stack to track nested structures. Opening symbols push to stack; matching closing symbols pop them. Time: O(N)."
  },
  {
    id: "dsa_stack2",
    category: "stack",
    title: "Integer Base-2 Converter",
    difficulty: "Medium",
    statement: "Convert a decimal integer to its binary string representation using a Stack to store remainders.",
    constraints: "Positive decimals",
    inputOutput: "Input: dec = 10\nOutput: \"1010\"",
    solution: `import java.util.Stack;

public class Solution {
    public String convertDecimal(int dec) {
        if (dec == 0) return "0";
        Stack<Integer> stack = new Stack<>();
        while (dec > 0) {
            stack.push(dec % 2);
            dec /= 2;
        }
        
        String res = "";
        while (!stack.isEmpty()) {
            res += stack.pop();
        }
        return res;
    }
}`,
    explanation: "LIFO collections reverse remaining digits collected from division steps to construct string headers in O(log N) time."
  },

  // 27. hashset
  {
    id: "dsa_set1",
    category: "hashset",
    title: "LeetCode 217: Contains Duplicate",
    difficulty: "Medium",
    statement: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    constraints: "1 <= nums.length <= 10^5",
    inputOutput: "Input: [1,2,3,1]\nOutput: true",
    solution: `import java.util.HashSet;

public class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> set = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            if (set.contains(nums[i])) {
                return true;
            }
            set.add(nums[i]);
        }
        return false;
    }
}`,
    explanation: "Uses HashSet to track unique visits. Lookup and insertion operations operate in average O(1) time, giving O(N) total runtime."
  },
  {
    id: "dsa_set2",
    category: "hashset",
    title: "Array Intersection Counter",
    difficulty: "Medium",
    statement: "Given two integer arrays, find the count of unique intersecting values using HashSets.",
    constraints: "Duplicate values possible",
    inputOutput: "Input: [1,2,2,3], [2,2,4]\nOutput: 1\nExplanation: Only number 2 intersects.",
    solution: `import java.util.HashSet;

public class Solution {
    public int getIntersectionCount(int[] a, int[] b) {
        HashSet<Integer> set1 = new HashSet<>();
        for (int i = 0; i < a.length; i++) set1.add(a[i]);
        
        HashSet<Integer> set2 = new HashSet<>();
        int count = 0;
        for (int i = 0; i < b.length; i++) {
            if (set1.contains(b[i]) && !set2.contains(b[i])) {
                count++;
                set2.add(b[i]);
            }
        }
        return count;
    }
}`,
    explanation: "Uses HashSets to eliminate duplicate elements and compute intersections in O(N + M) total average time complexity."
  },

  // 28. linkedhashset
  {
    id: "dsa_linkedset1",
    category: "linkedhashset",
    title: "LinkedHashSet Insertion Order Preserved",
    difficulty: "Medium",
    statement: "Given an array of strings containing duplicates, filter them to keep unique values while maintaining the insertion order. Return as List.",
    constraints: "Maintain sequence order",
    inputOutput: "Input: [\"Z\",\"A\",\"Z\",\"B\"]\nOutput: [\"Z\",\"A\",\"B\"]",
    solution: `import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

public class Solution {
    public List<String> uniqueInsertionOrder(String[] inputs) {
        LinkedHashSet<String> set = new LinkedHashSet<>();
        for (int i = 0; i < inputs.length; i++) {
            set.add(inputs[i]);
        }
        return new ArrayList<>(set);
    }
}`,
    explanation: "LinkedHashSet maintains a doubly-linked list running through all of its elements to preserve insertion sequence. Time: O(N)."
  },
  {
    id: "dsa_linkedset2",
    category: "linkedhashset",
    title: "First Non-Repeating Character",
    difficulty: "Medium",
    statement: "Find the first non-repeating character in a string using a LinkedHashSet to track uniqueness. Return character, or '-' if none.",
    constraints: "Lowercase alphabets",
    inputOutput: "Input: s = \"swiss\"\nOutput: 'w'",
    solution: `import java.util.LinkedHashSet;

public class Solution {
    public char firstUniqueChar(String s) {
        LinkedHashSet<Character> unique = new LinkedHashSet<>();
        LinkedHashSet<Character> duplicates = new LinkedHashSet<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (duplicates.contains(c)) continue;
            if (unique.contains(c)) {
                unique.remove(c);
                duplicates.add(c);
            } else {
                unique.add(c);
            }
        }
        if (unique.isEmpty()) return '-';
        return unique.iterator().next(); // First element in insertion order
    }
}`,
    explanation: "Using LinkedHashSet ensures that order is preserved, so the first element returned is the first unique character. Time: O(N)."
  },

  // 29. treeset
  {
    id: "dsa_treeset1",
    category: "treeset",
    title: "TreeSet Sorted Unique Elements",
    difficulty: "Medium",
    statement: "Given an array of integers, remove duplicates and return the elements sorted in ascending order using a TreeSet.",
    constraints: "Automatic ordering",
    inputOutput: "Input: [9, 3, 9, 1]\nOutput: [1, 3, 9]",
    solution: `import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

public class Solution {
    public List<Integer> sortUnique(int[] nums) {
        TreeSet<Integer> set = new TreeSet<>();
        for (int i = 0; i < nums.length; i++) {
            set.add(nums[i]);
        }
        return new ArrayList<>(set);
    }
}`,
    explanation: "TreeSet utilizes a Red-Black tree structure. Inserting elements automatically sorts them in natural order. Time: O(N log N)."
  },
  {
    id: "dsa_treeset2",
    category: "treeset",
    title: "Find Ceiling Element",
    difficulty: "Medium",
    statement: "Given an array of integers, find the smallest element that is greater than or equal to target using TreeSet. Return -1 if not found.",
    constraints: "Binary Tree searches",
    inputOutput: "Input: [10, 20, 30, 40], target = 25\nOutput: 30",
    solution: `import java.util.TreeSet;

public class Solution {
    public int findCeiling(int[] inputs, int target) {
        TreeSet<Integer> set = new TreeSet<>();
        for (int i = 0; i < inputs.length; i++) {
            set.add(inputs[i]);
        }
        Integer ceil = set.ceiling(target);
        return ceil == null ? -1 : ceil;
    }
}`,
    explanation: "The ceiling() method in TreeSet executes a binary search look-up on sorted trees in O(log N) runtime."
  },

  // 30. priorityqueue
  {
    id: "dsa_pq1",
    category: "priorityqueue",
    title: "LeetCode 703: Kth Largest Element in a Stream (Simplified)",
    difficulty: "Medium",
    statement: "Given an array of integers, find the 3rd largest value using a PriorityQueue (Min-Heap).",
    constraints: "Heap capacity size of 3",
    inputOutput: "Input: [4, 5, 8, 2]\nOutput: 5\nExplanation: Sorted elements are 8, 5, 4, 2. The 3rd largest is 5.",
    solution: `import java.util.PriorityQueue;

public class Solution {
    public int findThirdLargest(int[] nums) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(); // Min-heap
        for (int i = 0; i < nums.length; i++) {
            pq.add(nums[i]);
            if (pq.size() > 3) {
                pq.poll(); // Keep only 3 largest elements
            }
        }
        return pq.peek();
    }
}`,
    explanation: "Min-heap maintains the smallest elements at the top. Restricting size to K holds only the K largest elements. Time: O(N log K)."
  },
  {
    id: "dsa_pq2",
    category: "priorityqueue",
    title: "Stream Join Cost Minimized",
    difficulty: "Medium",
    statement: "Given rope lengths, join them with minimum cost. Cost is the sum of their lengths. Use PriorityQueue.",
    constraints: "Connect ropes greedy logic",
    inputOutput: "Input: [4, 3, 2, 6]\nOutput: 29",
    solution: `import java.util.PriorityQueue;

public class Solution {
    public int getMinJoinCost(int[] ropes) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int i = 0; i < ropes.length; i++) pq.add(ropes[i]);
        
        int totalCost = 0;
        while (pq.size() > 1) {
            int first = pq.poll();
            int second = pq.poll();
            int cost = first + second;
            totalCost += cost;
            pq.add(cost);
        }
        return totalCost;
    }
}`,
    explanation: "Repeatedly pools the two shortest ropes, merges them, and inserts them back. Runs in O(N log N) using a min-heap."
  },

  // 31. deque
  {
    id: "dsa_deque1",
    category: "deque",
    title: "Deque Sliding Window Sum (K=2)",
    difficulty: "Medium",
    statement: "Given an array, return a list containing the maximum sum of adjacent elements (window K=2) using ArrayDeque.",
    constraints: "ArrayDeque double-ended",
    inputOutput: "Input: [1, 3, -1, 5]\nOutput: 4\nExplanation: Max of (1+3), (3-1), (-1+5) is 4.",
    solution: `import java.util.ArrayDeque;

public class Solution {
    public int getMaxAdjacentSum(int[] nums) {
        ArrayDeque<Integer> deque = new ArrayDeque<>();
        int maxSum = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            deque.addLast(nums[i]);
            if (deque.size() == 2) {
                int first = deque.removeFirst();
                int second = deque.peekFirst();
                int sum = first + second;
                if (sum > maxSum) {
                    maxSum = sum;
                }
            }
        }
        return maxSum;
    }
}`,
    explanation: "Uses ArrayDeque to maintain a sliding window of size 2. Constant time O(1) insertions and removals at both ends."
  },
  {
    id: "dsa_deque2",
    category: "deque",
    title: "Palindrome Deque Checker",
    difficulty: "Medium",
    statement: "Check if a string is a palindrome by adding characters to a Deque and comparing matching extremes.",
    constraints: "Case-sensitive characters",
    inputOutput: "Input: s = \"racecar\"\nOutput: true",
    solution: `import java.util.ArrayDeque;

public class Solution {
    public boolean checkPalindrome(String s) {
        ArrayDeque<Character> deque = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            deque.addLast(s.charAt(i));
        }
        
        while (deque.size() > 1) {
            char first = deque.removeFirst();
            char last = deque.removeLast();
            if (first != last) {
                return false;
            }
        }
        return true;
    }
}`,
    explanation: "Extracts elements concurrently from front and back. Mismatch ends palindrome checks. Time: O(N) with O(N) storage."
  },

  // 32. hashmap
  {
    id: "dsa_map1",
    category: "hashmap",
    title: "LeetCode 1: Two Sum",
    difficulty: "Medium",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nAssume each input has exactly one solution and you may not use the same element twice.",
    constraints: "2 <= nums.length <= 1000",
    inputOutput: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
    solution: `import java.util.HashMap;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
    explanation: "Two Sum is optimized using a HashMap to store values and indices. We inspect complements in O(1) lookup time, resulting in O(N) runtime."
  },
  {
    id: "dsa_map2",
    category: "hashmap",
    title: "LeetCode 136: Single Number",
    difficulty: "Medium",
    statement: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    constraints: "Linear O(N) runtime",
    inputOutput: "Input: [2,2,1]\nOutput: 1",
    solution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int singleNumber(int[] nums) {
        HashMap<Integer, Integer> counts = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            counts.put(nums[i], counts.getOrDefault(nums[i], 0) + 1);
        }
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == 1) {
                return entry.getKey();
            }
        }
        return -1;
    }
}`,
    explanation: "Counts occurrences using HashMap. Resolving single counts isolates the non-repeated element in O(N) time."
  },

  // 33. linkedhashmap
  {
    id: "dsa_linkedmap1",
    category: "linkedhashmap",
    title: "LinkedHashMap Element Frequency order",
    difficulty: "Medium",
    statement: "Given an array of strings, collect their frequency count in a LinkedHashMap and return it. This ensures output keys match insertion order.",
    constraints: "Output key tracking",
    inputOutput: "Input: [\"Z\",\"A\",\"Z\",\"B\"]\nOutput: {Z=2, A=1, B=1}",
    solution: `import java.util.LinkedHashMap;

public class Solution {
    public LinkedHashMap<String, Integer> countFrequencies(String[] inputs) {
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        for (int i = 0; i < inputs.length; i++) {
            String key = inputs[i];
            map.put(key, map.getOrDefault(key, 0) + 1);
        }
        return map;
    }
}`,
    explanation: "LinkedHashMap preserves key insertion order, ensuring iteration displays entries in their chronological arrival sequence. Time: O(N)."
  },
  {
    id: "dsa_linkedmap2",
    category: "linkedhashmap",
    title: "Access Cache Order Tracker",
    difficulty: "Medium",
    statement: "Initialize LinkedHashMap in access-order mode. Access one element. Return the last element in iteration.",
    constraints: "LinkedHashMap flags",
    inputOutput: "Input: put A, B, C; get A\nOutput: \"A\"\nExplanation: Access shifts A to end.",
    solution: `import java.util.LinkedHashMap;
import java.util.Map;

public class Solution {
    public String trackAccessOrder() {
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>(16, 0.75f, true);
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);
        map.get("A"); // Shift to tail
        
        String last = "";
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            last = entry.getKey();
        }
        return last;
    }
}`,
    explanation: "Instantiating LinkedHashMap with the accessOrder flag set to true moves accessed elements to the tail of the iteration list. Time: O(1)."
  },

  // 34. treemap
  {
    id: "dsa_treemap1",
    category: "treemap",
    title: "TreeMap Key Sorting",
    difficulty: "Medium",
    statement: "Given custom string keys and their values, insert them into a TreeMap. Return the values sorted alphabetically by their keys.",
    constraints: "Keys natural sorting",
    inputOutput: "Input: {Banana=2, Apple=5}\nOutput: [5, 2]\nExplanation: Apple(5) comes before Banana(2).",
    solution: `import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

public class Solution {
    public List<Integer> getSortedValues(String[] keys, int[] vals) {
        TreeMap<String, Integer> map = new TreeMap<>();
        for (int i = 0; i < keys.length; i++) {
            map.put(keys[i], vals[i]);
        }
        return new ArrayList<>(map.values());
    }
}`,
    explanation: "TreeMap stores key-value pairs sorted by keys using a Red-Black tree structure. Insertion and search run in O(log N) time."
  },
  {
    id: "dsa_treemap2",
    category: "treemap",
    title: "TreeMap Range Query",
    difficulty: "Medium",
    statement: "Write a program to retrieve all keys between boundaries low and high (inclusive) from a TreeMap. Return them as a List.",
    constraints: "TreeMap subMap helper",
    inputOutput: "Input: Map={10=A, 20=B, 30=C}, low=15, high=35\nOutput: [20, 30]",
    solution: `import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

public class Solution {
    public List<Integer> getKeysInRange(int[] keys, String[] values, int low, int high) {
        TreeMap<Integer, String> map = new TreeMap<>();
        for (int i = 0; i < keys.length; i++) {
            map.put(keys[i], values[i]);
        }
        return new ArrayList<>(map.subMap(low, true, high, true).keySet());
    }
}`,
    explanation: "TreeMap subMap() does a range query using tree traversal paths. Runs in O(log N + count) time."
  },

  // 35. lambda expression
  {
    id: "dsa_lambda1",
    category: "lambda expression",
    title: "Lambda Sorting Comparator",
    difficulty: "Hard",
    statement: "Given a list of strings, use a lambda expression `(a, b) -> a.compareTo(b)` to sort them. Return the sorted List.",
    constraints: "Java 8 Lambdas",
    inputOutput: "Input: [\"Z\",\"C\",\"A\"]\nOutput: [\"A\",\"C\",\"Z\"]",
    solution: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    public List<String> sortStringsLambda(List<String> list) {
        Collections.sort(list, (a, b) -> a.compareTo(b));
        return list;
    }
}`,
    explanation: "Lambda expressions provide clear implementations of single abstract method interfaces (Functional Interfaces). Time: O(N log N)."
  },
  {
    id: "dsa_lambda2",
    category: "lambda expression",
    title: "Lambda Math Expression Solver",
    difficulty: "Hard",
    statement: "Define a functional interface MathOperation with method operate(int a, int b). Implement addition using a lambda.",
    constraints: "Functional signatures",
    inputOutput: "Input: 15, 25\nOutput: 40",
    solution: `interface MathOperation {
    int operate(int a, int b);
}

public class Solution {
    public int solveOp(int a, int b) {
        MathOperation addition = (x, y) -> x + y;
        return addition.operate(a, b);
    }
}`,
    explanation: "A lambda expression `(x, y) -> x + y` binds to the MathOperation interface, defining behavioral inputs. Time: O(1)."
  },

  // 36. method reference
  {
    id: "dsa_ref1",
    category: "method reference",
    title: "Static Method Reference Parser",
    difficulty: "Hard",
    statement: "Given a List of Strings representing integers, parse them to a List of Integers using the method reference `Integer::parseInt`.",
    constraints: "Method references format",
    inputOutput: "Input: [\"12\",\"34\"]\nOutput: [12, 34]",
    solution: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class Solution {
    public List<Integer> parseIntegers(List<String> inputs) {
        List<Integer> result = new ArrayList<>();
        Function<String, Integer> parser = Integer::parseInt; // Method reference
        for (int i = 0; i < inputs.size(); i++) {
            result.add(parser.apply(inputs.get(i)));
        }
        return result;
    }
}`,
    explanation: "Method references are shorthand notations for lambda expressions calling existing methods. `Integer::parseInt` replaces `x -> Integer.parseInt(x)`. Time: O(N)."
  },
  {
    id: "dsa_ref2",
    category: "method reference",
    title: "Instance Method Reference",
    difficulty: "Hard",
    statement: "Use an instance method reference `String::toUpperCase` to transform lowercase string objects to uppercase.",
    constraints: "Instance methods references",
    inputOutput: "Input: s = \"hello\"\nOutput: \"HELLO\"",
    solution: `import java.util.function.Supplier;

public class Solution {
    public String transformString(String input) {
        Supplier<String> sup = input::toUpperCase;
        return sup.get();
    }
}`,
    explanation: "Binds an instance method reference to a functional Supplier interface, executing the code on the instance pointer. Time: O(1)."
  },

  // 37. functional interface
  {
    id: "dsa_func1",
    category: "functional interface",
    title: "Predicate Range Validator",
    difficulty: "Hard",
    statement: "Combine two Predicate instances: isEven and isGreaterThanTen. Return true if value satisfies both.",
    constraints: "Functional interfaces",
    inputOutput: "Input: val = 12\nOutput: true",
    solution: `import java.util.function.Predicate;

public class Solution {
    public boolean checkRangePredicate(int val) {
        Predicate<Integer> isEven = x -> x % 2 == 0;
        Predicate<Integer> isGreater = x -> x > 10;
        return isEven.and(isGreater).test(val);
    }
}`,
    explanation: "Uses `Predicate` interfaces and joins them using `and()`, demonstrating functional chaining logic. Time: O(1)."
  },
  {
    id: "dsa_func2",
    category: "functional interface",
    title: "Function Mapper",
    difficulty: "Hard",
    statement: "Implement a Function<Double, Double> that converts Fahrenheit values to Celsius.",
    constraints: "Function interfaces",
    inputOutput: "Input: f = 68.0\nOutput: 20.0",
    solution: `import java.util.function.Function;

public class Solution {
    public double convertFahrenheit(double fahrenheit) {
        Function<Double, Double> conv = f -> (f - 32.0) * 5.0 / 9.0;
        return conv.apply(fahrenheit);
    }
}`,
    explanation: "Demonstrates implementation of the `Function` functional interface, executing logic via the `apply()` method. Time: O(1)."
  },

  // 38. default and static method
  {
    id: "dsa_def1",
    category: "default and static method",
    title: "Default Logging Interface",
    difficulty: "Hard",
    statement: "Create an interface CustomLogger with abstract method getLog() and default method formatLog(String msg) that returns: 'INFO: ' + msg. Implement in ConsoleLogger.",
    constraints: "Interface default declarations",
    inputOutput: "Input: msg = \"Ready\"\nOutput: \"INFO: Ready\"",
    solution: `interface CustomLogger {
    String getLog();
    default String formatLog(String msg) {
        return "INFO: " + msg;
    }
}

class ConsoleLogger implements CustomLogger {
    public String getLog() {
        return "Console";
    }
}

public class Solution {
    public String runLog(String msg) {
        CustomLogger logger = new ConsoleLogger();
        return logger.formatLog(msg);
    }
}`,
    explanation: "Default methods in interfaces allow adding new behaviors to existing interface structures without breaking compatibility. Time: O(1)."
  },
  {
    id: "dsa_def2",
    category: "default and static method",
    title: "Static Helper Interface",
    difficulty: "Hard",
    statement: "Define an interface MathHelper with a static method doubleNumber(int x) returning x * 2. Implement.",
    constraints: "Interface static methods",
    inputOutput: "Input: x = 15\nOutput: 30",
    solution: `interface MathHelper {
    static int doubleNumber(int x) {
        return x * 2;
    }
}

public class Solution {
    public int runStaticHelper(int x) {
        return MathHelper.doubleNumber(x);
    }
}`,
    explanation: "Interface static methods let you define utility methods directly on interfaces. They cannot be overridden by implementing classes. Time: O(1)."
  },

  // 39. stream api
  {
    id: "dsa_stream1",
    category: "stream api",
    title: "Stream Filter Positives",
    difficulty: "Hard",
    statement: "Given a List of Integers, filter out negative numbers and collect them into a new List using the Stream API.",
    constraints: "List elements",
    inputOutput: "Input: [1, -2, 3]\nOutput: [1, 3]",
    solution: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public List<Integer> filterStream(List<Integer> list) {
        return list.stream()
                   .filter(x -> x >= 0)
                   .collect(Collectors.toList());
    }
}`,
    explanation: "Processes collections declaratively. `filter()` maps predicates and `collect()` gathers results back into collections. Time: O(n)."
  },
  {
    id: "dsa_stream2",
    category: "stream api",
    title: "Stream Sum of Squares of Even Numbers",
    difficulty: "Hard",
    statement: "Given a List of Integers, filter out even numbers, compute their squares, and sum them using Streams.",
    constraints: "List elements",
    inputOutput: "Input: [1, 2, 3, 4]\nOutput: 20\nExplanation: 2^2 + 4^2 = 4 + 16 = 20.",
    solution: `import java.util.List;

public class Solution {
    public int sumSquaresStream(List<Integer> list) {
        return list.stream()
                   .filter(x -> x % 2 == 0)
                   .mapToInt(x -> x * x)
                   .sum();
    }
}`,
    explanation: "Uses stream pipelines: filtration, mapping to integers, and aggregation. Time: O(n)."
  },

  // 40. date and time api
  {
    id: "dsa_date1",
    category: "date and time api",
    title: "Birthdate Age Finder",
    difficulty: "Hard",
    statement: "Given birthdate parameters (year, month, day), construct a LocalDate and find the years between it and a baseline date of 2026-08-01.",
    constraints: "LocalDate constructs",
    inputOutput: "Input: 2000, 8, 1\nOutput: 26",
    solution: `import java.time.LocalDate;
import java.time.Period;

public class Solution {
    public int calculateAge(int year, int month, int day) {
        LocalDate birth = LocalDate.of(year, month, day);
        LocalDate baseline = LocalDate.of(2026, 8, 1);
        return Period.between(birth, baseline).getYears();
    }
}`,
    explanation: "Demonstrates standard LocalDate instantiation and using Period to calculate time offsets. Time: O(1)."
  },
  {
    id: "dsa_date2",
    category: "date and time api",
    title: "Event Duration Offset",
    difficulty: "Hard",
    statement: "Find the count of days between two dates using ChronoUnit.DAYS.",
    constraints: "Valid dates",
    inputOutput: "Input: \"2026-08-01\", \"2026-08-10\"\nOutput: 9",
    solution: `import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Solution {
    public long getDaysBetween(String d1, String d2) {
        LocalDate date1 = LocalDate.parse(d1);
        LocalDate date2 = LocalDate.parse(d2);
        return ChronoUnit.DAYS.between(date1, date2);
    }
}`,
    explanation: "Uses ChronoUnit utility to find the duration offset between two LocalDate variables in O(1) time."
  }
];
