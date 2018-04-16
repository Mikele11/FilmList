var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('films', ['films']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/films', function (req, res) {
  console.log('All right');

  db.films.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/films', function (req, res) {
  console.log(req.body);
  db.films.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/films/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.films.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/films/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.films.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/films/:id', function (req, res) {
  var id = req.params.id;
  db.films.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title, year: req.body.year, country: req.body.country, genre: req.body.genre, poster: req.body.poster, descr: req.body.descr, comment: req.body.comment}},//change avtomatic change
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");