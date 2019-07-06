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
