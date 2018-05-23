var express = require('express');
var NeDB = require('nedb'), db = new NeDB({filename: './database', autoload: true});
var router = express.Router();

/* GET caesar. */
router.post('/', function(req, res, next) {
    if(req.body['key']){
        db.find({key: req.body['key']}, function (err, keys) {
            if(keys.length !== 0){
                var response = {shift: keys[0]['shift']};
            }else{
                var numShift = Math.floor(Math.random() * 30) + 1;
                db.insert({key: req.body['key'], shift: numShift});
                var response = {shift: numShift};
            }
            res.send(JSON.stringify(response));
        });
    }else {
        res.send(JSON.stringify({err: 'Nem került elküldésre kulcs érték'}));
    }
});

module.exports = router;
