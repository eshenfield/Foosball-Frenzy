(function() {
  
  function leaderboardCtrl($scope, Players) {
    vm = this;
    vm.data = {};

    Players.getAllPlayers()
    .then(function(players) {
      vm.data.players = players.sort(function(a, b) {
        return b.rating - a.rating;
      });
    });
  };

  angular
    .module('foosballFrenzy')
    .controller('LeaderboardCtrl', leaderboardCtrl);
})();