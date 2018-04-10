/**
 * Created by xiao on 2018/1/7.
 */
import React, { Component } from 'react';

import logoImg from './logo.jpg';
import './logo.css';

export default class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={ logoImg } alt="logo" />
            </div>
        )
    }
}
