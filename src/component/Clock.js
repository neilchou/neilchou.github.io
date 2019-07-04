import React from 'react';

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.thimerID);
  }

  // 时钟
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>现在是{this.state.date.toLocaleTimeString()}.</h1>
      </div>
    );
  }
}

export default Clock;