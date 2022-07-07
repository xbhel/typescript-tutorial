# TypeScript for Java/C# Programmers

[翻译自 TypeScript for Java/C# Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html) 

TypeScript 是习惯于使用其他静态类型语言（例如 C# 和 Java）的程序员的流行选择。

TypeScript 类型系统提供了许多与其他静态类型语言相同的好处，如更好的代码补全，更早的错误检出，更强的代码语义。虽然 TypeScript 为 Java/C# 开发者提供了许多熟悉的功能，但了解 JavaScript（TypeScript）与传统 OOP 语言的区别也是非常有必要的。理解这些区别能够帮助我们编写更好的 JavaScript 代码，和避免 C#/Java 开发者转向 TypeScript 时可能遇到的常见陷阱。

## 学习 JavaScript

如果你已经熟悉 JavaScript 但是主要是做 Java 或 C# 开发，本节可以向你解释一些你可能会容易受到影响的误区。TypeScript 的某些类型陷阱，TypeScript 创建模型类型的一些方式和 Java/C# 有很大的区别，学习 TypeScript 时一定要记住这一点。

如果你完全是 JavaScript 新手，我们推荐你先学习一下无（弱）类型的 JavaScript，去理解 JavaScript 的运行时行为，**因为 TypeScript 不会改变代你的代码运行**，所以你需要学习 JavaScript 的工作原理才能编写出真正能做某事的代码！

**记住 TypeScript 使用和 JavaScript 一样的运行时，因此 JavaScript 中任何关于如何完成特定运行时行为（将字符串转换为数字、alert、将文件写入磁盘等）都将同样适用于 TypeScript 程序。不要将自己局限于 TypeScript 特定的行为！**

## 重新思考 Class

C# 和 Java 是我们所说的强制性 OOP 语言，在这些语言中，类（Class）是代码组织的基本单元，也是运行时所有数据和行为的基本容器，强制所有功能和数据保存在类中可能是一个很好的领域模型，但并不是每个领域都需要以这种方式表示。

### 自由的函数和数据

在 JavaScript 中，函数可以存在任何地方，数据可以自由的传递而无需预先定义在 `class` 或 `struct` 中，非常灵活，在没有隐含 OOP 层次结构的情况下处理数据的“自由”函数（与类无关的函数）往往是用 JavaScript 编写程序的首选模型。

### 静态类

此外，TypeScript 中不需要来自 C# 和 Java 的某些构造，例如单例和静态类。

## TypeScript 中的 OOP

 如果你愿意，你仍然可以使用类！有些问题非常适合通过传统的 OOP 层次结构来解决，TypeScript 对 JavaScript 类的支持将使这些模型更加强大。TypeScript 支持许多常见模式，例如实现接口、继承和静态方法。

## 重新思考类型

TypeScript 中类型的理解实际上与 C# 或 Java 完全不同。让我们探讨一些差异。

### 名义具体化类型系统

在 C# 或 Java 中，任何给定的值或对象都有一种确定的类型，要么是 `null`、原始类型或已经定义好的类，我们可以在运行时调用类似于 `value.getType()` 或 `value.getClass()` 的方法去查询它的类型，类型的定义信息将保存在类的某个地方。此外，我们不能使用两个相似结构的类来相互替代，除非它们有明确的继承或实现关系。

这些方面描述了一个具体化的名义类型系统。我们在代码中编写的类型在运行时存在，这些类型通过它们的声明而不是结构来关联。

### 类型是集合

在 C# 或 Java 中，运行时的类型和编译时声明的类型是一一对应的。而在 TypeScript 中，最好将类型视为一组具有共同特点的值。因为类型只是集合，所以一个特定的值可以同时属于许多集合。

一旦我们开始将类型视为集合，某些操作就会变得非常自然。例如在 Java 中，对于同一个参数要传递 `string` 或 `int` 值是很尴尬的，因为没有一种类型可以表示这种值。

在 TypeScript 中，一旦您意识到每种类型都只是一个集合，这就变得非常自然了。我们如何描述属于 `string` 或 `number` 的值？它只是属于这些集合的并集：`string | number`。

TypeScript 提供了许多以集合论方式处理类型的机制，如果您将类型视为集合，您会发现它们更直观。

### 结构(的)类型擦除

在 TypeScript 中，对象没有一个确定的类型，举个例子，如果我们构造一个满足接口的对象，即使两者之间没有声明性关系，我们也可以在需要该接口的地方使用该对象。

```typescript
interface Pointlike {
  x: number;
  y: number;
}
interface Named {
  name: string;
}
 
function logPoint(point: Pointlike) {
  console.log("x = " + point.x + ", y = " + point.y);
}
 
function logName(x: Named) {
  console.log("Hello, " + x.name);
}
 
const obj = {
  x: 0,
  y: 0,
  name: "Origin",
};
 
logPoint(obj);
logName(obj);
```

**TypeScript 类型系统是基于结构的而不是命名系统（声明关系）的：我们能够使用 `obj` 作为 `Pointlike` 类型，因为它包含了 `x` 和 `y` 属性并且都是数值，类型之间的关系取决于它们包含的属性，而不是它们是否被声明为具有某种特定关系。**

**TypeScript 的类型系统也没有具体化：运行时没有任何东西可以告诉我们 obj 是 Pointlike。事实上，Pointlike 类型在运行时不以任何形式存在。**

回到将类型作为集合的想法，我们可以将 obj 视为 Pointlike 集和 Named 集的成员。

### 结构(作为)类型的影响

OOP 开发者通常会特别注意结构类型的以下两个方面。

#### Empty 类型

TypeScript 中空类型会让你感到意外。

```typescript
class Empty {}
 
function fn(arg: Empty) {
  // do something?
}
 
// No error, but this isn't an 'Empty' ?
fn({ k: 10 });
```

TypeScript 通过查看提供的参数是否为有效的 Empty 来确定此处对 fn 的调用是否有效，它通过检查 `{k: 10}` 和 `class Empty { }` 的结构来做到这一点。我们能给看到 `{k: 10}` 包含了 `Empty` 的所有属性，因为 `Empty` 没有属性，因此，这是一个有效的调用！

这点似乎令人吃惊，但它最终与名义化的 OOP 语言中的关系非常相似，如子类不能移除基类的属性，因为这样做会破坏派生类与其基类之间的自然子类型关系。结构类型系统通过根据具有兼容类型的属性来定义子类型并简单地识别这种关系。

#### 相同类型

另一个让你感到意外的是相同类型。

```typescript
class Car {
  drive() {
    // hit the gas
  }
}
class Golfer {
  drive() {
    // hit the ball far
  }
}

// No error?
let w: Car = new Golfer();
```

同样，这里不会有任何错误，因为这些类的结构是相同的，虽然这似乎是一个潜在的混乱来源，在实践中，出现这种不相关的相同类并不常见.

### 反射

OOP 语言中能够获取任何值的类型，即使是泛型的：

```typescript
// C#
static void LogType<T>() {
    Console.WriteLine(typeof(T).Name);
}
```

由于 TypeScript 的类型系统被完全擦除，诸如获取关于类型参数的实例化信息等在运行时不可用。

JavaScript 确实有一些有限的原语，比如 `typeof` 和 `instanceof`，但请记住，这些运算符仍是处理类型擦除后输出的代码的值。例如 ，`typeof (new Car())` 将是 `"object"`，而不是 `Car` 。