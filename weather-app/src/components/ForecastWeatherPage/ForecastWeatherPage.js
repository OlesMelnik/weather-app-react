import React from "react";
import WeatherCard from "../WeatherCard";
import Hourly from "../Hourly";

import './ForecastWeatherPage.css';

const API_KEY = "c042781cad4529040c74b30fe55ec94e";

class ForecastWeatherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      city: 'Lviv',
      forecastItems: [],
      date: Math.round(Date.now() / 1000),
      dayOfWeek: "TODAY"
    };
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  changeDate(newDate, day) {
    this.setState({ date: newDate });
    this.setState({dayOfWeek : day});
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      var forecast = [];
      var date = new Date();
      date.setTime(items.list[0].dt * 1000);
      var tempDate = new Date();
      items.list.forEach(item => {
        tempDate.setTime(item.dt * 1000);
        if (date.getDay() === tempDate.getDay()) {
          forecast.push(item);
          date.setDate(date.getDate() + 1);
        }
      })
      console.log(this.state.items);
      return (<div className="forecast-weather-page">
        <div className="container">
          <WeatherCard key={items.city.id} items={forecast} changeDate={this.changeDate} />
          <Hourly city = {this.state.city} date={this.state.date} dayOfWeek = {this.state.dayOfWeek}/>
        </div>
      </div>
      );
    }
  }
}

export default ForecastWeatherPage;