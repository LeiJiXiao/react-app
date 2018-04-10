/**
 * Created by xiao on 2018/1/9.
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '@/lib/axios';
import { loadUserInfo } from '@/redux/user.redux';

@withRouter
@connect(
    null,
    { loadUserInfo }
)
export default class AuthRouter extends Component {
    componentDidMount() {
        const urlList = [ '/login', '/register' ];
        const pathName = this.props.location.pathname;
        if ( urlList.indexOf( pathName ) !== -1 ) {
            return;
        }
        axios.get( '/user/info' )
            .then( res => {
                if ( res.code === 1 ) {
                    this.props.loadUserInfo( res.data );
                } else {
                    this.props.history.push( '/login' );
                }
            } );
    }
    render() {
        return null;
    }
}