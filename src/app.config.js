config.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function config($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}