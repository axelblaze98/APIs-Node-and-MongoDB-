const routes=require('express').Router();
const test = require('./test');

routes.all('/', (req, res)=>{
    if(req.method=='GET' || req.method=='POST' || req.method=='DELETE' || req.method=='PUT'){
        res.status(400).send(test.test());
    }
    else res.status(200).send('access denied')
})

module.exports=routes;