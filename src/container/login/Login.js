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
    WhiteSpace,
    WingBlank,
    toast } from 'antd-mobile';

import Logo from '@/components/logo/Logo';
import SlideValids from '@/components/SlideValids';
import { loginHandel } from '@/redux/user.redux';

@connect(
    state => state.userReducer,
    { loginHandel }
)
export default class Login extends Component {
    state = {
        user: '',
        password: '',
        slideValidStatus: false
    };
    toRegister = () => {
        this.props.history.push( '/Register' );
    };
    handelChange = ( k, v ) => {
        this.setState( {
            [ k ]: v
        } );
    };
    loginHandel = () => {
        const { user, password } = this.state;
        if ( !user || !password ) {
            toast.fail( '请完善信息！' );
        } else {
            console.log( this.state );
            this.props.loginHandel( this.state );
        }
    };
    checkSlideValid = valid => {
        this.setState({
            slideValidStatus: valid
        });
        setTimeout(function(){
            alert(`解锁成功！${valid}`,);
        },100);
    }
    render() {
        return (
            <div>
                <SlideValids checkSlideValidHandler={this.checkSlideValid}/>
                { this.props.redirectTo? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                <Logo />
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <InputItem placeholder="请填写用户名" onChange={ v => this.handelChange( 'user', v ) }>用户</InputItem>
                        <InputItem placeholder="请填写密码" onChange={ v => this.handelChange( 'password', v ) }>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={ this.loginHandel }>23登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={ this.toRegister }>1d注册</Button>
                </WingBlank>
            </div>
        )
    }
}
