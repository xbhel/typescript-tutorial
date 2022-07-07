/**
 * @author xbhel
 * @description 枚举类型
 */

/**
 * 通过枚举定义四季
 */
enum Season {
  Spring,
  Summer,
  Fall,
  Winter,
}
// 枚举字面量类型
const spring: Season.Spring = Season.Spring;

//#region 数值型枚举
{
  enum Direction {
    Up,
    Down,
    Left,
    Right,
  }

  // 当定义枚举类型未指定成员的值时，默认从 0 开始，后续成员为前一个成员的值加 1
  console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right);

  // 使用初始值
  enum DirectionWithInitValue {
    Up = 1,
    Down, //2
    Left = 10,
    Right, // 11
  }

  const direaction: number = Direction.Up;
  const up: Direction = 0; // Direction.up
  const not: Direction = 10; // 不会产生错误
}
//#endregion

//# 字符串枚举
{
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
  const direaction: string = Direction.Up;
}

//#region 异构型枚举
{
  enum Color {
    Withe,
    Black = "BLACK",
    // 异构型枚举必须为跟在
    Blue = 1,
    Yellow,
  }
}
//#endregion
