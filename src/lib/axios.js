/**
 * Created by xiao on 2018/1/7.
 */
import axios from 'axios';
import { toast } from 'antd-mobile';

const instance = axios.create( {
    baseURL: 'http://localhost:3000/apis'
} );
instance.interceptors.request.use( config => {
    toast.loading( '加载中...', 0 );
    return config;
}, error => {
    return Promise.reject( error );
} );

instance.interceptors.response.use( response => {
    toast.hide();
    //console.log( response );
    if ( response.status === 200 ) {
        return response.data;
    } else {
        toast.fail( '网络错误！' );
    }
}, error => {
    return Promise.reject( error );
} );

export default instance;