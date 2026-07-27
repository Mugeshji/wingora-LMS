export const oopsConcepts = [
  {
    id: "classes-objects",
    title: "Classes & Objects",
    realWorldExplanation: "Think of a class as a blueprint or architectural drawing for a house. The blueprint itself isn't a house; it simply defines the structure, dimensions, and behaviors. An object, on the other hand, is the physical house built from that blueprint. You can build multiple distinct houses (objects) from a single blueprint (class), each having its own specific coordinates and interior color (states), but sharing the same layout (behaviors).",
    problems: [
      {
        id: "oop_co1",
        title: "Smart Home Controller Class",
        description: "Create a 'SmartLight' class with properties (intensity, isOn) and methods (turnOn, turnOff, setIntensity) and demonstrate creation of multiple instances in a main method.",
        solution: `class SmartLight {
    private boolean isOn;
    private int intensity; // 0 to 100

    public SmartLight() {
        this.isOn = false;
        this.intensity = 0;
    }

    public void turnOn() {
        this.isOn = true;
        this.intensity = 100;
        System.out.println("Light turned ON at max intensity.");
    }

    public void turnOff() {
        this.isOn = false;
        this.intensity = 0;
        System.out.println("Light turned OFF.");
    }

    public void setIntensity(int val) {
        if(val >= 0 && val <= 100) {
            this.intensity = val;
            this.isOn = val > 0;
            System.out.println("Intensity set to " + val + "%.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        SmartLight livingRoom = new SmartLight();
        SmartLight kitchen = new SmartLight();
        
        System.out.print("Living Room: ");
        livingRoom.turnOn();
        System.out.print("Kitchen: ");
        kitchen.setIntensity(45);
    }
}`,
        output: "Living Room: Light turned ON at max intensity.\nKitchen: Intensity set to 45%."
      }
    ],
    interviewQuestions: [
      {
        question: "What is the difference between a Class and an Object?",
        answer: "A Class is a logical template or blueprint used to define the state and behavior of objects, costing zero heap memory at runtime. An Object is a physical instance of a class, residing in JVM heap memory and consuming storage space depending on its defined fields."
      },
      {
        question: "Can we have an object without a class in Java?",
        answer: "No. Unlike prototype-based languages like JavaScript, Java is class-based. Every object in Java must be instantiated from a pre-defined class template."
      }
    ]
  },
  {
    id: "constructors",
    title: "Constructors",
    realWorldExplanation: "When you buy a brand new smartphone, it comes out of the box with default factory settings (pre-installed applications, default wallpapers, default sound volumes). A constructor is the initialization procedure that boots up the object. It runs automatically when the object is instantiated (`new Phone()`), setting the baseline variables and resources so the object starts in a valid state.",
    problems: [
      {
        id: "oop_c1",
        title: "Constructor Chaining Simulator",
        description: "Create an Account class demonstrating constructor chaining using 'this()' to initialize parameters dynamically.",
        solution: `class Account {
    private String name;
    private double balance;
    private String type;

    // Zero-argument constructor
    public Account() {
        this("Guest User", 0.0, "Savings");
        System.out.println("Zero-arg constructor called.");
    }

    // Two-argument constructor
    public Account(String name, double balance) {
        this(name, balance, "Savings");
    }

    // Designated constructor
    public Account(String name, double balance, String type) {
        this.name = name;
        this.balance = balance;
        this.type = type;
        System.out.println("All-arg constructor called.");
    }

    public void display() {
        System.out.println("Account [" + name + ", " + type + ", $" + balance + "]");
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account();
        acc.display();
    }
}`,
        output: "All-arg constructor called.\nZero-arg constructor called.\nAccount [Guest User, Savings, $0.0]"
      }
    ],
    interviewQuestions: [
      {
        question: "Does a constructor return any value?",
        answer: "Although a constructor doesn't declare a return type (not even void), it implicitly returns the newly allocated memory address of the object (this). You cannot explicitly use a 'return' statement with a value inside a constructor."
      },
      {
        question: "What is Constructor Chaining?",
        answer: "Constructor chaining is the practice of calling one constructor from another constructor within the same class (using this()) or from a parent class (using super()). This avoids code duplication during object initialization."
      }
    ]
  },
  {
    id: "inheritance",
    title: "Inheritance",
    realWorldExplanation: "Think about genetic inheritance. You inherit core physical characteristics from your parents (like eye color, blood type, height). Similarly, in software, a subclass inherits variables and method definitions from its superclass (parent). For example, a 'ElectricCar' is a type of 'Vehicle'. It automatically inherits base properties like 'wheels' and 'speed' but extends them by adding electric-specific states like 'batteryCapacity'.",
    problems: [
      {
        id: "oop_ih1",
        title: "Multilevel Device Hierarchy",
        description: "Implement a three-layer inheritance tree (Device -> Mobile -> SmartPhone) demonstrating the propagation of states and calls to parent constructors with 'super()'.",
        solution: `class Device {
    protected String brand;
    Device(String brand) {
        this.brand = brand;
    }
}

class Mobile extends Device {
    protected boolean hasSim;
    Mobile(String brand, boolean hasSim) {
        super(brand);
        this.hasSim = hasSim;
    }
}

class SmartPhone extends Mobile {
    private String os;
    SmartPhone(String brand, boolean hasSim, String os) {
        super(brand, hasSim);
        this.os = os;
    }
    
    public void printSpecs() {
        System.out.println(brand + " phone running " + os + " (SIM: " + hasSim + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        SmartPhone p = new SmartPhone("Google", true, "Android");
        p.printSpecs();
    }
}`,
        output: "Google phone running Android (SIM: true)"
      }
    ],
    interviewQuestions: [
      {
        question: "Why doesn't Java support Multiple Inheritance with classes?",
        answer: "Java avoids multiple inheritance to prevent the Diamond Problem, where a class inherits from two parent classes that declare the same method, leading to compiler ambiguity. Java instead allows multiple inheritance of interfaces, which don't maintain instance variables."
      },
      {
        question: "What is the role of the 'super' keyword in Java?",
        answer: "The 'super' keyword is a reference variable used to refer to immediate parent class objects. It is used to invoke parent class constructors (super()), access parent variables, or call overridden parent methods."
      }
    ]
  },
  {
    id: "polymorphism",
    title: "Polymorphism",
    realWorldExplanation: "Polymorphism means 'many forms'. Consider the 'play' button on your remote controllers. If you click play on a CD player, it plays music. If you click play on a DVD player, it plays a video movie. If you click play on a video game console, it boots up gameplay. The same message ('play') is processed differently based on the exact object executing it.",
    problems: [
      {
        id: "oop_p1",
        title: "Dynamic Dispatch Payment Gateway",
        description: "Implement a polymorphism scenario where a base 'Payment' class has a 'process()' method, overridden by 'CreditCardPayment' and 'UPIPayment' subclasses, and resolved at runtime.",
        solution: `class Payment {
    public void process(double amt) {
        System.out.println("Processing generic payment of $" + amt);
    }
}

class CreditCardPayment extends Payment {
    @Override
    public void process(double amt) {
        System.out.println("Processing credit card payment of $" + amt + " (including 2% gateway charge).");
    }
}

class UPIPayment extends Payment {
    @Override
    public void process(double amt) {
        System.out.println("Processing UPI instant payment of $" + amt + " directly from bank.");
    }
}

public class Main {
    public static void main(String[] args) {
        Payment gateway;
        
        gateway = new CreditCardPayment();
        gateway.process(100);
        
        gateway = new UPIPayment();
        gateway.process(150);
    }
}`,
        output: "Processing credit card payment of $100.0 (including 2% gateway charge).\nProcessing UPI instant payment of $150.0 directly from bank."
      }
    ],
    interviewQuestions: [
      {
        question: "What is the difference between Method Overloading and Method Overriding?",
        answer: "Overloading (Compile-time polymorphism) occurs when methods in the same class share a name but declare different parameter lists. Overriding (Runtime polymorphism) occurs when a subclass provides a specific implementation of a method already declared in its parent class, keeping the exact signature."
      },
      {
        question: "Can we override static methods in Java?",
        answer: "No. Static methods are bound to the Class at compile time rather than the instance at runtime. If a child class defines a static method with the exact same signature, it 'hides' the parent method instead of overriding it (Method Hiding)."
      }
    ]
  },
  {
    id: "abstraction",
    title: "Abstraction",
    realWorldExplanation: "Think about sending an email. You type the content, enter the recipient's address, and click 'Send'. The system hides the entire backend workflow—establishing TCP connections, serializing strings into SMTP packets, routing over DNS servers—leaving you with a simple, functional boundary. Abstraction focuses on 'what' the object does rather than 'how' it does it, hiding complex details.",
    problems: [
      {
        id: "oop_ab1",
        title: "Database Connector Abstraction",
        description: "Create an abstract class 'DatabaseConnector' with abstract methods 'connect()' and 'query()', implemented in concrete 'MySQLConnector' and 'PostgreSQLConnector' classes.",
        solution: `abstract class DatabaseConnector {
    protected String dbName;
    DatabaseConnector(String name) { this.dbName = name; }
    
    // Abstract methods
    abstract void connect();
    abstract void query(String sql);
    
    // Concrete method
    public void disconnect() {
        System.out.println("Closing connection to: " + dbName);
    }
}

class MySQLConnector extends DatabaseConnector {
    MySQLConnector() { super("MySQL"); }
    
    @Override
    void connect() { System.out.println("Connected to MySQL via port 3306."); }
    
    @Override
    void query(String sql) { System.out.println("Running SQL on MySQL: " + sql); }
}

public class Main {
    public static void main(String[] args) {
        DatabaseConnector db = new MySQLConnector();
        db.connect();
        db.query("SELECT * FROM users");
        db.disconnect();
    }
}`,
        output: "Connected to MySQL via port 3306.\nRunning SQL on MySQL: SELECT * FROM users\nClosing connection to: MySQL"
      }
    ],
    interviewQuestions: [
      {
        question: "What is the difference between Abstraction and Encapsulation?",
        answer: "Abstraction is a design-level concept focusing on hiding implementation details to reduce system complexity ('What'). Encapsulation is an implementation-level concept focusing on binding state and behavior while restricting direct access ('How')."
      },
      {
        question: "Can an abstract class be declared with 'final' keyword in Java?",
        answer: "No. The abstract keyword demands that the class be extended by subclasses to provide implementation, whereas final prohibits any subclassing. Combining them results in a compile-time error."
      }
    ]
  },
  {
    id: "encapsulation",
    title: "Encapsulation",
    realWorldExplanation: "Think of a medical capsule pill containing medicine. The actual chemical ingredients (state) are sealed safely inside the protective outer shell (capsule). You cannot touch the powder directly; you only ingest the pill as a whole. In Java, encapsulation is achieved by marking class variables as `private` and exposing access only via `public` getter and setter methods, ensuring full validation control.",
    problems: [
      {
        id: "oop_en1",
        title: "Secure Employee Registry",
        description: "Build an 'Employee' class with private variables (salary, employeeId) providing validated setter and getter access.",
        solution: `class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        setSalary(salary); // Use setter for validation
    }

    public String getName() { return name; }
    
    public double getSalary() { return salary; }
    
    public void setSalary(double salary) {
        if(salary >= 0) {
            this.salary = salary;
        } else {
            System.out.println("Error: Salary cannot be negative!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("Alice", 50000);
        System.out.println(emp.getName() + " earns: $" + emp.getSalary());
        emp.setSalary(-1200); // Invalid salary
    }
}`,
        output: "Alice earns: $50000.0\nError: Salary cannot be negative!"
      }
    ],
    interviewQuestions: [
      {
        question: "Why do we encapsulate variables instead of using public access modifiers?",
        answer: "Encapsulation protects class states from unauthorized direct alterations. By routing variable access through getters and setters, we can implement validation checks (e.g. salary > 0), log accesses, or make fields read-only by omitting setters."
      },
      {
        question: "Is Java fully encapsulated?",
        answer: "Java classes are encapsulated, but the language itself isn't fully encapsulated as primitives exist outside of objects and access control can be bypassed using Java Reflection APIs."
      }
    ]
  },
  {
    id: "interfaces",
    title: "Interfaces",
    realWorldExplanation: "Think of a USB socket. Any device (keyboard, mouse, flash drive, microphone) can plug into a USB socket, provided it conforms to the USB standard specification. The USB socket doesn't know or care how the device works internally; it only knows how to interact with it based on the standard pins. In Java, an Interface is a contract that defining classes must satisfy.",
    problems: [
      {
        id: "oop_in1",
        title: "Media Player System",
        description: "Implement a 'Playable' interface with methods 'play()' and 'pause()' and implement it in 'VideoPlayer' and 'AudioPlayer' classes.",
        solution: `interface Playable {
    void play();
    void pause();
}

class VideoPlayer implements Playable {
    @Override
    public void play() { System.out.println("Rendering MP4 frames on screen."); }
    @Override
    public void pause() { System.out.println("Paused video playback."); }
}

class AudioPlayer implements Playable {
    @Override
    public void play() { System.out.println("Streaming MP3 streams to speakers."); }
    @Override
    public void pause() { System.out.println("Paused audio streams."); }
}

public class Main {
    public static void main(String[] args) {
        Playable v = new VideoPlayer();
        Playable a = new AudioPlayer();
        v.play();
        a.play();
    }
}`,
        output: "Rendering MP4 frames on screen.\nStreaming MP3 streams to speakers."
      }
    ],
    interviewQuestions: [
      {
        question: "Can an interface have concrete methods in Java?",
        answer: "Yes. Since Java 8, interfaces can contain concrete 'default' and 'static' methods. Since Java 9, they can also contain 'private' helper methods, enhancing interface evolution without breaking backwards compatibility."
      },
      {
        question: "What is a Marker Interface?",
        answer: "A marker interface is an interface that does not declare any methods or variables (e.g., Serializable, Cloneable). It acts as a metadata tag to notify the JVM or compiler of specific behaviors."
      }
    ]
  },
  {
    id: "abstract-classes",
    title: "Abstract Classes",
    realWorldExplanation: "Imagine you are building a strategy video game. All game characters (warrior, archer, wizard) have health pools, levels, and coordinate positions. They also have standard routines (move, take damage) but dynamic attack profiles. An 'Abstract Class' is used to define this base character template, providing shared common logic (movement, health tracking) while leaving the specific attack mechanism abstract for each sub-character to implement.",
    problems: [
      {
        id: "oop_ac1",
        title: "Game Character Framework",
        description: "Implement a base abstract class 'GameCharacter' with concrete 'takeDamage()' and abstract 'attack()' methods, demonstrating inheritance.",
        solution: `abstract class GameCharacter {
    protected int hp;
    GameCharacter(int hp) { this.hp = hp; }
    
    public void takeDamage(int dmg) {
        this.hp -= dmg;
        System.out.println("Character hit! Remaining HP: " + this.hp);
    }
    
    abstract void attack();
}

class Warrior extends GameCharacter {
    Warrior() { super(120); }
    @Override
    void attack() { System.out.println("Warrior swings broadsword! Deals 15 damage."); }
}

public class Main {
    public static void main(String[] args) {
        GameCharacter c = new Warrior();
        c.attack();
        c.takeDamage(20);
    }
}`,
        output: "Warrior swings broadsword! Deals 15 damage.\nCharacter hit! Remaining HP: 100"
      }
    ],
    interviewQuestions: [
      {
        question: "What is the difference between an Interface and an Abstract Class in Java?",
        answer: "Abstract classes can declare state variables (instance fields) and constructors, supporting single inheritance. Interfaces are stateless (they can only declare static final constants) and support multiple inheritance of interfaces."
      },
      {
        question: "Can we instantiate an Abstract Class?",
        answer: "No. Abstract classes are incomplete and cannot be directly instantiated using the 'new' keyword. However, they can declare constructors, which are called implicitly when concrete subclass instances are created."
      }
    ]
  }
];
