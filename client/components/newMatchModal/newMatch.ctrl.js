(function() {
  angular
    .module('foosballFrenzy')
    .controller('NewMatchCtrl', function($scope, $state, $modal, Players, Matches) {

      $scope.data = {};

      Players.getAllPlayers()
      .then(function(players) {
        $scope.data.players = players;
      });

      $scope.open = function(size) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'components/newMatchModal/newMatch.html',
          controller: 'NewMatchInstanceCtrl',
          size: size,
          resolve: {
            players: function () {
              return $scope.data.players;
            }
          }
        });

        modalInstance.result.then(function(data) {
          var winner = data[0],
              loser = data[1],
              date = data[2],
              newWinningRating = Elo.getNewRating(winner.rating, loser.rating, 1), 
              newLosingRating = Elo.getNewRating(loser.rating, winner.rating, 0);

          Matches.createMatch(winner, loser, date, newWinningRating, newLosingRating)
          .then(function(newMatch) {
            console.log('Succesfully created newMatch!', newMatch);
            $state.reload();
          })
        });
      };
  });

  angular
    .module('foosballFrenzy')
    .controller('NewMatchInstanceCtrl', function($scope, $modalInstance, players) {
      $scope.players = players;

      $scope.open = function($event) {
        $scope.opened = true;
      };

      $scope.ok = function() {
        var matchData = [$scope.winner, $scope.loser, $scope.date];
        $modalInstance.close(matchData);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
  });
})();