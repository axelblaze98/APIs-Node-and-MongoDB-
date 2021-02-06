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
    toDate=new Date(req.query.toDate);
    fromDate = new Date(req.query.fromDate);
    console.log(toDate);
    console.log(fromDate);
    Api.aggregate(
        [ 
            {$match:{
                method:req.params.requestType.toUpperCase(),
                date:{
                    $gte:toDate,
                    $lt:fromDate,
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