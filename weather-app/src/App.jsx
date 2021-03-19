import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import NotFoundPage from "./components/NotFoundPage";
import Menu from "./components/Menu";
import TodayWeatherPage from './components/TodayWeatherPage';
import ForecastWeatherPage from './components/ForecastWeatherPage'; 



class App extends React.Component {
    render() {
        return <div>
            <Router>
                <Menu />
                <div className="appContainer">
                    <Switch>
                        <Route exact path="/" component={TodayWeatherPage} />
                        <Route path="/today" component={TodayWeatherPage} />
                        <Route path="/forecast" component={ForecastWeatherPage} />
                        {/* <Route component={NotFoundPage} /> */}
                    </Switch>
                </div>
            </Router>
        </div>
    }
}

export default App;