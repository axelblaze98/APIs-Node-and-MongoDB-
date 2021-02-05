const Api = require('../Models/model')

randomNumber=(max,min)=>{
    return Math.floor(
        Math.random()*(max-min+1)+min
    );
}
getCurrentISTDate=()=>{
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
}

addRequestData=(req,res)=>{
    var currentDate = getCurrentISTDate();
    var waitTime = randomNumber(15000,30000);

    apiData = new Api({
        date:currentDate,
        method:req.method,
        headers:req.headers,
        path:'/process/'+req.params[0],
        query:req.query,
        body:req.body,
        duration:waitTime
    });


    apiData.save().then(data=>{
        setTimeout(()=>{
            res.status(200).send(data);
        },waitTime)
        
    }).catch(err=>{
        console.log(err.message)
        res.status(404).send(err.message || 'Something went wrong in adding api data');
    })
}

module.exports = {
    addRequestData
}