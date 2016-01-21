import angular from 'angular';
import ngFire from 'angularfire';
import Firebase from 'firebase';

class FirebaseService {
  constructor($firebase, $firebaseAuth) {
    this._$firebase = $firebase;
    this._$firebaseAuth = $firebaseAuth;
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  createReference(path) {
    if (!this.baseUrl) {
      throw new Error('baseUrl must be set before creating firebase refence');
    }
    return new Firebase(`${this.baseUrl}/${path || ''}`);
  }

  static FirebaseFactory($firebase, $firebaseAuth) {
    return new FirebaseService($firebase, $firebaseAuth);
  }

}



FirebaseService.FirebaseFactory.$inject = ['$firebase', '$firebaseAuth'];
