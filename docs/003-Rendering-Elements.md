# 渲染元素

元素是React应用程序的最小构建块。

元素描述了您希望在屏幕上看到的内容：

```jsx
const element = <h1>Hello, world</h1>;
```

与浏览器DOM元素不同，React元素是普通对象，创建起来很便宜。React DOM负责更新DOM以匹配React元素。

> 注意：人们可能会将元素与更广为人知的“组件”概念混淆。我们将在下一节介绍组件。元素是“由...组成”的组件，我们建议您在开始之前阅读本节。

## 将元素渲染到DOM中

假设你的HTML文件中有一个`<div>`：

```jsx
<div id="root"></div>
```

我们将其称为`“root”`DOM节点，因为其中的所有内容都将由React DOM管理。

仅使用React构建的应用程序通常具有单个`root`DOM节点。如果要将React集成到现有应用程序中，则可以拥有任意多个孤立的根DOM节点。

要将React元素呈现到根DOM节点，请将它们传递给`ReactDOM.render（）`：

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

它在页面上显示“Hello，world”。

