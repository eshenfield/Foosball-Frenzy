(function() {
  
  function leaderboardCtrl($scope) {
    vm = this;

    this.message = "EMILY IS THE LEADER";
  }

  angular
    .module('foosballFrenzy')
    .controller('LeaderboardCtrl', leaderboardCtrl);
})();