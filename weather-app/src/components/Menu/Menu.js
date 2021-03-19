import React from "react";
import { NavLink }  from 'react-router-dom';
import './Menu.css';
import store from '../../../src/store';


class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {city: 'Lviv'};
        this.handleChange = this.handleChange.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }

    changeCity(){
        console.log("state",this.state.city);
        store.dispatch({
            type: "CHANGE_CITY",
            payload: {city: this.state.city}
          });
        console.log(store.getState()[0].city);
    }

    handleChange(e){
        this.setState({city: e.target.value});
    }

    render() {
        return (<nav>
            <div className="menu">
                <div className="menu-bar">
                    <div className="menu-item">
                        <NavLink className="menu-item-link" activeClassName="active"  to="/today">Today</NavLink>
                    </div>
                    <div className="menu-item">
                        <NavLink className="menu-item-link" activeClassName="active"  to="/forecast">5-day forecast</NavLink>
                    </div>
                </div>
                <input type="text" onChange={this.handleChange}/>
                <button onClick={this.changeCity}>Ok</button>
            </div>
        </nav>)
    }
}

export default Menu;