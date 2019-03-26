const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Lead = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) => {
    Lead.find({})
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Lead.create(req.body)
    .then((leads) => {
        console.log('Leaders Created ', leads);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Lead.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Lead.findById(req.params.leaderId)
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    Lead.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Lead.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = leaderRouter;
