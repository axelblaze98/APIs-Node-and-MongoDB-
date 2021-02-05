const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var apiSchema = new Schema({
    date:{
        type: String,
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

module.exports = mongoose.model('api',apiSchema);