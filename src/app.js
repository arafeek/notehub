import 'bootstrap/dist/css/bootstrap.css';

// Angular resources
import angular from 'angular';
import ngsanitize from 'angular-sanitize';
import uirouter from 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';

import config from './app.config';
import routes from './routes';
// Main css file
import './main.css';
import './css/overrides.css';
// Components
import editor from './components/editor';

import R from 'ramda';
// Export ramda globally
// Should I do this somewhere else? Meh...
window.R = R;

angular.module('nh', [
  uirouter,
  routes,
  editor,
  ngsanitize,
  uibs])
  .config(config);