# 组件的State和Lifecycle

本页介绍了React组件中的状态和生命周期的概念。

考虑前面部分之一的滴答时钟示例。在渲染元素中，我们只学习了一种更新UI的方法。我们调用`ReactDOM.render（）`来改变渲染输出：

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

在本节中，我们将学习如何使`Clock`组件真正可重用和封装。它将设置自己的计时器并每秒更新一次。

我们可以从封装时钟的外观开始：

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

但是，它错过了一个关键要求：时钟设置定时器并每秒更新UI的事实应该是时钟的实现细节。理想情况下，我们想要写一次并自己更新时钟：

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

为实现这一点，我们需要在Clock组件中添加`“state”`。

`State`类似于`props`，但它是私有的并且完全由组件控制。

## 将函数转换为类

您可以通过五个步骤将函数组件（如`Clock`）转换为类：

1. 创建一个扩展React.Component的同名ES6类。
2. 向它添加一个名为`render（）`的空方法。
3. 将函数体移动到`render（）`方法中。
4. 用`render（）`体中的`this.props`替换`props`。
5. 删除剩余的空函数声明。

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

每次更新发生时都会调用`render`方法，但只要我们将`<Clock />`渲染到同一个DOM节点中，就只会使用一个`Clock`类的实例。这使我们可以使用其他功能，如本地状态和生命周期方法。

## 将组件状态添加到类中

我们将通过三个步骤将日期从props移至state：

> 1.在`render()`方法中将`this.props.date`替换为`this.state.date`。

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

> 2.给类添加一个构造器函数并且初始化`this.state`:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

注意我们如何将props传递给基础构造函数：

```jsx
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

```

类组件应始终使用`props`调用基础构造函数。

> 3.移除在ReactDom.render()中的`date`prop.

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

稍后我们将定时器代码添加回组件本身。

结果如下：

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

接下来，我们将使`Clock`设置自己的定时器并每秒更新一次。

## 将生命周期方法添加到类中

在具有许多组件的应用程序中，释放组件在销毁时所占用的资源非常重要。

我们想在第一次将时钟呈现给DOM时设置一个计时器。这在React中称为`“mounting”`。

我们还希望在删除时钟生成的DOM时清除该计时器。这在React中称为`“unmounting”`。

我们可以在组件类上声明特殊方法，以便在组件安装和卸载时运行一些代码：

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

这些方法称为“生命周期方法”。

`componentDidMount（）`方法在将组件输出呈现给DOM之后运行。这是设置计时器的好地方：

```jsx
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

```

请注意我们如何在此处保存计时器ID。虽然`this.props`是由React本身设置的，而`this.state`具有特殊含义，但如果您需要存储不参与数据流的内容（如计时器ID），您可以手动向该类添加其他字段）。

我们将在`componentWillUnmount（）`生命周期方法中拆除计时器：

```jsx
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

最后，我们将实现一个名为`tick（）`的方法，`Clock`组件将每秒运行一次。

它将使用`this.setState（）`来安排组件本地状态的更新：

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

让我们快速回顾一下发生了什么以及调用这些方法的顺序：

1. 当`<Clock />`传递给`ReactDOM.render（）`时，React调用`Clock`组件的构造函数。由于`Clock`需要显示当前时间，因此它会使用包含当前时间的对象初始化`this.state`。我们稍后会更新这个状态。
2. 然后React调用`Clock`组件的`render（）`方法。这就是React如何了解应该在屏幕上显示的内容。React然后更新DOM以匹配`Clock`的渲染输出。
3. 当`Clock`输出插入DOM时，React调用`componentDidMount（）`生命周期方法。在其中，`Clock`组件要求浏览器设置一个计时器，以便每秒调用一次组件的`tick（）`方法。
4. 浏览器每秒调用`tick（）`方法。在其中，`Clock`组件通过使用包含当前时间的对象调用`setState（）`来调度UI更新。感谢`setState（）`调用，React知道状态已经改变，并再次调用`render（）`方法来了解屏幕上应该是什么。这次，`render（）`方法中的`this.state.date`将不同，因此渲染输出将包含更新的时间。React相应地更新DOM。
5. 如果从DOM中删除了`Clock`组件，则React会调用`componentWillUnmount（）`生命周期方法，以便停止计时器。

## 正确使用State

关于setState（）你应该知道三件事

### 不要直接修改状态

例如，这不会重新渲染组件：

```jsx
// Wrong
this.state.comment = 'Hello';
```

相反，使用`setState（）`：

```jsx
// Correct
this.setState({comment: 'Hello'});
```

您可以分配`this.state`的唯一位置是构造函数。

### 状态更新可能是异步的

React可以将多个`setState（）`调用批处理为单个更新以提高性能。

因为`this.props`和`this.state`可以异步更新，所以不应该依赖它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要修复它，请使用第二种形式的setState（）接受函数而不是对象。该函数将接收先前的状态作为第一个参数，并将更新作为第二个参数应用于props：

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

我们使用上面的箭头函数，但它也适用于常规函数：

```jsx
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### 合并状态更新

当您调用`setState（）`时，React会将您提供的对象合并到当前状态。

例如，您的州可能包含几个独立变量：

```jsx
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

然后，您可以使用单独的`setState（）`调用独立更新它们：

```jsx
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

合并很浅，因此`this.setState（{comments}）`使`this.state.posts`保持不变，但完全取代`this.state.comments`。

## 数据流向

父或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心它是被定义为函数还是类。

这就是状态通常被称为本地或封装的原因。除了拥有和设置它之外的任何组件都不能访问它。

组件可以选择将其状态作为`props`传递给其子组件：

```jsx
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

这也适用于用户定义的组件：

```jsx
<FormattedDate date={this.state.date} />
```

`FormattedDate`组件将在其`props`中接收日期，并且不知道它是来自`Clock`的状态，来自`Cloc`k的`props`，还是手动输入：

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

这通常称为“自上而下”或“单向”数据流。任何状态始终由某个特定组件拥有，并且从该状态派生的任何数据或UI只能影响树中“低于”它们的组件。

如果您将组件树想象为道具的瀑布，每个组件的状态就像一个额外的水源，它在任意点连接它，但也向下流动。

为了表明所有组件都是真正隔离的，我们可以创建一个呈现三个`<Clock>`的App组件：

```jsx
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

每个时钟都设置自己的计时器并独立更新。

在React应用程序中，组件是有状态还是无状态被视为组件的实现细节，可能随时间而变化。您可以在有状态组件中使用无状态组件，反之亦然。
