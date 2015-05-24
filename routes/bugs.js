/**
 * Created by xiefuheng on 15/1/25.
 */
var express = require('express');
var router = express.Router();

var Bug = require('../models/bug');

router.route('/')
    .get(function(req, res) {
        var keyword = req.query.key;
        if (keyword != null) {
            var reg = new RegExp(keyword, 'i');
            Bug.find({name: reg}, null, {sort: {'modify_at': -1}}, function(err, bugs) {
                if(err) {
                    res.send(err);
                }

                res.json(bugs);
            });
        } else {
            Bug.find(null, null, {sort: {'modify_at': -1}}, function(err, bugs) {
                if(err) {
                    res.send(err);
                }

                res.json(bugs);
            });
        }

    })
    .post(function(req, res) {
        var bug = new Bug();
        bug.name = req.body.name;
        bug.code = req.body.code;
        bug.desc = req.body.desc;
        bug.type = req.body.type;
        bug.language = req.body.language;
        bug.solve = req.body.solve;
        bug.create_at = bug.modify_at = Date.now();

        bug.save(function(err, bug){
            if(err) {
                res.send(err);
            }
            res.json(bug);
        });
    });

router.route('/:bug_id')
    .get(function(req, res) {
        Bug.findById(req.params.bug_id, function(err, bug) {
            if(err) {
                res.send(err);
            }

            res.json(bug);
        });
    })
    .put(function(req, res) {
        Bug.findByIdAndUpdate(req.params.bug_id, {name: req.body.name,desc: req.body.desc, code: req.body.code,
            type: req.body.type, language: req.body.language, solve: req.body.solve, modify_at: Date.now()}, function(err, bug) {
            if(err) {
                res.send(err);
            }
            res.json(bug);
        })

    })
    .delete(function(req, res) {  //delete a domain
        Bug.findByIdAndRemove(req.params.bug_id, function(err) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Success'});
        });
    });

module.exports = router;

