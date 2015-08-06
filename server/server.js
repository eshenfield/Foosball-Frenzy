var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    controller = require('./controllers.js'),
    port = process.env.PORT || 3000;


var app = express();
mongoose.connect('mongodb://localhost/foosball')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

var playerRouter = express.Router();
var matchRouter = express.Router();
var rivalryRouter = express.Router();

playerRouter.route('/')
  .get(controller.findAllPlayers)
  .post(controller.createPlayer);

playerRouter.route('/:name')
  .get(controller.findPlayer);

matchRouter.route('/')
  .get(controller.findAllMatches)
  .post(controller.createMatch);

matchRouter.route('/:id')
  .get(controller.findMatch);

rivalryRouter.route('/')
  .get(controller.findAllRivalries);

app.use('/api/players', playerRouter);
app.use('/api/matches', matchRouter);
app.use('/api/rivalries', rivalryRouter);

app.listen(port, function () {
  console.log('Foosball Frenzy listening at http://localhost:%s', port);
});


