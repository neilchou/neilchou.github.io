import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// const name = "猪怂睿";
// const alert = window.alert("防止注入");
// const user = {
//   firstName: '猪',
//   lastName: '怂睿'
// };
// const element = <h1>搞搞震，{formatName(user)}</h1>;

// function formatName(user) {
//   return user.firstName + '' + user.lastName;
// };
function Welcome(props) {
  // console.log(props);
  return (
    <div>
      <h1>{props.name}搞搞震</h1>
    </div>
  );
}

function Hello(props) {
  return <h1>Hello,{props.name}</h1>;
}

function App() {
  return (
    <div>
      <Hello name="猪老三" />
      <Hello name="光屁股猪怂睿" />
    </div>
  );
}

// 时钟组件
// function Clock(props) {
//   return (
//     <div>
//       <h1>现在是{props.date.toLocaleTimeString()}</h1>
//     </div>
//   );
// }

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="https://www.google.com.tw/" onClick={handleClick}>
      Click me
    </a>
  );
};

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
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

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

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
  <div>
    <Welcome name="猪怂睿" />
    <App />
    <Clock />
    <ActionLink />
    <Toggle />
  </div>,
  document.querySelector('#root')
);




// ReactDOM.render(
//   <h1>搞搞震，{name}</h1>,
//   document.querySelector('#root2')
// );