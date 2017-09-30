var express = require('express');
var router = express.Router();
var standupController = require ('../server/app/controllers/standup.server.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET new note page. */
router.get('/newnote', function(req, res) {
  standupController.getNote (req,res);
});

/* POST new note page. */
router.post('/newnote', function(req, res) {
  standupController.create (req,res);
});

module.exports = router;
