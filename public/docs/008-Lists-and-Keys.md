# Lists and Keys

首先，让我们回顾一下如何在JavaScript中转换列表。

给定下面的代码，我们使用`map（）`函数获取数字数组并将其值加倍。我们将`map（）`返回的新数组赋值给`doubled`变量并记录下来：

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

此代码将`[2,4,6,8,10]`记录到控制台。

在React中，将数组转换为元素列表几乎完全相同。

## 渲染多个组件

您可以使用花括号`{}`构建元素集合并将它们包含在JSX中。

下面，我们使用JavaScript `map（）`函数遍历数字数组。我们为每个项目返回一个`<li>`元素。最后，我们将结果元素数组分配给`listItems`：

```jsx
import React from 'react';

// const numbers = [1, 2, 3, 4, 5];
// const items = numbers.map((number) => <li>{number}</li>);

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.numbers = [1, 2, 3, 4, 5];
    this.items = this.numbers.map((number) => <li>{number}</li>);
  }
  render() {
    return (
      <ul>
        {this.items}
      </ul>
    )
  }
}


export default ListItems;
```

我们将整个`listItems`数组包含在`<ul>`元素中，并将其呈现给DOM：

```jsx
ReactDOM.render(
  <ListItems />,
  document.getElementById('root')
);
```
