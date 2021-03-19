import React from "react";

import './TodayWeatherPage.css';
import CurrentWeather from '../CurrentWeather';
import Hourly from "../Hourly";
import NearByPlaces from "../NearByPlaces";

const API_KEY = "c042781cad4529040c74b30fe55ec94e";

class TodayWeatherPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {},
      city: 'Lviv'
    };
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
          console.log("result:", result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, data } = this.state;
   
    if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      const sunset = data.sys.sunset;
      const sunrise = data.sys.sunrise;
      var date = new Date(sunrise * 1000);
      var date2 = new Date(sunset * 1000);
      var sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var sunset_date = date2.getHours() + ":" + date2.getMinutes() + ":" + date2.getSeconds();
      var today = Math.round(Date.now() / 1000);
      console.log("today", today);
      console.log("sunrise",sunrise,sunrise_date);
      console.log(this.state.data);
      return (<div className="today-weather-page">
        <div className="container">
          {<CurrentWeather city={this.state.city}
            temp={this.state.data.main.temp}
            temp_feels={this.state.data.main.feels_like}
            description={this.state.data.weather[0].description}
            icon={this.state.data.weather[0].icon}
            sunrise={sunrise_date}
            sunset={sunset_date}

          />}
          <Hourly city={this.state.city} date={today} dayOfWeek = "TODAY"/>
          <NearByPlaces />
        </div>
      </div>);
    }

  }
}

export default TodayWeatherPage;