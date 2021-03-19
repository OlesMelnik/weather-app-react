import React from "react";

import './Hourly.css';

const API_KEY = "c042781cad4529040c74b30fe55ec94e";

class Hourly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
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

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      console.log(data);
      var items = [];
      var date = new Date();
      var count = 0;
      var today = new Date();
      today.setTime(this.props.date * 1000);
      var cDate = today.getTime();
      console.log("hourly today", this.props.date);
      data.list.forEach(item => {
        date.setTime(item.dt * 1000);
        if (today <= date) {
          if (count < 5) {
            console.log("date", date.getDate() , date.getHours() , date.getMinutes());
            var weather = {
              hour: date.toLocaleString('en-US', { hour: 'numeric', hour12: true }),
              image: "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png",
              forecast: item.weather[0].main,
              temp: Math.round(item.main.temp) + "°",
              realFeel: Math.round(item.main.feels_like) + "°",
              wind: item.wind.speed
            };
            items.push(weather);
            count++;
          }
        }
      });
      console.log("data", this.state.data);
      return (
        <div className="hourly">
          <div className="card">
            <p>{this.props.dayOfWeek}</p>
            <img src="" className="inv" />
            <span>Forecast</span>
            <span>Temp(°C)</span>
            <span>Real Feel</span>
            <span>Wind km/s</span>
          </div>
          {items.map(
            item => (
              <div className="card">
                <p>{item.hour}</p>
                <img src={item.image} alt="forecast"></img>
                <p>{item.forecast}</p>
                <p>{item.temp}</p>
                <p>{item.realFeel}</p>
                <p>{item.wind}</p>
              </div>
            ))}
        </div>
      );
    }
  }
}

export default Hourly;