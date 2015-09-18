routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./components/editor/editor.html'),
      controller: 'EditorController',
      controllerAs: 'editor'
    });
}