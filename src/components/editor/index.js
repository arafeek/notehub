import EditorController from './editor.controller';
import './editor.css';

// Return the name of the module since external modules should always return their name
export default angular.module('nh.editor', [])
  .controller('EditorController', EditorController)
  .name;
