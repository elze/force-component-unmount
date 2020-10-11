import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import logo from './logo.svg';
import './App.css';

export class MountableAlert extends Component {
	constructor(props) {
		super(props);
		this.state = {forecast: {}};
	} 	

	getForecasts = async () => {
		const response = await fetch('/api/forecasts');
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};	
	
	getNewForecast(i) {
		this.getForecasts()
			.then(res => {
				console.log(`getNewForecast: i = ${i}`);
				this.setState({ forecast: res[i] })
			})
			.catch(err => console.log(err));
	}
			
	componentDidMount() {
		console.log(`componentDidMount`);
		this.interval = setInterval(() => this.getNewForecast(Math.floor(Math.random() * 10)), 5000);
	}  
	
    componentWillUnmount() {
    	console.log('Alert removed');
		clearInterval(this.interval);
    };
 
    render() {
      return ( 
      <Alert variant="info" className="weather-alert">
	  <Alert.Heading className="weather-title">My weather alert</Alert.Heading>
		<div className="weather-title">
			<b>Weather</b>: {this.state.forecast.weather} <b>Rain chance</b>: {this.state.forecast.rainchance} <b>Temperature</b>: {this.state.forecast.temperature} '
		</div>
	  </Alert>
	  );
    }
};
  
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
