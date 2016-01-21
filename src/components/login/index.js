
import {default as firebaseService} from '../../core/firebase';

import LoginController from './login.controller';
import './login.css';

// Return the name of the module since external modules should always return their name
export default angular.module('nh.login', [firebaseService])
  .controller('LoginController', LoginController)
  .name;
