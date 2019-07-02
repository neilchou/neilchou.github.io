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
