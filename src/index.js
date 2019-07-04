import React from 'react';
import ReactDOM from 'react-dom';

// 组件
import Welcome from './component/Welcome';
import App from './component/App';
import ActionLink from './component/ActionLink';
import Clock from './component/Clock';
import Toggle from './component/Toggle';
import LoggingButton from './component/LoggingButton';
import LoggingButton2 from './component/LoggingButton2';
import LoginControl from './component/LoginControl';
import Mailbox from './component/Mailbox';
import Page from './component/Page';
const messages = ['React', 'Re: React', 'Re:Re: React'];

// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(
  <div>
    <Welcome name="猪怂睿" />
    <App />
    <Clock />
    <ActionLink />
    <Toggle />
    <LoggingButton />
    <LoggingButton2 />
    <LoginControl />
    <Mailbox unreadMessages={messages} />
    <Page />
  </div>,
  document.querySelector('#root')
);