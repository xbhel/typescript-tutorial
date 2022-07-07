## 介绍

[TypeScript](https://www.tslang.cn/) 是一门专门为开发大规模 [JavaScript](https://www.javascript.com/) 应用程序而设计的编程语言，由微软研发。

[TypeScript](https://www.tslang.cn/) 是 JavaScript 的超集，包含了现有 JavaScript 的全部功能，这意味着任何合法的 JavaScript 程序都是合法的 TypeScript，并且加入了**类型系统、ES6** 支持等。TypeScript 语言是跨平台的，TypeScript 可以编译为纯 JavaScript，经过编译后程序可以在任意的浏览器、JavaScript 宿主环境和操作系统上运行。

使用 TypeScript 具有以下优势：

- 代码拥有更高的语义性和可读性。
- 对编辑器更友好的代码提示功能。
- 支持最新的 JavaScript 特性。由于 JavaScript 引擎需要考虑到兼容性问题，一些新特性并不会很快就能被应用，而在 TypeScript 我们可以直接使用，TypeScript 编译器会负责翻译为兼容的代码。
- 能在开发过程中更快的发现潜在问题。相较于 JavaScript 在运行时才做类型检查而言，TypeScript 能够在编译期间进行静态类型分析。

>**NOTE：** 一定要记住一点，TypeScript 并不会改变 JavaScript 的运行时行为（Runtime Behaviors），TypeScript 与 JavaScript 使用相同的运行时（Runtime），因此 JavaScript 中任何关于如何完成特定运行时行为（将字符串转换为数字、alert、将文件写入磁盘等）的资源都将同样适用于 TypeScript 程序。不要将自己局限于 TypeScript 特定的资源！

## 安装

在安装 TypeScript 之前，我们需要先安装 Node.js 环境，[阅读 Node.js 环境安装](https://github.com/xbhel/tutorial/blob/main/docs/vue/install.md)。

完成 Node.js 安装之后，我们通过 npm 全局安装 TypeScript。

```bash
# 全局安装
npm install -g typescript 
# 查看 typescript 版本
tsc --version
# 查看已安装的全局组件
npm -g ls
```

## 使用

完成环境安装之后让我们来编写第一个 TypeScript 程序吧！值得一提的是 TypeScript 也提供了在线练习平台 [TypeScript Playground](https://www.typescriptlang.org/play)，在练习平台编写的 TypeScript 代码我们可以看到实时编译生成的 JavaScript 代码！

**准备**

首先我们新建一个 *typescript-tutorial* 目录，用于存放 TypeScript 代码，并使用 VS Code 打开：

```bash
mkdir typescript-tutorial
```

然后新建一个 *tsconfig.json* 文件，该文件是 TypeScript 编译器默认使用的配置文件，并编写如下内容：

```json
{
    "compilerOptions": {
        // 启用严格类型检查编译
        "strict": true,
        // 指定编译为 ES6 JavaScript 版本
        "target": "ES6"
    }
}
```

最后新建一个 helloworld.ts 文件，`.ts` 是 TypeScript 源文件的拓展名，并编写如下代码：

```typescript
const say: string = "Hello World!";
console.log(say);
```

**编译**

`.ts` 中的代码一般而言是不能直接运行在浏览器的，我们需要将其编译成普通的 JavaScript 代码以后才能运行在浏览器，使用如下命令来进行编译：

```bash
# 会使用当前目录下的 tsconfig.json 编译当前项目
tsc
```

编译完成后将在当前目录下生成一个同名的 *helloworld.js* 文件：

```css
|-- TypeScript
|   |-- helloworld.js
|   |-- helloworld.ts
```

**执行**

使用 Node.js 命令行工具来执行 *helloworld.js*：

```bash
node hello-world.js
> Hello World!
```

**编译执行一步到位**

我们可以发现运行一个 `.ts` 文件需要先编译为 JavaScript 文件然后再执行这个 JavaScript 文件，那有没有工具能够帮助我们一步到位呢？有，这个工具就是 [ts-node](https://typestrong.org/ts-node/)：

```bash
# 全局安装 ts-node
npm install -g ts-node
```

删除 *helloworld.js*，然后通过 `ts-node` 命令来编译和执行 `helloworld.ts`，我们将得到同样的输出：

```bash
ts-node helloworld.ts
# 或使用
ts-node --project tsconfig.json helloworld.ts
> Hello World!
```