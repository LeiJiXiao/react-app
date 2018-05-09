/**
 * Created by xiao on 2018/1/14.
 */
const utils = require( 'utility' );

const getModel = require( './db' ).getModel;
const User = getModel( 'user' );
const _filter = { pwd: 0, __v: 0 };

function md5 ( v ) {
    return utils.md5( `${utils.md5( v ).substr( 0, 6 )}_${v}` );
}

function userReg ( req, res ) {
    const { user, password, type } = req.body;
    User.findOne( { user }, ( err, doc ) => {
        if ( err ) {
            console.log( err );
            return res.json( { code: 0, msg: '服务端异常！' } );
        }
        if ( doc ) {
            return res.json( { code: 0, msg: '用户名已存在！' } );
        }
        const userModel = new User( { user, type, password: md5( password ) } ) ;
        userModel.save( ( err, doc ) => {
            if ( err ) {
                return res.json( { code: 0, msg: '服务端异常！' } );
            }
            const { _id } = doc;
            res.cookie( 'sessionID', _id );
            return res.json( { code: 1, msg: '注册成功！' } );
        } );
    } );
}

function login ( req, res ) {
    const { user, password } = req.body;
    User.findOne( { user }, _filter, ( err, doc ) => {
        if ( err ) {
            return res.json( { code: 0, msg: '服务端异常！' } );
        }
        if ( doc ) {
            if( md5( password ) === doc.password ) {
                res.cookie( 'sessionID', doc._id );
                const { user, type, avatar, desc, title, money, company } = doc;
                return res.json( {
                    code: 1,
                    msg: '登录成功！',
                    tips: {
                        userInfo: { user, type, avatar, desc, title, money, company }
                    }
                } );
            } else {
                return res.json( { code: 0, msg: '登录密码错误！' } );
            }
        }
    } );
}

function userInfo ( req, res ) {
    const { sessionID } = req.cookies;
    if ( !sessionID ) {
        return res.json( { code: 0 } );
    }
    User.findOne( { _id: sessionID }, _filter, ( err, doc ) => {
        if ( err ) {
            return res.json( { code: 0, msg: '500' } )
        }
        return res.json( { code: 1, data: doc } );
    } );
}

function updateUserInfo (req, res) {
    const {sessionID} = req.cookies;
    if (!sessionID) {
        return res.json({code: 0, msg: '没有此用户！'});
    }
    User.findByIdAndUpdate(sessionID, req.body, (err, doc) => {
        if (err) {
            console.log(err);
            return res.json({code: 0, msg: '服务端错误！'});
        }
        const tips = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, req.body);
        return res.json({code: 1, tips});
    });
}

function allUserList ( req, res ) {
    console.log( 'allUserList' )
    User.find( {}, ( e, d ) => {
        res.json( d );
    } );
}

function list( req, res ) {
    const { type } = req.query;
    User.find( { type }, ( err, doc ) => {
        if ( err ) {
            res.json( { code: 0, msg: '服务器错误！' } );
        }
        res.json( { code: 1, msg: '请求成功！', tips: {
            data: doc
        } } );
    } );
}

module.exports = {
    userReg,
    login,
    userInfo,
    allUserList,
    updateUserInfo,
    list
};