var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = new Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: Number, default: 1200 },
  matchups: [{ type: Schema.Types.ObjectId, ref: 'Match'}],
  rivalries: [{ type: Schema.Types.ObjectId, ref: 'Rivalry'}]
});

var Match = new Schema({
  winner: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  loser: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  date: { type: Date, default: Date.now()}
});

var Rivalry = new Schema({
  id: {type: String, required: true},
  matchups: [{ type: Date, default: Date.now(), required: true }]
});

module.exports = {
  player: mongoose.model('Player', Player),
  match: mongoose.model('Match', Match),
  rivalry: mongoose.model('Rivalry', Rivalry)
};