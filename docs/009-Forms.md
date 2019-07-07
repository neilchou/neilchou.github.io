# Forms

HTML表单元素与React中的其他DOM元素的工作方式稍有不同，因为表单元素自然会保留一些内部状态。例如，纯HTML中的此表单接受一个名称：

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，此表单具有浏览到新页面的默认HTML表单行为。如果您想在React中使用此行为，它就可以正常工作。但在大多数情况下，使用JavaScript函数来处理表单的提交并访问用户在表单中输入的数据是很方便的。实现这一目标的标准方法是使用一种称为“受控组件”的技术。

## Controlled Components

在HTML中，表单元素（如`<input>`，`<textarea>`和`<select>`）通常会保持自己的状态并根据用户输入进行更新。在React中，可变状态通常保存在组件的`state`属性中，并且仅使用`setState（）`更新。

我们可以通过使React状态成为“单一事实来源”来将两者结合起来。然后，呈现表单的React组件还控制在后续用户输入中该表单中发生的事情。以这种方式由React控制其值的输入表单元素称为“受控组件”。

```jsx
import React from 'react';

export default class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

由于`value`属性是在我们的表单元素上设置的，因此显示的值将始终为`this.state.value`，使React状态成为事实的来源。由于`handleChange`在每次击键时运行以更新React状态，因此显示的值将在用户键入时更新。

```jsx
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## The textarea Tag

在HTML中，`<textarea>`元素通过其子元素定义其文本：

```jsx
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在React中，`<textarea>`使用值属性。这样，使用`<textarea>`的表单可以与使用单行输入的表单非常相似地编写：

```jsx
import React from 'react';

export default class EssayForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

## The select Tag

在HTML中，`<select>`创建一个下拉列表。例如，此HTML创建一个下拉列表：

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

请注意，由于所选属性，最初选择了Coconut选项。React，而不是使用此选定属性，使用根`selected`标记上的值属性。这在受控组件中更方便，因为您只需要在一个位置更新它。例如：

```jsx
import React from 'react'

export default class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

总的来说，这使得`<input type =“text”>`，`<textarea>`和`<select>`都非常相似 - 它们都接受一个可用于实现受控组件的值属性。

> 注意您可以将数组传递给value属性，允许您在select标记中选择多个选项：

```jsx
<select multiple={true} value={['B', 'C']}>
```

## The file input Tag

在HTML中，`<input type =“file”>`允许用户从其设备存储中选择一个或多个文件，以便上传到服务器或通过File API通过JavaScript进行操作。

```html
<input type="file" />
```

因为它的值是只读的，所以它是React中一个不受控制的组件。它将在文档后面与其他不受控制的组件一起讨论。
