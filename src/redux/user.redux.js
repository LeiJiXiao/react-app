/**
 * Created by xiao on 2018/1/14.
 */
import { toast } from 'antd-mobile';

import axios from '@/lib/axios';
import { redirectTo } from '@/lib/util';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_USER_INFO = 'LOAD_USER_INFO';

const initState = {
    redirectTo: '',
    user: '',
    type: '',
    isLogin: false,
    msg: ''
};
//reducer
export const userReducer = ( state = initState, action ) => {
    switch( action.type ) {
        case AUTH_SUCCESS:
            return { ...state, ...action.data, isLogin: true, redirectTo: redirectTo( action.data ) };
            break;
        case ERROR_MSG:
            return { ...state, msg: action.msg, isLogin: false  };
            break;
        case LOAD_USER_INFO:
            return { ...state, ...action.data };
            break;
        default:
            return state;
    }
};

//action
export const authSuccess = ( obj ) => {
    const {passward, _id, ...data} = obj;
    return { data, type: AUTH_SUCCESS }
};
export const errorMsg = ( msg ) => {
    return { msg, type: ERROR_MSG }
};
export const loadUserInfo = ( data ) => {
    return { data, type: LOAD_USER_INFO }
};

//dispatch
export const regHandel = ( { user, password, type } ) => {
    return dispatch => {
        axios.post( '/user/register', { user, password, type } )
            .then( res => {
                if ( parseInt( res.code ) === 1 ) {
                    dispatch( authSuccess( { user, type, msg: res.msg } ) );
                } else {
                    toast.fail( res.msg );
                    dispatch( errorMsg( res.msg ) );
                }
            } );
    };
};

export const loginHandel = ( { user, password } ) => {
    return dispatch => {
        axios.post( '/user/login', { user, password } )
            .then( res => {
                if ( parseInt( res.code ) === 1 ) {
                    const { msg, userInfo } = res.tips;
                    dispatch( authSuccess( { ...userInfo, msg: res.msg } ) );
                } else {
                    toast.fail( res.msg );
                    dispatch( errorMsg( res.msg ) );
                }
            } );
    }
};

export const updateUserInfo = data => {
    return dispatch => {
        axios.post( '/user/updateUserInfo', data )
            .then( res => {
                if ( parseInt( res.code ) === 1 ) {
                    dispatch( authSuccess( res.tips ) );
                } else {
                    toast.fail( res.msg );
                    dispatch( errorMsg( res.msg ) );
                }
            } );
    }
};

