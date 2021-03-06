const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var requestSchema = new Schema({
    date:{
        type: Date,
        required :true
    },
    method:{
        type: String,
        required :true
    },
    headers:{
        type:Schema.Types.Mixed,
        required:false
    },
    path:{
        type:String,
        required:true
    },
    query:{
        type:Schema.Types.Mixed,
        required:false
    },
    body:{
        type:Schema.Types.Mixed,
        required:false
    },
    duration:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('request',requestSchema);