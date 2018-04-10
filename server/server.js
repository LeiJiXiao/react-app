/**
 * Created by xiao on 2018/1/1.
 */
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const app  = express();

require( './model/db' ).runDB();
const userRouter = require( './controller/user' );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use( cookieParser() );

app.use( '/user', userRouter );

app.listen( '9000', () => {
    console.log( 'app start, prot 9000' );
} );
