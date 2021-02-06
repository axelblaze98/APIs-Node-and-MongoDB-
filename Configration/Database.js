const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config();

const connected = chalk.bold.green;
const disconnect = chalk.bold.red;
const error = chalk.bold.yellow;

module.exports = function(){
    mongoose.connect(process.env.DB_URL,{ useUnifiedTopology: true , useNewUrlParser: true });

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", process.env.DB_URL));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });
}