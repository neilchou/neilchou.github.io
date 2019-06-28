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
