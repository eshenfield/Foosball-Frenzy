angular
  .module('foosballFrenzy')
  .controller('NewMatchCtrl', function($scope, $modal, Players) {

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
        // calculate new ELO score
        // send stuff back to db
        // update page data with db response
        console.log('data in result', data);
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