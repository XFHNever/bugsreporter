/**
 * Created by xiefuheng on 15/1/25.
 */
var express = require('express');
var router = express.Router();

var BugType = require('../models/bugtype');

router.route('/')
    .get(function(req, res) {
        BugType.find(null, null, {sort: {'name': 1}}, function(err, bugTypes) {
            if(err) {
                res.send(err);
            }

            res.json(bugTypes);
        });
    })
    .post(function(req, res) {
        var bugType = new BugType();
        bugType.name = req.body.name;

        bugType.save(function(err, type) {
            if(err) {
                res.send(err);
            }
            res.json(type);
        });
    });

router.route('/:type_id')
    .delete(function(req, res) {  //delete a domain
        BugType.findByIdAndRemove(req.params.type_id, function(err) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Success'});
        });
    });


module.exports = router;

