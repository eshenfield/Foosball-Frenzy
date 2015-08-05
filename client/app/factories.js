angular
  .module('foosballFrenzy')
  .factory('Players', function($http) {
    var getAllPlayers = function() {
      return $http({
        method: 'GET',
        url: '/api/players'
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error('Error!', err);
      });
    };

    var getPlayer = function(name) {
      return $http({
        method: 'GET',
        url: '/api/players/' + name 
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error('Error! ', err);
      });
    };

    var createPlayer = function(name) {
      return $http({
        method: 'POST',
        url: 'api/players',
        data: {'name': name}
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error('Error! ', err);
      });
    };

    return {
      getAllPlayers: getAllPlayers,
      getPlayer: getPlayer,
      createPlayer: createPlayer
    };
  })