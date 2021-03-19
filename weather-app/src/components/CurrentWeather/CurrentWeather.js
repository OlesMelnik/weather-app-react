import React from "react";

import './CurrentWeather.css';


class CurrentWeather extends React.Component {
    constructor(){
        super();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '.' + dd + '.' + yyyy;
        this.state = {date: today};
    }
    render() {
        var image_url = "http://openweathermap.org/img/wn/" + this.props.icon + "@2x.png";
        return (<div className="current-weather">
            <div className="header">
                <h3>Current Weather</h3>
                <h4>{this.state.date}</h4>
            </div>
            <div className="main-info">
                <div className="weather-icon">
                    <div><img src={image_url}/></div>
                    <div>{this.props.description}</div>
                </div>
                <div className="tempreture">
                    <h1>{this.props.temp}°C</h1>
                    <div><p>Real Feel:{this.props.temp_feels}°C</p></div>
                </div>
                <div className="sun-info">
                    <div>Sunrise: {this.props.sunrise}</div>
                    <div>Sunset: {this.props.sunset}</div>
                </div>
            </div>
        </div>)
    }
}

export default CurrentWeather;