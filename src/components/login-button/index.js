import { Component, Inject } from 'ng-forward';
import './login-button.css';
import DriveHTTPService from '../../core/DriveHTTPService';

@Component({
  selector: 'login-button',
  template: require('./template.html')
})
@Inject('$scope', '$auth', '$http', DriveHTTPService)
export default class LoginButton {
  constructor($scope, $auth, $http, DriveHTTPService) {
    this.$scope = $scope;
    this.$auth = $auth;
    this.$http = $http;
    this.gapi = DriveHTTPService;
    this.username = localStorage.getItem('username');
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
    let file = docs[0];
    this.gapi.fetchFileContentsById(file.id)
      .then((response) => console.log(response));
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