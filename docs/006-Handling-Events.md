# Handling Events

使用React元素处理事件与处理DOM元素上的事件非常相似。有一些句法上的差异：

- React事件使用驼峰命名而不是小写命名。
- 使用JSX，您可以将函数作为事件处理程序而不是字符串传递。

例如，HTML：

```jsx
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

在React中略有不同：

```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

另一个区别是你不能返回`false`来防止React中的默认行为。您必须明确调用`preventDefault`。例如，使用纯HTML，为了防止打开新页面的默认链接行为，您可以编写：

```jsx
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

在React中，这可能是：

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

这里，`e`是合成事件。React根据W3C规范定义了这些合成事件，因此您无需担心跨浏览器兼容性。有关详细信息，请参阅SyntheticEvent参考指南。

使用React时，通常不需要调用`addEventListener`来在创建DOM元素后添加侦听器。相反，只需在最初呈现元素时提供侦听器。

使用ES6类定义组件时，常见模式是将事件处理程序作为类的方法。例如，此Toggle组件呈现一个按钮，允许用户在“ON”和“OFF”状态之间切换：

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

在JSX回调中你必须要小心`this`的含义。在JavaScript中，默认情况下不会绑定类方法。如果您忘记绑定`this.handleClick`并将其传递给`onClick`，则在实际调用该函数时，`this`将是未定义的。

这不是特定于React的行为;它是JavaScript中函数如何工作的一部分。通常，如果您在其后引用没有`（）`的方法，例如`onClick = {this.handleClick}`，则应该绑定该方法。

如果调用`bind`会让你烦恼，有两种方法可以解决这个问题。如果您使用的是实验性公共类字段语法，则可以使用类字段正确绑定回调：

```jsx
// 直接用箭头函数定义事件方法
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

如果您没有使用类字段语法，则可以在回调中使用箭头函数：

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

此语法的问题是每次`LoggingButton`呈现时都会创建不同的回调。在大多数情况下，这很好。但是，如果将此回调作为`prop`传递给较低组件，则这些组件可能会进行额外的重新呈现。我们通常建议在构造函数中使用绑定或使用类字段语法来避免这种性能问题。

## 将参数传递给事件处理程序

在循环内部，通常需要将额外的参数传递给事件处理程序。例如，如果`id`是行ID，则以下任何一个都可以工作：

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

以上两行是等效的，分别使用箭头函数和`Function.prototype.bind`

在这两种情况下，表示React事件的e参数将作为`ID`之后的第二个参数传递。使用箭头函数，我们必须显式传递它，但是使用`bind`，任何其他参数都会自动转发。
