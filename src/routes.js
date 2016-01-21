routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./components/editor/editor.html'),
      controller: 'EditorController',
      controllerAs: 'editor'
    })
    .state('login', {
      url: '/login',
      template: require('./components/login/login.html'),
      controller: 'LoginController',
      controllerAs: 'login'
    });
}