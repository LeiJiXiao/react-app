/**
 * Created by xiao on 2018/1/9.
 */
const DB_URL = 'mongodb://127.0.0.1:27017/user';
const mongoose = require( 'mongoose' );

function runDB () {
    mongoose.connect( DB_URL );
    mongoose.connection.on( 'connected', () => {
        console.log( 'db connected!' );
    } );
}

//db文档，数据结构
const models = {
    user: {
        user: { type: String, require: true },
        password: { type: String, require: true },
        type: { type: Number, require: true },
        avatar: { type: String },
        desc: { type: String },
        title: { type: String },
        money: { type: String },
        company: { type: String }
    },
    chat: {

    }
};
Object.keys( models ).forEach( k => {
    mongoose.model( k, new mongoose.Schema( models[ k ] ) );
} );
function getModel( name ) {
    return mongoose.model( name );
}
module.exports = {
    runDB,
    getModel
};