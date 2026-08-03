export const javaTopicQuizQuestions = {
  day1_history: [
    {
      id: "hist_1",
      type: "theory",
      question: "Who is known as the father of Java programming language, and in which year was it officially released?",
      options: [
        "Dennis Ritchie, 1991",
        "James Gosling, 1995",
        "Bjarne Stroustrup, 1996",
        "Guido van Rossum, 1989"
      ],
      answer: 1,
      explanation: "Java was created by James Gosling at Sun Microsystems and officially released in 1995. Dennis Ritchie created C, Bjarne Stroustrup created C++, and Guido van Rossum created Python.",
      difficulty: "easy"
    },
    {
      id: "hist_2",
      type: "theory",
      question: "What was the original name of the Java programming language during its early development stage?",
      options: [
        "Oak",
        "Green",
        "C++--",
        "Caffe"
      ],
      answer: 0,
      explanation: "Java was originally named 'Oak' by James Gosling, named after an oak tree that stood outside his office. It was later renamed to Java because Oak was already registered by Oak Technologies.",
      difficulty: "easy"
    },
    {
      id: "hist_3",
      type: "theory",
      question: "Which project at Sun Microsystems led to the creation of the Java programming language?",
      options: [
        "The Sun Fire Project",
        "The Green Project",
        "The Solaris OS Initiative",
        "The HotJava Suite"
      ],
      answer: 1,
      explanation: "Java was developed by a team known as the 'Green Team' (led by James Gosling) as part of the Green Project. Their goal was to create a language for digital consumer devices such as interactive television boxes.",
      difficulty: "medium"
    },
    {
      id: "hist_4",
      type: "theory",
      question: "Why did the Green Team decide to create a new language instead of using C++ for consumer electronics?",
      options: [
        "C++ required too much memory and lacked platform independence, leading to compilation issues on diverse target microchips.",
        "C++ did not support object-oriented programming concepts.",
        "C++ was an interpreted language and ran too slowly for real-time controllers.",
        "C++ was owned by Microsoft, causing licensing constraints."
      ],
      answer: 0,
      explanation: "The Green Team wanted a language that was compact, reliable, and platform-independent so it could run on different hardware without recompilation. C++ lacked automatic memory management and platform independence, making it error-prone for embedded systems.",
      difficulty: "medium"
    },
    {
      id: "hist_5",
      type: "theory",
      question: "Which organization acquired Sun Microsystems in 2010, thereby becoming the steward of Java?",
      options: [
        "Microsoft Corporation",
        "IBM",
        "Oracle Corporation",
        "Google Inc."
      ],
      answer: 2,
      explanation: "Oracle Corporation acquired Sun Microsystems in January 2010, taking over stewardship, licensing, development, and standard maintenance of the Java platform.",
      difficulty: "easy"
    },
    {
      id: "hist_6",
      type: "theory",
      question: "What was the significance of Java's JDK 1.2 release in 1998?",
      options: [
        "It marked the deprecation of Applets.",
        "It rebranded the platform as 'Java 2' (J2SE) and introduced the Collections Framework and Swing UI library.",
        "It added lambdas and functional interfaces to the core library.",
        "It replaced the JVM with a native compiler."
      ],
      answer: 1,
      explanation: "JDK 1.2 was a major milestone rebranded as 'Java 2' (J2SE 1.2). It introduced major APIs like Swing, the Collections Framework, JIT compiler optimizations, and the Java Plug-in.",
      difficulty: "medium"
    },
    {
      id: "hist_7",
      type: "theory",
      question: "Which Java version introduced the concept of modularity under Project Jigsaw?",
      options: [
        "Java 8",
        "Java 9",
        "Java 11",
        "Java 17"
      ],
      answer: 1,
      explanation: "Java 9 introduced the Java Platform Module System (JPMS) under Project Jigsaw, allowing developers to modularize applications and partition the JDK itself to reduce size.",
      difficulty: "hard"
    },
    {
      id: "hist_8",
      type: "theory",
      question: "In early Java history, what was 'HotJava'?",
      options: [
        "The original name of the Java Virtual Machine.",
        "A Web Browser built in Java to demonstrate its applet execution capabilities.",
        "A compiler that generated native machine code from Java bytecode.",
        "A development IDE created by Sun Microsystems."
      ],
      answer: 1,
      explanation: "HotJava was a modular, highly extensible web browser written entirely in Java by Sun Microsystems in 1995. It was the first browser to support Java Applets, making Java famous in the early web era.",
      difficulty: "medium"
    },
    {
      id: "hist_9",
      type: "theory",
      question: "What is the primary licensing model for the official OpenJDK today?",
      options: [
        "Proprietary Commercial License",
        "GNU General Public License (GPL) version 2 with Classpath Exception",
        "MIT License",
        "Apache License 2.0"
      ],
      answer: 1,
      explanation: "OpenJDK is licensed under the GPL v2 with the Classpath Exception, which allows developers to link proprietary code to OpenJDK libraries without forcing their own code to become open-source under GPL.",
      difficulty: "hard"
    },
    {
      id: "hist_10",
      type: "theory",
      question: "Which of the following is true regarding the release cadence of Java starting after Java 9?",
      options: [
        "A new major version is released every 2 years, with no LTS support.",
        "A new feature version is released every 6 months, with Long-Term Support (LTS) versions released every 2 years.",
        "Java releases are now irregular and based on developer committee approval.",
        "Java has stopped releasing new versions to maintain absolute backward compatibility."
      ],
      answer: 1,
      explanation: "Since Java 9, Oracle adopted a rapid 6-month release cadence (March and September). Long-Term Support (LTS) releases (like Java 11, 17, 21) occur every 2 years (previously 3 years) to provide stability for enterprises.",
      difficulty: "medium"
    },
    {
      id: "hist_11",
      type: "theory",
      question: "What was Java's original value proposition in the early days of the Internet?",
      options: [
        "Serving as a low-level scripting language for CGI forms.",
        "Enabling interactive, rich client-side animations and media via Applets running directly inside web browsers.",
        "Developing desktop operating systems to challenge Windows.",
        "Handling database storage using SQL-less structures."
      ],
      answer: 1,
      explanation: "In 1995-1996, the web was mostly static text. Java introduced Applets, which ran in browser plugins, allowing interactive animations, games, and applications, making Java the 'language of the web'.",
      difficulty: "easy"
    },
    {
      id: "hist_12",
      type: "theory",
      question: "Which early operating system was Java originally targeted to run on during its development as Oak?",
      options: [
        "SunOS / Solaris",
        "A proprietary OS for a hand-held touch screen device called '*' (StarSeven)",
        "Windows 95",
        "MS-DOS"
      ],
      answer: 1,
      explanation: "Oak was originally designed for '* (StarSeven)', a prototype hand-held smart controller/remote control developed by the Green Team. When the consumer market did not take off, they refocused Oak on web browsers.",
      difficulty: "hard"
    },
    {
      id: "hist_13",
      type: "theory",
      question: "What legal dispute between Oracle and Google took over a decade to resolve in the US Supreme Court?",
      options: [
        "Patents regarding Android's battery saving algorithms.",
        "The copyrightability of Java's API declaring declarations and whether Google's clean-room implementation of them on Android constituted Fair Use.",
        "The trade name 'Android' which was claimed by Sun Microsystems.",
        "Licensing of Android virtual machine's bytecode assembler."
      ],
      answer: 1,
      explanation: "The Oracle v. Google lawsuit was about whether Google could copy Java API declarations (signatures and structure) without a license. In 2021, the Supreme Court ruled Google's use of Java APIs was Fair Use.",
      difficulty: "hard"
    },
    {
      id: "hist_14",
      type: "theory",
      question: "What is the historical reason behind the Java file extension naming conventions (.java and .class)?",
      options: [
        "They were recommended by Netscape to match Javascript syntax.",
        "'.java' represents the readable source code, and '.class' represents the compiled bytecode containing instructions for JVM classes.",
        "'.class' is compile-time binary instruction for C compilers.",
        "'.java' files are compiled directly into native operating system binaries."
      ],
      answer: 1,
      explanation: "Java source code is saved with a '.java' extension. When compiled using `javac`, it generates a '.class' file containing target-independent bytecode representing Java classes.",
      difficulty: "easy"
    },
    {
      id: "hist_15",
      type: "theory",
      question: "Which Java version introduced the Java Virtual Machine's 'HotSpot' performance engine as a standard?",
      options: [
        "JDK 1.0",
        "JDK 1.1",
        "Java 2 (JDK 1.3 / 1.4)",
        "Java 5"
      ],
      answer: 2,
      explanation: "The HotSpot JVM engine, which uses Just-In-Time (JIT) compilation to compile frequently executed code sections into native instructions, was first introduced in 1999 and became the default JVM in JDK 1.3.",
      difficulty: "hard"
    }
  ],
  day2_features: [
    {
      id: "feat_1",
      type: "theory",
      question: "What does the famous Java acronym WORA stand for?",
      options: [
        "Write Once, Run Anywhere",
        "Write Once, Read Always",
        "Windows OS Runtime Architecture",
        "Web Oriented Responsive Application"
      ],
      answer: 0,
      explanation: "WORA stands for 'Write Once, Run Anywhere'. It highlights Java's cross-platform portability: you compile Java source code once into bytecode, and it runs on any device that has a Java Virtual Machine (JVM).",
      difficulty: "easy"
    },
    {
      id: "feat_2",
      type: "theory",
      question: "How does Java achieve platform independence?",
      options: [
        "By compiling code directly into native machine code for all platforms at once.",
        "By compiling source code into platform-independent intermediate bytecode (.class files), which the JVM interprets or compiles at runtime on specific platforms.",
        "By running inside web browsers only.",
        "By converting Java code into C++ code before execution."
      ],
      answer: 1,
      explanation: "Java source code is compiled into bytecode. Since bytecode is a set of instructions designed for the JVM rather than any specific processor, any platform with a JVM installed can execute the bytecode, making it platform-independent.",
      difficulty: "medium"
    },
    {
      id: "feat_3",
      type: "theory",
      question: "Why is Java considered a secure programming language compared to languages like C or C++?",
      options: [
        "It lacks pointers, operates within a runtime sandbox, and has automatic garbage collection with out-of-bounds array checks.",
        "It encrypts all source code files automatically during compilation.",
        "It requires a user login password to execute any program.",
        "It does not support network connections."
      ],
      answer: 0,
      explanation: "Java is secure because it doesn't allow direct memory pointer manipulation (preventing buffer overflow attacks), uses a ClassLoader to isolate namespaces, verifies bytecode before execution, and checks array boundaries dynamically.",
      difficulty: "medium"
    },
    {
      id: "feat_4",
      type: "theory",
      question: "Which feature of Java automatically reclaims unused heap memory to prevent memory leaks?",
      options: [
        "Memory Allocator",
        "Garbage Collector (GC)",
        "Destructor Method",
        "Deallocator Thread"
      ],
      answer: 1,
      explanation: "Java's automatic Garbage Collection runs in the background, identifying objects that are no longer referenced in the application and freeing up their heap memory space. Developers do not need to call delete/free manually.",
      difficulty: "easy"
    },
    {
      id: "feat_5",
      type: "theory",
      question: "Java is described as a 'statically typed' language. What does this mean?",
      options: [
        "Variables can change their data type dynamically at runtime.",
        "All variable types must be declared and checked at compile-time before execution.",
        "Variables must be declared using the keyword 'static'.",
        "It does not support complex object types."
      ],
      answer: 1,
      explanation: "Statically-typed means that type checking is performed during compilation. Every variable must have a declared type, and values assigned must match that type, reducing runtime type mismatches.",
      difficulty: "easy"
    },
    {
      id: "feat_6",
      type: "theory",
      question: "Which design characteristic describes Java's ability to run multiple parts of a program concurrently?",
      options: [
        "Modularity",
        "Multithreading",
        "Polymorphism",
        "Distributed Computing"
      ],
      answer: 1,
      explanation: "Java has built-in support for multithreading. It allows developers to define multiple concurrent threads of execution within a single program, maximizing CPU utilization on multi-core systems.",
      difficulty: "medium"
    },
    {
      id: "feat_7",
      type: "theory",
      question: "Why is Java NOT considered a purely object-oriented programming language?",
      options: [
        "It supports primitive data types (like int, char, boolean) which are not objects.",
        "It allows writing function declarations outside of classes.",
        "It does not support inheritance structures.",
        "It is compiled and interpreted instead of just compiled."
      ],
      answer: 0,
      explanation: "A pure object-oriented language represents everything as objects. Java supports primitive data types (char, byte, short, int, long, float, double, boolean) directly in memory for performance, so it is not 100% pure.",
      difficulty: "medium"
    },
    {
      id: "feat_8",
      type: "theory",
      question: "What does the feature 'Robust' mean in the context of Java design goals?",
      options: [
        "Java is capable of compiling code extremely fast.",
        "Java emphasizes strong compile-time type checking, runtime exception handling, and memory safety checks (eliminating pointers).",
        "Java applications can only run on enterprise mainframe computers.",
        "Java code is resistant to reverse engineering."
      ],
      answer: 1,
      explanation: "Robustness refers to reliability. Java enforces strict compiler rules, handles runtime errors via Exception Handling, and performs memory checks (bounds checking, garbage collection) to prevent crashes.",
      difficulty: "medium"
    },
    {
      id: "feat_9",
      type: "theory",
      question: "How does Java support 'Distributed' computing features natively?",
      options: [
        "By copying source files across servers via FTP.",
        "Through built-in protocols and packages like RMI (Remote Method Invocation) and socket programming APIs for networking.",
        "By using web browsers to host all calculations.",
        "By compiling separate parts into distinct binary files."
      ],
      answer: 1,
      explanation: "Java is designed for distributed internet environments. Its packages (like `java.net` and `java.rmi`) allow applications to open network connections, call methods on remote objects, and transfer objects across machines.",
      difficulty: "hard"
    },
    {
      id: "feat_10",
      type: "theory",
      question: "What is the role of the JIT (Just-In-Time) compiler in a Java execution thread?",
      options: [
        "It compiles source code (.java) directly into bytecode.",
        "It translates frequently executed bytecode chunks (hotspots) into native machine instructions at runtime for direct CPU execution.",
        "It scans code for security vulnerabilities prior to running.",
        "It handles garbage collection during execution pauses."
      ],
      answer: 1,
      explanation: "The JIT compiler runs inside the JVM. It monitors execution, identifies 'hot' sections of bytecode, compiles them into native machine code, and caches it, dramatically increasing performance over pure interpretation.",
      difficulty: "hard"
    },
    {
      id: "feat_11",
      type: "theory",
      question: "Which of the following is true regarding Java's memory pointer architecture?",
      options: [
        "Java uses double pointers to reference heap memory.",
        "Java manages memory internally and hides direct memory pointer addresses from developers, preventing unauthorized memory access and leaks.",
        "Java allows pointer arithmetic using the '&' and '*' operators.",
        "Java requires developers to explicitly allocate and free pointers using calloc/malloc."
      ],
      answer: 1,
      explanation: "To guarantee security and stability, Java does not expose direct physical memory addresses or allow pointer arithmetic. It handles references implicitly, ensuring reference safety.",
      difficulty: "medium"
    },
    {
      id: "feat_12",
      type: "theory",
      question: "What does the feature 'Architecture-Neutral' imply in the Java white papers?",
      options: [
        "Java does not require an operating system to run.",
        "Java code does not depend on target machine hardware architecture traits like byte ordering (endianness) or integer size.",
        "Java doesn't use standard compilers.",
        "Java classes are written without physical layout shapes."
      ],
      answer: 1,
      explanation: "Architecture-neutral means Java specifies data type sizes strictly (e.g. an `int` is always 32-bit signed two's complement, regardless of whether the hardware is 32-bit or 64-bit), ensuring identical execution.",
      difficulty: "hard"
    },
    {
      id: "feat_13",
      type: "theory",
      question: "Which feature was added in JDK 1.1 to enable Java programs to query class structures and metadata dynamically at runtime?",
      options: [
        "Generics",
        "Reflection",
        "Annotations",
        "Dynamic Linker"
      ],
      answer: 1,
      explanation: "Reflection (in the `java.lang.reflect` package) allows an executing Java program to inspect its classes, fields, methods, and constructors dynamically at runtime, enabling advanced frameworks (like Spring or Hibernate).",
      difficulty: "hard"
    },
    {
      id: "feat_14",
      type: "theory",
      question: "Why is Java described as an 'Interpreted and Compiled' language?",
      options: [
        "It compiles source code to bytecode, and the JVM interprets or compiles that bytecode to machine code at runtime.",
        "It compiles some files and interprets other files randomly.",
        "It uses a browser interpreter to read bytecode directly.",
        "It converts source code into native machine code directly."
      ],
      answer: 0,
      explanation: "Java execution involves two phases: compilation (`javac`) compiles Java source code to intermediate bytecode, and interpretation/execution (JVM) interprets or dynamically compiles (JIT) this bytecode into machine code.",
      difficulty: "medium"
    },
    {
      id: "feat_15",
      type: "theory",
      question: "Which design feature allows Java libraries to load classes on-demand at runtime rather than loading all classes at startup?",
      options: [
        "Static Linking",
        "Dynamic Loading / ClassLoader",
        "Pre-compilation",
        "Object Serialization"
      ],
      answer: 1,
      explanation: "Java uses dynamic class loading. The ClassLoader loads classes into the JVM memory on-demand (when they are first referenced), saving memory and allowing dynamic plugin expansions.",
      difficulty: "hard"
    }
  ],
  day3_jdk_jre_jvm: [
    {
      id: "jdk_1",
      type: "theory",
      question: "What is the structural relationship between the JDK, JRE, and JVM?",
      options: [
        "JDK = JRE + Development Tools; JRE = JVM + Core Libraries.",
        "JRE = JDK + JVM.",
        "JVM = JRE + JDK.",
        "They are completely separate entities with no shared components."
      ],
      answer: 0,
      explanation: "The JDK (Java Development Kit) is a superset containing JRE (Java Runtime Environment) and development tools (like javac, jdb). JRE contains the JVM (Java Virtual Machine) and core class libraries needed to run Java programs.",
      difficulty: "easy"
    },
    {
      id: "jdk_2",
      type: "theory",
      question: "Which of the following utilities is the Java compiler itself?",
      options: [
        "java",
        "javac",
        "javap",
        "javadoc"
      ],
      answer: 1,
      explanation: "`javac` is the compiler tool that converts `.java` source files into `.class` bytecode files. `java` executes the compiled classes, `javap` decompiles bytecode, and `javadoc` generates HTML documentation.",
      difficulty: "easy"
    },
    {
      id: "jdk_3",
      type: "theory",
      question: "What component of the JVM reads and verifies bytecode instructions before executing them?",
      options: [
        "JIT Compiler",
        "Bytecode Verifier",
        "Garbage Collector",
        "Class Loader"
      ],
      answer: 1,
      explanation: "The Bytecode Verifier checks that compiled bytecode conforms to Java safety rules (e.g. no illegal memory accesses, correct types) before class loading is complete, protecting the host system from malicious code.",
      difficulty: "medium"
    },
    {
      id: "jdk_4",
      type: "theory",
      question: "Which JVM memory area is responsible for storing class structures, metadata, method code, and static variables?",
      options: [
        "JVM Stack",
        "Heap Area",
        "Method Area / Metaspace",
        "PC Register"
      ],
      answer: 2,
      explanation: "The Method Area (implemented as Metaspace since Java 8 using native memory) stores class definitions, method bytecode, runtime constant pools, and static variables. Heap stores actual object instances.",
      difficulty: "medium"
    },
    {
      id: "jdk_5",
      type: "theory",
      question: "In JVM memory management, what is stored inside the Stack Area?",
      options: [
        "Actual Object instances and array values.",
        "Local variables, primitive data, and active method execution frames.",
        "Class bytecode metadata.",
        "CPU cache values."
      ],
      answer: 1,
      explanation: "The JVM Stack stores local variables, primitive data types, and method call frames (activation records). Each thread has its own private Stack. All objects are allocated in the shared Heap Area.",
      difficulty: "medium"
    },
    {
      id: "jdk_6",
      type: "theory",
      question: "What is a primary advantage of the JVM using native memory Metaspace instead of PermGen (Permanent Generation) starting from Java 8?",
      options: [
        "Metaspace automatically executes JIT compilation on demand.",
        "Metaspace resizes dynamically using native memory, reducing the chance of OutOfMemoryError: PermGen space errors when loading many classes.",
        "Metaspace stores garbage collected heap objects.",
        "Metaspace speeds up compiler compilation times."
      ],
      answer: 1,
      explanation: "PermGen had a fixed maximum size, often causing OutOfMemory errors in apps that load many classes (like spring). Metaspace dynamically expands in system native memory, avoiding artificial size limits.",
      difficulty: "hard"
    },
    {
      id: "jdk_7",
      type: "theory",
      question: "Which class loader in Java is responsible for loading the core Java classes (like java.lang.Object) directly from the boot classpath?",
      options: [
        "System ClassLoader",
        "Extension ClassLoader",
        "Bootstrap ClassLoader",
        "Application ClassLoader"
      ],
      answer: 2,
      explanation: "The Bootstrap ClassLoader is the primary class loader written in native code (C++). It loads core JDK classes (like rt.jar or java.base module) and has no parent class loader.",
      difficulty: "hard"
    },
    {
      id: "jdk_8",
      type: "theory",
      question: "What does the 'Delegation Principle' in Java ClassLoaders mean?",
      options: [
        "Classes can delegate their calculations to other systems.",
        "A ClassLoader always delegates class loading requests to its parent classloader first, before attempting to load the class itself.",
        "Classloaders load classes concurrently on separate threads.",
        "Classloaders verify bytecode structure before passing to compiler."
      ],
      answer: 1,
      explanation: "Under the parent-delegation model, when a ClassLoader receives a request to load a class, it delegates the search to its parent first. This prevents security flaws where custom classes could override core JDK classes like `java.lang.System`.",
      difficulty: "hard"
    },
    {
      id: "jdk_9",
      type: "theory",
      question: "Which of the following describes a major disadvantage of Java's runtime execution model compared to pure native compilation?",
      options: [
        "Java has slow compilation speeds.",
        "The startup time is longer because of JVM initialization and class loading, and there is memory overhead from running the JVM environment itself.",
        "Java cannot run on Linux operating systems.",
        "Java bytecode files are excessively large."
      ],
      answer: 1,
      explanation: "Because Java relies on a virtual machine wrapper, initializing the JVM, loading core libraries, verifying bytecode, and interpreting startup steps takes longer and uses more baseline memory than running a pre-compiled native binary.",
      difficulty: "medium"
    },
    {
      id: "jdk_10",
      type: "theory",
      question: "What is the purpose of the JVM's Program Counter (PC) Register?",
      options: [
        "To count the number of objects created in the heap.",
        "To store the address of the JVM instruction currently being executed by a thread.",
        "To monitor CPU temperatures during thread locks.",
        "To track variables defined within static methods."
      ],
      answer: 1,
      explanation: "Each JVM thread has a private PC (Program Counter) Register. It holds the address/offset of the current bytecode instruction being executed by that thread, or is undefined if executing a native method.",
      difficulty: "medium"
    },
    {
      id: "jdk_11",
      type: "theory",
      question: "Which JVM component converts bytecode into machine instructions step-by-step during initial application execution?",
      options: [
        "JIT Compiler",
        "Interpreter",
        "Garbage Collector",
        "Assembler"
      ],
      answer: 1,
      explanation: "The Interpreter reads bytecode instructions and executes them one by one. While it starts execution instantly, it runs slower than native code. The JIT compiler later compiles hot paths for native execution speed.",
      difficulty: "easy"
    },
    {
      id: "jdk_12",
      type: "theory",
      question: "Which command line flag is used to check the bytecode structure of a compiled Java class file (disassembly)?",
      options: [
        "javac -dump",
        "javap -c",
        "java -show-bytecode",
        "jdb -list"
      ],
      answer: 1,
      explanation: "`javap` is the Java Class File Disassembler. Using `javap -c ClassName` prints the compiled JVM assembly-like instructions (bytecode) for the class methods.",
      difficulty: "medium"
    },
    {
      id: "jdk_13",
      type: "theory",
      question: "How does JVM memory isolation affect multi-threaded Java applications?",
      options: [
        "Threads share their private stacks but isolate the heap area.",
        "Threads share the Heap Area, Metaspace, and Runtime Constant Pool, but each thread has its own private Stack and PC Register.",
        "Every thread has an entirely separate heap and stack memory context.",
        "Threads share stacks, but method code is isolated."
      ],
      answer: 1,
      explanation: "Heap and Method Area are common to all threads. Stack, PC registers, and native method stacks are private to each thread, meaning threads can safely run local methods without direct variable interference.",
      difficulty: "hard"
    },
    {
      id: "jdk_14",
      type: "theory",
      question: "What does the JVM command line argument -Xmx2g specify?",
      options: [
        "Sets the initial stack size to 2 Gigabytes.",
        "Sets the maximum Java heap size to 2 Gigabytes.",
        "Sets the Metaspace allocation limit to 2 Gigabytes.",
        "Allocates 2 Gigabytes to JIT compilation cache."
      ],
      answer: 1,
      explanation: "`-Xmx` is a standard JVM flag setting the maximum heap size. `-Xmx2g` limits the heap to 2 Gigabytes, helping prevent Java processes from consuming excessive system RAM.",
      difficulty: "medium"
    },
    {
      id: "jdk_15",
      type: "theory",
      question: "What JVM component is responsible for loading native code libraries (.dll or .so files) using JNI (Java Native Interface)?",
      options: [
        "Native Method Stack and Native Library Interface",
        "Bootstrap Loader",
        "Just-In-Time Compiler",
        "Execution Engine Wrapper"
      ],
      answer: 0,
      explanation: "The Native Method Stack stores states for native method execution, and the JVM uses JNI (Java Native Interface) to interact with platform-specific native libraries, linking native functions to Java calls.",
      difficulty: "hard"
    }
  ],
  day4_data_types: [
    {
      id: "dt_1",
      type: "theory",
      question: "Which of the following is NOT a primitive data type in Java?",
      options: [
        "boolean",
        "int",
        "String",
        "double"
      ],
      answer: 2,
      explanation: "String is a class in Java (Reference type), not a primitive type. boolean, int, and double are built-in primitives.",
      difficulty: "easy"
    },
    {
      id: "dt_2",
      type: "theory",
      question: "What is the memory size and range of the byte data type in Java?",
      options: [
        "1 byte (8 bits), -128 to 127",
        "1 byte (8 bits), 0 to 255",
        "2 bytes (16 bits), -32768 to 32767",
        "4 bytes (32 bits), -2147483648 to 2147483647"
      ],
      answer: 0,
      explanation: "A `byte` is an 8-bit signed two's complement integer. Its value range is -128 to 127 (inclusive).",
      difficulty: "easy"
    },
    {
      id: "dt_3",
      type: "practical",
      question: "What is the output of compiling and executing this Java code snippet?",
      code: `byte b = 127;
b++;
System.out.println(b);`,
      options: [
        "128",
        "-128",
        "Compilation Error",
        "Runtime Overflow Exception"
      ],
      answer: 1,
      explanation: "A byte max value is 127. When 127 is incremented, it overflows due to two's complement arithmetic, wrapping around to the minimum value -128.",
      difficulty: "medium"
    },
    {
      id: "dt_4",
      type: "theory",
      question: "What is the default value of a local variable of type float, double, or boolean in Java?",
      options: [
        "0.0f, 0.0, false",
        "null",
        "Local variables do not have default values and must be initialized before use.",
        "0, 0, true"
      ],
      answer: 2,
      explanation: "Unlike class/instance variables (which get default values like 0 or false), local variables declared inside a method do NOT have default values. Using an uninitialized local variable causes a compile-time error.",
      difficulty: "medium"
    },
    {
      id: "dt_5",
      type: "practical",
      question: "What is the data type of the literal value 3.14 in Java by default?",
      options: [
        "float",
        "double",
        "BigDecimal",
        "RealNumber"
      ],
      answer: 1,
      explanation: "By default, any floating-point literal (like 3.14) is treated as a double precision value (double) in Java. To make it a float, you must explicitly append an 'f' or 'F' suffix (e.g. 3.14f).",
      difficulty: "medium"
    },
    {
      id: "dt_6",
      type: "theory",
      question: "What is the size of the char data type in Java, and why?",
      options: [
        "1 byte, to store standard ASCII characters.",
        "2 bytes, because Java uses Unicode (UTF-16 encoding) to support international characters.",
        "4 bytes, to store complex emojis.",
        "Variable size based on the operating system configuration."
      ],
      answer: 1,
      explanation: "A `char` in Java is 2 bytes (16 bits) because Java uses UTF-16 encoding to represent Unicode characters, allowing representation of characters from global languages.",
      difficulty: "medium"
    },
    {
      id: "dt_7",
      type: "practical",
      question: "What is the output of the following arithmetic code in Java?",
      code: `int x = 5 / 2;
double y = 5 / 2;
double z = 5.0 / 2;
System.out.println(x + " " + y + " " + z);`,
      options: [
        "2.5 2.5 2.5",
        "2 2.0 2.5",
        "2 2.5 2.5",
        "Compilation fails"
      ],
      answer: 1,
      explanation: "For `x`, `5 / 2` performs integer division resulting in `2`. For `y`, `5 / 2` also evaluates to integer `2`, which is then converted to double `2.0`. For `z`, `5.0 / 2` uses a double literal, triggering floating-point division resulting in `2.5`.",
      difficulty: "medium"
    },
    {
      id: "dt_8",
      type: "practical",
      question: "What will compile and print from the following code snippet?",
      code: `float f = 1.5;
double d = f + 2.5;
System.out.println(d);`,
      options: [
        "4.0",
        "Compilation Error: Incompatible types (possible loss of precision from double to float)",
        "3.5",
        "Runtime conversion exception"
      ],
      answer: 1,
      explanation: "The literal `1.5` is a double. Assigning a double to a float variable `float f = 1.5` requires an explicit cast or the 'f' suffix (`float f = 1.5f`). Without it, compilation fails.",
      difficulty: "medium"
    },
    {
      id: "dt_9",
      type: "theory",
      question: "How does Java handle widening primitive conversions (implicit casting) vs narrowing conversions (explicit casting)?",
      options: [
        "Widening conversion requires explicit casting; narrowing is done automatically.",
        "Widening conversion is performed automatically (e.g. int to double); narrowing conversion requires an explicit cast (e.g. double to int) because data loss is possible.",
        "Both require explicit casting to ensure compile safety.",
        "Java does not support conversion between primitives."
      ],
      answer: 1,
      explanation: "Widening (safe) conversions go from a smaller type to a larger type and are automatic. Narrowing (unsafe) conversions go from a larger type to a smaller type and require a manual cast (e.g. `(int) myDouble`) to acknowledge potential data loss.",
      difficulty: "medium"
    },
    {
      id: "dt_10",
      type: "practical",
      question: "What is the outcome of compiling and running this code snippet involving character addition?",
      code: `char c1 = 'A';
char c2 = 'B';
int val = c1 + c2;
System.out.println(val);`,
      options: [
        "AB",
        "131",
        "Compilation Error: Cannot perform arithmetic on char types.",
        "197"
      ],
      answer: 1,
      explanation: "Characters are treated as numeric values (Unicode code points) in arithmetic operations. 'A' has value 65 and 'B' has value 66. `65 + 66 = 131`, which is printed.",
      difficulty: "medium"
    },
    {
      id: "dt_11",
      type: "theory",
      question: "Which Primitive wrapper class has a different name than its primitive data type when capitalized?",
      options: [
        "double",
        "boolean",
        "char",
        "float"
      ],
      answer: 2,
      explanation: "The wrapper class for primitive `char` is named `Character`. Similarly, the wrapper class for primitive `int` is named `Integer`. Double, Boolean, and Float match their primitive names.",
      difficulty: "easy"
    },
    {
      id: "dt_12",
      type: "practical",
      question: "What is the printed result of evaluating this boolean comparison in Java?",
      code: `double d1 = 0.1 * 3;
double d2 = 0.3;
System.out.println(d1 == d2);`,
      options: [
        "true",
        "false",
        "Compilation fails",
        "Throws ArithmeticException"
      ],
      answer: 1,
      explanation: "Floating-point calculations lose precision due to base-2 representation. `0.1 * 3` yields `0.30000000000000004`, which is not exactly equal to `0.3`. Hence, it prints `false`.",
      difficulty: "hard"
    },
    {
      id: "dt_13",
      type: "practical",
      question: "What is the result of casting a double with value -4.9 to an integer?",
      code: `double d = -4.9;
int i = (int) d;
System.out.println(i);`,
      options: [
        "-5",
        "-4",
        "Compilation fails",
        "Throws ClassCastException"
      ],
      answer: 1,
      explanation: "Casting a floating-point type to an integer truncates the fractional part (rounds toward zero). Therefore, -4.9 becomes -4.",
      difficulty: "medium"
    },
    {
      id: "dt_14",
      type: "theory",
      question: "Which of the following holds the largest numeric range in Java?",
      options: [
        "long",
        "double",
        "float",
        "int"
      ],
      answer: 1,
      explanation: "A double is a 64-bit floating point type capable of representing values up to ~1.79e308, which is much larger than a 64-bit signed integer (long, max ~9.22e18).",
      difficulty: "hard"
    },
    {
      id: "dt_15",
      type: "practical",
      question: "What is the compiled output of the following variable declaration?",
      code: `int my_num = 1_000_000;
System.out.println(my_num);`,
      options: [
        "Compilation Error: Underscores are not allowed in numeric values.",
        "Prints 1000000",
        "Prints 1_000_000",
        "Throws NumberFormatException"
      ],
      answer: 1,
      explanation: "Java 7 introduced underscores in numeric literals to improve readability. The compiler removes them during compilation, so it prints `1000000`.",
      difficulty: "easy"
    }
  ],
  day5_variables: [
    {
      id: "var_1",
      type: "theory",
      question: "What are the three main types of variables in a Java class based on scope?",
      options: [
        "Public, Private, Protected",
        "Instance, Static (Class), and Local variables",
        "Integer, Float, and String variables",
        "Global, Local, and Shared variables"
      ],
      answer: 1,
      explanation: "Java variables are categorized by scope: Instance variables (defined in class, tied to objects), Static variables (class variables, shared across instances), and Local variables (defined within methods/blocks).",
      difficulty: "easy"
    },
    {
      id: "var_2",
      type: "practical",
      question: "What happens if you try to compile the following class containing variable scopes?",
      code: `public class Scope {
    int x = 10;
    public static void main(String[] args) {
        System.out.println(x);
    }
}`,
      options: [
        "It compiles and prints 10.",
        "Compilation Error: Cannot make a static reference to the non-static field x.",
        "It compiles but prints 0 by default.",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "`x` is an instance variable. Static methods (like `main`) belong to the class and load before objects exist. A static method cannot access non-static instance fields directly without an object reference.",
      difficulty: "medium"
    },
    {
      id: "var_3",
      type: "practical",
      question: "What is the printed result of executing this counter code?",
      code: `class Counter {
    static int staticCount = 0;
    int instanceCount = 0;
    void increment() {
        staticCount++;
        instanceCount++;
    }
}
// In Main:
Counter c1 = new Counter();
Counter c2 = new Counter();
c1.increment();
c2.increment();
System.out.println(c2.staticCount + " " + c2.instanceCount);`,
      options: [
        "1 1",
        "2 2",
        "2 1",
        "1 2"
      ],
      answer: 2,
      explanation: "`staticCount` is shared globally by all Counter objects. Two increments make it 2. `instanceCount` is unique to each object. `c2.instanceCount` was only incremented once, so it holds value 1.",
      difficulty: "medium"
    },
    {
      id: "var_4",
      type: "theory",
      question: "Which keyword is used to declare a variable whose value cannot be modified after initialization?",
      options: [
        "static",
        "final",
        "volatile",
        "const"
      ],
      answer: 1,
      explanation: "The `final` keyword declares a variable as constant. Once a final variable is assigned a value (either in declaration or constructor), it cannot be reassigned. `const` is a reserved word but not used in Java.",
      difficulty: "easy"
    },
    {
      id: "var_5",
      type: "practical",
      question: "What is the output of the following Java program containing a shadow variable?",
      code: `public class Test {
    int x = 5;
    public void print() {
        int x = 10;
        System.out.println(x);
    }
    public static void main(String[] args) {
        new Test().print();
    }
}`,
      options: [
        "5",
        "10",
        "Compilation Error: Variable x is already defined.",
        "0"
      ],
      answer: 1,
      explanation: "Inside the method `print`, declaring a local variable `int x = 10` shadows the class instance variable `int x = 5`. The local variable takes precedence, so it prints 10.",
      difficulty: "medium"
    },
    {
      id: "var_6",
      type: "practical",
      question: "What occurs when the following code block executes in a local method scope?",
      code: `int x;
if (Math.random() > 0.5) {
    x = 10;
}
System.out.println(x);`,
      options: [
        "Compilation Error: Variable x might not have been initialized.",
        "Prints 10 or 0 randomly.",
        "Prints 0 by default.",
        "Throws NullPointerException."
      ],
      answer: 0,
      explanation: "Local variables do not receive default values. The compiler detects that if `Math.random() <= 0.5`, `x` remains uninitialized, triggering a compile-time error for variable use.",
      difficulty: "hard"
    },
    {
      id: "var_7",
      type: "practical",
      question: "What is the print result of the final array modification in this code?",
      code: `final int[] arr = {1, 2, 3};
arr[0] = 10;
// arr = new int[]{4, 5, 6}; // Line 3
System.out.println(arr[0]);`,
      options: [
        "Prints 10",
        "Compilation Error: Can't modify elements of a final array.",
        "Compilation Error on Line 3 only.",
        "Prints 1"
      ],
      answer: 2,
      explanation: "A final reference variable cannot be reassigned to point to another object (so line 3 fails compilation). However, the internal state of the referenced object/array can still be modified (so `arr[0] = 10` is valid).",
      difficulty: "hard"
    },
    {
      id: "var_8",
      type: "theory",
      question: "Where are static variables stored in JVM memory?",
      options: [
        "Inside thread private stack frames.",
        "Inside the JVM Method Area (Metaspace).",
        "Directly inside cpu cache slots.",
        "In the garbage collected young generation heap."
      ],
      answer: 1,
      explanation: "Static variables are part of the class metadata structure. They are stored within the Method Area (Metaspace), which is a memory segment shared by all threads.",
      difficulty: "medium"
    },
    {
      id: "var_9",
      type: "practical",
      question: "What is the output of compiling and executing this code involving Java 10 local variable type inference?",
      code: `var name = "Java";
// name = 10; // Line 2
var age; // Line 3`,
      options: [
        "Compiles successfully.",
        "Compilation Error on Line 3 because local 'var' variables must be initialized immediately.",
        "Compilation Error on Line 2 because 'var' variables cannot change their type from String to int.",
        "Both B and C are correct compile errors."
      ],
      answer: 3,
      explanation: "Java 10 `var` is statically typed local variable inference. It requires immediate initialization to infer the type (so line 3 fails), and once inferred as a String, you cannot assign an int (line 2 fails).",
      difficulty: "hard"
    },
    {
      id: "var_10",
      type: "theory",
      question: "What are the default values assigned to instance variables of object reference, numeric, and boolean types if not explicitly initialized?",
      options: [
        "null, 0, false",
        "null, 0.0, true",
        "empty, 0, false",
        "Throws compile errors."
      ],
      answer: 0,
      explanation: "In Java, instance variables get default values: Object references default to `null`, numeric types (byte, short, int, long, float, double) default to `0` or `0.0`, and booleans default to `false`.",
      difficulty: "easy"
    },
    {
      id: "var_11",
      type: "theory",
      question: "Can a local variable be declared with access modifiers like public, private, or protected?",
      options: [
        "Yes, any access modifier is allowed.",
        "No, local variables exist only within methods and cannot have access modifiers; only the 'final' modifier is permitted.",
        "Only 'public' is allowed.",
        "Access modifiers are allowed only if the class is public."
      ],
      answer: 1,
      explanation: "Local variables are restricted to the method scope. They cannot have access modifiers (public, private, protected) or the `static` modifier. Only `final` and `var` are valid.",
      difficulty: "medium"
    },
    {
      id: "var_12",
      type: "practical",
      question: "What happens when you declare a static final variable in a class?",
      options: [
        "It becomes a runtime constant and can be modified via reflection only.",
        "It acts as a compile-time constant that must be initialized at declaration or in a static block.",
        "It can be initialized in the class constructor.",
        "It triggers heap allocations for every instance."
      ],
      answer: 1,
      explanation: "A `static final` variable is a class constant. It must be initialized immediately during declaration or inside a `static { }` initialization block, and cannot be set in an instance constructor.",
      difficulty: "hard"
    },
    {
      id: "var_13",
      type: "practical",
      question: "What is the output of this local block scoping code snippet?",
      code: `int x = 1;
{
    int x = 2;
    System.out.print(x);
}
System.out.print(x);`,
      options: [
        "21",
        "11",
        "Compilation Error: Variable x is already defined in the outer scope.",
        "22"
      ],
      answer: 2,
      explanation: "In Java, you cannot declare a variable in an inner block scope if it has already been declared in the enclosing outer scope. Thus, `int x = 2;` inside the block fails compilation.",
      difficulty: "hard"
    },
    {
      id: "var_14",
      type: "theory",
      question: "Which keyword prevents a class variable from being serialized during object storage/transmission?",
      options: [
        "volatile",
        "transient",
        "final",
        "synchronized"
      ],
      answer: 1,
      explanation: "The `transient` keyword is used on instance variables to indicate they should not be serialized when saving/sending the object structure.",
      difficulty: "medium"
    },
    {
      id: "var_15",
      type: "practical",
      question: "What is the print output of the following boolean comparison using static references?",
      code: `class Holder {
    static int val = 100;
}
// Main
Holder h1 = null;
System.out.println(h1.val);`,
      options: [
        "Throws NullPointerException",
        "100",
        "Compilation Error",
        "0"
      ],
      answer: 1,
      explanation: "Static variables belong to the class, not individual objects. The compiler references `Holder.val` directly, ignoring the fact that reference variable `h1` is `null`. Hence, it prints 100.",
      difficulty: "hard"
    }
  ],
  day6_methods: [
    {
      id: "meth_1",
      type: "theory",
      question: "What does it mean that Java is strictly 'Pass-by-Value'?",
      options: [
        "Primitives are passed by value, and objects are passed by reference.",
        "A copy of the actual value (for primitives) or a copy of the memory reference address (for objects) is passed to methods.",
        "Object instances are copied entirely in memory when passed.",
        "Java methods return values by reference."
      ],
      answer: 1,
      explanation: "Java is strictly pass-by-value. When an object is passed, Java copies the reference variable (the address pointer) and passes it. It does not pass the actual object or allow changing the original reference itself.",
      difficulty: "hard"
    },
    {
      id: "meth_2",
      type: "practical",
      question: "What is the output of the following swap execution in Java?",
      code: `public static void swap(Point p1, Point p2) {
    Point temp = p1;
    p1 = p2;
    p2 = temp;
}
// In main:
Point a = new Point(1, 1);
Point b = new Point(2, 2);
swap(a, b);
System.out.println("a=" + a.x + " b=" + b.x);`,
      options: [
        "a=2 b=1",
        "a=1 b=2",
        "Compilation Error",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "Since Java passes reference values by copying the pointer variables, swapping `p1` and `p2` local pointers inside `swap()` only changes the copy, leaving the original `a` and `b` references unchanged.",
      difficulty: "hard"
    },
    {
      id: "meth_3",
      type: "practical",
      question: "What will compile and print from the following code executing attribute change?",
      code: `public static void modify(Point p) {
    p.x = 100;
}
// In main:
Point a = new Point(1, 1);
modify(a);
System.out.println(a.x);`,
      options: [
        "1",
        "100",
        "Compilation Error",
        "0"
      ],
      answer: 1,
      explanation: "Although the reference pointer itself is copied, both the original and copied references point to the same object in the heap. Therefore, changing `p.x` modifies the shared object, printing 100.",
      difficulty: "medium"
    },
    {
      id: "meth_4",
      type: "theory",
      question: "Which of the following is true about overloading methods in Java?",
      options: [
        "Methods must have different return types.",
        "Methods must share the same name but have different parameter lists (different number, types, or order of arguments).",
        "Overloaded methods must have the same parameter list.",
        "Overloaded methods must throw different exceptions."
      ],
      answer: 1,
      explanation: "Method overloading is a compile-time polymorphism feature where methods in the same class share a name but differ in their parameter signatures. Differing only by return type is not allowed.",
      difficulty: "easy"
    },
    {
      id: "meth_5",
      type: "practical",
      question: "Why does the following method overload fail to compile?",
      code: `public class Test {
    public int calc(int a) { return a; }
    public double calc(int a) { return a * 2.0; }
}`,
      options: [
        "They have different return types.",
        "The compiler cannot distinguish them based on return type alone when parameter lists are identical.",
        "Double conversions are not automatic.",
        "They should be static."
      ],
      answer: 1,
      explanation: "In Java, method signatures consist of the method name and parameter types. Return types are not part of the signature, so the compiler cannot differentiate them, leading to a duplicate method compile error.",
      difficulty: "medium"
    },
    {
      id: "meth_6",
      type: "theory",
      question: "What is the purpose of the 'varargs' (variable arguments) parameter in Java methods?",
      options: [
        "To allow passing variables of any data type to a single argument.",
        "To allow passing zero or more arguments of the specified type, which are internally parsed as an array.",
        "To dynamically speed up parameter compilation.",
        "To bypass static checking on methods."
      ],
      answer: 1,
      explanation: "Varargs (e.g. `int... numbers`) allows passing a variable number of parameters of a specific type. Inside the method, the parameter is treated as an array of that type.",
      difficulty: "medium"
    },
    {
      id: "meth_7",
      type: "practical",
      question: "Which varargs signature compilation is invalid in Java?",
      options: [
        "void method(String... names)",
        "void method(int x, String... names)",
        "void method(String... names, int x)",
        "void method(double[]... grids)"
      ],
      answer: 2,
      explanation: "If a method has multiple parameters, the varargs parameter (e.g. `String... names`) must be the last parameter in the declaration. Thus, declaring parameters after varargs fails compilation.",
      difficulty: "hard"
    },
    {
      id: "meth_8",
      type: "theory",
      question: "What is the difference between static methods and instance methods in Java?",
      options: [
        "Static methods require class instances to be called.",
        "Static methods belong to the class and are called without creating an object; they cannot access non-static instance fields directly.",
        "Instance methods cannot call static methods.",
        "Static methods are executed inside browser contexts."
      ],
      answer: 1,
      explanation: "Static methods (declared with `static`) are associated with the class, not object instances. They cannot access non-static fields or use the `this` keyword because there is no active instance.",
      difficulty: "medium"
    },
    {
      id: "meth_9",
      type: "practical",
      question: "What is the output of calling print(null) in this overloaded method scenario?",
      code: `class Overload {
    void print(Object o) { System.out.print("Obj"); }
    void print(String s) { System.out.print("Str"); }
}
// Main
new Overload().print(null);`,
      options: [
        "Obj",
        "Str",
        "Compilation Error: Ambiguous method call.",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "When resolving overloaded methods with `null`, Java selects the most specific type matching the argument. Since `String` is a subclass of `Object`, `String` is more specific, so `print(String)` is executed.",
      difficulty: "hard"
    },
    {
      id: "meth_10",
      type: "practical",
      question: "What is the output of resolving this numeric promotions overloading structure?",
      code: `class Overload {
    void print(double d) { System.out.print("Double"); }
    void print(Integer i) { System.out.print("Integer"); }
}
// Main
int x = 10;
new Overload().print(x);`,
      options: [
        "Double",
        "Integer",
        "Compilation Error: ambiguous overload call.",
        "Throws ClassCastException"
      ],
      answer: 0,
      explanation: "Java resolving order: 1) Exact match, 2) Widening primitive promotion (int to double), 3) Autoboxing (int to Integer), 4) Varargs. Since widening has higher precedence than autoboxing, `double` is matched.",
      difficulty: "hard"
    },
    {
      id: "meth_11",
      type: "theory",
      question: "Can a static method override another static method in a subclass?",
      options: [
        "Yes, standard override dynamic lookup rules apply.",
        "No, static methods cannot be overridden; instead, they are hidden (Method Hiding), and binding is determined at compile-time based on the reference type.",
        "Yes, but only if they are declared in public interfaces.",
        "Only if they throw identical exceptions."
      ],
      answer: 1,
      explanation: "Static methods belong to classes. If a subclass declares an identical static method, it hides the parent class's static method (Method Hiding). Virtual method binding does not apply, and binding is determined at compile-time.",
      difficulty: "hard"
    },
    {
      id: "meth_12",
      type: "practical",
      question: "What is the printed result of executing this method hiding test?",
      code: `class Parent {
    static void show() { System.out.print("Parent "); }
}
class Child extends Parent {
    static void show() { System.out.print("Child "); }
}
// Main
Parent p = new Child();
p.show();`,
      options: [
        "Parent ",
        "Child ",
        "Compilation Error",
        "Throws runtime binding error"
      ],
      answer: 0,
      explanation: "Since `show` is static, method overriding does not occur. The reference type of variable `p` is `Parent`, which is evaluated at compile-time to bind the call to `Parent.show()`. Hence, it prints 'Parent '.",
      difficulty: "hard"
    },
    {
      id: "meth_13",
      type: "theory",
      question: "Which of the following is true about final methods in Java?",
      options: [
        "They cannot be overloaded.",
        "They cannot be overridden by subclasses.",
        "They cannot be static.",
        "They must return final objects."
      ],
      answer: 1,
      explanation: "Declaring a method as `final` prevents subclasses from overriding it, ensuring that its implementation cannot be modified by subclasses.",
      difficulty: "medium"
    },
    {
      id: "meth_14",
      type: "theory",
      question: "What does the keyword 'native' in a Java method signature signify?",
      options: [
        "The method is written in raw Java bytecode only.",
        "The method is implemented in platform-dependent native languages (like C/C++) and accessed via Java Native Interface (JNI).",
        "The method runs directly on hardware cores bypassing the JVM.",
        "The method is local to the current source package."
      ],
      answer: 1,
      explanation: "A `native` method is declared in Java without a body, and its implementation is linked to compiled native libraries (C/C++) loaded at runtime, enabling direct OS and hardware calls.",
      difficulty: "hard"
    },
    {
      id: "meth_15",
      type: "practical",
      question: "What occurs if a method returns a value but also has a finally block containing a return?",
      code: `public static int test() {
    try {
        return 1;
    } finally {
        return 2;
    }
}`,
      options: [
        "Returns 1.",
        "Returns 2.",
        "Compilation Error: Multiple return statements are not allowed.",
        "Throws runtime exception."
      ],
      answer: 1,
      explanation: "The `finally` block always executes. If the finally block contains a return statement, it overrides the return statement in the try (or catch) block, returning 2.",
      difficulty: "hard"
    }
  ],
  day7_constructor: [
    {
      id: "const_1",
      type: "theory",
      question: "What is a constructor in Java and how does its signature differ from a method?",
      options: [
        "A constructor has the same name as the class and must declare a void return type.",
        "A constructor has the same name as the class and must NOT declare any return type (not even void).",
        "A constructor must be static and return an instance of the class.",
        "A constructor is defined using the keyword 'constructor'."
      ],
      answer: 1,
      explanation: "Java constructors initialize new objects. They must have the exact same name as the class and do not declare any return type (specifying void turns it into a standard method).",
      difficulty: "easy"
    },
    {
      id: "const_2",
      type: "theory",
      question: "What is a 'Default Constructor' in Java, and when is it generated?",
      options: [
        "It is a constructor with zero arguments, generated by the compiler only if the class does not define ANY explicit constructors.",
        "It is a constructor created automatically for all classes containing static variables.",
        "It is a constructor that initializes all fields to custom developer values.",
        "It is generated only if the class is marked public."
      ],
      answer: 0,
      explanation: "If you define no constructor in your class, the Java compiler automatically inserts a public, zero-argument default constructor. If you define any constructor (with or without arguments), the default constructor is not generated.",
      difficulty: "medium"
    },
    {
      id: "const_3",
      type: "practical",
      question: "Why does compiling this code fail in the Main execution?",
      code: `class Item {
    int id;
    Item(int id) { this.id = id; }
}
// In Main:
Item item = new Item();`,
      options: [
        "Item should be defined as public.",
        "The compiler failed because no default zero-argument constructor exists for class Item.",
        "Object initialization requires parameters.",
        "Constructors cannot accept int types."
      ],
      answer: 1,
      explanation: "Since class `Item` declares a parameterized constructor `Item(int id)`, the compiler does not generate the default zero-argument constructor. Calling `new Item()` fails compilation because no zero-argument constructor exists.",
      difficulty: "medium"
    },
    {
      id: "const_4",
      type: "theory",
      question: "What is 'Constructor Chaining' in Java?",
      options: [
        "Calling a sequence of methods inside a constructor.",
        "The process of calling one constructor from another constructor within the same class (using this()) or from a parent class (using super()).",
        "Linking multiple classes together via their constructors.",
        "Writing nested constructors within a single class."
      ],
      answer: 1,
      explanation: "Constructor chaining is calling constructors in a sequence. You chain constructors within the same class using `this(...)` or invoke the parent class constructor using `super(...)`.",
      difficulty: "medium"
    },
    {
      id: "const_5",
      type: "practical",
      question: "Which of the following is a compiler rule regarding the placement of this() or super() calls inside a constructor?",
      options: [
        "They can be placed anywhere in the constructor body.",
        "Either call (this() or super()) must be the absolute first statement in the constructor.",
        "They must be called at the end of the constructor body.",
        "They can only be called from static initialization blocks."
      ],
      answer: 1,
      explanation: "To ensure proper initialization, a call to `this(...)` or `super(...)` must be the very first line in the constructor body. Declaring other lines before them results in a compilation error.",
      difficulty: "medium"
    },
    {
      id: "const_6",
      type: "practical",
      question: "What is the printed result of executing this constructor chaining code?",
      code: `class Base {
    Base() { System.out.print("Base "); }
}
class Derived extends Base {
    Derived() {
        this(10);
        System.out.print("Derived1 ");
    }
    Derived(int x) {
        System.out.print("Derived2 ");
    }
}
// Main
new Derived();`,
      options: [
        "Base Derived1 Derived2",
        "Derived2 Derived1 Base",
        "Base Derived2 Derived1",
        "Derived1 Derived2 Base"
      ],
      answer: 2,
      explanation: "Execution flow: 1) `new Derived()` calls `Derived()`. 2) `Derived()` chains to `Derived(int)` via `this(10)`. 3) `Derived(int)` implicitly calls `super()` (invoking `Base()`). 4) `Base()` prints 'Base '. 5) `Derived(int)` prints 'Derived2 '. 6) `Derived()` prints 'Derived1 '. Output: 'Base Derived2 Derived1 '.",
      difficulty: "hard"
    },
    {
      id: "const_7",
      type: "theory",
      question: "Can a constructor be declared with the 'private' access modifier? If so, why?",
      options: [
        "No, constructors must be public to allow object creation.",
        "Yes, to prevent external class instantiation (e.g. in Singleton design patterns or utility classes with only static methods).",
        "Only if the class is declared private.",
        "Yes, but objects can only be created via the 'new' keyword inside main."
      ],
      answer: 1,
      explanation: "Private constructors are a standard design pattern. They prevent external classes from creating instances of the class directly, which is useful for Singleton classes or utility classes containing only static methods.",
      difficulty: "medium"
    },
    {
      id: "const_8",
      type: "practical",
      question: "What is the printed output of this recursive constructor execution?",
      code: `class Cycle {
    Cycle() {
        this(10);
    }
    Cycle(int x) {
        this();
    }
}`,
      options: [
        "It compiles and runs fine.",
        "Compilation Error: Recursive constructor invocation.",
        "Throws StackOverflowError at runtime.",
        "It enters an infinite loop."
      ],
      answer: 1,
      explanation: "The compiler detects cyclic constructor calls (`Cycle()` calling `Cycle(int)` which calls `Cycle()`) and throws a compile-time error: 'recursive constructor invocation'.",
      difficulty: "hard"
    },
    {
      id: "const_9",
      type: "theory",
      question: "What is a 'Copy Constructor' in Java?",
      options: [
        "A constructor that clones the compiled .class file.",
        "A constructor that accepts an instance of its own class as a parameter to copy its member variables to the new object.",
        "A constructor that copies memory address references only.",
        "A system constructor that clones JVM heaps."
      ],
      answer: 1,
      explanation: "Unlike C++, Java doesn't have a built-in copy constructor. Developers write custom copy constructors (e.g. `User(User other)`) to copy field values from an existing object to a new instance.",
      difficulty: "easy"
    },
    {
      id: "const_10",
      type: "practical",
      question: "Can a constructor be inherited by a subclass?",
      options: [
        "Yes, subclasses inherit all constructors of the parent class.",
        "No, constructors are not inherited; they must be invoked using 'super()' or defined explicitly in the subclass.",
        "Only public constructors are inherited.",
        "Only default constructors are inherited."
      ],
      answer: 1,
      explanation: "Constructors are not members of a class and are not inherited. A subclass must define its own constructors and call the parent constructor using `super(...)`.",
      difficulty: "medium"
    },
    {
      id: "const_11",
      type: "theory",
      question: "What happens if a parent class does not have a zero-argument constructor, and a subclass defines a constructor without calling super() explicitly?",
      options: [
        "The subclass constructor compiles and runs successfully.",
        "Compilation Error: Implicit super constructor is undefined for the default constructor.",
        "The parent class fields remain null at runtime.",
        "The program crashes with a ClassCastException."
      ],
      answer: 1,
      explanation: "By default, the compiler inserts `super()` as the first line of a subclass constructor. If the parent class has no zero-argument constructor, this implicit call fails, resulting in a compile-time error.",
      difficulty: "hard"
    },
    {
      id: "const_12",
      type: "theory",
      question: "Can constructors be declared final, static, or abstract?",
      options: [
        "Yes, constructors can use any modifier.",
        "No, constructors cannot be final, static, or abstract because they are not inherited, belong to instances, and must contain concrete code.",
        "Only 'static' is allowed.",
        "Only 'final' is allowed."
      ],
      answer: 1,
      explanation: "Constructors cannot be static (they instantiate objects), final (they are not inherited, so overriding doesn't apply), or abstract (they must contain concrete initialization logic).",
      difficulty: "medium"
    },
    {
      id: "const_13",
      type: "practical",
      question: "What is the printed output of the constructor compilation test?",
      code: `class Test {
    int val;
    void Test() {
        val = 100;
    }
}
// Main
Test t = new Test();
System.out.println(t.val);`,
      options: [
        "100",
        "0",
        "Compilation Error",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "Declaring a return type like `void` on a constructor block (`void Test()`) turns it into a standard method. The compiler generates a default constructor that leaves `val` initialized to its default value `0`. Hence, it prints 0.",
      difficulty: "hard"
    },
    {
      id: "const_14",
      type: "theory",
      question: "Which constructor call is used in abstract classes?",
      options: [
        "Abstract classes do not have constructors.",
        "Abstract classes have constructors that are invoked by subclasses via super() to initialize abstract class state.",
        "They have static factory constructors only.",
        "They have abstract constructors that are implemented by subclasses."
      ],
      answer: 1,
      explanation: "Although abstract classes cannot be instantiated with `new`, they have constructors. These constructors are called via `super()` in subclasses to initialize base class fields.",
      difficulty: "medium"
    },
    {
      id: "const_15",
      type: "practical",
      question: "What is the printed order of blocks and constructors in this class initialization?",
      code: `class BlockTest {
    static { System.out.print("Static "); }
    { System.out.print("Instance "); }
    BlockTest() { System.out.print("Constructor "); }
}
// In Main:
new BlockTest();`,
      options: [
        "Static Instance Constructor",
        "Instance Static Constructor",
        "Constructor Static Instance",
        "Static Constructor Instance"
      ],
      answer: 0,
      explanation: "Order of initialization: 1) Static block (on class load), 2) Instance block (when object is created), 3) Constructor body. Output is: 'Static Instance Constructor '.",
      difficulty: "hard"
    }
  ],
  day8_operators: [
    {
      id: "op_1",
      type: "theory",
      question: "What is the output of the expression 5 + 3 * 2 in Java?",
      options: ["16", "11", "10", "15"],
      answer: 1,
      explanation: "Multiplication (*) has a higher precedence than addition (+). Thus, 3 * 2 evaluates first to 6, then 5 + 6 evaluates to 11.",
      difficulty: "easy"
    },
    {
      id: "op_2",
      type: "theory",
      question: "Which operator is short-circuiting in Java, meaning it evaluates the right-hand operand only if necessary?",
      options: ["&", "&&", "|", "^"],
      answer: 1,
      explanation: "The double ampersand (&&) is the short-circuit logical AND operator. If the first operand evaluates to false, the result is guaranteed to be false, so the JVM skips evaluating the second operand.",
      difficulty: "easy"
    },
    {
      id: "op_3",
      type: "theory",
      question: "What is the result of -5 % 2 in Java?",
      options: ["1", "-1", "-2.5", "0"],
      answer: 1,
      explanation: "In Java, the sign of the result of the modulo/remainder operator (%) is always determined by the sign of the left operand (the dividend). Since -5 is negative, the result is -1.",
      difficulty: "medium"
    },
    {
      id: "op_4",
      type: "theory",
      question: "What is the difference between >> and >>> shift operators?",
      options: [
        ">> is logical shift and >>> is arithmetic shift",
        ">> preserves the sign bit (arithmetic shift) while >>> fills the left bits with zero (logical shift)",
        ">> works only on signed ints, while >>> works on unsigned ints",
        ">> divides by 2, and >>> multiplies by 2"
      ],
      answer: 1,
      explanation: "The signed right shift operator (>>) performs an arithmetic shift, propagating the sign bit. The unsigned right shift (>>>) performs a logical shift, filling empty positions on the left with zeroes.",
      difficulty: "hard"
    },
    {
      id: "op_5",
      type: "theory",
      question: "Why does s += 5; compile but s = s + 5; fail to compile when s is declared as a short type?",
      options: [
        "The compound assignment operator uses a larger internal stack register",
        "The compound assignment operator += performs an implicit cast to the left-hand side type, whereas s + 5 promotes s to int first",
        "Short types do not support standard addition operator",
        "The compiler automatically optimizes += into a native floating point shift"
      ],
      answer: 1,
      explanation: "In Java, compound assignment expressions like `s += 5` are internally expanded to `s = (short)(s + 5)`. Normal addition promotes the variables to `int` first, causing a loss-of-precision compiler error without manual casting.",
      difficulty: "hard"
    },
    {
      id: "op_6",
      type: "theory",
      question: "What is the value of obj after this assignment: Object obj = true ? 1.0 : 2;?",
      options: [
        "It is an Integer object of value 1",
        "It is a Double object of value 1.0 because of ternary type promotion",
        "It fails compilation due to mismatched return types",
        "It is a Float object of value 1.0f"
      ],
      answer: 1,
      explanation: "The ternary operator evaluates the types of both branches. Since 1.0 is a double and 2 is an int, the int is promoted to double (1.0 vs 2.0) to ensure a uniform type, so `obj` holds a Double of value 1.0.",
      difficulty: "hard"
    },
    {
      id: "op_7",
      type: "practical",
      question: "What is the value of y after this code executes: int x = 5; int y = x++;?",
      options: ["6", "5", "0", "4"],
      answer: 1,
      explanation: "The postfix increment operator (x++) returns the current value of x before incrementing it. Thus, y receives the value 5, and then x is updated to 6.",
      difficulty: "easy"
    },
    {
      id: "op_8",
      type: "theory",
      question: "What does the expression int x = - -5; evaluate to in Java?",
      options: ["-5", "5", "Compilation Error: consecutive operators", "0"],
      answer: 1,
      explanation: "The unary minus operator negates its operand. A double negation (- -5) negates -5 back to positive 5. Note that spaces are required to prevent parsing as decrement.",
      difficulty: "easy"
    },
    {
      id: "op_9",
      type: "practical",
      question: "What is the output of System.out.println(1 + 2 + \"3\" + 4 + 5);?",
      options: ["15", "3345", "339", "12345"],
      answer: 1,
      explanation: "Operators of equal precedence evaluate left-to-right. First, `1 + 2` evaluates to 3. Then, `3 + \"3\"` concatenates to the String \"33\". All subsequent additions are treated as string concatenations, producing \"3345\".",
      difficulty: "medium"
    },
    {
      id: "op_10",
      type: "theory",
      question: "Why does the expression 0.1 * 3 == 0.3 evaluate to false in Java?",
      options: [
        "Because 0.1 is implicitly cast to a float type",
        "Because double literals cannot represent exactly 0.1 in binary floating-point representation, causing a tiny rounding difference",
        "Because double values cannot be compared using the == operator",
        "Because the compiler translates it to integer operations"
      ],
      answer: 1,
      explanation: "In binary floating-point representations (IEEE 754), fractional numbers like 0.1 have no exact representation, leading to minor precision rounding differences. Consequently, `0.1 * 3` is actually `0.30000000000000004`, which is not equal to `0.3`.",
      difficulty: "hard"
    },
    {
      id: "op_11",
      type: "theory",
      question: "What is the result of null instanceof Object in Java?",
      options: ["true", "false", "Compilation Error", "NullPointerException"],
      answer: 1,
      explanation: "The `instanceof` operator checks if an object reference belongs to a type. Since `null` represents no active object, any `null instanceof Type` check yields false without throwing an exception.",
      difficulty: "medium"
    },
    {
      id: "op_12",
      type: "theory",
      question: "Which operator returns true if and only if its operands have different boolean values?",
      options: ["&&", "^", "||", "!"],
      answer: 1,
      explanation: "The exclusive OR (XOR) operator (^) returns true if one operand is true and the other is false. If they are both true or both false, it returns false.",
      difficulty: "easy"
    },
    {
      id: "op_13",
      type: "practical",
      question: "What is the value of 1 << 35 in Java?",
      options: ["34359738368", "8", "32", "0"],
      answer: 1,
      explanation: "For 32-bit int shifts, the JVM masks the right-hand shift operand with 31 (0x1f). Consequently, a shift of 35 is treated as `35 % 32 = 3` bits, resulting in `1 << 3 = 8`.",
      difficulty: "hard"
    },
    {
      id: "op_14",
      type: "practical",
      question: "What is the value of x after executing: int x = 5; x *= 2 + 3;?",
      options: ["13", "25", "10", "15"],
      answer: 1,
      explanation: "Compound assignment operators (like *=) have lower precedence than arithmetic operators (like +). Thus, `2 + 3` evaluates first to 5, and then `x *= 5` sets x to 25.",
      difficulty: "medium"
    },
    {
      id: "op_15",
      type: "theory",
      question: "What is the result of !(!true || false)?",
      options: ["false", "true", "Compilation Error", "Runtime Exception"],
      answer: 1,
      explanation: "`!true` resolves to false. `false || false` evaluates to false. Negating the result (`!false`) evaluates to true.",
      difficulty: "easy"
    }
  ],
  day9_loops_for: [
    {
      id: "loop_for_1",
      type: "theory",
      question: "In a standard for loop, when is the update/increment expression executed?",
      options: [
        "Before evaluating the loop condition for the first time",
        "At the end of each iteration, immediately after the loop body completes and before re-evaluating the condition",
        "Simultaneously with the loop condition check",
        "Only when a continue statement is hit inside the loop body"
      ],
      answer: 1,
      explanation: "In a `for (init; cond; update)` loop, the update expression is executed at the absolute end of the loop body block, immediately prior to checking the loop condition for the next iteration.",
      difficulty: "easy"
    },
    {
      id: "loop_for_2",
      type: "practical",
      question: "What is the output of this code snippet?\nint count = 0;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == j) continue;\n        count++;\n    }\n}\nSystem.out.println(count);",
      options: ["9", "6", "3", "0"],
      answer: 1,
      explanation: "The nested loops generate combinations. Whenever i equals j (00, 11, 22), the count increment is skipped. The remaining 6 combinations increment the counter, printing 6.",
      difficulty: "medium"
    },
    {
      id: "loop_for_3",
      type: "theory",
      question: "Which of the following is a compile-time error when defining variables inside a for-loop initialization block?",
      options: [
        "Initializing multiple variables of the same type (e.g. int i = 0, j = 1;)",
        "Declaring variables of different types (e.g. int i = 0, double d = 1.0;)",
        "Using existing variables without redeclaring them",
        "Omitting the initialization block entirely"
      ],
      answer: 1,
      explanation: "A `for` loop initialization block allows declaring multiple variables, but they must all share the same data type. Attempting to declare different types (like `int` and `double`) within the same init statement fails compilation.",
      difficulty: "hard"
    },
    {
      id: "loop_for_4",
      type: "practical",
      question: "What is the output of this labeled break statement code?\nouter: for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == 1) break outer;\n        System.out.print(i + \"\" + j + \" \");\n    }\n}",
      options: [
        "00 01 02 10 11 12",
        "00 01 02 ",
        "00 01 02 20 21 22",
        "00 01 02 10 11 12 20 21 22"
      ],
      answer: 1,
      explanation: "For i=0, the inner loop prints '00 01 02 '. When i becomes 1, the inner condition checks `i == 1` and breaks the `outer` loop entirely, halting execution. The output is '00 01 02 '.",
      difficulty: "medium"
    },
    {
      id: "loop_for_5",
      type: "theory",
      question: "What is the behavior of the following loop: for ( ; ; ) { // body }?",
      options: [
        "It fails compilation because initialization and condition are missing",
        "It executes as an infinite loop, as the empty condition defaults to true",
        "It executes exactly once",
        "It throws a RuntimeException on startup"
      ],
      answer: 1,
      explanation: "Java permits omitting all expressions inside the `for` statement. A missing condition expression is treated by the compiler as an absolute `true`, creating an infinite loop.",
      difficulty: "easy"
    },
    {
      id: "loop_for_6",
      type: "practical",
      question: "What is the output of this loop running over an array?\nint[] arr = {1, 2, 3};\nfor (int x : arr) {\n    x = x * 2;\n}\nSystem.out.println(arr[0]);",
      options: ["2", "1", "4", "Compilation Error"],
      answer: 1,
      explanation: "The enhanced `for` loop (for-each) creates a local copy of each element value in the iteration variable `x`. Modifying `x` does not modify the reference or elements inside the actual array.",
      difficulty: "medium"
    },
    {
      id: "loop_for_7",
      type: "theory",
      question: "What does the continue statement do in a nested loop?",
      options: [
        "Terminates the outer loop immediately",
        "Skips the rest of the current iteration of the innermost loop and evaluates the next increment/condition",
        "Exits the current method entirely",
        "Re-initializes all loop variables to zero"
      ],
      answer: 1,
      explanation: "An unlabeled `continue` statement targets the innermost loop. It immediately skips any remaining code in the loop body for that iteration, jumping straight to the update/condition steps.",
      difficulty: "easy"
    },
    {
      id: "loop_for_8",
      type: "practical",
      question: "What is the output of the following code snippet?\nint i;\nfor (i = 0; i < 5; i++) {\n    if (i == 3) break;\n}\nSystem.out.println(i);",
      options: ["5", "3", "4", "Compilation Error: i is not initialized"],
      answer: 1,
      explanation: "The loop increments `i`. When `i` reaches 3, the `break` statement executes, exiting the loop. Since `i` is declared outside the loop scope, it is accessible after the loop, printing 3.",
      difficulty: "easy"
    },
    {
      id: "loop_for_9",
      type: "theory",
      question: "Why is it generally recommended to avoid modifying the iteration variable inside the body of a standard for loop?",
      options: [
        "It triggers a ConcurrentModificationException at runtime",
        "It makes the code harder to read, maintain, and increases the risk of infinite loops",
        "It fails compilation in modern Java versions",
        "It slows down JIT compiler optimizations"
      ],
      answer: 1,
      explanation: "Modifying the loop control index within the body alters the step logic outside the standard declaration block, leading to spaghetti code and high risk of unintended infinite loops.",
      difficulty: "medium"
    },
    {
      id: "loop_for_10",
      type: "practical",
      question: "What is the output of this code snippet?\nint count = 0;\nfor (int i = 0, j = 10; i < j; i++, j--) {\n    count++;\n}\nSystem.out.println(count);",
      options: ["10", "5", "4", "Compilation Error: multiple updates"],
      answer: 1,
      explanation: "The loop updates two variables: i increments and j decrements. Step 1: i=0, j=10. Step 2: i=1, j=9. Step 3: i=2, j=8. Step 4: i=3, j=7. Step 5: i=4, j=6. On the next check, i=5, j=5, so 5 < 5 is false. Total iterations = 5.",
      difficulty: "medium"
    },
    {
      id: "loop_for_11",
      type: "practical",
      question: "What will print from the following code snippet?\nfor (int i = 0; i < 1; System.out.println(\"Update\")) {\n    System.out.println(\"Body\");\n    i++;\n}",
      options: [
        "Update followed by Body",
        "Body followed by Update",
        "Body only",
        "Update only"
      ],
      answer: 1,
      explanation: "The loop body executes first, printing 'Body'. After that, the update expression `System.out.println(\"Update\")` executes, printing 'Update' before checking the condition again.",
      difficulty: "hard"
    },
    {
      id: "loop_for_12",
      type: "theory",
      question: "Which of the following is true regarding local variables declared in the initialization section of a for loop?",
      options: [
        "They are visible throughout the entire enclosing method class",
        "Their scope is restricted strictly to the for loop statement and its body",
        "They can be accessed in static methods only",
        "They must be declared final"
      ],
      answer: 1,
      explanation: "Variables declared inside the `for` initialization block (e.g. `for (int i = 0; ... )`) are local to the loop structure and are out-of-scope after the loop terminates.",
      difficulty: "medium"
    },
    {
      id: "loop_for_13",
      type: "practical",
      question: "What is the output of the following code?\nint x = 0;\nfor (int i = 0; i < 3; i++); {\n    x += 5;\n}\nSystem.out.println(x);",
      options: ["15", "5", "0", "Compilation Error: empty statement"],
      answer: 1,
      explanation: "The semicolon at the end of the `for` statement forms an empty loop body. The block `{ x += 5; }` is a separate local block that executes exactly once after the loop has fully iterated. Thus, it prints 5.",
      difficulty: "hard"
    },
    {
      id: "loop_for_14",
      type: "practical",
      question: "What happens when compilation of this code is attempted?\nfor (int i = 0; i < 3; i++) {\n    if (true) {\n        int i = 5;\n    }\n}",
      options: [
        "Compiles successfully and runs",
        "Compilation Error: variable i is already defined in the scope",
        "Throws a NullPointerException at runtime",
        "Causes an infinite loop"
      ],
      answer: 1,
      explanation: "Java forbids declaring a variable in a block scope if that same identifier is already defined in the outer scope (in this case, the loop header index `i`). This results in a duplicate variable compilation error.",
      difficulty: "hard"
    },
    {
      id: "loop_for_15",
      type: "theory",
      question: "What is the primary difference between a standard for loop and an enhanced for loop (for-each)?",
      options: [
        "The enhanced for loop can iterate backward, whereas the standard loop cannot",
        "The enhanced for loop hides the iterator or index variable, preventing index out of bounds exceptions and simplifying reads",
        "The enhanced for loop is compiled directly into a native database query",
        "The enhanced for loop is slower than a standard loop"
      ],
      answer: 1,
      explanation: "The enhanced loop avoids index tracking entirely, preventing indexing errors. It is cleaner for read-only iterations over arrays and collections.",
      difficulty: "medium"
    }
  ],
  day10_loops_while: [
    {
      id: "loop_while_1",
      type: "theory",
      question: "What is the main difference between a while loop and a do-while loop in Java?",
      options: [
        "A while loop executes at least once, while a do-while loop may not execute at all",
        "A while loop evaluates the condition before executing the body, while a do-while loop executes the body first and then evaluates the condition",
        "While loops are compiled to faster bytecode than do-while loops",
        "Do-while loops require a class index, while loops do not"
      ],
      answer: 1,
      explanation: "A `while` loop checks the condition first, potentially executing 0 times. A `do-while` loop executes the body block first, then evaluates the condition, ensuring at least 1 iteration.",
      difficulty: "easy"
    },
    {
      id: "loop_while_2",
      type: "practical",
      question: "What is the output of this code snippet?\nint x = 5;\nwhile (x > 0) {\n    x--;\n}\nSystem.out.println(x);",
      options: ["5", "0", "-1", "1"],
      answer: 1,
      explanation: "The loop decrements x until it is 0. Once x becomes 0, the condition `x > 0` evaluates to false, exiting the loop and printing 0.",
      difficulty: "easy"
    },
    {
      id: "loop_while_3",
      type: "practical",
      question: "What is the output of the following do-while loop?\nint x = 0;\ndo {\n    x += 2;\n} while (x < 0);\nSystem.out.println(x);",
      options: ["0", "2", "-2", "Compilation Error"],
      answer: 1,
      explanation: "In a `do-while` loop, the body runs once, setting x to 2. The condition `x < 0` (2 < 0) is false, so the loop exits. It prints 2.",
      difficulty: "medium"
    },
    {
      id: "loop_while_4",
      type: "theory",
      question: "What is the outcome of compiling and running this code:\nwhile (false) {\n    System.out.println(\"Unreachable\");\n}?",
      options: [
        "Compiles successfully but prints nothing",
        "Compilation Error: unreachable statement",
        "Throws a runtime exception on startup",
        "Enters an infinite loop"
      ],
      answer: 1,
      explanation: "Java does not allow statements that can never be reached. Since the condition is literal `false`, the compiler flags the body of the `while` loop as unreachable, throwing a compilation error.",
      difficulty: "medium"
    },
    {
      id: "loop_while_5",
      type: "practical",
      question: "What is the output of this code snippet?\nint x = 1;\nwhile (x++ < 3) {\n    System.out.print(x + \" \");\n}",
      options: ["1 2 ", "2 3 ", "2 3 4 ", "1 2 3 "],
      answer: 1,
      explanation: "Postfix increment evaluates first, then increments. Step 1: 1 < 3 is true, x becomes 2, prints 2. Step 2: 2 < 3 is true, x becomes 3, prints 3. Step 3: 3 < 3 is false, x becomes 4, loop exits. Prints '2 3 '.",
      difficulty: "hard"
    },
    {
      id: "loop_while_6",
      type: "practical",
      question: "What is the output of this loop with a nested condition?\nint x = 10;\nwhile (x > 5) {\n    x -= 2;\n    if (x == 6) continue;\n    System.out.print(x + \" \");\n}",
      options: ["8 6 4 ", "8 ", "8 4 ", "8 6 "],
      answer: 1,
      explanation: "Iteration 1: x is 10, decrements to 8, prints 8. Iteration 2: x is 8, decrements to 6, triggers continue (skips print). Iteration 3: x is 6, decrements to 4, condition 4 > 5 is false, loop exits. Only prints 8.",
      difficulty: "medium"
    },
    {
      id: "loop_while_7",
      type: "practical",
      question: "What is the output of the following code?\nint x = 3;\ndo {\n    System.out.print(x + \" \");\n    x--;\n} while (x > 3);",
      options: ["3 2 1 ", "3 ", "3 2 ", "Infinite Loop"],
      answer: 1,
      explanation: "The body prints 3 and decrements x to 2. The condition `x > 3` (2 > 3) is false, so it exits. The output is '3 '.",
      difficulty: "easy"
    },
    {
      id: "loop_while_8",
      type: "theory",
      question: "Which of the following data types is NOT allowed inside a while loop condition?",
      options: ["boolean", "int", "Boolean", "None of the above"],
      answer: 1,
      explanation: "In Java, loop conditions must return a boolean type. An `int` cannot be implicitly cast to boolean, which causes a compile-time error. C/C++ allow integers, but Java enforces strict type safety.",
      difficulty: "medium"
    },
    {
      id: "loop_while_9",
      type: "practical",
      question: "What is the outcome of compiling and running this code:\nfinal boolean RUN = true;\nwhile (RUN) {\n    // do work\n}\nSystem.out.println(\"Done\");?",
      options: [
        "Compiles successfully and runs",
        "Compilation Error: unreachable statement",
        "Enters an infinite loop and then prints Done",
        "Throws a RuntimeException"
      ],
      answer: 1,
      explanation: "Since `RUN` is a final compile-time constant of value true, the compiler determines the loop will never terminate, making the print statement after the loop unreachable. This causes a compile error.",
      difficulty: "hard"
    },
    {
      id: "loop_while_10",
      type: "practical",
      question: "What is the output of this code snippet?\nint x = 1;\nint y = 5;\nwhile (++x < --y) {\n    // empty\n}\nSystem.out.println(\"x=\" + x + \" y=\" + y);",
      options: ["x=2 y=4", "x=3 y=3", "x=3 y=4", "x=2 y=3"],
      answer: 1,
      explanation: "Step 1: x becomes 2, y becomes 4, 2 < 4 is true. Step 2: x becomes 3, y becomes 3, 3 < 3 is false, loop exits. The printed values are x=3, y=3.",
      difficulty: "medium"
    },
    {
      id: "loop_while_11",
      type: "practical",
      question: "What is the output of this loop containing a return statement?\npublic static int getValue() {\n    int x = 0;\n    while (x < 10) {\n        x++;\n        if (x == 2) return x;\n    }\n    return -1;\n}",
      options: ["10", "2", "-1", "1"],
      answer: 1,
      explanation: "The loop increments x. When x becomes 2, it returns x immediately, exiting both the loop and the method. The return value is 2.",
      difficulty: "easy"
    },
    {
      id: "loop_while_12",
      type: "theory",
      question: "Which loop structure is guaranteed to evaluate its condition at least once?",
      options: ["while loop", "do-while loop", "for loop", "enhanced for loop"],
      answer: 1,
      explanation: "The `do-while` loop executes its body statement block first before checking the loop condition, so the condition is evaluated at least once.",
      difficulty: "easy"
    },
    {
      id: "loop_while_13",
      type: "practical",
      question: "What is the output of the following code?\nint x = 0;\nwhile (x < 3)\n    x++;\n    System.out.print(x);",
      options: ["123", "3", "1", "0"],
      answer: 1,
      explanation: "Without curly braces, only the first statement `x++;` belongs to the while loop. `System.out.print(x);` is outside the loop and runs once after it terminates, printing 3.",
      difficulty: "medium"
    },
    {
      id: "loop_while_14",
      type: "practical",
      question: "What happens when compilation of this do-while loop is attempted:\ndo \n    int x = 10;\nwhile (x > 0);?",
      options: [
        "Compiles successfully and runs",
        "Compilation Error: variable declaration not allowed here without braces, and scope of x doesn't reach condition",
        "Enters an infinite loop",
        "Throws a NullPointerException"
      ],
      answer: 1,
      explanation: "A single statement inside a loop cannot be a variable declaration unless enclosed inside curly braces. Furthermore, the variable `x` is out-of-scope for the `while` condition check, failing compilation.",
      difficulty: "hard"
    },
    {
      id: "loop_while_15",
      type: "theory",
      question: "What does the compiler do to a loop like while (true)?",
      options: [
        "Replaces it with a do-while loop",
        "Optimizes it into an unconditional jump branch (infinite loop) in bytecode",
        "Throws a warning regarding performance",
        "Automatically inserts a break statement"
      ],
      answer: 1,
      explanation: "The compiler optimizes `while(true)` by translating it into an unconditional jump instruction directly in bytecode, avoiding redundant condition evaluation cycles.",
      difficulty: "medium"
    }
  ],
  day11_switch_case: [
    {
      id: "switch_1",
      type: "theory",
      question: "Which of the following types is NOT supported as a switch expression variable in Java 8?",
      options: ["char", "double", "String", "int"],
      answer: 1,
      explanation: "Java 8 switches support byte, short, char, int, String, and Enums. Floating-point types (float and double) and boolean are not permitted in switch statements.",
      difficulty: "easy"
    },
    {
      id: "switch_2",
      type: "practical",
      question: "What is the output of the following switch case code snippet?\nint x = 2;\nswitch (x) {\n    case 1: System.out.print(\"1 \");\n    case 2: System.out.print(\"2 \");\n    case 3: System.out.print(\"3 \");\n    default: System.out.print(\"Def\");\n}",
      options: ["2 ", "2 3 Def", "2 Def", "Compilation Error"],
      answer: 1,
      explanation: "Since there are no `break` statements, once case 2 matches, execution falls through all subsequent blocks (case 3 and default), printing '2 3 Def'.",
      difficulty: "medium"
    },
    {
      id: "switch_3",
      type: "theory",
      question: "What happens when compilation of this switch code is attempted:\nint x = 10;\nswitch (x) {\n    case 10: System.out.println(\"A\");\n    case 10: System.out.println(\"B\");\n}?",
      options: [
        "Compiles successfully",
        "Compilation Error: duplicate case label (if second case is uncommented)",
        "Throws an IllegalArgumentException",
        "Compilation Error: default block required"
      ],
      answer: 1,
      explanation: "A switch statement cannot contain duplicate case labels. The compiler checks that all case values are unique; having two `case 10:` statements triggers a compilation error.",
      difficulty: "easy"
    },
    {
      id: "switch_4",
      type: "practical",
      question: "What is the output of the following code involving a String switch?\nString key = \"B\";\nswitch (key) {\n    case \"a\": System.out.print(\"a\"); break;\n    case \"B\": System.out.print(\"B\"); break;\n    default: System.out.print(\"def\");\n}",
      options: ["def", "B", "b", "Compilation Error"],
      answer: 1,
      explanation: "String switches are case-sensitive. The input 'B' matches the exact case 'B' label, executing the print and break statements, outputting 'B'.",
      difficulty: "easy"
    },
    {
      id: "switch_5",
      type: "practical",
      question: "What is the outcome of compiling and running this switch statement with null reference:\nString key = null;\nswitch (key) {\n    case \"null\": System.out.println(\"String null\"); break;\n    default: System.out.println(\"Default\");\n}?",
      options: [
        "Prints Default",
        "Throws NullPointerException at runtime",
        "Compilation Error",
        "Prints null"
      ],
      answer: 1,
      explanation: "The switch variable expression is evaluated first. If the resulting reference is `null`, a `NullPointerException` is thrown at runtime before checking any case labels.",
      difficulty: "hard"
    },
    {
      id: "switch_6",
      type: "practical",
      question: "What is the output of this switch statement with a char type?\nchar grade = 'B';\nswitch (grade) {\n    case 'A': System.out.print(\"A\");\n    default: System.out.print(\"Default \");\n    case 'B': System.out.print(\"B \");\n}",
      options: ["Default B ", "B ", "Default ", "B Default "],
      answer: 1,
      explanation: "Java jumps to the matching case label `case 'B'`, printing 'B '. Since it is the last case block, execution completes. The default block is bypassed entirely because a matching case was found.",
      difficulty: "hard"
    },
    {
      id: "switch_7",
      type: "theory",
      question: "What is the compiler rule regarding the type of a case label value in a switch statement?",
      options: [
        "It can be any runtime variable expression",
        "It must be a compile-time constant expression or final literal compatible with the switch variable type",
        "It must be an object type",
        "It must be a boolean comparison expression"
      ],
      answer: 1,
      explanation: "Case labels must be compile-time constants (such as final variables or literals). The compiler needs these values to generate a jump table (tableswitch/lookupswitch) in bytecode.",
      difficulty: "medium"
    },
    {
      id: "switch_8",
      type: "practical",
      question: "What happens when compilation of this switch code is attempted:\nbyte b = 10;\nswitch (b) {\n    case 100: System.out.println(\"100\"); break;\n    case 200: System.out.println(\"200\"); break;\n}?",
      options: [
        "Compiles successfully and runs",
        "Compilation Error: case value 200 exceeds the range of byte type (-128 to 127)",
        "Compiles but throws a ClassCastException at runtime",
        "Automatically casts 200 to byte value -56"
      ],
      answer: 1,
      explanation: "The case labels must be compatible with the type of the switch variable. Since 200 exceeds the maximum value of a signed byte (127), it causes a compile-time conversion overflow error.",
      difficulty: "hard"
    },
    {
      id: "switch_9",
      type: "theory",
      question: "What is the syntax for the new arrow -> switch rules introduced in Java 14?",
      options: [
        "It allows returning multiple values from a single case",
        "It executes the expression or block to the right of the arrow without requiring a break statement (no fall-through)",
        "It converts the switch statement into a lambda function",
        "It is only compatible with abstract classes"
      ],
      answer: 1,
      explanation: "Java 14 introduced the `case L ->` syntax, which prevents fall-through behavior. Only the code block or expression to the right of the arrow executes, removing the need for `break`.",
      difficulty: "medium"
    },
    {
      id: "switch_10",
      type: "theory",
      question: "In the new Java 14 switch expression block, which keyword is used to return a value from a multi-line case block?",
      options: ["return", "yield", "break", "output"],
      answer: 1,
      explanation: "Inside the arrow or colon case block of a switch expression, the `yield` keyword is used to return a value back to the receiving variable, distinguishing it from standard method `return` statements.",
      difficulty: "medium"
    },
    {
      id: "switch_11",
      type: "practical",
      question: "What is the output of the following switch code?\nint x = 1;\nswitch (x) {\n    default: System.out.print(\"Default \");\n    case 2: System.out.print(\"2 \");\n}",
      options: ["Default ", "Default 2 ", "2 ", "Compilation Error: default block must be last"],
      answer: 1,
      explanation: "Since x is 1 and no case labels match, the execution jumps to the `default` block, printing 'Default '. Because there is no break, it falls through to print '2 '.",
      difficulty: "hard"
    },
    {
      id: "switch_12",
      type: "theory",
      question: "Which of the following is true when using Enums in a switch statement?",
      options: [
        "The case label must include the enum class name prefix (e.g. case MyEnum.VALUE:)",
        "The case label must only specify the enum constant name (e.g. case VALUE:)",
        "Enums are only supported in switch expressions from Java 17 onwards",
        "Enums must be cast to integer values first"
      ],
      answer: 1,
      explanation: "When switching on an Enum type, case labels must omit the Enum prefix name. The compiler automatically infers the scope from the switch variable type.",
      difficulty: "medium"
    },
    {
      id: "switch_13",
      type: "practical",
      question: "What happens when compilation of this code is attempted:\nint x = 5;\nfinal int A = 1;\nint B = 2;\nswitch (x) {\n    case A: System.out.print(\"A\"); break;\n    case B: System.out.print(\"B\"); break;\n}?",
      options: [
        "Compiles successfully",
        "Compilation Error: case label must be a constant expression (variable B is not final)",
        "Throws a runtime NullPointerException",
        "Runs but matches nothing"
      ],
      answer: 1,
      explanation: "All case labels must be compile-time constants. While `A` is final and constant, `B` is a standard mutable local variable, causing a compile error.",
      difficulty: "medium"
    },
    {
      id: "switch_14",
      type: "practical",
      question: "What is the output of the following switch code?\nint x = 5;\nswitch (x) {}\nSystem.out.println(\"Done\");",
      options: ["Compilation Error: switch statement cannot be empty", "Done", "Throws a RuntimeException on execution", "NullPointerException"],
      answer: 1,
      explanation: "Java allows empty switch blocks. The compiler validates the statement but generates no jump targets, printing 'Done'.",
      difficulty: "medium"
    },
    {
      id: "switch_15",
      type: "theory",
      question: "Why must a switch expression (which returns a value) be exhaustive?",
      options: [
        "To prevent memory leaks in Metaspace",
        "To guarantee that a value is returned for all possible input values, compile-time error occurs if cases are missing and no default is defined",
        "To enable fast JIT compiler loops",
        "To satisfy inheritance structure checks"
      ],
      answer: 1,
      explanation: "Unlike switch statements, switch expressions must return a value. If any possible input type is not covered by a case label and there is no `default` block, the compiler throws an error.",
      difficulty: "hard"
    }
  ],
  day8_class_object: [
    {
      id: "co_1",
      type: "theory",
      question: "What is the relation between a Class and an Object in Java?",
      options: [
        "A class is an instance of an object.",
        "A class is a blueprint/template that defines the state and behavior of objects, while an object is a runtime instance of a class.",
        "They are identical terms in Java.",
        "Objects are defined at compile-time; classes are defined at runtime."
      ],
      answer: 1,
      explanation: "A class is a template defining the structure (fields) and behavior (methods) of objects. An object is a concrete, runtime instance of a class allocated in memory.",
      difficulty: "easy"
    },
    {
      id: "co_2",
      type: "theory",
      question: "Which root class in Java serves as the ultimate parent of all classes, either directly or indirectly?",
      options: [
        "java.lang.Class",
        "java.lang.Object",
        "java.lang.System",
        "java.lang.Root"
      ],
      answer: 1,
      explanation: "`java.lang.Object` is the root of the Java class hierarchy. Every class implicitly extends `Object` if no explicit parent class is declared.",
      difficulty: "easy"
    },
    {
      id: "co_3",
      type: "practical",
      question: "What is the memory allocation behavior for classes and objects in Java?",
      options: [
        "Classes and objects are allocated in stack memory.",
        "Class metadata is stored in the Method Area, and object instances are allocated on the Heap Area using the 'new' keyword.",
        "Objects are allocated on the Stack Area for speed.",
        "JVM registers store object instance fields."
      ],
      answer: 1,
      explanation: "Class structures and static data reside in the Method Area (Metaspace). When `new` is called, the JVM allocates memory for the new object instance on the Heap, returning a reference address.",
      difficulty: "medium"
    },
    {
      id: "co_4",
      type: "theory",
      question: "What does the default implementation of the Object.toString() method return?",
      options: [
        "A JSON representation of the object fields.",
        "The class name, followed by an '@' symbol and the unsigned hexadecimal representation of the object's hash code.",
        "An empty string.",
        "The values of all instance variables concatenated."
      ],
      answer: 1,
      explanation: "The default `Object.toString()` returns: `getClass().getName() + '@' + Integer.toHexString(hashCode())`. Custom classes override this to return readable summaries.",
      difficulty: "medium"
    },
    {
      id: "co_5",
      type: "practical",
      question: "What is the printed result of comparing these two objects using '==' in Java?",
      code: `Object o1 = new Object();
Object o2 = new Object();
System.out.println(o1 == o2);`,
      options: [
        "true",
        "false",
        "Compilation fails",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "The `==` operator compares object references (memory addresses). Since `o1` and `o2` are distinct objects allocated in the heap, they have different addresses, printing `false`.",
      difficulty: "easy"
    },
    {
      id: "co_6",
      type: "theory",
      question: "How does the default implementation of Object.equals() compare objects?",
      options: [
        "It performs a field-by-field value comparison.",
        "It compares reference equality (==), returning true only if both references point to the exact same object in memory.",
        "It compares class metadata structures.",
        "It parses objects to strings and compares their lengths."
      ],
      answer: 1,
      explanation: "In `java.lang.Object`, the `equals(Object obj)` method checks reference equality using `this == obj`. Subclasses override this to implement custom value-based equality.",
      difficulty: "medium"
    },
    {
      id: "co_7",
      type: "theory",
      question: "What is the contract between the hashCode() and equals() methods in Java Object class?",
      options: [
        "If two objects are equal according to equals(), they must produce different hashCodes.",
        "If two objects are equal according to equals(), they must return the same hashCode value.",
        "Objects with the same hashCode must be equal according to equals().",
        "hashCode and equals are independent and do not share any contract."
      ],
      answer: 1,
      explanation: "The hash contract states: if `o1.equals(o2)` is true, then `o1.hashCode() == o2.hashCode()` must be true. The reverse is not required (different objects can share hash values, known as collisions).",
      difficulty: "hard"
    },
    {
      id: "co_8",
      type: "practical",
      question: "What is the printed result of evaluating this object field access code?",
      code: `class Value {
    int num = 10;
}
// Main
Value v1 = new Value();
Value v2 = v1;
v2.num = 50;
System.out.println(v1.num);`,
      options: [
        "10",
        "50",
        "0",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "Assigning `v2 = v1` copies the reference pointer, so both variables point to the same heap object. Modifying `v2.num` updates this shared object, and `v1.num` reflects the change, printing 50.",
      difficulty: "medium"
    },
    {
      id: "co_9",
      type: "theory",
      question: "What does the Object.clone() method accomplish, and what interface must a class implement to use it?",
      options: [
        "It performs deep serialization; requires Serializable interface.",
        "It creates a field-by-field copy (shallow copy) of the object; requires Cloneable interface.",
        "It compiles bytecode at runtime; requires Compiler interface.",
        "It deletes objects from heap; requires Autocloseable interface."
      ],
      answer: 1,
      explanation: "`Object.clone()` performs a shallow copy of the object. The class must implement the `Cloneable` marker interface, otherwise calling `clone()` throws a `CloneNotSupportedException`.",
      difficulty: "hard"
    },
    {
      id: "co_10",
      type: "practical",
      question: "Which of the following is true about static classes in Java?",
      options: [
        "Top-level outer classes can be declared static.",
        "Only nested inner classes can be declared static (Static Nested Classes), and they do not hold an implicit reference to their outer class instance.",
        "Static classes cannot contain instance methods.",
        "They are instantiated automatically when the JVM starts."
      ],
      answer: 1,
      explanation: "Top-level classes cannot be static. Only nested classes can use the `static` modifier. A static nested class behaves like a top-level class packaged inside another, meaning it does not hold a reference to the enclosing class's instance.",
      difficulty: "hard"
    },
    {
      id: "co_11",
      type: "theory",
      question: "What is the purpose of the Object.finalize() method (deprecated in Java 9+)?",
      options: [
        "To compile the class at execution finish.",
        "To perform cleanup operations on an object before it is garbage collected.",
        "To seal the class hierarchy.",
        "To copy object structures."
      ],
      answer: 1,
      explanation: "`finalize()` was designed to run cleanup code before garbage collection. It was deprecated due to performance issues, resource leaks, and lack of run guarantees, replaced by `AutoCloseable`.",
      difficulty: "medium"
    },
    {
      id: "co_12",
      type: "practical",
      question: "What is the printed result of comparing two string objects created using distinct instantiation styles?",
      code: `String s1 = "Hello";
String s2 = new String("Hello");
System.out.println((s1 == s2) + " " + s1.equals(s2));`,
      options: [
        "true true",
        "false false",
        "false true",
        "true false"
      ],
      answer: 2,
      explanation: "`s1` points to the String constant pool. `s2` is created on the heap. Since they are different object references, `s1 == s2` is `false`. However, `.equals()` compares their characters, returning `true`.",
      difficulty: "medium"
    },
    {
      id: "co_13",
      type: "theory",
      question: "What type of class is a 'Utility Class' (like java.lang.Math)?",
      options: [
        "A class with only private instance variables.",
        "A class that cannot be instantiated, has a private constructor, and contains only static methods and final constant fields.",
        "A class representing hardware peripherals.",
        "An abstract class that has no concrete subclasses."
      ],
      answer: 1,
      explanation: "Utility classes pack related static operations (e.g. Math, Arrays). They use private constructors to prevent instantiation and are declared `final` to prevent subclassing.",
      difficulty: "medium"
    },
    {
      id: "co_14",
      type: "practical",
      question: "What is the output of checking the class type using instanceof in Java?",
      code: `String str = "Hello";
System.out.println((str instanceof Object) + " " + (null instanceof Object));`,
      options: [
        "true true",
        "true false",
        "false false",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "`instanceof` returns `true` if the object is an instance of the class or subclass. Since `String` extends `Object`, `str instanceof Object` is true. `null` is not an instance of any class, so `null instanceof Object` is false.",
      difficulty: "medium"
    },
    {
      id: "co_15",
      type: "theory",
      question: "Which of the following is true about Java Records (introduced in Java 16) as data carrier classes?",
      options: [
        "They allow mutability of their fields after construction.",
        "They are implicitly final, immutable classes that automatically generate constructors, accessors, equals(), hashCode(), and toString() from their header components.",
        "They cannot implement interfaces.",
        "They can extend other classes."
      ],
      answer: 1,
      explanation: "Java Records are transparent data carriers. They are implicitly final and cannot extend other classes. The compiler generates all boilerplate (equals, hash, toString, getters) automatically, enforcing immutability.",
      difficulty: "hard"
    }
  ],
  day9_inheritance: [
    {
      id: "inh_1",
      type: "theory",
      question: "Which keyword is used by a subclass to inherit attributes and methods from a parent class in Java?",
      options: [
        "implements",
        "extends",
        "inherits",
        "super"
      ],
      answer: 1,
      explanation: "The `extends` keyword is used in class declarations to establish an inheritance relationship with a parent class. `implements` is used to implement interfaces.",
      difficulty: "easy"
    },
    {
      id: "inh_2",
      type: "theory",
      question: "Why does Java NOT support multiple inheritance of classes (e.g. class C extends A, B)?",
      options: [
        "To prevent compilation speed delays.",
        "To avoid complexity and ambiguity issues like the 'Diamond Problem' (where name conflicts occur if both parents define a method with the same signature).",
        "Because interfaces handle all class behaviors.",
        "To restrict memory footprint sizes."
      ],
      answer: 1,
      explanation: "If C extends A and B, and both A and B implement `run()`, C would inherit conflicting methods. To prevent this 'Diamond Problem', Java limits classes to single inheritance of state, while allowing multiple inheritance of behavior via interfaces.",
      difficulty: "medium"
    },
    {
      id: "inh_3",
      type: "practical",
      question: "What is the output of compiling and executing this inheritance code?",
      code: `class Parent {
    void show() { System.out.print("Parent "); }
}
class Child extends Parent {
    void show() { System.out.print("Child "); }
}
// Main
Parent p = new Child();
p.show();`,
      options: [
        "Parent ",
        "Child ",
        "Compilation Error: Type mismatch.",
        "Parent Child"
      ],
      answer: 1,
      explanation: "This is runtime polymorphism (dynamic method dispatch). The variable type is `Parent`, but the actual object is `Child`. Java resolves the method call at runtime based on the actual object, printing 'Child '.",
      difficulty: "medium"
    },
    {
      id: "inh_4",
      type: "practical",
      question: "Why does the following method override in the subclass fail to compile?",
      code: `class Parent {
    void show() {}
}
class Child extends Parent {
    private void show() {} // Overriding method
}`,
      options: [
        "Overridden methods cannot be private.",
        "The subclass method cannot reduce the access visibility of the parent class method (e.g. from package-private to private).",
        "Overriding requires public classes.",
        "They must have different return types."
      ],
      answer: 1,
      explanation: "An overriding method cannot assign weaker access privileges than the overridden parent method. Since the parent `show()` has default (package-private) visibility, making it `private` in the subclass is invalid.",
      difficulty: "hard"
    },
    {
      id: "inh_5",
      type: "theory",
      question: "What is the role of the 'super' keyword in Java inheritance?",
      options: [
        "It establishes inheritance boundaries.",
        "It acts as a reference variable to invoke immediate parent class constructors, methods, or variables.",
        "It is used to load class files into memory.",
        "It terminates class hierarchies."
      ],
      answer: 1,
      explanation: "The `super` keyword is a reference to the immediate parent class, used to call overridden parent methods (`super.show()`) or chain constructors (`super(...)`).",
      difficulty: "easy"
    },
    {
      id: "inh_6",
      type: "practical",
      question: "What is the printed result of evaluating this inherited variable access?",
      code: `class Parent {
    int val = 10;
}
class Child extends Parent {
    int val = 20;
}
// Main
Parent p = new Child();
System.out.println(p.val);`,
      options: [
        "10",
        "20",
        "Compilation Error",
        "0"
      ],
      answer: 0,
      explanation: "In Java, instance variables are NOT polymorphic; they are determined at compile-time based on the reference type. Since `p` is declared as `Parent`, `p.val` refers to the parent's field, printing 10.",
      difficulty: "hard"
    },
    {
      id: "inh_7",
      type: "theory",
      question: "Which classes cannot be extended in Java?",
      options: [
        "Abstract classes",
        "Final classes",
        "Interface classes",
        "Static classes"
      ],
      answer: 1,
      explanation: "Classes declared with the `final` modifier (like `java.lang.String`) cannot be subclassed or extended.",
      difficulty: "easy"
    },
    {
      id: "inh_8",
      type: "practical",
      question: "What occurs when overriding a method that throws a checked exception?",
      options: [
        "The overriding method can throw any checked exception.",
        "The overriding subclass method cannot declare broader checked exceptions than the parent method, but it can throw narrower exceptions, runtime exceptions, or none.",
        "The subclass method must throw identical exceptions.",
        "Checked exceptions prevent method overriding."
      ],
      answer: 1,
      explanation: "To maintain polymorphic call safety, an overriding method can only declare the same or narrower checked exceptions (subclasses) than the parent method, or no exceptions at all. It can declare any runtime exceptions.",
      difficulty: "hard"
    },
    {
      id: "inh_9",
      type: "theory",
      question: "What is the difference between Method Overloading and Method Overriding?",
      options: [
        "Overloading is dynamic binding; Overriding is static binding.",
        "Overloading occurs within the same class (same name, different arguments); Overriding occurs between parent/child classes (same name, same arguments) to redefine behavior.",
        "They are identical concepts.",
        "Overloading requires abstract classes; Overriding requires interfaces."
      ],
      answer: 1,
      explanation: "Overloading (compile-time polymorphism) defines multiple methods with the same name but different parameters in the same class. Overriding (runtime polymorphism) lets a subclass redefine a parent method's behavior.",
      difficulty: "medium"
    },
    {
      id: "inh_10",
      type: "practical",
      question: "What is the output of compiling this interface implementation class?",
      code: `interface A {
    default void run() { System.out.print("A"); }
}
interface B {
    default void run() { System.out.print("B"); }
}
class C implements A, B {}`,
      options: [
        "Compiles successfully and inherits A's run.",
        "Compilation Error: Class C inherits unrelated defaults for run() from types A and B.",
        "Compiles and prints AB.",
        "Throws runtime interface binding error."
      ],
      answer: 1,
      explanation: "Because both A and B define a default method `run()`, class C inherits conflicting implementations. This Diamond Problem requires C to override `run()` and specify which interface method to run (`A.super.run()`).",
      difficulty: "hard"
    },
    {
      id: "inh_11",
      type: "theory",
      question: "Which of the following is true about abstract methods in inheritance?",
      options: [
        "They must contain a default block body.",
        "The first concrete (non-abstract) subclass that extends the abstract class must implement all inherited abstract methods.",
        "They cannot be declared public.",
        "They must be defined inside final classes."
      ],
      answer: 1,
      explanation: "Abstract methods have no body. Subclasses must implement them unless the subclass itself is also declared abstract.",
      difficulty: "medium"
    },
    {
      id: "inh_12",
      type: "practical",
      question: "Can you call a parent constructor from a subclass constructor after printing a message?",
      code: `Child() {
    System.out.print("Start ");
    super();
}`,
      options: [
        "Yes, it compiles fine.",
        "Compilation Error: Constructor call to super must be the first statement in constructor.",
        "Yes, if the parent class has a default constructor.",
        "Only if the subclass is final."
      ],
      answer: 1,
      explanation: "The `super()` constructor invocation must be the absolute first statement in the constructor, otherwise a compilation error occurs.",
      difficulty: "medium"
    },
    {
      id: "inh_13",
      type: "practical",
      question: "What is the printed result of invoking this constructor execution chain?",
      code: `class Parent {
    Parent() { System.out.print("Parent "); }
}
class Child extends Parent {
    Child(int x) { System.out.print("Child "); }
}
// Main
new Child(10);`,
      options: [
        "Child ",
        "Parent Child ",
        "Child Parent ",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "The subclass constructor `Child(int)` implicitly calls `super()` as its first statement. Therefore, `Parent`'s constructor executes first, printing 'Parent ', then 'Child '.",
      difficulty: "medium"
    },
    {
      id: "inh_14",
      type: "theory",
      question: "In Java 17+, how do Sealed Classes restrict class inheritance?",
      options: [
        "By encrypting the subclass definitions.",
        "By explicitly listing permitted subclasses using the 'permits' keyword, preventing other classes from extending them.",
        "By enforcing all subclasses to be final interfaces.",
        "By disabling constructors in subclasses."
      ],
      answer: 1,
      explanation: "Sealed classes (and interfaces) restrict the inheritance hierarchy. You declare a class `sealed` and use `permits SubclassA, SubclassB` to control which classes can extend it.",
      difficulty: "hard"
    },
    {
      id: "inh_15",
      type: "practical",
      question: "Can private methods of a parent class be overridden by a subclass?",
      options: [
        "Yes, if the overriding method is public.",
        "No, private methods are not visible to subclasses and cannot be overridden; declaring a method with the same signature in a subclass is a new, independent method.",
        "Yes, using the @Override annotation.",
        "Only if both classes reside in the same package."
      ],
      answer: 1,
      explanation: "Private methods are hidden within the declaring class. They are not visible to subclasses, so overriding is impossible. Declaring a matching signature in a subclass simply creates a new method.",
      difficulty: "medium"
    }
  ],
  day10_typecasting: [
    {
      id: "tc_1",
      type: "theory",
      question: "What is typecasting in Java?",
      options: [
        "Converting a program file to another language.",
        "The process of converting a value of one data type into another data type.",
        "Binding classes to interfaces.",
        "Creating dynamic arrays."
      ],
      answer: 1,
      explanation: "Typecasting is converting a variable from one data type (primitive or reference) to another.",
      difficulty: "easy"
    },
    {
      id: "tc_2",
      type: "theory",
      question: "What is the difference between upcasting and downcasting in object reference typecasting?",
      options: [
        "Upcasting is unsafe; downcasting is automatic.",
        "Upcasting casting a subclass reference to a parent class type is automatic and safe. Downcasting casting a parent reference back to a subclass is unsafe and requires an explicit cast.",
        "Both require explicit casting at all times.",
        "Java does not support downcasting of objects."
      ],
      answer: 1,
      explanation: "Upcasting goes up the inheritance tree (e.g. `Object obj = new String()`) and is safe and automatic. Downcasting goes down the tree (e.g. `String str = (String) obj`) and is risky, requiring an explicit cast because the object type must match.",
      difficulty: "medium"
    },
    {
      id: "tc_3",
      type: "practical",
      question: "What happens when you execute this downcasting snippet?",
      code: `Object obj = new Integer(10);
String str = (String) obj;`,
      options: [
        "It compiles and runs successfully.",
        "Compilation Error: Incompatible types.",
        "Throws ClassCastException at runtime.",
        "The variable str becomes null."
      ],
      answer: 2,
      explanation: "The compiler allows the downcast `(String) obj` because `obj` is declared as `Object` and could refer to a String. However, at runtime, the JVM checks the actual object type (Integer), determines it cannot be cast to String, and throws a `ClassCastException`.",
      difficulty: "medium"
    },
    {
      id: "tc_4",
      type: "practical",
      question: "What is the printed result of this narrowing primitive cast?",
      code: `int val = 130;
byte b = (byte) val;
System.out.println(b);`,
      options: [
        "130",
        "Compilation Error",
        "-126",
        "127"
      ],
      answer: 2,
      explanation: "A byte holds values from -128 to 127. 130 in binary is `00000000 10000010`. Casting to a byte truncates it to 8 bits: `10000010`. In two's complement, the sign bit is 1, representing -126.",
      difficulty: "hard"
    },
    {
      id: "tc_5",
      type: "theory",
      question: "Which operator is used to verify if an object reference can be cast to a target type before executing a cast?",
      options: [
        "isinstance",
        "instanceof",
        "typeof",
        "castcheck"
      ],
      answer: 1,
      explanation: "The `instanceof` operator checks if an object is an instance of a class, subclass, or interface. This lets developers guard downcasts to prevent `ClassCastException`.",
      difficulty: "easy"
    },
    {
      id: "tc_6",
      type: "practical",
      question: "What is the result of executing this code featuring implicit primitive promotion?",
      code: `byte a = 10;
byte b = 20;
// byte c = a + b; // Line 3
int result = a + b;`,
      options: [
        "Compiles successfully.",
        "Compilation Error on Line 3 because arithmetic operations on byte/short promote them to int, requiring an explicit cast.",
        "Compilation Error on both lines.",
        "Throws RuntimeOverflowException"
      ],
      answer: 1,
      explanation: "In Java, binary arithmetic operations on byte, short, or char types promote them to `int` automatically. Hence, `a + b` yields an `int` value. Assigning it to `byte c` fails compilation without an explicit cast `(byte)(a+b)`.",
      difficulty: "hard"
    },
    {
      id: "tc_7",
      type: "practical",
      question: "What is the output of compiling and executing this inheritance casting structure?",
      code: `class Parent {}
class Child extends Parent {}
// Main
Parent p = new Parent();
Child c = (Child) p;`,
      options: [
        "Compiles and runs fine.",
        "Compilation Error: Parent cannot be resolved to Child.",
        "Throws ClassCastException at runtime because a Parent instance is not a Child.",
        "Variable c holds a null pointer."
      ],
      answer: 2,
      explanation: "Downcasting is only valid if the underlying object instance is actually of the target subclass (or a child of it). Here, `p` points to a raw `Parent` instance, which is not a `Child`. This throws a `ClassCastException` at runtime.",
      difficulty: "hard"
    },
    {
      id: "tc_8",
      type: "theory",
      question: "What is the new feature called Pattern Matching for instanceof introduced in Java 16?",
      options: [
        "It compiles regex patterns inside cast expressions.",
        "It combines the type check and casting step into a single operation, declaring a pattern variable if the check succeeds (e.g., if (obj instanceof String s)).",
        "It automatically serializes matching object structures.",
        "It converts all matching references to static classes."
      ],
      answer: 1,
      explanation: "Pattern matching for `instanceof` simplifies code: `if (obj instanceof String s)` checks the type and automatically binds the casted value to variable `s` within the block, eliminating explicit casting boilerplate.",
      difficulty: "hard"
    },
    {
      id: "tc_9",
      type: "practical",
      question: "What is the print result of this character typecast?",
      code: `double d = 65.99;
char ch = (char) d;
System.out.println(ch);`,
      options: [
        "A",
        "65",
        "Compilation Error",
        "B"
      ],
      answer: 0,
      explanation: "Casting `double` to `char` first truncates the fractional part, yielding `65`. The integer value `65` maps to the Unicode character `'A'`. Hence, it prints 'A'.",
      difficulty: "medium"
    },
    {
      id: "tc_10",
      type: "practical",
      question: "Why does the compiler reject this cast expression?",
      code: `String str = "Java";
Integer num = (Integer) str;`,
      options: [
        "String is final.",
        "The compiler knows that String and Integer are in unrelated class hierarchies, so they can never be cast to one another.",
        "They have different memory offsets.",
        "Only primitives support casting."
      ],
      answer: 1,
      explanation: "For reference types, casting is only permitted between classes in the same inheritance tree. String and Integer are unrelated classes, so the compiler rejects the cast immediately.",
      difficulty: "hard"
    },
    {
      id: "tc_11",
      type: "practical",
      question: "What is the printed result of this floating-point promotion?",
      code: `int x = 7;
float y = 2.0f;
System.out.println(x / y);`,
      options: [
        "3",
        "3.5",
        "3.0",
        "Compilation fails"
      ],
      answer: 1,
      explanation: "If either operand in a division is floating-point, Java promotes the other operand to floating-point. `x` is promoted to `7.0f`, resulting in `3.5`.",
      difficulty: "easy"
    },
    {
      id: "tc_12",
      type: "theory",
      question: "Which casting occurs when passing a subclass argument to a method that accepts a parent class type?",
      options: [
        "Narrowing cast",
        "Upcasting (automatic promotion)",
        "Downcasting (requires cast operator)",
        "Explicit coercion"
      ],
      answer: 1,
      explanation: "Passing a subclass object to a method expecting a parent type is Upcasting, which is handled automatically by the compiler.",
      difficulty: "easy"
    },
    {
      id: "tc_13",
      type: "practical",
      question: "What is the output of the following cast evaluation?",
      code: `long largeVal = 2147483648L;
int intVal = (int) largeVal;
System.out.println(intVal);`,
      options: [
        "2147483648",
        "-2147483648",
        "Compilation Error",
        "0"
      ],
      answer: 1,
      explanation: "The value `2147483648L` in binary requires 33 bits: `0 10000000 00000000 00000000 00000000`. Casting to `int` takes the lowest 32 bits, which is `10000000 00000000 00000000 00000000`. In signed 32-bit two's complement, this represents `-2147483648`.",
      difficulty: "hard"
    },
    {
      id: "tc_14",
      type: "theory",
      question: "Which of the following describes the performance cost of reference typecasting in Java?",
      options: [
        "Upcasting has high runtime performance costs.",
        "Typecasting has zero cost because it is only compile-time metadata checking.",
        "Downcasting performs a runtime type check (checking the object header RTTI), which has a small performance cost.",
        "Casting consumes memory heaps."
      ],
      answer: 2,
      explanation: "Upcasting has zero runtime cost. Downcasting requires a runtime check against the object's class metadata to verify the cast is valid, introducing a minor performance overhead.",
      difficulty: "hard"
    },
    {
      id: "tc_15",
      type: "practical",
      question: "What is the compiled outcome of executing this code featuring interface casts?",
      code: `interface Runnable {}
class Task {}
// Main:
Task t = new Task();
Runnable r = (Runnable) t;`,
      options: [
        "Compilation Error: Task does not implement Runnable.",
        "Compiles successfully, but throws ClassCastException at runtime.",
        "Compiles and runs fine without error.",
        "Throws interface not found exception."
      ],
      answer: 1,
      explanation: "For classes, casting between unrelated types is a compile error. However, for interfaces, the compiler allows casting any non-final class to any interface because a subclass of `Task` might implement `Runnable`. At runtime, the check fails, throwing a `ClassCastException`.",
      difficulty: "hard"
    }
  ],
  day11_wrapper: [
    {
      id: "wrap_1",
      type: "theory",
      question: "What is the purpose of Wrapper Classes in Java?",
      options: [
        "To compile classes faster.",
        "To wrap primitive data types into object structures, allowing them to be used in Collections, Generics, and synchronization APIs.",
        "To compress source files.",
        "To encrypt variable data."
      ],
      answer: 1,
      explanation: "Java collections (like `ArrayList`) and generic structures only work with object references. Wrapper classes (Integer, Double, etc.) wrap primitives in objects, making them compatible with these APIs.",
      difficulty: "easy"
    },
    {
      id: "wrap_2",
      type: "theory",
      question: "What do Autoboxing and Unboxing mean in Java?",
      options: [
        "Converting files to ZIP archives.",
        "Autoboxing is the automatic conversion of a primitive to its corresponding wrapper object; Unboxing is the reverse conversion from object to primitive.",
        "Converting primitive types to string representations.",
        "Passing variables to remote JVM instances."
      ],
      answer: 1,
      explanation: "Java 5 introduced automatic boxing. Autoboxing converts a primitive (e.g. `int`) to its wrapper object (`Integer`). Unboxing extracts the primitive value (`int`) from the wrapper object.",
      difficulty: "medium"
    },
    {
      id: "wrap_3",
      type: "practical",
      question: "What is the printed result of compiling and running this wrapper comparison?",
      code: `Integer a = 100;
Integer b = 100;
Integer c = 200;
Integer d = 200;
System.out.println((a == b) + " " + (c == d));`,
      options: [
        "true true",
        "false false",
        "true false",
        "false true"
      ],
      answer: 2,
      explanation: "Java caches Integer objects between -128 and 127. When autoboxing `100`, the JVM returns the same cached reference, so `a == b` is `true`. `200` is outside this range, creating new objects with different references, so `c == d` is `false`.",
      difficulty: "hard"
    },
    {
      id: "wrap_4",
      type: "practical",
      question: "What occurs when the following unboxing code executes?",
      code: `Integer val = null;
int num = val;`,
      options: [
        "Compilation Error.",
        "num is initialized to 0.",
        "Throws NullPointerException at runtime.",
        "num becomes null."
      ],
      answer: 2,
      explanation: "Assigning `val` to `num` triggers unboxing, which internally calls `val.intValue()`. Since `val` is `null`, this call throws a `NullPointerException`.",
      difficulty: "medium"
    },
    {
      id: "wrap_5",
      type: "theory",
      question: "Which of the following wrapper classes are immutable in Java?",
      options: [
        "Only Integer and Double.",
        "All primitive wrapper classes are immutable (Integer, Double, Long, Float, Byte, Short, Character, Boolean).",
        "None, wrapper classes allow mutating internal value fields.",
        "Only final wrapper classes."
      ],
      answer: 1,
      explanation: "All primitive wrapper classes are immutable. Once created, their internal values cannot be modified.",
      difficulty: "medium"
    },
    {
      id: "wrap_6",
      type: "practical",
      question: "What is the output of the following Integer parse evaluation?",
      code: `String s = "123";
Integer val = Integer.valueOf(s);
int num = Integer.parseInt(s);
System.out.println(val.getClass().getSimpleName() + " " + num);`,
      options: [
        "Integer 123",
        "int 123",
        "Compilation Error",
        "NumberFormatException"
      ],
      answer: 0,
      explanation: "`Integer.valueOf(s)` parses a string and returns an `Integer` object wrapper (using the cache if applicable). `Integer.parseInt(s)` returns a primitive `int`. Accessing `getClass()` on wrapper returns `Integer`.",
      difficulty: "medium"
    },
    {
      id: "wrap_7",
      type: "practical",
      question: "Which of the following parses invalid formats throwing a NumberFormatException?",
      options: [
        "Integer.parseInt(\"100_000\")",
        "Integer.parseInt(\"123\")",
        "Integer.parseInt(\"-45\")",
        "Integer.parseInt(\"12.34\")"
      ],
      answer: 3,
      explanation: "`Integer.parseInt` expects a valid integer string. Floating-point strings (`12.34`) or strings containing underscores (`100_000`) throw a `NumberFormatException`.",
      difficulty: "hard"
    },
    {
      id: "wrap_8",
      type: "theory",
      question: "Which method in wrapper classes provides the binary string representation of an integer?",
      options: [
        "Integer.toBinaryString(int i)",
        "Integer.getBinary(int i)",
        "Integer.toString(int i, 2)",
        "Both A and C are correct."
      ],
      answer: 3,
      explanation: "Both `Integer.toBinaryString(i)` and `Integer.toString(i, 2)` (using radix 2) return the binary representation of an integer as a string.",
      difficulty: "hard"
    },
    {
      id: "wrap_9",
      type: "practical",
      question: "What is the output of evaluating this comparison involving double wrapper types?",
      code: `Double d1 = 10.0;
Double d2 = 10.0;
System.out.println(d1 == d2);`,
      options: [
        "true",
        "false",
        "Compilation Error",
        "Throws ArithmeticException"
      ],
      answer: 1,
      explanation: "Unlike `Integer`, the `Double` wrapper class does not cache values. Autoboxing `10.0` always creates new Double instances, so `d1 == d2` evaluates to `false`.",
      difficulty: "hard"
    },
    {
      id: "wrap_10",
      type: "theory",
      question: "What is the size footprint of a wrapper class object like Integer on a standard 64-bit JVM compared to primitive int?",
      options: [
        "They use the same amount of memory.",
        "A primitive int uses 4 bytes. An Integer object uses 16-24 bytes due to object header overhead (mark word, class word, alignment padding).",
        "An Integer object uses 64 bytes.",
        "Wrapper classes are optimized to 2 bytes."
      ],
      answer: 1,
      explanation: "Objects have a significant memory overhead. While primitive `int` uses 4 bytes on stack, an `Integer` object on heap requires 16-24 bytes (12-16 bytes for the header, 4 bytes for value, and padding), meaning primitives are preferred in hot loops.",
      difficulty: "hard"
    },
    {
      id: "wrap_11",
      type: "practical",
      question: "What is the result of applying ternary operators with mixed wrapper and primitive types?",
      code: `Integer val = 10;
Double d = 2.0;
Object result = (val > 5) ? val : d;
System.out.println(result.getClass().getSimpleName() + " " + result);`,
      options: [
        "Integer 10",
        "Double 10.0",
        "Compilation Error",
        "Double 2.0"
      ],
      answer: 1,
      explanation: "When evaluating ternary expressions with mixed numeric types, Java applies numeric promotion rules. The expressions are promoted to `double` (via autoboxing/unboxing), so `val` becomes `10.0` (Double).",
      difficulty: "hard"
    },
    {
      id: "wrap_12",
      type: "theory",
      question: "Which of the following wrapper classes caches its values for the entire range of its possible values?",
      options: [
        "Integer",
        "Boolean and Byte",
        "Character",
        "Double"
      ],
      answer: 1,
      explanation: "`Boolean` only has two values (`TRUE`, `FALSE`), which are cached. `Byte` has values from -128 to 127, all of which fit inside the caching range. Thus, both are fully cached.",
      difficulty: "hard"
    },
    {
      id: "wrap_13",
      type: "practical",
      question: "What is the printed result of comparing boolean wrapper constants?",
      code: `Boolean b1 = true;
Boolean b2 = Boolean.valueOf("true");
Boolean b3 = new Boolean(true);
System.out.println((b1 == b2) + " " + (b1 == b3));`,
      options: [
        "true true",
        "true false",
        "false false",
        "false true"
      ],
      answer: 1,
      explanation: "`b1` (autoboxed) and `b2` (`Boolean.valueOf`) share the cached `Boolean.TRUE` reference. `new Boolean(true)` creates a new object on the heap, bypassing the cache. Thus, `b1 == b2` is true, and `b1 == b3` is false.",
      difficulty: "medium"
    },
    {
      id: "wrap_14",
      type: "theory",
      question: "How do you configure the JVM Integer cache size manually?",
      options: [
        "It is fixed and cannot be changed.",
        "Using the system property flag: -XX:AutoBoxCacheMax=<size>",
        "Using -Xmx allocation adjustments.",
        "By modifying the java.lang.Integer source."
      ],
      answer: 1,
      explanation: "You can increase the maximum limit of the Integer cache (default 127) using the JVM flag `-XX:AutoBoxCacheMax=<size>`. The lower limit is fixed at -128.",
      difficulty: "hard"
    },
    {
      id: "wrap_15",
      type: "practical",
      question: "What occurs if you attempt to parse characters using Integer.parseInt?",
      code: `int x = Integer.parseInt("A");`,
      options: [
        "Compilation Error.",
        "Returns the ASCII value 65.",
        "Throws NumberFormatException at runtime.",
        "x becomes 0."
      ],
      answer: 2,
      explanation: "The character `'A'` is not a valid decimal integer, so `Integer.parseInt` throws a `NumberFormatException`.",
      difficulty: "easy"
    }
  ],
  day12_abstraction: [
    {
      id: "abs_1",
      type: "theory",
      question: "What is Abstraction in Java?",
      options: [
        "The process of hiding implementation details and showing only the essential features to the user.",
        "Hiding class variables using private modifiers.",
        "Compiling source files to bytecode.",
        "Executing program methods concurrently."
      ],
      answer: 0,
      explanation: "Abstraction is an OOP concept focused on exposing the interface of a component while hiding its complex details (implementation). Java achieves abstraction using Abstract Classes and Interfaces.",
      difficulty: "easy"
    },
    {
      id: "abs_2",
      type: "theory",
      question: "Which of the following is true about abstract classes in Java?",
      options: [
        "They can be instantiated using the 'new' keyword directly.",
        "They cannot be instantiated directly, but they can contain constructors, concrete methods, abstract methods, and instance variables.",
        "They must contain only abstract methods.",
        "They cannot contain static variables."
      ],
      answer: 1,
      explanation: "Abstract classes cannot be instantiated with `new`. However, they can define constructors, concrete methods, abstract methods, fields, and static components.",
      difficulty: "medium"
    },
    {
      id: "abs_3",
      type: "practical",
      question: "Why does the following abstract class definition fail compilation?",
      code: `public abstract class Vehicle {
    abstract void start() {}
}`,
      options: [
        "An abstract class cannot contain concrete code.",
        "Abstract methods must not define a body (curly braces {}).",
        "Vehicle should be declared as interface.",
        "Constructors are missing."
      ],
      answer: 1,
      explanation: "Abstract methods are declarations without implementations. Defining curly braces `{}` provides an empty body, which conflicts with the `abstract` modifier, causing a compilation error.",
      difficulty: "medium"
    },
    {
      id: "abs_4",
      type: "theory",
      question: "Can an abstract class be declared with the final modifier?",
      options: [
        "Yes, to protect it from modification.",
        "No, abstract classes are designed to be extended, and final classes cannot be extended, making their combination a compilation error.",
        "Only if all methods are final.",
        "Only if the class is package-private."
      ],
      answer: 1,
      explanation: "Abstract classes require subclassing to be useful, while `final` prevents subclassing. Combining them results in a compilation error: 'illegal combination of modifiers: abstract and final'.",
      difficulty: "medium"
    },
    {
      id: "abs_5",
      type: "practical",
      question: "What is the printed result of executing this polymorphic abstract call?",
      code: `abstract class Shape {
    abstract void draw();
}
class Circle extends Shape {
    void draw() { System.out.print("Circle "); }
}
// Main
Shape s = new Circle();
s.draw();`,
      options: [
        "Circle ",
        "Shape ",
        "Compilation Error: Shape cannot be instantiated.",
        "Throws NullPointerException"
      ],
      answer: 0,
      explanation: "Although `s` is declared as abstract type `Shape`, it holds a concrete `Circle` object. Invoking `s.draw()` executes the overridden `draw` method in `Circle`, printing 'Circle '.",
      difficulty: "medium"
    },
    {
      id: "abs_6",
      type: "theory",
      question: "What is the difference between achieving abstraction via Abstract Classes vs Interfaces (prior to Java 8)?",
      options: [
        "Abstract classes support multiple inheritance; interfaces do not.",
        "Abstract classes can define instance state (fields) and constructors, whereas interfaces could only declare public static final constants and abstract methods.",
        "Interfaces can instantiate objects; abstract classes cannot.",
        "Interfaces are slower at runtime."
      ],
      answer: 1,
      explanation: "Abstract classes represent a class hierarchy (is-a) and can maintain state (non-final instance fields) and constructors. Interfaces define behaviors (can-do) and could only declare public abstract methods and constants.",
      difficulty: "hard"
    },
    {
      id: "abs_7",
      type: "practical",
      question: "What is the output of compiling this class hierarchy?",
      code: `abstract class Base {
    abstract void show();
}
abstract class Sub extends Base {}`,
      options: [
        "Compilation Error: Sub must implement show().",
        "Compiles successfully because Sub is also abstract and does not need to implement inherited abstract methods.",
        "Compilation Error: Abstract classes cannot extend abstract classes.",
        "Throws runtime class link error."
      ],
      answer: 1,
      explanation: "An abstract class is not required to implement abstract methods inherited from its parent. The responsibility to implement them falls to the first concrete subclass that extends the hierarchy.",
      difficulty: "hard"
    },
    {
      id: "abs_8",
      type: "theory",
      question: "Can an abstract method be declared private?",
      options: [
        "Yes, to restrict implementation to nested classes.",
        "No, abstract methods must be visible to subclasses to be implemented, so declaring them private causes a compilation error.",
        "Only if the class is package-private.",
        "Abstract methods are private by default."
      ],
      answer: 1,
      explanation: "Private methods are hidden from subclasses. Since abstract methods must be overridden and implemented by subclasses, combining `private` and `abstract` is a compile error.",
      difficulty: "medium"
    },
    {
      id: "abs_9",
      type: "practical",
      question: "What occurs if you declare a concrete class containing an abstract method?",
      code: `class Test {
    abstract void run();
}`,
      options: [
        "The class compiles successfully.",
        "Compilation Error: The class Test must be declared abstract if it contains abstract methods.",
        "The method is ignored during compilation.",
        "Throws AbstractMethodError at runtime."
      ],
      answer: 1,
      explanation: "Any class that declares one or more abstract methods must be explicitly declared abstract, otherwise it fails to compile.",
      difficulty: "medium"
    },
    {
      id: "abs_10",
      type: "theory",
      question: "Which of the following is true about abstract class constructors?",
      options: [
        "Abstract classes do not have constructors.",
        "They have constructors that are called implicitly or explicitly by subclasses using super() to initialize abstract class state.",
        "Their constructors must be declared abstract.",
        "Constructors must be private."
      ],
      answer: 1,
      explanation: "Abstract classes have constructors, which are called by subclass constructors via `super()` to initialize base fields when subclass objects are instantiated.",
      difficulty: "medium"
    },
    {
      id: "abs_11",
      type: "practical",
      question: "Why does the compiler reject this abstract method modifier combo?",
      code: `abstract class Test {
    abstract static void run();
}`,
      options: [
        "Static methods cannot be overridden, whereas abstract methods require overriding, making this combination a compile-time error.",
        "Abstract methods must be public.",
        "Abstract classes cannot contain static methods.",
        "Abstract methods must throw exceptions."
      ],
      answer: 0,
      explanation: "Static methods belong to classes and cannot be overridden, whereas abstract methods require overriding to provide implementations. Therefore, `abstract static` is an invalid combination.",
      difficulty: "hard"
    },
    {
      id: "abs_12",
      type: "theory",
      question: "What is the key benefit of abstraction in software engineering?",
      options: [
        "It speeds up bytecode execution.",
        "It decouples code components: developers write code targeting abstract interfaces, allowing underlying implementations to change without affecting callers.",
        "It reduces compiler memory usage.",
        "It automates garbage collection."
      ],
      answer: 1,
      explanation: "Abstraction simplifies design and decouples code. Programmers code against abstract contracts, allowing implementation details to change without breaking dependent modules.",
      difficulty: "easy"
    },
    {
      id: "abs_13",
      type: "practical",
      question: "Can an abstract class define static methods with bodies?",
      options: [
        "No, abstract classes cannot contain any static elements.",
        "Yes, abstract classes can declare static methods with bodies, which are called using the class name.",
        "Only if the methods are final.",
        "Only if the class has zero fields."
      ],
      answer: 1,
      explanation: "Abstract classes can define static methods with implementations, which can be called directly without instantiation (e.g. `AbstractClass.myStaticMethod()`).",
      difficulty: "medium"
    },
    {
      id: "abs_14",
      type: "theory",
      question: "What level of abstraction does a Java interface represent starting from Java 8?",
      options: [
        "100% pure abstraction.",
        "Partial abstraction, because interfaces can now declare default methods and static methods with concrete bodies.",
        "No abstraction at all.",
        "Variable abstraction based on class linking."
      ],
      answer: 1,
      explanation: "Prior to Java 8, interfaces represented 100% pure abstraction. With the introduction of default and static methods in Java 8, interfaces can contain implementation code, representing partial abstraction.",
      difficulty: "hard"
    },
    {
      id: "abs_15",
      type: "practical",
      question: "What is the compiled output of this abstract implementation check?",
      code: `abstract class Parent {
    abstract void work();
}
class Child extends Parent {
    void work() { System.out.print("Work "); }
}`,
      options: [
        "Compiles successfully.",
        "Compilation Error: Override annotation is missing.",
        "Compilation Error: Parent constructor must be declared.",
        "Throws ClassNotFoundException."
      ],
      answer: 0,
      explanation: "The class compiles successfully. `Child` implements the abstract `work()` method. While `@Override` is recommended, it is not required for successful compilation.",
      difficulty: "easy"
    }
  ],
  day13_interface: [
    {
      id: "int_1",
      type: "theory",
      question: "What is an Interface in Java?",
      options: [
        "A class representing hardware interactions.",
        "A reference type containing method signatures, static constants, default methods, static methods, and private methods that classes implement to define behaviors.",
        "An abstract class that has only private fields.",
        "A package containing GUI design libraries."
      ],
      answer: 1,
      explanation: "An interface defines a behavior contract. Classes implement interfaces to guarantee they provide specific methods.",
      difficulty: "easy"
    },
    {
      id: "int_2",
      type: "theory",
      question: "Which modifier keywords are implicitly added to variables declared in an interface?",
      options: [
        "private static final",
        "public static final",
        "protected volatile",
        "No implicit keywords are added."
      ],
      answer: 1,
      explanation: "Every variable declared in an interface is implicitly `public static final` (a constant), even if you do not specify these keywords in the code.",
      difficulty: "easy"
    },
    {
      id: "int_3",
      type: "practical",
      question: "Why does the following interface method declaration fail compilation?",
      code: `interface Service {
    protected void run();
}`,
      options: [
        "Service must declare fields.",
        "Interface methods are implicitly public, and declaring them protected conflicts with this rule.",
        "Methods must have bodies.",
        "Service should be declared abstract."
      ],
      answer: 1,
      explanation: "Interface methods are implicitly `public` (except private methods introduced in Java 9). Declaring them `protected` or `private` (without a body) causes a compilation error.",
      difficulty: "medium"
    },
    {
      id: "int_4",
      type: "theory",
      question: "Which Java version introduced default methods in interfaces, and why?",
      options: [
        "Java 5, to support autoboxing.",
        "Java 8, to allow adding new methods to interfaces without breaking existing classes that implement them.",
        "Java 11, to support HTTP Client structures.",
        "Java 17, to optimize sealed interfaces."
      ],
      answer: 1,
      explanation: "Java 8 introduced `default` methods (methods with bodies). This allowed Java library designers to add new methods (like `forEach` to the `Iterable` interface) without breaking backward compatibility for older implementing classes.",
      difficulty: "medium"
    },
    {
      id: "int_5",
      type: "practical",
      question: "What is the printed result of executing this interface default method call?",
      code: `interface Printer {
    default void print() { System.out.print("Interface "); }
}
class ConsolePrinter implements Printer {
    public void print() { System.out.print("Class "); }
}
// Main
Printer p = new ConsolePrinter();
p.print();`,
      options: [
        "Interface ",
        "Class ",
        "Interface Class",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "Subclass overrides take precedence over interface defaults. Since `ConsolePrinter` overrides `print()`, it executes, printing 'Class '.",
      difficulty: "medium"
    },
    {
      id: "int_6",
      type: "theory",
      question: "How does a class implement multiple interfaces in Java?",
      options: [
        "By extending multiple classes.",
        "By listing them after the 'implements' keyword, separated by commas (e.g. class A implements B, C).",
        "By using nested static interface definitions.",
        "Java does not support implementing multiple interfaces."
      ],
      answer: 1,
      explanation: "A class can implement multiple interfaces, separated by commas (e.g. `class Task implements Runnable, Serializable`). This allows a class to satisfy multiple behavioral contracts.",
      difficulty: "easy"
    },
    {
      id: "int_7",
      type: "practical",
      question: "What is the output of compiling this interface implementation class with different return types?",
      code: `interface A { int val(); }
interface B { String val(); }
class C implements A, B {
    // How to implement val()?
}`,
      options: [
        "Provide two implementations using overloading.",
        "Compilation Error: Class C cannot implement both interfaces because of conflicting return types for method val().",
        "Implement returning Object type.",
        "The compiler automatically selects the String return type."
      ],
      answer: 1,
      explanation: "Since both interfaces declare a method with the same name and arguments but different return types, it is impossible to write a single method in `C` that satisfies both contracts. Hence, compilation fails.",
      difficulty: "hard"
    },
    {
      id: "int_8",
      type: "theory",
      question: "What is a 'Marker Interface' (or Tag Interface) in Java?",
      options: [
        "An interface that contains only default methods.",
        "An interface with no fields or methods, used to deliver metadata or flag a class for specific JVM/runtime handling (e.g. Cloneable, Serializable).",
        "An interface used to draw shapes on screen.",
        "An interface marked as deprecated."
      ],
      answer: 1,
      explanation: "Marker interfaces are empty interfaces (e.g. `Serializable`, `Cloneable`, `RandomAccess`). They flag classes for compiler or JVM processing without requiring method implementations.",
      difficulty: "medium"
    },
    {
      id: "int_9",
      type: "theory",
      question: "What is a 'Functional Interface' in Java?",
      options: [
        "An interface with only static methods.",
        "An interface that declares exactly one abstract method (annotated with @FunctionalInterface), making it eligible for lambda expressions and method references.",
        "An interface containing functional logic code.",
        "An interface extending abstract classes."
      ],
      answer: 1,
      explanation: "Functional interfaces have exactly one abstract method (e.g. `Runnable`, `Callable`, `Comparator`). They serve as the target type for lambda expressions.",
      difficulty: "medium"
    },
    {
      id: "int_10",
      type: "practical",
      question: "What is the compile outcome of declaring static methods inside interfaces?",
      code: `interface Database {
    static void connect() {
        System.out.print("Connected ");
    }
}
class App implements Database {}
// Main:
App.connect(); // Line 6
Database.connect(); // Line 7`,
      options: [
        "Compiles successfully.",
        "Compilation Error on Line 6: Interface static methods are not inherited by implementing classes and must be called using the interface name.",
        "Compilation Error on Line 7: Interfaces cannot have static methods with bodies.",
        "Throws interface lookup error."
      ],
      answer: 1,
      explanation: "Interface static methods are not inherited by implementing classes. They must be called using the interface type directly (`Database.connect()`), so line 6 fails compilation.",
      difficulty: "hard"
    },
    {
      id: "int_11",
      type: "theory",
      question: "Can an interface extend another interface?",
      options: [
        "No, interfaces can only be implemented by classes.",
        "Yes, an interface can extend one or more other interfaces using the 'extends' keyword.",
        "Only if the parent interface is functional.",
        "Only if they share the same package."
      ],
      answer: 1,
      explanation: "An interface can extend other interfaces using the `extends` keyword (e.g. `interface B extends A, C`).",
      difficulty: "medium"
    },
    {
      id: "int_12",
      type: "practical",
      question: "Which Java 9 feature allows developers to extract common helper logic from default methods into private utility functions within the interface?",
      options: [
        "Interface private methods (static or non-static)",
        "Lambda helper blocks",
        "Nested classes in interfaces",
        "Protected default methods"
      ],
      answer: 0,
      explanation: "Java 9 introduced private methods in interfaces. This allows developers to share common helper logic between default/static methods without exposing them as public API components.",
      difficulty: "hard"
    },
    {
      id: "int_13",
      type: "practical",
      question: "What is the printed result of evaluating interface defaults conflict resolution?",
      code: `interface A {
    default void run() { System.out.print("A "); }
}
class Parent {
    public void run() { System.out.print("Parent "); }
}
class Child extends Parent implements A {}
// Main
new Child().run();`,
      options: [
        "A ",
        "Parent ",
        "Compilation Error: Inherits unrelated run() methods.",
        "Throws runtime binding exception."
      ],
      answer: 1,
      explanation: "Java's class-wins rule states that if a class extends a parent class and implements an interface that both define a method with the same signature, the parent class method always takes precedence over the interface default. Output is: 'Parent '.",
      difficulty: "hard"
    },
    {
      id: "int_14",
      type: "theory",
      question: "Can an interface define instance initialization blocks or constructors?",
      options: [
        "Yes, to initialize interface constants.",
        "No, interfaces cannot have constructors or instance initialization blocks because they do not maintain instance state.",
        "Only static initialization blocks are allowed.",
        "Only if the interface is sealed."
      ],
      answer: 1,
      explanation: "Interfaces cannot define constructors or initialization blocks because they cannot maintain object instance state.",
      difficulty: "medium"
    },
    {
      id: "int_15",
      type: "practical",
      question: "What is the compile outcome of the following variable access?",
      code: `interface Constant {
    int VAL = 10;
}
// Main
Constant.VAL = 20;`,
      options: [
        "VAL is modified to 20.",
        "Compilation Error: Cannot assign a value to final variable VAL.",
        "Compilation Error: VAL must be accessed via object reference.",
        "VAL becomes null."
      ],
      answer: 1,
      explanation: "Interface variables are implicitly `final` constants. Any attempt to reassign their value results in a compile-time error.",
      difficulty: "easy"
    }
  ],
  day14_polymorphism: [
    {
      id: "poly_1",
      type: "theory",
      question: "What does Polymorphism mean in Object-Oriented Programming?",
      options: [
        "Hiding class structures from users.",
        "The ability of a single interface or reference variable to represent different underlying forms (objects) and behaviors at runtime.",
        "Converting code dynamically to machine instructions.",
        "Structuring applications in multiple packages."
      ],
      answer: 1,
      explanation: "Polymorphism (meaning 'many forms') allows a parent class or interface reference to point to subclass objects, invoking overridden behaviors dynamically.",
      difficulty: "easy"
    },
    {
      id: "poly_2",
      type: "theory",
      question: "What is the difference between compile-time polymorphism and runtime polymorphism?",
      options: [
        "Compile-time polymorphism is resolved using method overloading; runtime polymorphism is resolved using method overriding.",
        "Compile-time polymorphism is slower than runtime polymorphism.",
        "Compile-time polymorphism requires interface declarations.",
        "Runtime polymorphism uses static binding."
      ],
      answer: 0,
      explanation: "Compile-time polymorphism (static binding) is achieved via method overloading, resolved by the compiler based on signatures. Runtime polymorphism (dynamic binding) is achieved via method overriding, resolved by the JVM based on the actual object type.",
      difficulty: "medium"
    },
    {
      id: "poly_3",
      type: "practical",
      question: "What is the printed result of evaluating this polymorphic call hierarchy?",
      code: `class Parent {
    void print() { System.out.print("Parent "); }
}
class Child extends Parent {
    void print() { System.out.print("Child "); }
}
// Main
Parent p = new Child();
p.print();`,
      options: [
        "Parent ",
        "Child ",
        "Compilation Error",
        "Parent Child"
      ],
      answer: 1,
      explanation: "At runtime, Java checks the actual object type (`Child`), not the reference type (`Parent`), and executes the overridden method, printing 'Child '.",
      difficulty: "easy"
    },
    {
      id: "poly_4",
      type: "practical",
      question: "Why does compiling the following polymorphism sample fail?",
      code: `class Parent {}
class Child extends Parent {
    void play() {}
}
// Main
Parent p = new Child();
p.play();`,
      options: [
        "Parent references cannot hold Child objects.",
        "Compilation Error: Cannot find symbol 'play()' in class Parent.",
        "Child cannot be resolved to Parent.",
        "play() must be static."
      ],
      answer: 1,
      explanation: "The compiler only checks methods declared in the reference type (`Parent`). Since `play()` is not defined in `Parent`, the compiler rejects the call, even though the actual runtime object is a `Child`.",
      difficulty: "medium"
    },
    {
      id: "poly_5",
      type: "theory",
      question: "What is Dynamic Method Dispatch in Java?",
      options: [
        "Loading class bytecode dynamically.",
        "The mechanism by which a call to an overridden method is resolved at runtime rather than compile-time.",
        "Spawning threads to execute methods.",
        "Calling static interface methods."
      ],
      answer: 1,
      explanation: "Dynamic Method Dispatch is the mechanism behind runtime polymorphism. The JVM looks up the actual object's class at runtime to determine which overridden method to execute.",
      difficulty: "medium"
    },
    {
      id: "poly_6",
      type: "practical",
      question: "What is the output of executing this variable access under polymorphic references?",
      code: `class Parent {
    int x = 10;
}
class Child extends Parent {
    int x = 20;
}
// Main
Parent p = new Child();
System.out.println(p.x);`,
      options: [
        "10",
        "20",
        "Compilation Error",
        "0"
      ],
      answer: 0,
      explanation: "In Java, fields (variables) are NOT polymorphic. Variable binding is determined at compile-time based on the reference type. Since `p` is of type `Parent`, it accesses the parent class field, printing 10.",
      difficulty: "hard"
    },
    {
      id: "poly_7",
      type: "practical",
      question: "What is the printed result of evaluating this method hiding code?",
      code: `class Parent {
    static void display() { System.out.print("P "); }
}
class Child extends Parent {
    static void display() { System.out.print("C "); }
}
// Main
Parent p = new Child();
p.display();`,
      options: [
        "P ",
        "C ",
        "Compilation Error",
        "P C"
      ],
      answer: 0,
      explanation: "Static methods cannot be overridden (they belong to classes, not instances). Subclasses can hide static methods, but the binding is resolved at compile-time based on the reference type (`Parent`). Hence, it calls `Parent.display()`, printing 'P '.",
      difficulty: "hard"
    },
    {
      id: "poly_8",
      type: "theory",
      question: "Which of the following method types cannot participate in runtime polymorphism?",
      options: [
        "Private methods",
        "Static methods",
        "Final methods",
        "All of the above"
      ],
      answer: 3,
      explanation: "Runtime polymorphism requires method overriding. Private methods (not visible to subclasses), static methods (tied to class), and final methods (cannot be overridden) are all ineligible for dynamic method dispatch.",
      difficulty: "medium"
    },
    {
      id: "poly_9",
      type: "practical",
      question: "What is the output of compiling this overridden method calling subclass method inside parent constructor?",
      code: `class Parent {
    Parent() { print(); }
    void print() { System.out.print("Parent "); }
}
class Child extends Parent {
    int val = 100;
    Child() { super(); }
    void print() { System.out.print("Child-" + val + " "); }
}
// Main
new Child();`,
      options: [
        "Parent ",
        "Child-100 ",
        "Child-0 ",
        "Compilation Error"
      ],
      answer: 2,
      explanation: "Calling polymorphic methods inside constructors is a dangerous practice. When the `Parent` constructor runs, the `Child` object is not yet fully initialized (so its instance variable `val` holds its default value `0`). Dynamic dispatch invokes `Child.print()`, printing 'Child-0 '.",
      difficulty: "hard"
    },
    {
      id: "poly_10",
      type: "theory",
      question: "How does the JVM internally implement dynamic method lookup for overridden methods?",
      options: [
        "By parsing source code strings at runtime.",
        "Using a virtual method table (vtable) containing references to method implementations for each class.",
        "By spawning native compiler threads on demand.",
        "Using reflections for every method call."
      ],
      answer: 1,
      explanation: "The JVM uses a Virtual Method Table (vtable) for each class. The vtable holds pointers to the implementations of its methods. Subclass overrides replace parent entries, enabling fast O(1) runtime lookups.",
      difficulty: "hard"
    },
    {
      id: "poly_11",
      type: "practical",
      question: "What is the print result of evaluating overloading parameters of subclass types?",
      code: `class Parent {}
class Child extends Parent {}
class Printer {
    void print(Parent p) { System.out.print("Parent "); }
    void print(Child c) { System.out.print("Child "); }
}
// Main
Printer pr = new Printer();
Parent obj = new Child();
pr.print(obj);`,
      options: [
        "Parent ",
        "Child ",
        "Compilation Error",
        "Ambiguous call error"
      ],
      answer: 0,
      explanation: "Method overloading is resolved at compile-time based on the reference type of the arguments, not their runtime class. Since `obj` is declared as `Parent`, the compiler binds the call to `print(Parent)`, printing 'Parent '.",
      difficulty: "hard"
    },
    {
      id: "poly_12",
      type: "theory",
      question: "Which annotation is used to check that a method overrides a parent method correctly?",
      options: [
        "@Override",
        "@Overload",
        "@Polymorphic",
        "@Inherited"
      ],
      answer: 0,
      explanation: "The `@Override` annotation instructs the compiler to verify that the method matches a signature in a parent class or interface, throwing a compile error if no match is found.",
      difficulty: "easy"
    },
    {
      id: "poly_13",
      type: "practical",
      question: "What is the compiled output of this polymorphic array instantiation?",
      code: `Parent[] arr = new Child[5];
arr[0] = new Parent();`,
      options: [
        "Compiles and runs successfully.",
        "Compilation Error: Incompatible array types.",
        "Compiles successfully, but throws ArrayStoreException at runtime because we cannot store a Parent object into an array of Child objects.",
        "Throws NullPointerException"
      ],
      answer: 2,
      explanation: "Arrays are covariant in Java, so `Parent[]` can refer to a `Child[]`. However, at runtime, the array remains a `Child[]`, which cannot store a `Parent` instance. Storing one throws an `ArrayStoreException`.",
      difficulty: "hard"
    },
    {
      id: "poly_14",
      type: "theory",
      question: "What design pattern relies heavily on polymorphism to instantiate objects without specifying their exact concrete classes?",
      options: [
        "Singleton Pattern",
        "Factory Method Pattern",
        "Proxy Pattern",
        "Observer Pattern"
      ],
      answer: 1,
      explanation: "The Factory Method Pattern uses polymorphism to return a parent or interface type from a creator method, letting subclasses decide which concrete object to instantiate.",
      difficulty: "medium"
    },
    {
      id: "poly_15",
      type: "practical",
      question: "What occurs if you call a private method from a public overridden method in the parent class?",
      code: `class Parent {
    public void work() { check(); }
    private void check() { System.out.print("P "); }
}
class Child extends Parent {
    private void check() { System.out.print("C "); }
}
// Main
Parent p = new Child();
p.work();`,
      options: [
        "P ",
        "C ",
        "Compilation Error",
        "Throws ClassCastException"
      ],
      answer: 0,
      explanation: "`check()` is private in `Parent` and is not visible to `Child` (so overriding does not apply). The call inside `Parent.work()` binds to `Parent`'s own `check()`, printing 'P '.",
      difficulty: "hard"
    }
  ],
  day15_encapsulation: [
    {
      id: "enc_1",
      type: "theory",
      question: "What is Encapsulation in Object-Oriented Programming?",
      options: [
        "Inheriting behaviors from parent classes.",
        "The process of wrapping variables (data) and methods (code) together as a single unit, restricting direct access from outside the class (Data Hiding).",
        "Converting code to machine-specific instructions.",
        "Creating dynamic arrays."
      ],
      answer: 1,
      explanation: "Encapsulation bundles data and methods together in a class and restricts direct access to fields (Data Hiding) using access modifiers, exposing them via public getter/setter methods.",
      difficulty: "easy"
    },
    {
      id: "enc_2",
      type: "theory",
      question: "How is data hiding achieved in an encapsulated Java class?",
      options: [
        "By declaring all class variables as public.",
        "By declaring class variables as private and providing public getter and setter methods to access and modify them.",
        "By defining variables inside interfaces.",
        "By compiling classes to encrypted binaries."
      ],
      answer: 1,
      explanation: "To implement data hiding, class fields are declared `private` to block direct access, and access is managed via public getters and setters.",
      difficulty: "easy"
    },
    {
      id: "enc_3",
      type: "practical",
      question: "Why is the setter method critical for maintaining object state validation?",
      options: [
        "Setters allow direct memory access.",
        "Setters can include validation rules (e.g. checking if an input age is positive) to prevent invalid values from being assigned to object fields.",
        "Setters speed up garbage collection.",
        "Setters declare static fields."
      ],
      answer: 1,
      explanation: "Exposing fields directly allows external code to assign invalid data (like age = -50). Setter methods let you validate input data before updating the object state.",
      difficulty: "medium"
    },
    {
      id: "enc_4",
      type: "practical",
      question: "What is a security vulnerability of returning a mutable object reference from a getter method?",
      options: [
        "It triggers stack overflow exceptions.",
        "It exposes the class structure to reflections.",
        "It allows external code to modify the internal state of the object directly without using setters (breaking encapsulation).",
        "It forces the object to become static."
      ],
      answer: 2,
      explanation: "If a getter returns a mutable reference (like a `Date` or `List`), external code can modify its contents directly, bypassing validation rules. To prevent this, getters should return defensive copies.",
      difficulty: "hard"
    },
    {
      id: "enc_5",
      type: "practical",
      question: "What is the printed result of the following getter modification?",
      code: `class Account {
    private List<String> transactions = new ArrayList<>();
    public List<String> getTransactions() { return transactions; }
}
// Main
Account acc = new Account();
acc.getTransactions().add("Fraud");
System.out.println(acc.getTransactions().size());`,
      options: [
        "0",
        "1",
        "Compilation Error",
        "Throws UnsupportedOperationException"
      ],
      answer: 1,
      explanation: "Because `getTransactions()` returns the actual reference to the private `transactions` list, external code can modify the list directly, bypassing encapsulation and changing the list size to 1.",
      difficulty: "hard"
    },
    {
      id: "enc_6",
      type: "theory",
      question: "How do you implement a completely read-only encapsulated class in Java?",
      options: [
        "By defining no variables in the class.",
        "By declaring all class variables as private and final, and providing getter methods but no setter methods.",
        "By using public static variables.",
        "By declaring the class abstract."
      ],
      answer: 1,
      explanation: "A read-only class declares its variables `private final` to ensure they are set once during construction. Providing getters without setters prevents reassignment, making the class read-only.",
      difficulty: "medium"
    },
    {
      id: "enc_7",
      type: "theory",
      question: "What is the difference between Encapsulation and Abstraction?",
      options: [
        "They are identical terms.",
        "Encapsulation is about data hiding and bundling code together; Abstraction is about hiding complexity and showing essential interfaces.",
        "Abstraction is implemented using private fields; Encapsulation is implemented using abstract classes.",
        "Encapsulation is a compile-time concept; Abstraction is a runtime concept."
      ],
      answer: 1,
      explanation: "Abstraction focuses on *what* a class does (interfaces/abstract classes). Encapsulation focuses on *how* it does it securely by hiding implementation details and variables.",
      difficulty: "medium"
    },
    {
      id: "enc_8",
      type: "practical",
      question: "What is a 'Defensive Copy' in Java getters, and why is it used?",
      options: [
        "Copying code to local directories.",
        "Creating and returning a new instance containing the same values as a mutable field, preventing external modifications from affecting the class's internal state.",
        "Creating backup variables on the stack.",
        "Using public fields instead of private."
      ],
      answer: 1,
      explanation: "A defensive copy clones a mutable field before returning it (e.g. `return new ArrayList<>(this.myList)`). This prevents callers from modifying the class's internal state directly.",
      difficulty: "hard"
    },
    {
      id: "enc_9",
      type: "theory",
      question: "What class structure introduced in Java 16 enforces read-only encapsulation automatically?",
      options: [
        "Java Records",
        "Sealed Classes",
        "Static Classes",
        "Final Interfaces"
      ],
      answer: 0,
      explanation: "Java Records are transparent data carriers. They are implicitly final and immutable, with the compiler automatically generating private final fields and read-only accessors.",
      difficulty: "medium"
    },
    {
      id: "enc_10",
      type: "practical",
      question: "What is the compile outcome of compiling this class containing setter logic?",
      code: `public class User {
    private int score;
    public void setScore(int score) {
        if (score < 0) throw new IllegalArgumentException();
        this.score = score;
    }
}`,
      options: [
        "Compiles successfully.",
        "Compilation Error: Setters cannot throw exceptions.",
        "Compilation Error: Setter return type must be int.",
        "Throws ClassCastException"
      ],
      answer: 0,
      explanation: "The class compiles successfully. Setter methods can throw runtime exceptions (like `IllegalArgumentException`) to reject invalid inputs.",
      difficulty: "easy"
    },
    {
      id: "enc_11",
      type: "theory",
      question: "What is the advantage of encapsulation when refactoring code?",
      options: [
        "It eliminates the need for compilation.",
        "It isolates changes: internal field types can change (e.g. changing an int to a double) without breaking external code, as long as getter/setter signatures remain constant.",
        "It automatically reduces memory usage.",
        "It speeds up JIT compilation."
      ],
      answer: 1,
      explanation: "Encapsulation decouples classes. You can change how a class stores data internally without affecting other classes, as long as the public interface remains consistent.",
      difficulty: "medium"
    },
    {
      id: "enc_12",
      type: "practical",
      question: "How do you implement a completely write-only encapsulated class in Java?",
      options: [
        "Declare the class private.",
        "Declare class variables as private, and provide setter methods but no getter methods.",
        "Define all fields as final.",
        "Use interfaces to write variables."
      ],
      answer: 1,
      explanation: "A write-only class defines `private` variables and provides setters to update them, but no getters, preventing external code from reading the values.",
      difficulty: "medium"
    },
    {
      id: "enc_13",
      type: "practical",
      question: "What is the output of compiling this class where the getter returns an unmodifiable list wrapper?",
      code: `class Library {
    private List<String> books = new ArrayList<>();
    public List<String> getBooks() {
        return Collections.unmodifiableList(books);
    }
}
// In Main:
new Library().getBooks().add("New Book");`,
      options: [
        "The book is added successfully.",
        "Compilation Error.",
        "Throws UnsupportedOperationException at runtime.",
        "The library list remains empty without error."
      ],
      answer: 2,
      explanation: "`Collections.unmodifiableList` returns a read-only wrapper. Any attempt to modify it (such as calling `.add()`) throws an `UnsupportedOperationException` at runtime, preserving encapsulation.",
      difficulty: "hard"
    },
    {
      id: "enc_14",
      type: "theory",
      question: "Why should we avoid declaring public fields in a production class?",
      options: [
        "They use double the memory of private fields.",
        "They allow external code to bypass validation, tightly coupling classes and making future changes difficult.",
        "They prevent the class from being compiled.",
        "They disable static methods."
      ],
      answer: 1,
      explanation: "Public fields break encapsulation. Any class can modify them without validation, creating tight coupling and making refactoring difficult.",
      difficulty: "easy"
    },
    {
      id: "enc_15",
      type: "practical",
      question: "What does the 'this' keyword do inside setter methods?",
      options: [
        "It refers to the parent class instance.",
        "It acts as a reference to the current object instance, resolving naming conflicts between parameter names and instance field names (e.g. this.name = name).",
        "It allocates new memory on the heap.",
        "It calls the class constructor."
      ],
      answer: 1,
      explanation: "The `this` keyword refers to the current object instance. In `this.score = score`, `this.score` specifies the instance field, while `score` refers to the local method parameter.",
      difficulty: "easy"
    }
  ],
  package: [
    {
      id: "pkg_1",
      type: "theory",
      question: "What is a Package in Java?",
      options: [
        "A compressed ZIP file containing source code.",
        "A namespace mechanism used to group related classes, interfaces, and sub-packages together, preventing naming conflicts.",
        "A class containing static helper methods.",
        "A compile-time build configuration file."
      ],
      answer: 1,
      explanation: "A package is a directory structure that groups related classes and interfaces, creating a unique namespace that prevents naming collisions.",
      difficulty: "easy"
    },
    {
      id: "pkg_2",
      type: "theory",
      question: "What is the naming convention for Java packages in production?",
      options: [
        "Always capitalized, e.g. PackName.",
        "Using reverse domain names in all lowercase, e.g. com.company.project.module.",
        "Using file path strings with slashes.",
        "Package names must match class names."
      ],
      answer: 1,
      explanation: "To guarantee unique package names globally, Java uses reverse internet domain names in lowercase (e.g. `com.google.search.util`).",
      difficulty: "easy"
    },
    {
      id: "pkg_3",
      type: "practical",
      question: "Where must the 'package' declaration statement be placed in a Java source code file?",
      options: [
        "It can be placed anywhere in the file.",
        "It must be the absolute first non-comment statement in the source file.",
        "Immediately after import statements.",
        "Inside the class definition body."
      ],
      answer: 1,
      explanation: "The `package` declaration must be the first line of code in a Java source file (excluding comments). Declaring package names after imports or class definitions is a compile-time error.",
      difficulty: "medium"
    },
    {
      id: "pkg_4",
      type: "practical",
      question: "What occurs if a Java file does not define a package statement?",
      options: [
        "The compiler rejects the file.",
        "The class is placed in the default unnamed package, which is accessible within the same directory but cannot be imported by classes in named packages.",
        "It defaults to the java.lang package.",
        "The class is marked private automatically."
      ],
      answer: 1,
      explanation: "If no package is specified, the class belongs to the default (unnamed) package. While convenient for simple scripts, classes in named packages cannot import classes from the default package.",
      difficulty: "medium"
    },
    {
      id: "pkg_5",
      type: "theory",
      question: "Which Java package is imported automatically into every Java source file without requiring an explicit import statement?",
      options: [
        "java.util.*",
        "java.lang.*",
        "java.io.*",
        "java.net.*"
      ],
      answer: 1,
      explanation: "The `java.lang` package (containing Object, String, System, Math, etc.) is imported automatically by the compiler.",
      difficulty: "easy"
    },
    {
      id: "pkg_6",
      type: "practical",
      question: "What is the difference between importing 'java.util.Date' vs 'java.util.*'?",
      options: [
        "The wildcard import loads all classes into memory at compilation, slowing execution.",
        "The wildcard import is a compiler instruction that allows importing on-demand without runtime or compilation performance costs, whereas specific imports are safer to prevent name conflicts.",
        "Specific imports are parsed as static variables.",
        "Wildcard imports allow access to sub-packages."
      ],
      answer: 1,
      explanation: "Wildcard imports (`import java.util.*`) do not import sub-packages or affect runtime performance. The compiler simply searches the package on-demand when compiling references. However, specific imports are preferred to prevent naming conflicts.",
      difficulty: "medium"
    },
    {
      id: "pkg_7",
      type: "practical",
      question: "How do you resolve a naming conflict if you need to use two classes with the exact same name from different packages (e.g. java.util.Date and java.sql.Date) in the same file?",
      options: [
        "You cannot import both; you must use fully qualified names (package prefix + class name) for at least one of the classes in the code.",
        "Rename one of the classes using the 'as' keyword.",
        "Declare one of the imports as static.",
        "Import only the parent packages."
      ],
      answer: 0,
      explanation: "Java does not have an import alias feature (like `as` in Python/TS). To resolve conflicts, you must reference at least one class using its fully qualified name (e.g. `java.sql.Date sqlDate = new java.sql.Date(...)`).",
      difficulty: "hard"
    },
    {
      id: "pkg_8",
      type: "theory",
      question: "What is a 'Static Import' in Java?",
      options: [
        "Importing classes without classloaders.",
        "A feature that allows importing static members (fields and methods) of a class directly, allowing them to be used without class name prefixes.",
        "Importing classes from static packages.",
        "Loading classes statically during JVM boot."
      ],
      answer: 1,
      explanation: "Static imports (e.g. `import static java.lang.Math.sqrt`) let you use static fields or methods directly (e.g. calling `sqrt(16)`) without prefixing them with the class name (`Math.sqrt(16)`).",
      difficulty: "medium"
    },
    {
      id: "pkg_9",
      type: "practical",
      question: "What is the compile outcome of this static import statement?",
      code: `import static java.lang.System.out;
// In Main:
out.println("Hello");`,
      options: [
        "Compiles and prints Hello.",
        "Compilation Error: static imports require class names.",
        "Throws NullPointerException at runtime.",
        "println becomes static."
      ],
      answer: 0,
      explanation: "The class compiles and runs successfully. Importing `static java.lang.System.out` brings the static field `out` into scope, allowing direct calls to `out.println`.",
      difficulty: "medium"
    },
    {
      id: "pkg_10",
      type: "theory",
      question: "Does importing a package wildcard like 'java.util.*' also import classes inside sub-packages like 'java.util.concurrent.*'?",
      options: [
        "Yes, all nested sub-packages are imported.",
        "No, imports are not recursive. You must import nested packages explicitly.",
        "Only if the sub-packages are public.",
        "Only if the classes are static."
      ],
      answer: 1,
      explanation: "Imports are not recursive. Importing `java.util.*` imports classes directly inside `java.util`, but does not import classes from sub-packages like `java.util.zip` or `java.util.concurrent`.",
      difficulty: "medium"
    },
    {
      id: "pkg_11",
      type: "practical",
      question: "What directory structure does the compiler enforce for a class declared in package 'com.company.project'?",
      options: [
        "It can be saved in any folder.",
        "The source file must be stored in a directory path matching 'com/company/project' relative to the source root.",
        "The compiler places all classes in a flat root folder.",
        "It depends on the operating system configuration."
      ],
      answer: 1,
      explanation: "Java enforces a directory structure that matches the package declaration. A class in package `com.company.project` must be stored in a matching folder hierarchy: `com/company/project/`.",
      difficulty: "medium"
    },
    {
      id: "pkg_12",
      type: "theory",
      question: "Which JAR file utility command is used to bundle packages and classes into a single archive file?",
      options: [
        "jar -cvf archive.jar com/",
        "java -jar archive.jar",
        "javac -archive archive.jar",
        "jdb -bundle archive.jar"
      ],
      answer: 0,
      explanation: "The `jar` utility package bundles classes. The option `-cvf` (create, verbose, file) creates a JAR file containing the specified package directory.",
      difficulty: "medium"
    },
    {
      id: "pkg_13",
      type: "practical",
      question: "What is the compile outcome of declaring two packages in the same Java source file?",
      code: `package com.company.a;
package com.company.b;`,
      options: [
        "Compiles successfully, creating nested namespaces.",
        "Compilation Error: Multiple package declarations are not allowed in a single source file.",
        "The second package overrides the first.",
        "The compiler splits the file into separate packages."
      ],
      answer: 1,
      explanation: "A Java source file can have at most one `package` declaration, which must appear at the top of the file.",
      difficulty: "easy"
    },
    {
      id: "pkg_14",
      type: "theory",
      question: "In Java 9 Modules, which configuration file defines package export availability to other modules?",
      options: [
        "package-info.java",
        "module-info.java",
        "manifest.mf",
        "settings.xml"
      ],
      answer: 1,
      explanation: "Java 9 modules use `module-info.java` at the source root. It specifies which packages are exported to other modules and what dependencies are required.",
      difficulty: "hard"
    },
    {
      id: "pkg_15",
      type: "practical",
      question: "What occurs if you declare a public class named Helper in package A, and then try to use it in package B without importing package A?",
      options: [
        "It compiles if the classes are in the same folder.",
        "Compilation Error: Cannot find symbol Helper.",
        "It compiles but throws ClassNotFoundException at runtime.",
        "The compiler imports package A automatically."
      ],
      answer: 1,
      explanation: "To use a class from another package, you must import it (`import A.Helper;`) or reference it using its fully qualified name (`A.Helper`). Otherwise, the compiler throws a 'cannot find symbol' error.",
      difficulty: "easy"
    }
  ],
  access_modifier: [
    {
      id: "am_1",
      type: "theory",
      question: "What are the four access modifiers in Java, ordered from most restrictive to least restrictive?",
      options: [
        "private, protected, default, public",
        "private, default (package-private), protected, public",
        "public, protected, default, private",
        "private, protected, public, static"
      ],
      answer: 1,
      explanation: "The four access levels are: 1) `private` (accessible only within the class), 2) `default` (no modifier, accessible within the package), 3) `protected` (accessible within package and by subclasses in other packages), 4) `public` (accessible everywhere).",
      difficulty: "easy"
    },
    {
      id: "am_2",
      type: "theory",
      question: "Which classes can access a member declared with the default (package-private) access modifier?",
      options: [
        "Any class in any package.",
        "Only classes within the same package.",
        "Only subclasses of the class.",
        "Only classes within the same source file."
      ],
      answer: 1,
      explanation: "The default access level (no modifier keyword) restricts access to classes inside the same package. Classes in other packages cannot access default members, even if they are subclasses.",
      difficulty: "easy"
    },
    {
      id: "am_3",
      type: "practical",
      question: "What is the compile outcome when a subclass in a different package attempts to access protected and private members of its parent?",
      code: `package p1;
public class Parent {
    protected int x = 10;
    private int y = 20;
}
package p2;
import p1.Parent;
class Child extends Parent {
    void print() {
        System.out.print(x + " ");
        // System.out.print(y); // Line 10
    }
}`,
      options: [
        "Compiles successfully.",
        "Compilation Error: Child cannot access protected field x because it is in a different package.",
        "Compilation Error on Line 10: Child cannot access private field y of Parent.",
        "Both B and C are compile errors."
      ],
      answer: 2,
      explanation: "Protected members are accessible to subclasses in other packages, so `x` compiles successfully. Private members are restricted to the declaring class, so line 10 (`y`) fails compilation.",
      difficulty: "medium"
    },
    {
      id: "am_4",
      type: "theory",
      question: "Can a top-level class be declared private or protected in Java?",
      options: [
        "Yes, any access modifier can be applied to top-level classes.",
        "No, top-level classes can only be declared public or default (package-private); only nested classes can be declared private or protected.",
        "Only protected is allowed.",
        "Only if the class has a main method."
      ],
      answer: 1,
      explanation: "Top-level outer classes cannot be declared `private` or `protected`. They can only have `public` or default (package-private) visibility. Nested classes can use any modifier.",
      difficulty: "medium"
    },
    {
      id: "am_5",
      type: "practical",
      question: "What is the compile outcome of the following subclass method declaration?",
      code: `class Parent {
    public void show() {}
}
class Child extends Parent {
    @Override
    void show() {} // Package-private override
}`,
      options: [
        "Compiles successfully.",
        "Compilation Error: Cannot reduce the visibility of the inherited method from Parent (from public to package-private).",
        "Compiles but throws ClassCastException.",
        "The override is ignored by the compiler."
      ],
      answer: 1,
      explanation: "Overriding methods cannot reduce access visibility. Since the parent class method is `public`, the subclass method must also be declared `public`.",
      difficulty: "hard"
    },
    {
      id: "am_6",
      type: "theory",
      question: "Which access modifier provides access to subclasses in other packages but blocks access to unrelated classes in other packages?",
      options: [
        "private",
        "default",
        "protected",
        "public"
      ],
      answer: 2,
      explanation: "The `protected` modifier allows access within the package and to subclasses in other packages, while blocking access to unrelated classes in other packages.",
      difficulty: "medium"
    },
    {
      id: "am_7",
      type: "practical",
      question: "What is the compile outcome of accessing a package-private class in another package?",
      code: `package p1;
class Helper {} // Default class
package p2;
import p1.Helper;`,
      options: [
        "Compiles successfully.",
        "Compilation Error: p1.Helper is not public in p1; cannot be accessed from outside package.",
        "Compiles but throws ClassNotFoundException.",
        "It is resolved by the compiler automatically."
      ],
      answer: 1,
      explanation: "Since class `Helper` has default (package-private) visibility, it is not accessible outside package `p1`. Any attempt to import or reference it in package `p2` results in a compilation error.",
      difficulty: "medium"
    },
    {
      id: "am_8",
      type: "theory",
      question: "Why does the private modifier help protect class internals?",
      options: [
        "It encrypts variables in memory.",
        "It implements encapsulation, preventing external classes from modifying state directly and bypassing validation rules.",
        "It speeds up garbage collection.",
        "It makes variables static."
      ],
      answer: 1,
      explanation: "Declaring fields `private` implements data hiding. Access is managed through public getters/setters, ensuring data validation.",
      difficulty: "easy"
    },
    {
      id: "am_9",
      type: "practical",
      question: "What is the compile outcome of the following variable access?",
      code: `class Test {
    private int val = 100;
}
// Main
Test t = new Test();
int x = t.val;`,
      options: [
        "Compiles and sets x to 100.",
        "Compilation Error: val has private access in Test.",
        "Compiles but throws NullPointerException.",
        "x becomes 0."
      ],
      answer: 1,
      explanation: "Private fields are restricted to the declaring class. Accessing `t.val` from outside the class fails compilation.",
      difficulty: "easy"
    },
    {
      id: "am_10",
      type: "theory",
      question: "Can an interface method be declared with the private access modifier?",
      options: [
        "No, interface methods must be public.",
        "Yes, starting in Java 9, interfaces can define private methods to share common helper logic between default methods.",
        "Only if the method is static.",
        "Only in functional interfaces."
      ],
      answer: 1,
      explanation: "Java 9 introduced private methods in interfaces. They can be static or instance methods, used to share helper code between default/static methods.",
      difficulty: "hard"
    },
    {
      id: "am_11",
      type: "practical",
      question: "What is the print result of this code when accessing private nested class fields?",
      code: `public class Outer {
    private int outerVal = 10;
    class Inner {
        void show() { System.out.print(outerVal); }
    }
    public static void main(String[] args) {
        new Outer().new Inner().show();
    }
}`,
      options: [
        "10",
        "Compilation Error: Inner cannot access private field outerVal.",
        "Throws NullPointerException.",
        "0"
      ],
      answer: 0,
      explanation: "Inner classes have access to all members of the outer class, including private fields and methods. Output is `10`.",
      difficulty: "hard"
    },
    {
      id: "am_12",
      type: "theory",
      question: "Which of the following is true regarding access modifiers in interface declarations?",
      options: [
        "Interface declarations must be public.",
        "An interface can be public or default; its member methods are implicitly public.",
        "Interface methods are private by default.",
        "Interface variables can be declared protected."
      ],
      answer: 1,
      explanation: "Interfaces can have public or default visibility. Member methods are implicitly `public` (except private methods) and variables are implicitly `public static final`.",
      difficulty: "medium"
    },
    {
      id: "am_13",
      type: "practical",
      question: "What is the compiled output of accessing public variables in package-private classes?",
      code: `package p1;
class Box {
    public int size = 10;
}
package p2;
// Box b = new Box(); // Line 5`,
      options: [
        "Compiles successfully.",
        "Compilation Error: Class Box is not visible outside package p1, so its public members cannot be accessed.",
        "Compiles but throws ClassCastException.",
        "Throws ClassNotFoundException."
      ],
      answer: 1,
      explanation: "Even though `size` is declared `public`, its enclosing class `Box` is package-private and not visible outside package `p1`. Hence, instantiating `Box` in package `p2` fails compilation.",
      difficulty: "hard"
    },
    {
      id: "am_14",
      type: "theory",
      question: "Which modifier is applied by default to local variables inside methods?",
      options: [
        "private",
        "default",
        "Local variables do not have access modifiers.",
        "public"
      ],
      answer: 2,
      explanation: "Access modifiers apply to class members (fields, methods, nested classes) to control class accessibility. Local variables exist only within the method stack, so they do not support access modifiers.",
      difficulty: "medium"
    },
    {
      id: "am_15",
      type: "practical",
      question: "What is the compile outcome of this subclass method override with increased visibility?",
      code: `class Parent {
      protected void work() {}
}
class Child extends Parent {
      @Override
      public void work() {} // Increased visibility
}`,
      options: [
        "Compiles successfully.",
        "Compilation Error: Cannot change method visibility on override.",
        "Compilation Error: Overriding methods must match access modifiers exactly.",
        "Throws runtime binding error."
      ],
      answer: 0,
      explanation: "Overriding methods can increase access visibility (e.g. from `protected` to `public`), but cannot decrease it. Thus, the class compiles successfully.",
      difficulty: "hard"
    }
  ],
  array: [
    {
      id: "arr_1",
      type: "theory",
      question: "What is an Array in Java?",
      options: [
        "A dynamic collection that automatically resizes.",
        "A container object that holds a fixed number of values of a single data type in contiguous memory locations.",
        "A utility class containing sort algorithms.",
        "A static data structure stored only in stack memory."
      ],
      answer: 1,
      explanation: "An array is a fixed-size, index-based data structure storing elements of a single type in contiguous heap memory.",
      difficulty: "easy"
    },
    {
      id: "arr_2",
      type: "practical",
      question: "What is the default value of array elements when instantiating 'new int[5]' and 'new Object[5]'?",
      options: [
        "0, null",
        "null, null",
        "0, 0",
        "Garbage values from memory allocation."
      ],
      answer: 0,
      explanation: "Array allocations initialize elements to their default types: numeric arrays default to `0`, object arrays default to `null`, and boolean arrays default to `false`.",
      difficulty: "easy"
    },
    {
      id: "arr_3",
      type: "practical",
      question: "What happens when you execute this array index lookup?",
      code: `int[] arr = {1, 2, 3};
System.out.println(arr[3]);`,
      options: [
        "Prints 0",
        "Prints garbage value",
        "Throws ArrayIndexOutOfBoundsException at runtime.",
        "Compilation Error"
      ],
      answer: 2,
      explanation: "Arrays are 0-indexed. An array of length 3 has valid indices 0, 1, and 2. Accessing index 3 is out of bounds, throwing an `ArrayIndexOutOfBoundsException` at runtime.",
      difficulty: "easy"
    },
    {
      id: "arr_4",
      type: "practical",
      question: "What is the printed result of evaluating this array length property?",
      code: `int[] arr = new int[5];
System.out.println(arr.length);`,
      options: [
        "5",
        "0",
        "Compilation Error: length should be called as length().",
        "Throws NullPointerException"
      ],
      answer: 0,
      explanation: "In Java, arrays have a built-in `length` property (field) that returns the capacity of the array. String objects use a `length()` method, but arrays use the `.length` field.",
      difficulty: "easy"
    },
    {
      id: "arr_5",
      type: "practical",
      question: "What is the output of the following multidimensional array initialization?",
      code: `int[][] arr = new int[3][];
System.out.println(arr[0]);`,
      options: [
        "Prints 0",
        "Prints null",
        "Throws NullPointerException",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "In Java, a 2D array is an array of arrays. Declaring `new int[3][]` allocates the outer array containing 3 rows initialized to `null`. Inner rows must be allocated explicitly (e.g. `arr[0] = new int[5]`).",
      difficulty: "medium"
    },
    {
      id: "arr_6",
      type: "practical",
      question: "What is the output of executing the following array copy operation?",
      code: `int[] arr1 = {1, 2, 3};
int[] arr2 = arr1;
arr2[0] = 99;
System.out.println(arr1[0]);`,
      options: [
        "1",
        "99",
        "0",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "Assigning `arr2 = arr1` copies the reference pointer, so both variables point to the same array object on the heap. Modifying `arr2[0]` updates the shared array, so `arr1[0]` prints 99.",
      difficulty: "medium"
    },
    {
      id: "arr_7",
      type: "theory",
      question: "Which class in java.util provides helper methods for sorting, searching, and filling arrays?",
      options: [
        "java.util.Array",
        "java.util.Arrays",
        "java.util.Collections",
        "java.util.ArrayList"
      ],
      answer: 1,
      explanation: "`java.util.Arrays` contains static utility methods to manipulate arrays (e.g. `Arrays.sort()`, `Arrays.toString()`, `Arrays.binarySearch()`).",
      difficulty: "easy"
    },
    {
      id: "arr_8",
      type: "practical",
      question: "What is the output of printing an array directly using System.out.println(arr)?",
      code: `int[] arr = {1, 2, 3};
System.out.println(arr);`,
      options: [
        "[1, 2, 3]",
        "Compilation Error",
        "A string representation of the array class type and hashcode (e.g. [I@hashcode).",
        "1 2 3"
      ],
      answer: 2,
      explanation: "Arrays do not override `Object.toString()`. Printing an array directly invokes the default implementation, which prints the internal type descriptor (e.g. `[I` for int array) followed by `@` and its hashcode. To print elements, use `Arrays.toString(arr)`.",
      difficulty: "medium"
    },
    {
      id: "arr_9",
      type: "practical",
      question: "What is the result of using Arrays.equals() vs array1.equals(array2)?",
      code: `int[] a = {1, 2};
int[] b = {1, 2};
System.out.println(a.equals(b) + " " + Arrays.equals(a, b));`,
      options: [
        "true true",
        "false false",
        "false true",
        "true false"
      ],
      answer: 2,
      explanation: "`a.equals(b)` checks reference equality (==), returning `false` because they are separate arrays. `Arrays.equals(a, b)` compares element values at matching indices, returning `true`.",
      difficulty: "medium"
    },
    {
      id: "arr_10",
      type: "practical",
      question: "What occurs if you declare a negative array size?",
      code: `int[] arr = new int[-5];`,
      options: [
        "Compilation Error.",
        "An empty array is created.",
        "Throws NegativeArraySizeException at runtime.",
        "The compiler changes the size to positive 5."
      ],
      answer: 2,
      explanation: "Declaring a negative size is syntactically valid but throws a `NegativeArraySizeException` at runtime.",
      difficulty: "medium"
    },
    {
      id: "arr_11",
      type: "practical",
      question: "What is the output of compiling this array casting code?",
      code: `Number[] nums = new Integer[5];
nums[0] = 5.5; // Double value`,
      options: [
        "Compiles and runs successfully.",
        "Compilation Error: Number cannot hold Double.",
        "Throws ArrayStoreException at runtime because we cannot store a Double in an Integer array.",
        "Throws NullPointerException"
      ],
      answer: 2,
      explanation: "Arrays are covariant, so `Number[]` can refer to `Integer[]`. However, storing a `Double` (`5.5`) in an `Integer[]` violates type safety, throwing an `ArrayStoreException` at runtime.",
      difficulty: "hard"
    },
    {
      id: "arr_12",
      type: "theory",
      question: "Which of the following is a key difference between Arrays and ArrayLists in Java?",
      options: [
        "Arrays can store primitives; ArrayLists can only store objects (wrapper types).",
        "Arrays have a fixed size; ArrayLists resize dynamically.",
        "Arrays access elements in O(1) time; ArrayLists do not.",
        "Both A and B are correct differences."
      ],
      answer: 3,
      explanation: "Arrays have a fixed size and can store both primitives and objects. `ArrayList` is a dynamic Collection that only stores objects (autoboxing primitives to wrappers) and resizes automatically.",
      difficulty: "medium"
    },
    {
      id: "arr_13",
      type: "practical",
      question: "What is the output of executing the following array copy utility?",
      code: `int[] src = {1, 2, 3};
int[] dest = new int[5];
System.arraycopy(src, 0, dest, 1, 3);
System.out.println(Arrays.toString(dest));`,
      options: [
        "[1, 2, 3, 0, 0]",
        "[0, 1, 2, 3, 0]",
        "[0, 0, 1, 2, 3]",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "`System.arraycopy(src, srcPos, dest, destPos, length)` copies 3 elements from `src` (starting at 0) to `dest` (starting at index 1). The resulting array is `[0, 1, 2, 3, 0]`.",
      difficulty: "hard"
    },
    {
      id: "arr_14",
      type: "theory",
      question: "Where are array objects allocated in JVM memory?",
      options: [
        "Always on the stack.",
        "On the heap, regardless of whether they store primitives or object references.",
        "Inside Method Area Metaspace.",
        "Primitives on stack, objects on heap."
      ],
      answer: 1,
      explanation: "In Java, all arrays are objects. The array structure itself is always allocated on the heap, even if it stores primitive data.",
      difficulty: "medium"
    },
    {
      id: "arr_15",
      type: "practical",
      question: "What is the output of this array search operation?",
      code: `int[] arr = {3, 1, 4, 1, 5};
int index = Arrays.binarySearch(arr, 4);
System.out.println(index);`,
      options: [
        "2",
        "Prints an undefined index because binarySearch requires sorted arrays.",
        "Compilation Error",
        "Throws exception"
      ],
      answer: 1,
      explanation: "`Arrays.binarySearch` requires the array to be sorted beforehand. Calling it on an unsorted array returns unpredictable results.",
      difficulty: "hard"
    }
  ],
  string: [
    {
      id: "str_1",
      type: "theory",
      question: "Why are String objects immutable in Java?",
      options: [
        "To speed up compilation times.",
        "For security, synchronization, caching in the String Constant Pool, and hashcode preservation.",
        "Because primitive strings are final.",
        "To prevent them from being garbage collected."
      ],
      answer: 1,
      explanation: "Immutability allows sharing strings safely across threads. It secures parameters (like file paths, database URLs), enables the String Constant Pool to save memory, and caches hash codes for fast map lookups.",
      difficulty: "medium"
    },
    {
      id: "str_2",
      type: "theory",
      question: "What is the String Constant Pool in Java?",
      options: [
        "A database containing system string constants.",
        "A special memory region inside the Heap that stores unique string literals to optimize memory usage.",
        "A stack frame holding local string variables.",
        "An encrypted file containing bytecode constants."
      ],
      answer: 1,
      explanation: "The String Constant Pool is a memory region in the Heap. When a string literal is created (e.g. `String s = \"Java\"`), the JVM checks the pool first. If the string exists, it returns the reference, preventing duplicate objects.",
      difficulty: "medium"
    },
    {
      id: "str_3",
      type: "practical",
      question: "What is the printed result of comparing these string objects?",
      code: `String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");
System.out.println((s1 == s2) + " " + (s1 == s3));`,
      options: [
        "true true",
        "true false",
        "false false",
        "false true"
      ],
      answer: 1,
      explanation: "`s1` and `s2` point to the same cached string in the pool, so `s1 == s2` is `true`. `new String` creates a new object on the heap, so `s1 == s3` is `false`.",
      difficulty: "medium"
    },
    {
      id: "str_4",
      type: "practical",
      question: "What does the String.intern() method do?",
      options: [
        "It converts a string to an integer.",
        "It searches the String Constant Pool for a match. If found, it returns the pool reference; if not, it adds the string to the pool and returns its reference.",
        "It splits strings into arrays.",
        "It encrypts the string."
      ],
      answer: 1,
      explanation: "`s.intern()` returns the canonical representation of a string from the pool. If the pool contains an equal string, it returns that reference. This lets you use `==` for comparison instead of `.equals()`.",
      difficulty: "hard"
    },
    {
      id: "str_5",
      type: "practical",
      question: "What is the output of the following string concatenation loop?",
      code: `String str = "a";
str = str.concat("b");
str += "c";
System.out.println(str);`,
      options: [
        "a",
        "abc",
        "Compilation Error",
        "ab"
      ],
      answer: 1,
      explanation: "String operations return new string instances. Reassigning them to `str` concatenates the characters, printing `abc`.",
      difficulty: "easy"
    },
    {
      id: "str_6",
      type: "theory",
      question: "What is the difference between StringBuilder and StringBuffer?",
      options: [
        "StringBuilder is thread-safe; StringBuffer is not.",
        "StringBuilder is not thread-safe and faster; StringBuffer is thread-safe (synchronized methods) and slower.",
        "StringBuffer uses less memory than StringBuilder.",
        "StringBuilder is for files; StringBuffer is for consoles."
      ],
      answer: 1,
      explanation: "Both represent mutable character sequences. `StringBuilder` is faster because its methods are not synchronized, making it ideal for single-threaded code. `StringBuffer` is synchronized and thread-safe, but slower.",
      difficulty: "medium"
    },
    {
      id: "str_7",
      type: "practical",
      question: "What is the printed result of compiling and running this string manipulation code?",
      code: `String str = "Java";
str.toLowerCase();
str.replace('J', 'K');
System.out.println(str);`,
      options: [
        "java",
        "Kava",
        "Java",
        "kava"
      ],
      answer: 2,
      explanation: "Strings are immutable. Calling `toLowerCase()` or `replace()` returns a new string, leaving the original `str` unchanged. Since the returned values are not reassigned, the code prints 'Java'.",
      difficulty: "medium"
    },
    {
      id: "str_8",
      type: "practical",
      question: "What is the output of the following string comparison?",
      code: `String s1 = "java";
String s2 = "JAVA";
System.out.println(s1.equals(s2) + " " + s1.equalsIgnoreCase(s2));`,
      options: [
        "true true",
        "false false",
        "false true",
        "true false"
      ],
      answer: 2,
      explanation: "`.equals()` is case-sensitive, returning `false` for 'java' vs 'JAVA'. `.equalsIgnoreCase()` ignores case differences, returning `true`.",
      difficulty: "easy"
    },
    {
      id: "str_9",
      type: "practical",
      question: "What does the method String.substring(1, 3) return for the string 'Java'?",
      options: [
        "av",
        "av",
        "jav",
        "ava"
      ],
      answer: 0,
      explanation: "`substring(beginIndex, endIndex)` extracts characters from `beginIndex` (inclusive) to `endIndex` (exclusive). For 'Java', index 1 is 'a' and index 3 is 'a' (exclusive), returning 'av' (indices 1 and 2).",
      difficulty: "medium"
    },
    {
      id: "str_10",
      type: "practical",
      question: "What is the output of compiling this string addition code?",
      code: `String s = 5 + 4 + "Java" + 5 + 4;
System.out.println(s);`,
      options: [
        "9Java9",
        "9Java54",
        "54Java54",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "Operators evaluate left-to-right. `5 + 4` performs integer addition, yielding `9`. Next, `9 + \"Java\"` performs string concatenation, yielding `\"9Java\"`. Finally, appending `5` and then `4` performs string concatenation, resulting in `\"9Java54\"`.",
      difficulty: "hard"
    },
    {
      id: "str_11",
      type: "theory",
      question: "Which of the following is true regarding Java 15 text blocks?",
      options: [
        "They are declared using single quotes.",
        "They use triple double quotes (\"\"\") to declare multi-line string literals without escape sequences, preserving formatting.",
        "They compile to separate binary class files.",
        "They are mutable string collections."
      ],
      answer: 1,
      explanation: "Text Blocks (`\"\"\"`) declare multi-line strings, preserving newlines and indentation without needing `\n` or escape sequences.",
      difficulty: "medium"
    },
    {
      id: "str_12",
      type: "practical",
      question: "What is the print result of searching characters using indexOf and lastIndexOf?",
      code: `String s = "banana";
System.out.println(s.indexOf('a') + " " + s.lastIndexOf('a'));`,
      options: [
        "1 5",
        "1 3",
        "0 5",
        "Compilation Error"
      ],
      answer: 0,
      explanation: "`indexOf('a')` returns the first occurrence of 'a' (index 1). `lastIndexOf('a')` returns the last occurrence (index 5). Output is `1 5`.",
      difficulty: "medium"
    },
    {
      id: "str_13",
      type: "practical",
      question: "What is the output of checking if a string is empty using isEmpty() vs isBlank() in Java 11?",
      code: `String str = "   ";
System.out.println(str.isEmpty() + " " + str.isBlank());`,
      options: [
        "true true",
        "false false",
        "false true",
        "true false"
      ],
      answer: 2,
      explanation: "`isEmpty()` checks if length is 0, returning `false` because the string contains spaces. `isBlank()` checks if the string is empty or contains only whitespace, returning `true`.",
      difficulty: "hard"
    },
    {
      id: "str_14",
      type: "theory",
      question: "What is the performance implication of concatenating strings in a loop using the '+' operator?",
      options: [
        "It is automatically optimized to O(1) time.",
        "It creates a new String and StringBuilder object in every iteration, leading to O(N^2) complexity and garbage collection overhead.",
        "It runs faster than using StringBuilder.",
        "It saves heap memory."
      ],
      answer: 1,
      explanation: "Using `+` in a loop compiles to `new StringBuilder().append(...)` in every iteration. This creates duplicate objects and copies characters repeatedly, resulting in poor performance. Loops should use `StringBuilder` instead.",
      difficulty: "hard"
    },
    {
      id: "str_15",
      type: "practical",
      question: "What is the printed result of checking if a string starts with a prefix?",
      code: `String str = "Unfriendly";
System.out.println(str.startsWith("friend", 2));`,
      options: [
        "true",
        "false",
        "Compilation Error",
        "Throws IndexOutOfBoundsException"
      ],
      answer: 0,
      explanation: "`startsWith(prefix, offset)` checks if the substring starting at `offset` matches the prefix. Index 2 of 'Unfriendly' is the start of 'friendly', which matches 'friend', returning `true`.",
      difficulty: "hard"
    }
  ],
  exception_handling: [
    {
      id: "ex_1",
      type: "theory",
      question: "What is the difference between Checked and Unchecked Exceptions in Java?",
      options: [
        "Checked exceptions are handled by JVM; unchecked exceptions are handled by developers.",
        "Checked exceptions are checked at compile-time and must be caught or declared; Unchecked exceptions (subclasses of RuntimeException) are checked at runtime and do not require declaration.",
        "Checked exceptions occur only in compiler bugs.",
        "Unchecked exceptions are faster to throw."
      ],
      answer: 1,
      explanation: "Checked exceptions (e.g. `IOException`) must be handled using `try-catch` or declared in the method signature (`throws`). Unchecked exceptions (e.g. `NullPointerException`) represent runtime logic errors and do not require explicit handling.",
      difficulty: "medium"
    },
    {
      id: "ex_2",
      type: "theory",
      question: "Which class serves as the root class for all exceptions and errors in Java?",
      options: [
        "java.lang.Exception",
        "java.lang.Throwable",
        "java.lang.Error",
        "java.lang.RuntimeException"
      ],
      answer: 1,
      explanation: "`java.lang.Throwable` is the root class of the Java exception hierarchy. It has two main subclasses: `Error` (serious system issues) and `Exception` (program errors).",
      difficulty: "easy"
    },
    {
      id: "ex_3",
      type: "practical",
      question: "What is the output of executing the following exception block containing a finally statement?",
      code: `try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.print("Catch ");
} finally {
    System.out.print("Finally ");
}`,
      options: [
        "Catch ",
        "Finally ",
        "Catch Finally ",
        "Throws division by zero exception"
      ],
      answer: 2,
      explanation: "Division by zero throws an `ArithmeticException`, which is caught by the catch block, printing 'Catch '. The `finally` block always executes, printing 'Finally '. Output is: 'Catch Finally '.",
      difficulty: "easy"
    },
    {
      id: "ex_4",
      type: "practical",
      question: "What happens if a catch block throws an exception, and the finally block also throws an exception?",
      options: [
        "Both exceptions are thrown in a list.",
        "The exception thrown by the catch block is lost (suppressed), and only the exception thrown by the finally block propagates to the caller.",
        "The compiler rejects the code.",
        "The JVM aborts instantly."
      ],
      answer: 1,
      explanation: "If both blocks throw exceptions, the exception from the `finally` block bubbles up, hiding (suppressing) the exception from the catch block.",
      difficulty: "hard"
    },
    {
      id: "ex_5",
      type: "practical",
      question: "Why does the following try-catch structure fail to compile?",
      code: `try {
    throw new IOException();
} catch (Exception e) {
    System.out.print("Exception ");
} catch (IOException e) {
    System.out.print("IOException ");
}`,
      options: [
        "IOException must be thrown inside static methods.",
        "Compilation Error: IOException has already been caught by the broader catch (Exception) block.",
        "Multiple catches are not allowed in Java.",
        "try block is missing finally."
      ],
      answer: 1,
      explanation: "Catch blocks must be ordered from most specific to most general. Since `Exception` is the parent of `IOException`, the first block catches all `IOException`s, making the second block unreachable and causing a compile error.",
      difficulty: "medium"
    },
    {
      id: "ex_6",
      type: "theory",
      question: "What is the difference between the 'throw' and 'throws' keywords in Java?",
      options: [
        "throw declares exceptions; throws throws them.",
        "throw is used inside a method to throw a specific exception instance; throws is used in a method signature to declare exceptions that the method might throw.",
        "They are identical keywords.",
        "throw requires interfaces; throws requires abstract classes."
      ],
      answer: 1,
      explanation: "`throw` throws a specific exception (e.g. `throw new Exception()`). `throws` is a signature declaration warning callers that the method might throw a checked exception.",
      difficulty: "medium"
    },
    {
      id: "ex_7",
      type: "practical",
      question: "What is the key benefit of Java 7's 'try-with-resources' statement?",
      options: [
        "It speeds up execution times.",
        "It automatically closes any resources that implement the AutoCloseable interface (like files or database connections) at the end of the block, preventing resource leaks.",
        "It catches all exceptions automatically.",
        "It replaces the need for catch blocks."
      ],
      answer: 1,
      explanation: "Try-with-resources automatically closes declared resources (e.g. file streams) at the end of the block, even if exceptions are thrown, eliminating `finally` cleanup boilerplate.",
      difficulty: "medium"
    },
    {
      id: "ex_8",
      type: "practical",
      question: "What occurs if you declare a resources block that does not implement AutoCloseable?",
      code: `try (String str = "Resource") {
    // operations
}`,
      options: [
        "Compiles successfully.",
        "Compilation Error: String cannot be converted to java.lang.AutoCloseable.",
        "Throws ClassCastException at runtime.",
        "The string is closed automatically."
      ],
      answer: 1,
      explanation: "Only classes implementing `java.lang.AutoCloseable` or `java.io.Closeable` can be declared in a try-with-resources block.",
      difficulty: "medium"
    },
    {
      id: "ex_9",
      type: "theory",
      question: "What is the difference between an Exception and an Error in Java?",
      options: [
        "Errors are checked; Exceptions are unchecked.",
        "Exceptions represent conditions that a reasonable application should try to catch; Errors represent serious system problems (like OutOfMemoryError) that applications should not try to handle.",
        "Errors are thrown by developers; Exceptions by JVM.",
        "They are identical types."
      ],
      answer: 1,
      explanation: "Exceptions (`Exception`) represent recoverable conditions. Errors (`Error`, like `StackOverflowError` or `OutOfMemoryError`) represent fatal system failures where the application cannot safely recover.",
      difficulty: "medium"
    },
    {
      id: "ex_10",
      type: "practical",
      question: "What is the printed result of evaluating this finally return override code?",
      code: `public static int test() {
    try {
        throw new RuntimeException();
    } finally {
        return 100;
    }
}
// In Main:
System.out.println(test());`,
      options: [
        "Throws RuntimeException.",
        "Prints 100.",
        "Compilation Error.",
        "Prints 0."
      ],
      answer: 1,
      explanation: "A `return` in a `finally` block overrides any thrown exceptions or returns in the `try`/`catch` blocks, causing the exception to be discarded and returning 100.",
      difficulty: "hard"
    },
    {
      id: "ex_11",
      type: "practical",
      question: "Which exception is thrown if you try to cast an object to an incompatible type?",
      options: [
        "IllegalArgumentException",
        "ClassCastException",
        "TypeMismatchException",
        "NullPointerException"
      ],
      answer: 1,
      explanation: "Casting an object reference to an incompatible subclass (e.g. casting an `Integer` to a `String`) throws a `ClassCastException` at runtime.",
      difficulty: "easy"
    },
    {
      id: "ex_12",
      type: "practical",
      question: "What is the printed result of this multi-catch exception block?",
      code: `try {
    int[] arr = new int[2];
    arr[5] = 10;
} catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {
    System.out.print(e.getClass().getSimpleName());
}`,
      options: [
        "ArithmeticException",
        "ArrayIndexOutOfBoundsException",
        "Compilation Error",
        "Throws exception"
      ],
      answer: 1,
      explanation: "Accessing index 5 in a size-2 array throws an `ArrayIndexOutOfBoundsException`. The multi-catch block catches it and prints its class name.",
      difficulty: "medium"
    },
    {
      id: "ex_13",
      type: "practical",
      question: "Why does the compiler reject the following multi-catch declaration?",
      code: `catch (IOException | FileNotFoundException e) {}`,
      options: [
        "FileNotFoundException is a subclass of IOException, making it redundant and causing a compile-time error for alternative exception hierarchy.",
        "Multi-catches are only for runtime exceptions.",
        "The pipe symbol is invalid syntax.",
        "Exceptions must be assigned to different variables."
      ],
      answer: 0,
      explanation: "In a multi-catch block, alternative exceptions cannot have a subclass relationship (e.g. `FileNotFoundException` extends `IOException`). If they do, the subclass catch is redundant, failing compilation.",
      difficulty: "hard"
    },
    {
      id: "ex_14",
      type: "theory",
      question: "What are 'Suppressed Exceptions' in Java try-with-resources?",
      options: [
        "Exceptions caught by default.",
        "Exceptions that are thrown when closing resources. They are appended to the primary exception's suppressed list and retrieved via e.getSuppressed().",
        "Runtime exceptions that are ignored.",
        "Exceptions thrown inside static blocks."
      ],
      answer: 1,
      explanation: "If an exception is thrown in the try block, and another is thrown while closing resources, the resource exception is suppressed (rather than lost). You can retrieve it using `e.getSuppressed()`.",
      difficulty: "hard"
    },
    {
      id: "ex_15",
      type: "practical",
      question: "What occurs if you attempt to catch a checked exception that is never thrown inside the try block?",
      code: `try {
    System.out.println("Hello");
} catch (IOException e) {
    System.out.println("Catch");
}`,
      options: [
        "Compiles successfully.",
        "Compilation Error: exception IOException is never thrown in body of corresponding try statement.",
        "Compiles but throws exception at runtime.",
        "Prints Catch"
      ],
      answer: 1,
      explanation: "To prevent dead code, Java forbids catching a checked exception (like `IOException`) if the compiler can prove it is never thrown in the `try` block.",
      difficulty: "hard"
    }
  ],
  file_handling: [
    {
      id: "fh_1",
      type: "theory",
      question: "What is the difference between Character Streams and Byte Streams in Java I/O?",
      options: [
        "Character streams are faster than byte streams.",
        "Byte streams (InputStream/OutputStream) read/write data in 8-bit bytes (useful for images/binary data); Character streams (Reader/Writer) read/write 16-bit Unicode characters (useful for text files).",
        "Byte streams are only for network sockets.",
        "Character streams do not require files."
      ],
      answer: 1,
      explanation: "Byte streams handle raw binary data (like images). Character streams are specialized for reading and writing text files, handling Unicode translation automatically.",
      difficulty: "medium"
    },
    {
      id: "fh_2",
      type: "theory",
      question: "Which package contains the standard Classes for Java's File I/O operations?",
      options: [
        "java.lang",
        "java.io",
        "java.nio",
        "Both java.io and java.nio are correct."
      ],
      answer: 3,
      explanation: "`java.io` contains the original blocking stream APIs. `java.nio` (Non-blocking I/O) contains modern, path-oriented APIs introduced in Java 7.",
      difficulty: "easy"
    },
    {
      id: "fh_3",
      type: "practical",
      question: "What is the output of compiling this file writing code?",
      code: `FileWriter fw = new FileWriter("test.txt");
fw.write("Java");`,
      options: [
        "Writes 'Java' to test.txt immediately.",
        "Compiles, but does not write to the file until fw.close() or fw.flush() is called, as data is buffered in memory.",
        "Compilation Error: FileWriter requires public parameters.",
        "Throws FileNotFoundException"
      ],
      answer: 1,
      explanation: "Writer streams buffer data for performance. Data is not flushed to disk until you call `.flush()` or `.close()`, otherwise the file remains empty.",
      difficulty: "medium"
    },
    {
      id: "fh_4",
      type: "practical",
      question: "What is the print result of this code when accessing directories?",
      code: `File f = new File("nonexistent_folder");
System.out.println(f.exists());`,
      options: [
        "Throws FileNotFoundException.",
        "false",
        "Compilation Error.",
        "true"
      ],
      answer: 1,
      explanation: "Instantiating a `File` object does not create a file or folder or search the disk. It simply represents the path, and calling `exists()` returns `false` if it does not exist.",
      difficulty: "easy"
    },
    {
      id: "fh_5",
      type: "theory",
      question: "What is the purpose of the BufferedReader class in Java text reading?",
      options: [
        "To compile file data.",
        "To improve reading performance by buffering characters in memory, providing a convenient readLine() method to read text line-by-line.",
        "To deserialize objects.",
        "To read binary image streams."
      ],
      answer: 1,
      explanation: "`BufferedReader` buffers input to minimize expensive disk access. It provides `.readLine()` to easily read text files line-by-line.",
      difficulty: "medium"
    },
    {
      id: "fh_6",
      type: "theory",
      question: "What is Serialization in Java?",
      options: [
        "Splitting files into chunks.",
        "The process of converting an object's state into a byte stream so it can be saved to a file or transmitted over a network.",
        "Compiling classes to bytecode.",
        "Caching database connections."
      ],
      answer: 1,
      explanation: "Serialization converts an object into a byte stream to save it to disk or transmit it. The class must implement the `Serializable` marker interface.",
      difficulty: "medium"
    },
    {
      id: "fh_7",
      type: "practical",
      question: "Why does the JVM throw a NotSerializableException during object serialization?",
      options: [
        "The object has no fields.",
        "The class or one of its member fields does not implement the java.io.Serializable interface.",
        "The file is read-only.",
        "The serialization ID is mismatching."
      ],
      answer: 1,
      explanation: "To serialize an object, its class and all non-transient member fields must implement the `Serializable` interface. If any non-transient class in the hierarchy does not, a `NotSerializableException` is thrown.",
      difficulty: "hard"
    },
    {
      id: "fh_8",
      type: "practical",
      question: "What is the printed result of evaluating this deserialization field access?",
      code: `class User implements Serializable {
    String name = "Admin";
    transient String pass = "123";
}
// Serialize and then deserialize:
User u = (User) input.readObject();
System.out.println(u.name + " " + u.pass);`,
      options: [
        "Admin 123",
        "Admin null",
        "Compilation Error",
        "Throws NotSerializableException"
      ],
      answer: 1,
      explanation: "Fields marked `transient` are skipped during serialization. When deserialized, they receive their default type values (so `pass` becomes `null`).",
      difficulty: "hard"
    },
    {
      id: "fh_9",
      type: "theory",
      question: "What is the purpose of serialVersionUID in a Serializable class?",
      options: [
        "To allocate memory offsets.",
        "To act as a version control ID for serialization compatibility, ensuring a serialized object can be deserialized into a matching class version.",
        "To encrypt serialized files.",
        "To count object instances."
      ],
      answer: 1,
      explanation: "`serialVersionUID` is a version ID. If a class undergoes changes, this ID verifies that the serialized object is compatible with the current class version, preventing `InvalidClassException`s during deserialization.",
      difficulty: "hard"
    },
    {
      id: "fh_10",
      type: "practical",
      question: "What is the modern, non-blocking way to read all lines of a file into a List of Strings in Java 8+?",
      options: [
        "Files.readAllLines(Paths.get(\"file.txt\"))",
        "new FileReader(\"file.txt\").readLines()",
        "BufferedReader.readAll()",
        "FileChannel.readLines()"
      ],
      answer: 0,
      explanation: "Java 7/8 introduced `Files.readAllLines(Path)`, which reads an entire file into a `List<String>`, handling stream opening and closing automatically.",
      difficulty: "hard"
    },
    {
      id: "fh_11",
      type: "practical",
      question: "Which of the following creates a directory structure, including parent directories if they do not exist?",
      options: [
        "new File(\"a/b/c\").mkdir()",
        "new File(\"a/b/c\").mkdirs()",
        "Files.createDirectory(\"a/b/c\")",
        "new Folder(\"a/b/c\").create()"
      ],
      answer: 1,
      explanation: "`File.mkdir()` only creates the terminal directory if parent folders exist. `File.mkdirs()` creates the target directory and any missing parent directories.",
      difficulty: "medium"
    },
    {
      id: "fh_12",
      type: "theory",
      question: "What is the difference between absolute paths and relative paths in File structures?",
      options: [
        "Absolute paths are only for windows.",
        "An absolute path specifies the location from the root directory of the file system; a relative path specifies the location relative to the current working directory.",
        "Relative paths require internet connections.",
        "They are identical path representations."
      ],
      answer: 1,
      explanation: "Absolute paths start from root (e.g. `C:/data/file.txt`). Relative paths resolve starting from the current working directory where the JVM was launched (e.g. `data/file.txt`).",
      difficulty: "easy"
    },
    {
      id: "fh_13",
      type: "practical",
      question: "What occurs if you write to an existing file using 'new FileWriter(\"out.txt\")' vs 'new FileWriter(\"out.txt\", true)'?",
      options: [
        "Both append data.",
        "The first overwrites the file; the second appends new data to the end of the file.",
        "The first appends data; the second throws a file exists exception.",
        "The second is a compile error."
      ],
      answer: 1,
      explanation: "The default `FileWriter(file)` constructor overwrites the file if it exists. Passing `true` as the second parameter activates append mode, preserving existing content.",
      difficulty: "medium"
    },
    {
      id: "fh_14",
      type: "theory",
      question: "Which JVM resource check should always be performed when working with File streams?",
      options: [
        "Closing the stream inside finally block or using try-with-resources to prevent file descriptor/resource leaks.",
        "Allocating memory caches dynamically.",
        "Compiling files before reading.",
        "Checking CPU temperatures."
      ],
      answer: 0,
      explanation: "File streams consume operating system file descriptors. Failing to close them leads to resource leaks, preventing other processes from accessing files. Always use try-with-resources to ensure they close.",
      difficulty: "easy"
    },
    {
      id: "fh_15",
      type: "practical",
      question: "What does the transient keyword do during serialization?",
      options: [
        "It speeds up variable serialization.",
        "It prevents a field from being serialized. During deserialization, the field is initialized to its default value.",
        "It encrypts the variable.",
        "It makes the variable final."
      ],
      answer: 1,
      explanation: "Fields marked `transient` are ignored during serialization and restored to their default type value when deserialized.",
      difficulty: "medium"
    }
  ],
  thread: [
    {
      id: "th_1",
      type: "theory",
      question: "What is a Thread in Java?",
      options: [
        "A package containing system utilities.",
        "A lightweight, independent path of execution within a program that shares process memory space.",
        "An instance of class methods.",
        "A database connection query."
      ],
      answer: 1,
      explanation: "A thread is a path of execution within a program. Multi-threaded programs run tasks concurrently, sharing the process's heap memory space.",
      difficulty: "easy"
    },
    {
      id: "th_2",
      type: "theory",
      question: "What are the two primary ways to define and create a custom thread in Java?",
      options: [
        "Implementing Runnable interface or extending Thread class.",
        "Implementing Callable interface or extending Process class.",
        "Using static methods or final fields.",
        "Using compiler commands or JVM flags."
      ],
      answer: 0,
      explanation: "You create a thread by: 1) extending the `Thread` class and overriding `run()`, or 2) implementing the `Runnable` interface and passing it to a `Thread` instance.",
      difficulty: "easy"
    },
    {
      id: "th_3",
      type: "practical",
      question: "What is the difference between calling thread.start() and thread.run()?",
      options: [
        "start() runs on the same thread; run() spawns a new thread.",
        "start() spawns a new thread of execution and calls run() concurrently; calling run() directly runs it as a standard method call on the calling thread.",
        "They are identical calls.",
        "run() throws checked exceptions; start() does not."
      ],
      answer: 1,
      explanation: "`thread.start()` allocates JVM call stacks and triggers a new concurrent thread to execute the code in `run()`. Calling `thread.run()` directly is just a synchronous method call on the current thread.",
      difficulty: "medium"
    },
    {
      id: "th_4",
      type: "practical",
      question: "What is the printed result when the main thread calls join() on another thread?",
      options: [
        "The target thread is aborted.",
        "The calling thread (main) blocks and waits until the target thread finishes execution.",
        "Both threads execute concurrently without synchronization.",
        "Throws InterruptedException immediately."
      ],
      answer: 1,
      explanation: "Calling `t.join()` blocks the calling thread (e.g. main) until thread `t` completes execution, ensuring sequential execution milestones.",
      difficulty: "medium"
    },
    {
      id: "th_5",
      type: "theory",
      question: "What is a 'Race Condition' in multi-threaded Java applications?",
      options: [
        "A competition between JVM threads to compile code.",
        "A concurrency bug where multiple threads access and modify shared data concurrently, leading to unpredictable results depending on execution order.",
        "A speed test for JIT compilers.",
        "A deadlock scenario."
      ],
      answer: 1,
      explanation: "A race condition occurs when multiple threads read and write shared state without proper synchronization. The final value depends on thread scheduling order, causing unpredictable bugs.",
      difficulty: "medium"
    },
    {
      id: "th_6",
      type: "practical",
      question: "What does the 'synchronized' keyword guarantee when applied to a method?",
      options: [
        "It executes the method in a separate thread.",
        "It restricts method access to one thread at a time by requiring the thread to acquire the monitor lock of the object/class.",
        "It prevents runtime exceptions.",
        "It automatically allocates memory arrays."
      ],
      answer: 1,
      explanation: "`synchronized` enforces mutual exclusion. Only one thread can enter a synchronized method of an object instance at a time, acquiring the monitor lock and protecting shared state.",
      difficulty: "medium"
    },
    {
      id: "th_7",
      type: "practical",
      question: "What is the output of the following Java code snippet involving thread execution?",
      code: `public class ThreadTest {
    private static volatile boolean flag = false;
    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            while (!flag) {}
            System.out.println("T1 ");
        }).start();
        Thread.sleep(100);
        flag = true;
        System.out.println("Main ");
    }
}`,
      options: [
        "It will print 'Main ' and the program will hang indefinitely.",
        "It will print 'Main ' followed by 'T1 ' and terminate.",
        "It will print 'T1 ' followed by 'Main '.",
        "It will throw an InterruptedException immediately."
      ],
      answer: 1,
      explanation: "The `volatile` keyword guarantees visibility of changes to variables across threads. When the main thread writes `flag = true`, the worker thread immediately reads it from main memory, exits the loop, and prints 'T1 '.",
      difficulty: "hard"
    },
    {
      id: "th_8",
      type: "theory",
      question: "What is a 'Deadlock' in multithreading?",
      options: [
        "A thread that has completed execution.",
        "A situation where two or more threads are blocked forever, each waiting for a lock held by another thread in the group.",
        "A crash of the JVM heap.",
        "An infinite loop in a run method."
      ],
      answer: 1,
      explanation: "A deadlock occurs when Thread 1 holds Lock A and waits for Lock B, while Thread 2 holds Lock B and waits for Lock A. Both wait indefinitely, freezing the application.",
      difficulty: "medium"
    },
    {
      id: "th_9",
      type: "practical",
      question: "How does the wait() method differ from the sleep() method?",
      options: [
        "wait() is static; sleep() is an instance method.",
        "wait() releases the monitor lock and waits for a notify() call, and must be called from a synchronized context; sleep() keeps its locks and blocks execution for a fixed duration.",
        "wait() is thread-safe; sleep() is not.",
        "They are identical methods."
      ],
      answer: 1,
      explanation: "`sleep()` pause execution but keeps held locks. `wait()` must be called from a synchronized context; it releases its lock and waits until another thread calls `notify()` or `notifyAll()` on the same monitor object.",
      difficulty: "hard"
    },
    {
      id: "th_10",
      type: "theory",
      question: "What is the purpose of the 'volatile' keyword in Java concurrency?",
      options: [
        "To lock methods from subclass access.",
        "To ensure changes to a variable are visible to all threads immediately and prevent the compiler from caching it in CPU registries.",
        "To prevent variables from being garbage collected.",
        "To copy variable references."
      ],
      answer: 1,
      explanation: "`volatile` guarantees memory visibility. Reads and writes go directly to main memory, bypassing CPU cache. It also prevents instruction reordering around the variable.",
      difficulty: "hard"
    },
    {
      id: "th_11",
      type: "practical",
      question: "What is a Daemon Thread in Java?",
      options: [
        "A thread that runs with high CPU priority.",
        "A background thread (like garbage collection) that does not prevent the JVM from exiting when all user (non-daemon) threads complete execution.",
        "A thread that manages database connections.",
        "An abstract thread class."
      ],
      answer: 1,
      explanation: "Daemon threads provide background services. The JVM exits when all non-daemon (user) threads finish, even if daemon threads are still running.",
      difficulty: "medium"
    },
    {
      id: "th_12",
      type: "practical",
      question: "Which class in java.util.concurrent package provides an atomic counter without using synchronization locks?",
      options: [
        "AtomicInteger",
        "VolatileInteger",
        "SynchronizedInteger",
        "Integer"
      ],
      answer: 0,
      explanation: "`AtomicInteger` uses CAS (Compare-And-Swap) hardware instructions to update integer values atomically, avoiding lock overhead.",
      difficulty: "medium"
    },
    {
      id: "th_13",
      type: "theory",
      question: "What is a Thread Pool, and why is it preferred over spawning new threads for every task?",
      options: [
        "A collection of threads that run sequentially.",
        "A pool of reusable worker threads that reduces the overhead of creating and destroying threads repeatedly, improving performance and resource management.",
        "A memory region inside Method Area.",
        "A thread queue that executes only static methods."
      ],
      answer: 1,
      explanation: "Spawning threads is resource-heavy. A Thread Pool keeps a set of worker threads alive, taking tasks from a queue and reusing threads to improve performance.",
      difficulty: "medium"
    },
    {
      id: "th_14",
      type: "practical",
      question: "What occurs if you call notify() when no threads are waiting on the monitor object?",
      options: [
        "Throws IllegalMonitorStateException.",
        "Nothing, the notification is ignored and lost.",
        "The next thread that calls wait() will not block.",
        "Compilation Error."
      ],
      answer: 1,
      explanation: "Calling `notify()` when no threads are waiting is a no-op; the notification is simply lost. A thread that calls `wait()` later will block normally.",
      difficulty: "hard"
    },
    {
      id: "th_15",
      type: "practical",
      question: "Why does calling wait() outside of a synchronized block throw an IllegalMonitorStateException?",
      options: [
        "It requires a try-catch block.",
        "A thread must own the monitor lock of the object before it can wait on it or notify other threads.",
        "Only static methods can call wait.",
        "It is a compiler security restriction."
      ],
      answer: 1,
      explanation: "To call `wait()`, `notify()`, or `notifyAll()`, a thread must hold the lock of that object. Calling them outside a `synchronized` block throws an `IllegalMonitorStateException` at runtime.",
      difficulty: "hard"
    }
  ],
  day23_inner_class: [
    {
      id: "ic_1",
      type: "theory",
      question: "What is an Inner Class in Java?",
      options: [
        "A class declared inside another class definition.",
        "A class imported from local packages.",
        "A class that cannot be instantiated.",
        "A private utility method."
      ],
      answer: 0,
      explanation: "An inner class is a nested class declared inside the body of another class.",
      difficulty: "easy"
    },
    {
      id: "ic_2",
      type: "theory",
      question: "What are the four types of nested classes supported in Java?",
      options: [
        "Public, Private, Protected, Default nested classes.",
        "Member Inner Class, Static Nested Class, Local Inner Class, and Anonymous Inner Class.",
        "Class, Interface, Record, and Annotation.",
        "Thread, Runnable, Process, and Executor."
      ],
      answer: 1,
      explanation: "Java has four nested class types: 1) Member Inner Class (non-static), 2) Static Nested Class, 3) Local Inner Class (defined inside methods), 4) Anonymous Inner Class (no name, defined inline).",
      difficulty: "medium"
    },
    {
      id: "ic_3",
      type: "practical",
      question: "What is the key difference between a Member Inner Class (non-static) and a Static Nested Class?",
      options: [
        "Member inner classes use more heap memory.",
        "A non-static member inner class holds an implicit reference to the outer class instance and can access all its members; a static nested class cannot access outer instance members directly without an object reference.",
        "Static nested classes cannot be instantiated.",
        "Non-static member classes cannot declare methods."
      ],
      answer: 1,
      explanation: "Non-static inner classes hold a reference to their outer class instance (enabling direct access to instance fields). Static nested classes behave like top-level classes packaged inside another and cannot access outer instance fields directly.",
      difficulty: "medium"
    },
    {
      id: "ic_4",
      type: "practical",
      question: "How do you instantiate a non-static member inner class from outside the outer class?",
      options: [
        "Outer.Inner in = new Outer.Inner();",
        "Outer.Inner in = new Outer().new Inner();",
        "Inner in = new Outer().Inner();",
        "It is impossible to instantiate inner classes externally."
      ],
      answer: 1,
      explanation: "Because a non-static inner class requires an active outer class instance, you must create the outer instance first: `Outer.Inner inner = new Outer().new Inner();`.",
      difficulty: "medium"
    },
    {
      id: "ic_5",
      type: "practical",
      question: "How do you instantiate a static nested class in Java?",
      options: [
        "Outer.Inner in = new Outer().new Inner();",
        "Outer.Inner in = new Outer.Inner();",
        "Inner in = new Inner();",
        "Using reflection constructors."
      ],
      answer: 1,
      explanation: "Static nested classes do not require an outer instance. You instantiate them directly using the outer class name: `Outer.StaticNested nested = new Outer.StaticNested();`.",
      difficulty: "medium"
    },
    {
      id: "ic_6",
      type: "practical",
      question: "What is a Local Inner Class in Java?",
      options: [
        "A class defined within package-private directories.",
        "A class declared inside a method body or block of code, visible only within that block.",
        "A class that cannot contain static variables.",
        "A class representing local file systems."
      ],
      answer: 1,
      explanation: "Local inner classes are defined inside a method. They are only visible and instantiable within that method scope.",
      difficulty: "medium"
    },
    {
      id: "ic_7",
      type: "practical",
      question: "What is a compiler restriction on local variables accessed by a local inner class?",
      options: [
        "Local variables must be declared static.",
        "Local variables must be final or 'effectively final' (not modified after declaration).",
        "Variables must be declared public.",
        "Local variables cannot be primitives."
      ],
      answer: 1,
      explanation: "To prevent state issues when a local class instance outlives the method execution, local variables accessed by the inner class must be final or effectively final.",
      difficulty: "hard"
    },
    {
      id: "ic_8",
      type: "practical",
      question: "What is an Anonymous Inner Class in Java?",
      options: [
        "A class declared inside private packages.",
        "A local inner class declared without a name, created inline to instantiate an interface or class override.",
        "A class whose name is encrypted by the compiler.",
        "An abstract class that has no constructors."
      ],
      answer: 1,
      explanation: "Anonymous inner classes have no name. They are declared and instantiated inline, overriding classes or implementing interfaces (e.g. `new Runnable() { public void run() {} }`).",
      difficulty: "medium"
    },
    {
      id: "ic_9",
      type: "practical",
      question: "What is the printed result of compiling this inner class variable reference?",
      code: `public class Outer {
    private int val = 10;
    class Inner {
        private int val = 20;
        void print() {
            System.out.println(Outer.this.val + " " + val);
        }
    }
    public static void main(String[] args) {
        new Outer().new Inner().print();
    }
}`,
      options: [
        "10 20",
        "20 20",
        "Compilation Error: Name conflict.",
        "10 10"
      ],
      answer: 0,
      explanation: "To access a shadowed field in the outer class, use `Outer.this.fieldName` (prints 10). Referencing the field directly accesses the inner class's field (prints 20). Output is `10 20`.",
      difficulty: "hard"
    },
    {
      id: "ic_10",
      type: "theory",
      question: "Why can't non-static member inner classes declare static methods or static blocks (prior to Java 16)?",
      options: [
        "They use too much memory heap.",
        "Because non-static inner classes are tied to object instances, while static members are associated with the class loading phase.",
        "Interfaces handle all static behaviors.",
        "It is a runtime safety restriction."
      ],
      answer: 1,
      explanation: "Prior to Java 16, non-static inner classes could not declare static members (except final constants) because they are tied to instance lifecycles.",
      difficulty: "hard"
    },
    {
      id: "ic_11",
      type: "practical",
      question: "What is the compiled name of the bytecode files (.class) generated for Outer and its non-static Inner class?",
      options: [
        "Outer.class and Inner.class",
        "Outer.class and Outer$Inner.class",
        "Outer.class and Outer_Inner.class",
        "Outer$Inner.class only"
      ],
      answer: 1,
      explanation: "The compiler generates separate `.class` files. For nested classes, it concatenates names using a `$` separator (e.g. `Outer$Inner.class`).",
      difficulty: "medium"
    },
    {
      id: "ic_12",
      type: "practical",
      question: "What is the compiled name of the bytecode file generated for the first anonymous inner class inside class Outer?",
      options: [
        "Outer$Anonymous.class",
        "Outer$1.class",
        "Outer_1.class",
        "Anonymous1.class"
      ],
      answer: 1,
      explanation: "Anonymous classes lack names, so the compiler identifies them using sequential numbers (e.g. `Outer$1.class`, `Outer$2.class`).",
      difficulty: "hard"
    },
    {
      id: "ic_13",
      type: "theory",
      question: "Which of the following is true about access modifiers for Member Inner Classes?",
      options: [
        "They can only be declared public.",
        "They can be declared with any of the four access modifiers (public, protected, default, private).",
        "They can only be package-private.",
        "They do not support access modifiers."
      ],
      answer: 1,
      explanation: "Since member inner classes are class members, they support all access modifiers (`public`, `protected`, default, and `private`).",
      difficulty: "medium"
    },
    {
      id: "ic_14",
      type: "practical",
      question: "Can an inner class define interfaces?",
      options: [
        "No, interfaces must be declared at the package level.",
        "Yes, inner classes can define nested interfaces, which are implicitly static.",
        "Only inside abstract inner classes.",
        "Only if they are functional."
      ],
      answer: 1,
      explanation: "Classes can define nested interfaces. Nested interfaces are implicitly `static`, meaning they can be implemented without an outer class instance.",
      difficulty: "hard"
    },
    {
      id: "ic_15",
      type: "practical",
      question: "What is the print result of this local inner class execution?",
      code: `public class Test {
    public void run() {
        class Local {
            void show() { System.out.print("L "); }
        }
        new Local().show();
    }
    public static void main(String[] args) {
        new Test().run();
    }
}`,
      options: [
        "L ",
        "Compilation Error: Local classes cannot be instantiated inside methods.",
        "Throws ClassNotFoundException.",
        "Nothing is printed."
      ],
      answer: 0,
      explanation: "The class compiles and runs successfully. The local class `Local` is declared inside `run()`, instantiated, and its method is called, printing 'L '.",
      difficulty: "medium"
    }
  ]
};
