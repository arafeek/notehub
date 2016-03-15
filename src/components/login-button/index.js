import { Component, Inject } from 'ng-forward';
import './login-button.css';
import DriveHTTPService from '../../core/DriveHTTPService';
import StorageService from '../../core/StorageService';

@Component({
  selector: 'login-button',
  template: require('./template.html')
})
@Inject('$scope', '$auth', '$http', DriveHTTPService, StorageService)
export default class LoginButton {
  constructor($scope, $auth, $http, DriveHTTPService, StorageService) {
    this.$scope = $scope;
    this.$auth = $auth;
    this.$http = $http;
    this.drive = DriveHTTPService;
    this.username = localStorage.getItem('username');
    this.storage = StorageService;
    this.$scope.files = [];
  }

  authenticate() {
    this.$auth.authenticate('google')
      .then((res) => {
        this.username = res.data.name;
        localStorage.setItem('username', res.data.name);
      });
  }

  onPicked(docs) {
    const { $auth, drive, storage } = this;
    let file = docs[0];
    console.log(file);
    // Ehhh this is really weird, don't know why the token I get back isn't correct
    // the first time.
    $auth.setToken(window.gapi.auth.getToken().access_token);
    drive.fetchFileContentsById(file.id)
      .then((response) => {
        // Time to load the file
        let newRecord = {
          content: response.data,
        };
        storage.addRecord(file.name, newRecord);
        // Load the file
        storage.setCurrentRecord(storage.getRecord(file.name));
      });
  }

  logout() {
    this.$auth.logout();
  }

  getButtonText() {
    return this.isAuthenticated() ? `Logged in as ${this.username}` : 'Login with Google';
  }

  isAuthenticated() {
    return this.$auth.isAuthenticated();
  }
}