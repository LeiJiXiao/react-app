/**
 * Created by xiao on 2018/4/17.
 */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';

import NavLinkBar from '@/components/navLink/NavLinkBar';

import Boss from '@/container/boss/Boss';
/*import Genius from '@/container/genius/Genius';*/
function Genius() {
    return <div>boss </div>
}
function Msg() {
    return <div>Msg</div>
}
function User() {
    return <div>User</div>
}

@connect(
    state=>state
)
export default class Dashborad extends Component {

    render() {
        const user = this.props.userReducer;
        const { pathname } = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 1
            }, {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 0
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息中心',
                component: Msg
            }, {
                path: '/user',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];
        return (
            <div>
                <NavBar mode='dard'>{navList.find( v => ( v.path === pathname )  ).title}</NavBar>
                <Switch>
                    {navList.map(v => (
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                    ))}
                </Switch>
                <NavLinkBar navList={ navList }></NavLinkBar>
            </div>
        )
    }
}
