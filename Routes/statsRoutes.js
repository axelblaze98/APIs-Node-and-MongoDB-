const routes=require('express').Router();
const {getRequestData,getSpecificRequestInfo} = require('../Controller/controller')

routes.get('/:requestType',(req,res)=>{
    getSpecificRequestInfo(req,res);
})

routes.get('/', (req, res)=>{
    getRequestData(req, res);
})


module.exports = routes;