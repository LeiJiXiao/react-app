/**
 * Created by xiao on 2018/4/10.
 */
import React, { Component } from 'react';
import {
    NavBar,
    List,
    InputItem,
    TextareaItem,
    Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { updateUserInfo } from '@/redux/user.redux';
import {Redirect} from 'react-router-dom';

import AvatarSelect from '@/components/avatarSelect/AvatarSelect';

@connect(
    state => state.userReducer,
    { updateUserInfo }
)
export default class GeniusInfo extends Component {
    state = {
        avatar: '',
        desc: '',
        title: '',
        money: ''
    };
    handelChange = ( k, v ) => {
        this.setState( {
            [ k ]: v
        } );
    };
    componentDidMount() {

    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo && this.props.redirectTo !== path;
        return (
            <div>
                {redirect? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar>GeniusInfo</NavBar>
                <AvatarSelect selectAvatar={this.handelChange}></AvatarSelect>
                <List>
                    <InputItem onChange={v => {this.handelChange('title', v)}}>职位</InputItem>
                </List>
                <List>
                    <InputItem onChange={v => {this.handelChange('money', v)}}>期望薪资</InputItem>
                </List>
                <List>
                    <TextareaItem title='我的优势'
                                  autoHeight
                                  rows="3"
                                  placeholder="请填写我的优势"
                                  onChange={v => {this.handelChange('desc', v)}}>
                    </TextareaItem>
                </List>
                <Button type="primary" onClick={() => {this.props.updateUserInfo(this.state)}}>保存</Button>
            </div>
        )
    }
}
