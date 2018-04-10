/**
 * Created by xiao on 2018/1/29.
 */
export function redirectTo ( { type, avatar } ) {
    let url = parseInt( type ) === 0? '/boss' : '/genius';
    if ( !avatar ) {
        url += 'info';
    }
    return url;
}