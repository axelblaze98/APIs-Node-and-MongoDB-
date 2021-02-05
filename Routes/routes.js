const routes=require('express').Router();
const controller = require('../Controller/apiController')



routes.all('/process/*', (req, res)=>{
    if(req.method=='GET' || req.method=='POST' || req.method=='DELETE' || req.method=='PUT'){
        controller.addRequestData(req,res);
    }
    else res.status(400).send('access denied')
})

routes.get('/stats', (req, res)=>{
    res.send('stats');
})

module.exports=routes;