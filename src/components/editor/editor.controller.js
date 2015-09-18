//import ngshowdown from 'ng-showdown';

import ngsanitize from 'angular-sanitize';
import {saveAs} from 'filesaver.js';

export default class EditorController {
  constructor($sanitize) {
    this.markdown = require('markdown').markdown;
    this.content = '';
  }

  exportSource() {
    if (this.content.length > 0) {
      let data = new Blob([this.content], {
        type: 'text/markdown;charset=UTF-8'
      });

      saveAs(data, this.fileName || 'note.md');
    }
  }
}