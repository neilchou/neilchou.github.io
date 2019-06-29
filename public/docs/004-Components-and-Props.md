# Components and Props

通过组件，您可以将UI拆分为独立的，可重复使用的部分，并单独考虑每个部分。此页面介绍了组件的概念。

从概念上讲，组件就像JavaScript函数。它们接受任意输入（称为`“Props”`）并返回描述屏幕上应显示内容的React元素。

## Function和Class组件

定义组件的最简单方法是编写JavaScript函数：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
此函数是一个有效的React组件，因为它接受单个`“props”`（代表属性）对象参数与​​数据并返回一个React元素。我们称这些组件为`“函数组件”`，因为它们实际上是JavaScript函数。

您还可以使用ES6类来定义组件：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

从React的角度来看，上述两个组件是等效的。

类有一些额外的功能，我们将在下一节中讨论。在此之前，我们将使用功能组件来简洁。

## 渲染组件

以前，我们只遇到代表DOM标记的React元素：

```jsx
const element = <div />;
```

但是，元素也可以表示用户定义的组件：

```jsx
const element = <Welcome name="Sara" />;
```

当React看到表示用户定义组件的元素时，它会将JSX属性作为单个对象传递给此组件。我们称这个对象为`“props”`。

例如，此代码在页面上呈现`“Hello，Sara”`：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

让我们回顾一下这个例子中发生的事情：

1. 我们使用`<Welcome name =“Sara”/>`元素调用`ReactDOM.render（）`。
2. React使用{name：'Sara'}作为`props`调用Welcome组件。
3. 我们的Welcome组件返回`<h1> Hello，Sara </ h1>`元素作为结果。
4. React DOM有效地更新DOM以匹配`<h1> Hello，Sara </ h1>`。

> 注意：始终使用大写字母启动组件名称。React将以小写字母开头的组件视为DOM标记。例如，`<div />`表示HTML `div`标记，但`<Welcome />`表示组件，并且要求`Welcome`必须有闭合`/>`标签。
