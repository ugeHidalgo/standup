var Standup = require ('../models/standup.server.model');

exports.getNote = function (req, res) {

    res.render ('newnote', { title : 'A new note'})
};

exports.create = function (req, res) {

    var entry = new Standup({
            memberName : req.body.memberName,
            project : req.body.project,
            workYesterday : req.body.workYesterday,
            workToday : req.body.workToday,
            impediment : req.body.impediment
    });

    //entry.save();

    entry.save( function(error, standup){
                if (error){
                    res.status(400).send(error);
                } else {
                    res.set('Content-Type','application/json');
                    res.send(standup);
                 }
            });


    //Redirect to home page
    res.redirect(301,'/');
};