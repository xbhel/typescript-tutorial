/**
 * @author xbhel
 * @description symbol 类型
 */

//#region 创建 symbol
const symbol: symbol = Symbol();
//#endregion

//#region 每次创建的 symbol 都是唯一的，永不相等
const s1: symbol = Symbol();
const s2: symbol = Symbol();
console.log(s1 === s2);
//#endregion

//#region 创建 symbol 时指定描述信息
const symbolDesc: symbol = Symbol("description");
//#endregion

//#region symbol 作为对象属性名
const foo = { [symbolDesc]: "value" };
//#endregion

//#region 创建全局/共享 symbol
const shareSymbol: symbol = Symbol.for("key");
const globalSymbol: symbol = Symbol.for("key");
console.log(shareSymbol === globalSymbol);
//#endregion
