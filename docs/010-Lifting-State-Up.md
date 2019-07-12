# Lifting State Up

通常，有几个组件需要反映相同的变化数据。我们建议将共享状态提升到最近的共同祖先。让我们看看这是如何运作的。

我们将从一个名为BoilingVerdict的组件开始。它接受摄氏温度作为prop，并打印它是否足以煮沸水

```jsx
import React from 'react'

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '' };
  }

  handleChange = (e) => {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
```

拆分计算

```jsx
import React from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '' };
  }

  handleChange = (e) => {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default TemperatureInput;
```

```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

我们现在有两个输入，但是当您在其中一个输入温度时，另一个不会更新。这与我们的要求相矛盾：我们希望让它们保持同步。

我们也无法从计算器中显示`BoilingVerdict`。计算器不知道当前温度，因为它隐藏在`TemperatureInput`内。

## 编写转换函数

首先，我们将编写两个函数来从Celsius转换为Fahrenheit并返回：

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

这两个函数转换数字。我们将编写另一个函数，它将字符串温度和转换器函数作为参数并返回一个字符串。我们将使用它来根据其他输入计算一个输入的值。

它在无效温度上返回一个空字符串，并将输出四舍五入到小数点后三位：

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

例如，`tryConvert（'abc'，toCelsius`）返回一个空字符串，`tryConvert（'10 .22'，toFahrenheit）`返回`'50.396'`。

## 提升状态

目前，两个`TemperatureInput`组件都独立地将其值保持在本地状态：

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

但是，我们希望这两个输入彼此同步。当我们更新摄氏度输入时，华氏度输入应反映转换后的温度，反之亦然。

在React中，共享状态是通过将其移动到需要它的组件的最近共同祖先来完成的。这称为“提升状态”。我们将从`TemperatureInput`中删除本地状态，然后将其移动到`Calculator`中。

如果计算器拥有共享状态，它将成为两个输入中当前温度的“真实来源”。它可以指示它们两者具有彼此一致的值。由于两个`TemperatureInput`组件的`props`都来自同一个父计算器组件，因此这两个输入将始终保持同步。

首先，我们将使用`TemperatureInput`组件中的`this.props.temperature`替换`this.state.temperature`。现在，让我们假装`this.props.temperature`已经存在，虽然我们将来需要从计算器传递它：

```jsx
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

我们知道道具是只读的。当温度处于本地状态时，`TemperatureInput`可以调用`this.setState（）`来更改它。但是，现在温度来自父级作为道具，`TemperatureInput`无法控制它。

在React中，通常通过使组件“受控”来解决。就像DOM `<input>`接受值和`onChange` prop一样，自定义`TemperatureInput`也可以接受来自其父`Calculator`的`temperature`和`onTemperatureChange`道具。

现在，当`TemperatureInput`想要更新其温度时，它会调用`this.props.onTemperatureChange`：

> 注意：自定义组件中的温度或`onTemperatureChange` prop名称没有特殊含义。我们可以将它们称为其他任何东西，例如将它们命名为值和`onChange`，这是一种常见的约定。

`onTemperatureChange` prop将与父计算器组件的温度prop一起提供。它将通过修改自己的本地状态来处理更改，从而使用新值重新呈现两个输入。我们将很快研究新的`Calculator`实现。

在深入研究计算器中的更改之前，让我们回顾一下对`TemperatureInput`组件的更改。我们从中删除了本地状态，而不是读取`this.state.temperature`，我们现在读取`this.props.temperature`。我们现在调用`this.props.onTemperatureChange（）`，而不是在我们想要进行更改时调用`this.setState（）`，它将由`Calculator`提供：

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
