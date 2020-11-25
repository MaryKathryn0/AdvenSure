const express = require('express');
const app = express();

require('dotenv').config();

const routes = require('./routes');

app.use(express.urlencoded({extended: true}));
app.use(express.json);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODBURL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', function(){console.log("Mongo DB connected")});
mongoose.connection.on('error', function(err){console.error(err)});
mongoose.connection.on('disconnected', function(){console.log("Mongo DB disconnected")});

app.use(routes);

app.listen(process.env.PORT || 3001, function(){
    console.log('Express Server Listining on 3001');
})