export const javaQuestions = [
  {
    id: "ji_1",
    category: "Java",
    difficulty: "Easy",
    question: "What is the difference between Heap and Stack memory in Java?",
    answer: "Heap memory is used for dynamic memory allocation of Java objects and JRE classes at runtime. All objects created via the 'new' keyword reside in the heap. Stack memory, however, is thread-local and is used for static memory allocation and thread execution. It stores primitive values and temporary reference memory addresses to objects in the heap. Stack memory uses LIFO access and is much faster than heap memory.",
    followUp: "How does the JVM garbage collector interact with these memory zones?"
  },
  {
    id: "ji_2",
    category: "Java",
    difficulty: "Easy",
    question: "Explain the difference between method overloading and overriding.",
    answer: "Method Overloading occurs within a single class and refers to defining multiple methods with the exact same name but different signatures (different parameter counts or types). It is resolved at compile-time. Method Overriding occurs in an inheritance relationship where a subclass provides its own specific implementation of a method declared in its parent class (with the exact same signature and return type). It is resolved at runtime using dynamic method dispatch.",
    followUp: "Can we override a private or static method in Java?"
  },
  {
    id: "ji_3",
    category: "Java",
    difficulty: "Medium",
    question: "Why is String immutable in Java?",
    answer: "Strings are immutable in Java for several reasons:\n1. String Pool: Reusing identical string literals saves massive heap space. Immutability guarantees that modifying one reference won't affect other variables.\n2. Security: Strings are heavily used for database URLs, file paths, and networks. If strings were mutable, an attacker could change values after validation.\n3. Concurrency: Immutability makes String objects inherently thread-safe, eliminating race conditions.",
    followUp: "What is the difference between String, StringBuilder, and StringBuffer?"
  },
  {
    id: "ji_4",
    category: "Java",
    difficulty: "Medium",
    question: "What is the difference between ArrayList and LinkedList?",
    answer: "ArrayList is backed by a dynamic resizing array. It provides fast O(1) random access but slow O(N) mid-list insertions or deletions since elements must be shifted. LinkedList is backed by a doubly-linked chain of nodes. It provides O(1) insertion/deletion once the position is reached but slow O(N) random access since it must traverse sequential nodes from start or end.",
    followUp: "In what scenarios would you choose one over the other?"
  },
  {
    id: "ji_5",
    category: "Java",
    difficulty: "Hard",
    question: "Explain HashMap's internal working in Java.",
    answer: "HashMap works on the principle of Hashing. It uses hashCode() to determine bucket positions. In case of collisions (multiple keys mapping to the same bucket index), entries are stored in a linked list structure within that bucket. Since Java 8, if a bucket's size exceeds a threshold (TREEIFY_THRESHOLD = 8), the linked list is converted into a balanced red-black tree, reducing the worst-case lookup from O(N) to O(log N).",
    followUp: "What is the load factor and how does rehashing work?"
  },
  {
    id: "ji_6",
    category: "Java",
    difficulty: "Hard",
    question: "What is multithreading, and how does synchronization work in Java?",
    answer: "Multithreading is the simultaneous execution of two or more threads to maximize CPU utilization. Concurrency introduces race conditions where multiple threads attempt to read and write to shared resources. Synchronization resolves this using Java monitors (or intrinsic locks). Declaring a method or block as 'synchronized' ensures that only one thread can acquire the lock of that object at a time, forcing other threads to wait in a blocked state.",
    followUp: "What is the difference between synchronized blocks and ReentrantLock?"
  }
];

export const dsaQuestions = [
  {
    id: "dsi_1",
    category: "DSA",
    difficulty: "Easy",
    question: "How does binary search work?",
    answer: "Binary Search is a divide-and-conquer searching algorithm that operates on a pre-sorted array. It compares the target value to the middle element. If they are equal, the index is returned. If the target is smaller, the search continues in the left half; if larger, in the right. This halves the search space at each iteration, resulting in a fast O(log N) time complexity compared to O(N) linear scans.",
    followUp: "What is a potential overflow bug when calculating mid, and how do we prevent it?"
  },
  {
    id: "dsi_2",
    category: "DSA",
    difficulty: "Medium",
    question: "What is the time complexity of QuickSort in best, average, and worst cases?",
    answer: "QuickSort uses a partition-based divide-and-conquer strategy.\n1. Best and Average Cases: O(N log N) when the pivot divides the array roughly in half at each step.\n2. Worst Case: O(N^2) when the array is already sorted (or reverse sorted) and the smallest or largest element is consistently picked as the pivot, leading to highly skewed recursion branches.",
    followUp: "How can we avoid the O(N^2) worst-case time complexity in QuickSort?"
  },
  {
    id: "dsi_3",
    category: "DSA",
    difficulty: "Easy",
    question: "What is the key difference between a Stack and a Queue?",
    answer: "A Stack is a Last-In-First-Out (LIFO) data structure where elements are pushed and popped from the same end (top). A Queue is a First-In-First-Out (FIFO) data structure where elements are inserted at the back (enqueue) and removed from the front (dequeue). Stacks are used for recursive call simulation, backtracking, and depth-first searches, whereas Queues are used for buffering, task scheduling, and breadth-first searches.",
    followUp: "How do you implement a Queue using two Stacks?"
  },
  {
    id: "dsi_4",
    category: "DSA",
    difficulty: "Medium",
    question: "When would you use a HashMap vs a TreeMap in system design?",
    answer: "HashMap provides O(1) average time complexity for basic operations (get, put, delete) but does not guarantee any iteration order. It is backed by a hash table. TreeMap guarantees O(log N) time complexity and maintains elements in sorted order based on key comparisons. It is backed by a Red-Black tree. Choose HashMap for maximum search speed and TreeMap when sorted traversal or range queries (sub-maps) are required.",
    followUp: "What are the space complexities of both structures?"
  },
  {
    id: "dsi_5",
    category: "DSA",
    difficulty: "Hard",
    question: "Explain recursion with a call stack example and the risk of stack overflow.",
    answer: "Recursion is a process in which a method calls itself to solve smaller subproblems, relying on a base case to terminate. Every recursive call pushes a new frame onto the JRE execution call stack containing local variables and return addresses. If the recursion depth is too high or the base case is missing, the JVM runs out of stack frame memory, throwing a StackOverflowError. This can be prevented using tail-recursion optimization or iterative implementations.",
    followUp: "What is memoization and how does it optimize recursive algorithms?"
  }
];

export const hrQuestions = [
  {
    id: "hr_1",
    category: "HR",
    difficulty: "Easy",
    question: "Tell me about yourself.",
    answer: "This is an opportunity to pitch your professional story. Structure your response using the Past-Present-Future framework:\n1. Present: Highlight your current role, key technical stack (e.g. Java, React, DSA expertise), and core accomplishments.\n2. Past: Briefly mention how you developed your passion for software engineering (university or projects).\n3. Future: Explain why you are excited about this specific role and how it aligns with your career path.",
    followUp: "How do your technical strengths align with our company's mission?"
  },
  {
    id: "hr_2",
    category: "HR",
    difficulty: "Medium",
    question: "Describe a challenging situation you handled and how you resolved it.",
    answer: "Use the STAR method (Situation, Task, Action, Result) to structure your response:\n1. Situation: Describe a complex problem or project bottleneck (e.g. race conditions in multithreaded systems, critical production bug).\n2. Task: Explain your responsibility in resolving this dilemma.\n3. Action: Detail the structured steps you took (profiling, team communication, implementation adjustments).\n4. Result: Share positive outcomes with metrics (e.g., decreased page loading latency by 30%, resolved the race condition entirely).",
    followUp: "What did you learn from this situation that you apply today?"
  },
  {
    id: "hr_3",
    category: "HR",
    difficulty: "Easy",
    question: "Why should we hire you?",
    answer: "Align your answer with the employer's exact needs. Emphasize three main points:\n1. Technical Alignment: Your solid knowledge in Java, OOPs patterns, and algorithmic optimization (DSA).\n2. Problem-Solving Skill: Your structured, critical thinking demonstrated in resolving complex challenges.\n3. Cultural Fit: Your enthusiasm for collaborative pair-programming, continuous learning, and driving product quality.",
    followUp: "What unique perspective or skill do you bring to our team?"
  },
  {
    id: "hr_4",
    category: "HR",
    difficulty: "Hard",
    question: "Explain a failure in your professional life and what you learned from it.",
    answer: "Honesty and self-reflection are critical here. Pick a real, minor technical or process failure:\n1. Describe the failure: (e.g., deploying a feature that overlooked a critical edge case, causing a temporary service interruption).\n2. Take ownership: Do not blame other team members or external tools.\n3. Detail the correction: How you immediately jumped in, debugged, resolved the issue, and added comprehensive automated coverage.\n4. Share the lesson: Explain how that experience taught you the importance of edge-case coverage and robust testing standards.",
    followUp: "How has that lesson changed your development workflow since then?"
  }
];
