(function() {
  function config($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/index');

  $stateProvider
    .state('index', {
      abstract: true,
      url: '/index',
      templateUrl: 'components/common/content.html'
    })
    .state('index.leaderboard', {
      url: '',
      controller: 'LeaderboardCtrl as leaderboard',
      templateUrl: 'components/leaderboard/leaderboard.html'
    })
  };

  angular
    .module('foosballFrenzy')
    .config(config);
})();