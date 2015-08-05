(function() {
  
  function leaderboardCtrl($scope, Players) {
    vm = this;

    vm.data = {};

    Players.getAllPlayers()
    .then(function(players) {
      vm.data.players = players;
    });
  };

  angular
    .module('foosballFrenzy')
    .controller('LeaderboardCtrl', leaderboardCtrl);
})();