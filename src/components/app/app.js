import 'bootstrap/dist/css/bootstrap.css';

// Angular resources
import angular from 'angular';
import ngsanitize from 'angular-sanitize';
import uirouter from 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';
//import ngFire from 'angularfire';

import satellizer from 'satellizer';

import {Component, StateConfig, provide} from 'ng-forward';

import config from '../../app.config';

// Main css file
import '../../main.css';
import '../../css/overrides.css';
// Components
import editor from '../editor/editor.controller';
import R from 'ramda';

import template from './app.html';
// Export ramda globally
// Should I do this somewhere else? Meh...
window.R = R;

@Component({
  selector: 'app',
  providers: [
    'app.config',
    uirouter,
    editor,
    ngsanitize,
    satellizer,
    uibs
  ],
  template,
})

@StateConfig([
  { url: '/', component: editor, name: 'editor' },
])
export default class App {

}