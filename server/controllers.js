var mongoose = require('mongoose'),
    Player = require('./models').player,
    Match = require('./models').match,
    Q = require('q');

module.exports = {
  /*    Request Handlers for /api/players   */
  findAllPlayers: function(req, res) {
    var findAllPlayers = Q.nbind(Player.find, Player);

    findAllPlayers({})
    .then(function(players) {
      res.send(players);
    })
    .catch(function(err) {
      res.status(500).send({ error: 'Internal Server Error' });
    });
  },

  createPlayer: function(req, res) {
    var createPlayer = Q.nbind(Player.create, Player);
    var newPlayer = new Player({
      name: req.body.name
    });

    createPlayer(newPlayer)
    .then(function(createdPlayer) {
      res.send(createdPlayer);
    })
    .catch(function(err) {
      res.status(500).send({ error: 'Internal Server Error' });
    });
  },
  /*    Request Handlers for /api/matches   */
  findAllMatches: function(req, res) {
    var findAllMatches = Q.nbind(Match.find, Match);
    findAllMatches({})
    .then(function(matches) {
      res.send(matches);
    })
    .catch(function(err) {
      res.status(500).send({ error: 'Internal Server Error' });
    })
  },

  createMatch: function(req, res) {
    var findPlayer = Q.nbind(Player.findOne, Player);
    var createMatch = Q.nbind(Match.create, Match);
    var updatePlayer = Q.nbind(Player.findOneAndUpdate, Player);
    var winner, loser, newMatch;

    // find the winner and loser in the database
    Q.all([findPlayer({name: req.body.winner}), findPlayer({name: req.body.loser})])
    .then(function(results) {
      winner = results[0];
      loser = results[1];
      newMatch = new Match({
        winner: winner._id,
        loser: loser._id,
        date: req.body.date
      });
      // create match with winner and loser's reference ids
      return createMatch(newMatch);
    })
    .then(function(createdMatch) {
      // add match to winner and loser's matchup list
      return Q.all([updatePlayer({_id: winner._id}, {$push: {'matchups': createdMatch._id}}, {upsert: true}),
                    updatePlayer({_id: loser._id}, {$push: {'matchups': createdMatch._id}}, {upsert: true})]);
    })
    .then(function(updatedPlayers) {
      // update winner and loser's ELO rating (passed in request as newWinningRating and newLosingRating)
      return Q.all([updatePlayer({_id: winner._id}, {rating: req.body.newWinningRating}),
                    updatePlayer({_id: loser._id}, {rating: req.body.newLosingRating})]);
    })
    .then(function(updatedPlayers) {
      res.send({createdMatch: newMatch, updatedWinner: updatedPlayers[0], updatedLoser: updatedPlayers[1]});
    })
    .catch(function(err) {
      res.status(500).send({ error: 'Internal Server Error' });
    });
  },
  /*    Request Handlers for /api/players/:name   */
  findPlayer: function(req, res) {
    var findPlayer = Q.nbind(Player.findOne, Player);

    findPlayer({name: req.params.name})
    .then(function(player) {
      if (!player) res.status(404).send({ error: 'That player doesn\'t exist!'});
      res.send(player);
    })
    .catch(function(err) {
      res.status(500).send({ error: 'Internal Server Error' });
    });
  },
  /*    Request Handlers for /api/matches/:id   */
  findMatch: function(req, res) {
    var findMatch = Q.nbind(Match.findOne, Match);

    findMatch({_id: req.params.id})
    .then(function(match) {
      if (!match) res.status(404).send({ error: 'That match doesn\'t exist!'});
      res.send(match);
    })
    .catch(function(err) {
      res.status(500).send({ error: 'Internal Server Error' });
    })
  }
};
