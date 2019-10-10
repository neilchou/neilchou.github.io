import React from 'react';

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

export default App;