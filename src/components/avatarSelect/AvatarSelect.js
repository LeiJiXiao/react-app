/**
 * Created by xiao on 2018/4/9.
 */
import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';

export default class AvatarSelect extends Component{
    state = {
        avatar: ''
    };
    componentDidMount() {
    }
    render() {
        const avatar = 'avatar1,avatar2,avatar3,avatar4,avatar5'
            .split( ',' )
            .map( ( v, i ) => ( {
                icon: require( `@/images/${v}.jpg` ),
                text: `${v}`,
            } ) );
        const gridHeader = this.state.avatar.text?
            (<div className="sub-title">
                <span>以选择头像</span>
                <img style={{width: 20}} src={this.state.avatar.icon}/>
            </div>) :
            (<div className="sub-title">请选择头像</div>);
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={ avatar }
                          columnNum={ 5 }
                          onClick={el=>{
                              this.setState({
                                  avatar: el
                              });
                              this.props.selectAvatar('avatar', el.text);
                          }}/>
                </List>
            </div>
        )
    }
}
