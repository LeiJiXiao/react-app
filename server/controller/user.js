/**
 * Created by xiao on 2018/1/9.
 */
const express = require( 'express' );
const router = express.Router();

const user = require( '../model/user' );

router.post( '/login', user.login );
router.post( '/register', user.userReg );
router.get( '/info', user.userInfo );
router.post( '/updateUserInfo', user.updateUserInfo );
router.get( '/list', user.list );
router.get( '/allUserList', user.allUserList );

module.exports = router;