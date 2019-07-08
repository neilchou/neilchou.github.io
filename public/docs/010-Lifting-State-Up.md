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
