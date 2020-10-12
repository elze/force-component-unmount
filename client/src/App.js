import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button'
import './App.css';
  
function unmountRedButton(){
	ReactDOM.unmountComponentAtNode(document.getElementById('myButton'));
}


function App() {	  	
  return (
    <div className="App">
      <Button onClick={unmountRedButton } variant="primary">Remove my Alert!</Button>
    </div>
  );
}

export default App;
