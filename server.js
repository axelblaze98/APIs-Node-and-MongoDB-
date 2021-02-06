const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const processRoute = require('./Routes/processRoutes');
const statsRoute = require('./Routes/statsRoutes')
const db = require('./Configration/Database')

db();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/process',processRoute);
app.use('/stats',statsRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})