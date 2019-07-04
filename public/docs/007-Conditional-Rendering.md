# Conditional Rendering

在React中，您可以创建封装所需行为的不同组件。然后，您只能渲染其中一些，具体取决于您的应用程序的状态。

React中的条件呈现与JavaScript中的条件工作方式相同。使用像if或条件运算符这样的JavaScript运算符来创建表示当前状态的元素，并让React更新UI以匹配它们。

考虑这两个组成部分：

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

我们将创建一个Greeting组件，根据用户是否登录显示这些组件中的任何一个：

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

## 元素变量

您可以使用变量来存储元素。这可以帮助您有条件地渲染组件的一部分，而其余的输出不会更改。

考虑这两个代表Logout和Login按钮的新组件：

```jsx
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

在下面的示例中，我们将创建一个名为`LoginControl`的有状态组件。

它将呈现`<LoginButton />`或`<LogoutButton />`，具体取决于其当前状态。它还将呈现前一个示例中的`<Greeting />`：

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    // this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

虽然声明变量并使用if语句是有条件地渲染组件的好方法，但有时您可能希望使用更短的语法。有几种方法可以在JSX中内联条件，如下所述。

## Inline If with Logical && Operator

您可以通过将它们包装在花括号中来在JSX中嵌入任何表达式。这包括JavaScript逻辑&&运算符。它有条件地包括一个元素可以很方便：

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

它的工作原理是因为在JavaScript中，`true && expression`总是求值为表达式，而`false && expression`总是求值为`false`。

因此，如果条件为真，则&&之后的元素将出现在输出中。如果是假，React将忽略并跳过它。

## 内联If-Else与条件运算符

有条件地渲染元素内联的另一种方法是使用JavaScript `condition ? true : false.`
