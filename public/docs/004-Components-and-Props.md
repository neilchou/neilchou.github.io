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

## 组合组件

组件可以引用其输出中的其他组件。这使我们可以对任何细节级别使用相同的组件抽象。按钮，表单，对话框，屏幕：在React应用程序中，所有这些通常表示为组件。

例如，我们可以创建一个多次呈现Welcome的App组件：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

通常，新的React应用程序在最顶层有一个App组件。但是，如果将React集成到现有应用程序中，则可以使用像Button这样的小组件自下而上开始逐步运行到视图层次结构的顶部。

## 分离组件

不要害怕将组件拆分成更小的组件。

例如，考虑这个Comment组件：

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

它接受`author`（对象），`text`（字符串）和`date`（日期）作为`props`，并描述社交媒体网站上的评论。

由于所有嵌套，这个组件可能很难改变，并且很难重用它的各个部分。让我们从中提取一些组件。

首先，我们将提取Avatar：

```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}
```

`“Avatar”`不需要知道它是在`Comment`中呈现的。这就是为什么我们给它的道具一个更通用的名称：`user`而不是`author`。
我们建议从组件自己的角度命名`props`，而不是使用它的上下文。

我们现在可以简化评论：

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

接下来，我们将提取一个`UserInfo`组件，该组件在用户名旁边呈现一个`Avatar`：

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

这让我们可以进一步简化评论：

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

提取组件起初可能看起来像是笨拙的工作，但是在更大的应用程序中使用可重用组件的调色板可以获得回报。一个好的经验法则是，如果您的UI的一部分被多次使用（按钮，面板，头像），或者它自身足够复杂（App，FeedStory，Comment），那么它是一个很好的候选者，可以成为一个可重用的组件。
