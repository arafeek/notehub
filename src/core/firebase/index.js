import FirebaseService from './firebaseService';

export default angular.module('nh.firebase-service', [])
  .factory('firebaseService', FirebaseService.FirebaseFactory)
  .name;
