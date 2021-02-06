const Api = require('../Models/model')

randomNumber=(max,min)=>{
    return Math.floor(
        Math.random()*(max-min+1)+min
    );
}
getCurrentISTDate=()=>{
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset));
}

addRequestData=(req,res)=>{
    var currentDate = getCurrentISTDate();
    var waitTime = randomNumber(15000,30000);

    requestData = new Api({
        date:currentDate,
        method:req.method,
        headers:req.headers,
        path:'/process'+req.params[0],
        query:req.query,
        body:req.body,
        duration:waitTime/1000
    });


    requestData.save().then(data=>{
        setTimeout(()=>{
            res.status(200).send(data);
        },waitTime)
        
    }).catch(err=>{
        console.log(err.message)
        res.status(404).send(err.message || 'Something went wrong in adding request data');
    })
}

getRequestData = (req,res) =>{
    Api.aggregate(
        [ 
            {$match:{
            }}, 
            {$group:{ _id:"$method" ,total:{$sum:1},averageDuration:{$avg:"$duration"}} } 
        ]
    ).
    then(data=>{
        res.status(200).send(data);
    }).
    catch(err=>{
        res.status(400).send(err.message || 'Something went wrong in getting request data');
    })
}

getSpecificRequestInfo = (req,res) =>{
    tzoffset = (new Date()).getTimezoneOffset() * 60000;
    toDate=new Date(new Date(req.query.toDate) - tzoffset);
    fromDate=new Date(new Date(req.query.fromDate) - tzoffset);
    Api.aggregate(
        [ 
            {$match:{
                method:req.params.requestType.toUpperCase(),
                date:{
                    $gte:fromDate,
                    $lt:toDate,
                }
            }}, 
            {$group:{ _id:"$method" ,total:{$sum:1},averageDuration:{$avg:"$duration"}} } 
        ]
    ).
    then(data=>{
        res.status(200).send(data);
    }).
    catch(err=>{
        res.status(400).send(err.message || 'Something went wrong in getting request data');
    })
}

module.exports = {
    addRequestData,
    getRequestData,
    getSpecificRequestInfo
}