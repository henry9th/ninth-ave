import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Header from './components/Header';
import * as serviceWorker from './serviceWorker';
import createHistory from 'history/createBrowserHistory'
import Routes from "./routes";
import { Router } from "react-router-dom";

const history = createHistory()

ReactDOM.render(
    <div> 
        <Header />
        <Router history={history}>
            <Routes />
        </Router>
    </div>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
