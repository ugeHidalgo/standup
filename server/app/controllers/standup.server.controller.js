var Standup = require ('../models/standup.server.model');

exports.getNote = function (req, res) {

    res.render ('newnote', { title : 'A new note'})
};


exports.list = function (req, res) {
    var query = Standup.find ();

    query.sort({ createdOn: 'desc'})
        .limit(12)
        .exec( function (err, results) {
            res.render ('index', { title: 'StandUp - List', notes: results}) 
        });

};

exports.filterByMember = function (req, res) {
    var nameFilter = req.body.memberName;

    var query = Standup.find();
    query.sort ({createdOn: 'desc'})
        .limit(12);

    if (nameFilter.length > 0){
        query.where ({ memberName: nameFilter});
    }
        
    query.exec ( function (err, results) {
        res.render ('index', { title: 'Notes from ' + nameFilter , notes: results});
    });
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