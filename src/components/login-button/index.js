import { Component, Inject } from 'ng-forward';
import './login-button.css';

@Component({
  selector: 'login-button',
  template: require('./template.html')
})
@Inject('$auth', '$http')
export default class LoginButton {
  constructor($auth, $http) {
    this.$auth = $auth;
    this.$http = $http;
    this.username = localStorage.getItem('username');
  }

  authenticate() {
    this.$auth.authenticate('google')
      .then((res) => {
        this.username = res.data.name;
        localStorage.setItem('username', res.data.name);
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