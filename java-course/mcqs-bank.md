# Java Course — MCQs Bank (Step 3)

Consolidated Multiple-Choice Questions for all 16 modules (80 topics × 5 = 400 MCQs), each with its answer. Extracted from the lesson files.

## Module 1 — Java basics

### What is Programming and Java

### Q1. What does the Java compiler (`javac`) produce?
- a) Machine code
- b) Bytecode (`.class` file)
- c) A `.java` file
- d) An executable `.exe`

**Answer:** b

### Q2. Java's "write once, run anywhere" is possible because of:
- a) The compiler only
- b) The JVM (Java Virtual Machine)
- c) The CPU
- d) The editor

**Answer:** b

### Q3. Which file do you write and edit as a programmer?
- a) `.class`
- b) `.exe`
- c) `.java`
- d) `.bytecode`

**Answer:** c

### Q4. Java is:
- a) Only interpreted
- b) Compiled to bytecode, then run by the JVM
- c) Only compiled to native code
- d) A scripting language only

**Answer:** b

### Q5. `System.out.println(...)`:
- a) Prints without a newline
- b) Prints with a newline at the end
- c) Reads input
- d) Compiles the program

**Answer:** b


### Setting Up Java (JDK, JVM, JRE)

### Q1. To *develop* (write and compile) Java programs you need the:
- a) JRE
- b) JVM
- c) JDK
- d) Browser

**Answer:** c

### Q2. Which command compiles `Hello.java`?
- a) `java Hello.java`
- b) `javac Hello.java`
- c) `run Hello.java`
- d) `compile Hello`

**Answer:** b

### Q3. After `javac Hello.java`, which command runs it?
- a) `java Hello.class`
- b) `run Hello.class`
- c) `java Hello`
- d) `javac Hello`

**Answer:** c

### Q4. The JVM's job is to:
- a) Edit source code
- b) Execute bytecode
- c) Manage the file system
- d) Design classes

**Answer:** b

### Q5. If `java` is "not recognized", the likely cause is:
- a) The program is too long
- b) The JDK's `bin` folder is not on the PATH
- c) The file is `.class`
- d) Java is compiled

**Answer:** b


### Your First Program and Program Structure

### Q1. Execution of a Java program begins at:
- a) The first line of the file
- b) The `main` method
- c) The class name
- d) The last statement

**Answer:** b

### Q2. Which is the correct `main` signature?
- a) `public void main(String[] args)`
- b) `public static void main(String[] args)`
- c) `static void main()`
- d) `public static int main(String args)`

**Answer:** b

### Q3. `String[] args` holds:
- a) The program's source code
- b) Command-line arguments
- c) The class name
- d) All variables

**Answer:** b

### Q4. Every Java statement ends with:
- a) A colon
- b) A period
- c) A semicolon
- d) A comma

**Answer:** c

### Q5. `//` begins a:
- a) Block
- b) Single-line comment
- c) Class
- d) Method

**Answer:** b


### Variables and Data Types

### Q1. How many primitive types does Java have?
- a) 6
- b) 7
- c) 8
- d) 9

**Answer:** c

### Q2. Which literal is a valid `long`?
- a) `10000000000`
- b) `10000000000L`
- c) `10000000000d`
- d) `10000000000f`

**Answer:** b

### Q3. `String` in Java is a:
- a) Primitive type
- b) Reference type (a class)
- c) Keyword for char
- d) Numeric type

**Answer:** b

### Q4. A variable that cannot be reassigned is declared with:
- a) `static`
- b) `const`
- c) `final`
- d) `var`

**Answer:** c

### Q5. `char` values are written with:
- a) Double quotes
- b) Single quotes
- c) Parentheses
- d) Brackets

**Answer:** b


### Input and Output

### Q1. Which class is commonly used to read console input?
- a) `Console`
- b) `Scanner`
- c) `Reader`
- d) `Input`

**Answer:** b

### Q2. `sc.next()` reads:
- a) The whole line
- b) One token (until whitespace)
- c) A single character
- d) An integer only

**Answer:** b

### Q3. `System.out.printf("%.2f", 3.14159)` prints:
- a) `3.14159`
- b) `3.14`
- c) `3`
- d) `%f`

**Answer:** b

### Q4. After `sc.nextInt()`, the next `sc.nextLine()` may return empty because:
- a) Scanner is broken
- b) The newline after the number is still buffered
- c) The program ended
- d) `nextInt` closes input

**Answer:** b

### Q5. Which statement prints a newline at the end?
- a) `System.out.print`
- b) `System.out.println`
- c) `System.in`
- d) `System.err`

**Answer:** b


## Module 2 — Fundamentals

### Variables and Constants (final)

### Q1. Which keyword makes a variable a constant (assign-once)?
- a) `static`
- b) `const`
- c) `final`
- d) `var`

**Answer:** c

### Q2. A shared class-level constant is best written as:
- a) `int MAX = 10;`
- b) `static final int MAX = 10;`
- c) `final int MAX = 10;`
- d) `var MAX = 10;`

**Answer:** b

### Q3. `var name = "Java";` makes `name` a:
- a) Dynamically typed variable
- b) `String` (statically typed, inferred)
- c) `Object`
- d) `char[]`

**Answer:** b

### Q4. `var` can be used for:
- a) Fields and parameters
- b) Local variables with an initializer
- c) Class names
- d) Return types only

**Answer:** b

### Q5. Java 25's compact `main` allows:
- a) No method at all
- b) `void main()` without `public static` (implicit class)
- c) `main()` returning `int` only
- d) Running `.class` without a JVM

**Answer:** b


### Primitive Data Types

### Q1. Which is the correct `long` literal?
- a) `10000000000`
- b) `10000000000L`
- c) `10000000000f`
- d) `10000000000d`

**Answer:** b

### Q2. `float` literals need which suffix?
- a) `d`
- b) `l`
- c) `f`
- d) `s`

**Answer:** c

### Q3. A text block is written with:
- a) Single quotes
- b) Three double quotes (`"""..."""`)
- c) Backticks
- d) Three single quotes

**Answer:** b

### Q4. Which primitive type stores a single Unicode character?
- a) `String`
- b) `char`
- c) `byte`
- d) `short`

**Answer:** b

### Q5. Java 25's JEP 507 (preview) extends pattern matching to:
- a) Classes only
- b) Primitive types in `instanceof` and `switch`
- c) Databases
- d) XML

**Answer:** b


### Operators and Expressions

### Q1. What is `7 / 2` in Java?
- a) 3.5
- b) 3
- c) 4
- d) 3.0

**Answer:** b — integer division truncates.

### Q2. Which operator short-circuits?
- a) `&`
- b) `|`
- c) `&&`
- d) `^`

**Answer:** c

### Q3. `x += 5` is equivalent to:
- a) `x = 5`
- b) `x = x + 5`
- c) `x = x - 5`
- d) `x + 5`

**Answer:** b

### Q4. A modern switch expression uses:
- a) `break` only
- b) `->` and `yield`
- c) `goto`
- d) `case` without labels

**Answer:** b

### Q5. The ternary `a ? b : c` returns:
- a) `b` if `a` is true, else `c`
- b) `c` if `a` is true, else `b`
- c) Always `b`
- d) A boolean

**Answer:** a


### Type Casting and Conversion

### Q1. Which conversion happens automatically (widening)?
- a) `double` → `int`
- b) `int` → `long`
- c) `long` → `int`
- d) `float` → `int`

**Answer:** b

### Q2. `(int) 3.99` evaluates to:
- a) 4
- b) 3
- c) 3.99
- d) A compile error

**Answer:** b — casting truncates.

### Q3. `Integer.parseInt("42")` returns:
- a) `"42"` (String)
- b) `42` (int)
- c) `42.0` (double)
- d) `char`

**Answer:** b

### Q4. `instanceof String s` (pattern matching) does:
- a) Only checks the type
- b) Checks the type and declares/casts `s` automatically
- c) Converts to a string
- d) Nothing

**Answer:** b

### Q5. `(byte) 300` gives:
- a) 300
- b) 0
- c) 44 (overflow)
- d) A compile error

**Answer:** c — 300 doesn't fit a byte, so it wraps.


### Math Class and Wrapper Types

### Q1. `Math.pow(2, 3)` returns:
- a) 6
- b) 8.0
- c) 9
- d) 5

**Answer:** b

### Q2. The wrapper class for `int` is:
- a) `Int`
- b) `Integer`
- c) `Number`
- d) `Int32`

**Answer:** b

### Q3. Autoboxing is:
- a) Manual casting
- b) Automatic primitive ↔ wrapper conversion
- c) Boxing a class
- d) Serialization

**Answer:** b

### Q4. For exact decimal arithmetic (money), use:
- a) `double`
- b) `float`
- c) `BigDecimal`
- d) `int`

**Answer:** c

### Q5. `Integer.parseInt("abc")` throws:
- a) `NullPointerException`
- b) `NumberFormatException`
- c) `ClassCastException`
- d) Nothing (returns 0)

**Answer:** b


## Module 3 — Control flow

### Conditional Statements (if-else, switch)

### Q1. In an if/else-if chain, how many branches run?
- a) All true branches
- b) Only the first true branch
- c) Always the last
- d) None

**Answer:** b

### Q2. In a classic switch, forgetting `break` causes:
- a) A compile error
- b) Fall-through into the next case
- c) The switch to restart
- d) Nothing

**Answer:** b

### Q3. A switch expression (Java 14) uses:
- a) `break` to return
- b) `->` and `yield`
- c) `return` only
- d) `goto`

**Answer:** b

### Q4. `switch` works on which of these?
- a) `double`
- b) `boolean`
- c) `String` (Java 7+)
- d) `long`

**Answer:** c

### Q5. Pattern-matching switch (Java 21) matches on:
- a) Only integers
- b) The runtime type of an object
- c) Method names
- d) Class files

**Answer:** b


### Loops (for, while, do-while)

### Q1. Which loop runs at least once?
- a) `for`
- b) `while`
- c) `do-while`
- d) Enhanced for

**Answer:** c

### Q2. The enhanced for loop is best for:
- a) Index-based access
- b) Reading every element of a collection
- c) Modifying the collection size
- d) Infinite loops

**Answer:** b

### Q3. `for (int i = 0; i < 5; i++)` runs how many times?
- a) 4
- b) 5
- c) 6
- d) Infinite

**Answer:** b

### Q4. A `while` loop with a missing update usually causes:
- a) A compile error
- b) An infinite loop
- c) Zero iterations
- d) A warning

**Answer:** b

### Q5. `var` in an enhanced for (`for (var x : list)`) is available since:
- a) Java 5
- b) Java 8
- c) Java 10
- d) Java 25

**Answer:** c


### Loop Control (break, continue, labels)

### Q1. `break` inside a loop:
- a) Skips one iteration
- b) Exits the loop entirely
- c) Restarts the loop
- d) Does nothing

**Answer:** b

### Q2. `continue` inside a loop:
- a) Exits the loop
- b) Skips to the next iteration
- c) Stops the program
- d) Repeats the current iteration

**Answer:** b

### Q3. A labeled `break outer;`:
- a) Exits the innermost loop only
- b) Exits the loop labeled `outer`
- c) Skips the `outer` loop
- d) Is a syntax error

**Answer:** b

### Q4. `break` is also used to end a case in:
- a) `if`
- b) `for`
- c) a classic `switch`
- d) a method

**Answer:** c

### Q5. Which is typically clearest for "stop when found"?
- a) A `while(true)` with many breaks
- b) A `for`/`while` with a `break` after finding
- c) A recursive call
- d) No loop at all

**Answer:** b


### Nested Loops

### Q1. Two nested loops each running n times execute:
- a) n iterations
- b) 2n iterations
- c) n² iterations
- d) log n iterations

**Answer:** c

### Q2. In `matrix[i][j]`, `i` is typically the:
- a) Column
- b) Row
- c) Element value
- d) Length

**Answer:** b

### Q3. For a ragged 2D array, the inner loop bound should be:
- a) `matrix.length`
- b) `matrix[i].length`
- c) `matrix[j].length`
- d) A constant

**Answer:** b

### Q4. A triangular pattern uses:
- a) A constant inner bound
- b) An inner bound that depends on the outer counter
- c) No inner loop
- d) A `do-while` only

**Answer:** b

### Q5. Nested enhanced for over a matrix looks like:
- a) `for (int[] row : m) for (int v : row)`
- b) `for (int v : m)`
- c) `for (int i : m.length)`
- d) `for (m)`

**Answer:** a


### Pattern Programming

### Q1. In a pyramid of height n, row i has how many stars?
- a) `i`
- b) `2 * i - 1`
- c) `i * 2`
- d) `n - i`

**Answer:** b

### Q2. In a centered pyramid, row i has how many leading spaces?
- a) `i`
- b) `2 * i`
- c) `n - i`
- d) `n`

**Answer:** c

### Q3. A diamond is made of:
- a) Two mirrored pyramids
- b) One square
- c) A single triangle
- d) A diagonal line

**Answer:** a

### Q4. To print a row of a pattern on its own line, you should:
- a) `println` after the inner loops
- b) `println` inside the inner loop
- c) `print` once
- d) Add spaces only

**Answer:** a

### Q5. Printing `j` (vs `i`) in a number triangle produces:
- a) The row number repeated
- b) Increasing column numbers
- c) The same number every row
- d) Random values

**Answer:** b


## Module 4 — Methods

### Introduction to Methods

### Q1. Which is the correct method declaration?
- a) `public void greet()`
- b) `public greet()`
- c) `void public greet()`
- d) `public static greet`

**Answer:** a

### Q2. A method that returns nothing uses which return type?
- a) `null`
- b) `void`
- c) `empty`
- d) `none`

**Answer:** b

### Q3. Method names conventionally use:
- a) camelCase
- b) UPPER_SNAKE_CASE
- c) PascalCase
- d) kebab-case

**Answer:** a

### Q4. A non-void method must:
- a) Print its result
- b) Return a value of its declared type
- c) Take parameters
- d) Be `static`

**Answer:** b

### Q5. The entry point of every Java program is:
- a) `start()`
- b) `run()`
- c) `main()`
- d) `execute()`

**Answer:** c


### Parameters and Return Values

### Q1. Parameters are declared in:
- a) The call site
- b) The method's parentheses
- c) The return statement
- d) `main` only

**Answer:** b

### Q2. Java passes arguments by:
- a) Reference
- b) Value
- c) Pointer
- d) Name

**Answer:** b

### Q3. `void` in a method's return type means:
- a) Returns `null`
- b) Returns nothing
- c) Returns 0
- d) Returns a boolean

**Answer:** b

### Q4. Varargs are declared with:
- a) `int[]`
- b) `int...`
- c) `int*`
- d) `int&`

**Answer:** b

### Q5. `int x = add(2, 3);` stores:
- a) Nothing
- b) The return value (5)
- c) The method
- d) A reference

**Answer:** b


### Method Overloading

### Q1. Overloading means multiple methods with the same name but different:
- a) Return types
- b) Parameter lists
- c) Bodies
- d) Modifiers

**Answer:** b

### Q2. A method's signature includes:
- a) Name + return type
- b) Name + parameter types
- c) Name only
- d) Return type only

**Answer:** b

### Q3. Which pair is valid overloading?
- a) `foo(int)` and `foo(String)`
- b) `foo(int)` and `foo(int)` (different return type)
- c) `foo(int a)` and `foo(int b)`
- d) `foo()` and `void foo()`

**Answer:** a

### Q4. `Math.max(3, 5)` and `Math.max(3.5, 2.1)` are examples of:
- a) Recursion
- b) Overloading
- c) Varargs
- d) Casting

**Answer:** b

### Q5. Given `show(int)` and `show(double)`, calling `show(10)` runs:
- a) `show(double)`
- b) `show(int)` (exact match)
- c) Neither
- d) Both

**Answer:** b


### Scope and Lifetime

### Q1. A variable declared inside an `if` block is visible:
- a) Everywhere in the method
- b) Only within that block
- c) In the whole class
- d) In other methods

**Answer:** b

### Q2. "Cannot find symbol" usually means:
- a) A type mismatch
- b) A variable is used outside its scope (or undeclared)
- c) A runtime error
- d) An infinite loop

**Answer:** b

### Q3. A local variable's lifetime:
- a) Lasts the whole program
- b) Matches its block — it's discarded on exit
- c) Is infinite
- d) Spans all method calls

**Answer:** b

### Q4. Shadowing occurs when:
- a) A method is overridden
- b) An inner variable reuses an outer variable's name
- c) A field is final
- d) A loop runs twice

**Answer:** b

### Q5. The best practice is to declare a variable:
- a) As early as possible
- b) In the smallest scope needed
- c) At the top of the class always
- d) Only as a field

**Answer:** b


### Introduction to Recursion

### Q1. The base case in recursion:
- a) Makes the problem bigger
- b) Stops the recursion
- c) Is optional
- d) Runs last

**Answer:** b

### Q2. Missing a base case causes:
- a) A compile error
- b) `StackOverflowError`
- c) A `NullPointerException`
- d) Nothing

**Answer:** b

### Q3. In `factorial(3)`, the base case is reached at:
- a) `factorial(3)`
- b) `factorial(0)`
- c) `factorial(1)` (or `n <= 1`)
- d) Never

**Answer:** c

### Q4. Naive recursive Fibonacci is inefficient because it:
- a) Uses too little memory
- b) Recomputes the same subproblems
- c) Never terminates
- d) Uses arrays

**Answer:** b

### Q5. A linear recursion (like factorial) is often better written as:
- a) A loop
- b) A class
- c) A lambda
- d) A switch

**Answer:** a


## Module 5 — Arrays and strings

### Arrays (1D)

### Q1. The index of the first element of a Java array is:
- a) 1
- b) 0
- c) -1
- d) `length`

**Answer:** b

### Q2. `int[] a = new int[4];` fills the array with:
- a) `null`
- b) `0`
- c) Random values
- d) `false`

**Answer:** b

### Q3. `a.length` returns:
- a) The last index
- b) The number of elements
- c) The byte size
- d) The first element

**Answer:** b

### Q4. Which correctly copies an array's elements?
- a) `int[] b = a;`
- b) `int[] b = Arrays.copyOf(a, a.length);`
- c) `int[] b = a.clone(0);`
- d) `int[] b = new a;`

**Answer:** b

### Q5. Accessing `a[5]` on a size-5 array causes:
- a) Nothing
- b) `ArrayIndexOutOfBoundsException`
- c) A compile error
- d) A negative index

**Answer:** b


### Multidimensional Arrays

### Q1. `int[][] a = new int[3][4];` has how many elements?
- a) 7
- b) 12
- c) 34
- d) 16

**Answer:** b

### Q2. In `m[r][c]`, the first index is the:
- a) Column
- b) Row
- c) Value
- d) Length

**Answer:** b

### Q3. A ragged array has:
- a) Equal-length rows
- b) Rows of possibly different lengths
- c) Only one row
- d) No rows

**Answer:** b

### Q4. The correct inner-loop bound for a ragged array is:
- a) `m.length`
- b) `m[i].length`
- c) `m[j].length`
- d) A constant

**Answer:** b

### Q5. `Arrays.deepToString(m)` prints:
- a) The reference
- b) A 2D array's contents
- c) Only the first row
- d) The memory address

**Answer:** b


### The String Class

### Q1. Java `String` is:
- a) Mutable
- b) Immutable
- c) A primitive
- d) An array

**Answer:** b

### Q2. To compare two strings by content, use:
- a) `==`
- b) `equals`
- c) `compare`
- d) `=`

**Answer:** b

### Q3. `"Hello".substring(0, 3)` returns:
- a) `"Hel"`
- b) `"Hell"`
- c) `"H"`
- d) `"Hello"`

**Answer:** a — end index is exclusive.

### Q4. `"  hi  ".strip()` returns:
- a) `"  hi  "`
- b) `"hi"`
- c) `" hi "`
- d) `"HI"`

**Answer:** b

### Q5. Text blocks use:
- a) `"""..."""`
- b) `"..."`
- c) `'...'`
- d) `#...#`

**Answer:** a


### StringBuilder and StringBuffer

### Q1. `StringBuilder` is used to:
- a) Store immutable text
- b) Build strings efficiently (mutable buffer)
- c) Parse numbers
- d) Sort strings

**Answer:** b

### Q2. `StringBuilder` vs `String` — which is mutable?
- a) `String`
- b) `StringBuilder`
- c) Both
- d) Neither

**Answer:** b

### Q3. To get a `String` from a `StringBuilder`, call:
- a) `.value()`
- b) `.toString()`
- c) `.string()`
- d) `.get()`

**Answer:** b

### Q4. `StringBuffer` differs from `StringBuilder` by being:
- a) Faster
- b) Thread-safe (synchronized)
- c) Immutable
- d) Newer

**Answer:** b

### Q5. Reversing a string is commonly done with:
- a) `String.reverse()`
- b) `new StringBuilder(s).reverse().toString()`
- c) `s.reversed()`
- d) `Arrays.reverse(s)`

**Answer:** b


### Arrays and Strings in Methods

### Q1. Passing a `String` to a method and reassigning it inside:
- a) Changes the caller's string
- b) Does NOT affect the caller
- c) Deletes the string
- d) Throws an exception

**Answer:** b

### Q2. Mutating array elements inside a method:
- a) Affects the caller's array
- b) Does not affect the caller
- c) Copies the array
- d) Is a compile error

**Answer:** a

### Q3. `int... nums` is:
- a) A 2D array
- b) Varargs — an array parameter in disguise
- c) A list
- d) Invalid syntax

**Answer:** b

### Q4. Returning an empty array is better done with:
- a) `null`
- b) `new int[0]`
- c) `0`
- d) `void`

**Answer:** b

### Q5. To change a string in the caller's view, you should:
- a) Mutate it in place
- b) Return the new string and assign it
- c) Pass it by reference
- d) Use a pointer

**Answer:** b


## Module 6 — Oop fundamentals

### Classes and Objects

### Q1. An object is created with the keyword:
- a) `class`
- b) `new`
- c) `object`
- d) `instance`

**Answer:** b

### Q2. A field in a class holds:
- a) A method
- b) Per-object data
- c) Shared code
- d) Only constants

**Answer:** b

### Q3. `Student s;` (without `new`) makes `s`:
- a) A valid object
- b) `null` (no object yet)
- c) An error
- d) An empty string

**Answer:** b

### Q4. `s1 = s2;` where both are references results in:
- a) A copy of the object
- b) Both pointing to the same object
- c) Two new objects
- d) A compile error

**Answer:** b

### Q5. The blueprint for objects is the:
- a) Object
- b) Class
- c) Method
- d) Variable

**Answer:** b


### Constructors

### Q1. A constructor has:
- a) The class name and a return type
- b) The class name and no return type
- c) A `~` prefix
- d) A `void` return type

**Answer:** b

### Q2. If you define no constructor, Java provides:
- a) Nothing
- b) A no-arg default constructor
- c) A copy constructor
- d) A static constructor

**Answer:** b

### Q3. `this(...)` inside a constructor:
- a) Calls another constructor of the same class
- b) Calls the superclass
- c) Returns the object
- d) Is invalid

**Answer:** a

### Q4. Once you define any constructor, the default no-arg constructor:
- a) Still exists
- b) Disappears
- c) Becomes static
- d) Is auto-added

**Answer:** b

### Q5. Java 25's JEP 513 allows:
- a) Statements before `super()`/`this()`
- b) No constructors at all
- c) Constructors with return types
- d) Removing `new`

**Answer:** a


### Encapsulation and Access Modifiers

### Q1. Encapsulation means:
- a) Making all fields public
- b) Hiding data behind a controlled interface
- c) Removing methods
- d) Using only static fields

**Answer:** b

### Q2. A `private` field is accessible:
- a) Everywhere
- b) Only within its own class
- c) In the same package
- d) In subclasses

**Answer:** b

### Q3. The no-modifier (default) access level is:
- a) Public
- b) Private
- c) Package-private
- d) Protected

**Answer:** c

### Q4. A getter's purpose is to:
- a) Mutate a field
- b) Provide controlled read access
- c) Delete a field
- d) Make a field public

**Answer:** b

### Q5. Validating in a setter protects:
- a) Performance
- b) Object invariants (invalid states)
- c) Compile time
- d) Memory usage

**Answer:** b


### this and static Members

### Q1. `this` refers to:
- a) The class
- b) The current object
- c) The superclass
- d) A static field

**Answer:** b

### Q2. A `static` field is:
- a) Per-object
- b) Shared across all instances (class-level)
- c) Always private
- d) Final

**Answer:** b

### Q3. Static methods:
- a) Can use `this`
- b) Cannot use `this` or instance fields
- c) Require an object
- d) Are always public

**Answer:** b

### Q4. `static final` is used for:
- a) Mutable state
- b) Class-level constants
- c) Instance counters
- d) Local variables

**Answer:** b

### Q5. A static factory method:
- a) Requires `new` from outside
- b) Is a static method that creates/returns objects
- c) Is a constructor
- d) Must be private

**Answer:** b


### Packages and Imports

### Q1. A package groups:
- a) Methods
- b) Related classes into a namespace
- c) Variables
- d) Statements

**Answer:** b

### Q2. The `package` declaration must be:
- a) The last line
- b) The first statement (after comments)
- c) Inside `main`
- d) Optional in all code

**Answer:** b

### Q3. `java.lang` is:
- a) Imported manually
- b) Imported automatically in every program
- c) A user package
- d) Deprecated

**Answer:** b

### Q4. `import java.util.*;` is a:
- a) Static import
- b) Wildcard import
- c) Package declaration
- d) Module import

**Answer:** b

### Q5. Java 25's `import module java.base;`:
- a) Imports all of `java.base` in one declaration
- b) Is a wildcard import
- c) Declares a package
- d) Is invalid

**Answer:** a


## Module 7 — Advanced oop

### Inheritance

### Q1. Inheritance in Java uses the keyword:
- a) `implements`
- b) `extends`
- c) `inherits`
- d) `super`

**Answer:** b

### Q2. Every Java class ultimately extends:
- a) `Object`
- b) `Class`
- c) `Base`
- d) `Root`

**Answer:** a

### Q3. To call a superclass constructor, use:
- a) `this(...)`
- b) `super(...)`
- c) `parent(...)`
- d) `base(...)`

**Answer:** b

### Q4. Java supports:
- a) Multiple class inheritance
- b) Single class inheritance (plus interfaces)
- c) No inheritance
- d) Inheritance only from `Object`

**Answer:** b

### Q5. The `@Override` annotation:
- a) Forces overriding
- b) Lets the compiler verify the method actually overrides
- c) Makes a method static
- d) Is required by the JVM

**Answer:** b


### Polymorphism and Method Overriding

### Q1. Polymorphism means:
- a) One class, many constructors
- b) One reference type working with many object types
- c) Many classes, one object
- d) Static dispatch

**Answer:** b

### Q2. Which method version runs at runtime?
- a) The reference type's
- b) The actual object type's
- c) The parent's
- d) A random one

**Answer:** b

### Q3. Static methods are bound at:
- a) Runtime
- b) Compile time
- c) Load time
- d) Random time

**Answer:** b

### Q4. `a instanceof Dog d` (pattern matching) does:
- a) Only checks the type
- b) Checks and binds `d` to the Dog in one step
- c) Casts without checking
- d) Nothing

**Answer:** b

### Q5. To prevent a method from being overridden, mark it:
- a) `static`
- b) `final`
- c) `private`
- d) `abstract`

**Answer:** b


### Abstract Classes and Interfaces

### Q1. An abstract class:
- a) Can be instantiated
- b) Cannot be instantiated
- c) Must have no methods
- d) Is final

**Answer:** b

### Q2. An abstract method has:
- a) A body
- b) No body (subclasses implement it)
- c) A default implementation
- d) Only a return type

**Answer:** b

### Q3. A class implements an interface with:
- a) `extends`
- b) `implements`
- c) `inherits`
- d) `uses`

**Answer:** b

### Q4. `default` methods in interfaces were added in:
- a) Java 1.0
- b) Java 5
- c) Java 8
- d) Java 25

**Answer:** c

### Q5. A class can implement:
- a) One interface only
- b) Many interfaces
- c) Two interfaces at most
- d) No interfaces

**Answer:** b


### Enums

### Q1. An enum defines:
- a) A variable-length list
- b) A fixed set of named constants
- c) A dynamic array
- d) A number only

**Answer:** b

### Q2. To iterate all constants of an enum, use:
- a) `enum.values()`
- b) `enum.elements()`
- c) `enum.all()`
- d) `enum.list()`

**Answer:** a

### Q3. Enum constants are:
- a) New instances each call
- b) Singletons (one shared instance each)
- c) Strings
- d) Integers

**Answer:** b

### Q4. `Day.valueOf("MONDAY")` throws if:
- a) The day is a weekend
- b) The name doesn't match any constant
- c) The enum is empty
- d) It's called twice

**Answer:** b

### Q5. For enums, `==` is:
- a) Unsafe
- b) Safe and idiomatic
- c) A compile error
- d) Slower than equals

**Answer:** b


### Records and Modern Java

### Q1. Records were finalized in:
- a) Java 8
- b) Java 11
- c) Java 16
- d) Java 25

**Answer:** c

### Q2. A record's accessors are named:
- a) `getX()`
- b) `x()`
- c) `x`
- d) `accessX()`

**Answer:** b

### Q3. Record components are:
- a) Mutable
- b) Final (immutable)
- c) Static
- d) Optional

**Answer:** b

### Q4. A sealed class uses which keyword to list allowed subclasses?
- a) `allows`
- b) `permits`
- c) `extends`
- d) `limits`

**Answer:** b

### Q5. A compact constructor in a record:
- a) Takes no parameter list
- b) Cannot validate
- c) Must be public
- d) Adds a field

**Answer:** a


## Module 8 — Exceptions and file io

### Exceptions and try-catch-finally

### Q1. An exception is:
- a) A syntax error
- b) An object signalling a runtime condition
- c) A compiler warning
- d) A memory leak

**Answer:** b

### Q2. `finally` runs:
- a) Only on success
- b) Only on exception
- c) Whether or not an exception occurred
- d) Only if no catch matches

**Answer:** c

### Q3. Multi-catch uses which syntax?
- a) `catch (A, B e)`
- b) `catch (A | B e)`
- c) `catch (A & B e)`
- d) `catch (A; B e)`

**Answer:** b

### Q4. `e.printStackTrace()` prints:
- a) Only the message
- b) The full stack trace
- c) Nothing
- d) The exception type only

**Answer:** b

### Q5. An uncaught exception:
- a) Is ignored
- b) Propagates up the call stack (and may crash the program)
- c) Is auto-fixed
- d) Becomes a warning

**Answer:** b


### Checked vs Unchecked and Custom Exceptions

### Q1. Checked exceptions must be:
- a) Ignored
- b) Handled (caught) or declared with `throws`
- c) Converted to errors
- d) Marked final

**Answer:** b

### Q2. `NullPointerException` is:
- a) Checked
- b) Unchecked (a RuntimeException)
- c) An Error
- d) A custom exception

**Answer:** b

### Q3. `throw` is used to:
- a) Declare an exception
- b) Raise an exception
- c) Catch an exception
- d) Import an exception

**Answer:** b

### Q4. To make a custom checked exception, extend:
- a) `RuntimeException`
- b) `Error`
- c) `Exception`
- d) `Throwable` (always)

**Answer:** c

### Q5. The parent of all exceptions and errors is:
- a) `Exception`
- b) `Throwable`
- c) `Error`
- d) `RuntimeException`

**Answer:** b


### Introduction to File I/O

### Q1. The classic class for file paths is:
- a) `Path`
- b) `File`
- c) `Files`
- d) `Directory`

**Answer:** b

### Q2. The modern path type is:
- a) `File`
- b) `Path` (java.nio.file)
- c) `Stream`
- d) `Reader`

**Answer:** b

### Q3. `Path.of("a", "b.txt")` creates:
- a) A file on disk
- b) A path object (no file created yet)
- c) A directory
- d) A string only

**Answer:** b

### Q4. To check if a file exists (modern API):
- a) `f.exists()`
- b) `Files.exists(path)`
- c) `path.exists()`
- d) `File.exists(path)`

**Answer:** b

### Q5. `Files.delete` on a missing file:
- a) Does nothing
- b) Throws an exception
- c) Returns false
- d) Creates the file

**Answer:** b


### Reading and Writing Files

### Q1. `Files.readString(path)` (Java 11) reads:
- a) One line
- b) The whole file as a String
- c) One byte
- d) A directory

**Answer:** b

### Q2. `BufferedReader.readLine()` returns `null` when:
- a) The file is empty only
- b) End of file is reached
- c) An error occurs
- d) The line is blank

**Answer:** b

### Q3. To append (not overwrite), use:
- a) `StandardOpenOption.APPEND`
- b) `FileWriter` (always appends)
- c) `FileReader`
- d) `StandardOpenOption.OVERWRITE`

**Answer:** a

### Q4. For very large text files, prefer:
- a) `Files.readString`
- b) `BufferedReader` line-by-line
- c) `Files.readAllBytes`
- d) `String` concatenation

**Answer:** b

### Q5. `StandardCharsets.UTF_8` is used to:
- a) Speed up I/O
- b) Specify the character encoding
- c) Close a file
- d) Delete a file

**Answer:** b


### try-with-resources and NIO.2

### Q1. try-with-resources automatically:
- a) Deletes the resource
- b) Closes the resource (calls close())
- c) Copies the resource
- d) Retries the resource

**Answer:** b

### Q2. Resources in try-with-resources are closed in:
- a) Declaration order
- b) Reverse declaration order
- c) Random order
- d) Alphabetical order

**Answer:** b

### Q3. `Files.walk(path)` returns:
- a) A list of files
- b) A Stream of paths (a directory tree)
- c) A single file
- d) A reader

**Answer:** b

### Q4. `Files.lines` is useful because it:
- a) Loads everything at once
- b) Streams lines lazily (memory-friendly)
- c) Only reads one line
- d) Deletes empty lines

**Answer:** b

### Q5. Java 25's `java.io.IO` class provides:
- a) File tree walking
- b) Simple console I/O helpers (print/readln)
- c) Database access
- d) Networking

**Answer:** b


## Module 9 — Collections

### List — ArrayList and LinkedList

### Q1. A `List` is:
- a) An unordered set
- b) An ordered collection that allows duplicates
- c) A key-value map
- d) A fixed-size array

**Answer:** b

### Q2. `ArrayList` random access (`get`) is:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q3. `List.of("a", "b")` returns a list that is:
- a) Mutable
- b) Immutable
- c) Synchronized
- d) Sorted

**Answer:** b

### Q4. `Collections.binarySearch` requires the list to be:
- a) Empty
- b) Sorted
- c) A LinkedList
- d) Unmodifiable

**Answer:** b

### Q5. `list.remove(0)` removes:
- a) The element "0"
- b) The element at index 0
- c) Nothing
- d) All zeros

**Answer:** b


### Set — HashSet, TreeSet, LinkedHashSet

### Q1. A Set:
- a) Allows duplicates
- b) Rejects duplicate elements
- c) Is index-based
- d) Is sorted always

**Answer:** b

### Q2. The unordered, fastest Set is:
- a) `TreeSet`
- b) `HashSet`
- c) `LinkedHashSet`
- d) `SortedSet`

**Answer:** b

### Q3. `TreeSet` keeps elements:
- a) In insertion order
- b) Sorted
- c) In hash order
- d) In reverse insertion order

**Answer:** b

### Q4. `LinkedHashSet` preserves:
- a) Sorted order
- b) Insertion order
- c) Random order
- d) Reverse order

**Answer:** b

### Q5. To compute the union of two sets, use:
- a) `retainAll`
- b) `addAll`
- c) `removeAll`
- d) `clear`

**Answer:** b


### Map — HashMap, TreeMap, LinkedHashMap

### Q1. A Map stores:
- a) Indexed values only
- b) Key-value pairs
- c) Unique values only
- d) A sorted list

**Answer:** b

### Q2. To retrieve a value by key:
- a) `map.valueAt(key)`
- b) `map.get(key)`
- c) `map.find(key)`
- d) `map[key]`

**Answer:** b

### Q3. `TreeMap` orders entries by:
- a) Insertion order
- b) Key (sorted)
- c) Value
- d) Hash order

**Answer:** b

### Q4. `getOrDefault(key, default)` returns the default when:
- a) The key is absent
- b) The value is zero
- c) The map is a TreeMap
- d) The key is a String

**Answer:** a

### Q5. `merge(key, value, remapping)` is used to:
- a) Delete a key
- b) Combine old and new values
- c) Sort the map
- d) Clear the map

**Answer:** b


### Queue, Deque, and PriorityQueue

### Q1. A Queue is:
- a) LIFO
- b) FIFO (first-in-first-out)
- c) Random access
- d) Sorted

**Answer:** b

### Q2. `poll()` on an empty queue returns:
- a) An exception
- b) `null`
- c) `0`
- d) `false`

**Answer:** b

### Q3. The recommended stack implementation is:
- a) `Stack`
- b) `ArrayDeque`
- c) `PriorityQueue`
- d) `LinkedList` (only)

**Answer:** b

### Q4. A default `PriorityQueue<Integer>` pops:
- a) The largest first
- b) The smallest first
- c) The first inserted
- d) The last inserted

**Answer:** b

### Q5. To make a max-heap, use:
- a) `new PriorityQueue<>()`
- b) `new PriorityQueue<>(Comparator.reverseOrder())`
- c) `new ArrayDeque<>()`
- d) `new TreeSet<>()`

**Answer:** b


### Iterators and Collections Utilities

### Q1. `it.remove()` removes:
- a) The first element
- b) The last element returned by `next()`
- c) The whole collection
- d) A random element

**Answer:** b

### Q2. Removing via `list.remove()` during enhanced-for causes:
- a) Nothing
- b) `ConcurrentModificationException`
- c) `NullPointerException`
- d) Silent skip

**Answer:** b

### Q3. `removeIf` was added in:
- a) Java 5
- b) Java 8
- c) Java 11
- d) Java 25

**Answer:** b

### Q4. `Collections.frequency(list, x)` returns:
- a) The index of x
- b) How many times x appears
- c) The total size
- d) A boolean

**Answer:** b

### Q5. `List.copyOf(list)` produces:
- a) A live view
- b) An immutable snapshot copy
- c) A synchronized view
- d) A sorted list

**Answer:** b


## Module 10 — Generics and lambdas

### Introduction to Generics

### Q1. Generics provide:
- a) Runtime speed only
- b) Compile-time type safety
- c) Reflection
- d) Serialization

**Answer:** b

### Q2. `List<String>` means:
- a) A list that may hold anything
- b) A list that holds only Strings (checked)
- c) A list of characters
- d) A raw list

**Answer:** b

### Q3. The diamond operator `<>` was introduced in:
- a) Java 5
- b) Java 7
- c) Java 8
- d) Java 11

**Answer:** b

### Q4. At runtime, generic type information is:
- a) Kept fully
- b) Erased (type erasure)
- c) Converted to strings
- d) Stored in metadata only

**Answer:** b

### Q5. A raw type is:
- a) A generic type used without a type argument
- b) A primitive
- c) An interface
- d) A lambda

**Answer:** a


### Generic Classes and Methods

### Q1. In `Box<T>`, `T` is called a:
- a) Class
- b) Type parameter
- c) Type argument
- d) Raw type

**Answer:** b

### Q2. `Box<String>` makes `String` the:
- a) Type parameter
- b) Type argument
- c) Raw type
- d) Bound

**Answer:** b

### Q3. A static generic method declares its type parameter:
- a) After the class name
- b) Before the return type (`<T> ...`)
- c) Inside the body
- d) It can't be generic

**Answer:** b

### Q4. `<T extends Comparable<T>>` means:
- a) T is a subclass of Comparable
- b) T must implement/be Comparable
- c) T is Comparable<T> only at runtime
- d) T is erased

**Answer:** b

### Q5. `Pair<K, V>` uses:
- a) One type parameter
- b) Two type parameters
- c) No type parameters
- d) A wildcard

**Answer:** b


### Wildcards and Bounded Types

### Q1. `List<?>` means:
- a) A list of Object
- b) A list of some unknown type
- c) A raw list
- d) An empty list

**Answer:** b

### Q2. `? extends Number` is a:
- a) Lower-bounded wildcard
- b) Upper-bounded wildcard
- c) Unbounded wildcard
- d) Type parameter

**Answer:** b

### Q3. With `List<? extends Number>`, you can:
- a) Add any Number
- b) Read elements as Number
- c) Add null only
- d) Read as Integer only

**Answer:** b

### Q4. `List<? super Integer>` allows you to:
- a) Add Integer values
- b) Read as Integer
- c) Add String values
- d) Add only null

**Answer:** a

### Q5. PECS stands for:
- a) Producer extends, Consumer super
- b) Producer super, Consumer extends
- c) Public extends, Class super
- d) Parent extends, Child super

**Answer:** a


### Lambda Expressions

### Q1. Lambdas were introduced in:
- a) Java 5
- b) Java 7
- c) Java 8
- d) Java 11

**Answer:** c

### Q2. The lambda `x -> x * 2`:
- a) Has no parameters
- b) Has one parameter and returns x*2
- c) Has two parameters
- d) Prints x*2

**Answer:** b

### Q3. A lambda requires a target of type:
- a) Any interface
- b) A functional interface (one abstract method)
- c) Any class
- d) `Object`

**Answer:** b

### Q4. Variables captured by a lambda must be:
- a) Static
- b) Effectively final
- c) Public
- d) Mutable

**Answer:** b

### Q5. `String::length` is a:
- a) Lambda
- b) Method reference
- c) Cast
- d) Constructor

**Answer:** b


### Functional Interfaces

### Q1. A functional interface has:
- a) Two abstract methods
- b) Exactly one abstract method
- c) Only default methods
- d) No methods

**Answer:** b

### Q2. `Predicate<T>`'s method is:
- a) `apply`
- b) `test`
- c) `accept`
- d) `get`

**Answer:** b

### Q3. `Function<T, R>` transforms:
- a) T to boolean
- b) T to R
- c) R to T
- d) nothing to T

**Answer:** b

### Q4. `f.andThen(g)` executes:
- a) g then f
- b) f then g
- c) f and g in parallel
- d) Neither

**Answer:** b

### Q5. `@FunctionalInterface`:
- a) Is required for all interfaces
- b) Lets the compiler enforce the single-abstract-method rule
- c) Makes the interface final
- d) Adds a default method

**Answer:** b


## Module 11 — Streams and modern java

### Introduction to Streams

### Q1. A Stream:
- a) Stores data like a collection
- b) Carries data through a pipeline
- c) Is reusable after consuming
- d) Is eager

**Answer:** b

### Q2. Intermediate operations are:
- a) Eager
- b) Lazy
- c) Terminal
- d) Storage

**Answer:** b

### Q3. A terminal operation:
- a) Returns another stream
- b) Triggers pipeline execution and produces a result
- c) Is always lazy
- d) Creates a source

**Answer:** b

### Q4. Streams were introduced in:
- a) Java 5
- b) Java 7
- c) Java 8
- d) Java 11

**Answer:** c

### Q5. `.stream()` on a collection creates the:
- a) Terminal operation
- b) Source
- c) Sink
- d) Collector

**Answer:** b


### Intermediate Operations

### Q1. `filter` uses which functional interface?
- a) `Function`
- b) `Predicate`
- c) `Consumer`
- d) `Supplier`

**Answer:** b

### Q2. `map` transforms:
- a) One input to one output
- b) One input to many outputs
- c) Inputs to a boolean
- d) Nothing

**Answer:** a

### Q3. To flatten `List<List<T>>` into `Stream<T>`, use:
- a) `map`
- b) `flatMap`
- c) `filter`
- d) `reduce`

**Answer:** b

### Q4. `takeWhile` (Java 9):
- a) Filters out all non-matching
- b) Stops at the first non-matching element
- c) Sorts the stream
- d) Drops duplicates

**Answer:** b

### Q5. `distinct()` removes:
- a) Nulls
- b) Duplicate elements
- c) Empty strings
- d) The first element

**Answer:** b


### Terminal Operations

### Q1. A terminal operation:
- a) Returns a stream
- b) Consumes the stream and produces a result
- c) Is lazy
- d) Filters elements

**Answer:** b

### Q2. `reduce(0, Integer::sum)` computes:
- a) The count
- b) The sum (fold)
- c) The max
- d) The average

**Answer:** b

### Q3. `anyMatch` is:
- a) Lazy only
- b) Short-circuiting (stops early)
- c) A collector
- d) An intermediate op

**Answer:** b

### Q4. `stream.toList()` was added in:
- a) Java 8
- b) Java 11
- c) Java 16
- d) Java 25

**Answer:** c

### Q5. `findFirst()` returns:
- a) The element or null
- b) An `Optional`
- c) A list
- d) A boolean

**Answer:** b


### Collectors

### Q1. `Collectors.joining(", ")` produces:
- a) A list
- b) A single joined string
- c) A map
- d) A set

**Answer:** b

### Q2. `groupingBy` returns:
- a) `List<T>`
- b) `Map<K, List<T>>`
- c) `Set<T>`
- d) A boolean

**Answer:** b

### Q3. `partitioningBy` produces:
- a) `Map<Boolean, List<T>>`
- b) `Map<K, List<T>>`
- c) Two lists
- d) A summary

**Answer:** a

### Q4. `summarizingInt` gives:
- a) Only the sum
- b) Count, sum, min, max, average
- c) Only the average
- d) A joined string

**Answer:** b

### Q5. `Collectors.toList()` vs `Stream.toList()` (Java 16):
- a) Both are mutable
- b) `toList()` (Stream) returns an unmodifiable list
- c) Both are unmodifiable
- d) They're identical

**Answer:** b


### Optional

### Q1. `Optional.of(null)`:
- a) Returns empty
- b) Throws `NullPointerException`
- c) Returns `Optional.empty()`
- d) Returns null

**Answer:** b

### Q2. To provide a default value, use:
- a) `get()`
- b) `orElse(default)`
- c) `isPresent()`
- d) `of()`

**Answer:** b

### Q3. `Optional` was introduced in:
- a) Java 5
- b) Java 8
- c) Java 11
- d) Java 25

**Answer:** b

### Q4. `flatMap` on an `Optional`:
- a) Wraps in another Optional
- b) Expects a lambda returning Optional (avoids nesting)
- c) Filters the value
- d) Returns a list

**Answer:** b

### Q5. `optional.isEmpty()` was added in:
- a) Java 8
- b) Java 9
- c) Java 11
- d) Java 16

**Answer:** c


## Module 12 — Multithreading

### Threads and Runnable

### Q1. A thread is started with:
- a) `run()`
- b) `start()`
- c) `begin()`
- d) `execute()`

**Answer:** b

### Q2. `Runnable` is a:
- a) Class
- b) Functional interface with `run()`
- c) Annotation
- d) Collection

**Answer:** b

### Q3. `t.join()` causes the current thread to:
- a) Stop forever
- b) Wait for `t` to finish
- c) Kill `t`
- d) Sleep

**Answer:** b

### Q4. A daemon thread:
- a) Prevents JVM exit
- b) Doesn't prevent JVM exit when only daemons remain
- c) Is always the main thread
- d) Cannot be interrupted

**Answer:** b

### Q5. `Thread.sleep(1000)` pauses for:
- a) 1000 nanoseconds
- b) 1000 milliseconds (1 second)
- c) 1000 seconds
- d) 1 millisecond

**Answer:** b


### Thread Lifecycle and Synchronization

### Q1. A race condition occurs when:
- a) Threads run sequentially
- b) Shared data is modified by interleaving threads without synchronization
- c) A thread sleeps
- d) A lock is held

**Answer:** b

### Q2. `synchronized` on a method locks the:
- a) Class object
- b) Object's monitor (the instance)
- c) CPU
- d) JVM

**Answer:** b

### Q3. `volatile` guarantees:
- a) Atomicity of `++`
- b) Visibility of the latest write
- c) Mutual exclusion
- d) Thread priority

**Answer:** b

### Q4. `wait()` must be called:
- a) From any context
- b) While holding the object's lock
- c) Only in main
- d) After `start()`

**Answer:** b

### Q5. Around `wait()`, you should use:
- a) `if`
- b) `while`
- c) `for(;;)`
- d) no loop

**Answer:** b


### Executors and Thread Pools

### Q1. A thread pool:
- a) Creates a thread per task forever
- b) Reuses a fixed set of threads to process tasks
- c) Runs only one task
- d) Is a collection

**Answer:** b

### Q2. `submit` with a `Callable` returns:
- a) `void`
- b) A `Future` (for the result)
- c) A `Thread`
- d) A `Runnable`

**Answer:** b

### Q3. `Future.get()`:
- a) Never blocks
- b) Blocks until the result is available
- c) Cancels the task
- d) Returns a thread

**Answer:** b

### Q4. Virtual threads were finalized in:
- a) Java 8
- b) Java 11
- c) Java 17
- d) Java 21

**Answer:** d

### Q5. `pool.shutdown()`:
- a) Kills tasks immediately
- b) Stops accepting new tasks and finishes running ones
- c) Restarts the pool
- d) Creates new threads

**Answer:** b


### Concurrent Collections

### Q1. `ConcurrentHashMap` is:
- a) Not thread-safe
- b) Thread-safe (concurrent reads/writes)
- c) A blocking queue
- d) A legacy class

**Answer:** b

### Q2. `AtomicInteger.incrementAndGet()` is:
- a) Lock-based
- b) An atomic, lock-free increment
- c) Non-atomic
- d) A blocking call

**Answer:** b

### Q3. `BlockingQueue.take()`:
- a) Blocks if the queue is empty
- b) Returns null if empty
- c) Throws if empty
- d) Never blocks

**Answer:** a

### Q4. `CopyOnWriteArrayList` is best for:
- a) Write-heavy workloads
- b) Read-heavy workloads
- c) Single elements only
- d) Primitive types

**Answer:** b

### Q5. `queue.offer(x)` (non-blocking):
- a) Blocks until space
- b) Returns false if full
- c) Throws if full
- d) Deletes an element

**Answer:** b


### CompletableFuture and Async Basics

### Q1. `supplyAsync` runs:
- a) On the calling thread only
- b) Asynchronously (on a pool thread)
- c) Never
- d) Synchronously

**Answer:** b

### Q2. `thenApply`:
- a) Transforms the result into a new value
- b) Consumes the result
- c) Blocks the thread
- d) Cancels the future

**Answer:** a

### Q3. For a dependent async call, use:
- a) `thenApply`
- b) `thenCompose`
- c) `thenRun`
- d) `thenAccept`

**Answer:** b

### Q4. `exceptionally`:
- a) Throws the exception
- b) Recovers with a fallback value
- c) Logs only
- d) Cancels

**Answer:** b

### Q5. Scoped Values (JEP 506) are a Java 25:
- a) Preview feature
- b) Final feature (replacing ThreadLocal-style usage)
- c) Removed feature
- d) Incubator module

**Answer:** b


## Module 13 — Memory performance

### JVM Memory Model (Heap and Stack)

### Q1. Local variables live on the:
- a) Heap
- b) Stack
- c) Metaspace
- d) Disk

**Answer:** b

### Q2. Objects are always allocated on the:
- a) Stack
- b) Heap
- c) Metaspace
- d) CPU cache

**Answer:** b

### Q3. Java passes arguments:
- a) By reference
- b) By value (copies)
- c) By pointer
- d) Never

**Answer:** b

### Q4. Class metadata lives in:
- a) The stack
- b) Metaspace
- c) The heap (only)
- d) Registers

**Answer:** b

### Q5. JEP 519 (Java 25) compact object headers:
- a) Add methods to Object
- b) Reduce per-object memory overhead
- c) Remove the GC
- d) Change the language syntax

**Answer:** b


### Garbage Collection

### Q1. An object is garbage when:
- a) It's large
- b) No live reference reaches it
- c) It's old
- d) It's static

**Answer:** b

### Q2. Most objects die:
- a) Old
- b) Young (collected in Minor GC)
- c) At startup only
- d) Never

**Answer:** b

### Q3. The default collector since Java 9 is:
- a) Serial
- b) Parallel
- c) G1
- d) CMS

**Answer:** c

### Q4. `System.gc()`:
- a) Forces immediate collection
- b) Is a hint the JVM may ignore
- c) Deletes all objects
- d) Frees the stack

**Answer:** b

### Q5. JEP 521 (Java 25) makes Shenandoah:
- a) Deprecated
- b) Generational (young/old split)
- c) Single-threaded
- d) Removed

**Answer:** b


### Object References and Lifecycle

### Q1. The default reference type is:
- a) Soft
- b) Weak
- c) Strong
- d) Phantom

**Answer:** c

### Q2. `SoftReference` objects are reclaimed:
- a) At every GC
- b) Only under memory pressure
- c) Never
- d) Immediately

**Answer:** b

### Q3. `WeakHashMap` keys are:
- a) Strong
- b) Soft
- c) Weak
- d) Phantom

**Answer:** c

### Q4. `finalize()` is:
- a) The recommended cleanup
- b) Deprecated (removed from finalization in JDK 18+)
- c) A constructor
- d) A static method

**Answer:** b

### Q5. `Cleaner` (Java 9) is used for:
- a) Post-GC cleanup actions
- b) Speeding up allocation
- c) Disabling GC
- d) Weak references only

**Answer:** a


### String Pool and Immutability

### Q1. Strings are:
- a) Mutable
- b) Immutable
- c) Primitives
- d) Not final

**Answer:** b

### Q2. `==` on two strings compares:
- a) Content
- b) References
- c) Length
- d) Hash codes

**Answer:** b

### Q3. String literals are stored in the:
- a) Stack
- b) String pool
- c) Metaspace only
- d) CPU cache

**Answer:** b

### Q4. For repeated string building in a loop, use:
- a) `+=`
- b) `StringBuilder`
- c) `concat` in a loop
- d) `intern`

**Answer:** b

### Q5. `intern()` returns:
- a) A new object always
- b) The pooled (canonical) version of the string
- c) The length
- d) A substring

**Answer:** b


### Performance Best Practices

### Q1. The first step in performance work is:
- a) Optimize everything
- b) Measure/profile
- c) Rewrite in C
- d) Add more threads

**Answer:** b

### Q2. `String +=` in a loop is:
- a) O(1)
- b) O(n²) (new string each iteration)
- c) O(log n)
- d) Free

**Answer:** b

### Q3. Autoboxing is:
- a) Free
- b) Converting primitives to wrapper objects (allocates)
- c) Removing objects
- d) A GC setting

**Answer:** b

### Q4. `LinkedList.get(i)` in a loop is:
- a) O(1)
- b) O(n) per call (O(n²) overall)
- c) O(log n)
- d) Constant

**Answer:** b

### Q5. JFR (Java Flight Recorder) is used for:
- a) Profiling/measuring performance
- b) Writing code
- c) Compiling
- d) Garbage collection only

**Answer:** a


## Module 14 — Problem solving

### Problem-Solving Approaches

### Q1. The first step in problem solving is:
- a) Write code
- b) Understand the problem
- c) Optimize
- d) Choose a language

**Answer:** b

### Q2. Constraints in a problem hint at:
- a) Variable names
- b) The required time complexity
- c) Indentation style
- d) Comments

**Answer:** b

### Q3. "Split, solve, merge" describes:
- a) Greedy
- b) Divide and conquer
- c) Two pointers
- d) Brute force

**Answer:** b

### Q4. Dynamic programming:
- a) Tries every combination blindly
- b) Solves sub-problems and stores their results
- c) Always picks the greedy choice
- d) Uses two pointers

**Answer:** b

### Q5. The recommended order is:
- a) Optimize → solve → verify
- b) Solve (brute force) → optimize → verify
- c) Verify → solve
- d) Optimize only

**Answer:** b


### Common Patterns

### Q1. Two pointers is ideal for:
- a) Sorted pair sum
- b) Graph traversal
- c) Hash collisions
- d) Sorting

**Answer:** a

### Q2. A sliding window maintains:
- a) A sorted list
- b) A contiguous subarray (moving window)
- c) A hash map
- d) A tree

**Answer:** b

### Q3. Prefix sums make range-sum queries:
- a) O(n)
- b) O(1)
- c) O(n²)
- d) O(log n)

**Answer:** b

### Q4. Slow/fast pointers detect:
- a) Duplicates in arrays
- b) Cycles in linked lists
- c) Anagrams
- d) Missing numbers

**Answer:** b

### Q5. A frequency map gives:
- a) O(1) element counting/lookup
- b) O(n²) counting
- c) Sorted iteration always
- d) Prefix sums

**Answer:** a


### Complexity Analysis (Big-O)

### Q1. Big-O describes:
- a) Exact runtime
- b) Growth rate as input size grows
- c) Memory only
- d) Compile time

**Answer:** b

### Q2. Two nested loops (each n iterations) are:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(1)

**Answer:** b

### Q3. `HashMap.get` is on average:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q4. A loop that halves n each iteration is:
- a) O(n)
- b) O(log n)
- c) O(n²)
- d) O(1)

**Answer:** b

### Q5. In Big-O, we drop:
- a) The dominant term
- b) Constants and lower-order terms
- c) The variable n
- d) Everything

**Answer:** b


### Debugging and Testing (JUnit)

### Q1. `@Test` marks:
- a) A production method
- b) A test method
- c) A constructor
- d) A field

**Answer:** b

### Q2. `assertEquals(expected, actual)`:
- a) Compares order of args loosely
- b) Checks expected equals actual
- c) Runs the code
- d) Prints a message

**Answer:** b

### Q3. `assertThrows` verifies:
- a) A return value
- b) That an exception is thrown
- c) That no exception occurs
- d) A timeout

**Answer:** b

### Q4. `@BeforeEach` runs:
- a) Once before all tests
- b) Before each test
- c) After each test
- d) Only on failure

**Answer:** b

### Q5. The first step of debugging is:
- a) Fix the code
- b) Reproduce the bug
- c) Write tests
- d) Refactor

**Answer:** b


### Competitive Programming Tips

### Q1. For fast contest input, use:
- a) `Scanner`
- b) `BufferedReader`
- c) `System.in.read()` only
- d) `Console`

**Answer:** b

### Q2. `String +=` in a loop is:
- a) Fast
- b) O(n²) — slow
- c) O(1)
- d) Required

**Answer:** b

### Q3. To avoid O(n²) membership checks, use:
- a) `ArrayList.contains`
- b) `HashSet`
- c) `LinkedList.contains`
- d) `String.indexOf`

**Answer:** b

### Q4. `Math.clamp` was added in:
- a) Java 8
- b) Java 11
- c) Java 17
- d) Java 21

**Answer:** d

### Q5. JEP 507 (Java 25, preview) extends pattern matching to:
- a) Arrays
- b) Primitive types in switch/instanceof
- c) Strings only
- d) Collections

**Answer:** b


## Module 15 — Dsa java 1

### Arrays and Strings in DSA

### Q1. In-place array reversal uses:
- a) Extra array
- b) Two pointers swapping
- c) Sorting
- d) Recursion only

**Answer:** b

### Q2. The three-reverses trick performs:
- a) Sorting
- b) Array rotation in O(n), O(1) space
- c) Reversal only
- d) Binary search

**Answer:** b

### Q3. An O(n) anagram check uses:
- a) Sorting
- b) A frequency array
- c) Nested loops
- d) `contains`

**Answer:** b

### Q4. `Arrays.binarySearch` requires the array to be:
- a) Empty
- b) Sorted
- c) Reversed
- d) A string array

**Answer:** b

### Q5. For rotation by k > n, you should:
- a) Return the array
- b) Use `k %= n` first
- c) Throw an error
- d) Rotate k times

**Answer:** b


### Linked Lists

### Q1. A linked list node contains:
- a) An index
- b) Data and a `next` pointer
- c) A fixed array
- d) Only a pointer

**Answer:** b

### Q2. Random access in a linked list is:
- a) O(1)
- b) O(n)
- c) O(log n)
- d) O(n log n)

**Answer:** b

### Q3. In iterative reversal, you must first:
- a) Print the list
- b) Save `cur.next` before rewiring
- c) Delete the head
- d) Sort the list

**Answer:** b

### Q4. Slow/fast pointers find the middle in:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(1)

**Answer:** a

### Q5. Floyd's algorithm detects:
- a) Duplicates
- b) Cycles
- c) The tail
- d) The minimum

**Answer:** b


### Stacks and Queues

### Q1. A stack is:
- a) FIFO
- b) LIFO
- c) Random access
- d) Sorted

**Answer:** b

### Q2. A queue is:
- a) LIFO
- b) FIFO
- c) Random access
- d) Unsorted only

**Answer:** b

### Q3. `ArrayDeque` stack operations are:
- a) `offer`/`poll`
- b) `push`/`pop`/`peek`
- c) `add`/`remove`
- d) `enqueue`/`dequeue`

**Answer:** b

### Q4. Balanced parentheses use a stack to:
- a) Count characters
- b) Match closing brackets to the most recent open
- c) Sort brackets
- d) Reverse the string

**Answer:** b

### Q5. A monotonic stack finds next-greater elements in:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(n log n)

**Answer:** a


### Recursion and Backtracking

### Q1. Every recursive function needs:
- a) A loop
- b) A base case and a recursive case
- c) A global variable
- d) A stack

**Answer:** b

### Q2. Backtracking means:
- a) Choosing, exploring, and undoing choices
- b) Sorting
- c) Binary search
- d) Memoization

**Answer:** a

### Q3. Naive fibonacci is:
- a) O(n)
- b) O(2ⁿ)
- c) O(log n)
- d) O(1)

**Answer:** b

### Q4. Memoization stores:
- a) The call stack
- b) Results of subproblems to avoid recomputation
- c) The base case only
- d) Comments

**Answer:** b

### Q5. When recording a subset, you should add:
- a) The same list reference
- b) A copy of the current list
- c) Nothing
- d) The array length

**Answer:** b


### Sorting and Searching

### Q1. Merge sort's time complexity is:
- a) O(n²)
- b) O(n log n)
- c) O(log n)
- d) O(n)

**Answer:** b

### Q2. Binary search requires:
- a) An unsorted array
- b) A sorted array
- c) A linked list
- d) A hash map

**Answer:** b

### Q3. Insertion sort's best case is:
- a) O(n²)
- b) O(n) (nearly sorted)
- c) O(log n)
- d) O(n log n)

**Answer:** b

### Q4. Quick sort's worst case is:
- a) O(n log n)
- b) O(n²)
- c) O(n)
- d) O(log n)

**Answer:** b

### Q5. `Arrays.sort` on objects uses:
- a) TimSort (stable)
- b) Only quicksort
- c) Bubble sort
- d) Selection sort

**Answer:** a


## Module 16 — Dsa java 2

### Trees and Binary Search Trees

### Q1. In a BST, for every node:
- a) left > node > right
- b) left < node < right
- c) left = right
- d) children are null

**Answer:** b

### Q2. In-order traversal of a BST yields:
- a) Reverse order
- b) Sorted order
- c) Level order
- d) Random order

**Answer:** b

### Q3. Level-order traversal uses:
- a) A stack
- b) A queue (BFS)
- c) Recursion only
- d) A heap

**Answer:** b

### Q4. BST search/insert is O(log n) when:
- a) The tree is balanced
- b) The tree is skewed
- c) The tree is empty
- d) Always

**Answer:** a

### Q5. Deleting a node with two children replaces it with:
- a) The leftmost node
- b) The in-order successor (min of right subtree)
- c) The root
- d) null

**Answer:** b


### Heaps and Priority Queues

### Q1. A min-heap's root is:
- a) The largest element
- b) The smallest element
- c) The middle element
- d) Null

**Answer:** b

### Q2. `PriorityQueue` operations `offer`/`poll` are:
- a) O(n)
- b) O(log n)
- c) O(1)
- d) O(n²)

**Answer:** b

### Q3. A max-heap uses:
- a) `new PriorityQueue<>()`
- b) `new PriorityQueue<>(Comparator.reverseOrder())`
- c) `new ArrayDeque<>()`
- d) `new TreeSet<>()`

**Answer:** b

### Q4. To keep the k largest elements, use:
- a) A max-heap of size k
- b) A min-heap of size k
- c) A stack
- d) A queue

**Answer:** b

### Q5. The kth largest element (with a bounded min-heap of size k) is:
- a) The heap's root (`peek`)
- b) The heap's last element
- c) The sum
- d) The max of the array

**Answer:** a


### Hashing and HashMap Internals

### Q1. `HashMap` lookup is on average:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q2. Equal objects must have:
- a) Different hash codes
- b) Equal hash codes
- c) The same reference
- d) No hash code

**Answer:** b

### Q3. A HashMap collision means:
- a) Two keys hash to the same bucket
- b) The map is full
- c) A null key
- d) A sorted entry

**Answer:** a

### Q4. A chain longer than 8 becomes:
- a) A list
- b) A red-black tree (treeification)
- c) A set
- d) Deleted

**Answer:** b

### Q5. JEP 510 (Java 25) provides:
- a) A faster HashMap
- b) A Key Derivation Function (HKDF) API
- c) Sorting
- d) GC improvements

**Answer:** b


### Graphs and Traversal

### Q1. An adjacency list stores:
- a) All pairs
- b) Each node's neighbors
- c) Only weights
- d) Only edges

**Answer:** b

### Q2. BFS uses:
- a) A stack
- b) A queue
- c) Recursion only
- d) A heap

**Answer:** b

### Q3. In an unweighted graph, BFS finds:
- a) Longest paths
- b) Shortest paths (by edge count)
- c) Cycles only
- d) Sorted nodes

**Answer:** b

### Q4. DFS is typically implemented with:
- a) A queue
- b) Recursion (or a stack)
- c) A heap
- d) A priority queue

**Answer:** b

### Q5. The visited set prevents:
- a) Sorting
- b) Infinite loops on cycles
- c) Shortest paths
- d) Memory usage

**Answer:** b


### Interview Prep and Course Wrap-Up

### Q1. In UMPIRE, "M" stands for:
- a) Memory
- b) Match (a pattern/data structure)
- c) Method
- d) Merge

**Answer:** b

### Q2. During a coding interview, you should:
- a) Code in silence
- b) Narrate your reasoning
- c) Skip edge cases
- d) Guess complexity

**Answer:** b

### Q3. Which is a final Java 25 feature?
- a) Structured Concurrency
- b) Stable Values
- c) Scoped Values (JEP 506)
- d) Primitive patterns (JEP 507)

**Answer:** c

### Q4. Which is a preview Java 25 feature?
- a) Scoped Values
- b) Module imports
- c) Flexible constructor bodies
- d) Structured Concurrency (JEP 505)

**Answer:** d

### Q5. Records were finalized in:
- a) Java 8
- b) Java 11
- c) Java 16
- d) Java 25

**Answer:** c


