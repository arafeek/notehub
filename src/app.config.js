import angular from 'angular';
import './vendor/google-picker';
export default angular.module('app.config', ['satellizer', 'toastr', 'lk-google-picker'])
  .config(['$locationProvider',
    '$urlRouterProvider',
    '$authProvider',
    'toastrConfig',
    'lkGoogleSettingsProvider',
    ($locationProvider,
      $urlRouterProvider,
      $authProvider,
      toastrConfig,
      lkGoogleSettingsProvider) => {
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
    lkGoogleSettingsProvider.configure({
      clientId: '327792453296-3hugu7duos532db7jo1qvaj3ge3a1nfs.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/drive'],
      locale: 'en',
      views: [
        'DocsUploadView()',
        'DocsView()',
      ],
      origin: window.location.protocol + '//' + window.location.host,
    });
  }]);