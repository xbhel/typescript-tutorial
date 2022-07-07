# 变量声明

JavaScript 中支持三种变量声明的方式：`var`、`let`、`const`，其中 `let` 和 `const` 是在 ES6 中引入的，它们的出现弥补了 `var` 的一些不足。TypeScript 是 JavaScript 的超集，自然也支持这些声明方式。

 **var 声明**

```typescript
var foo = "foo";
foo = "bar";
```

使用 `var` 声明变量会存在一些很奇怪的现象，如允许声明重复变量、变量作用域提升导致的作用域规则混乱：

```javascript
// 允许变量重复声明
var foo = "old";
var foo = "new";

// x 是声明在 if 里面，而我们却可以在语句外面访问到它
function func(state: boolean) {
  if (state) {
    var x = 10;
  }
  return x;
}

func() // 10
```

**let 声明**

`let` 的出现解决了 `var` 存在的一些问题，`let` 不允许重复声明变量，并拥有块级作用域：

```typescript
let foo = "old";
foo = "bar";
// 错误，不允许重复声明变量
let foo = "new";

function func(state: boolean){
    // let 声明的变量只能在其作用域内访问
    if(state){
        let x = 10;
    }
    // 错误，没有 x 变量
    return x;
}
```

**const 声明**

`const` 声明和 `let` 类似，但其用于声明常量，初始化后不允许再赋值：

```typescript
const foo = "foo";
// 错误，初始化后不允许再赋值
foo = "bar"
```

# 数据类型

在 JavaScript 中将数据类型分为原始类型和非原始类型，原始类型包括：`boolean`、`string`、`number`、`bigint`、`undefined`、`null`、`symbol`，除此之外，其他类型都属于非原始类型(对象类型)。TypeScript 对原始类型进行了细化和拓展，增加了 `void`、枚举、字面量类型等。

在 TypeScript 中，使用**类型注解**来标识数据类型，语法格式为`:type`，类型注解总是被放在被修饰的实体之后：

```typescript
// boolean
let isDone: boolean = false;
// string
let str: string = "this is string";
```

除此之外，TypeScript 还支持将字面量作为类型，我们称之为字面量类型，每个字面量类型都只有一个可能的值，即字面量本身。

```typescript
// boolean 字面量类型，值只能为 false
let isFalse: false = false;
// 字符串字面量类型，值只能为 literal
let literalStr: "literal" = "literal";

// 应用：通过字面量类型和联合类型，我们可以将函数的返回限制为确定的范围
function func(x: string): 0|1
```

## 原始类型

### boolean

```typescript
let isDone: boolean = false;
// 字面量类型
let isFalse: false = false;
let isTure: true = true;
```

### string

```typescript
let str: string = "this is string";
let templateStr: string = `template: ${str}`;
let multiStr: string = `I'm the first line!
  I'm the second line!
  I'm the last line!`;
// 字面量类型
let literalStr: "literal" = "literal";
// 模板字符串也支持字面量类型，但是不支持变量
let templdateLiteralStr: `hello` = `hello`;
```

### number

和 JavaScript 一样，TypeScript 中的数字使用双精度64位浮点数格式（符号位1 + 指数位11 + 值位52）表示。除了十进制和十六进制外，TypeScript 还支持 ES6 引入的二进制和八进制：

```typescript
// 二进制
let binary: number = 0b1010;
// 八进制
let octal: number = 0o744;
// 十进制
let int: number = 10;
let float: number = 3.14;
// 十六进制
let hex: number = 0xffff;
// 字面量类型
let ten: 10 = 10;
```

### bigint

`bigint` 是 ECMAScript 2019 引入的新特性，`number` 类型能表示的最大整数为 `2^53 -1`，而`bigint` 类型能够表示任意精度的整数，`bigint` 字面量表示方式是在数字后面加 `n`：

```typescript
// 二进制
let binary: bigint = 0b1010n;
// 八进制
let octal: bigint = 0o744;
// 十六进制
let decimal: bigint = 6n;
// 十进制
let hexb: bigint = 0xffn;
// 字面量类型
let large: 100n = 100n;

// 错误：bigint 不能和 number 进行运算
let add = 10 + 10n;
// bigint 类型可以转为 number 类型，但有可能丢失精度
let bigint2int: number = Number(10n)
// 使用 BigInt() 函数也能创建 BigInt 类型，BigInt() 函数会尝试将传入的参数转为 BigInt
let bigint: bigint = BigInt(10);
```

>JavaScript 同样涉及类型拆箱装箱，使用 `BigInt()`、`Number()`、`String()` 等函数方式创建出来的类型为对象类型，当其赋值给原生类型时就涉及拆箱，这是一个不好的操作，相比之下，使用原生(字面量)方式通常能够获得更好的性能。
>
>`const int = 10`:heavy_check_mark:
>
>`const int = Number(10)` :x:

### null & undefined

在 JavaScript 中 `null` 和 `undefined` 通常用来表示某个值还未进行初始化。在 TypeScript 中它们也有与之对应的类型分别叫 `null` 和 `undefined`，通过明确的指定某个值的类型是否为 `null` 或 `undefined` 类型，TypeScript 编译器能够对代码进行空引用的检查：

```typescript
let nu: null = null;
let un: undefined = undefined;

// 错误：nu 为 null 不能调用 toString()
nu.toString();
// 错误：un 为 undefined 不能调用 toString()
un.toString(); 
```

默认情况下，`null` 和 `undefined` 可以赋值给除尾端类型 `never` 外的所有类型（是它们的子类型），但此时，编译器将无法进行空引用的检查：

```typescript
let v1: number = null;
let v2: boolean = undefined;
// ...
let v6: null = undefined;
let v7: undefined = null;

// 编译通过，但运行期间将发生以下错误
// Cannot read properties of undefined (reading 'toString')
v1.toString()
```

当我们启用 `--strictNullChecks` 编译选项时，`null` 和 `undefined` 只能赋值给顶端类型、`void` 和它们自己，严格模式 `strict` 自动开启该编译选项，鼓励尽可能地使用严格模式：

```typescript
// 顶端类型 any, unknown
let v3: any = null;
let v4: any = undefined;
let v5: unknown = null;
let v6: unknown = undefined;

let v1: void = null;
let v2: void = undefined;

let v3: undefined = undefined;
let v4: null = null;
```

### **symbol**

`symbol` 是 ES6 引入的新特性，用于表示一个唯一且不可变的标识符，类似于 UUID。`symbol` 通过 `Symbol()` 函数创建，每次创建的 `symbol` 都是唯一的，一个 `symbol` 能作为对象的属性名，这是该数据类型仅有的目的。

```typescript
const symbol1: symbol = Symbol();
// output: Symbol()
console.log(symbol1);

// Symbol() 每次创建的 symbol 都是唯一的，symbol1 和 symbol2 永远不相等
const symbol2: symbol = Symbol();
// symbol1 === symbol2 => false

// 创建 Symbol 时可以提供一个可选的描述，可用于调试但不是访问 symbol 本身
const symbolWithDesc: symbol = Symbol("description");
// output: Symbol(description)
console.log(symbolWithDesc)

// 作为对象的属性名
const obj = { [symbol1]: "" };
```

`Symbol()` 每次创建的 `symbol` 都是唯一的，我们可以使用 `Symbol.for(key)` 创建一个全局共享的 `symbol`：[Go 深入学习 Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

```typescript
// Symbol.for(key) 会根据给定的 key，来从运行时的 symbol 注册表中查找对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中
const globalSymbol: symbol = Symbol.for("global");
// ouput: true
console.log(globalSymbol === Symbol.for("global"));
```

为了将一个 `symbol` 视为唯一固定的值，TypeScript 还拓展了 `unique symbol` 类型，主要用于作为接口、类等类型的属性名，它是 `symbol` 的子类型，它将 `symbol` 和声明它的标识符绑定在一起。同样通过调用 `Symbol()` 或 `Symbol.for()` 创建，为了确保声明标识和引用之间的唯一性，只允许使用 `const` 和或`readonly` 属性声明来定义 `unique symbol` 类型：

```typescript
const x: unique symbol = Symbol();
const y: symbol = Symbol();

// unique symbol 可以作为接口的类型成员，而 symbol 类型不行
// 因为 symbol 类型不止包含一个可能值
interface Foo {
  [x]: string; //正确
  [y]: string; //错误
}

// 每个 unique symbol 都是一种独立的类型，不允许不同的 unique symbol 相互赋值
const a: unique symbol = Symbol();
const b: unique symbol = Symbol();
// 必须通过 typeof 才能将 unique symbol 赋值给兼容变量
let f: typeof a = a;
let g: typeof b = b;
// 错误，很明显 a、b 是不同类型，
f = g;

// 在比较两个 unique symbol 时，也将永远返回 false，即使它们引用的是同一个 symbol（通过 Symbol.for() 创建）
// a === b => false
```

### void

`void` 类型表示没有任何类型，当一个函数没有返回值时，我们使用 `void` 类型表示，除此之外，在其他任何地方使用 `void` 都毫无意义：

```typescript
function log(message: string): void {
    console.log(message);
}
// 声明一个 void 的变量毫无意义，因为你只能为它赋予 undefined 和 null
let unusable: void = undefined; 
```

### enum

枚举类型是 TypeScript 对 JavaScript 标准类型的一个补充，枚举类型允许我们给一组值赋予更具语义性名称：

```typescript
// 使用枚举定义四季
enum Season {
    Spring,
    Summer,
    Fall,
    Winter,
}

// 枚举字面量类型
const spring: Season.Spring = Season.Spring;
```

按照枚举成员的类型可以将枚举类型划分为三类：数值型枚举、字符串枚举、异构型枚举；其中数值型枚举最常用，它是 `number` 的子类型，由一组命名的数值常量组成：

```typescript
// 每个数值型枚举成员都表示具体的数值
// 当定义枚举类型未指定成员的值时，默认从 0 开始，后一个成员为前一个成员的值加 1
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);
// output: 0 1 2 3

// 我们也可以在定义枚举时指定初始值
enum Direction {
    Up = 1,
    Down, //2
    Left = 10,
    Right, // 11
}

// 数值型枚举是 number 子类，所有可以赋值给 number 类型
const direaction: number = Direction.Up;
// 注意：number 类型也可以赋值给枚举类型，即使 number 类型不在枚举成员值列表也不会产生错误
const up: Direction = 0 // Direction.up
const not: Direction = 10; // 不会产生错误
```

字符串枚举由一组命名的字符串值组成，它是 `string` 的子类型，字符串枚举成员没有自增行为，在声明时必须进行初始化：

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "Right",

    U = Up,
    D = Down,
    L = Left,
    R = Right,
 }
// 字符串枚举类型可以赋值给 string 类型，但是不允许将 string 类型赋值给字符串枚举类型
const direaction: string = Direction.Up;
```

异构型枚举指的是枚举类型中同时定义了数值型枚举成员和字符串枚举成员，虽然语法上允许定义异构型枚举，但是不推荐使用：

```typescript
enum Color {
    Withe,
    Black = "BLACK",
    // 紧跟字符串枚举成员的枚举成员必须进行显示初始化
    Blue = 1,
}
```

## 顶端类型

顶端类型也称为通用超类型，在类型系统中所有类型都是顶端类型的子类型，TypeScript 中有两种顶端类型：`any`、`unknown`。

### any

所有类型都是 `any` 的子类型，`any` 能够接受任何数据类型：

```typescript
// 能够接受任何数据类型
let notSure: any = 4;
notSure = "I am any";
notSure = false;
```

虽然 `any` 是所有类型的父类型， 但是 TypeScript 也允许将 `any` 类型赋值给其他类型，并且允许在 `any` 上执行任意操作，即使它们的实际类型与之不匹配或无法响应相应操作，编译期间也不会报错， 直至运行期间才会暴露出来：

```typescript
let notSure: any = 4;

// 编译通过
let b: boolean = notSure;
let s: string = notSure;
let n: number = notSure;
let u: undefined = notSure;
//...

// number 类型无法响应 push 操作，
notSure.push()
```

另外如果我们在定义变量时，没有指定其类型也没有初始化，编译器无法自动推断出它的类型时，那么该变量将隐式的获得 `any` 类型，这可能会导致一些意外的异常情况。我们可以通过启用 `--noImplicitAny` 编译项，此时当发生隐式转换时将产生编译错误：

```typescript
// 没有指定类型也没有初始化，变量将隐式的获得 any 类型
let implicitlyAny;
implicitlyAny = "I am any";
implicitlyAny = false;
```

`any` 和 `Object` 类型的变量都允许你给它赋任意值，但是 `Object` 却不能够在它上面调用任意的方法，即便它真的有这些方法，而 `any` 可以：

```typescript
let notSure: any = 4;
// any 类型不会进行编译检查
notSure.ifItExists(); 
notSure.toFixed(); 

let prettySure: Object = 4;
// 编译错误，Object 类型没有 toFixed() 方法
prettySure.toFixed();
```

在程序中，如果我们使用了 `any` 类型来声明变量，意味着编译器将不会对这个值进行类型检查。当我们准备将已有的 JavaScript 程序迁移至 TypeScript 时，在前期使用 `any` 来暂时绕过类型检查是非常有用的，除此之外，我们应该尽量少的使用 `any`。

### unknown

`unknown` 与 `any` 的行为基本一致，但 `unknown` 更安全，TypeScript 对它做了更严格的限制：`unknown` 只能赋值给 `any` 和它自己，不允许赋值给其他任何类型，并且也不能在 `unknown` 上任意执行操作。

```typescript
// unknown 可以接受任何类型
let x: unknown = 1;
x = 'hi'
//...

// 正确；只能赋值给 any 和它自己
const a: any = x;
const k: unknown = x;

// 编译错误；不允许赋值给其他任何类型
const b: boolean = x;
const n: number = x;

// 也不能在 unknown 上任意执行操作
x + 1
x.push()
```

在程序中使用 `unknown` 类型时，我们必须将其细化为某种具体类型，否则将产生编译错误：

```typescript
// any
function foo(message: any){
    // 无编译错误
    return message.length;
}

// unknown
function bar(message: unknown){
    // 编译错误
    return message.length;
}

// 必须将其细化为某种具体类型
function bar()(message: unknown){
    // 使用 typeof 检查类型后才能使用
    if(typeof message === 'string'){
        return message.length;
    }
}
```

## 尾端类型

在类型系统中尾端类型是所有类型的子类，在 TypeScript 中仅有一种尾端类型：`never`。`never`类型表示的是那些永不存在的值的类型，例如，`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数的返回值类型：

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

`never` 类型允许赋值给任何类型，但由于它处于类型结构的最低端，除了它自己外，没有其他任何类型可以赋值给它：

```typescript
// 编译错误
let y: never = true;
let z: never = 123;
```

`never` 主要应用场景有两个：一是上面说的作为函数返回值类型，表示该函数无法返回一个值；二是用于条件类型运算，例如，`Exclude<T, U>` 类型就是借助 `never` 类型实现了从类型 T 中过滤类型 U 的功能：

```typescript
type Exclude<T, U> = T extends U ? never : T

// 排除 string 类型
type T = Exclude<boolean | string, string>;
// boolean
```

## 类型推断

在之前的案例中，我们都是显示的使用类型注解去指定变量数据类型，而在有些时候，我们在声明变量时会为其指定初始值，那么此时 TypeScript 编译器能够根据值的类型自动推断出这个变量的类型：

```typescript
// 编译器会自动推断 num 为 number 类型
let num = 123;
// 编译错误，string 类型不能赋值给 number 类型
num = "123";
```

因此，如果在声明变量时明确的指定了初始值，那么我们可以省略掉类型注解，但如果是在函数参数中，则我们必须为其指定一个类型，否则它会隐式的获得 `any` 类型：

```typescript
function add (num1: number, num2: number): number {
  return num1 + num2
}
```

## 联合类型

在 TypeScript 中，使用集合论来描述类型，每种类型都只是一个集合，最好将类型视为一组具有共同特点的值。

在 TypeScript 中，我们可以很轻松的描述属于 `string` 或 `number` 的值，它只是属于这些类型的并集，而这个概念在 TypeScript 有一个专有名词——联合类型。联合类型表示一个值是多种类型中的一种，使用或（`|`）来分隔每个类型：

```typescript
let value: string | number;
// value 可以是 string
value = "str";
// value 也可以是 number
value = 1;
```

