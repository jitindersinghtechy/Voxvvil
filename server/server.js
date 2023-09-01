const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors')
const dbconnect = require('./database/dbConnect');
const routing = require('./routing');

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", routing);

dbconnect;
app.listen(process.env.PORT,()=>{
    console.log("server is connected")
})