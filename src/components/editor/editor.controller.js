//import ngshowdown from 'ng-showdown';

import ngsanitize from 'angular-sanitize';

export default class EditorController {
  constructor($sanitize) {
    this.markdown = require('markdown').markdown;
    this.content = '';
  }
}