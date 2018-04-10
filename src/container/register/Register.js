/**
 * Created by xiao on 2018/1/7.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Button,
    List,
    InputItem,
    Radio,
    WingBlank,
    WhiteSpace,
    toast } from 'antd-mobile';

import Logo from '@/components/logo/Logo';
import { regHandel } from '@/redux/user.redux';

const RadioItem = Radio.RadioItem;
@connect(
    state => state.userReducer,
    { regHandel }
)
export default class Register extends Component {
    state = {
        type: 1,
        user: '',
        password: '',
        confirmPassword: ''
    };
    toLogin = () => {
        this.props.history.push( '/Login' );
    };
    handelChange = ( k, v ) => {
        this.setState( {
            [ k ]: v
        } );
    };
    handelRegister = () => {
        const { user, password, confirmPassword } = this.state;
        if ( !user || !password || !confirmPassword ) {
            toast.fail( '请完善信息！' );
        } else {
            console.log( this.state );
            this.props.regHandel( this.state );
        }
    };
    render() {
        const { type } = this.state;
        const dataList = [
            { type: 0, label: 'Boss' },
            { type: 1, label: '大牛' }
        ];
        return (
            <div>
                { this.props.redirectTo? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                <Logo />
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <InputItem  placeholder="请填写用户名"
                                    onChange={ v => this.handelChange( 'user', v )}>用户名</InputItem>
                        <InputItem placeholder="请填写密码"
                                   type="password"
                                   onChange={ v => this.handelChange( 'password', v ) }>密码</InputItem>
                        <InputItem placeholder="请确认密码"
                                   type="password"
                                   onChange={ v => this.handelChange( 'confirmPassword', v ) }>确认密码</InputItem>
                        {
                            dataList.map( item => (
                                <RadioItem key={ item.type }
                                           checked={ type === item.type }
                                           onChange={ v => this.handelChange( 'type', item.type ) }>
                                    { item.label }
                                </RadioItem>
                            ) )
                        }
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={ this.handelRegister }>注册</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={ this.toLogin }>登录</Button>
                </WingBlank>
            </div>
        )
    }
}
