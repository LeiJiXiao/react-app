/**
 * Created by xiao on 2018/1/7.
 */
import { combineReducers } from 'redux';

import { userReducer } from '@/redux/user.redux';

const reducers = combineReducers( { userReducer } );

export default reducers;