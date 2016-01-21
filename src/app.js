import 'bootstrap/dist/css/bootstrap.css';

// Angular resources
import angular from 'angular';
import ngsanitize from 'angular-sanitize';
import uirouter from 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';
import ngFire from 'angularfire';

import config from './app.config';
import routes from './routes';
// Main css file
import './main.css';
import './css/overrides.css';
// Components
import editor from './components/editor';
import login from './components/login';
import R from 'ramda';

import {default as firebaseService} from './core/firebase';

// Export ramda globally
// Should I do this somewhere else? Meh...
window.R = R;

angular.module('nh', [
  uirouter,
  routes,
  editor,
  login,
  ngsanitize,
  uibs,
  firebaseService
]).config(config);