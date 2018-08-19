import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';

import Login from '@/container/login/Login';
import Register from '@/container/register/Register';
import AuthRouter from '@/components/authRouter/AuthRouter';
import BossInfo from '@/container/bossInfo/BossInfo';
import GeniusInfo from '@/container/geniusInfo/GeniusInfo';
import Dashborad from '@/components/dashborad/Dashborad';

import './sass/navLinkBar.css';


import reducers from './redux/reducer';

const store = createStore( reducers, compose(
    applyMiddleware( thunk ),
    window.devToolsExtension? window.devToolsExtension() : f => f
) );
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux/reducer', () => {
        const nextRootReducer = require('./redux/reducer');
        store.replaceReducer(nextRootReducer);
    });
}

if (module.hot) {
    module.hot.accept(() => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={ store }>
                    <BrowserRouter>
                        <div>
                            <AuthRouter></AuthRouter>
                            <Switch>
                                <Route path='/login' component={ Login }></Route>
                                <Route path='/register' component={ Register }></Route>
                                <Route path='/bossInfo' component={ BossInfo }></Route>
                                <Route path='/geniusInfo' component={ GeniusInfo }></Route>
                                <Route component={ Dashborad }></Route>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    })
}

ReactDOM.render(
    <AppContainer>
    <Provider store={ store }>
        <BrowserRouter>
            <div>
                <AuthRouter></AuthRouter>
                <Switch>
                    <Route path='/login' component={ Login }></Route>
                    <Route path='/register' component={ Register }></Route>
                    <Route path='/bossInfo' component={ BossInfo }></Route>
                    <Route path='/geniusInfo' component={ GeniusInfo }></Route>
                    <Route component={ Dashborad }></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    </AppContainer>,
    document.getElementById('root')
);
//订阅render方法，store change ==> view update;
//store.subscribe( render );
