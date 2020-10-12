import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
import './App.css';

export class AlertAsClass extends Component {
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
