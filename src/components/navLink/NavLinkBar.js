/**
 * Created by xiao on 2018/4/18.
 */
import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
export default class NavLinkBar extends Component {
    render() {
        const navList = this.props.navList.filter( v => !v.hide );
        const { pathname } = this.props.location;
        return (
            <TabBar>
                { navList.map( v => (
                    <TabBar.Item
                        title={ v.text }
                        key={v.path}
                        icon={ { uri: require( `@/images/${v.icon}.png` ) } }
                        selectedIcon={ { uri: require( `@/images/${v.icon}-active.png` ) } }
                        selected={ pathname === v.path }
                        onPress={() => {
                            this.props.history.push( v.path );
                        }}
                    >
                    </TabBar.Item>
                ) ) }
            </TabBar>
        )
    }
}