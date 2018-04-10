/**
 * Created by xiao on 2018/1/2.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addGun, removeGun, addAsync } from './index.redux';

//采用@connect语法映射state，dispatch
@connect(
    state => ( { num: state } ),
    { addGun, removeGun, addAsync }
)

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={ this.props.addGun }>添加机关枪</button>
                <button onClick={ this.props.removeGun }>减少机关枪</button>
                <button onClick={ this.props.addAsync }>减少机关枪</button>
                <h1>目前有机关抢{this.props.num}把，哈哈哈。。。</h1>
            </div>
        );
    }
}

//采用@connect语法映射state，dispatch, so here disabled
/*const mapStatetoProps = ( state ) => {
 return { num: state }
 };
 const actionCreators = { addGun, removeGun, addAsync };

 const App2 = connect( mapStatetoProps, actionCreators )( App );*/


export default App;
