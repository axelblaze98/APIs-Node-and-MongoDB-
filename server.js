const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const route = require('./Routes/routes');
const db = require('./Configration/Database')

db();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',route);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})