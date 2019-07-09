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
