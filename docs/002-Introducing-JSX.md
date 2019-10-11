# INtroducing JSX

让我们看看下面的代码

```jsx
const element = <h1>Hello, world!</h1>;
```

在React中上面的标签语法既不是字符串也不是HTML。它被称做JSX，它是JavaScript的语法扩展。它是React中用来描述UI的。JSX可能看起来很像模版引起语言，但是它远远比模版强大，它包含JavaScript的所有你能想象到的功能。

JSX会最终生产出（或者叫做渲染）React的“elements”。在下个章节我们在来讨论怎么将React中通过JSX定义的UI渲染到DOM中。

## 为什么要选择JSX

React认为渲染逻辑本质上与其他UI逻辑是耦合的：事件如何处理，状态如何随时间变化，以及数据如何准备显示。

与人为地将UI标签和逻辑处理通过不同的文件分离开来不同的是，React将关注点与松散耦合的单元分开，称为“组件”，包含两者。

## 在JSX中嵌入表达式

在下面的示例中，我们声明一个名为name的变量，然后在JSX中使用它将其包装在花括号中：

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

您可以在JSX中的大括号内放置任何有效的JavaScript表达式。例如，`2 + 2`，`user.firstName`或`formatName（user）`都是有效的JavaScript表达式。

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## JSX也是一个表达式

编译之后，JSX表达式成为常规JavaScript函数调用并评估为JavaScript对象。

这意味着您可以在`if`语句和`for`循环中使用`JSX`，将其分配给变量，接受它作为参数，并从函数返回它：

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

```

## 在JSX中定义属性标签

您可以使用引号将字符串文字指定为属性：

```jsx
const element = <div tabIndex="0"></div>;
```

您还可以使用花括号在属性中嵌入JavaScript表达式：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

在属性中嵌入JavaScript表达式时，不要在花括号周围加上引号。您应该使用引号（对于字符串值）或花括号（对于表达式），但不能在同一属性中使用。

> 警告：由于JSX更接近JavaScript而不是HTML，因此React DOM使用驼峰属性命名约定而不是HTML属性名称。例如，`class`在JSX中变为`className`，`tabindex`变为`tabIndex`。

## Specifying Children with JSX

如果标记为空，您可以使用`/>`立即关闭它，如XML：

```jsx
const element = <img src={user.avatarUrl} />;
```

JSX标签可能包含子项：

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## JSX防止注入攻击

```jsx
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

默认情况下，React DOM在渲染之前会转义JSX中嵌入的任何值。因此，它确保您永远不会注入未在应用程序中明确写入的任何内容。在渲染之前，所有内容都会转换为字符串。这有助于防止XSS（跨站点脚本）攻击。

## JSX代表对象

Babel将JSX编译为`React.createElement（）`调用。

这两个例子是相同的：

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// 等价于
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement（）执行一些检查以帮助您编写无错误的代码，但实质上它创建了一个这样的对象：

```jsx
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这些对象称为`“React元素”`。您可以将它们视为您希望在屏幕上看到的内容的描述。React读取这些对象并使用它们构建DOM并使其保持最新。
