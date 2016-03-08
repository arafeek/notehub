import angular from 'angular';

export default angular.module('app.config', ['satellizer', 'toastr'])
  .config(['$locationProvider', '$urlRouterProvider', '$authProvider', 'toastrConfig',
    ($locationProvider, $urlRouterProvider, $authProvider, toastrConfig) => {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });

    $urlRouterProvider.otherwise('/404');
    $authProvider.google({
      clientId: '327792453296-3hugu7duos532db7jo1qvaj3ge3a1nfs.apps.googleusercontent.com'
    });

    angular.extend(toastrConfig, {
      autoDismiss: true,
      maxOpened: 2,
      timeOut: 2000,
    });
  }]);