/**
 * Created by xiao on 2018/4/17.
 */
import React, { Component } from 'react';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';

import axios from '@/lib/axios';

export default class Boss extends Component {
    state = {
        userList: []
    };
    componentDidMount() {
        axios.get( '/user/list',  {
            params: {
                type: 1
            }
        } ).then( res => {
            this.setState({
                userList: res.tips.data
            });
        } );
    }
    render() {
        console.log(this.state.userList )
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    {this.state.userList.map(v => (
                        <Card key={v._id}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`@/images/${v.avatar}.jpg`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                <div>{v.desc}</div>
                            </Card.Body>
                        </Card>
                    ))}
                    <WhiteSpace/>
                </WingBlank>
            </div>
        )
    }
}

