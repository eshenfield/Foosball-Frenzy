(function() {
  angular
    .module('foosballFrenzy')
    .controller('NewPlayerCtrl', function($scope, $state, $modal, Players) {

      $scope.data = {};

      Players.getAllPlayers()
      .then(function(players) {
        $scope.data.players = players;
      });

      $scope.open = function(size) {
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'components/newPlayerModal/newPlayer.html',
          controller: 'NewPlayerInstanceCtrl',
          size: size,
          resolve: {
            players: function () {
              return $scope.data.players;
            }
          }
        });

        modalInstance.result.then(function(name) {
          Players.createPlayer(name)
          .then(function(newPlayer) {
            console.log('created new player!', newPlayer);
            $state.reload();
          });
        });
      };
  });

  angular
    .module('foosballFrenzy')
    .controller('NewPlayerInstanceCtrl', function($scope, $modalInstance, players) {
      $scope.players = players;

      $scope.ok = function() {
        // check if name exists already in players
        // if it does, 
          // tell user
        // else 
        var name = $scope.name
        $modalInstance.close(name);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
  });
})();