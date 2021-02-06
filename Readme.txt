Clone the repository to your system.

Install all the dependencies required using command: npm install 

create a .env file and provide:
PORT=your desired portnumber
DB_URL=your mongodb connection to the Database

run the code using npm start

The two endpoints are given:

endpoint1:http://localhost:8000/process/*
requestType: POST,GET,UPDATE,DELETE
anything in body
anything as parameter
anything as header
anything as query parameter

endpoint2a:http://localhost::8000/stats
requestType:GET

endpoint2b:http://localhost::8000/stats/{type of request}
requestType:Get
query params: toDate and fromDate(format= yyyy-mm-dd hh:mm)
