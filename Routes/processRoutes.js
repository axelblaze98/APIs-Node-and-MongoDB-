const routes=require('express').Router();
const {addRequestData} = require('../Controller/controller')



routes.all('*', (req, res)=>{
    if(req.method=='GET' || req.method=='POST' || req.method=='DELETE' || req.method=='PUT'){
        addRequestData(req,res);
    }
    else res.status(400).send('access denied')
})


module.exports=routes;