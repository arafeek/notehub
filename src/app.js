import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import ngsanitize from 'angular-sanitize';
import uirouter from 'angular-ui-router';

import config from './app.config';
import routes from './routes';
// Main css file
import './main.css';
// Components
import editor from './components/editor';

// Vendor 
angular.module('nh', [
  uirouter,
  routes,
  editor,
  ngsanitize])
  .config(config);