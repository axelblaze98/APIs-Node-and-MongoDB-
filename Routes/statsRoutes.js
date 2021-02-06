const routes=require('express').Router();
const {getRequestData} = require('../Controller/controller')

routes.get('/', (req, res)=>{
    getRequestData(req, res);
})

module.exports = routes;