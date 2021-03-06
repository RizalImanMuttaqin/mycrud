import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import {  createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.js";
import axios from 'axios';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import reducers from './reducers';
import authGuard from './components/HOCs/authGuard';
import './index.css';
// import style from './index.css';

// index css

const jwtToken = localStorage.getItem('JWT_TOKEN');
axios.defaults.headers.common['Authorization']=jwtToken;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(
    <Provider store={createStore(reducers, {
       
        auth: {
            token : jwtToken,
            isAuthenticated : jwtToken ? true : false
        }
    }, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f) 
        )}>
    <BrowserRouter>
    <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/create" component={CreateTodo} />
        <Route exact path="/edit/:id?" component={EditTodo} />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
    </App>
    </BrowserRouter>
    </Provider>
    , document.querySelector('#root')
);
serviceWorker.unregister();
