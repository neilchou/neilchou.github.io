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
      <h2>现在{new Date().toLocaleTimeString()}</h2>
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

function tick() {
  ReactDOM.render(
    <div>
      <Welcome name="猪怂睿" />
      <App />
    </div>,
    document.querySelector('#root')
  );
}

setInterval(tick, 1000);



// ReactDOM.render(
//   <h1>搞搞震，{name}</h1>,
//   document.querySelector('#root2')
// );