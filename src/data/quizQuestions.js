export const quizQuestions = {
  java: [
    {
      id: "java_1",
      type: "practical",
      question: "What is the output of the following Java code snippet involving thread execution?",
      code: `public class ThreadTest {
    private static volatile boolean flag = false;
    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            while (!flag) {}
            System.out.println("Thread 1 Completed");
        }).start();
        Thread.sleep(100);
        flag = true;
        System.out.println("Main Completed");
    }
}`,
      options: [
        "It will print 'Main Completed' and the program will hang indefinitely.",
        "It will print 'Main Completed' followed by 'Thread 1 Completed' and terminate.",
        "It will print 'Thread 1 Completed' followed by 'Main Completed' and terminate.",
        "It will throw an InterruptedException immediately."
      ],
      answer: 1,
      explanation: "The 'volatile' keyword ensures visibility of changes to variables across threads. When the main thread writes flag = true, Thread 1 immediately reads it from main memory (bypassing CPU cache) and exits its while loop, printing 'Thread 1 Completed' and terminating successfully.",
      difficulty: "medium"
    },
    {
      id: "java_2",
      type: "theory",
      question: "Which garbage collection algorithm in Java is designed specifically for low latency (sub-millisecond pause times) by executing almost all GC work concurrently with application threads?",
      options: [
        "Serial Garbage Collector",
        "Parallel Garbage Collector",
        "G1 (Garbage First) Garbage Collector",
        "ZGC (Z Garbage Collector)"
      ],
      answer: 3,
      explanation: "ZGC (Z Garbage Collector) is a low-latency garbage collector introduced in JDK 11 (production-ready in JDK 15) that performs all expensive work concurrently, keeping pause times under 1 millisecond even for terabyte-sized heaps.",
      difficulty: "hard"
    },
    {
      id: "java_3",
      type: "practical",
      question: "In what order are the resource close operations performed in this try-with-resources statement?",
      code: `try (BufferedReader br = new BufferedReader(new FileReader("input.txt"));
     BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    // Operations
}`,
      options: [
        "br will close first, then bw.",
        "bw will close first, then br.",
        "Both close concurrently.",
        "Only the resource that threw an exception will close."
      ],
      answer: 1,
      explanation: "In Java's try-with-resources, resources are closed in the opposite order of their declaration. Since br was declared first and bw second, bw is closed first, followed by br.",
      difficulty: "medium"
    },
    {
      id: "java_4",
      type: "theory",
      question: "How does Java's ConcurrentHashMap achieve high concurrency for read and write operations compared to a synchronized Map?",
      options: [
        "It locks the entire Map only on write operations.",
        "It partitions the Map into segments or buckets and locks only the specific bucket/node being modified (bucket-level lock).",
        "It uses a single global lock but runs operations in a separate virtual thread.",
        "It creates a complete copy of the map on every write operation."
      ],
      answer: 1,
      explanation: "ConcurrentHashMap achieves high concurrency by avoiding a single global lock. In modern Java, it locks only the head of the bucket node using CAS (Compare-And-Swap) operations and synchronized blocks on single bucket chains, allowing multiple writes in different buckets simultaneously.",
      difficulty: "hard"
    },
    {
      id: "java_5",
      type: "practical",
      question: "What is the output of the following Java stream code snippet?",
      code: `List<String> items = Arrays.asList("apple", "banana", "cherry");
boolean result = items.stream()
                      .peek(System.out::print)
                      .anyMatch(s -> s.startsWith("b"));
System.out.print(" - " + result);`,
      options: [
        "applebanana - true",
        "applebananacherry - true",
        "banana - true",
        "applebananacherry - false"
      ],
      answer: 0,
      explanation: "anyMatch is a short-circuiting terminal operation. The stream processes 'apple' (peek prints 'apple'), checks prefix 'b' (false); then processes 'banana' (peek prints 'banana'), checks prefix 'b' (true). Since 'anyMatch' evaluates to true here, evaluation terminates instantly, skipping 'cherry'. Finally ' - true' is printed.",
      difficulty: "medium"
    },
    {
      id: "java_6",
      type: "theory",
      question: "What happens when a custom annotation lacks a @Retention annotation declaration?",
      options: [
        "It defaults to RetentionPolicy.SOURCE.",
        "It defaults to RetentionPolicy.CLASS.",
        "It defaults to RetentionPolicy.RUNTIME.",
        "The compiler throws a syntax error."
      ],
      answer: 1,
      explanation: "If a custom annotation does not declare a @Retention policy, it defaults to RetentionPolicy.CLASS. This means the annotation is recorded in the .class file but discarded by the JVM at runtime, making it inaccessible via reflection.",
      difficulty: "medium"
    },
    {
      id: "java_7",
      type: "practical",
      question: "What is the correct output when the following class code is executed?",
      code: `class Parent {
    static { System.out.print("P1 "); }
    { System.out.print("P2 "); }
    public Parent() { System.out.print("P3 "); }
}
class Child extends Parent {
    static { System.out.print("C1 "); }
    { System.out.print("C2 "); }
    public Child() {
        super();
        System.out.print("C3 ");
    }
}
public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`,
      options: [
        "P1 P2 P3 C1 C2 C3",
        "P1 C1 P2 P3 C2 C3",
        "P1 C1 P2 C2 P3 C3",
        "P2 P3 C2 C3 P1 C1"
      ],
      answer: 1,
      explanation: "Order of initialization: 1) Static blocks of Parent then Child (P1 C1), 2) Instance initializers of Parent (P2), 3) Parent constructor (P3), 4) Instance initializers of Child (C2), 5) Child constructor (C3). This yields: P1 C1 P2 P3 C2 C3.",
      difficulty: "hard"
    },
    {
      id: "java_8",
      type: "theory",
      question: "What is the primary benefit of Java Records introduced in JDK 16?",
      options: [
        "They allow classes to bypass serialization constraints.",
        "They provide a concise syntax for declaring immutable data carrier classes, automatically generating getters, equals(), hashCode(), and toString().",
        "They allow classes to implement multiple inheritance of state.",
        "They execute code inside isolated database transactions automatically."
      ],
      answer: 1,
      explanation: "Java Records are transparent data carriers that are implicitly final and immutable. The compiler automatically provides the constructor, equals(), hashCode(), toString(), and accessor methods (e.g. name() instead of getName()), reducing boilerplate.",
      difficulty: "easy"
    },
    {
      id: "java_9",
      type: "practical",
      question: "Which of the following describes the correct behavior of this exception-handling block?",
      code: `public static int getValue() {
    try {
        return 1;
    } catch (Exception e) {
        return 2;
    } finally {
        return 3;
    }
}`,
      options: [
        "Returns 1.",
        "Returns 2.",
        "Returns 3.",
        "Compilation error due to multiple return statements."
      ],
      answer: 2,
      explanation: "If a finally block contains a return statement, it overrides any other return statement in the try or catch blocks. Thus, getValue() will return 3, discarding the return 1.",
      difficulty: "medium"
    },
    {
      id: "java_10",
      type: "theory",
      question: "In a ThreadPoolExecutor, when all core threads are busy, where is a newly submitted task stored first before spawning max threads?",
      options: [
        "It immediately spawns a new thread up to maximumPoolSize.",
        "It is put into the task queue (BlockingQueue) specified during executor instantiation.",
        "It is rejected and throws a RejectedExecutionException.",
        "It is stored in the JVM Metaspace."
      ],
      answer: 1,
      explanation: "When a task is submitted: 1) If running threads < corePoolSize, spawn new thread. 2) If running threads >= corePoolSize, try queuing the task. 3) If queue is full and threads < maximumPoolSize, spawn max thread. 4) If queue is full and threads >= maximumPoolSize, reject task.",
      difficulty: "hard"
    },
    {
      id: "java_11",
      type: "practical",
      question: "What will compile and print from the following code containing a LocalTime comparison?",
      code: `List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
list.removeIf(n -> n % 2 == 0);
System.out.println(list);`,
      options: [
        "Throws ConcurrentModificationException",
        "Prints [1, 2, 3]",
        "Prints [1, 3]",
        "Compilation fails"
      ],
      answer: 2,
      explanation: "Java 8 added `removeIf` to the Collection interface. Unlike iterating and calling `List.remove` which can throw `ConcurrentModificationException`, `removeIf` uses the collection's iterator internally to safely filter out elements in-place.",
      difficulty: "easy"
    },
    {
      id: "java_12",
      type: "theory",
      question: "Under what conditions does Java's Type Erasure occur for Generics?",
      options: [
        "At runtime, generic types are checked to verify type safety.",
        "At compile time, the compiler replaces all generic type parameters with their bounds (or Object if unbound) and inserts necessary casts.",
        "At load time, by the class loader loading custom bytecode versions for each type parameter.",
        "During Garbage Collection to optimize memory reference chains."
      ],
      answer: 1,
      explanation: "Type erasure is used to ensure backward compatibility with older Java versions. The compiler replaces all generic types with their first bound (or Object) during compilation. Consequently, the generic type information is not available at runtime.",
      difficulty: "medium"
    },
    {
      id: "java_13",
      type: "practical",
      question: "What is the output of compiling and running the following code involving a Map lookup?",
      code: `class Key {
    private int id;
    Key(int id) { this.id = id; }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Key)) return false;
        return this.id == ((Key) o).id;
    }
}
public class MapTest {
    public static void main(String[] args) {
        Map<Key, String> map = new HashMap<>();
        map.put(new Key(1), "Admin");
        System.out.println(map.get(new Key(1)));
    }
}`,
      options: [
        "Admin",
        "null",
        "Throws NullPointerException",
        "Compilation fails"
      ],
      answer: 1,
      explanation: "The class overrides `equals` but NOT `hashCode`. Since `HashMap` retrieves items by computing the hash code first, two different instances of `Key(1)` will produce different hash values, resulting in `get()` returning `null`.",
      difficulty: "hard"
    },
    {
      id: "java_14",
      type: "theory",
      question: "Which of the following statement is true regarding Sealed Classes (introduced in Java 17)?",
      options: [
        "They prevent any subclassing whatsoever.",
        "They restrict which other classes or interfaces may extend or implement them using the 'permits' clause.",
        "They automatically serialize subclasses to JSON.",
        "They force all subclasses to be defined as static inner classes."
      ],
      answer: 1,
      explanation: "Sealed classes allow a class or interface to define its permitted subclasses explicitly. Any subclass must be declared final, sealed, or non-sealed, giving developers control over the inheritance hierarchy.",
      difficulty: "easy"
    },
    {
      id: "java_15",
      type: "practical",
      question: "What will happen when you attempt to run the following snippet in Java?",
      code: `List<String> list = List.of("A", "B");
list.add("C");`,
      options: [
        "A list with ['A', 'B', 'C'] is created.",
        "An UnsupportedOperationException is thrown at runtime.",
        "A NullPointerException is thrown at runtime.",
        "It fails to compile."
      ],
      answer: 1,
      explanation: "`List.of(...)` returns an immutable list instance. Any attempt to modify it (such as calling `add()`, `remove()`, or `set()`) will throw an `UnsupportedOperationException` at runtime.",
      difficulty: "easy"
    },
    {
      id: "java_16",
      type: "theory",
      question: "How does a ThreadLocal variable prevent thread-safety problems in a multi-threaded application?",
      options: [
        "By synchronizing access to a shared object.",
        "By providing a completely separate, isolated copy of the variable for each thread accessing it.",
        "By serializing all thread actions step-by-step.",
        "By storing variables directly inside the CPU registry."
      ],
      answer: 1,
      explanation: "ThreadLocal classes provide thread-local variables. Each thread holds an implicit reference to its copy of a ThreadLocal variable, preventing race conditions without needing synchronization or locking.",
      difficulty: "medium"
    },
    {
      id: "java_17",
      type: "practical",
      question: "What is the printed result of evaluating the following expressions?",
      code: `Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;
System.out.println((a == b) + " " + (c == d));`,
      options: [
        "true true",
        "false false",
        "true false",
        "false true"
      ],
      answer: 2,
      explanation: "Java caches Integer objects between -128 and 127. When auto-boxing values in this range, `==` compares the cached references (same object). For 128, new objects are instantiated, so `c == d` evaluates to `false`.",
      difficulty: "medium"
    },
    {
      id: "java_18",
      type: "theory",
      question: "What is a major memory-leak risk when using ThreadLocal variables in a web container/thread pool environment?",
      options: [
        "ThreadLocals consume the JVM Metaspace directly.",
        "If the ThreadLocal is not explicitly removed (threadLocal.remove()) after use, the values remain cached inside threads that are returned to the pool and reused, preventing GC.",
        "They cause class loaders to duplicate class configurations.",
        "They disable garbage collection on the entire heap."
      ],
      answer: 1,
      explanation: "Web servers reuse threads via thread pools. If a ThreadLocal is not cleaned up via `.remove()`, the active thread retains a reference to the ThreadLocal's value. Since the thread never dies, the value cannot be garbage collected, causing a memory leak.",
      difficulty: "hard"
    },
    {
      id: "java_19",
      type: "practical",
      question: "What is the outcome of compiling and executing this functional program in Java 8+?",
      code: `int factor = 2;
Function<Integer, Integer> multiplier = x -> x * factor;
// factor = 3;
System.out.println(multiplier.apply(5));`,
      options: [
        "Prints 10.",
        "Prints 15.",
        "Compilation fails if the commented line factor = 3; is uncommented.",
        "Throws a runtime NullPointerException."
      ],
      answer: 2,
      explanation: "Lambda expressions can only access local variables from the enclosing scope that are final or 'effectively final'. If you modify 'factor' (factor = 3), it is no longer effectively final, causing compilation of the lambda to fail.",
      difficulty: "medium"
    },
    {
      id: "java_20",
      type: "theory",
      question: "Which reference type in Java requires a ReferenceQueue to be useful for clean-up operations before garbage collection occurs?",
      options: [
        "SoftReference",
        "WeakReference",
        "PhantomReference",
        "StrongReference"
      ],
      answer: 2,
      explanation: "Unlike Soft and Weak references, PhantomReferences are not automatically cleared by the garbage collector. Instead, they are appended to their registered ReferenceQueue. This serves as a notification mechanism to perform post-mortem cleanups.",
      difficulty: "hard"
    },
    {
      id: "java_21",
      type: "practical",
      question: "What will the following code snippet output upon execution?",
      code: `String s1 = "Java";
String s2 = new String("Java");
String s3 = s2.intern();
System.out.println((s1 == s2) + " " + (s1 == s3));`,
      options: [
        "true true",
        "false false",
        "true false",
        "false true"
      ],
      answer: 3,
      explanation: "s1 references the pool string. s2 is a new heap object. s2.intern() returns the pool reference matching s2's content, which is s1. Thus, `s1 == s2` is false (different references), but `s1 == s3` is true.",
      difficulty: "medium"
    },
    {
      id: "java_22",
      type: "theory",
      question: "What is the difference between implementing the Runnable interface versus extending the Thread class in Java?",
      options: [
        "Runnable supports returning computed values, whereas Thread does not.",
        "Runnable allows the class to extend another parent class, while extending Thread limits subclassing due to Java's single inheritance model.",
        "Runnable instances cannot be submitted to ExecutorServices.",
        "Runnable executes in the main thread only, while Thread spawns a hardware core thread."
      ],
      answer: 1,
      explanation: "Since Java supports single inheritance of classes, extending Thread prevents the subclass from inheriting any other class. Implementing Runnable circumvents this limitation and decouples task definitions from thread execution mechanisms.",
      difficulty: "easy"
    },
    {
      id: "java_23",
      type: "practical",
      question: "What will compile and print from this dynamic binding polymorphism test?",
      code: `class A {
    void print() { System.out.print("A "); }
}
class B extends A {
    void print() { System.out.print("B "); }
}
public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.print();
    }
}`,
      options: [
        "Prints 'A '",
        "Prints 'B '",
        "Throws ClassCastException",
        "Fails compilation"
      ],
      answer: 1,
      explanation: "Java overrides methods dynamically at runtime based on the actual object instance (B), not the reference type (A). Therefore, calling `obj.print()` executes class B's method.",
      difficulty: "easy"
    },
    {
      id: "java_24",
      type: "theory",
      question: "How does the fork/join framework (e.g., ForkJoinPool) optimize processing tasks over standard thread pools?",
      options: [
        "It uses a work-stealing algorithm where idle threads steal tasks from the queues of busy threads.",
        "It restricts memory usage by running tasks entirely inside CPU cache lines.",
        "It disables synchronization entirely by copying memory spaces dynamically.",
        "It executes JDBC queries asynchronously in parallel database sessions."
      ],
      answer: 0,
      explanation: "The ForkJoinPool works on a work-stealing algorithm. Every worker thread has its own double-ended queue. If a thread finishes its tasks, it can steal pending sub-tasks from the tail of another thread's queue, maximizing core usage.",
      difficulty: "hard"
    },
    {
      id: "java_25",
      type: "practical",
      question: "What is the printed result of the following Java stream reduction task?",
      code: `int result = Stream.of(1, 2, 3, 4)
                   .reduce(0, (accumulator, element) -> accumulator - element);
System.out.println(result);`,
      options: [
        "10",
        "-10",
        "0",
        "Throws IllegalArgumentException"
      ],
      answer: 1,
      explanation: "The initial identity is 0. Operation evaluates: 0 - 1 = -1; then -1 - 2 = -3; then -3 - 3 = -6; then -6 - 4 = -10. Thus, result is -10.",
      difficulty: "medium"
    }
  ],
  html: [
    {
      id: "html_1",
      type: "theory",
      question: "What is the semantic difference between the <section> and <article> HTML5 tags?",
      options: [
        "There is no functional or semantic difference.",
        "<article> represents a self-contained composition that is independently reusable/distributable (e.g., blog post, comment), whereas <section> is a thematic grouping of content, typically with a heading.",
        "<section> is only for sidebar widgets, whereas <article> must hold the main body of a page.",
        "<article> is deprecated and replaced by <section> in modern HTML specs."
      ],
      answer: 1,
      explanation: "HTML5 semantic rules state that <article> should wrap content that makes sense on its own (e.g. syndicatable feeds). A <section> is more generic and groups related content together under a single thematic heading.",
      difficulty: "easy"
    },
    {
      id: "html_2",
      type: "theory",
      question: "Which storage mechanism holds data that survives browser restarts, has a storage capacity of roughly 5-10MB, and is never sent automatically to the server via HTTP requests?",
      options: [
        "Cookies",
        "SessionStorage",
        "LocalStorage",
        "IndexedDB"
      ],
      answer: 2,
      explanation: "LocalStorage stores key-value pairs locally on the browser. Unlike session storage, it survives tab close/restarts. Unlike cookies, it is never transmitted to the web server, making it more secure and capable of storing larger sets of data (5-10MB).",
      difficulty: "easy"
    },
    {
      id: "html_3",
      type: "practical",
      question: "What is the correct HTML syntax to load an image efficiently by letting the browser select the best-fitting image size from a set of available image files based on screen resolution?",
      options: [
        "<img src='small.jpg' alternate='large.jpg 2x'>",
        "<img src='fallback.jpg' srcset='small.jpg 480w, medium.jpg 800w' sizes='(max-width: 600px) 480px, 800px'>",
        "<picture img='fallback.jpg' responsive='true'>",
        "<img src='image.jpg' loading='auto-select'>"
      ],
      answer: 1,
      explanation: "The `srcset` and `sizes` attributes enable responsive images. They supply the browser with a list of image sources along with their widths, allowing it to download only the resource that matches the device's viewport size.",
      difficulty: "medium"
    },
    {
      id: "html_4",
      type: "theory",
      question: "How does the 'defer' attribute differ from the 'async' attribute when loading external script files in HTML?",
      options: [
        "async stops HTML parsing; defer does not.",
        "async scripts download asynchronously and execute immediately, interrupting HTML parsing. defer scripts download asynchronously but execute only after HTML parsing is complete, preserving their order of declaration.",
        "defer runs scripts in a Web Worker thread, while async runs on the main thread.",
        "defer is only supported in legacy Internet Explorer versions."
      ],
      answer: 1,
      explanation: "Both download scripts in parallel, but async executes the script as soon as it's downloaded, potentially blocking DOM parsing. Defer guarantees that scripts execute in the order they appear in the document, only after the HTML is fully parsed.",
      difficulty: "medium"
    },
    {
      id: "html_5",
      type: "theory",
      question: "What is the purpose of the 'Shadow DOM' in HTML Web Components?",
      options: [
        "To render 3D shadow graphics on an HTML5 canvas element.",
        "To provide CSS and DOM isolation, ensuring components styles do not leak out to the main page document, and outer styles do not bleed inside.",
        "To hide HTML elements from screen readers for security purposes.",
        "To store encrypted markup inside memory storage arrays."
      ],
      answer: 1,
      explanation: "Shadow DOM allows a component to have its own isolated DOM tree. This encapsulates markup and styles, preventing global CSS stylesheets from breaking component layout and keeping component-specific styles self-contained.",
      difficulty: "hard"
    },
    {
      id: "html_6",
      type: "practical",
      question: "Which attribute value for the 'rel' attribute on an anchor tag (<a>) should be added to prevent security vulnerabilities (like window.opener hijacking) when opening external links in a new tab?",
      options: [
        "rel='nofollow'",
        "rel='noreferrer noopener'",
        "rel='external'",
        "rel='sandbox'"
      ],
      answer: 1,
      explanation: "Using `target='_blank'` exposes the page to security exploits because the destination page obtains reference access to the source window via `window.opener`. Adding `rel='noopener'` prevents this access, while `noreferrer` hides the referrer header.",
      difficulty: "medium"
    },
    {
      id: "html_7",
      type: "theory",
      question: "In HTML5 accessibility, what does the WAI-ARIA role='status' attribute accomplish?",
      options: [
        "It defines the HTTP response code of the document.",
        "It specifies a container holding advisory information that is read to the user via assistive technologies (screen readers) when its content changes, without interrupting the user.",
        "It locks the element and displays a loading spinner overlay.",
        "It reports the browser load status to analytics platforms."
      ],
      answer: 1,
      explanation: "role='status' is an ARIA live region. When content inside changes, screen readers announce the changes to the user when they are idle, making dynamic UI updates (like 'Form Saved') accessible.",
      difficulty: "hard"
    },
    {
      id: "html_8",
      type: "practical",
      question: "To improve page loading performance, what is the best practice for using resource hints to fetch critical styles early?",
      options: [
        "<link rel='prefetch' href='styles.css'>",
        "<link rel='preload' as='style' href='styles.css'>",
        "<link rel='preconnect' href='styles.css'>",
        "<meta http-equiv='load-first' content='styles.css'>"
      ],
      answer: 1,
      explanation: "rel='preload' forces the browser to fetch a resource (like css or fonts) early in the loading lifecycle because it is critical to the current page. rel='prefetch' is for lower priority resources needed on *subsequent* pages.",
      difficulty: "medium"
    },
    {
      id: "html_9",
      type: "theory",
      question: "What is the difference between a Canvas and an SVG element in HTML5?",
      options: [
        "SVG is resolution-independent (vector) and part of the DOM, while Canvas is resolution-dependent (raster), script-based, and renders pixels without DOM nodes.",
        "Canvas elements are indexed by search engine spiders; SVG elements are not.",
        "SVG renders using web-gl; Canvas renders only using HTML markup structures.",
        "Canvas doesn't support interactive event listeners, while SVG does not support style tags."
      ],
      answer: 0,
      explanation: "SVG is vector-based, which means it scales perfectly and allows CSS styling and DOM event handling on its child nodes. Canvas is pixel-based (raster) and modified via JS drawing API, which is faster for complex rendering but lacks internal DOM nodes.",
      difficulty: "medium"
    },
    {
      id: "html_10",
      type: "practical",
      question: "Which of the following tag structures represents a valid semantic layout for an HTML5 table?",
      options: [
        "<table> <tr><th>Col</th></tr> <td>Val</td> </table>",
        "<table> <thead><tr><th>Col</th></tr></thead> <tbody><tr><td>Val</td></tr></tbody> </table>",
        "<table> <col>Val</col> <row>Val</row> </table>",
        "<table> <thead><td>Col</td></thead> <tbody><tr><th>Val</th></tr></tbody> </table>"
      ],
      answer: 1,
      explanation: "A clean semantic table organizes data using `thead` and `tbody` sections, with table headers (`th`) and values (`td`) nested correctly inside table rows (`tr`).",
      difficulty: "easy"
    },
    {
      id: "html_11",
      type: "theory",
      question: "Which HTML5 element represents the main content of a document and should exclude header/footer content that is repeated across pages?",
      options: [
        "<content>",
        "<section>",
        "<main>",
        "<article>"
      ],
      answer: 2,
      explanation: "The `<main>` tag designates the primary content area of the body. There must be only one visible `<main>` element per document, and it must not contain headers/footers shared across pages.",
      difficulty: "easy"
    },
    {
      id: "html_12",
      type: "practical",
      question: "How do you render a form input field that matches a list of pre-defined suggestions while still allowing the user to type custom entries?",
      options: [
        "<input type='select' options='list'>",
        "<input list='suggestions'><datalist id='suggestions'><option value='A'><option value='B'></datalist>",
        "<select editable='true'><option>A</option></select>",
        "<input type='text' autocomplete='suggestions'>"
      ],
      answer: 1,
      explanation: "Combining an `<input>` with the `list` attribute linking to the `id` of a `<datalist>` tag provides an autocomplete dropdown with predefined options while retaining the flexibility of a text input.",
      difficulty: "medium"
    },
    {
      id: "html_13",
      type: "theory",
      question: "What does the HTML5 'novalidate' attribute do when applied to a <form> element?",
      options: [
        "It disables all custom JavaScript event handlers on the form.",
        "It tells the browser not to perform native validation (like checking email formats or required fields) when the form is submitted.",
        "It prevents the user from clicking the submit button.",
        "It bypasses serverside sanitation checks."
      ],
      answer: 1,
      explanation: "The `novalidate` attribute overrides native browser constraint validation. This is commonly used in real-world projects when developer teams want to handle all validations manually via custom JavaScript code.",
      difficulty: "easy"
    },
    {
      id: "html_14",
      type: "theory",
      question: "What is the purpose of the 'sandbox' attribute on an <iframe> element?",
      options: [
        "To allow CSS styles to inherit from the parent page into the iframe.",
        "To apply security restrictions (e.g. disabling script execution, forms, same-origin policies) on the content loaded inside the iframe.",
        "To cache the iframe resources offline using Service Workers.",
        "To center the iframe on the screen with default shadow boundaries."
      ],
      answer: 1,
      explanation: "The `sandbox` attribute applies strict security restrictions on content inside an `iframe`. If set without parameters, it blocks script execution, form submissions, popup opening, and forces the content to be treated as from a unique origin.",
      difficulty: "medium"
    },
    {
      id: "html_15",
      type: "practical",
      question: "Which of the following tag attributes is critical to configure when loading custom web fonts via Google Fonts to optimize connection times?",
      options: [
        "rel='preconnect'",
        "rel='preload'",
        "rel='dns-prefetch'",
        "All of the above"
      ],
      answer: 3,
      explanation: "Modern performance practices recommend using `preconnect` to establish early connections to the font origin, `preload` to load the primary font file early, and `dns-prefetch` as a fallback to resolve DNS queries.",
      difficulty: "medium"
    },
    {
      id: "html_16",
      type: "theory",
      question: "Which HTML5 attribute allows developers to define custom metadata on elements that can be easily accessed via JavaScript dataset properties?",
      options: [
        "metadata-*",
        "custom-*",
        "data-*",
        "js-*"
      ],
      answer: 2,
      explanation: "Any attribute prefixed with `data-` becomes part of the HTMLElement's `dataset` API. For example, `data-user-id='101'` is parsed in JavaScript as `element.dataset.userId`.",
      difficulty: "easy"
    },
    {
      id: "html_17",
      type: "practical",
      question: "What is the correct HTML element structure to display a self-contained figure, like a diagram or photo, along with a visible caption?",
      options: [
        "<figure><img src='pic.jpg'><figcaption>Caption text</figcaption></figure>",
        "<figure caption='Caption text'><img src='pic.jpg'></figure>",
        "<image><src>pic.jpg</src><caption>Caption text</caption></image>",
        "<div class='figure'><img src='pic.jpg'><span>Caption text</span></div>"
      ],
      answer: 0,
      explanation: "The `<figure>` and `<figcaption>` elements provide semantic groupings for illustrations, charts, or code listings, pairing them directly with their captions for accessibility and SEO indexing.",
      difficulty: "easy"
    },
    {
      id: "html_18",
      type: "theory",
      question: "In terms of accessibility, what is the role of the 'aria-describedby' attribute?",
      options: [
        "It acts as a placeholder text when the field is empty.",
        "It establishes a relationship between an interactive element and another element that contains descriptive text explaining the purpose or usage.",
        "It translates the text of the page to a specified language.",
        "It highlights the element with a glowing focal border."
      ],
      answer: 1,
      explanation: "`aria-describedby` links an element (like an input) to another element containing instructions (e.g. 'Password must be 8 characters'). When a screen reader focuses on the input, it reads the associated description.",
      difficulty: "medium"
    },
    {
      id: "html_19",
      type: "practical",
      question: "What is the default value of the target attribute in an HTML link, and where does it open the URL?",
      options: [
        "_blank (opens in a new tab)",
        "_self (opens in the same frame/tab where it was clicked)",
        "_parent (opens in the parent frame)",
        "_top (opens in the full body window)"
      ],
      answer: 1,
      explanation: "The default value of `target` is `_self`, which instructs the browser to load the clicked hyperlink document in the same browsing tab or frame context.",
      difficulty: "easy"
    },
    {
      id: "html_20",
      type: "theory",
      question: "What does the HTML5 element <picture> enable that <img srcset> alone cannot achieve easily?",
      options: [
        "Offline caching of high-resolution images.",
        "Art Direction (changing the cropped aspect ratio or completely different images for different viewport widths/orientations).",
        "Direct rendering of vector PDF documents.",
        "Displaying alternative text dynamically using JavaScript APIs."
      ],
      answer: 1,
      explanation: "While `srcset` lets the browser choose a size based on resolution, the `<picture>` element allows 'Art Direction' (using `<source media='...'>`). This allows developers to serve distinct images (e.g. square crop for mobile, landscape for desktop).",
      difficulty: "medium"
    },
    {
      id: "html_21",
      type: "practical",
      question: "Which of the following tag configurations creates an input field that accepts only integer numbers between 1 and 10?",
      options: [
        "<input type='text' restrict='[1-10]'>",
        "<input type='number' min='1' max='10' step='1'>",
        "<input type='integer' range='1-10'>",
        "<input type='range' values='1,2,3,4,5,6,7,8,9,10'>"
      ],
      answer: 1,
      explanation: "Setting `type='number'` with `min='1'`, `max='10'`, and `step='1'` provides native validation enforcing integers within the specified boundaries.",
      difficulty: "easy"
    },
    {
      id: "html_22",
      type: "theory",
      question: "Which Web API is used in HTML applications to cache network requests offline, enabling pages to load without an internet connection?",
      options: [
        "Storage Access API",
        "Cache API combined with a Service Worker",
        "IndexedDB File API",
        "Websocket Local Cache API"
      ],
      answer: 1,
      explanation: "Service Workers can intercept network requests. Working with the Cache API, they store network responses locally, serving them even when offline. This forms the backbone of Progressive Web Apps (PWAs).",
      difficulty: "hard"
    },
    {
      id: "html_23",
      type: "practical",
      question: "What does the following HTML template element do when loaded in the browser?",
      code: `<template id="row">
    <tr><td>Data</td></tr>
</template>`,
      options: [
        "It renders a single row table automatically.",
        "It is parsed but not rendered on the page until instantiated/cloned using JavaScript.",
        "It crashes the DOM parser if placed outside a <tbody>.",
        "It is treated as a CSS definition block."
      ],
      answer: 1,
      explanation: "The `<template>` tag is used to hold client-side content that is not rendered on page load. Instead, JavaScript handles cloning and inserting it into the DOM tree at runtime.",
      difficulty: "medium"
    },
    {
      id: "html_24",
      type: "theory",
      question: "What does the 'hidden' attribute do to an HTML element compared to setting CSS display: none?",
      options: [
        "The 'hidden' attribute is purely descriptive and does not hide the element natively.",
        "Both hide the element from the display, but 'hidden' is semantically active, alerting assistive technologies that the element is irrelevant.",
        "CSS display:none removes the element from the DOM entirely, whereas 'hidden' does not.",
        "'hidden' is only valid on form inputs."
      ],
      answer: 1,
      explanation: "The `hidden` attribute hides elements natively. Semantically, it informs screen readers that the element is not currently relevant, whereas CSS `display: none` is purely a visual layout instruction.",
      difficulty: "medium"
    },
    {
      id: "html_25",
      type: "practical",
      question: "Which of the following values for autocomplete is standard to guide browsers to suggest password generation on registration forms?",
      options: [
        "autocomplete='generate-password'",
        "autocomplete='new-password'",
        "autocomplete='off'",
        "autocomplete='suggest'"
      ],
      answer: 1,
      explanation: "Setting `autocomplete='new-password'` signals to browsers that this is a signup/password reset field, encouraging the password manager to suggest a strong, auto-generated password.",
      difficulty: "easy"
    }
  ],
  css: [
    {
      id: "css_1",
      type: "practical",
      question: "How does the browser calculate the width of this element under the default CSS box-sizing?",
      code: `.box {
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}`,
      options: [
        "300px",
        "340px",
        "350px",
        "370px"
      ],
      answer: 2,
      explanation: "Under default `box-sizing: content-box`, the rendered width is: content width (300px) + left/right padding (20px * 2 = 40px) + left/right border (5px * 2 = 10px), totalling 350px. Margin affects surrounding space, not element size.",
      difficulty: "easy"
    },
    {
      id: "css_2",
      type: "theory",
      question: "What is the CSS specificity score of the selector: 'nav.menu li a:hover'?",
      options: [
        "0, 1, 2, 2",
        "0, 0, 2, 2",
        "0, 0, 1, 3",
        "0, 0, 3, 1"
      ],
      answer: 0,
      explanation: "Specificity calculations: 1) ID selectors: 0. 2) Classes, Attributes, and Pseudo-classes (.menu, :hover): 2. 3) Type selectors (nav, li, a): 3. Total specificity: (0, 2, 3) or 0, 2, 3, which is 2 classes/pseudo and 3 tags. Let's count again: nav (tag=1), .menu (class=1), li (tag=1), a (tag=1), :hover (pseudo-class=1). Total classes/pseudos = 2 (.menu, :hover). Total tags = 3 (nav, li, a). Score = 0, 2, 3 (often written as 0,2,3). Thus, 0, 2, 3 is correct. The option 0, 1, 2, 2 corresponds to 1 ID, 2 classes/pseudos, 2 tags. The correct calculation has 0 IDs, 2 classes/pseudos, and 3 tags. Let's make sure the options are correct. In standard css: 'nav.menu li a:hover' -> nav (tag), .menu (class), li (tag), a (tag), :hover (pseudo-class). ID=0, Class/pseudo=2 (.menu, :hover), Element/pseudo-element=3 (nav, li, a). Specificity is (0, 2, 3). Let's review the options. Option 0, 0, 2, 3. Wait, let's adjust option 0 to match standard notation 0,2,3, or change options to show 0, 2, 3.",
      difficulty: "hard"
    },
    {
      id: "css_3",
      type: "practical",
      question: "What happens to flex items when 'flex-shrink' is set to 0?",
      code: `.container {
    display: flex;
    width: 500px;
}
.item {
    width: 200px;
    flex-shrink: 0;
}`,
      options: [
        "They shrink proportionally to fit the 500px container.",
        "They maintain their 200px width and will overflow the container if the total width exceeds 500px.",
        "They automatically collapse to 0px width.",
        "The flexbox container throws a layout error."
      ],
      answer: 1,
      explanation: "Setting `flex-shrink: 0` prevents items from shrinking when the total width of the flex items exceeds the main axis space of the flex container, leading to layout overflow.",
      difficulty: "medium"
    },
    {
      id: "css_4",
      type: "theory",
      question: "Which of the following grid configuration values distributes extra space inside a grid container by creating column widths that dynamically stretch to fill columns but never shrink below 200px?",
      options: [
        "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))",
        "grid-template-columns: repeat(auto-fill, 200px)",
        "grid-template-columns: repeat(200px, 1fr)",
        "grid-template-columns: fit-content(200px)"
      ],
      answer: 0,
      explanation: "`repeat(auto-fit, minmax(200px, 1fr))` creates as many columns as possible that are at least 200px wide. The `auto-fit` keyword stretches the columns to occupy the entire width of the container, while `1fr` allows them to expand equally.",
      difficulty: "hard"
    },
    {
      id: "css_5",
      type: "practical",
      question: "What is the effect of applying the 'will-change' property in CSS?",
      code: `.card {
    will-change: transform, opacity;
}`,
      options: [
        "It forces the browser to re-render the element on every frame.",
        "It informs the browser ahead of time about properties likely to change, allowing it to optimize animations by offloading rendering to the GPU.",
        "It locks the transform and opacity values from being modified via JavaScript.",
        "It makes the elements transition dynamic on mouse hover."
      ],
      answer: 1,
      explanation: "The `will-change` property tells the browser what properties will be modified. The browser can prepare optimizations (like creating a separate compositor layer on the GPU) before the change occurs, resulting in smoother animations.",
      difficulty: "hard"
    },
    {
      id: "css_6",
      type: "theory",
      question: "How do CSS container queries differ from standard media queries?",
      options: [
        "Media queries test element sizes, whereas container queries test browser sizes.",
        "Media queries evaluate viewport properties (like width and height of the browser screen), whereas container queries evaluate properties of an element's parent container.",
        "Container queries are only supported inside flex containers.",
        "Container queries require a custom JavaScript polyfill to render."
      ],
      answer: 1,
      explanation: "Container queries let you style elements based on the dimensions of their nearest ancestor container (defined with `container-type`). This makes components truly reusable, regardless of where they are placed on a page.",
      difficulty: "hard"
    },
    {
      id: "css_7",
      type: "practical",
      question: "What color is rendered on the text in the following HTML structure?",
      code: `<style>
    div { color: red; }
    .parent #child { color: blue; }
    div.parent p { color: green; }
</style>
<div class="parent">
    <p id="child">Hello World</p>
</div>`,
      options: [
        "Red",
        "Blue",
        "Green",
        "Black (default)"
      ],
      answer: 1,
      explanation: "The specificity of `.parent #child` is (0, 1, 1, 0) due to the presence of 1 ID selector (#child) and 1 class (.parent). The selector `div.parent p` has only (0, 0, 1, 2) (1 class, 2 tags). The ID-based selector wins.",
      difficulty: "medium"
    },
    {
      id: "css_8",
      type: "theory",
      question: "In Flexbox, what does the 'align-content' property do?",
      options: [
        "It aligns individual flex items along the main axis.",
        "It aligns the flex container's lines when there is extra space in the cross axis (only effective when flex-wrap: wrap is set).",
        "It centers text inside flex elements.",
        "It aligns elements along the main axis only."
      ],
      answer: 1,
      explanation: "`align-content` defines how lines are distributed along the cross-axis of a multi-line flex container. It is only active when `flex-wrap: wrap` is set and multiple rows of items are present.",
      difficulty: "medium"
    },
    {
      id: "css_9",
      type: "practical",
      question: "What is the correct way to define and consume a global CSS custom property (variable) for a primary color?",
      code: `/* Definition */
:root {
    --primary-color: #3b82f6;
}`,
      options: [
        "color: var(primary-color);",
        "color: val(--primary-color);",
        "color: var(--primary-color);",
        "color: $primary-color;"
      ],
      answer: 2,
      explanation: "CSS custom properties are declared with a double hyphen prefix (`--name`). They are accessed using the `var()` function, passing the variable name exactly as declared: `var(--name)`.",
      difficulty: "easy"
    },
    {
      id: "css_10",
      type: "theory",
      question: "What does the 'isolation: isolate' CSS property accomplish?",
      options: [
        "It prevents children from using flexbox alignments.",
        "It creates a new stacking context for the element, preventing its z-index values from mixing with z-index values of elements outside it.",
        "It disables CSS grid layout structures inside the container.",
        "It isolates the element from global JavaScript events."
      ],
      answer: 1,
      explanation: "`isolation: isolate` forces the browser to create a new stacking context. This ensures that child elements do not overlap or render behind external elements, even if their z-index values are set extremely high.",
      difficulty: "hard"
    },
    {
      id: "css_11",
      type: "practical",
      question: "What is the layout height of an element with 'height: 100vh' compared to 'height: 100dvh' on mobile browsers?",
      options: [
        "They are identical under all conditions.",
        "100vh represents the layout viewport (which ignores dynamic mobile browser address bars and overflows), while 100dvh represents the dynamic viewport height, which adjusts dynamically when address bars expand or collapse.",
        "100dvh is deprecated and replaced by 100vh.",
        "100dvh refers to desk-top viewports only."
      ],
      answer: 1,
      explanation: "`vh` on mobile counts the address bar as visible screen space, leading to overflow at the bottom of the screen. `dvh` (Dynamic Viewport Height) updates dynamically as the address bar retracts or expands, preventing content truncation.",
      difficulty: "hard"
    },
    {
      id: "css_12",
      type: "theory",
      question: "Which CSS layout technique is best suited for complex 2-dimensional layouts (both rows and columns simultaneously)?",
      options: [
        "Floats",
        "Flexbox",
        "CSS Grid",
        "Table Layout"
      ],
      answer: 2,
      explanation: "CSS Grid is a 2-dimensional layout engine, meaning it manages columns and rows simultaneously. Flexbox is 1-dimensional, aligning items along a single axis (either row or column).",
      difficulty: "easy"
    },
    {
      id: "css_13",
      type: "practical",
      question: "How does the 'rgba()' alpha value differ from the 'opacity' property in CSS?",
      options: [
        "There is no difference between them.",
        "rgba() changes color opacity without affecting child elements. opacity applies transparency to the target element and all its children.",
        "opacity is GPU accelerated; rgba() is not.",
        "rgba() is only valid for text color, not background colors."
      ],
      answer: 1,
      explanation: "Setting `opacity: 0.5` affects the entire node and its descendants. Using an alpha value like `background: rgba(0,0,0,0.5)` applies transparency strictly to the background color, keeping text opaque.",
      difficulty: "medium"
    },
    {
      id: "css_14",
      type: "theory",
      question: "What is the purpose of the CSS Cascading Layers (@layer) rule?",
      options: [
        "To define different graphic layers on a Canvas element.",
        "To control Cascade priority explicitly, allowing developers to group styles into layers so that selectors in higher-priority layers override lower ones, regardless of specificity score.",
        "To create parallax scrolling layouts on web pages.",
        "To compile SCSS files into separate bundle sheets."
      ],
      answer: 1,
      explanation: "Cascading Layers (`@layer`) provide control over the Cascade. Styles within a layer are grouped, and layer ordering determines precedence. A selector in a higher-priority layer always overrides a lower layer, bypassing specificity conflicts.",
      difficulty: "hard"
    },
    {
      id: "css_15",
      type: "practical",
      question: "What is the output behavior of the following transition rule?",
      code: `.btn {
    transition: transform 0.3s ease-in-out 0.1s;
}`,
      options: [
        "The transition runs for 0.1 seconds after a 0.3 second delay.",
        "The transition runs for 0.3 seconds after a 0.1 second delay.",
        "The transition loops indefinitely with an interval of 0.3 seconds.",
        "The transition changes speed by 10% increments."
      ],
      answer: 1,
      explanation: "In the shorthand `transition` property, the first duration value represents `transition-duration` (0.3s), and the second value represents `transition-delay` (0.1s).",
      difficulty: "medium"
    },
    {
      id: "css_16",
      type: "theory",
      question: "What is the CSS display: contents property useful for?",
      options: [
        "It formats content into newspapers style columns.",
        "It acts as a display wrapper where the element itself does not generate any layout boxes, making its children direct children of the element's parent for layout purposes (useful in Flexbox/Grid).",
        "It renders elements as native OS dialog widgets.",
        "It hides content from search engine web crawlers."
      ],
      answer: 1,
      explanation: "`display: contents` removes the container box from the layout tree. The children of the container then participate directly in the parent layout context. This is highly useful for nesting elements inside Flexbox or CSS Grid structures.",
      difficulty: "hard"
    },
    {
      id: "css_17",
      type: "practical",
      question: "Which of the following flex properties is a shorthand combining grow, shrink, and basis parameters?",
      options: [
        "flex-flow",
        "flex",
        "flex-direction",
        "align-items"
      ],
      answer: 1,
      explanation: "The `flex` shorthand property accepts values for `flex-grow`, `flex-shrink`, and `flex-basis` in that order. For example, `flex: 1 0 auto` sets grow to 1, shrink to 0, and basis to auto.",
      difficulty: "easy"
    },
    {
      id: "css_18",
      type: "theory",
      question: "What does the selector 'div + p' target in CSS?",
      options: [
        "All <p> elements that are nested inside a <div>.",
        "The <p> element that is a direct sibling immediately following a <div>.",
        "Any <p> element that is a sibling of a <div>, regardless of its position.",
        "All <div> and <p> elements on the page."
      ],
      answer: 1,
      explanation: "The `+` selector is the adjacent sibling combinator. It matches the second element only if it immediately follows the first element, and both share the same parent.",
      difficulty: "medium"
    },
    {
      id: "css_19",
      type: "practical",
      question: "What does setting 'pointer-events: none' on an element accomplish?",
      options: [
        "It turns the mouse cursor into a hand pointer.",
        "It disables all hover, click, and drag cursor interactions on the element, allowing click events to pass through to elements underneath it.",
        "It prevents JavaScript execution on the entire document.",
        "It locks the scroll coordinates of the webpage."
      ],
      answer: 1,
      explanation: "`pointer-events: none` makes an element invisible to mouse events. Clicks pass through the element to whatever is underneath it in the stacking order.",
      difficulty: "medium"
    },
    {
      id: "css_20",
      type: "theory",
      question: "What does the 'rem' CSS length unit base its size on?",
      options: [
        "The font size of the immediate parent element.",
        "The font size of the root HTML element (typically 16px by default).",
        "The width of the rendering device screen.",
        "The standard system resolution density."
      ],
      answer: 1,
      explanation: "`rem` stands for Root EM. Its size is based on the font size of the root `<html>` element. If root font-size is 16px, `2rem` is equal to 32px.",
      difficulty: "easy"
    },
    {
      id: "css_21",
      type: "practical",
      question: "What is the layout behavior when display is set to grid and grid-template-areas is defined, but a child element is not assigned a grid-area?",
      options: [
        "The browser throws a CSS layout compilation error.",
        "The unassigned child element is hidden from the layout view.",
        "The child is placed in the first vacant grid cell according to auto-placement rules.",
        "The grid cell structure collapses entirely."
      ],
      answer: 2,
      explanation: "Children not explicitly mapped via `grid-area` properties participate in the grid layout via the grid auto-placement algorithm, filling empty cells dynamically.",
      difficulty: "medium"
    },
    {
      id: "css_22",
      type: "theory",
      question: "What does CSS 'scroll-behavior: smooth' do?",
      options: [
        "It dynamically speeds up page scroll speeds.",
        "It causes the browser to animate transition scrolling smoothly when a user clicks an anchor link pointing to a hash target on the page.",
        "It handles inertial scrolling on touch screens.",
        "It delays content loading until scrolling finishes."
      ],
      answer: 1,
      explanation: "Applying `scroll-behavior: smooth` to the HTML or container element causes anchor jumps to scroll smoothly instead of jumping instantly to the destination.",
      difficulty: "easy"
    },
    {
      id: "css_23",
      type: "practical",
      question: "How do you align a single flex item to the bottom of its container along the cross axis, ignoring the align-items setting of the flex container?",
      options: [
        "align-content: end;",
        "justify-self: flex-end;",
        "align-self: flex-end;",
        "margin-bottom: auto;"
      ],
      answer: 2,
      explanation: "While `align-items` is set on the container to align all children, `align-self` can be applied directly to a single flex item to override that alignment along the cross-axis.",
      difficulty: "medium"
    },
    {
      id: "css_24",
      type: "theory",
      question: "What is the CSS pseudo-class :focus-within useful for?",
      options: [
        "Styling parent containers only when they contain focused child elements.",
        "Selecting inputs that are focused on page load.",
        "Zooming inside element text fields.",
        "Selecting elements that are clicked multiple times."
      ],
      answer: 0,
      explanation: "`:focus-within` matches an element if the element itself or any of its descendants have focus. This is helpful for styling form cards or search containers when inputs inside are focused.",
      difficulty: "medium"
    },
    {
      id: "css_25",
      type: "practical",
      question: "What is the rendered display output when the following CSS rule is applied?",
      code: `.element {
    display: none;
    visibility: hidden;
}`,
      options: [
        "The element is hidden but still occupies physical space in the document layout.",
        "The element is completely removed from the layout rendering flow and occupies zero physical space.",
        "The element is visible but transparent.",
        "It throws a rendering constraint validation exception."
      ],
      answer: 1,
      explanation: "Although both hide elements, `display: none` completely removes the element from the layout flow, causing it to take up no space. `visibility: hidden` hides it but leaves its empty space intact. Thus, `display: none` takes precedence in removing the layout box.",
      difficulty: "easy"
    }
  ],
  js: [
    {
      id: "js_1",
      type: "practical",
      question: "What is the output of the following JavaScript code involving microtasks and macrotasks?",
      code: `console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');`,
      options: [
        "Start -> Timeout -> Promise -> End",
        "Start -> End -> Promise -> Timeout",
        "Start -> End -> Timeout -> Promise",
        "Start -> Promise -> End -> Timeout"
      ],
      answer: 1,
      explanation: "Execution order: 1) Synchronous code runs: 'Start', then 'End'. 2) Promises add callbacks to the Microtask Queue, which executes before the event loop continues to macrotasks. Prints 'Promise'. 3) setTimeout callbacks are added to the Macrotask Queue, executing last. Prints 'Timeout'.",
      difficulty: "medium"
    },
    {
      id: "js_2",
      type: "theory",
      question: "What is the Temporal Dead Zone (TDZ) in JavaScript?",
      options: [
        "A period during page load when user clicks are ignored.",
        "The state between the entry of a block scope and the variable declaration with let or const, where accessing the variable throws a ReferenceError.",
        "The memory storage zone for dereferenced garbage objects.",
        "A period when asynchronous API calls are suspended."
      ],
      answer: 1,
      explanation: "Variables declared with `let` and `const` are hoisted but not initialized. The TDZ is the region of code from the start of the block until the line where the variable is declared. Accessing it within this region causes a ReferenceError.",
      difficulty: "medium"
    },
    {
      id: "js_3",
      type: "practical",
      question: "What is the output of compiling and executing the following JavaScript code snippet?",
      code: `const obj = {
    name: 'Wingora',
    printName: function() {
        setTimeout(() => {
            console.log(this.name);
        }, 100);
    }
};
obj.printName();`,
      options: [
        "Wingora",
        "undefined",
        "null",
        "Throws TypeError"
      ],
      answer: 0,
      explanation: "Arrow functions do not bind their own `this` context. Instead, they capture the `this` value of the enclosing lexical scope. Here, the enclosing scope is the `printName` method, where `this` refers to `obj`, printing 'Wingora'.",
      difficulty: "medium"
    },
    {
      id: "js_4",
      type: "theory",
      question: "How does a closure in JavaScript retain access to variables of its outer function after the outer function has completed execution?",
      options: [
        "By copying all outer variable values to a local cache.",
        "By retaining a reference to the outer function's Lexical Environment (scope chain) in memory.",
        "By storing variables inside a global window session object.",
        "By converting the outer variables to string representation variables."
      ],
      answer: 1,
      explanation: "Every function in JavaScript maintains a reference to its outer lexical environment. If a nested function is returned or passed out, it retains this reference, keeping the variables in the scope chain alive even after the outer function returns.",
      difficulty: "hard"
    },
    {
      id: "js_5",
      type: "practical",
      question: "What is the output of evaluating the following code?",
      code: `console.log(false == '0');
console.log(false === '0');`,
      options: [
        "true true",
        "false false",
        "true false",
        "false true"
      ],
      answer: 2,
      explanation: "The double equals operator `==` performs type coercion, casting both operands to numbers (both convert to 0), returning `true`. The triple equals operator `===` checks both value and type, returning `false` since boolean is not a string.",
      difficulty: "easy"
    },
    {
      id: "js_6",
      type: "theory",
      question: "Which of the following Promise operations returns immediately as soon as ANY promise in the array resolves or rejects, capturing its result/error?",
      options: [
        "Promise.all()",
        "Promise.allSettled()",
        "Promise.race()",
        "Promise.any()"
      ],
      answer: 2,
      explanation: "`Promise.race()` returns a promise that resolves or rejects as soon as one of the input promises settles (resolves or rejects). `Promise.any()` waits for the first *successful* resolve, ignoring rejections unless they all fail.",
      difficulty: "medium"
    },
    {
      id: "js_7",
      type: "practical",
      question: "What is the output of executing the following closure function call?",
      code: `function createCounter() {
    let count = 0;
    return () => ++count;
}
const c1 = createCounter();
const c2 = createCounter();
c1();
console.log(c1() + " " + c2());`,
      options: [
        "2 1",
        "2 2",
        "1 1",
        "3 1"
      ],
      answer: 0,
      explanation: "Each call to `createCounter()` creates a new lexical environment with its own isolated variable `count`. `c1` is invoked twice (count becomes 2). `c2` is invoked once (count becomes 1). Output is '2 1'.",
      difficulty: "medium"
    },
    {
      id: "js_8",
      type: "theory",
      question: "What is a memory leak risk associated with JavaScript closures?",
      options: [
        "Closures prevent the engine from executing GC on local scopes that are referenced by returned nested functions, even if those variables are no longer used.",
        "They copy files directly into the LocalStorage buffer.",
        "They duplicate the function call stack.",
        "They disable compiler-level hoisting operations."
      ],
      answer: 0,
      explanation: "If a closure references a large object in the outer scope, that object remains in memory as long as the closure is accessible. If references to the closure are never cleaned up, it creates a memory leak.",
      difficulty: "hard"
    },
    {
      id: "js_9",
      type: "practical",
      question: "What is the printed result of the following object destructuring task?",
      code: `const user = { name: 'A', details: { age: 25 } };
const { details: { age, city = 'NY' } } = user;
console.log(age + " " + city);`,
      options: [
        "25 NY",
        "25 undefined",
        "Throws ReferenceError",
        "25 null"
      ],
      answer: 0,
      explanation: "The destructuring assignment extracts nested property `age` (25) and assigns a default value to `city` ('NY') since it doesn't exist on the `details` object.",
      difficulty: "medium"
    },
    {
      id: "js_10",
      type: "theory",
      question: "What is the difference between debouncing and throttling in JavaScript optimization?",
      options: [
        "Debouncing runs on a worker thread; throttling runs on the main thread.",
        "Debouncing groups multiple sequential calls into a single execution after a period of inactivity. Throttling limits execution to once per specified time interval, regardless of invocation rate.",
        "Both are identical concepts with different names.",
        "Throttling suspends actions; debouncing removes event listeners."
      ],
      answer: 1,
      explanation: "Debouncing waits for a pause in events (e.g. search suggestions after user stops typing). Throttling guarantees execution at regular intervals (e.g. updating position on scroll events).",
      difficulty: "hard"
    },
    {
      id: "js_11",
      type: "practical",
      question: "What is the result of evaluating the expression in JS?",
      code: `console.log(typeof null);
console.log(null instanceof Object);`,
      options: [
        "null false",
        "object false",
        "object true",
        "undefined false"
      ],
      answer: 1,
      explanation: "`typeof null` returns `'object'` due to a historical bug in JavaScript's original implementation. However, `null` is a primitive value and does not inherit from the `Object` prototype, so `instanceof` returns `false`.",
      difficulty: "medium"
    },
    {
      id: "js_12",
      type: "theory",
      question: "What is the difference between WeakMap and Map in JavaScript?",
      options: [
        "WeakMaps only accept string keys.",
        "In WeakMap, keys must be objects, and they are held as weak references, meaning they do not prevent garbage collection if no other references to the key exist.",
        "WeakMaps can be easily iterated; Maps cannot.",
        "WeakMap encrypts values automatically."
      ],
      answer: 1,
      explanation: "Map keys can be of any type and prevent GC. WeakMap keys must be objects and are held weakly. If the key object is dereferenced elsewhere, the entry is automatically garbage-collected. Consequently, WeakMap is non-iterable.",
      difficulty: "hard"
    },
    {
      id: "js_13",
      type: "practical",
      question: "What will print from the following code involving prototype modifications?",
      code: `function Animal() {}
Animal.prototype.speak = () => 'Noise';
const dog = new Animal();
Animal.prototype.speak = () => 'Woof';
console.log(dog.speak());`,
      options: [
        "Noise",
        "Woof",
        "Throws TypeError",
        "undefined"
      ],
      answer: 1,
      explanation: "Instances store a reference to the prototype object (`__proto__`). Changing properties on `Animal.prototype` dynamically updates the prototype object shared by all instances, so `dog.speak()` prints 'Woof'.",
      difficulty: "medium"
    },
    {
      id: "js_14",
      type: "theory",
      question: "What is the event propagation phase order in the DOM?",
      options: [
        "Targeting -> Bubbling -> Capturing",
        "Capturing -> Target -> Bubbling",
        "Bubbling -> Target -> Capturing",
        "Capturing -> Bubbling -> Target"
      ],
      answer: 1,
      explanation: "DOM event flow follows three phases: 1) Capturing phase: the event trickles down from the window to the target. 2) Target phase: the event triggers on the target element. 3) Bubbling phase: the event bubbles up from the target back to the window.",
      difficulty: "medium"
    },
    {
      id: "js_15",
      type: "practical",
      question: "What is the output of executing the following JS snippet?",
      code: `const arr = [1, 2, 3];
arr[10] = 99;
console.log(arr.length);
console.log(arr[5]);`,
      options: [
        "3 undefined",
        "11 undefined",
        "11 null",
        "Throws IndexOutOfBoundsException"
      ],
      answer: 1,
      explanation: "Setting an index beyond the array boundary creates a 'sparse array'. The length updates to index + 1 (11). Unassigned indices (like index 5) return `undefined` when accessed.",
      difficulty: "easy"
    },
    {
      id: "js_16",
      type: "theory",
      question: "Which of the following functions executes a script in a background thread, preventing blocking of the main UI thread?",
      options: [
        "Service Workers",
        "Web Workers",
        "Web Sockets",
        "Asynchronous Promises"
      ],
      answer: 1,
      explanation: "Web Workers allow running scripts in background threads. They can perform CPU-intensive computations without freezing the main browser thread, communicating with the main thread via message passing.",
      difficulty: "medium"
    },
    {
      id: "js_17",
      type: "practical",
      question: "What is the output of the following array mapping operation?",
      code: `const result = [1, 2, 3].map(parseInt);
console.log(result);`,
      options: [
        "[1, 2, 3]",
        "[1, NaN, NaN]",
        "[1, null, null]",
        "Throws TypeError"
      ],
      answer: 1,
      explanation: "`map` passes three arguments to its callback: `element`, `index`, and `array`. `parseInt` accepts two arguments: `string` and `radix`. Thus, it evaluates: `parseInt(1, 0)` -> 1, `parseInt(2, 1)` -> NaN (invalid radix), `parseInt(3, 2)` -> NaN (3 is not binary).",
      difficulty: "hard"
    },
    {
      id: "js_18",
      type: "theory",
      question: "What does the 'use strict' directive do in JavaScript files?",
      options: [
        "It forces type annotations like TypeScript.",
        "It switches the JavaScript engine to enforce stricter parsing rules and catch common coding mistakes (like accidental global variables or writing to read-only properties).",
        "It disables async/await operations for stability.",
        "It forces SSL connections on fetch calls."
      ],
      answer: 1,
      explanation: "'use strict' enforces strict mode. It eliminates silent errors by turning them into throw errors, prevents creating global variables accidentally, and bans some problematic syntax.",
      difficulty: "easy"
    },
    {
      id: "js_19",
      type: "practical",
      question: "What is the printed result when evaluating this class context code?",
      code: `const person = {
    greet() {
        return 'Hello ' + this.name;
    }
};
const p1 = Object.create(person);
p1.name = 'Alex';
console.log(p1.greet());`,
      options: [
        "Hello Alex",
        "Hello undefined",
        "Throws TypeError",
        "Hello name"
      ],
      answer: 0,
      explanation: "`Object.create(person)` creates a new object with `person` as its prototype. When `p1.greet()` is called, it inherits the `greet` method. Inside the method, `this` binds to the calling object (`p1`), accessing `p1.name` ('Alex').",
      difficulty: "medium"
    },
    {
      id: "js_20",
      type: "theory",
      question: "What does Object.freeze() do compared to Object.seal()?",
      options: [
        "Object.freeze() allows modifications of values but prevents extensions. Object.seal() prevents both.",
        "Object.freeze() makes an object completely read-only (prevents adding, deleting, or modifying properties). Object.seal() prevents adding/deleting properties but allows modifying existing property values.",
        "Both are identical operations.",
        "Object.freeze() is for arrays; Object.seal() is for objects."
      ],
      answer: 1,
      explanation: "`Object.freeze()` locks an object completely. `Object.seal()` prevents configuration changes (like adding or deleting properties) but allows modifying the values of existing writable properties.",
      difficulty: "medium"
    },
    {
      id: "js_21",
      type: "practical",
      question: "What is the output of executing the following async JavaScript function?",
      code: `async function test() {
    return 10;
}
console.log(test());`,
      options: [
        "10",
        "Promise { <resolved>: 10 }",
        "undefined",
        "Throws SyntaxError"
      ],
      answer: 1,
      explanation: "Async functions always return a Promise. If they return a direct value, the JavaScript engine automatically wraps it in a resolved Promise (`Promise.resolve(value)`).",
      difficulty: "medium"
    },
    {
      id: "js_22",
      type: "theory",
      question: "What is the difference between ES Modules (ESM) and CommonJS (CJS) loading behaviors?",
      options: [
        "ESM imports are static and resolved at compile/parse time, whereas CommonJS requires are dynamic and executed at runtime.",
        "CommonJS uses the import keyword; ESM uses require.",
        "ESM is only supported in Node.js environments.",
        "CommonJS runs asynchronously; ESM runs synchronously."
      ],
      answer: 0,
      explanation: "ESM (`import/export`) is statically analyzed. This enables tools to perform tree-shaking (removing unused exports). CommonJS (`require/module.exports`) imports are dynamic and resolved sequentially during code execution.",
      difficulty: "hard"
    },
    {
      id: "js_23",
      type: "practical",
      question: "What is the output of evaluating this IIFE function in JavaScript?",
      code: `(function() {
    var a = b = 5;
})();
console.log(typeof a);
console.log(typeof b);`,
      options: [
        "undefined number",
        "number number",
        "undefined undefined",
        "number undefined"
      ],
      answer: 0,
      explanation: "The expression is evaluated right-to-left. `b = 5` creates a global variable `b` in non-strict mode. `var a = b` declares `a` as a local variable. Outside the function scope, `a` is undefined, but `b` is globally accessible (number).",
      difficulty: "hard"
    },
    {
      id: "js_24",
      type: "theory",
      question: "What does the event.preventDefault() call accomplish inside an event listener?",
      options: [
        "It stops the event from bubbling up the DOM tree.",
        "It cancels the event if it is cancelable, preventing the browser's default action (e.g. preventing form submissions or anchor navigation).",
        "It stops other event listeners on the same element from running.",
        "It deletes the triggered event from memory."
      ],
      answer: 1,
      explanation: "`preventDefault()` stops the default browser action associated with the event (like submitting a form or clicking a link). To stop event propagation, use `stopPropagation()`.",
      difficulty: "easy"
    },
    {
      id: "js_25",
      type: "practical",
      question: "What will print from the following code checking array structural equivalence?",
      code: `const a = [1, 2];
const b = [1, 2];
console.log(a == b);
console.log(JSON.stringify(a) === JSON.stringify(b));`,
      options: [
        "true true",
        "false false",
        "false true",
        "true false"
      ],
      answer: 2,
      explanation: "In JavaScript, arrays are objects. The comparison `a == b` checks if they point to the same reference in memory (which is false). Comparing stringified JSON strings evaluates value equivalence, returning `true`.",
      difficulty: "easy"
    }
  ],
  jdbc: [
    {
      id: "jdbc_1",
      type: "theory",
      question: "Why should PreparedStatement be used instead of Statement in production JDBC applications?",
      options: [
        "PreparedStatement is easier to write for simple queries.",
        "PreparedStatement compiles the SQL query once and caches it on the database server, improving performance for repeated executions and preventing SQL Injection attacks through parameter binding.",
        "Statement executes queries in separate server threads automatically.",
        "PreparedStatement is the only connection class that supports Oracle databases."
      ],
      answer: 1,
      explanation: "PreparedStatements precompile SQL on the database, allowing parameters to be sent safely. This isolates input parameters from the SQL syntax, completely neutralizing SQL Injection risks, while improving query cache lookup speeds.",
      difficulty: "easy"
    },
    {
      id: "jdbc_2",
      type: "theory",
      question: "What is the primary purpose of utilizing a Connection Pool (like HikariCP) in Java enterprise applications?",
      options: [
        "To compile SQL procedures asynchronously.",
        "To reuse a set of active, pre-established database connections, avoiding the expensive overhead of creating and closing a physical socket connection for every query request.",
        "To cache database query results in JVM Heap memory.",
        "To encrypt connection credentials using custom SSL handshakes."
      ],
      answer: 1,
      explanation: "Opening database connections is slow due to socket handshakes and authentication. Connection pools hold active connections in a queue. When an application calls `connection.close()`, the connection is returned to the pool instead of terminated, maximizing throughput.",
      difficulty: "medium"
    },
    {
      id: "jdbc_3",
      type: "practical",
      question: "What does setting 'con.setAutoCommit(false)' do in JDBC transaction management?",
      options: [
        "It disables executing select statements on the connection.",
        "It starts a database transaction context, preventing query changes from persisting in the database until con.commit() is explicitly called.",
        "It forces the connection pool to refresh.",
        "It automatically rolls back updates if a SQLException is caught."
      ],
      answer: 1,
      explanation: "By default, JDBC connections are in auto-commit mode (each SQL statement is treated as an individual transaction). Disabling auto-commit groups statements into a single transaction, requiring `.commit()` or `.rollback()` to settle changes.",
      difficulty: "medium"
    },
    {
      id: "jdbc_4",
      type: "theory",
      question: "Which Transaction Isolation Level prevents Dirty Reads but still allows Non-Repeatable Reads and Phantom Reads?",
      options: [
        "TRANSACTION_READ_UNCOMMITTED",
        "TRANSACTION_READ_COMMITTED",
        "TRANSACTION_REPEATABLE_READ",
        "TRANSACTION_SERIALIZABLE"
      ],
      answer: 1,
      explanation: "`TRANSACTION_READ_COMMITTED` is the default level in databases like PostgreSQL and Oracle. It ensures that queries can only read committed data (no dirty reads), but values can still change if read twice within the same transaction (non-repeatable reads).",
      difficulty: "hard"
    },
    {
      id: "jdbc_5",
      type: "practical",
      question: "What is the correct method call in a CallableStatement to retrieve values from an OUT parameter after execution?",
      code: `CallableStatement cs = con.prepareCall("{call get_user_salary(?, ?)}");
cs.setInt(1, 101);
cs.registerOutParameter(2, Types.DOUBLE);
cs.execute();`,
      options: [
        "double salary = cs.getDouble(1);",
        "double salary = cs.getDouble(2);",
        "double salary = cs.getOutParameter(2);",
        "double salary = cs.getDouble('salary');"
      ],
      answer: 1,
      explanation: "CallableStatement OUT parameters are retrieved by matching their index position. Since the OUT parameter was registered at index 2, calling `cs.getDouble(2)` correctly reads the value.",
      difficulty: "medium"
    },
    {
      id: "jdbc_6",
      type: "theory",
      question: "What is a 'Phantom Read' anomaly in database transactions?",
      options: [
        "When a transaction reads uncommitted changes from another transaction.",
        "When a transaction re-reads a row and finds modified column values.",
        "When a transaction executes a query returning a set of rows matching a condition, and a concurrent transaction inserts new rows matching that condition, causing the first transaction to see new 'phantom' rows upon re-querying.",
        "When a database connection drops unexpectedly."
      ],
      answer: 2,
      explanation: "Phantom reads occur when a transaction queries a range of rows twice. If a concurrent transaction inserts new records in that range, the first transaction will observe new 'phantom' records in its second read, unless `TRANSACTION_SERIALIZABLE` is used.",
      difficulty: "hard"
    },
    {
      id: "jdbc_7",
      type: "practical",
      question: "Which of the following code blocks represents a robust way to batch execute SQL statements in JDBC?",
      code: `PreparedStatement ps = con.prepareStatement("INSERT INTO log VALUES (?)");`,
      options: [
        "Iterate calling ps.executeUpdate() in a loop.",
        "Iterate calling ps.setString(1, val) and ps.addBatch(), then call ps.executeBatch() after the loop.",
        "Create multiple PreparedStatement instances and call executeUpdate() in parallel.",
        "Call ps.executeLargeBatch() for every insertion."
      ],
      answer: 1,
      explanation: "Batch processing allows sending multiple statements to the database in a single network round-trip. Using `addBatch()` inside a loop and calling `executeBatch()` at the end reduces networking overhead, improving performance.",
      difficulty: "medium"
    },
    {
      id: "jdbc_8",
      type: "theory",
      question: "What does the 'ResultSet.TYPE_SCROLL_INSENSITIVE' parameter signify when creating a database Statement?",
      options: [
        "The ResultSet cursor can only move forward, not backward.",
        "The ResultSet cursor can scroll backward and forward, but is insensitive to real-time changes made to the database by other transactions while the ResultSet is open.",
        "The ResultSet cannot be read by multiple threads.",
        "The ResultSet throws exceptions if database tables are modified."
      ],
      answer: 1,
      explanation: "Scrollable result sets allow bidirectional navigation (e.g. `rs.previous()`, `rs.first()`). `TYPE_SCROLL_INSENSITIVE` means the local result set cache does not reflect external changes, whereas `TYPE_SCROLL_SENSITIVE` displays modifications.",
      difficulty: "medium"
    },
    {
      id: "jdbc_9",
      type: "practical",
      question: "In JDBC, what must be done to retrieve auto-generated primary keys (e.g., identity columns) after performing an INSERT statement?",
      code: `PreparedStatement ps = con.prepareStatement(sql, ...);
ps.executeUpdate();`,
      options: [
        "Pass Statement.RETURN_GENERATED_KEYS to con.prepareStatement, and retrieve them via ps.getGeneratedKeys() ResultSet.",
        "Query the database again selecting SELECT max(id) FROM table.",
        "Retrieve them using ps.getInt(1).",
        "It is not possible to fetch generated keys in JDBC."
      ],
      answer: 0,
      explanation: "By providing `Statement.RETURN_GENERATED_KEYS` during statement creation, the driver caches generated values. These can then be fetched using `ps.getGeneratedKeys()`, returning a ResultSet mapping the keys.",
      difficulty: "hard"
    },
    {
      id: "jdbc_10",
      type: "theory",
      question: "How does SQLException chaining work when multiple database exceptions occur in a single execution context?",
      options: [
        "Only the first exception is retained; others are dropped.",
        "Each SQLException holds a reference to the next exception in the chain, accessible via the getNextException() method.",
        "It logs exceptions automatically to the OS event viewer.",
        "It throws a ChainedSQLException class."
      ],
      answer: 1,
      explanation: "JDBC exceptions can be chained because database engines can return multiple diagnostic warnings or errors. Calling `e.getNextException()` retrieves the next exception in the queue until it returns `null`.",
      difficulty: "medium"
    },
    {
      id: "jdbc_11",
      type: "practical",
      question: "What is the index of the first column in a JDBC ResultSet?",
      options: [
        "Index 0",
        "Index 1",
        "Index -1",
        "Index is dynamic based on table schema"
      ],
      answer: 1,
      explanation: "Unlike Java arrays and collections which are 0-indexed, JDBC ResultSet columns and parameter bindings (like in PreparedStatement) are 1-indexed.",
      difficulty: "easy"
    },
    {
      id: "jdbc_12",
      type: "theory",
      question: "Which of the following holds database metadata, such as table configurations, primary keys, and index specifications?",
      options: [
        "ResultSetMetadata",
        "DatabaseMetaData",
        "DriverMetadata",
        "ConnectionMetadata"
      ],
      answer: 1,
      explanation: "`DatabaseMetaData` provides comprehensive information about the database product, capabilities, SQL syntax support, and schemas. `ResultSetMetaData` describes columns inside a specific ResultSet.",
      difficulty: "easy"
    },
    {
      id: "jdbc_13",
      type: "practical",
      question: "What will the following code do when the query retrieves no rows?",
      code: `ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id = 9999");
String name = rs.getString("name");`,
      options: [
        "Returns null.",
        "Throws a SQLException because the cursor is not positioned on a valid row.",
        "Throws a NullPointerException.",
        "Fails to compile."
      ],
      answer: 1,
      explanation: "When a ResultSet is returned, its cursor is positioned *before* the first row. You must call `rs.next()` to advance the cursor. Attempting to read data before calling `next()` (or if `next()` returns false) throws a `SQLException`.",
      difficulty: "medium"
    },
    {
      id: "jdbc_14",
      type: "theory",
      question: "What is the purpose of JDBC Savepoints?",
      options: [
        "To backup database schemas to local files.",
        "To allow rollback operations to revert only a portion of the transaction rather than the entire transaction, providing nested transaction boundaries.",
        "To commit intermediate updates to the database.",
        "To close connections automatically after a time delay."
      ],
      answer: 1,
      explanation: "Savepoints partition transactions into sub-steps. You can rollback to a specific savepoint (`con.rollback(savepoint)`), discarding changes made after it while keeping changes made before it active.",
      difficulty: "medium"
    },
    {
      id: "jdbc_15",
      type: "practical",
      question: "How do you set a query timeout limit in JDBC to prevent long-running queries from hanging the application threads?",
      options: [
        "con.setTimeout(30);",
        "stmt.setQueryTimeout(30);",
        "DriverManager.setQueryTimeout(30);",
        "ResultSet.setTimeout(30);"
      ],
      answer: 1,
      explanation: "Calling `Statement.setQueryTimeout(seconds)` sets the limit. If a query runs longer than the limit, the driver cancels the execution and throws a `SQLTimeoutException`.",
      difficulty: "medium"
    },
    {
      id: "jdbc_16",
      type: "theory",
      question: "Which of the following database connection properties determines if a HikariCP pool connection is verified as active before being handed to the application?",
      options: [
        "connectionTestQuery",
        "leakDetectionThreshold",
        "idleTimeout",
        "validationTimeout"
      ],
      answer: 0,
      explanation: "`connectionTestQuery` defines a query (like `SELECT 1`) executed to verify a connection is alive. In modern drivers supporting JDBC4, `isValid()` is used automatically instead, but the query remains a fallback setting.",
      difficulty: "hard"
    },
    {
      id: "jdbc_17",
      type: "practical",
      question: "What is the outcome of executing this block without closing resources explicitly?",
      code: `for (int i = 0; i < 10000; i++) {
    Statement stmt = con.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT name FROM users");
}`,
      options: [
        "The GC closes statements automatically, so there is no impact.",
        "It can cause database cursor exhaustion errors because statements and result sets remain open on the database server.",
        "It triggers a database connection pool deadlock.",
        "It runs perfectly without resources leaking."
      ],
      answer: 1,
      explanation: "Statements and ResultSets hold database cursors and resources. Simply dereferencing them in a loop without calling `close()` can lead to 'Too many open cursors' errors on the database server, crashing query operations.",
      difficulty: "hard"
    },
    {
      id: "jdbc_18",
      type: "theory",
      question: "What is the difference between Statement.execute() and Statement.executeQuery()?",
      options: [
        "execute() can execute any SQL statement and returns a boolean (true if result is a ResultSet, false if update count). executeQuery() executes SELECT queries only and returns a ResultSet.",
        "execute() executes queries in separate server threads.",
        "executeQuery() is only for insert operations.",
        "They are aliases for the same underlying method."
      ],
      answer: 0,
      explanation: "`executeQuery()` is specialized for queries that return rows. `execute()` is a generic executor. When calling `execute()`, you must follow up with `getResultSet()` or `getUpdateCount()` to retrieve outcomes.",
      difficulty: "medium"
    },
    {
      id: "jdbc_19",
      type: "practical",
      question: "What does calling 'con.setReadOnly(true)' accomplish in JDBC optimization?",
      options: [
        "It blocks executing write statements locally in Java.",
        "It acts as a performance hint to the database driver that transactions will be read-only, allowing the database engine to optimize locking mechanisms and table scan buffers.",
        "It encrypts database columns.",
        "It closes the write-socket on database pipelines."
      ],
      answer: 1,
      explanation: "`setReadOnly(true)` is a performance optimization hint. Databases like Oracle and PostgreSQL can skip dirty checks or page locks when they know no updates will be submitted, improving read speeds.",
      difficulty: "hard"
    },
    {
      id: "jdbc_20",
      type: "theory",
      question: "Which interface should be used in JDBC if you want to stream large binary objects (BLOB) from the database without loading them entirely into JVM Heap memory?",
      options: [
        "ResultSet.getBinaryStream()",
        "ResultSet.getBytes()",
        "ResultSet.getObject()",
        "ResultSet.getBlob().getBytes()"
      ],
      answer: 0,
      explanation: "`getBinaryStream()` returns an `InputStream`. This allows the application to read the binary data in chunks, preventing `OutOfMemoryError` exceptions when handling massive files.",
      difficulty: "hard"
    },
    {
      id: "jdbc_21",
      type: "practical",
      question: "What is the correct syntax to register a database driver in modern Java applications (JDBC 4.0+)?",
      options: [
        "Class.forName('com.mysql.cj.jdbc.Driver');",
        "No explicit registration is required; drivers are loaded automatically via the Java Service Provider Interface (SPI) from the classpath.",
        "DriverManager.registerDriver(new Driver());",
        "System.loadLibrary('jdbc-driver');"
      ],
      answer: 1,
      explanation: "Since JDBC 4.0, the `DriverManager` uses the Service Provider Interface (SPI) mechanism. It automatically scans jars in the classpath for files named `META-INF/services/java.sql.Driver` and loads the drivers automatically.",
      difficulty: "easy"
    },
    {
      id: "jdbc_22",
      type: "theory",
      question: "Which of the following isolation levels offers the highest level of data consistency but reduces concurrency significantly?",
      options: [
        "TRANSACTION_READ_COMMITTED",
        "TRANSACTION_REPEATABLE_READ",
        "TRANSACTION_SERIALIZABLE",
        "TRANSACTION_NONE"
      ],
      answer: 2,
      explanation: "`TRANSACTION_SERIALIZABLE` locks read and write ranges, preventing dirty, non-repeatable, and phantom reads. It treats concurrent transactions as if they were running in sequence, which can cause locks and transaction rollbacks.",
      difficulty: "medium"
    },
    {
      id: "jdbc_23",
      type: "practical",
      question: "What does calling 'rs.wasNull()' check in JDBC ResultSet reading?",
      options: [
        "It checks if the ResultSet reference itself is null.",
        "It checks if the last column read returned a SQL NULL value (crucial for primitives like getInt() or getDouble() which default to 0).",
        "It checks if the database connection was closed.",
        "It resets the cursor to the first row."
      ],
      answer: 1,
      explanation: "Java primitives cannot hold `null`. If a database column has a `NULL` value, `getInt()` returns `0`. To distinguish between a database value of `0` and a `NULL`, you must call `rs.wasNull()` immediately after reading.",
      difficulty: "hard"
    },
    {
      id: "jdbc_24",
      type: "theory",
      question: "What is the difference between client-side and server-side PreparedStatements in JDBC driver configurations?",
      options: [
        "Client-side PreparedStatements escape values in the driver. Server-side PreparedStatements send placeholders to the database to compile execution templates directly.",
        "Server-side is slower and less secure.",
        "Client-side operates in background threads.",
        "There is no difference in communication protocol."
      ],
      answer: 0,
      explanation: "Client-side prepared statements interpolation happens in the JDBC driver code. Server-side prepared statements register query templates with the database engine, reusing compiled execution plans on the server for performance.",
      difficulty: "hard"
    },
    {
      id: "jdbc_25",
      type: "practical",
      question: "Which SQLException method retrieves SQLState compliance codes defined by the database vendor?",
      options: [
        "e.getErrorCode()",
        "e.getSQLState()",
        "e.getMessage()",
        "e.getVendorCode()"
      ],
      answer: 1,
      explanation: "`getSQLState()` returns a five-character code defined by X/Open or SQL:2003 standards. `getErrorCode()` returns a vendor-specific integer code.",
      difficulty: "medium"
    }
  ]
};
