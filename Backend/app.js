const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Sequelize, DataTypes }  = require('sequelize')
const path = require('path')

const postRoutes = require('./Routes/post');
const userRoutes = require('./Routes/user')


const db =require('./Models')

// db.sequelize.sync({force: true})

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/backend/images', express.static(path.join(__dirname, 'images')));

app.use("/api/post",  postRoutes)
app.use("/api/auth", userRoutes)


module.exports = app;