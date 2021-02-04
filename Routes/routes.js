const routes=require('express').Router();

randomNumber=(max,min)=>{
    return Math.floor(
        Math.random()*(max-min+1)+min
    );
}
getCurrentISTDate=()=>{
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
}
routes.all('/process', (req, res)=>{
    if(req.method=='GET' || req.method=='POST' || req.method=='DELETE' || req.method=='PUT'){
        
        var currentDate = getCurrentISTDate();
        waitTime = randomNumber(15000,30000);
        setTimeout(()=>{
            res.status(200).send(currentDate+'+0000'+'  '+waitTime);
        },waitTime);
    }
    else res.status(400).send('access denied')
})

routes.get('/stats', (req, res)=>{
    res.send('stats');
})

module.exports=routes;