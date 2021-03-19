import React from "react";

import './WeatherCard.css';

class WeatherCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            activeCard: [true,false,false,false,false]
        };
        this.changeDate = this.changeDate.bind(this);
    }

    changeDate(newDate,day,index){
        var activeCards = [false,false,false,false,false];
        activeCards[index] = true;
        this.setState({activeCard: activeCards});
        this.props.changeDate(newDate,day);

    }


    render() {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Frid', 'Satur'];
        var months = ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var date = new Date();
        var items = [];
        this.props.items.forEach(item => {
            date.setTime(item.dt * 1000);
            var weather = {
                dt: item.dt,
                dayOfWeek: days[date.getDay()],
                dayMonth: months[date.getMonth()] + " " + date.getDate(),
                image: "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png",
                temp: Math.round(item.main.temp) + "°C",
                main: item.weather[0].main
            };
            items.push(weather);
        });

        return (<div className="weather-board">
            {items.map((item, index) => (
                <div className={this.state.activeCard[index] ? 'active': 'weather-card'}
                 onClick={() => this.changeDate(item.dt,item.dayOfWeek,index)}>
                    <h3>{item.dayOfWeek}</h3>
                    <span>{item.dayMonth}</span>
                    <img src={item.image} alt="img"></img>
                    <h2>{item.temp}</h2>
                    <span>{item.main}</span>
                </div>
            ))}
            </div>);
        }
}

export default WeatherCard;