export const javaQuestions = [
  {
    id: "ji_1",
    category: "Java",
    difficulty: "Easy",
    company: "Amazon",
    question: "What is the difference between Heap and Stack memory in Java?",
    answer: "Heap memory is used for dynamic memory allocation of Java objects and JRE classes at runtime. All objects created via the 'new' keyword reside in the heap. Stack memory, however, is thread-local and is used for static memory allocation and thread execution. It stores primitive values and temporary reference memory addresses to objects in the heap. Stack memory uses LIFO access and is much faster than heap memory.",
    followUp: "How does the JVM garbage collector interact with these memory zones?"
  },
  {
    id: "ji_2",
    category: "Java",
    difficulty: "Easy",
    company: "TCS",
    question: "Explain the difference between method overloading and overriding.",
    answer: "Method Overloading occurs within a single class and refers to defining multiple methods with the exact same name but different signatures (different parameter counts or types). It is resolved at compile-time. Method Overriding occurs in an inheritance relationship where a subclass provides its own specific implementation of a method declared in its parent class (with the exact same signature and return type). It is resolved at runtime using dynamic method dispatch.",
    followUp: "Can we override a private or static method in Java?"
  },
  {
    id: "ji_3",
    category: "Java",
    difficulty: "Medium",
    company: "Microsoft",
    question: "Why is String immutable in Java?",
    answer: "Strings are immutable in Java for several reasons:\n1. String Pool: Reusing identical string literals saves massive heap space. Immutability guarantees that modifying one reference won't affect other variables.\n2. Security: Strings are heavily used for database URLs, file paths, and networks. If strings were mutable, an attacker could change values after validation.\n3. Concurrency: Immutability makes String objects inherently thread-safe, eliminating race conditions.",
    followUp: "What is the difference between String, StringBuilder, and StringBuffer?"
  },
  {
    id: "ji_4",
    category: "Java",
    difficulty: "Medium",
    company: "Google",
    question: "What is the difference between ArrayList and LinkedList?",
    answer: "ArrayList is backed by a dynamic resizing array. It provides fast O(1) random access but slow O(N) mid-list insertions or deletions since elements must be shifted. LinkedList is backed by a doubly-linked chain of nodes. It provides O(1) insertion/deletion once the position is reached but slow O(N) random access since it must traverse sequential nodes from start or end.",
    followUp: "In what scenarios would you choose one over the other?"
  },
  {
    id: "ji_5",
    category: "Java",
    difficulty: "Hard",
    company: "Meta",
    question: "Explain HashMap's internal working in Java.",
    answer: "HashMap works on the principle of Hashing. It uses hashCode() to determine bucket positions. In case of collisions (multiple keys mapping to the same bucket index), entries are stored in a linked list structure within that bucket. Since Java 8, if a bucket's size exceeds a threshold (TREEIFY_THRESHOLD = 8), the linked list is converted into a balanced red-black tree, reducing the worst-case lookup from O(N) to O(log N).",
    followUp: "What is the load factor and how does rehashing work?"
  },
  {
    id: "ji_6",
    category: "Java",
    difficulty: "Hard",
    company: "Netflix",
    question: "What is multithreading, and how does synchronization work in Java?",
    answer: "Multithreading is the simultaneous execution of two or more threads to maximize CPU utilization. Concurrency introduces race conditions where multiple threads attempt to read and write to shared resources. Synchronization resolves this using Java monitors (or intrinsic locks). Declaring a method or block as 'synchronized' ensures that only one thread can acquire the lock of that object at a time, forcing other threads to wait in a blocked state.",
    followUp: "What is the difference between synchronized blocks and ReentrantLock?"
  },
  {
    id: "ji_7",
    category: "Java",
    difficulty: "Medium",
    company: "Oracle",
    question: "What is the difference between an Abstract Class and an Interface in Java 8?",
    answer: "An abstract class can have instance fields, constructors, and non-final fields, and supports single inheritance. An interface in Java 8 can declare default and static methods with implementations, but cannot have instance variables (only public static final constants) and supports multiple inheritance. A class can implement multiple interfaces but extend only one class.",
    followUp: "When should you design an abstract class over a functional interface?"
  },
  {
    id: "ji_8",
    category: "Java",
    difficulty: "Hard",
    company: "Uber",
    question: "Explain the 'volatile' keyword and Java Memory Model cache coherence.",
    answer: "The 'volatile' keyword guarantees visibility of changes to variables across threads. When a field is declared volatile, the compiler and runtime are notified to never cache it in CPU registers or local caches, forcing all reads and writes to go directly to main memory. It also prevents instruction reordering around the volatile read/write.",
    followUp: "Does volatile make variable increments (like count++) atomic?"
  },
  {
    id: "ji_9",
    category: "Java",
    difficulty: "Medium",
    company: "Goldman Sachs",
    question: "What is the difference between fail-fast and fail-safe iterators?",
    answer: "Fail-fast iterators (like ArrayList's iterator) throw ConcurrentModificationException immediately if the collection is structurally modified during iteration. They operate directly on the collection's internal structure. Fail-safe (or weakly consistent) iterators (like ConcurrentHashMap's iterator) operate on a clone or snapshot of the collection, allowing concurrent updates without throwing exceptions.",
    followUp: "How does the modCount field facilitate fail-fast checks?"
  },
  {
    id: "ji_10",
    category: "Java",
    difficulty: "Easy",
    company: "Infosys",
    question: "Explain Checked vs Unchecked Exceptions in Java.",
    answer: "Checked Exceptions (subclasses of Exception except RuntimeException) are verified at compile-time; the developer must declare them in the method signature or handle them in a try-catch block. Unchecked Exceptions (subclasses of RuntimeException) represent programming logic errors and do not require compile-time declarations.",
    followUp: "Why is NullPointerException classified as an unchecked exception?"
  },
  {
    id: "ji_11",
    category: "Java",
    difficulty: "Hard",
    company: "IBM",
    question: "Compare Garbage Collection algorithms G1GC and ZGC.",
    answer: "G1GC splits the heap into equal-sized regions and performs generational garbage collection prioritising regions with the most garbage (Garbage First) with pause times of ~200ms. ZGC (Z Garbage Collector) is a low-latency concurrent garbage collector designed for massive heaps, executing compaction phases concurrently with application threads using load barriers, keeping pause times under 10ms.",
    followUp: "How does generation classification help optimize garbage collection?"
  },
  {
    id: "ji_12",
    category: "Java",
    difficulty: "Medium",
    company: "Salesforce",
    question: "What is a Functional Interface and how does it relate to Lambda Expressions?",
    answer: "A Functional Interface is an interface containing exactly one abstract method (can contain multiple default/static methods). It is annotated with @FunctionalInterface. Lambda expressions provide concrete inline implementations of this single abstract method, treating code as a first-class citizen and allowing functional-style programming in Java.",
    followUp: "What are some built-in functional interfaces in java.util.function?"
  },
  {
    id: "ji_13",
    category: "Java",
    difficulty: "Hard",
    company: "Twitter",
    question: "Explain the Java Executor Framework and ThreadPoolExecutor parameters.",
    answer: "The Executor Framework separates thread creation and management from execution logic. ThreadPoolExecutor relies on corePoolSize (active threads kept alive), maximumPoolSize (max allowed concurrent threads), keepAliveTime (excess idle thread survival duration), and a WorkQueue (BlockingQueue storing queued tasks waiting for executing threads).",
    followUp: "What happens when the work queue is full and core threads are saturated?"
  },
  {
    id: "ji_14",
    category: "Java",
    difficulty: "Medium",
    company: "Cisco",
    question: "What is Serialization and what is the role of the 'transient' keyword?",
    answer: "Serialization converts an object's state into a byte stream for storage or network transmission. The class must implement java.io.Serializable. The 'transient' keyword prevents specific fields (like passwords or temporary tokens) from being serialized; they default to null or zero values when deserialized.",
    followUp: "What is the purpose of serialVersionUID?"
  },
  {
    id: "ji_15",
    category: "Java",
    difficulty: "Hard",
    company: "Adobe",
    question: "Explain the ClassLoader subsystem delegation model.",
    answer: "The ClassLoader subsystem uses the Delegation Model: Bootstrap ClassLoader loads core classes, Extension ClassLoader loads extensions, and Application ClassLoader loads classpath classes. When loading a class, the child classloader delegates the request to its parent first. The child only loads it if all parent classloaders fail to locate it.",
    followUp: "How can you break the delegation model in custom ClassLoaders?"
  },
  {
    id: "ji_16",
    category: "Java",
    difficulty: "Medium",
    company: "JPMorgan",
    question: "Explain the difference between HashMap, Hashtable, and ConcurrentHashMap.",
    answer: "HashMap is non-synchronized, not thread-safe, and allows one null key and multiple null values. Hashtable is legacy, fully synchronized on the entire table lock, and does not allow nulls (slow performance in multi-threaded code). ConcurrentHashMap (introduced in Java 5) uses bucket-level locking (segment locking in Java 7, CAS + synchronized on bucket heads in Java 8), allowing concurrent reads without locking and parallel writes without blocking the entire map.",
    followUp: "Why does ConcurrentHashMap not allow null keys or null values?"
  },
  {
    id: "ji_17",
    category: "Java",
    difficulty: "Easy",
    company: "JPMorgan",
    question: "What are Java Streams, and how do intermediate operations differ from terminal operations?",
    answer: "Java Streams (introduced in Java 8) process sequences of elements in a functional style. Intermediate operations (like map, filter, sorted) are lazy; they return a new stream and do not execute until a terminal operation is called. Terminal operations (like collect, forEach, reduce) are eager; they consume the stream, trigger the lazy intermediate processing, and produce a result or side-effect, closing the stream.",
    followUp: "Can you reuse a stream after a terminal operation has been executed?"
  },
  {
    id: "ji_18",
    category: "Java",
    difficulty: "Medium",
    company: "Walmart",
    question: "Explain the difference between Runnable and Callable interfaces in Java.",
    answer: "Both represent tasks executed by threads. Runnable contains a run() method that returns void and cannot throw checked exceptions. Callable (introduced in Java 5) contains a call() method that returns a generic Future result (V) and can throw checked exceptions directly. Callable tasks are submitted to ExecutorService, returning a Future object to track completion and retrieve results.",
    followUp: "How does Future.get() behave when the thread has not finished executing?"
  },
  {
    id: "ji_19",
    category: "Java",
    difficulty: "Hard",
    company: "Apple",
    question: "What is a Memory Leak in Java, and how do you detect and fix it?",
    answer: "A memory leak occurs when objects are no longer needed by the application but remain referenced by active objects, preventing the Garbage Collector from reclaiming their space. Common causes include unused static fields, unclosed database connections/streams, active ThreadLocals, or missing hashCode/equals in HashMaps. Detection is done using profilers (VisualVM, JProfiler) or heap dumps. Fixes include clearing references, using WeakReferences, and using try-with-resources.",
    followUp: "How does a WeakHashMap help prevent memory leaks compared to a standard HashMap?"
  },
  {
    id: "ji_20",
    category: "Java",
    difficulty: "Hard",
    company: "Cisco",
    question: "Explain the difference between SynchronousQueue, LinkedBlockingQueue, and ArrayBlockingQueue.",
    answer: "ArrayBlockingQueue is backed by a bounded array, requiring a fixed size, and uses single/multiple locks for synchronization. LinkedBlockingQueue can be bounded or unbounded, backed by linked nodes, and uses separate locks for put and take operations, leading to higher throughput. SynchronousQueue has zero capacity; each insert must wait for a corresponding remove operation by another thread, facilitating direct handoffs.",
    followUp: "In what scenario does CachedThreadPool use SynchronousQueue internally?"
  },
  {
    id: "ji_21",
    category: "Java",
    difficulty: "Medium",
    company: "Oracle",
    question: "Explain the difference between System.gc() and Runtime.getRuntime().gc(). Is it guaranteed to run?",
    answer: "Both calls are equivalent and serve as a request to the JVM to run the garbage collector. System.gc() internally calls Runtime.getRuntime().gc(). However, there is absolutely no guarantee that the JVM will run the GC immediately or at all; it is merely a hint or recommendation to the JRE, which can choose to ignore it based on current system resource allocations.",
    followUp: "Which JVM flag can be used to disable System.gc() calls entirely?"
  },
  {
    id: "ji_22",
    category: "Java",
    difficulty: "Easy",
    company: "Capgemini",
    question: "What is the difference between equals() and == in Java?",
    answer: "== is a binary operator used to compare primitive values for equality or object references to check if they point to the exact same memory address on the heap. The equals() method is defined in the Object class and is designed to compare the actual state or content of two objects (structural equality). By default, equals() behaves like ==, so it must be overridden to provide value comparison.",
    followUp: "Why must you override hashCode() whenever you override equals()"
  },
  {
    id: "ji_23",
    category: "Java",
    difficulty: "Hard",
    company: "Salesforce",
    question: "What is Java Reflection API, and what are its pros and cons in enterprise systems?",
    answer: "Reflection allows a Java program to inspect, modify, and instantiate classes, fields, methods, and constructors at runtime, bypassing compile-time checks. Pros: Enables dynamic frameworks (like Spring, Hibernate) to configure classes automatically. Cons: High performance overhead due to dynamic resolution, security risks (can access private members), and loss of compile-time type safety.",
    followUp: "How can you prevent reflection from breaking a Singleton design pattern?"
  },
  {
    id: "ji_24",
    category: "Java",
    difficulty: "Medium",
    company: "Google",
    question: "Explain the difference between Final, Finally, and Finalize in Java.",
    answer: "1. final: A keyword used to make a variable constant, prevent method overriding, or prevent class inheritance.\n2. finally: A block used in try-catch-finally exception handling to execute cleanup code (like closing files or sockets) regardless of whether an exception is thrown or caught.\n3. finalize: A deprecated method in Object class called by the Garbage Collector before reclaiming an object's memory (not guaranteed to run and should be avoided).",
    followUp: "Why was finalize() deprecated in Java 9, and what are the alternatives?"
  },
  {
    id: "ji_25",
    category: "Java",
    difficulty: "Hard",
    company: "Goldman Sachs",
    question: "What are Java Records and Sealed Classes introduced in modern Java versions?",
    answer: "Java Records (introduced in Java 14/16) are a special kind of class designed to hold immutable data, auto-generating getters, equals(), hashCode(), and toString() boilerplate. Sealed Classes (introduced in Java 15/17) restrict which other classes or interfaces may extend or implement them, allowing developers to define closed, switch-compatible class hierarchies.",
    followUp: "How do sealed classes improve security and pattern matching in Java?"
  }
];

export const dsaQuestions = [
  {
    id: "dsi_1",
    category: "DSA",
    difficulty: "Easy",
    company: "Google",
    question: "How does binary search work?",
    answer: "Binary Search is a divide-and-conquer searching algorithm that operates on a pre-sorted array. It compares the target value to the middle element. If they are equal, the index is returned. If the target is smaller, the search continues in the left half; if larger, in the right. This halves the search space at each iteration, resulting in a fast O(log N) time complexity compared to O(N) linear scans.",
    followUp: "What is a potential overflow bug when calculating mid, and how do we prevent it?"
  },
  {
    id: "dsi_2",
    category: "DSA",
    difficulty: "Medium",
    company: "Amazon",
    question: "What is the time complexity of QuickSort in best, average, and worst cases?",
    answer: "QuickSort uses a partition-based divide-and-conquer strategy.\n1. Best and Average Cases: O(N log N) when the pivot divides the array roughly in half at each step.\n2. Worst Case: O(N^2) when the array is already sorted (or reverse sorted) and the smallest or largest element is consistently picked as the pivot, leading to highly skewed recursion branches.",
    followUp: "How can we avoid the O(N^2) worst-case time complexity in QuickSort?"
  },
  {
    id: "dsi_3",
    category: "DSA",
    difficulty: "Easy",
    company: "Apple",
    question: "What is the key difference between a Stack and a Queue?",
    answer: "A Stack is a Last-In-First-Out (LIFO) data structure where elements are pushed and popped from the same end (top). A Queue is a First-In-First-Out (FIFO) data structure where elements are inserted at the back (enqueue) and removed from the front (dequeue). Stacks are used for recursive call simulation, backtracking, and depth-first searches, whereas Queues are used for buffering, task scheduling, and breadth-first searches.",
    followUp: "How do you implement a Queue using two Stacks?"
  },
  {
    id: "dsi_4",
    category: "DSA",
    difficulty: "Medium",
    company: "Microsoft",
    question: "When would you use a HashMap vs a TreeMap in system design?",
    answer: "HashMap provides O(1) average time complexity for basic operations (get, put, delete) but does not guarantee any iteration order. It is backed by a hash table. TreeMap guarantees O(log N) time complexity and maintains elements in sorted order based on key comparisons. It is backed by a Red-Black tree. Choose HashMap for maximum search speed and TreeMap when sorted traversal or range queries (sub-maps) are required.",
    followUp: "What are the space complexities of both structures?"
  },
  {
    id: "dsi_5",
    category: "DSA",
    difficulty: "Hard",
    company: "Meta",
    question: "Explain recursion with a call stack example and the risk of stack overflow.",
    answer: "Recursion is a process in which a method calls itself to solve smaller subproblems, relying on a base case to terminate. Every recursive call pushes a new frame onto the JRE execution call stack containing local variables and return addresses. If the recursion depth is too high or the base case is missing, the JVM runs out of stack frame memory, throwing a StackOverflowError. This can be prevented using tail-recursion optimization or iterative implementations.",
    followUp: "What is memoization and how does it optimize recursive algorithms?"
  },
  {
    id: "dsi_6",
    category: "DSA",
    difficulty: "Hard",
    company: "Google",
    question: "Explain Dijkstra's shortest path algorithm.",
    answer: "Dijkstra's algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights. It maintains a set of visited nodes and a priority queue of distances. At each step, it extracts the node with the minimum distance, visits its unvisited neighbors, and relaxes their edge distances, running in O((V + E) log V) time.",
    followUp: "Why does Dijkstra's fail when negative edge weights are present?"
  },
  {
    id: "dsi_7",
    category: "DSA",
    difficulty: "Medium",
    company: "Amazon",
    question: "How do you detect a cycle in a directed vs undirected graph?",
    answer: "In a directed graph, we use DFS and track visited nodes in the current recursion stack (back-edges) or use Kahn's topological sort (cycles prevent in-degrees from reaching zero). In an undirected graph, we can use DFS/BFS (if a neighbor is already visited and is not the direct parent node, a cycle exists) or the Disjoint Set Union (DSU) algorithm.",
    followUp: "What is the time complexity of cycle detection using DSU?"
  },
  {
    id: "dsi_8",
    category: "DSA",
    difficulty: "Medium",
    company: "LinkedIn",
    question: "Compare Merge Sort and Quick Sort time/space complexities.",
    answer: "Merge Sort guarantees O(N log N) time in all cases but requires O(N) extra helper space for merging. It is stable. Quick Sort has O(N log N) average time and O(log N) auxiliary recursion space (in-place), but has an O(N^2) worst-case time and is unstable. Quick Sort is typically faster in practice due to localized cache reference access.",
    followUp: "Which sort is preferred for sorting LinkedLists and why?"
  },
  {
    id: "dsi_9",
    category: "DSA",
    difficulty: "Medium",
    company: "Uber",
    question: "Explain the difference between Dynamic Programming and Greedy algorithms.",
    answer: "Dynamic Programming (DP) solves problems by breaking them into overlapping subproblems, solving them once, and saving their solutions (memoization/tabulation). It guarantees global optimality. Greedy algorithms make the locally optimal choice at each stage in the hope of finding a global optimum. Greedy is faster O(N) but only works if the problem exhibits the greedy choice property.",
    followUp: "Explain a classic problem solvable by Greedy but NOT by dynamic programming?"
  },
  {
    id: "dsi_10",
    category: "DSA",
    difficulty: "Hard",
    company: "Salesforce",
    question: "Design an LRU Cache with constant time operations.",
    answer: "An Least Recently Used (LRU) Cache supports get(key) and put(key, value) in O(1) time. This is implemented using a combination of a Doubly Linked List (DLL) and a HashMap. The HashMap provides O(1) node lookup. The DLL maintains the access order: when a key is accessed or added, its corresponding node is moved to the head of the DLL. The tail of the DLL represents the LRU node, which is evicted when capacity is exceeded.",
    followUp: "How do you make this LRU Cache design thread-safe?"
  },
  {
    id: "dsi_11",
    category: "DSA",
    difficulty: "Hard",
    company: "Intel",
    question: "Explain the difference between a Binary Search Tree (BST) and an AVL Tree.",
    answer: "A Binary Search Tree (BST) stores elements such that left descendants are smaller and right descendants are larger. It can skew into an O(N) linear chain in the worst case. An AVL Tree is a self-balancing BST where the height difference (balance factor) between left and right subtrees of any node cannot exceed 1. AVL guarantees O(log N) heights through single or double rotations during insertions/deletions.",
    followUp: "How does an AVL Tree compare with a Red-Black Tree in lookup vs insertion performance?"
  },
  {
    id: "dsi_12",
    category: "DSA",
    difficulty: "Easy",
    company: "TCS",
    question: "How do you find the middle of a Singly LinkedList in a single pass?",
    answer: "This is solved using the Fast and Slow pointer technique (Tortoise and Hare). We initialize two pointers at the head of the LinkedList. The slow pointer moves one step at a time (`slow = slow.next`), while the fast pointer moves two steps at a time (`fast = fast.next.next`). When the fast pointer reaches the end of the list, the slow pointer will be pointing to the exact middle node.",
    followUp: "How does this technique help in detecting a cycle in a LinkedList?"
  },
  {
    id: "dsi_13",
    category: "DSA",
    difficulty: "Medium",
    company: "Microsoft",
    question: "Explain the Trie (Prefix Tree) data structure and its common use cases.",
    answer: "A Trie is a tree-like data structure used to store a dynamic set of strings, where keys are usually strings. Each node represents a single character, and steps down the branch build prefix strings. Common use cases include search engine autocomplete suggest queries, spell checkers, and IP routing prefix matches, providing fast O(L) searches where L is the query string length.",
    followUp: "What is the space complexity of a Trie with N words of average length L?"
  },
  {
    id: "dsi_14",
    category: "DSA",
    difficulty: "Hard",
    company: "Airbnb",
    question: "Explain Topological Sorting and Kahn's algorithm.",
    answer: "Topological Sorting of a Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v. Kahn's algorithm implements this by calculating the in-degree of all nodes, pushing nodes with in-degree 0 into a queue, and iteratively decrementing neighbors' in-degrees as nodes are popped, appending completed nodes to the output.",
    followUp: "What happens if Kahn's algorithm encounters a graph with a cycle?"
  },
  {
    id: "dsi_15",
    category: "DSA",
    difficulty: "Hard",
    company: "Google",
    question: "Explain the Dynamic Programming approach to find the Longest Common Subsequence (LCS).",
    answer: "To find the LCS of two strings S1 and S2 of length M and N, we build a 2D table `dp[M+1][N+1]`. `dp[i][j]` stores the length of LCS for prefixes S1[0...i-1] and S2[0...j-1]. If `S1[i-1] == S2[j-1]`, then `dp[i][j] = dp[i-1][j-1] + 1`. If they differ, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`. The final answer is in `dp[M][N]`, running in O(M*N) time and space.",
    followUp: "How can you optimize the space complexity of the LCS DP approach to O(N)?"
  },
  {
    id: "dsi_16",
    category: "DSA",
    difficulty: "Medium",
    company: "Facebook",
    question: "Explain the Sliding Window technique with a real-world coding problem example.",
    answer: "The Sliding Window technique optimizes nested loop searches over arrays/strings to O(N) linear time. It maintains a window of elements defined by two pointers (start and end). As the end pointer expands, the window grows. If a constraint is violated, the start pointer shrinks the window. A classic example is 'Longest Substring Without Repeating Characters', where the window expands for unique characters and shrinks when a duplicate is hit.",
    followUp: "What is the difference between a fixed-size and dynamic-size sliding window?"
  },
  {
    id: "dsi_17",
    category: "DSA",
    difficulty: "Hard",
    company: "Netflix",
    question: "How do you solve the 0/1 Knapsack problem using Dynamic Programming?",
    answer: "For N items with weights and values, and capacity W, we build a 2D table `dp[N+1][W+1]`. `dp[i][j]` represents the max value using a subset of the first `i` items with a capacity limit of `j`. For each item, we decide to either exclude it (`dp[i-1][j]`) or include it (if weight <= j, value + `dp[i-1][j - weight]`). The recurrence is `dp[i][j] = max(exclude, include)`. The final answer is in `dp[N][W]`, running in O(N*W) time.",
    followUp: "How can you optimize the space complexity of this DP table to O(W)?"
  },
  {
    id: "dsi_18",
    category: "DSA",
    difficulty: "Medium",
    company: "Adobe",
    question: "What is the difference between Depth First Search (DFS) and Breadth First Search (BFS) in Graph Traversal?",
    answer: "DFS explores as deep as possible along each branch before backtracking, utilizing a Stack (or recursion). BFS explores all neighbor nodes at the current depth before moving to the next level, utilizing a Queue. DFS is preferred for pathfinding, topological sorting, and cycle detection in DAGs. BFS is preferred for finding the shortest path in unweighted graphs.",
    followUp: "Compare the space complexities of DFS and BFS on a tree of height H and branching factor B."
  },
  {
    id: "dsi_19",
    category: "DSA",
    difficulty: "Hard",
    company: "ByteDance",
    question: "How do you find the Lowest Common Ancestor (LCA) of two nodes in a Binary Tree?",
    answer: "We traverse the tree recursively. If the current root is null or matches either target node p or q, we return root. We recursively search left and right subtrees. If both left and right recursive calls return non-null, it means p and q are split across the current node, making it the LCA. Otherwise, we return the non-null result (whichever subtree contains the nodes), running in O(N) time.",
    followUp: "How does the LCA lookup optimize if the tree is a Binary Search Tree (BST)?"
  },
  {
    id: "dsi_20",
    category: "DSA",
    difficulty: "Hard",
    company: "Uber",
    question: "How does the Heap Sort algorithm work, and what is its time/space complexity?",
    answer: "Heap Sort first builds a Max-Heap from the input array in O(N) time. It then repeatedly swaps the root element (maximum value) with the last element of the unsorted subarray, decrements the active heap size, and calls heapify() on the root to restore heap properties in O(log N). This process repeats until the heap size is 1. Heap Sort runs in O(N log N) time in best, average, and worst cases, and requires O(1) auxiliary space (in-place).",
    followUp: "Is Heap Sort a stable sorting algorithm? Why or why not?"
  },
  {
    id: "dsi_21",
    category: "DSA",
    difficulty: "Medium",
    company: "Twitter",
    question: "Explain the difference between a Hash Collision and a Hash Flood Attack.",
    answer: "A hash collision occurs when two distinct keys hash to the exact same bucket index. This is normal and handled via chaining or open addressing. A Hash Flood Attack is a security vulnerability where an attacker craftily submits thousands of parameters that intentionally map to the *exact same* hash bucket, forcing lookups from O(1) average to O(N) worst-case linear traversal, exhausting CPU and causing a Denial of Service (DoS).",
    followUp: "How did Java 8 HashMap mitigate Hash Flood Attacks using Red-Black Trees?"
  },
  {
    id: "dsi_22",
    category: "DSA",
    difficulty: "Easy",
    company: "eBay",
    question: "What is the difference between a circular linked list and a doubly linked list?",
    answer: "A Doubly Linked List has nodes containing two reference pointers: 'next' (pointing to the succeeding node) and 'prev' (pointing to the preceding node). A Circular Linked List can be singly or doubly linked, but its distinguishing feature is that the tail node's next pointer links directly back to the head node (and in circular doubly, head's prev points to the tail), creating a closed loop.",
    followUp: "In what operating system subsystem is a circular linked list commonly used?"
  },
  {
    id: "dsi_23",
    category: "DSA",
    difficulty: "Medium",
    company: "Bloomberg",
    question: "How do you merge two sorted arrays without using any extra space?",
    answer: "Assuming array1 has size M+N (with N empty spaces at the end) and array2 has size N, we use a three-pointer approach. We place pointer1 at the last active element of array1 (M-1), pointer2 at the last element of array2 (N-1), and writePointer at the end of array1 (M+N-1). We compare elements from the back and copy the larger one to the writePointer, decrementing indices. If pointer2 still has elements, we copy them directly.",
    followUp: "What is the time complexity of this merge process?"
  },
  {
    id: "dsi_24",
    category: "DSA",
    difficulty: "Hard",
    company: "VMware",
    question: "Explain the KMP (Knuth-Morris-Pratt) string matching algorithm and the prefix function.",
    answer: "KMP is a pattern matching algorithm that searches for a pattern of length M in a text of length N in O(N+M) time. It avoids redundant comparisons by pre-computing a Longest Prefix Suffix (LPS) table for the pattern. The LPS array stores the length of the longest proper prefix that is also a suffix. When a mismatch occurs, KMP uses LPS values to shift the pattern pointer, bypassing already matched characters.",
    followUp: "How does KMP compare with the Rabin-Karp algorithm?"
  },
  {
    id: "dsi_25",
    category: "DSA",
    difficulty: "Hard",
    company: "Microsoft",
    question: "Explain the concept of amortized time complexity with an example.",
    answer: "Amortized analysis computes the average time taken per operation over a worst-case sequence of operations. Even if a single operation is occasionally expensive (O(N)), the average cost remains cheap (O(1)). A classic example is ArrayList's add() operation. Most inserts are O(1) because space is available. When the array fills up, resizing takes O(N) copying time, but since resizing happens dynamically at double intervals, the amortized cost per add is O(1).",
    followUp: "What are the three common methods for computing amortized complexity?"
  }
];

export const hrQuestions = [
  {
    id: "hr_1",
    category: "HR",
    difficulty: "Easy",
    company: "Google",
    question: "Tell me about yourself.",
    answer: "This is an opportunity to pitch your professional story. Structure your response using the Past-Present-Future framework:\n1. Present: Highlight your current role, key technical stack (e.g. Java, React, DSA expertise), and core accomplishments.\n2. Past: Briefly mention how you developed your passion for software engineering (university or projects).\n3. Future: Explain why you are excited about this specific role and how it aligns with your career path.",
    followUp: "How do your technical strengths align with our company's mission?"
  },
  {
    id: "hr_2",
    category: "HR",
    difficulty: "Medium",
    company: "Amazon",
    question: "Describe a challenging situation you handled and how you resolved it.",
    answer: "Use the STAR method (Situation, Task, Action, Result) to structure your response:\n1. Situation: Describe a complex problem or project bottleneck (e.g. race conditions in multithreaded systems, critical production bug).\n2. Task: Explain your responsibility in resolving this dilemma.\n3. Action: Detail the structured steps you took (profiling, team communication, implementation adjustments).\n4. Result: Share positive outcomes with metrics (e.g., decreased page loading latency by 30%, resolved the race condition entirely).",
    followUp: "What did you learn from this situation that you apply today?"
  },
  {
    id: "hr_3",
    category: "HR",
    difficulty: "Easy",
    company: "Meta",
    question: "Why should we hire you?",
    answer: "Align your answer with the employer's exact needs. Emphasize three main points:\n1. Technical Alignment: Your solid knowledge in Java, OOPs patterns, and algorithmic optimization (DSA).\n2. Problem-Solving Skill: Your structured, critical thinking demonstrated in resolving complex challenges.\n3. Cultural Fit: Your enthusiasm for collaborative pair-programming, continuous learning, and driving product quality.",
    followUp: "What unique perspective or skill do you bring to our team?"
  },
  {
    id: "hr_4",
    category: "HR",
    difficulty: "Hard",
    company: "Microsoft",
    question: "Explain a failure in your professional life and what you learned from it.",
    answer: "Honesty and self-reflection are critical here. Pick a real, minor technical or process failure:\n1. Describe the failure: (e.g., deploying a feature that overlooked a critical edge case, causing a temporary service interruption).\n2. Take ownership: Do not blame other team members or external tools.\n3. Detail the correction: How you immediately jumped in, debugged, resolved the issue, and added comprehensive automated coverage.\n4. Share the lesson: Explain how that experience taught you the importance of edge-case coverage and robust testing standards.",
    followUp: "How has that lesson changed your development workflow since then?"
  },
  {
    id: "hr_5",
    category: "HR",
    difficulty: "Medium",
    company: "Meta",
    question: "How do you handle conflict or differing opinions with a teammate?",
    answer: "I handle conflict constructively by decoupling personal feelings from professional goals. First, I schedule a 1-on-1 to listen and understand their reasoning without interrupting. Second, we lay out both arguments objectively, comparing tradeoffs (e.g., performance vs. implementation speed). If we still disagree, we seek inputs from a senior architect or reference standard benchmarks, prioritizing project success over individual egos.",
    followUp: "Can you share a real-world example where you had to disagree and commit?"
  },
  {
    id: "hr_6",
    category: "HR",
    difficulty: "Medium",
    company: "Apple",
    question: "How do you manage tight deadlines or high-pressure deliveries?",
    answer: "I manage pressure by utilizing careful prioritization and clear communication. I break tasks into granular deliverables, identify dependencies, and focus on the critical path. If I identify that a deadline is at risk, I notify key stakeholders immediately with alternative solutions (e.g. trimming scope, moving non-critical tasks to the next sprint) rather than rushing and introducing bugs.",
    followUp: "How do you maintain code quality when pressure is high?"
  },
  {
    id: "hr_7",
    category: "HR",
    difficulty: "Easy",
    company: "TCS",
    question: "Why do you want to join our company?",
    answer: "I want to join your company because of its strong learning culture, vast global footprint, and the scale of problems solved here. I am particularly excited about the digital transformation projects you drive, which allow engineers to work on modern tech stacks and solve real-world problems for millions of users worldwide.",
    followUp: "How do you see yourself contributing to our global delivery model?"
  },
  {
    id: "hr_8",
    category: "HR",
    difficulty: "Easy",
    company: "LinkedIn",
    question: "Where do you see yourself in 5 years?",
    answer: "In 5 years, I see myself growing into a Senior Software Engineer or Technical Lead role, where I can take ownership of large-scale system designs and architectural blueprints. I plan to continue mastering backend optimization (specifically Java, JRE dynamics, and distributed databases) while mentoring junior developers to foster high engineering standards.",
    followUp: "Are you more interested in technical leadership or engineering management?"
  },
  {
    id: "hr_9",
    category: "HR",
    difficulty: "Hard",
    company: "Netflix",
    question: "How would you give constructive feedback to a senior developer or team lead?",
    answer: "I focus on objective facts rather than subjective blame. First, I request a private 1-on-1. Second, I frame the feedback around the impact on the codebase or team productivity. For example, instead of saying 'Your designs are too complex', I say, 'I noticed that this pattern makes onboarding new developers take longer; maybe we could simplify it to reduce cognitive overhead.' This keeps it constructive and collaborative.",
    followUp: "What would you do if the senior developer dismissed your feedback?"
  },
  {
    id: "hr_10",
    category: "HR",
    difficulty: "Hard",
    company: "Stripe",
    question: "How do you balance technical debt vs delivering features quickly?",
    answer: "It is a balance of immediate value and long-term sustainability. For fast delivery, I may take calculated shortcuts, but I immediately log the refactoring tasks in the backlog. I advocate for allocating ~20% of every sprint's capacity to resolving tech debt, demonstrating to product managers that resolving code smells reduces future bug rates and speeds up feature deliveries over time.",
    followUp: "How do you quantify the cost of technical debt to non-technical stakeholders?"
  },
  {
    id: "hr_11",
    category: "HR",
    difficulty: "Medium",
    company: "Amazon",
    question: "Tell me about a time you worked under a vague or ambiguous requirement. How did you proceed?",
    answer: "Under ambiguity, I avoid making assumptions. First, I gather the core stakeholders (product owners or technical architects) to align on the project's success metrics. Second, I create a brief design document detailing alternative approaches and seek feedback. Third, I build a small, functional proof-of-concept (POC) to validate requirements early and iterate based on real feedback, reducing the risk of wasting development hours.",
    followUp: "How did you handle developer-product communication in that project?"
  },
  {
    id: "hr_12",
    category: "HR",
    difficulty: "Hard",
    company: "Apple",
    question: "How do you handle a situation where a team member is not pulling their weight or meeting expectations?",
    answer: "I address the issue with empathy and direct communication. I start with a private 1-on-1 to understand if they are facing personal blockers, technical roadblocks, or burnout. I offer collaborative pair-programming to help them clear immediate hurdles. If the pattern persists, I work with them to document a clear division of tasks with intermediate checkpoints, and if necessary, escalate to the team lead to address resource allocation.",
    followUp: "How do you maintain team morale when one developer is underperforming?"
  },
  {
    id: "hr_13",
    category: "HR",
    difficulty: "Medium",
    company: "Google",
    question: "Describe a time you had to learn a new technology or domain very quickly to deliver a project.",
    answer: "In a previous project, we had to migrate a search service to Elasticsearch, a tool I hadn't used. I set up a structured learning plan: 1. Read core docs on indexes and queries for 2 days. 2. Created a local sandbox container to run hands-on tests. 3. Looked at existing patterns and paired with a senior engineer. Within a week, I successfully built and tested the indexing queries, delivering the feature on schedule.",
    followUp: "How do you filter which resources to trust when learning a new tool?"
  },
  {
    id: "hr_14",
    category: "HR",
    difficulty: "Hard",
    company: "Microsoft",
    question: "How do you handle a scenario where you disagree with a technical decision made by your manager or team lead?",
    answer: "I practice 'disagree and commit'. First, I prepare a clear, objective analysis of the options, comparing trade-offs like scalability, development time, and code maintenance. I present this to my manager in a constructive 1-on-1. If they still decide on the alternative direction (due to budget or deadlines), I accept the decision fully and execute it to the absolute best of my ability, without holding any resentment.",
    followUp: "Have you ever been proven right after disagreeing and committing? How did you react?"
  },
  {
    id: "hr_15",
    category: "HR",
    difficulty: "Medium",
    company: "Meta",
    question: "How do you keep yourself updated with the latest software engineering practices and technologies?",
    answer: "I allocate consistent time weekly for professional learning. I follow tech blogs (like Netflix Tech Blog, Engineering at Meta), subscribe to newsletters (like Pointer or InfoQ), and read documentation for tools we use. I also work on personal projects where I experiment with new frameworks, library versions, or concurrency models, ensuring my hands-on skills remain sharp.",
    followUp: "What is a recent technical trend or tool that you are excited about?"
  }
];
