const express = require('express');
const app = express();
const route = require('./Routes/routes');

app.use('/',route);

app.listen(8000,()=>{
    console.log('Server listening on port 8000');
})