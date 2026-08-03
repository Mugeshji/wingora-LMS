export const collectionAndJava8Questions = {
  day28_arraylist: [
    {
      id: "al_1",
      type: "theory",
      question: "How does ArrayList dynamically grow in size when capacity is exceeded in Java 8+?",
      options: [
        "It increases capacity by 100% (doubles the capacity).",
        "It increases capacity by 50% using the formula: newCapacity = oldCapacity + (oldCapacity >> 1).",
        "It increases capacity by a fixed size of 10 elements every time.",
        "It allocates new elements dynamically page-by-page from the memory manager."
      ],
      answer: 1,
      explanation: "In Java 8+, ArrayList grows by 50% of its current size when capacity limits are hit. The bitwise right shift operator `oldCapacity >> 1` performs division by 2, adding half the old capacity to the new total.",
      difficulty: "easy"
    },
    {
      id: "al_2",
      type: "practical",
      question: "What is the time complexity of adding an element at the beginning (index 0) of an ArrayList of size N?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 2,
      explanation: "Inserting an element at index 0 requires shifting all existing elements one position to the right. Therefore, the operation takes linear time, or O(N).",
      difficulty: "easy"
    },
    {
      id: "al_3",
      type: "theory",
      question: "Which of the following interfaces is implemented by ArrayList to indicate it supports fast random access?",
      options: [
        "Cloneable",
        "Serializable",
        "RandomAccess",
        "Iterable"
      ],
      answer: 2,
      explanation: "ArrayList implements the marker interface java.util.RandomAccess. This signifies that index-based constant time O(1) retrieval is supported, allowing algorithms to choose index loops over iterator loops for better performance.",
      difficulty: "easy"
    },
    {
      id: "al_4",
      type: "practical",
      question: "What is the result of running the following code block?",
      code: `List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
for (String s : list) {
    if (s.equals("A")) {
        list.remove(s);
    }
}`,
      options: [
        "Prints nothing and terminates normally.",
        "Throws ConcurrentModificationException.",
        "Throws IndexOutOfBoundsException.",
        "Removes 'A' and list contains ['B'] without issues."
      ],
      answer: 1,
      explanation: "Modifying a Collection directly during enhanced-for loop iteration (which uses an Iterator internally) updates the modCount. The Iterator checks this modCount against its expected modCount and throws ConcurrentModificationException if a mismatch is found.",
      difficulty: "medium"
    },
    {
      id: "al_5",
      type: "theory",
      question: "What is the default initial capacity of an ArrayList when created using the default constructor in modern JDKs?",
      options: [
        "10 elements instantly allocated.",
        "An empty array of size 0, which expands to a capacity of 10 on the first element insertion.",
        "16 elements instantly allocated.",
        "Dynamically set depending on the system's JVM configuration."
      ],
      answer: 1,
      explanation: "To optimize memory initialization, the default constructor `new ArrayList()` sets the underlying array to an empty shared instance. The capacity is promoted to the default of 10 upon adding the first element.",
      difficulty: "medium"
    },
    {
      id: "al_6",
      type: "practical",
      question: "What happens when you execute trimToSize() on an ArrayList?",
      options: [
        "It removes null values from the array list.",
        "It reduces the capacity of the ArrayList instance to be the list's current size.",
        "It deletes all elements past the default capacity limit.",
        "It truncates elements to fit within the standard heap frame size."
      ],
      answer: 1,
      explanation: "`trimToSize()` updates the capacity of the backing array to exactly match the current size of the list, allowing developers to free up unused memory overhead.",
      difficulty: "medium"
    },
    {
      id: "al_7",
      type: "practical",
      question: "What is the result of executing the following list operations?",
      code: `List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(3);
list.remove(1);
System.out.println(list);`,
      options: [
        "[2, 3]",
        "[1, 3]",
        "[1, 2]",
        "Throws IndexOutOfBoundsException"
      ],
      answer: 1,
      explanation: "In `list.remove(1)`, the argument is treated as primitive `int index`, not the object `Integer`. The element at index 1 (which is 2) is removed, resulting in `[1, 3]`. To remove object 1, you would call `list.remove(Integer.valueOf(1))`.",
      difficulty: "medium"
    },
    {
      id: "al_8",
      type: "theory",
      question: "Why is the backing array of ArrayList declared as 'transient' in the JDK source code?",
      options: [
        "To prevent subclassing of ArrayList.",
        "To bypass serialization entirely and prevent saving list states.",
        "To optimize serialization by writing only the actual populated elements instead of the entire allocated capacity array.",
        "To prevent multiple threads from accessing the array concurrently."
      ],
      answer: 2,
      explanation: "The backing array often has unused slots (capacity greater than size). Declaring it `transient` prevents Java default serialization from writing empty elements. Instead, ArrayList implements custom `writeObject` and `readObject` methods to serialize only active elements.",
      difficulty: "hard"
    },
    {
      id: "al_9",
      type: "practical",
      question: "What is the behavior of the list returned by ArrayList.subList(int fromIndex, int toIndex)?",
      options: [
        "It returns a completely new ArrayList copy; modifications do not affect the parent.",
        "It returns a view of the original list; modifications to the sublist propagate to the original list.",
        "It returns a read-only list that throws UnsupportedOperationException on modifications.",
        "It returns a linked copy that updates the original asynchronously."
      ],
      answer: 1,
      explanation: "`subList()` returns a view of the original list. Adding, removing, or modifying elements within the sublist changes the backing ArrayList directly. Note that structural modifications to the parent list directly will make the sublist view invalid.",
      difficulty: "hard"
    },
    {
      id: "al_10",
      type: "theory",
      question: "How can you construct a synchronized (thread-safe) List wrapper around a standard ArrayList?",
      options: [
        "By instantiating a synchronized block around ArrayList methods.",
        "By calling Collections.synchronizedList(new ArrayList<>()).",
        "ArrayList is thread-safe by default, so no wrappers are needed.",
        "By compiling with the thread-safe compiler flag."
      ],
      answer: 1,
      explanation: "You can create a synchronized view of a list using `Collections.synchronizedList(List<T> list)`. For highly concurrent read-heavy operations, `CopyOnWriteArrayList` is preferred.",
      difficulty: "easy"
    },
    {
      id: "al_11",
      type: "practical",
      question: "What is printed by the following code snippet?",
      code: `ArrayList<String> list = new ArrayList<>(5);
System.out.println(list.size());`,
      options: [
        "5",
        "0",
        "10",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "The constructor parameter `5` defines the initial capacity of the underlying array, not the number of elements. The `size()` method returns the count of added elements, which is still 0.",
      difficulty: "medium"
    },
    {
      id: "al_12",
      type: "theory",
      question: "Which of the following is a key performance drawback of ArrayList compared to LinkedList?",
      options: [
        "ArrayList uses more memory per element due to node object metadata.",
        "Arbitrary index lookups take O(N) linear time in ArrayList.",
        "ArrayList requires O(N) copy operations when the underlying array reaches capacity and needs resizing.",
        "ArrayList does not support sequential iterator operations."
      ],
      answer: 2,
      explanation: "When an ArrayList exceeds capacity, a new larger array must be allocated and all elements must be copied. This resize overhead takes O(N) time, although it is amortized to O(1) over multiple insertions.",
      difficulty: "medium"
    },
    {
      id: "al_13",
      type: "practical",
      question: "What happens if you attempt to add an element at an index larger than the current size using add(int index, E element)?",
      code: `List<String> list = new ArrayList<>();
list.add("A");
list.add(5, "B");`,
      options: [
        "The list inserts null values in indices 1 to 4 and puts 'B' at index 5.",
        "Throws IndexOutOfBoundsException.",
        "The size is automatically padded to 6.",
        "Throws NullPointerException."
      ],
      answer: 1,
      explanation: "The `add(index, element)` method requires `index >= 0 && index <= size()`. Attempting to add an element at an index greater than the current size (which is 1 here) throws IndexOutOfBoundsException.",
      difficulty: "medium"
    },
    {
      id: "al_14",
      type: "theory",
      question: "Which of the following statements about ArrayList and primitive data types is correct?",
      options: [
        "ArrayList can store primitive values directly in Java 5 and above.",
        "ArrayList uses autoboxing to wrap primitives (e.g. int to Integer) before storing them.",
        "ArrayList automatically converts primitives to String representations.",
        "ArrayList fails to compile if primitive variables are passed to add()."
      ],
      answer: 1,
      explanation: "Collections can only store Object references. Passing primitives like `int` to `add()` leverages compiler Autoboxing to wrap them in their respective wrapper classes (like `Integer`). This introduces small memory and performance overhead.",
      difficulty: "easy"
    },
    {
      id: "al_15",
      type: "practical",
      question: "What is the time complexity of the contains(Object o) method in a standard ArrayList?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 2,
      explanation: "`contains()` loops through the underlying array sequentially and checks equality using `equals()`. In the worst-case (or if the element is absent), it traverses all N elements, yielding O(N) time complexity.",
      difficulty: "easy"
    }
  ],
  day29_linkedlist: [
    {
      id: "ll_1",
      type: "theory",
      question: "Which of the following best describes the internal data structure of java.util.LinkedList?",
      options: [
        "Singly Linked List",
        "Doubly Linked List",
        "Circular Linked List",
        "Skip List"
      ],
      answer: 1,
      explanation: "Java's `LinkedList` is implemented as a Doubly Linked List. Each element is stored in a Node object containing references to the element itself, the previous Node, and the next Node.",
      difficulty: "easy"
    },
    {
      id: "ll_2",
      type: "theory",
      question: "Which interfaces are implemented by java.util.LinkedList?",
      options: [
        "List only",
        "List and Deque",
        "List and RandomAccess",
        "Deque and RandomAccess"
      ],
      answer: 1,
      explanation: "LinkedList implements both the `List` and `Deque` (Double Ended Queue) interfaces. It does NOT implement `RandomAccess` because index-based lookup requires traversing node pointers.",
      difficulty: "easy"
    },
    {
      id: "ll_3",
      type: "practical",
      question: "What is the time complexity of accessing an element at a specific index in a LinkedList of size N?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(1) amortized"
      ],
      answer: 2,
      explanation: "To find an element at a given index, LinkedList must traverse nodes sequentially starting from either the head or tail (whichever is closer). This search takes O(N) time.",
      difficulty: "easy"
    },
    {
      id: "ll_4",
      type: "practical",
      question: "What does the following code print?",
      code: `LinkedList<String> list = new LinkedList<>();
list.add("A");
list.add("B");
list.addFirst("C");
list.addLast("D");
System.out.println(list.peek());`,
      options: [
        "A",
        "C",
        "D",
        "Null"
      ],
      answer: 1,
      explanation: "Adding 'C' first results in `['C', 'A', 'B']`. Adding 'D' last yields `['C', 'A', 'B', 'D']`. The `peek()` method retrieves, but does not remove, the first element of the list, which is 'C'.",
      difficulty: "medium"
    },
    {
      id: "ll_5",
      type: "theory",
      question: "Why does LinkedList consume more memory per element compared to ArrayList?",
      options: [
        "It uses internal hashing algorithms that reserve empty memory blocks.",
        "It allocates extra capacity arrays.",
        "Each node requires reference pointers to the element, previous node, and next node.",
        "LinkedList elements are double-compiled."
      ],
      answer: 2,
      explanation: "ArrayList stores references directly in an array. LinkedList wraps every element in a Node object. Each Node has 2 additional reference variables (next and prev), adding significant 24-32 bytes of pointer overhead per element.",
      difficulty: "medium"
    },
    {
      id: "ll_6",
      type: "practical",
      question: "What is the return value of poll() and remove() respectively when executed on an empty LinkedList?",
      options: [
        "Throws NoSuchElementException for both.",
        "Returns null for poll() and throws NoSuchElementException for remove().",
        "Throws NoSuchElementException for poll() and returns null for remove().",
        "Returns null for both."
      ],
      answer: 1,
      explanation: "Queue operations in Deque interfaces are divided: `poll()` returns null if the queue is empty, whereas `remove()` is strict and throws NoSuchElementException if there are no elements.",
      difficulty: "medium"
    },
    {
      id: "ll_7",
      type: "theory",
      question: "Which iterator method allows you to traverse a LinkedList backwards from tail to head?",
      options: [
        "reverseIterator()",
        "descendingIterator()",
        "backwards()",
        "previousIterator()"
      ],
      answer: 1,
      explanation: "The `descendingIterator()` method returns an Iterator that traverses the elements in reverse order (from tail to head).",
      difficulty: "medium"
    },
    {
      id: "ll_8",
      type: "practical",
      question: "What is the time complexity of inserting a new node at the head or tail of a LinkedList?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(1) only if the list has space"
      ],
      answer: 0,
      explanation: "LinkedList maintains direct reference pointers to the first and last nodes. Adding at the beginning or end is a matter of updating a few reference addresses, taking O(1) constant time.",
      difficulty: "easy"
    },
    {
      id: "ll_9",
      type: "practical",
      question: "What is the behavior of the following code snippet?",
      code: `LinkedList<String> list = new LinkedList<>();
list.add(null);
list.add("A");
System.out.println(list.size() + " " + list.contains(null));`,
      options: [
        "Throws NullPointerException on add().",
        "2 true",
        "1 false",
        "2 false"
      ],
      answer: 1,
      explanation: "LinkedList allows null elements. Adding a null element works without error, size becomes 2, and `contains(null)` returns true.",
      difficulty: "easy"
    },
    {
      id: "ll_10",
      type: "theory",
      question: "Which of the following scenarios is LinkedList preferred over ArrayList?",
      options: [
        "Frequent random index search and lookups.",
        "Frequent modification of elements via index values.",
        "Frequent sequential additions and removals at both ends (queue-like behaviors).",
        "Storing large sets of numeric values with low memory consumption."
      ],
      answer: 2,
      explanation: "Since LinkedList implements Deque and supports fast O(1) operations at both ends without array copying, it is highly suited for queues, stacks, or double-ended queues.",
      difficulty: "medium"
    },
    {
      id: "ll_11",
      type: "practical",
      question: "What is the output of the following list operations?",
      code: `LinkedList<String> list = new LinkedList<>();
list.add("X");
list.add("Y");
ListIterator<String> it = list.listIterator();
it.next();
it.add("Z");
System.out.println(list);`,
      options: [
        "[X, Y, Z]",
        "[X, Z, Y]",
        "[Z, X, Y]",
        "Throws ConcurrentModificationException"
      ],
      answer: 1,
      explanation: "A ListIterator allows modifications during traversal. The iterator starts before 'X'. `it.next()` moves past 'X'. `it.add('Z')` inserts 'Z' at the iterator's current position (immediately after 'X' and before 'Y'), resulting in `[X, Z, Y]`.",
      difficulty: "hard"
    },
    {
      id: "ll_12",
      type: "theory",
      question: "How is the LinkedList clone() method implemented?",
      options: [
        "It creates a deep copy of all node structures and all stored elements.",
        "It creates a shallow copy, returning a new LinkedList instance but sharing node objects.",
        "It returns a new LinkedList instance with a shallow copy of nodes referencing the same elements.",
        "It is not supported and throws CloneNotSupportedException."
      ],
      answer: 2,
      explanation: "The `clone()` method of LinkedList performs a shallow clone: it allocates a new LinkedList object and recreates the list's node structures, but the nodes reference the exact same elements (they are not cloned).",
      difficulty: "hard"
    },
    {
      id: "ll_13",
      type: "practical",
      question: "What is the output of the following code?",
      code: `LinkedList<Integer> list = new LinkedList<>();
list.add(10);
list.add(20);
System.out.println(list.remove());`,
      options: [
        "10",
        "20",
        "true",
        "Throws NoSuchElementException"
      ],
      answer: 0,
      explanation: "The parameterless `remove()` method in LinkedList acts as a Queue poll/remove operation: it retrieves and removes the first element of the list, which is 10.",
      difficulty: "medium"
    },
    {
      id: "ll_14",
      type: "theory",
      question: "How does CPU cache locality affect ArrayList vs LinkedList traversal performance?",
      options: [
        "LinkedList is faster because pointers load concurrently.",
        "ArrayList is faster because elements reside in contiguous memory, allowing cache lines to load multiple elements at once.",
        "They perform identically because Java manages heap memory globally.",
        "LinkedList has better cache optimization due to Node wrappers."
      ],
      answer: 1,
      explanation: "ArrayList stores elements in contiguous memory. Traversal has high spatial locality, so multiple elements are cached together in CPU cache lines. LinkedList nodes are scattered randomly on the heap, forcing cache misses and slower traversal.",
      difficulty: "hard"
    },
    {
      id: "ll_15",
      type: "practical",
      question: "What is the time complexity of the clear() operation in a LinkedList?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "Instantaneous JVM garbage collection sweep"
      ],
      answer: 1,
      explanation: "To clear the list and help the garbage collector, LinkedList must traverse all node links and explicitly set their `next`, `prev`, and `item` references to null. This takes linear O(N) time.",
      difficulty: "hard"
    }
  ],
  day30_vector: [
    {
      id: "vec_1",
      type: "theory",
      question: "What is the primary difference between Vector and ArrayList in Java?",
      options: [
        "Vector allows null keys; ArrayList does not.",
        "Vector is thread-safe because its methods are synchronized; ArrayList is not synchronized.",
        "Vector is implemented using a linked list; ArrayList uses an array.",
        "Vector is a modern addition in Java 8; ArrayList is a legacy class."
      ],
      answer: 1,
      explanation: "Vector is a legacy class introduced in JDK 1.0. All of its access and modification methods are synchronized, making it thread-safe but introducing performance overhead compared to ArrayList.",
      difficulty: "easy"
    },
    {
      id: "vec_2",
      type: "theory",
      question: "How does Vector grow its dynamic array capacity when capacity is exceeded, assuming no capacityIncrement is specified?",
      options: [
        "It increases capacity by 50%.",
        "It doubles the capacity (increases capacity by 100%).",
        "It increases capacity by a fixed 10 elements.",
        "It grows elements page-by-page."
      ],
      answer: 1,
      explanation: "Unlike ArrayList which grows by 50%, Vector doubles its capacity (grows by 100%) when its capacity limit is breached, unless a custom `capacityIncrement` was specified in the constructor.",
      difficulty: "easy"
    },
    {
      id: "vec_3",
      type: "practical",
      question: "What legacy enumeration-based interface does Vector support for iterating elements?",
      options: [
        "Iterator",
        "ListIterator",
        "Enumeration",
        "Spliterator"
      ],
      answer: 2,
      explanation: "Vector supports the `Enumeration` interface via the `elements()` method. Enumerations are read-only and lack a `remove()` method, and they are not fail-fast like Iterators.",
      difficulty: "easy"
    },
    {
      id: "vec_4",
      type: "practical",
      question: "What is printed by the following code snippet?",
      code: `Vector<String> vec = new Vector<>(3, 5);
vec.add("A");
vec.add("B");
vec.add("C");
vec.add("D");
System.out.println(vec.capacity());`,
      options: [
        "3",
        "8",
        "6",
        "4"
      ],
      answer: 1,
      explanation: "The constructor parameters are initial capacity (3) and capacityIncrement (5). Initially, capacity is 3. Adding 4 elements causes an overflow. The capacity is increased by the increment value of 5, resulting in 3 + 5 = 8.",
      difficulty: "medium"
    },
    {
      id: "vec_5",
      type: "theory",
      question: "Which of the following statements about Vector performance is true?",
      options: [
        "Vector is faster than ArrayList because of legacy optimizations.",
        "Vector methods acquire monitor locks, creating serialization locks in multithreaded environments and slower execution.",
        "Vector uses primitive storage and bypasses heap overhead.",
        "Vector has no performance overhead compared to CopyOnWriteArrayList."
      ],
      answer: 1,
      explanation: "Because Vector's methods are declared `synchronized`, every read/write acquires an object monitor lock. In single-threaded apps, this synchronization lock check is wasted effort, making Vector slower than ArrayList.",
      difficulty: "medium"
    },
    {
      id: "vec_6",
      type: "practical",
      question: "What is the difference between an Iterator obtained from Vector and an Enumeration obtained from Vector?",
      options: [
        "Iterator is fail-fast and throws ConcurrentModificationException if Vector is modified; Enumeration is fail-safe and does not check for modification.",
        "Enumeration is fail-fast; Iterator is not.",
        "Both check for concurrent modification and throw exception.",
        "Iterator can only move backwards; Enumeration moves forwards."
      ],
      answer: 0,
      explanation: "Vector's Iterator (obtained via `iterator()`) is fail-fast and throws ConcurrentModificationException on modification during traversal. Vector's legacy `Enumeration` (obtained via `elements()`) is not fail-fast, meaning changes are reflected directly or might cause undefined behavior but won't throw exceptions.",
      difficulty: "hard"
    },
    {
      id: "vec_7",
      type: "practical",
      question: "What happens if you run firstElement() or lastElement() on an empty Vector?",
      options: [
        "Returns null.",
        "Throws NoSuchElementException.",
        "Throws IndexOutOfBoundsException.",
        "Throws EmptyStackException."
      ],
      answer: 1,
      explanation: "The methods `firstElement()` and `lastElement()` throw `NoSuchElementException` if the Vector contains no elements.",
      difficulty: "medium"
    },
    {
      id: "vec_8",
      type: "theory",
      question: "Under which package does Vector reside?",
      options: [
        "java.lang",
        "java.util",
        "java.io",
        "java.nio"
      ],
      answer: 1,
      explanation: "Vector is part of the Java Collections Framework and resides in the `java.util` package.",
      difficulty: "easy"
    },
    {
      id: "vec_9",
      type: "practical",
      question: "What is the result of executing setSize(int newSize) on a Vector containing 5 elements, where newSize is 3?",
      options: [
        "No change to vector elements; capacity is reduced.",
        "Vector elements at index 3 and 4 are discarded.",
        "Throws IllegalArgumentException.",
        "Vector size is set to 3 but old elements remain accessible."
      ],
      answer: 1,
      explanation: "If `setSize()` is called with a size smaller than the current size, elements past the new size are deleted (set to null in the backing array, and size variable updated).",
      difficulty: "medium"
    },
    {
      id: "vec_10",
      type: "practical",
      question: "What is the output of the following code?",
      code: `Vector<Integer> v = new Vector<>();
v.add(1);
v.add(2);
v.setSize(4);
System.out.println(v);`,
      options: [
        "[1, 2]",
        "[1, 2, 0, 0]",
        "[1, 2, null, null]",
        "Throws IndexOutOfBoundsException"
      ],
      answer: 2,
      explanation: "If `setSize()` increases the size, new slots are padded with `null` references, yielding `[1, 2, null, null]`.",
      difficulty: "medium"
    },
    {
      id: "vec_11",
      type: "theory",
      question: "Why was Vector retrofitted in Java 1.2?",
      options: [
        "To allow native platform integrations.",
        "To implement the List interface, making it a formal member of the new Collections Framework.",
        "To remove its synchronization locks.",
        "To enable it to support lambda expressions."
      ],
      answer: 1,
      explanation: "Vector was a pre-framework class. In JDK 1.2, it was retrofitted to implement the `List` interface, allowing it to integrate with other Collections.",
      difficulty: "medium"
    },
    {
      id: "vec_12",
      type: "practical",
      question: "What is the output of the following code snippet?",
      code: `Vector<String> v = new Vector<>();
v.add("A");
v.add("B");
Object[] arr = v.toArray();
v.clear();
System.out.println(arr.length);`,
      options: [
        "0",
        "2",
        "Throws ConcurrentModificationException",
        "Null"
      ],
      answer: 1,
      explanation: "`toArray()` returns a new independent array copy containing the list elements. Clearing the Vector afterward has no effect on the array copy, which still has length 2.",
      difficulty: "medium"
    },
    {
      id: "vec_13",
      type: "theory",
      question: "Which constructor of Vector allows defining both the initial size and the rate of growth?",
      options: [
        "Vector(int initialCapacity)",
        "Vector(int initialCapacity, int capacityIncrement)",
        "Vector(Collection<? extends E> c)",
        "Vector(int capacity, double growthRate)"
      ],
      answer: 1,
      explanation: "The constructor `Vector(initialCapacity, capacityIncrement)` allows specifying exactly how many slots to allocate initially, and by how much to grow the internal array size when it overflows.",
      difficulty: "easy"
    },
    {
      id: "vec_14",
      type: "practical",
      question: "Which method in Vector removes all elements and sets its size to zero?",
      options: [
        "clear()",
        "removeAllElements()",
        "reset()",
        "Both clear() and removeAllElements() can be used."
      ],
      answer: 3,
      explanation: "Both `clear()` (added to satisfy the List interface) and `removeAllElements()` (legacy Vector method) clear the contents and reset size to zero.",
      difficulty: "easy"
    },
    {
      id: "vec_15",
      type: "practical",
      question: "What is the time complexity of the insertElementAt(E obj, int index) method in Vector?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N log N)"
      ],
      answer: 1,
      explanation: "Like ArrayList, Vector is backed by an array. Inserting an element at a given index requires shifting all elements after it, resulting in linear O(N) complexity.",
      difficulty: "easy"
    }
  ],
  day31_stack: [
    {
      id: "st_1",
      type: "theory",
      question: "Which data structure model does the java.util.Stack class represent?",
      options: [
        "First-In, First-Out (FIFO)",
        "Last-In, First-Out (LIFO)",
        "Priority-based sorting",
        "Random Access Directory"
      ],
      answer: 1,
      explanation: "Stack represents a Last-In, First-Out (LIFO) stack of objects, extending standard Vector with operations like push and pop.",
      difficulty: "easy"
    },
    {
      id: "st_2",
      type: "theory",
      question: "What is a major inheritance/architectural criticism of java.util.Stack?",
      options: [
        "It does not implement standard serialization.",
        "It extends Vector, meaning it inherits all Vector methods (like insertAt, remove) which violate stack encapsulation by allowing modifications anywhere in the stack.",
        "It is abstract and cannot be instantiated.",
        "It lacks dynamic resizing."
      ],
      answer: 1,
      explanation: "Because Stack extends Vector, it inherits all index-based access methods (e.g. `add(index, element)`, `remove(index)`). This violates LIFO encapsulation since clients can manipulate elements in the middle of the stack.",
      difficulty: "hard"
    },
    {
      id: "st_3",
      type: "practical",
      question: "What is the result of calling pop() on an empty Stack?",
      options: [
        "Returns null.",
        "Throws NoSuchElementException.",
        "Throws EmptyStackException.",
        "Throws IndexOutOfBoundsException."
      ],
      answer: 2,
      explanation: "`pop()` throws `java.util.EmptyStackException` if the stack contains no elements.",
      difficulty: "easy"
    },
    {
      id: "st_4",
      type: "practical",
      question: "What is printed by the following Stack operations?",
      code: `Stack<String> stack = new Stack<>();
stack.push("A");
stack.push("B");
stack.push("C");
System.out.println(stack.search("A"));`,
      options: [
        "0",
        "1",
        "2",
        "3"
      ],
      answer: 3,
      explanation: "The `search(Object o)` method returns the 1-based distance from the top of the stack. 'C' is at distance 1, 'B' is at 2, and 'A' is at 3. If element is not found, it returns -1.",
      difficulty: "medium"
    },
    {
      id: "st_5",
      type: "theory",
      question: "What modern Java interface is recommended as a replacement for the legacy Stack class?",
      options: [
        "Queue",
        "Deque (using ArrayDeque as implementation)",
        "List",
        "Set"
      ],
      answer: 1,
      explanation: "The Java doc recommends using the `Deque` interface (with `ArrayDeque` implementation) over `Stack` for LIFO stack operations because ArrayDeque is more efficient, lacks synchronization overhead, and enforces better stack constraints.",
      difficulty: "medium"
    },
    {
      id: "st_6",
      type: "practical",
      question: "What is the return value of stack.peek()?",
      options: [
        "Retrieves and removes the top element of the stack.",
        "Retrieves, but does not remove, the top element of the stack.",
        "Checks if the stack has space left.",
        "Searches for an element."
      ],
      answer: 1,
      explanation: "`peek()` retrieves the top element without removing it. It throws `EmptyStackException` if the stack is empty.",
      difficulty: "easy"
    },
    {
      id: "st_7",
      type: "practical",
      question: "What is the print result of this code?",
      code: `Stack<Integer> s = new Stack<>();
s.push(1);
s.push(2);
s.add(0, 3);
System.out.println(s.peek());`,
      options: [
        "3",
        "2",
        "1",
        "Throws EmptyStackException"
      ],
      answer: 1,
      explanation: "`add(0, 3)` inserts 3 at index 0 (the bottom of the stack) because of Vector inheritance. The top of the stack remains the last inserted element, which is 2.",
      difficulty: "hard"
    },
    {
      id: "st_8",
      type: "theory",
      question: "Is java.util.Stack thread-safe?",
      options: [
        "No, it is designed for single-threaded speed.",
        "Yes, because it inherits synchronized Vector methods.",
        "Only if instantiated in concurrent packages.",
        "No, unless we declare it volatile."
      ],
      answer: 1,
      explanation: "Yes, Stack is thread-safe because it extends Vector, meaning its operations inherit the synchronization locks of Vector.",
      difficulty: "easy"
    },
    {
      id: "st_9",
      type: "practical",
      question: "What is the print output of the following traversal code?",
      code: `Stack<String> s = new Stack<>();
s.push("1");
s.push("2");
for (String str : s) {
    System.out.print(str + " ");
}`,
      options: [
        "2 1 ",
        "1 2 ",
        "Throws ConcurrentModificationException",
        "Nothing is printed"
      ],
      answer: 1,
      explanation: "Since Stack inherits from Vector, iterating over it via an enhanced for loop processes elements in index order (bottom to top, from index 0 upwards). Thus, it prints `1 2 `.",
      difficulty: "hard"
    },
    {
      id: "st_10",
      type: "theory",
      question: "What is the time complexity of the push() and pop() operations in Stack?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N log N)"
      ],
      answer: 0,
      explanation: "Pushing and popping elements occur at the end of the backing array, which requires no shifting. Therefore, these operations run in O(1) constant time (excluding resizing overhead during push).",
      difficulty: "easy"
    },
    {
      id: "st_11",
      type: "practical",
      question: "What occurs if we push a null element onto a Stack?",
      options: [
        "Throws NullPointerException.",
        "The stack allows null, and pushes it to the top.",
        "The push operation is ignored.",
        "Throws IllegalArgumentException."
      ],
      answer: 1,
      explanation: "Standard Stack class accepts null values. They can be pushed and popped like any other object.",
      difficulty: "medium"
    },
    {
      id: "st_12",
      type: "practical",
      question: "What is the output of this code snippet?",
      code: `Stack<Character> s = new Stack<>();
s.push('A');
s.push('B');
s.pop();
s.push('C');
System.out.println(s.size() + " " + s.peek());`,
      options: [
        "3 C",
        "2 C",
        "2 A",
        "1 B"
      ],
      answer: 1,
      explanation: "Stack state transitions: `['A']` -> `['A', 'B']` -> pop removes 'B' yielding `['A']` -> push 'C' yields `['A', 'C']`. The size is 2, and the top element is 'C'.",
      difficulty: "medium"
    },
    {
      id: "st_13",
      type: "theory",
      question: "Which of the following is NOT a method of java.util.Stack?",
      options: [
        "empty()",
        "peek()",
        "poll()",
        "search(Object o)"
      ],
      answer: 2,
      explanation: "`poll()` is a Queue/Deque method, not a member of Stack. Stack's specific methods are `push()`, `pop()`, `peek()`, `empty()`, and `search()`.",
      difficulty: "easy"
    },
    {
      id: "st_14",
      type: "practical",
      question: "What is the return value of stack.search('Z') if 'Z' is not present in the stack?",
      options: [
        "0",
        "-1",
        "Throws NoSuchElementException",
        "Null"
      ],
      answer: 1,
      explanation: "If the searched object is not found in the stack, `search()` returns -1.",
      difficulty: "easy"
    },
    {
      id: "st_15",
      type: "theory",
      question: "What class does Stack directly extend?",
      options: [
        "AbstractList",
        "Vector",
        "ArrayList",
        "Object"
      ],
      answer: 1,
      explanation: "Stack extends `java.util.Vector` directly.",
      difficulty: "easy"
    }
  ],
  day32_hashset: [
    {
      id: "hs_1",
      type: "theory",
      question: "Which internal data structure does java.util.HashSet use to store elements?",
      options: [
        "A dynamic array.",
        "A doubly linked list.",
        "A HashMap instance.",
        "A binary search tree."
      ],
      answer: 2,
      explanation: "Under the hood, java.util.HashSet is backed by a private, transient `HashMap` instance. The elements added to the HashSet are stored as keys in this HashMap.",
      difficulty: "easy"
    },
    {
      id: "hs_2",
      type: "theory",
      question: "How does HashSet guarantee uniqueness of its elements?",
      options: [
        "By sorting elements in natural order.",
        "By comparing the memory addresses of objects directly.",
        "By checking hash values and object equivalence using hashCode() and equals() of the HashMap keys.",
        "By calling compareTo() on all objects."
      ],
      answer: 2,
      explanation: "Because HashSet stores elements as keys in a HashMap, it relies on HashMap's collision-handling: checking `hashCode()` to find the bucket, and then traversing elements and using `equals()` to check for matches.",
      difficulty: "easy"
    },
    {
      id: "hs_3",
      type: "practical",
      question: "What is stored as the value mapping in the underlying HashMap for every key-value entry added to a HashSet?",
      options: [
        "The element itself.",
        "An integer counter indicating duplicates.",
        "A dummy constant Object named PRESENT.",
        "null value reference."
      ],
      answer: 2,
      explanation: "Since HashMap maps keys to values, and HashSet only cares about unique keys, HashSet uses a private static final dummy Object named `PRESENT` as the value for all keys in the underlying HashMap.",
      difficulty: "medium"
    },
    {
      id: "hs_4",
      type: "practical",
      question: "What is printed by the following HashSet code snippet?",
      code: `Set<String> set = new HashSet<>();
System.out.println(set.add("A"));
System.out.println(set.add("A"));`,
      options: [
        "true followed by true",
        "true followed by false",
        "false followed by false",
        "true followed by Throws IllegalArgumentException"
      ],
      answer: 1,
      explanation: "The `add()` method in Set returns `true` if the element was successfully added, and `false` if the element was already present (duplicate checked, entry ignored).",
      difficulty: "easy"
    },
    {
      id: "hs_5",
      type: "theory",
      question: "What are the default initial capacity and load factor parameters of a HashSet?",
      options: [
        "10 capacity and 0.5 load factor",
        "16 capacity and 0.75 load factor",
        "32 capacity and 0.85 load factor",
        "8 capacity and 0.75 load factor"
      ],
      answer: 1,
      explanation: "Because it wraps a HashMap, HashSet inherits default parameters: an initial capacity of 16 buckets and a load factor of 0.75.",
      difficulty: "medium"
    },
    {
      id: "hs_6",
      type: "practical",
      question: "What is the iteration ordering guarantee in java.util.HashSet?",
      options: [
        "It guarantees insertion order.",
        "It guarantees alphabetical/natural sorting order.",
        "It makes no guarantees about the iteration order; the order can even change over time.",
        "It orders elements by memory allocation age."
      ],
      answer: 2,
      explanation: "HashSet does not guarantee any order of elements. The order depends on hash buckets and is subject to change when the backing Map is resized or rehashed.",
      difficulty: "easy"
    },
    {
      id: "hs_7",
      type: "practical",
      question: "What is the result of running this code?",
      code: `Set<String> set = new HashSet<>();
set.add(null);
set.add(null);
System.out.println(set.size());`,
      options: [
        "0",
        "1",
        "2",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "HashSet allows one null element. The first `add(null)` succeeds, and the second returns false as a duplicate, leaving set size as 1.",
      difficulty: "easy"
    },
    {
      id: "hs_8",
      type: "theory",
      question: "What is the average time complexity for basic operations (add, remove, contains) in a HashSet?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(1) worst-case"
      ],
      answer: 0,
      explanation: "Assuming a proper hash function distribute elements evenly, basic operations run in O(1) constant time on average.",
      difficulty: "easy"
    },
    {
      id: "hs_9",
      type: "practical",
      question: "What happens if a mutable object changes its internal fields (which are used in equals and hashCode) after being added to a HashSet?",
      options: [
        "The HashSet automatically updates its internal bucket structure.",
        "The object is silently removed.",
        "The object becomes 'lost' in the HashSet because it now resolves to a different hash bucket, and contains() will likely return false.",
        "Throws ConcurrentModificationException on next query."
      ],
      answer: 2,
      explanation: "If an object's fields change, its `hashCode()` changes. When HashSet queries `contains(obj)`, it searches the new hash bucket, but the object resides in the old bucket. This renders the element unretrievable and causes memory leaks.",
      difficulty: "hard"
    },
    {
      id: "hs_10",
      type: "theory",
      question: "How can you instantiate a thread-safe HashSet in Java?",
      options: [
        "HashSet is thread-safe by default.",
        "Collections.synchronizedSet(new HashSet<>())",
        "ConcurrentHashSet class instantiations.",
        "Using Collections.synchronizedList."
      ],
      answer: 1,
      explanation: "Java does not provide a public concurrent HashSet class directly. You can create a synchronized wrapper using `Collections.synchronizedSet(Set<T> s)` or use keys view of ConcurrentHashMap.",
      difficulty: "medium"
    },
    {
      id: "hs_11",
      type: "practical",
      question: "What is printed by the following program?",
      code: `class Item {
    int id;
    Item(int id) { this.id = id; }
    public int hashCode() { return id; }
}
// inside main
Set<Item> set = new HashSet<>();
set.add(new Item(5));
set.add(new Item(5));
System.out.println(set.size());`,
      options: [
        "1",
        "2",
        "Throws ClassCastException",
        "0"
      ],
      answer: 1,
      explanation: "Although `hashCode()` was overridden to return the same value, `equals()` was NOT overridden. The default Object `equals()` checks reference equality. Since they are two separate objects, both are added, and size is 2.",
      difficulty: "hard"
    },
    {
      id: "hs_12",
      type: "theory",
      question: "Which class is the direct superclass of java.util.HashSet?",
      options: [
        "AbstractCollection",
        "AbstractSet",
        "HashMap",
        "Object"
      ],
      answer: 1,
      explanation: "HashSet extends `java.util.AbstractSet` and implements `java.util.Set`.",
      difficulty: "easy"
    },
    {
      id: "hs_13",
      type: "practical",
      question: "What is the output of the following operations?",
      code: `Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3));
Set<Integer> other = new HashSet<>(Arrays.asList(2, 3, 4));
set.retainAll(other);
System.out.println(set);`,
      options: [
        "[1, 2, 3, 4]",
        "[1]",
        "[2, 3]",
        "[4]"
      ],
      answer: 2,
      explanation: "`retainAll()` performs a set intersection operation. It retains only the elements in `set` that are also present in the parameter collection `other` (2 and 3).",
      difficulty: "medium"
    },
    {
      id: "hs_14",
      type: "theory",
      question: "What is the worst-case time complexity of add() in HashSet in Java 8?",
      options: [
        "O(N)",
        "O(log N)",
        "O(N log N)",
        "O(1)"
      ],
      answer: 1,
      explanation: "In Java 8+, if many keys map to the same bucket (worst-case collision), the bucket converts from a linked list to a balanced Red-Black tree. The worst-case lookup/insertion time is O(log N) instead of O(N).",
      difficulty: "hard"
    },
    {
      id: "hs_15",
      type: "practical",
      question: "What occurs when you construct a HashSet passing a list c containing duplicate entries?",
      code: `List<String> list = Arrays.asList("A", "A", "B");
Set<String> set = new HashSet<>(list);
System.out.println(set.size());`,
      options: [
        "Throws IllegalArgumentException.",
        "3",
        "2",
        "1"
      ],
      answer: 2,
      explanation: "Constructing a Set with a Collection automatically filters out duplicates. The set will contain only 'A' and 'B', making the size 2.",
      difficulty: "easy"
    }
  ],
  day33_linkedhashset: [
    {
      id: "lhs_1",
      type: "theory",
      question: "What is the primary difference between LinkedHashSet and HashSet in Java?",
      options: [
        "LinkedHashSet does not allow null values; HashSet does.",
        "LinkedHashSet maintains insertion order; HashSet makes no ordering guarantees.",
        "LinkedHashSet sorts elements in alphabetical order.",
        "LinkedHashSet uses less memory than HashSet."
      ],
      answer: 1,
      explanation: "LinkedHashSet extends HashSet and uses a doubly linked list running through all its entries to maintain the insertion order. HashSet has no ordering guarantees.",
      difficulty: "easy"
    },
    {
      id: "lhs_2",
      type: "theory",
      question: "What is the internal implementation architecture of a LinkedHashSet?",
      options: [
        "A linked list of elements.",
        "A hash table combined with a doubly linked list.",
        "A binary heap.",
        "A single dynamic array."
      ],
      answer: 1,
      explanation: "LinkedHashSet is implemented using a hash table (HashMap wrapper) with a running doubly linked list that links elements in insertion order.",
      difficulty: "medium"
    },
    {
      id: "lhs_3",
      type: "practical",
      question: "What is the output of the following code snippet?",
      code: `Set<String> set = new LinkedHashSet<>();
set.add("Z");
set.add("A");
set.add("Z");
set.add("K");
System.out.println(set);`,
      options: [
        "[Z, A, K]",
        "[A, K, Z]",
        "[Z, A, Z, K]",
        "[Z, K, A]"
      ],
      answer: 0,
      explanation: "Because it maintains insertion order and discards duplicates, the elements are printed as inserted: `[Z, A, K]`. Re-adding 'Z' returns false and does not alter its original insertion position.",
      difficulty: "easy"
    },
    {
      id: "lhs_4",
      type: "theory",
      question: "How does the performance of LinkedHashSet iteration compare to HashSet?",
      options: [
        "LinkedHashSet is much slower to iterate due to link pointers.",
        "LinkedHashSet iteration performance depends on capacity; HashSet does not.",
        "LinkedHashSet is faster to iterate than HashSet because it walks the doubly-linked list directly without scanning empty buckets.",
        "They have identical iteration speeds."
      ],
      explanation: "HashSet iteration requires traversing all buckets, meaning performance is O(capacity + size). LinkedHashSet iteration only traverses the active doubly linked list, taking O(size) time regardless of capacity, making it faster in cases of large capacities and few elements.",
      options: [
        "LinkedHashSet iteration is slower.",
        "LinkedHashSet iteration is faster (O(size) vs O(capacity + size)).",
        "They perform identical lookups.",
        "LinkedHashSet iteration is only faster in parallel threads."
      ],
      answer: 1,
      difficulty: "hard"
    },
    {
      id: "lhs_5",
      type: "practical",
      question: "What occurs if you re-insert an element that is already present in a LinkedHashSet?",
      options: [
        "It updates the insertion order and moves the element to the end.",
        "It throws IllegalArgumentException.",
        "The operation is ignored, and the element maintains its original position in the insertion order.",
        "The duplicate is stored next to the original node."
      ],
      answer: 2,
      explanation: "Re-inserting an element (e.g. adding 'A' again when 'A' already exists) does not affect its position in the insertion order.",
      difficulty: "medium"
    },
    {
      id: "lhs_6",
      type: "theory",
      question: "Why does LinkedHashSet consume more memory than a standard HashSet?",
      options: [
        "It stores elements in native memory buffers.",
        "It allocates extra lookup arrays.",
        "It maintains link pointers (next/prev references) for every node to track insertion order.",
        "It uses double-precision hash values."
      ],
      answer: 2,
      explanation: "LinkedHashSet requires a doubly linked list structure, meaning its internal entries have extra pointers for keeping track of insertion order, increasing memory footprint.",
      difficulty: "medium"
    },
    {
      id: "lhs_7",
      type: "practical",
      question: "What is printed by the following code?",
      code: `Set<Integer> set = new LinkedHashSet<>();
set.add(null);
set.add(3);
set.add(null);
System.out.println(set);`,
      options: [
        "[null, 3]",
        "[3, null]",
        "Throws NullPointerException",
        "[null, 3, null]"
      ],
      answer: 0,
      explanation: "LinkedHashSet inherits HashSet's null capability, storing a single null element in its proper insertion order, yielding `[null, 3]`.",
      difficulty: "easy"
    },
    {
      id: "lhs_8",
      type: "theory",
      question: "Which class does java.util.LinkedHashSet directly extend?",
      options: [
        "AbstractSet",
        "HashSet",
        "AbstractCollection",
        "LinkedHashMap"
      ],
      answer: 1,
      explanation: "LinkedHashSet directly extends `java.util.HashSet`.",
      difficulty: "easy"
    },
    {
      id: "lhs_9",
      type: "practical",
      question: "What is the time complexity of the contains(Object o) operation in a LinkedHashSet?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N log N)"
      ],
      answer: 0,
      explanation: "Despite the linked list overhead, element checks use the hash table lookup method, maintaining the average constant O(1) time complexity.",
      difficulty: "easy"
    },
    {
      id: "lhs_10",
      type: "theory",
      question: "Which of the following constructor options does NOT exist for LinkedHashSet?",
      options: [
        "LinkedHashSet()",
        "LinkedHashSet(int initialCapacity)",
        "LinkedHashSet(int initialCapacity, float loadFactor)",
        "LinkedHashSet(boolean accessOrder)"
      ],
      answer: 3,
      explanation: "Unlike `LinkedHashMap`, which has a constructor with an `accessOrder` boolean parameter (to sort by access instead of insertion), `LinkedHashSet` only maintains insertion order and lacks this constructor parameter.",
      difficulty: "hard"
    },
    {
      id: "lhs_11",
      type: "practical",
      question: "What is printed by this code?",
      code: `Set<String> set = new LinkedHashSet<>(5);
set.add("A");
set.add("B");
set.remove("A");
set.add("A");
System.out.println(set);`,
      options: [
        "[A, B]",
        "[B, A]",
        "[B]",
        "Throws ConcurrentModificationException"
      ],
      answer: 1,
      explanation: "Removing 'A' deletes it from the linked list. Re-adding 'A' appends it to the end of the list. Thus, the order becomes `[B, A]`.",
      difficulty: "medium"
    },
    {
      id: "lhs_12",
      type: "theory",
      question: "Is the iterator returned by LinkedHashSet fail-fast?",
      options: [
        "No, it is fail-safe.",
        "Yes, it throws ConcurrentModificationException if the set is structurally modified after the iterator is created.",
        "Only when sorting constraints are violated.",
        "Iterators do not monitor structural changes."
      ],
      answer: 1,
      explanation: "Like HashSet, the Iterator of LinkedHashSet is fail-fast and throws ConcurrentModificationException on unauthorized changes during traversal.",
      difficulty: "easy"
    },
    {
      id: "lhs_13",
      type: "practical",
      question: "What is the output of the following set operations?",
      code: `Set<String> lhs = new LinkedHashSet<>();
lhs.add("One");
lhs.add("Two");
lhs.clear();
System.out.println(lhs.isEmpty());`,
      options: [
        "true",
        "false",
        "Throws NullPointerException",
        "Nothing is printed"
      ],
      answer: 0,
      explanation: "`clear()` removes all entries from the hash map and unlinks the doubly linked list nodes, resetting size to 0 and making `isEmpty()` return true.",
      difficulty: "easy"
    },
    {
      id: "lhs_14",
      type: "theory",
      question: "In what real-world scenario is LinkedHashSet best suited?",
      options: [
        "Sorting elements in reverse numerical sequence.",
        "Maintaining a registry of unique items while preserving their exact order of registration.",
        "Performing high-speed parallel mathematical range calculations.",
        "Stack-based backtracking algorithms."
      ],
      answer: 1,
      explanation: "LinkedHashSet is ideal for scenarios requiring unique elements (Set properties) and preservation of chronological insertion order (e.g. keeping track of clean recent inputs).",
      difficulty: "medium"
    },
    {
      id: "lhs_15",
      type: "practical",
      question: "What is the result of using a custom Comparator with LinkedHashSet?",
      options: [
        "LinkedHashSet sorts elements based on the Comparator rules.",
        "It throws a compile-time error because LinkedHashSet constructors do not accept a Comparator.",
        "It ignores the comparator and maintains insertion order.",
        "It converts into a TreeSet automatically."
      ],
      answer: 1,
      explanation: "LinkedHashSet does not support custom sorted indexing. Its constructors do not take Comparators; sorting is strictly by insertion order. Attempting to pass a Comparator to LinkedHashSet constructors results in compilation failure.",
      difficulty: "hard"
    }
  ],
  day34_treeset: [
    {
      id: "ts_1",
      type: "theory",
      question: "Which internal data structure is java.util.TreeSet based upon?",
      options: [
        "A binary heap.",
        "A red-black tree (TreeMap instance).",
        "A hash table with bucket chains.",
        "A dynamic array."
      ],
      answer: 1,
      explanation: "TreeSet implements java.util.NavigableSet and is backed by a `TreeMap` instance under the hood, which uses a self-balancing Red-Black tree.",
      difficulty: "easy"
    },
    {
      id: "ts_2",
      type: "theory",
      question: "How does TreeSet determine duplicate elements?",
      options: [
        "Using hashCode() and equals() values.",
        "Using key reference comparisons.",
        "Using compareTo() or compare() return values. If compare returns 0, the element is a duplicate.",
        "Using the equals() method only."
      ],
      answer: 2,
      explanation: "Unlike HashSet, TreeSet does NOT use `equals()` or `hashCode()`. It uses `compareTo()` (from Comparable) or `compare()` (from a custom Comparator). If it returns 0, TreeSet treats the elements as equivalent and will not add the duplicate.",
      difficulty: "hard"
    },
    {
      id: "ts_3",
      type: "practical",
      question: "What is the output of compiling and executing this TreeSet code?",
      code: `Set<String> set = new TreeSet<>();
set.add("Banana");
set.add("Apple");
set.add("Cherry");
System.out.println(set);`,
      options: [
        "[Banana, Apple, Cherry]",
        "[Apple, Banana, Cherry]",
        "[Cherry, Banana, Apple]",
        "Throws ClassCastException"
      ],
      answer: 1,
      explanation: "TreeSet sorts elements in natural sorting order by default. Since String implements Comparable, the elements are sorted alphabetically: `[Apple, Banana, Cherry]`.",
      difficulty: "easy"
    },
    {
      id: "ts_4",
      type: "practical",
      question: "What is the behavior of TreeSet regarding null elements in modern Java (Java 7 and above)?",
      options: [
        "It stores null elements at the beginning of the set.",
        "It stores null elements at the end of the set.",
        "It throws a NullPointerException on add(null).",
        "It ignores null elements."
      ],
      answer: 2,
      explanation: "Since Java 7, TreeSet does not allow null values. Adding null throws a NullPointerException because the tree must call `compareTo` or `compare` on the key, which fails with null.",
      difficulty: "medium"
    },
    {
      id: "ts_5",
      type: "theory",
      question: "What is the time complexity of basic operations (add, remove, contains) in a TreeSet of size N?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 1,
      explanation: "Because Red-Black trees are self-balancing binary search trees, search, insert, and delete operations take O(log N) logarithmic time.",
      difficulty: "easy"
    },
    {
      id: "ts_6",
      type: "practical",
      question: "What is the output of the following code snippet?",
      code: `TreeSet<Integer> set = new TreeSet<>(Arrays.asList(10, 20, 30, 40));
System.out.println(set.higher(20) + " " + set.ceiling(20));`,
      options: [
        "30 20",
        "20 20",
        "30 30",
        "20 30"
      ],
      answer: 0,
      explanation: "`higher(E e)` returns the strictly greater element (30). `ceiling(E e)` returns the least element greater than OR equal to e (20).",
      difficulty: "medium"
    },
    {
      id: "ts_7",
      type: "practical",
      question: "What happens if we add custom objects (which do not implement Comparable) to a TreeSet that has no custom Comparator?",
      options: [
        "The code compiles and runs, sorting elements by their hashCode.",
        "Throws a ClassCastException at runtime when adding the second element.",
        "Compiles but throws NullPointerException.",
        "It fails to compile."
      ],
      answer: 1,
      explanation: "If custom objects do not implement `Comparable` and no `Comparator` is provided, adding the first element might succeed (since no comparison occurs yet), but adding the second element attempts to cast the objects and throws `java.lang.ClassCastException`.",
      difficulty: "hard"
    },
    {
      id: "ts_8",
      type: "practical",
      question: "What is printed by this code?",
      code: `TreeSet<Integer> set = new TreeSet<>(Arrays.asList(5, 10, 15, 20));
System.out.println(set.headSet(15));`,
      options: [
        "[5, 10, 15]",
        "[5, 10]",
        "[15, 20]",
        "[10, 15]"
      ],
      answer: 1,
      explanation: "`headSet(toElement)` returns a view of the portion of this set whose elements are strictly less than `toElement` (15). Hence, it prints `[5, 10]`. To include 15, use `headSet(15, true)`.",
      difficulty: "medium"
    },
    {
      id: "ts_9",
      type: "theory",
      question: "Which interface is TreeSet specifically implementing to gain sorting and range navigation methods?",
      options: [
        "List",
        "Queue",
        "NavigableSet",
        "RandomAccess"
      ],
      answer: 2,
      explanation: "TreeSet implements the `java.util.NavigableSet` interface, which extends `SortedSet` and provides navigation queries like higher, lower, floor, ceiling, and subset ranges.",
      difficulty: "easy"
    },
    {
      id: "ts_10",
      type: "practical",
      question: "What is printed by this code?",
      code: `TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 3, 5));
System.out.println(set.pollFirst() + " " + set.pollLast());`,
      options: [
        "1 5",
        "1 3",
        "5 1",
        "Throws NoSuchElementException"
      ],
      answer: 0,
      explanation: "`pollFirst()` removes and returns the lowest element (1), and `pollLast()` removes and returns the highest remaining element (5).",
      difficulty: "medium"
    },
    {
      id: "ts_11",
      type: "practical",
      question: "What is the print result of the following code snippet?",
      code: `TreeSet<String> set = new TreeSet<>((s1, s2) -> s2.compareTo(s1));
set.add("A");
set.add("B");
System.out.println(set);`,
      options: [
        "[A, B]",
        "[B, A]",
        "Throws ClassCastException",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "We passed a custom Comparator that reverses natural sorting (`s2.compareTo(s1)`). Thus, the elements are sorted in descending order: `[B, A]`.",
      difficulty: "medium"
    },
    {
      id: "ts_12",
      type: "theory",
      question: "In what scenario is TreeSet preferred over HashSet?",
      options: [
        "When high performance lookups are required.",
        "When elements must be maintained in a sorted order and searched by ranges.",
        "When memory footprint is a critical constraint.",
        "When multi-threaded operations are performed."
      ],
      answer: 1,
      explanation: "TreeSet is ideal when elements must be sorted or queried by range values (e.g. finding numbers between X and Y). HashSet is preferred when only raw membership checks (contains) are needed, as it is faster.",
      difficulty: "medium"
    },
    {
      id: "ts_13",
      type: "practical",
      question: "What is the return value of floor(18) on a TreeSet containing [10, 15, 20, 25]?",
      options: [
        "10",
        "15",
        "20",
        "Null"
      ],
      answer: 1,
      explanation: "`floor(E e)` returns the greatest element in the set less than or equal to the given element. For 18, it returns 15.",
      difficulty: "medium"
    },
    {
      id: "ts_14",
      type: "practical",
      question: "What is the output of the following operations?",
      code: `TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 2, 3));
Set<Integer> revSet = set.descendingSet();
System.out.println(revSet);`,
      options: [
        "[3, 2, 1]",
        "[1, 2, 3]",
        "Throws UnsupportedOperationException",
        "Null"
      ],
      answer: 0,
      explanation: "`descendingSet()` returns a reverse order view of the elements contained in the TreeSet, which prints `[3, 2, 1]`.",
      difficulty: "medium"
    },
    {
      id: "ts_15",
      type: "theory",
      question: "What happens if a custom object added to a TreeSet changes its state such that its comparison keys change?",
      options: [
        "The TreeSet automatically re-balances and updates.",
        "The TreeSet throws a ConcurrentModificationException.",
        "The sorting is broken and the tree becomes corrupted, making find/remove operations fail.",
        "The changed object is moved to the root."
      ],
      answer: 2,
      explanation: "Like HashSet, mutable keys are dangerous. Modifying an object's comparison fields while it is inside a TreeSet breaks the tree's binary search invariants, corrupting the tree structure and causing lookup failures.",
      difficulty: "hard"
    }
  ],
  day35_priorityqueue: [
    {
      id: "pq_1",
      type: "theory",
      question: "What is the underlying data structure of java.util.PriorityQueue?",
      options: [
        "A Doubly Linked List.",
        "A binary heap (represented as a dynamic array).",
        "A self-balancing Red-Black Tree.",
        "A hash table with index sorting."
      ],
      answer: 1,
      explanation: "PriorityQueue is implemented as a balanced binary heap, stored internally within a contiguous array of objects.",
      difficulty: "medium"
    },
    {
      id: "pq_2",
      type: "theory",
      question: "What is the default sorting model of a PriorityQueue when no Comparator is specified?",
      options: [
        "First-In, First-Out (FIFO) arrival order.",
        "Least element first based on natural ordering (min-heap).",
        "Largest element first based on natural ordering (max-heap).",
        "Alphabetical order of memory addresses."
      ],
      answer: 1,
      explanation: "By default, PriorityQueue acts as a min-heap, placing the least element (lowest priority) at the head of the queue according to natural ordering.",
      difficulty: "easy"
    },
    {
      id: "pq_3",
      type: "practical",
      question: "What is the time complexity of the peek() operation on a PriorityQueue of size N?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 0,
      explanation: "`peek()` retrieves the element at the root of the binary heap (index 0 of the backing array), taking O(1) constant time.",
      difficulty: "easy"
    },
    {
      id: "pq_4",
      type: "practical",
      question: "What is the time complexity of offer() and poll() in a PriorityQueue of size N?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 1,
      explanation: "Inserting (`offer()`) or extracting (`poll()`) requires heapifying (bubbling up or down) to maintain the binary heap property, which takes O(log N) logarithmic time.",
      difficulty: "medium"
    },
    {
      id: "pq_5",
      type: "practical",
      question: "What is the output of the following code snippet?",
      code: `PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);
System.out.println(pq.poll() + " " + pq.peek());`,
      options: [
        "30 20",
        "10 20",
        "10 30",
        "30 10"
      ],
      answer: 1,
      explanation: "`poll()` extracts the head of the min-heap, which is the lowest value (10). The remaining elements are 20 and 30. `peek()` retrieves the new head without removing it, which is 20.",
      difficulty: "medium"
    },
    {
      id: "pq_6",
      type: "practical",
      question: "What is the behavior of PriorityQueue regarding null elements?",
      options: [
        "It places null at the head of the queue.",
        "It throws a NullPointerException on offer(null).",
        "It places null at the tail of the queue.",
        "It ignores null insertions."
      ],
      answer: 1,
      explanation: "PriorityQueue does not permit null elements. Attempting to add null throws a NullPointerException because the heap must compare elements.",
      difficulty: "easy"
    },
    {
      id: "pq_7",
      type: "practical",
      question: "What happens if we iterate over a PriorityQueue using an Iterator?",
      options: [
        "Elements are returned in sorted priority order.",
        "The iterator is not guaranteed to traverse elements in any particular order.",
        "Throws UnsupportedOperationException.",
        "Elements are returned in LIFO order."
      ],
      answer: 1,
      explanation: "The Iterator of a PriorityQueue does NOT guarantee traversal in sorted order. It traverses the backing heap array directly (level-by-level). To get sorted order, you must repeatedly call `poll()` until the queue is empty.",
      difficulty: "hard"
    },
    {
      id: "pq_8",
      type: "theory",
      question: "Which of the following is true about PriorityQueue concurrency?",
      options: [
        "PriorityQueue is synchronized and thread-safe.",
        "PriorityQueue is not thread-safe. PriorityBlockingQueue should be used for concurrent thread execution.",
        "PriorityQueue supports concurrent read locks.",
        "It utilizes copy-on-write mechanisms."
      ],
      answer: 1,
      explanation: "PriorityQueue is not synchronized. For multi-threaded priority tasks, use `java.util.concurrent.PriorityBlockingQueue`.",
      difficulty: "easy"
    },
    {
      id: "pq_9",
      type: "practical",
      question: "What is printed by this code?",
      code: `PriorityQueue<String> pq = new PriorityQueue<>(Collections.reverseOrder());
pq.offer("A");
pq.offer("C");
pq.offer("B");
System.out.println(pq.poll());`,
      options: [
        "A",
        "B",
        "C",
        "Throws ClassCastException"
      ],
      answer: 2,
      explanation: "We passed `Collections.reverseOrder()`, converting it to a max-heap. The head of the queue is now the largest element ('C'), so `poll()` returns 'C'.",
      difficulty: "medium"
    },
    {
      id: "pq_10",
      type: "practical",
      question: "What is the time complexity of removing an arbitrary element using remove(Object o) in a PriorityQueue?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 2,
      explanation: "Removing an arbitrary element requires searching for it in the underlying array, which takes O(N) linear time, followed by heap restructuring taking O(log N). Thus, the overall operation takes O(N) time.",
      difficulty: "hard"
    },
    {
      id: "pq_11",
      type: "theory",
      question: "What is the default initial capacity of a PriorityQueue?",
      options: [
        "16",
        "11",
        "10",
        "12"
      ],
      answer: 1,
      explanation: "The default initial capacity of a PriorityQueue in Java is 11.",
      difficulty: "hard"
    },
    {
      id: "pq_12",
      type: "practical",
      question: "What occurs if you add custom objects that do not implement Comparable to a PriorityQueue without a Comparator?",
      options: [
        "They are sorted based on their memory addresses.",
        "Throws a ClassCastException at runtime on adding elements.",
        "They are placed randomly without sorting.",
        "Compilation fails."
      ],
      answer: 1,
      explanation: "PriorityQueue must compare elements to sort them. If elements are not Comparable and no custom Comparator is provided, the offer/add operation throws a ClassCastException.",
      difficulty: "medium"
    },
    {
      id: "pq_13",
      type: "practical",
      question: "What is the output of the following code?",
      code: `PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.add(5);
pq.add(10);
System.out.println(pq.contains(10) + " " + pq.contains(15));`,
      options: [
        "true false",
        "true true",
        "false false",
        "Throws NoSuchElementException"
      ],
      answer: 0,
      explanation: "`contains()` checks if the object exists in the backing array, returning true for 10 and false for 15.",
      difficulty: "easy"
    },
    {
      id: "pq_14",
      type: "theory",
      question: "How does PriorityQueue grow its capacity when it becomes full?",
      options: [
        "It always doubles capacity.",
        "It always increases by 50%.",
        "If capacity is small (< 64), it grows by capacity + 2; if large (>= 64), it grows by 50% (right shifted by 1).",
        "It requests virtual memory paging."
      ],
      answer: 2,
      explanation: "PriorityQueue's growth policy is: if current capacity is less than 64, it increases by capacity + 2. If it is 64 or more, it increases by 50% of the current capacity.",
      difficulty: "hard"
    },
    {
      id: "pq_15",
      type: "practical",
      question: "What is the state of PriorityQueue after executing the clear() method?",
      options: [
        "It is populated with null values but size remains.",
        "It is completely cleared of elements, and size is set to 0.",
        "It deletes only the head element.",
        "It throws UnsupportedOperationException."
      ],
      answer: 1,
      explanation: "`clear()` clears all elements and sets the size of the PriorityQueue to 0.",
      difficulty: "easy"
    }
  ],
  day36_arraydeque: [
    {
      id: "ad_1",
      type: "theory",
      question: "What is the internal structure of java.util.ArrayDeque?",
      options: [
        "A doubly linked list of node blocks.",
        "A circular array with head and tail index references.",
        "A tree-based structure.",
        "A single-ended static list."
      ],
      answer: 1,
      explanation: "ArrayDeque is implemented as a resizable circular array with head and tail index pointers.",
      difficulty: "medium"
    },
    {
      id: "ad_2",
      type: "theory",
      question: "Which interfaces are implemented by java.util.ArrayDeque?",
      options: [
        "Queue only",
        "Deque only",
        "Deque and List",
        "Deque (which extends Queue)"
      ],
      answer: 3,
      explanation: "ArrayDeque implements the `Deque` interface, which is a subinterface of `Queue` representing double-ended queues. It does NOT implement `List`.",
      difficulty: "easy"
    },
    {
      id: "ad_3",
      type: "practical",
      question: "What is the performance of ArrayDeque compared to LinkedList when used as a Stack or Queue?",
      options: [
        "ArrayDeque is slower due to array copying operations.",
        "ArrayDeque is faster because it does not allocate node objects and has better cache locality.",
        "They perform identically.",
        "LinkedList is faster for stack operations."
      ],
      answer: 1,
      explanation: "ArrayDeque is generally faster than LinkedList for stacks and queues. It stores elements directly in a contiguous array without the garbage collection and node pointer overhead of LinkedList.",
      difficulty: "medium"
    },
    {
      id: "ad_4",
      type: "practical",
      question: "What is the behavior of ArrayDeque regarding null elements?",
      options: [
        "It permits null values at both ends.",
        "It throws a NullPointerException on adding null.",
        "It converts null to a dummy object.",
        "It ignores null values."
      ],
      answer: 1,
      explanation: "ArrayDeque does NOT permit null elements. Operations like `poll()` return null to indicate that the deque is empty. Allowing null elements would make it impossible to distinguish between an empty deque and a null value.",
      difficulty: "medium"
    },
    {
      id: "ad_5",
      type: "practical",
      question: "What does the following code print?",
      code: `ArrayDeque<String> ad = new ArrayDeque<>();
ad.addFirst("A");
ad.addLast("B");
ad.offerFirst("C");
ad.offerLast("D");
System.out.println(ad.pollFirst() + " " + ad.pollLast());`,
      options: [
        "C D",
        "A B",
        "C B",
        "A D"
      ],
      answer: 0,
      explanation: "Operations step: `['A']` -> `['A', 'B']` -> `['C', 'A', 'B']` -> `['C', 'A', 'B', 'D']`. `pollFirst()` retrieves and removes the first element ('C'), and `pollLast()` retrieves and removes the last element ('D').",
      difficulty: "medium"
    },
    {
      id: "ad_6",
      type: "theory",
      question: "What is the time complexity of insertion and removal operations at both ends in an ArrayDeque?",
      options: [
        "O(1) amortized constant time.",
        "O(N) linear time.",
        "O(log N) logarithmic time.",
        "O(1) worst-case"
      ],
      answer: 0,
      explanation: "Adding or removing elements at either the head or tail is a constant time operation, amortized to O(1) (except during array resizing).",
      difficulty: "easy"
    },
    {
      id: "ad_7",
      type: "practical",
      question: "What is the output of the following stack operations on ArrayDeque?",
      code: `ArrayDeque<Integer> stack = new ArrayDeque<>();
stack.push(10);
stack.push(20);
System.out.println(stack.pop() + " " + stack.peek());`,
      options: [
        "10 20",
        "20 10",
        "20 20",
        "10 10"
      ],
      answer: 1,
      explanation: "ArrayDeque acts as a LIFO stack via `push` (inserts first) and `pop` (removes first). We push 10, then push 20 (now head is 20). `pop()` returns 20, and `peek()` returns the next head, which is 10.",
      difficulty: "medium"
    },
    {
      id: "ad_8",
      type: "theory",
      question: "Does ArrayDeque support random access (index-based operations)?",
      options: [
        "Yes, via the get(int index) method.",
        "No, it does not provide index-based lookup methods.",
        "Only if instantiated with initial capacity.",
        "Only for search operations."
      ],
      answer: 1,
      explanation: "ArrayDeque does not implement List or provide a `get(int index)` method. Elements can only be retrieved from the ends, or by iterating.",
      difficulty: "easy"
    },
    {
      id: "ad_9",
      type: "practical",
      question: "What is the default initial capacity of an ArrayDeque?",
      options: [
        "10",
        "16",
        "8",
        "32"
      ],
      answer: 1,
      explanation: "The default initial capacity of an ArrayDeque is 16.",
      difficulty: "hard"
    },
    {
      id: "ad_10",
      type: "practical",
      question: "What occurs when the internal circular array of ArrayDeque becomes full?",
      options: [
        "It throws a QueueFullException.",
        "It doubles in size, remapping elements in contiguous order.",
        "It wraps around and overwrites old elements.",
        "It blocks the thread."
      ],
      answer: 1,
      explanation: "When full (head index equals tail index), ArrayDeque allocates a new array of double the size and copies elements, resolving the circular boundaries to contiguous sequence.",
      difficulty: "hard"
    },
    {
      id: "ad_11",
      type: "theory",
      question: "Which of the following classes is NOT thread-safe?",
      options: [
        "ArrayDeque",
        "ConcurrentLinkedDeque",
        "LinkedBlockingDeque",
        "Vector"
      ],
      answer: 0,
      explanation: "ArrayDeque is not thread-safe. In multithreaded environments, ConcurrentLinkedDeque or synchronized wrappers should be used.",
      difficulty: "easy"
    },
    {
      id: "ad_12",
      type: "practical",
      question: "What is the output of the following operations?",
      code: `ArrayDeque<String> ad = new ArrayDeque<>();
ad.add("A");
ad.add("B");
ad.add("C");
ad.removeFirstOccurrence("B");
System.out.println(ad);`,
      options: [
        "[A, C]",
        "[A, B]",
        "[B, C]",
        "Throws UnsupportedOperationException"
      ],
      answer: 0,
      explanation: "`removeFirstOccurrence(Object o)` traverses and deletes the first instance of 'B', resulting in `[A, C]`.",
      difficulty: "medium"
    },
    {
      id: "ad_13",
      type: "theory",
      question: "Why must internal capacity parameters of ArrayDeque always be powers of two?",
      options: [
        "To satisfy memory word sizing layout.",
        "To allow compiler array alignment optimizations.",
        "To enable bitwise AND operations for circular array indexing calculations (modulus indexing: index & (length - 1)) instead of slow division operators.",
        "To reduce garbage collection sweeps."
      ],
      answer: 2,
      explanation: "If array length is a power of 2, the circular index wrap-around `(index + 1) % length` can be optimized to `(index + 1) & (length - 1)` using bitwise operations, which are much faster than divisions.",
      difficulty: "hard"
    },
    {
      id: "ad_14",
      type: "practical",
      question: "What is the return value of peekFirst() on an empty ArrayDeque?",
      options: [
        "Returns null.",
        "Throws NoSuchElementException.",
        "Throws EmptyStackException.",
        "Throws IndexOutOfBoundsException."
      ],
      answer: 0,
      explanation: "Unlike `getFirst()`, which throws an exception if the deque is empty, `peekFirst()` returns null.",
      difficulty: "easy"
    },
    {
      id: "ad_15",
      type: "practical",
      question: "What occurs if you iterate over an ArrayDeque while modifying it?",
      options: [
        "The modification is applied after iteration completes.",
        "The iterator is fail-fast and throws ConcurrentModificationException.",
        "It runs normally without throwing exceptions.",
        "The iteration freezes."
      ],
      answer: 1,
      explanation: "ArrayDeque iterators check for modifications and throw ConcurrentModificationException if the deque is modified during traversal.",
      difficulty: "easy"
    }
  ],
  day37_hashmap: [
    {
      id: "hm_1",
      type: "theory",
      question: "How does java.util.HashMap store key-value pairs internally in Java 8?",
      options: [
        "As a sorted binary search tree.",
        "As an array of Node buckets, where each bucket is a linked list that can convert to a balanced Red-Black tree.",
        "As a doubly linked list.",
        "As two separate contiguous arrays."
      ],
      answer: 1,
      explanation: "HashMap is backed by a bucket array. In Java 8+, if a bucket's collisions exceed a threshold, the linked list is treeified (converted into a balanced Red-Black tree) to prevent performance degradation.",
      difficulty: "easy"
    },
    {
      id: "hm_2",
      type: "theory",
      question: "What is the threshold value (TREEIFY_THRESHOLD) at which a bucket linked list is converted to a Red-Black tree in Java 8?",
      options: [
        "6",
        "8",
        "10",
        "12"
      ],
      answer: 1,
      explanation: "The TREEIFY_THRESHOLD is 8. When a bucket has 8 or more nodes, HashMap attempts to convert the linked list into a tree.",
      difficulty: "medium"
    },
    {
      id: "hm_3",
      type: "theory",
      question: "What secondary condition is checked before treeifying a bucket in a HashMap?",
      options: [
        "The total size of the map must be greater than 1000.",
        "The array capacity of the map must be at least MIN_TREEIFY_CAPACITY (64).",
        "The load factor must exceed 0.9.",
        "The VM must have sufficient Metaspace."
      ],
      answer: 1,
      explanation: "Even if a bucket reaches 8 elements, the map will not treeify if its overall array capacity is less than 64. Instead, it resizes the table, because smaller arrays are better off spreading elements via resizing.",
      difficulty: "hard"
    },
    {
      id: "hm_4",
      type: "practical",
      question: "How does HashMap determine which bucket index to place a key in?",
      options: [
        "Using key.hashCode() % tableLength directly.",
        "Applying a custom hash spread function: (h = key.hashCode()) ^ (h >>> 16), then calculating index using: hash & (tableLength - 1).",
        "Using key.toString() index encoding.",
        "Using memory allocation address registers."
      ],
      answer: 1,
      explanation: "HashMap XORs the high bits of the key's hashCode down `(h ^ (h >>> 16))` to reduce collision. It then calculates the bucket index using bitwise AND `hash & (n-1)`, which is equivalent to modulo division because capacity `n` is always a power of 2.",
      difficulty: "hard"
    },
    {
      id: "hm_5",
      type: "practical",
      question: "What is the behavior of HashMap regarding null keys and values?",
      options: [
        "It does not permit null keys or values.",
        "It permits at most one null key and multiple null values.",
        "It permits multiple null keys and one null value.",
        "It allows null values but throws an exception on null keys."
      ],
      answer: 1,
      explanation: "HashMap allows at most one null key (which is always mapped to bucket index 0) and multiple null values.",
      difficulty: "easy"
    },
    {
      id: "hm_6",
      type: "theory",
      question: "What is the threshold (UNTREEIFY_THRESHOLD) at which a Red-Black tree is converted back to a linked list during resizing?",
      options: [
        "8",
        "6",
        "4",
        "0"
      ],
      answer: 1,
      explanation: "The UNTREEIFY_THRESHOLD is 6. If resizing splits a tree bucket and reduces the node count to 6 or fewer, the tree is converted back to a linked list.",
      difficulty: "medium"
    },
    {
      id: "hm_7",
      type: "practical",
      question: "What occurs during a HashMap resize operation?",
      options: [
        "The bucket capacity is doubled, and all keys are rehashed and distributed to their new bucket locations.",
        "Unused entries are deleted from memory.",
        "The map becomes read-only.",
        "The load factor is dynamically reduced."
      ],
      answer: 0,
      explanation: "When size exceeds the capacity threshold (capacity * loadFactor), HashMap allocates a new array of double the size, and rehashes and redistributes the entries.",
      difficulty: "medium"
    },
    {
      id: "hm_8",
      type: "practical",
      question: "What is printed by this code?",
      code: `Map<String, String> map = new HashMap<>();
map.put("A", "1");
System.out.println(map.put("A", "2") + " " + map.get("A"));`,
      options: [
        "1 2",
        "2 2",
        "null 2",
        "Throws IllegalArgumentException"
      ],
      answer: 0,
      explanation: "The `put(key, value)` method returns the OLD value associated with the key if it already existed, or `null` if the key was new. Since 'A' was mapped to '1', putting '2' returns '1', and the new value is '2'.",
      difficulty: "medium"
    },
    {
      id: "hm_9",
      type: "theory",
      question: "Why is it highly recommended to use immutable objects (like String or Integer) as keys in a HashMap?",
      options: [
        "Because mutable keys cannot be compiled.",
        "Because changes to key fields alter the hashCode, making the entry unretrievable and causing memory leaks.",
        "Because mutable keys use double memory.",
        "Because immutable objects are thread-safe."
      ],
      answer: 1,
      explanation: "If a key's fields change, its `hashCode()` changes, placing it in a different bucket logically. The map is unable to find the entry since it searches the new hash bucket, rendering the entry 'lost'.",
      difficulty: "medium"
    },
    {
      id: "hm_10",
      type: "practical",
      question: "What is printed by this code?",
      code: `Map<String, Integer> map = new HashMap<>();
map.put("A", 10);
System.out.println(map.getOrDefault("B", 20) + " " + map.putIfAbsent("A", 30));`,
      options: [
        "20 10",
        "20 30",
        "20 null",
        "Throws NullPointerException"
      ],
      answer: 0,
      explanation: "`getOrDefault('B', 20)` returns 20 since 'B' is absent. `putIfAbsent('A', 30)` does not overwrite 'A' since it is already present, and returns its current value (10).",
      difficulty: "medium"
    },
    {
      id: "hm_11",
      type: "theory",
      question: "What is the worst-case lookup time complexity of a HashMap in Java 8?",
      options: [
        "O(N)",
        "O(log N)",
        "O(1)",
        "O(N log N)"
      ],
      answer: 1,
      explanation: "In Java 8+, because hash collisions cause buckets to convert to balanced Red-Black trees, worst-case lookup time is O(log N) rather than O(N).",
      difficulty: "hard"
    },
    {
      id: "hm_12",
      type: "practical",
      question: "What is the result of using a non-thread-safe HashMap concurrently in JDK 7 during resizing?",
      options: [
        "It threw exceptions instantly.",
        "It could create a cyclic loop in bucket node links, causing infinite loops and 100% CPU usage during get() operations.",
        "The capacity was restricted.",
        "Data was auto-saved."
      ],
      answer: 1,
      explanation: "In JDK 7, the resize operation used a transfer mechanism that reversed the order of nodes. Concurrently resizing could create cyclic dependencies in bucket links, resulting in infinite loops on `get()` calls.",
      difficulty: "hard"
    },
    {
      id: "hm_13",
      type: "practical",
      question: "What is printed by the following code?",
      code: `Map<String, String> map = new HashMap<>();
map.put(null, "Val");
System.out.println(map.containsKey(null) + " " + map.get(null));`,
      options: [
        "true Val",
        "false null",
        "Throws NullPointerException",
        "true null"
      ],
      answer: 0,
      explanation: "HashMap allows a null key. It maps the null key to index 0, so containsKey and get work successfully.",
      difficulty: "easy"
    },
    {
      id: "hm_14",
      type: "theory",
      question: "What is the default load factor of HashMap, and what does it represent?",
      options: [
        "0.5; maps are resized when half full.",
        "0.75; maps are resized when 75% of bucket slots are filled.",
        "0.75; threshold to treeify buckets.",
        "1.0; resizes only when completely full."
      ],
      answer: 1,
      explanation: "The default load factor is 0.75. It represents the trade-off between space and lookup time. The map resizes when capacity reaches 75% utilization.",
      difficulty: "easy"
    },
    {
      id: "hm_15",
      type: "practical",
      question: "What is printed by the following code?",
      code: `Map<Integer, String> map = new HashMap<>();
map.put(1, "One");
map.computeIfAbsent(1, k -> "NewOne");
map.computeIfAbsent(2, k -> "Two");
System.out.println(map.get(1) + " " + map.get(2));`,
      options: [
        "One Two",
        "NewOne Two",
        "One null",
        "NewOne null"
      ],
      answer: 0,
      explanation: "`computeIfAbsent()` only runs the mapping function and inserts the result if the key is absent or mapped to null. Since 1 is already mapped to 'One', it is unchanged. 2 is absent, so it is mapped to 'Two'.",
      difficulty: "medium"
    }
  ],
  day38_linkedhashmap: [
    {
      id: "lhm_1",
      type: "theory",
      question: "How does LinkedHashMap maintain insertion order?",
      options: [
        "By sorting keys dynamically using a Comparator.",
        "By maintaining a running doubly linked list that links all its entries.",
        "By saving elements in secondary array lists.",
        "By hashing elements using sequential keys."
      ],
      answer: 1,
      explanation: "LinkedHashMap inherits HashMap and overlays a doubly linked list through all elements, allowing predictable insertion-order iteration.",
      difficulty: "easy"
    },
    {
      id: "lhm_2",
      type: "theory",
      question: "What are the two ordering modes supported by LinkedHashMap?",
      options: [
        "Natural sorting order and custom Comparator order.",
        "Insertion order and Access order.",
        "Key hash order and value hash order.",
        "LIFO order and FIFO order."
      ],
      answer: 1,
      explanation: "LinkedHashMap supports ordering by insertion order (default) and access order (where reading or writing moves the queried entry to the tail of the list).",
      difficulty: "medium"
    },
    {
      id: "lhm_3",
      type: "practical",
      question: "What is printed by this LinkedHashMap in its default constructor mode?",
      code: `Map<String, String> map = new LinkedHashMap<>();
map.put("A", "1");
map.put("C", "3");
map.put("B", "2");
map.get("A");
System.out.println(map.keySet());`,
      options: [
        "[A, C, B]",
        "[C, B, A]",
        "[A, B, C]",
        "[B, C, A]"
      ],
      answer: 0,
      explanation: "By default, LinkedHashMap maintains insertion order. Accessing 'A' using `get()` has no effect on the ordering, so the keys are printed in insertion sequence: `[A, C, B]`.",
      difficulty: "easy"
    },
    {
      id: "lhm_4",
      type: "practical",
      question: "What constructor signature enables access-order mode in a LinkedHashMap?",
      options: [
        "LinkedHashMap(boolean accessOrder)",
        "LinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder)",
        "LinkedHashMap(Comparator<K> comparator)",
        "LinkedHashMap(String orderType)"
      ],
      answer: 1,
      explanation: "To enable access-order mode, you must call the 3-argument constructor: `LinkedHashMap(initialCapacity, loadFactor, accessOrder)` passing `true` for `accessOrder`.",
      difficulty: "hard"
    },
    {
      id: "lhm_5",
      type: "practical",
      question: "What does the following code print?",
      code: `LinkedHashMap<String, String> map = new LinkedHashMap<>(16, 0.75f, true);
map.put("A", "1");
map.put("B", "2");
map.put("C", "3");
map.get("B");
System.out.println(map.keySet());`,
      options: [
        "[A, B, C]",
        "[A, C, B]",
        "[B, A, C]",
        "[C, A, B]"
      ],
      answer: 1,
      explanation: "With `accessOrder` enabled, querying 'B' using `get()` moves it to the tail of the doubly linked list. The resulting access-order output is `[A, C, B]`.",
      difficulty: "hard"
    },
    {
      id: "lhm_6",
      type: "theory",
      question: "Which method can be overridden in LinkedHashMap to build a simple Least Recently Used (LRU) Cache?",
      options: [
        "removeOldEntries()",
        "removeEldestEntry(Map.Entry<K,V> eldest)",
        "evictOldest()",
        "cleanCache()"
      ],
      answer: 1,
      explanation: "The protected method `removeEldestEntry(Map.Entry eldest)` is checked by the `put()` operation. If overridden to return `true` (e.g. when size exceeds a limit), the eldest entry is automatically deleted when new elements are added.",
      difficulty: "hard"
    },
    {
      id: "lhm_7",
      type: "theory",
      question: "How does the performance of LinkedHashMap iteration compare to HashMap?",
      options: [
        "LinkedHashMap iteration is slower because of bucket structures.",
        "LinkedHashMap iteration is faster because it traverses the linked list directly in O(size) time, without visiting empty bucket slots.",
        "They iterate at identical speeds.",
        "LinkedHashMap iteration requires O(N log N) sorting."
      ],
      answer: 1,
      explanation: "HashMap iteration requires scanning all buckets, which depends on capacity. LinkedHashMap iterates in O(size) time by traversing its doubly linked list directly, which is faster for sparse maps.",
      difficulty: "medium"
    },
    {
      id: "lhm_8",
      type: "practical",
      question: "What occurs if you re-insert an existing key using put() in a default LinkedHashMap?",
      options: [
        "It updates the value and moves the key to the end of the insertion order.",
        "It updates the value but does not alter the key's original insertion position.",
        "It throws an exception.",
        "The operation is ignored."
      ],
      answer: 1,
      explanation: "In default insertion-order mode, re-inserting an existing key (e.g. `put('A', newVal)` when 'A' already exists) updates the value but does not change the key's insertion order position.",
      difficulty: "medium"
    },
    {
      id: "lhm_9",
      type: "practical",
      question: "What is printed by this code?",
      code: `Map<String, String> map = new LinkedHashMap<>();
map.put(null, "A");
map.put("B", null);
System.out.println(map.size() + " " + map.containsKey(null));`,
      options: [
        "2 true",
        "1 false",
        "Throws NullPointerException",
        "2 false"
      ],
      answer: 0,
      explanation: "LinkedHashMap inherits HashMap's null capabilities, supporting a single null key and multiple null values, yielding size 2.",
      difficulty: "easy"
    },
    {
      id: "lhm_10",
      type: "theory",
      question: "What is the time complexity of the containsValue(Object value) method in a LinkedHashMap?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N log N)"
      ],
      answer: 1,
      explanation: "Finding a value requires traversing the entire map. By walking the doubly linked list, it traverses exactly N elements, yielding O(N) linear time complexity.",
      difficulty: "easy"
    },
    {
      id: "lhm_11",
      type: "practical",
      question: "What is the output of the following LRU implementation?",
      code: `LinkedHashMap<Integer, String> cache = new LinkedHashMap<>(5, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry<Integer, String> eldest) {
        return size() > 2;
    }
};
cache.put(1, "A");
cache.put(2, "B");
cache.put(3, "C");
System.out.println(cache.keySet());`,
      options: [
        "[1, 2, 3]",
        "[2, 3]",
        "[1, 2]",
        "[3]"
      ],
      answer: 1,
      explanation: "The threshold size is 2. Putting 1 and 2 works. When 3 is put, size becomes 3, which is > 2, so `removeEldestEntry` returns true, deleting the eldest entry (1). The resulting keys are `[2, 3]`.",
      difficulty: "hard"
    },
    {
      id: "lhm_12",
      type: "theory",
      question: "Which class is LinkedHashMap a direct subclass of?",
      options: [
        "AbstractMap",
        "HashMap",
        "TreeMap",
        "Object"
      ],
      answer: 1,
      explanation: "LinkedHashMap directly extends `java.util.HashMap`.",
      difficulty: "easy"
    },
    {
      id: "lhm_13",
      type: "practical",
      question: "What occurs if you modify a LinkedHashMap structurally (add or delete entries) while iterating over it via its entrySet iterator?",
      options: [
        "Changes are applied normally.",
        "Throws ConcurrentModificationException.",
        "The iterator freezes.",
        "The modification is deferred."
      ],
      answer: 1,
      explanation: "Like HashMap, LinkedHashMap's iterator is fail-fast and throws ConcurrentModificationException on concurrent modification.",
      difficulty: "easy"
    },
    {
      id: "lhm_14",
      type: "theory",
      question: "How does the memory footprint of LinkedHashMap compare to HashMap?",
      options: [
        "LinkedHashMap uses less memory because it lacks bucketing structures.",
        "LinkedHashMap uses more memory because its nodes have extra fields for previous and next pointers to link elements.",
        "They are identical.",
        "LinkedHashMap allocates off-heap."
      ],
      answer: 1,
      explanation: "LinkedHashMap nodes inherit HashMap.Node and add `before` and `after` pointer references. This increases memory overhead by 8-16 bytes per node compared to HashMap.",
      difficulty: "medium"
    },
    {
      id: "lhm_15",
      type: "practical",
      question: "What is the time complexity of basic lookup operations (get, put) in LinkedHashMap?",
      options: [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N log N)"
      ],
      answer: 0,
      explanation: "Despite the pointer maintenance, index calculations are performed using hash table methods, maintaining the O(1) constant time complexity.",
      difficulty: "easy"
    }
  ],
  day39_treemap: [
    {
      id: "tm_1",
      type: "theory",
      question: "Which data structure is java.util.TreeMap based on?",
      options: [
        "A hash table with bucket chains.",
        "A self-balancing Red-Black Tree.",
        "A balanced binary heap.",
        "A skip list structure."
      ],
      answer: 1,
      explanation: "TreeMap is implemented as a self-balancing Red-Black binary search tree.",
      difficulty: "easy"
    },
    {
      id: "tm_2",
      type: "theory",
      question: "How are keys ordered in a TreeMap?",
      options: [
        "Chronological insertion order.",
        "Natural ordering of keys, or custom ordering defined by a Comparator passed at construction.",
        "Hashing bucket sequence.",
        "LIFO sequence."
      ],
      answer: 1,
      explanation: "TreeMap keys are sorted. If no custom Comparator is specified, keys are sorted in natural order (requiring keys to implement Comparable). Alternatively, sorting is defined by a custom Comparator.",
      difficulty: "easy"
    },
    {
      id: "tm_3",
      type: "practical",
      question: "What is the time complexity of basic operations (get, put, remove) in a TreeMap of size N?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 1,
      explanation: "Because Red-Black trees are self-balancing binary search trees, all search, insert, and delete operations take O(log N) logarithmic time.",
      difficulty: "easy"
    },
    {
      id: "tm_4",
      type: "practical",
      question: "What is the behavior of TreeMap regarding null keys?",
      options: [
        "It stores null keys at the beginning.",
        "It throws a NullPointerException on putting a null key.",
        "It converts null keys to empty strings.",
        "It allows a single null key."
      ],
      answer: 1,
      explanation: "TreeMap does not allow null keys. Doing so throws a NullPointerException because the tree must call `compareTo` or `compare` on the key, which fails with null.",
      difficulty: "medium"
    },
    {
      id: "tm_5",
      type: "practical",
      question: "What is printed by this TreeMap code snippet?",
      code: `TreeMap<String, String> map = new TreeMap<>();
map.put("Z", "1");
map.put("A", "2");
map.put("C", "3");
System.out.println(map.keySet());`,
      options: [
        "[Z, A, C]",
        "[A, C, Z]",
        "[Z, C, A]",
        "Throws ClassCastException"
      ],
      answer: 1,
      explanation: "Keys are sorted in natural order (alphabetically for String), resulting in `[A, C, Z]`.",
      difficulty: "easy"
    },
    {
      id: "tm_6",
      type: "practical",
      question: "What does the method pollFirstEntry() do in TreeMap?",
      options: [
        "Retrieves, but does not remove, the entry with the lowest key.",
        "Removes and returns the key-value entry associated with the lowest key in the map.",
        "Clears the map contents.",
        "Extracts the root node."
      ],
      answer: 1,
      explanation: "`pollFirstEntry()` removes and returns the key-value mapping associated with the least key in this map, or returns null if the map is empty.",
      difficulty: "medium"
    },
    {
      id: "tm_7",
      type: "practical",
      question: "What is the output of the following program?",
      code: `TreeMap<Integer, String> map = new TreeMap<>();
map.put(10, "A");
map.put(20, "B");
map.put(30, "C");
System.out.println(map.floorKey(18) + " " + map.ceilingKey(20));`,
      options: [
        "10 20",
        "20 20",
        "10 30",
        "20 30"
      ],
      answer: 0,
      explanation: "`floorKey(18)` returns the greatest key less than or equal to 18 (10). `ceilingKey(20)` returns the least key greater than or equal to 20 (20).",
      difficulty: "medium"
    },
    {
      id: "tm_8",
      type: "practical",
      question: "What occurs if you attempt to use custom class objects (without implementing Comparable) as keys in a TreeMap that has no Comparator?",
      options: [
        "They are sorted using default hashCode values.",
        "Throws ClassCastException at runtime when adding keys.",
        "Compilation fails.",
        "They are placed randomly."
      ],
      answer: 1,
      explanation: "TreeMap requires comparing keys. If keys are not Comparable and no Comparator was provided, the put operation throws a ClassCastException.",
      difficulty: "medium"
    },
    {
      id: "tm_9",
      type: "practical",
      question: "What does subMap(10, true, 20, false) return on a TreeMap containing keys [5, 10, 15, 20, 25]?",
      options: [
        "Keys [10, 15, 20]",
        "Keys [10, 15]",
        "Keys [15, 20]",
        "Keys [5, 10, 15]"
      ],
      answer: 1,
      explanation: "The subMap parameters specify: fromKey (10) inclusive (true), to toKey (20) exclusive (false). The matching keys are 10 and 15.",
      difficulty: "hard"
    },
    {
      id: "tm_10",
      type: "theory",
      question: "Which of the following describes the difference between TreeMap and HashMap?",
      options: [
        "HashMap is ordered; TreeMap is unordered.",
        "TreeMap provides O(1) lookups; HashMap provides O(log N).",
        "TreeMap sorts keys and implements NavigableMap; HashMap offers O(1) average lookup and makes no order guarantees.",
        "HashMap does not allow null values; TreeMap does."
      ],
      answer: 2,
      explanation: "TreeMap sorts keys via Red-Black trees taking O(log N) time. HashMap has no order guarantees but has O(1) average lookup speed.",
      difficulty: "easy"
    },
    {
      id: "tm_11",
      type: "practical",
      question: "What is printed by this code?",
      code: `TreeMap<Integer, String> map = new TreeMap<>();
map.put(1, "A");
map.put(2, "B");
SortedMap<Integer, String> head = map.headMap(2);
System.out.println(head);`,
      options: [
        "{1=A}",
        "{1=A, 2=B}",
        "{2=B}",
        "Throws ClassCastException"
      ],
      answer: 0,
      explanation: "The 1-argument `headMap(toKey)` returns a view of keys strictly less than `toKey` (2). Thus, it prints `{1=A}`.",
      difficulty: "medium"
    },
    {
      id: "tm_12",
      type: "theory",
      question: "How does TreeMap determine key equivalence?",
      options: [
        "Using hashCode() and equals().",
        "Strictly using compareTo() or compare() values (returning 0 means equivalent keys).",
        "Using key reference equality.",
        "Using equals() values only."
      ],
      answer: 1,
      explanation: "TreeMap uses key comparison results (`compare` or `compareTo`), ignoring `equals()` and `hashCode()` for equivalence checks.",
      difficulty: "hard"
    },
    {
      id: "tm_13",
      type: "practical",
      question: "What is the return value of firstKey() on an empty TreeMap?",
      options: [
        "Returns null.",
        "Throws NoSuchElementException.",
        "Throws IndexOutOfBoundsException.",
        "Throws EmptyStackException."
      ],
      answer: 1,
      explanation: "`firstKey()` throws `NoSuchElementException` if the map is empty.",
      difficulty: "medium"
    },
    {
      id: "tm_14",
      type: "practical",
      question: "What is printed by this code snippet?",
      code: `TreeMap<String, String> map = new TreeMap<>(Collections.reverseOrder());
map.put("A", "1");
map.put("B", "2");
System.out.println(map.firstKey());`,
      options: [
        "A",
        "B",
        "Null",
        "Throws ClassCastException"
      ],
      answer: 1,
      explanation: "Using `Collections.reverseOrder()` reverses key sorting, making 'B' the lowest sorting key. `firstKey()` returns the lowest key, which is 'B'.",
      difficulty: "medium"
    },
    {
      id: "tm_15",
      type: "theory",
      question: "Is TreeMap synchronized?",
      options: [
        "Yes, all tree structures are synchronized.",
        "No, it is not synchronized. Collections.synchronizedSortedMap should be used for safety.",
        "Only when accessing via subMap views.",
        "Only if compiled in thread safe packages."
      ],
      answer: 1,
      explanation: "TreeMap is not synchronized. Concurrent applications should wrap it using `Collections.synchronizedSortedMap(new TreeMap<>())`.",
      difficulty: "easy"
    }
  ],
  day40_hashtable: [
    {
      id: "ht_1",
      type: "theory",
      question: "What is the primary difference between Hashtable and HashMap?",
      options: [
        "HashMap is synchronized; Hashtable is not.",
        "Hashtable is synchronized and does not permit null keys or null values; HashMap is not synchronized and permits null keys and values.",
        "Hashtable is tree-based; HashMap is array-based.",
        "Hashtable is a modern addition in Java 8."
      ],
      answer: 1,
      explanation: "Hashtable is a legacy synchronized collection. It does not permit any null keys or null values. HashMap is modern, not synchronized, and allows nulls.",
      difficulty: "easy"
    },
    {
      id: "ht_2",
      type: "theory",
      question: "Which legacy class does Hashtable directly extend?",
      options: [
        "AbstractMap",
        "Dictionary",
        "AbstractCollection",
        "Object"
      ],
      answer: 1,
      explanation: "Hashtable extends the legacy abstract class `java.util.Dictionary`.",
      difficulty: "easy"
    },
    {
      id: "ht_3",
      type: "practical",
      question: "What occurs if you attempt to call put(null, \"Value\") on a Hashtable?",
      options: [
        "The value is stored at index 0.",
        "Throws a NullPointerException.",
        "The key is ignored.",
        "Throws IllegalArgumentException."
      ],
      answer: 1,
      explanation: "Hashtable does not permit null keys or values; calling put with null throws a NullPointerException.",
      difficulty: "easy"
    },
    {
      id: "ht_4",
      type: "practical",
      question: "What is the behavior difference between an Iterator and an Enumeration obtained from Hashtable?",
      options: [
        "Iterator is fail-fast; Enumeration is not fail-fast.",
        "Enumeration is fail-fast; Iterator is not.",
        "Both check modification count.",
        "Iterator returns elements in sorted order."
      ],
      answer: 0,
      explanation: "Hashtable's iterator is fail-fast, throwing ConcurrentModificationException on changes. Its legacy Enumeration is not fail-fast and does not check modification count.",
      difficulty: "medium"
    },
    {
      id: "ht_5",
      type: "practical",
      question: "What is printed by this Hashtable code?",
      code: `Hashtable<String, String> ht = new Hashtable<>();
ht.put("A", "1");
System.out.println(ht.getOrDefault("B", "None"));`,
      options: [
        "None",
        "null",
        "Throws NoSuchElementException",
        "Throws NullPointerException"
      ],
      answer: 0,
      explanation: "`getOrDefault()` is inherited from Map, returning 'None' since key 'B' is absent.",
      difficulty: "easy"
    },
    {
      id: "ht_6",
      type: "theory",
      question: "How does Hashtable calculate bucket index compared to HashMap?",
      options: [
        "It uses bitwise operations exclusively.",
        "It uses division (modulus operator) on hash code: (key.hashCode() & 0x7FFFFFFF) % tableLength.",
        "It uses memory register checks.",
        "It uses String index values."
      ],
      answer: 1,
      explanation: "HashMap restricts capacity to powers of two and uses bitwise AND. Hashtable is more generic, calculating index using modulus operation: `(hash & 0x7FFFFFFF) % length`.",
      difficulty: "hard"
    },
    {
      id: "ht_7",
      type: "theory",
      question: "What is the growth factor of Hashtable capacity when it resizes?",
      options: [
        "Doubles (capacity * 2)",
        "Grows by 50% (capacity * 1.5)",
        "Formula: capacity * 2 + 1",
        "Formula: capacity * 2 + 2"
      ],
      answer: 2,
      explanation: "When resizing, Hashtable increases capacity using the formula: `newCapacity = (oldCapacity * 2) + 1`.",
      difficulty: "hard"
    },
    {
      id: "ht_8",
      type: "theory",
      question: "Why is Hashtable rarely used in modern Java development?",
      options: [
        "It lacks serialization capabilities.",
        "Its synchronized methods introduce lock contention. ConcurrentHashMap is preferred for threads, and HashMap is preferred for single thread applications.",
        "It does not implement the Map interface.",
        "It has a size limit of 1000."
      ],
      answer: 1,
      explanation: "Hashtable synchronizes all method calls. ConcurrentHashMap provides much higher concurrency using partition locks, while HashMap is faster for single-threaded usage.",
      difficulty: "easy"
    },
    {
      id: "ht_9",
      type: "practical",
      question: "What is printed by this code?",
      code: `Hashtable<Integer, String> ht = new Hashtable<>();
ht.put(1, "One");
ht.put(2, "Two");
System.out.println(ht.contains("One"));`,
      options: [
        "true",
        "false",
        "Throws UnsupportedOperationException",
        "Throws NullPointerException"
      ],
      answer: 0,
      explanation: "`contains()` is a legacy Hashtable method that checks if a value exists in the table. It is equivalent to `containsValue()`.",
      difficulty: "medium"
    },
    {
      id: "ht_10",
      type: "practical",
      question: "What is the default initial capacity and load factor for Hashtable?",
      options: [
        "16 capacity, 0.75 load factor",
        "11 capacity, 0.75 load factor",
        "10 capacity, 0.5 load factor",
        "12 capacity, 0.8 load factor"
      ],
      answer: 1,
      explanation: "Hashtable's default initial capacity is 11, and load factor is 0.75.",
      difficulty: "hard"
    },
    {
      id: "ht_11",
      type: "practical",
      question: "What occurs if a key added to a Hashtable has a hash code mapping to an existing bucket?",
      options: [
        "The old value is overwritten instantly.",
        "It is appended to a linked list chain in that bucket (collision handling).",
        "Throws a HashCollisionException.",
        "The second value is rejected."
      ],
      answer: 1,
      explanation: "Hashtable handles collisions by chaining elements in a linked list bucket.",
      difficulty: "medium"
    },
    {
      id: "ht_12",
      type: "theory",
      question: "Which package contains the Hashtable class?",
      options: [
        "java.lang",
        "java.util",
        "java.io",
        "java.nio"
      ],
      answer: 1,
      explanation: "Hashtable is inside the `java.util` package.",
      difficulty: "easy"
    },
    {
      id: "ht_13",
      type: "practical",
      question: "What is the print result of this code?",
      code: `Hashtable<String, Integer> ht = new Hashtable<>();
ht.put("Key", 5);
System.out.println(ht.size());
ht.clear();
System.out.println(ht.size());`,
      options: [
        "5 0",
        "1 0",
        "1 1",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "The first print yields 1. `clear()` deletes all entries, resetting size to 0.",
      difficulty: "easy"
    },
    {
      id: "ht_14",
      type: "practical",
      question: "What happens if you attempt to retrieve a key that is not present in the Hashtable using get(key)?",
      options: [
        "Returns null.",
        "Throws NoSuchElementException.",
        "Throws NullPointerException.",
        "Returns empty string."
      ],
      answer: 0,
      explanation: "`get(key)` returns null if the key is absent.",
      difficulty: "easy"
    },
    {
      id: "ht_15",
      type: "theory",
      question: "What is the time complexity of lookup in Hashtable under worst-case hash collisions?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      answer: 2,
      explanation: "Hashtable does not treeify buckets. In worst-case collisions, it uses linked lists, taking O(N) linear time.",
      difficulty: "hard"
    }
  ],
  day41_lambdas: [
    {
      id: "lb_1",
      type: "theory",
      question: "What is a lambda expression in Java?",
      options: [
        "A mechanism to define nested package spaces.",
        "An anonymous block of code representing a functional interface implementation.",
        "A class wrapper for primitive variables.",
        "A system thread allocation method."
      ],
      answer: 1,
      explanation: "A lambda expression is an anonymous method (without a name, return type, or modifier) that implements the single abstract method of a functional interface.",
      difficulty: "easy"
    },
    {
      id: "lb_2",
      type: "theory",
      question: "What is the target type of a lambda expression?",
      options: [
        "Any standard Java class.",
        "A Functional Interface.",
        "An abstract class.",
        "A primitive data type."
      ],
      answer: 1,
      explanation: "A lambda expression can only be written where the expected type is a Functional Interface (an interface with exactly one abstract method).",
      difficulty: "easy"
    },
    {
      id: "lb_3",
      type: "practical",
      question: "What are the rules regarding variables accessed from the enclosing scope inside a lambda expression?",
      options: [
        "They can be modified freely.",
        "They must be declared final or be effectively final (not modified after initialization).",
        "They must be declared static.",
        "Only primitive types are accessible."
      ],
      answer: 1,
      explanation: "Local variables accessed inside lambda expressions must be final or effectively final. Attempting to modify them inside or after the lambda definition causes compile-time errors.",
      difficulty: "medium"
    },
    {
      id: "lb_4",
      type: "practical",
      question: "Does the following code compile successfully?",
      code: `int factor = 2;
Function<Integer, Integer> multiplier = x -> {
    factor = 3;
    return x * factor;
};`,
      options: [
        "Yes, compiles and runs normally.",
        "No, compilation fails because factor is modified inside the lambda, violating effectively final rules.",
        "Yes, but throws runtime error.",
        "No, syntax error inside block."
      ],
      answer: 1,
      explanation: "Modifying `factor` inside the lambda violates effectively final constraints, causing compilation failure.",
      difficulty: "medium"
    },
    {
      id: "lb_5",
      type: "theory",
      question: "How is a lambda expression compiled and executed internally in the JVM starting in Java 8?",
      options: [
        "It compiles to an anonymous inner class file (.class) at build time.",
        "It uses the invokedynamic instruction, dynamically generating a call site to link lambda execution to a generated helper method.",
        "It is converted to string operations.",
        "It runs via reflective invocation on class objects."
      ],
      answer: 1,
      explanation: "To avoid class loading and memory overhead, Java 8 compiles lambdas to `invokedynamic` instructions. The LambdaMetafactory dynamically generates a lightweight class structure at runtime.",
      difficulty: "hard"
    },
    {
      id: "lb_6",
      type: "practical",
      question: "What is the key semantic difference in the 'this' keyword inside a lambda expression compared to an anonymous inner class?",
      options: [
        "In a lambda, 'this' refers to the anonymous inner class instance.",
        "In a lambda, 'this' refers to the enclosing instance where the lambda is defined; it does not create a new scope.",
        "In a lambda, 'this' is undefined and cannot be used.",
        "They act identically."
      ],
      answer: 1,
      explanation: "In an anonymous inner class, `this` refers to the inner class object itself. In a lambda, the scope is lexically scoped; `this` refers to the outer enclosing class instance.",
      difficulty: "hard"
    },
    {
      id: "lb_7",
      type: "practical",
      question: "What is the print result of executing the following functional interface call?",
      code: `BinaryOperator<Integer> add = (x, y) -> x + y;
System.out.println(add.apply(5, 10));`,
      options: [
        "15",
        "510",
        "Compilation Error",
        "Throws NullPointerException"
      ],
      answer: 0,
      explanation: "`BinaryOperator` is a functional interface. The lambda adds the arguments, printing 15.",
      difficulty: "easy"
    },
    {
      id: "lb_8",
      type: "practical",
      question: "Which of the following is a valid single-parameter lambda expression definition?",
      options: [
        "x -> x * x",
        "(int x) -> x * x",
        "(x) -> { return x * x; }",
        "All of the above are valid."
      ],
      answer: 3,
      explanation: "All listed expressions are valid. Parentheses and type declarations are optional for single parameter lambdas. Return statements require braces.",
      difficulty: "easy"
    },
    {
      id: "lb_9",
      type: "theory",
      question: "Which bytecode instruction was introduced in Java 7 and utilized by Java 8 lambdas to implement fast dynamic calls?",
      options: [
        "invokevirtual",
        "invokestatic",
        "invokedynamic",
        "invokeinterface"
      ],
      answer: 2,
      explanation: "Java 8 lambdas utilize the `invokedynamic` instruction to allow runtime linking of method calls.",
      difficulty: "hard"
    },
    {
      id: "lb_10",
      type: "practical",
      question: "Does this code compile?",
      code: `Runnable r = () -> System.out.println("Hello");`,
      options: [
        "Yes, Runnable is a functional interface and the lambda maps to run().",
        "No, Runnable has multiple methods.",
        "No, lambdas must return a value.",
        "No, Runnable must be instantiated via a thread."
      ],
      answer: 0,
      explanation: "`Runnable` has exactly one abstract method `run()`, returning void and taking no parameters. The lambda match succeeds.",
      difficulty: "easy"
    },
    {
      id: "lb_11",
      type: "practical",
      question: "What is the output of compiling this code snippet?",
      code: `Consumer<String> printer = s -> System.out.println(s);
printer.accept("Test");`,
      options: [
        "Test",
        "Prints nothing",
        "Compilation Error",
        "Throws ClassCastException"
      ],
      answer: 0,
      explanation: "Consumer's abstract method is `accept(T t)`. It executes the print block, outputting 'Test'.",
      difficulty: "easy"
    },
    {
      id: "lb_12",
      type: "theory",
      question: "Can a lambda expression define local variables inside its block body?",
      options: [
        "No, parameters are the only variables allowed.",
        "Yes, and they do not affect variables of the enclosing scope.",
        "Only final variables can be declared.",
        "Only static variables can be declared."
      ],
      answer: 1,
      explanation: "A lambda expression block can declare local variables just like a standard method body.",
      difficulty: "medium"
    },
    {
      id: "lb_13",
      type: "practical",
      question: "What is the print result of this nested functional interface execution?",
      code: `Supplier<String> s = () -> "Java";
Function<String, String> f = str -> str + 8;
System.out.println(f.apply(s.get()));`,
      options: [
        "Java8",
        "Java",
        "Compilation Error",
        "Throws NullPointerException"
      ],
      answer: 0,
      explanation: "`s.get()` returns 'Java'. `f.apply('Java')` appends 8, printing 'Java8'.",
      difficulty: "medium"
    },
    {
      id: "lb_14",
      type: "practical",
      question: "What occurs if you attempt to cast a lambda expression to an interface that contains two abstract methods?",
      options: [
        "It compiles and ignores the second method.",
        "It fails to compile because the interface is not functional.",
        "It throws a ClassCastException at runtime.",
        "It builds successfully but throws runtime error on call."
      ],
      answer: 1,
      explanation: "A lambda expression requires a functional interface target. If the interface target has more than one abstract method, compilation fails.",
      difficulty: "easy"
    },
    {
      id: "lb_15",
      type: "theory",
      question: "How do lambdas affect the debugging stack trace compared to anonymous classes?",
      options: [
        "Lambdas show exact class names in the stack trace.",
        "Lambdas show compiler-generated synthetic method names (e.g. lambda$main$0), which can be harder to map back to source lines.",
        "Lambdas are invisible in stack traces.",
        "They share the exact same names."
      ],
      answer: 1,
      explanation: "Because lambdas compile to synthetic methods rather than dedicated inner classes, stack traces show names like `lambda$methodName$0`, which can be harder to debug.",
      difficulty: "hard"
    }
  ],
  day42_method_refs: [
    {
      id: "mr_1",
      type: "theory",
      question: "What is a method reference in Java 8?",
      options: [
        "A pointer to a method in C/C++ style.",
        "A shorthand syntax for lambda expressions that call an existing method.",
        "A method verification system.",
        "A class annotation."
      ],
      answer: 1,
      explanation: "Method references are shorthand notations for lambdas that only call an existing method. They use the `::` double colon separator.",
      difficulty: "easy"
    },
    {
      id: "mr_2",
      type: "theory",
      question: "Which of the following is NOT a type of method reference in Java?",
      options: [
        "Reference to a static method.",
        "Reference to an instance method of a particular object.",
        "Reference to a constructor.",
        "Reference to a subclass method override."
      ],
      answer: 3,
      explanation: "Java supports 4 types of method references: static methods, particular object instance methods, arbitrary object instance methods, and constructors. There is no specific reference type for overrides.",
      difficulty: "medium"
    },
    {
      id: "mr_3",
      type: "practical",
      question: "What is the equivalent lambda expression for the method reference: System.out::println?",
      options: [
        "() -> System.out.println()",
        "x -> System.out.println(x)",
        "System.out.println(x)",
        "(x, y) -> System.out.println(x, y)"
      ],
      answer: 1,
      explanation: "`System.out::println` is a reference to an instance method of a particular object. The compiler matches it to a lambda that takes a single parameter and passes it to the method.",
      difficulty: "easy"
    },
    {
      id: "mr_4",
      type: "practical",
      question: "What is the syntax for referencing a constructor using method references?",
      options: [
        "ClassName::new",
        "ClassName::constructor",
        "new ClassName::ref",
        "ClassName::create"
      ],
      answer: 0,
      explanation: "A constructor reference uses the class name followed by the double colon and the keyword `new` (e.g. `ArrayList::new`).",
      difficulty: "easy"
    },
    {
      id: "mr_5",
      type: "practical",
      question: "What is the equivalent lambda expression for String::toUpperCase?",
      options: [
        "s -> s.toUpperCase()",
        "() -> String.toUpperCase()",
        "s -> String.toUpperCase(s)",
        "toUpperCase(s)"
      ],
      answer: 0,
      explanation: "`String::toUpperCase` is an arbitrary object instance method reference. The first argument of the functional interface is the target object, and the remaining parameters are passed as method arguments, equivalent to `s -> s.toUpperCase()`.",
      difficulty: "medium"
    },
    {
      id: "mr_6",
      type: "practical",
      question: "What is printed by this code?",
      code: `Supplier<List<String>> creator = ArrayList::new;
List<String> list = creator.get();
System.out.println(list.getClass().getSimpleName());`,
      options: [
        "ArrayList",
        "List",
        "Compilation Error",
        "Throws ClassNotFoundException"
      ],
      answer: 0,
      explanation: "`ArrayList::new` references the default ArrayList constructor. Calling `get()` on the Supplier instantiates and returns a new ArrayList.",
      difficulty: "medium"
    },
    {
      id: "mr_7",
      type: "practical",
      question: "What is the equivalent method reference for the following lambda?",
      code: `Function<String, Integer> f = s -> Integer.parseInt(s);`,
      options: [
        "Integer::parseInt",
        "Integer::new",
        "s::parseInt",
        "parseInt::Integer"
      ],
      answer: 0,
      explanation: "The lambda calls the static method `Integer.parseInt(String)`. The equivalent static method reference is `Integer::parseInt`.",
      difficulty: "easy"
    },
    {
      id: "mr_8",
      type: "theory",
      question: "Can we pass arguments directly to a method reference (e.g. ClassName::methodName(arg))?",
      options: [
        "Yes, arguments are supported inside parentheses.",
        "No, method references lack parentheses and argument passing. Arguments are resolved implicitly from the functional interface parameters.",
        "Only if the arguments are constants.",
        "Only constructor references support parameters."
      ],
      answer: 1,
      explanation: "Method references cannot explicitly define parameters. They must match the signature of the target functional interface, which passes parameters implicitly.",
      difficulty: "medium"
    },
    {
      id: "mr_9",
      type: "practical",
      question: "Does the following code compile successfully?",
      code: `class Helper {
    static void print(String s) { System.out.println(s); }
}
// inside main
Consumer<String> c = Helper::print;`,
      options: [
        "Yes, the static method print matches the Consumer interface.",
        "No, Helper must implement Consumer.",
        "No, static methods are not referenceable.",
        "No, signature mismatch."
      ],
      answer: 0,
      explanation: "Helper has a static method matching the parameter and return type of `Consumer<String>` (takes String, returns void). Thus, compilation succeeds.",
      difficulty: "easy"
    },
    {
      id: "mr_10",
      type: "practical",
      question: "How do you reference the constructor of a String array using method references?",
      options: [
        "String[]::new",
        "String::new[]",
        "new String[]::ref",
        "Array::String::new"
      ],
      answer: 0,
      explanation: "An array constructor is referenced using the array type syntax followed by `::new` (e.g. `String[]::new`), which maps to a Function taking the size of the array.",
      difficulty: "hard"
    },
    {
      id: "mr_11",
      type: "practical",
      question: "What is printed by this code?",
      code: `Function<Integer, String[]> creator = String[]::new;
String[] arr = creator.apply(5);
System.out.println(arr.length);`,
      options: [
        "5",
        "0",
        "Compilation Error",
        "Null"
      ],
      answer: 0,
      explanation: "`String[]::new` takes an Integer argument specifying size. Calling `apply(5)` creates an array of length 5.",
      difficulty: "hard"
    },
    {
      id: "mr_12",
      type: "theory",
      question: "Which keyword can be used to reference instance methods of the superclass?",
      options: [
        "this::methodName",
        "super::methodName",
        "parent::methodName",
        "base::methodName"
      ],
      answer: 1,
      explanation: "You can reference methods of the superclass using the syntax `super::methodName`.",
      difficulty: "hard"
    },
    {
      id: "mr_13",
      type: "practical",
      question: "What happens if the referenced method throws a checked exception?",
      options: [
        "The compiler automatically wraps it in a RuntimeException.",
        "The abstract method of the functional interface must declare the checked exception in its throws clause; otherwise, it fails to compile.",
        "It compiles and prints warning.",
        "Exceptions are ignored."
      ],
      answer: 1,
      explanation: "Method references do not bypass checked exception rules. If the referenced method throws a checked exception, the functional interface method must declare it, or it must be handled in some other way.",
      difficulty: "hard"
    },
    {
      id: "mr_14",
      type: "practical",
      question: "What is printed by the following code?",
      code: `List<String> list = Arrays.asList("apple", "pear");
list.forEach(System.out::print);`,
      options: [
        "applepear",
        "apple pear",
        "apple\npear",
        "Compilation Error"
      ],
      answer: 0,
      explanation: "The `forEach` method passes each element to `System.out.print`, printing them sequentially without spacing.",
      difficulty: "easy"
    },
    {
      id: "mr_15",
      type: "theory",
      question: "What occurs at compilation when a method reference is overloaded?",
      options: [
        "Compilation fails due to ambiguity.",
        "The compiler resolves the ambiguity by analyzing the parameter signature of the target functional interface.",
        "The first declared method is selected.",
        "The compiler selects the method with the most parameters."
      ],
      answer: 1,
      explanation: "If a method is overloaded, the compiler evaluates the functional interface parameters and return type to select the matching method overload.",
      difficulty: "hard"
    }
  ],
  day43_functional_interfaces: [
    {
      id: "fi_1",
      type: "theory",
      question: "What defines a Functional Interface in Java?",
      options: [
        "An interface that contains only public variables.",
        "An interface with exactly one abstract method.",
        "An interface that extends Serializable.",
        "An interface with only default methods."
      ],
      answer: 1,
      explanation: "A functional interface is defined as an interface that has exactly one abstract method. It can declare any number of default and static methods.",
      difficulty: "easy"
    },
    {
      id: "fi_2",
      type: "theory",
      question: "What is the purpose of the @FunctionalInterface annotation?",
      options: [
        "It forces the compiler to verify that the interface conforms to functional interface constraints (exactly one abstract method).",
        "It generates JVM compilation optimizations.",
        "It is required to write lambda expressions.",
        "It compiles interfaces to abstract classes."
      ],
      answer: 0,
      explanation: "`@FunctionalInterface` is optional but helpful: it instructs the compiler to verify that the interface has exactly one abstract method. If it has zero or multiple abstract methods, compilation fails.",
      difficulty: "easy"
    },
    {
      id: "fi_3",
      type: "practical",
      question: "Which of the following interfaces from the java.util.function package returns a boolean value?",
      options: [
        "Consumer<T>",
        "Supplier<T>",
        "Predicate<T>",
        "Function<T, R>"
      ],
      answer: 2,
      explanation: "`Predicate<T>` has the abstract method `boolean test(T t)`, returning a boolean.",
      difficulty: "easy"
    },
    {
      id: "fi_4",
      type: "practical",
      question: "Which functional interface does not take any input parameters but returns a value?",
      options: [
        "Consumer<T>",
        "Supplier<T>",
        "Function<T, R>",
        "UnaryOperator<T>"
      ],
      answer: 1,
      explanation: "`Supplier<T>` has the abstract method `T get()`, taking no arguments and returning a value.",
      difficulty: "easy"
    },
    {
      id: "fi_5",
      type: "practical",
      question: "What is printed by the following code?",
      code: `Function<String, Integer> lengthFunc = s -> s.length();
System.out.println(lengthFunc.apply("Hello"));`,
      options: [
        "5",
        "Hello",
        "Compilation Error",
        "0"
      ],
      answer: 0,
      explanation: "`Function<T, R>` takes type T (String) and returns type R (Integer) via the `apply` method, outputting 5.",
      difficulty: "easy"
    },
    {
      id: "fi_6",
      type: "practical",
      question: "What is the output of the following functional interfaces composition?",
      code: `Function<Integer, Integer> doubleIt = x -> x * 2;
Function<Integer, Integer> plusThree = x -> x + 3;
Function<Integer, Integer> composed = doubleIt.andThen(plusThree);
System.out.println(composed.apply(5));`,
      options: [
        "16",
        "13",
        "10",
        "Compilation Error"
      ],
      answer: 1,
      explanation: "`andThen()` executes the first function (`doubleIt`: `5 * 2 = 10`), and then applies the second function on the result (`plusThree`: `10 + 3 = 13`).",
      difficulty: "medium"
    },
    {
      id: "fi_7",
      type: "practical",
      question: "What is the output of compose() in this snippet?",
      code: `Function<Integer, Integer> doubleIt = x -> x * 2;
Function<Integer, Integer> plusThree = x -> x + 3;
Function<Integer, Integer> composed = doubleIt.compose(plusThree);
System.out.println(composed.apply(5));`,
      options: [
        "16",
        "13",
        "15",
        "8"
      ],
      answer: 0,
      explanation: "`compose()` applies the parameter function first (`plusThree`: `5 + 3 = 8`), and then applies the caller function on the result (`doubleIt`: `8 * 2 = 16`).",
      difficulty: "medium"
    },
    {
      id: "fi_8",
      type: "theory",
      question: "Why do methods declared in java.lang.Object (like toString, equals, hashCode) NOT count towards the single abstract method limit in a functional interface?",
      options: [
        "Because interfaces cannot access Object methods.",
        "They are explicitly excluded because any implementing class of the interface will inherit implementations of these methods from java.lang.Object.",
        "Because Object methods are static.",
        "It is a compiler anomaly."
      ],
      answer: 1,
      explanation: "Since every class extends `java.lang.Object`, any concrete class implementing the interface will inherit implementations of `Object` methods. Declaring them abstract in the interface does not require the implementing class to provide a new implementation, so they don't count towards the single abstract method limit.",
      difficulty: "hard"
    },
    {
      id: "fi_9",
      type: "practical",
      question: "Does the following interface compile as a @FunctionalInterface?",
      code: `@FunctionalInterface
interface Custom {
    void doWork();
    default void reset() { System.out.println("Reset"); }
    static void init() { System.out.println("Init"); }
}`,
      options: [
        "Yes, default and static methods do not count against the abstract method limit.",
        "No, it must have only one method.",
        "No, static methods are disallowed.",
        "No, default methods are disallowed."
      ],
      answer: 0,
      explanation: "Yes, default and static methods have implementations and do not count against the single abstract method limit.",
      difficulty: "medium"
    },
    {
      id: "fi_10",
      type: "practical",
      question: "Which Primitive functional interface should be used to avoid boxing overhead when testing an int value?",
      options: [
        "Predicate<Integer>",
        "IntPredicate",
        "DoublePredicate",
        "IntegerPredicate"
      ],
      answer: 1,
      explanation: "`IntPredicate` uses primitive `int` arguments in its abstract method `boolean test(int value)`, avoiding boxing and unboxing overhead.",
      difficulty: "medium"
    },
    {
      id: "fi_11",
      type: "theory",
      question: "What is a UnaryOperator in Java?",
      options: [
        "A functional interface that takes two arguments and returns a boolean.",
        "A specialized Function where the operand and the result are of the same type.",
        "An operator that throws exceptions.",
        "A method reference wrapper."
      ],
      answer: 1,
      explanation: "`UnaryOperator<T>` extends `Function<T, T>`, representing an operation on a single operand that produces a result of the same type.",
      difficulty: "medium"
    },
    {
      id: "fi_12",
      type: "practical",
      question: "What is printed by the following code?",
      code: `BiConsumer<String, String> concat = (s1, s2) -> System.out.println(s1 + s2);
concat.accept("Java", "8");`,
      options: [
        "Java8",
        "Java 8",
        "Compilation Error",
        "Nothing is printed"
      ],
      answer: 0,
      explanation: "`BiConsumer<T, U>` takes two parameters and returns void via the `accept(T t, U u)` method.",
      difficulty: "easy"
    },
    {
      id: "fi_13",
      type: "practical",
      question: "What occurs if you annotate an interface containing no methods with @FunctionalInterface?",
      options: [
        "It compiles successfully.",
        "Compilation fails because the interface must contain exactly one abstract method.",
        "It compiles and converts to marker interface.",
        "It throws a runtime exception."
      ],
      answer: 1,
      explanation: "An interface with no methods has zero abstract methods, violating the functional interface constraint and causing compilation failure.",
      difficulty: "easy"
    },
    {
      id: "fi_14",
      type: "practical",
      question: "What is the output of the following predicate code?",
      code: `Predicate<String> isEmpty = String::isEmpty;
Predicate<String> isNotNull = Objects::nonNull;
Predicate<String> isValid = isEmpty.negate().and(isNotNull);
System.out.println(isValid.test(""));`,
      options: [
        "true",
        "false",
        "Compilation Error",
        "Throws NullPointerException"
      ],
      answer: 1,
      explanation: "`isEmpty.negate()` returns false for empty string. False ANDed with nonNull yields false.",
      difficulty: "hard"
    },
    {
      id: "fi_15",
      type: "theory",
      question: "Which of the following interfaces is NOT a functional interface?",
      options: [
        "java.lang.Runnable",
        "java.util.concurrent.Callable",
        "java.util.Comparator",
        "java.util.List"
      ],
      answer: 3,
      explanation: "Runnable, Callable, and Comparator are all functional interfaces. List contains many abstract methods and is not a functional interface.",
      difficulty: "easy"
    }
  ],
  day44_streams: [
    {
      id: "st_1",
      type: "theory",
      question: "What are the two main types of operations in the Java Stream API?",
      options: [
        "Static operations and Instance operations.",
        "Intermediate operations and Terminal operations.",
        "Primary operations and Backup operations.",
        "Sequential operations and Thread operations."
      ],
      answer: 1,
      explanation: "Stream operations are divided into: Intermediate operations (which transform a stream into another stream and are evaluated lazily) and Terminal operations (which produce a result or side-effect and close the stream).",
      difficulty: "easy"
    },
    {
      id: "st_2",
      type: "theory",
      question: "What does it mean that intermediate operations in a Stream are 'lazy'?",
      options: [
        "They are executed slowly in low-priority threads.",
        "They are not executed until a terminal operation is invoked on the stream.",
        "They only execute half of the collection.",
        "They throw runtime exceptions if resources are busy."
      ],
      answer: 1,
      explanation: "Intermediate operations (like filter, map) are lazy: they only construct the query pipeline. No elements are processed until a terminal operation (like collect, count, forEach) is triggered.",
      difficulty: "medium"
    },
    {
      id: "st_3",
      type: "practical",
      question: "What is printed by this stream code block?",
      code: `List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream().filter(s -> {
    System.out.print("F");
    return true;
});
System.out.print("T");
stream.count();`,
      options: [
        "FFFT",
        "TFFF",
        "FFF",
        "T"
      ],
      answer: 1,
      explanation: "Because filter is intermediate and lazy, 'T' is printed first. Calling `count()` (terminal operation) triggers the processing of the 3 elements, printing 'F' three times, resulting in `TFFF`.",
      difficulty: "hard"
    },
    {
      id: "st_4",
      type: "practical",
      question: "What happens if you attempt to perform a second terminal operation on a Stream that has already been closed?",
      options: [
        "It opens a new stream copy automatically.",
        "Throws an IllegalStateException.",
        "It returns null.",
        "It blocks the thread."
      ],
      answer: 1,
      explanation: "Streams are consumable only once. Performing a second terminal operation on a closed stream throws `java.lang.IllegalStateException: stream has already been operated upon or closed`.",
      difficulty: "medium"
    },
    {
      id: "st_5",
      type: "practical",
      question: "What is the difference between map() and flatMap() in Stream API?",
      options: [
        "map() processes data concurrently; flatMap() runs sequentially.",
        "map() converts each element to another object; flatMap() flattens streams of streams (e.g. Stream<List<T>> to Stream<T>).",
        "flatMap() sorts elements; map() does not.",
        "They perform identically."
      ],
      answer: 1,
      explanation: "`map()` performs 1-to-1 transformation, mapping an element to another value. `flatMap()` maps an element to a stream of values, merging/flattening the nested streams into a single flat stream.",
      difficulty: "medium"
    },
    {
      id: "st_6",
      type: "practical",
      question: "What is printed by the following stream code?",
      code: `List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
int sum = list.stream().filter(x -> x % 2 == 0).mapToInt(x -> x).sum();
System.out.println(sum);`,
      options: [
        "6",
        "15",
        "9",
        "0"
      ],
      answer: 0,
      explanation: "The stream filters out odd numbers, leaving 2 and 4. `mapToInt` converts them to primitive ints, and `sum()` calculates their sum: 2 + 4 = 6.",
      difficulty: "easy"
    },
    {
      id: "st_7",
      type: "theory",
      question: "Which thread pool is used by parallel streams by default?",
      options: [
        "ThreadPoolExecutor",
        "Common ForkJoinPool (ForkJoinPool.commonPool())",
        "Executors.newFixedThreadPool()",
        "ScheduledThreadPoolExecutor"
      ],
      answer: 1,
      explanation: "Parallel streams use the JVM's shared `ForkJoinPool.commonPool()` to execute operations concurrently across multiple cores.",
      difficulty: "hard"
    },
    {
      id: "st_8",
      type: "practical",
      question: "What is the output of the short-circuiting operation in the following code?",
      code: `List<String> list = Arrays.asList("Apple", "Banana", "Cherry");
Optional<String> result = list.stream().filter(s -> s.startsWith("B")).findFirst();
System.out.println(result.orElse("None"));`,
      options: [
        "Banana",
        "Apple",
        "None",
        "Cherry"
      ],
      answer: 0,
      explanation: "The stream filters for elements starting with 'B', finding 'Banana'. `findFirst()` returns it inside an Optional, outputting 'Banana'.",
      difficulty: "easy"
    },
    {
      id: "st_9",
      type: "practical",
      question: "What is the difference between findFirst() and findAny()?",
      options: [
        "findFirst() is an intermediate operation; findAny() is terminal.",
        "findFirst() returns the first element in encounter order; findAny() returns any element, which is more efficient in parallel streams.",
        "findAny() only works with primitive streams.",
        "They are completely identical."
      ],
      answer: 1,
      explanation: "`findFirst()` guarantees returning the first element in the stream's encounter order. `findAny()` is free to return any element it finds first (especially useful for performance in parallel streams).",
      difficulty: "medium"
    },
    {
      id: "st_10",
      type: "practical",
      question: "Does the following code throw ConcurrentModificationException?",
      code: `List<String> list = new ArrayList<>(Arrays.asList("a", "b"));
list.stream().forEach(s -> list.add("c"));`,
      options: [
        "No, it runs normally.",
        "Yes, modifying the backing collection during stream pipeline execution throws ConcurrentModificationException.",
        "Yes, but only on parallel streams.",
        "No, it runs indefinitely."
      ],
      answer: 1,
      explanation: "Modifying the backing collection during stream processing violates non-interference rules and throws a ConcurrentModificationException.",
      difficulty: "hard"
    },
    {
      id: "st_11",
      type: "practical",
      question: "What is printed by this stream collect operation?",
      code: `List<String> list = Arrays.asList("a", "b");
String result = list.stream().collect(Collectors.joining("-"));
System.out.println(result);`,
      options: [
        "a-b",
        "-a-b",
        "ab",
        "a-b-"
      ],
      answer: 0,
      explanation: "`Collectors.joining('-')` concatenates elements with the delimiter '-' in between, outputting 'a-b'.",
      difficulty: "easy"
    },
    {
      id: "st_12",
      type: "theory",
      question: "What is the purpose of primitive stream classes like IntStream, LongStream, and DoubleStream?",
      options: [
        "To allow stream serialization.",
        "To avoid boxing/unboxing overhead when processing primitive types.",
        "To run calculations in graphics processors.",
        "To support variable data ranges."
      ],
      answer: 1,
      explanation: "Primitive streams avoid the boxing overhead of wrapping primitive values in objects (like int to Integer), improving performance for numerical calculations.",
      difficulty: "medium"
    },
    {
      id: "st_13",
      type: "practical",
      question: "What is printed by this distinct and sorting stream?",
      code: `List<Integer> list = Arrays.asList(3, 1, 2, 1);
list.stream().distinct().sorted().forEach(System.out::print);`,
      options: [
        "123",
        "3121",
        "12",
        "Compilation Error"
      ],
      answer: 0,
      explanation: "`distinct()` removes duplicates (leaves 3, 1, 2). `sorted()` sorts them (1, 2, 3), outputting '123'.",
      difficulty: "easy"
    },
    {
      id: "st_14",
      type: "practical",
      question: "What is the output of the following reduce operation?",
      code: `List<Integer> list = Arrays.asList(1, 2, 3);
int result = list.stream().reduce(10, (a, b) -> a + b);
System.out.println(result);`,
      options: [
        "16",
        "6",
        "10",
        "Compilation Error"
      ],
      answer: 0,
      explanation: "The `reduce(identity, accumulator)` uses 10 as initial value. It adds elements: `10 + 1 = 11` -> `11 + 2 = 13` -> `13 + 3 = 16`, outputting 16.",
      difficulty: "medium"
    },
    {
      id: "st_15",
      type: "theory",
      question: "Which of the following operations is stateful and requires buffer memory?",
      options: [
        "filter()",
        "map()",
        "sorted()",
        "peek()"
      ],
      answer: 2,
      explanation: "`sorted()` is a stateful intermediate operation: it must buffer all elements in memory to sort them before passing them down the pipeline. `filter()` and `map()` are stateless.",
      difficulty: "hard"
    }
  ],
  day45_datetime: [
    {
      id: "dt_1",
      type: "theory",
      question: "Why was the new java.time API introduced in Java 8?",
      options: [
        "The legacy Date and Calendar classes were not thread-safe and had poor design choices (like 0-indexed months).",
        "To support regional timezone maps.",
        "To allow microsecond precision only.",
        "To connect with remote time servers."
      ],
      answer: 0,
      explanation: "Legacy date classes were mutable (not thread-safe), had confusing month numbering (January was 0), and lacked clear separation of concerns. The java.time package resolved this with immutable, thread-safe, and clear models.",
      difficulty: "easy"
    },
    {
      id: "dt_2",
      type: "theory",
      question: "Which of the following classes represents a date without time or timezone info in Java 8?",
      options: [
        "LocalTime",
        "LocalDate",
        "LocalDateTime",
        "ZonedDateTime"
      ],
      answer: 1,
      explanation: "`LocalDate` represents a date (year, month, day) without time or timezone information.",
      difficulty: "easy"
    },
    {
      id: "dt_3",
      type: "practical",
      question: "What is printed by the following code snippet, demonstrating java.time immutability?",
      code: `LocalDate date = LocalDate.of(2026, 8, 1);
date.plusDays(5);
System.out.println(date.getDayOfMonth());`,
      options: [
        "1",
        "6",
        "Throws DateTimeException",
        "0"
      ],
      answer: 0,
      explanation: "Because java.time classes are immutable, `plusDays(5)` returns a new LocalDate instance; it does not modify the original `date` object. Thus, `date` remains August 1st, printing 1.",
      difficulty: "medium"
    },
    {
      id: "dt_4",
      type: "practical",
      question: "Which class is used to represent machine-readable timestamps (seconds since epoch) in UTC?",
      options: [
        "LocalDateTime",
        "Instant",
        "Duration",
        "ZoneOffset"
      ],
      answer: 1,
      explanation: "`Instant` represents a specific point in time on the timeline (in UTC), measured in nanoseconds since the Unix epoch.",
      difficulty: "medium"
    },
    {
      id: "dt_5",
      type: "theory",
      question: "What is the difference between Period and Duration in the java.time API?",
      options: [
        "Period is thread-safe; Duration is not.",
        "Period is date-based (years, months, days); Duration is time-based (seconds, nanoseconds).",
        "Duration is date-based; Period is time-based.",
        "They are completely identical."
      ],
      answer: 1,
      explanation: "`Period` measures calendar distance in years, months, and days. `Duration` measures exact physical time differences in seconds and nanoseconds.",
      difficulty: "medium"
    },
    {
      id: "dt_6",
      type: "practical",
      question: "How does DateTimeFormatter compare to the legacy SimpleDateFormat?",
      options: [
        "SimpleDateFormat is faster but lacks timezone support.",
        "DateTimeFormatter is immutable and thread-safe; SimpleDateFormat is mutable and not thread-safe.",
        "DateTimeFormatter requires external dependencies.",
        "DateTimeFormatter cannot parse strings."
      ],
      answer: 1,
      explanation: "`DateTimeFormatter` is immutable and thread-safe, making it safe to declare as a static constant shared across threads. `SimpleDateFormat` is notoriously unsafe for concurrent thread use.",
      difficulty: "medium"
    },
    {
      id: "dt_7",
      type: "practical",
      question: "What is printed by this code?",
      code: `LocalDate date = LocalDate.of(2026, 8, 1);
System.out.println(date.getMonthValue());`,
      options: [
        "8",
        "7",
        "08",
        "Throws DateTimeException"
      ],
      answer: 0,
      explanation: "Unlike legacy Calendar where months were 0-indexed, the new API is 1-indexed. August returns 8.",
      difficulty: "easy"
    },
    {
      id: "dt_8",
      type: "practical",
      question: "What is printed by the following code snippet?",
      code: `LocalTime time1 = LocalTime.of(10, 30);
LocalTime time2 = LocalTime.of(12, 30);
System.out.println(Duration.between(time1, time2).toHours());`,
      options: [
        "2",
        "120",
        "0",
        "Throws DateTimeException"
      ],
      answer: 0,
      explanation: "The difference between 10:30 and 12:30 is a Duration of 2 hours.",
      difficulty: "easy"
    },
    {
      id: "dt_9",
      type: "theory",
      question: "Which helper class provides predefined adjustments like finding the next Tuesday or last day of the month?",
      options: [
        "TemporalAdjusters",
        "DateAdjuster",
        "TemporalAdjuster",
        "DateTimeAdjusters"
      ],
      answer: 0,
      explanation: "`TemporalAdjusters` provides common adjustments (e.g. `firstDayOfMonth()`, `next(DayOfWeek.TUESDAY)`).",
      difficulty: "medium"
    },
    {
      id: "dt_10",
      type: "practical",
      question: "Does the following code throw an exception?",
      code: `LocalDate date = LocalDate.of(2026, 2, 29);`,
      options: [
        "No, it creates a leap year date.",
        "Yes, throws DateTimeException because 2026 is not a leap year and February 29 does not exist.",
        "No, it rounds down to February 28.",
        "Yes, throws IllegalArgumentException."
      ],
      answer: 1,
      explanation: "2026 is not a leap year. February has only 28 days. Attempting to define February 29 throws a `java.time.DateTimeException`.",
      difficulty: "medium"
    },
    {
      id: "dt_11",
      type: "practical",
      question: "What is printed by this formatter execution?",
      code: `LocalDate date = LocalDate.of(2026, 8, 1);
DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");
System.out.println(dtf.format(date));`,
      options: [
        "01-08-2026",
        "1-8-2026",
        "2026-08-01",
        "Compilation Error"
      ],
      answer: 0,
      explanation: "The pattern prints day and month with padding zeroes: `01-08-2026`.",
      difficulty: "easy"
    },
    {
      id: "dt_12",
      type: "theory",
      question: "Which of the following classes contains timezone rules (like Europe/Paris) and accounts for daylight saving time transitions?",
      options: [
        "ZoneOffset",
        "ZoneId",
        "ZonedDateTime",
        "Both ZoneId and ZonedDateTime"
      ],
      answer: 3,
      explanation: "`ZoneId` identifies a timezone (e.g. `ZoneId.of('Europe/Paris')`), and `ZonedDateTime` represents a date and time with that specific timezone.",
      difficulty: "medium"
    },
    {
      id: "dt_13",
      type: "practical",
      question: "What is the output of the following comparison code?",
      code: `LocalDate d1 = LocalDate.of(2026, 8, 1);
LocalDate d2 = LocalDate.of(2026, 9, 1);
System.out.println(d1.isBefore(d2) + " " + d1.isAfter(d2));`,
      options: [
        "true false",
        "false true",
        "true true",
        "false false"
      ],
      answer: 0,
      explanation: "August 1st is before September 1st, so `isBefore` returns true and `isAfter` returns false.",
      difficulty: "easy"
    },
    {
      id: "dt_14",
      type: "practical",
      question: "How do you convert a legacy java.util.Date object to a modern java.time.Instant?",
      options: [
        "date.toInstant()",
        "Instant.from(date)",
        "date.getInstant()",
        "new Instant(date)"
      ],
      answer: 0,
      explanation: "Legacy `java.util.Date` was retrofitted in Java 8 with the `toInstant()` method to convert it to an `Instant`.",
      difficulty: "medium"
    },
    {
      id: "dt_15",
      type: "theory",
      question: "Which enum class is used to calculate date/time differences (e.g. difference in weeks or years)?",
      options: [
        "ChronoUnit",
        "TemporalUnit",
        "TimeUnit",
        "DateUnit"
      ],
      answer: 0,
      explanation: "`ChronoUnit` implements `TemporalUnit` and provides standard date/time units (WEEKS, MONTHS, YEARS, DAYS) for calculations.",
      difficulty: "medium"
    }
  ]
};
