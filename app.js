const express = require('express');
const app = express();

const routes = require('./src/routes/index'); //using route from routes/index

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', routes) //mathi routes ma sab route haru aauxa ani tya aako ya import hunxa ani use hunxa easyy ahhahahahha

module.exports = app;