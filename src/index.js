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
const name = "猪怂睿";
// const alert = window.alert("防止注入");
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const element = <h1>搞搞震，{formatName(user)}</h1>;

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
};

ReactDOM.render(
  element,
  document.querySelector('#root')
);

ReactDOM.render(
  <h1>搞搞震，{name}</h1>,
  document.querySelector('#root2')
);