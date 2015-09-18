//import ngshowdown from 'ng-showdown';

import ngsanitize from 'angular-sanitize';
import {saveAs} from 'filesaver.js';

export default class EditorController {
  constructor($timeout) {
    this.markdown = require('markdown').markdown;
    this.content = '';
    this.$timeout = $timeout;
  }

  exportSource() {
    if (this.content.length > 0) {
      let data = new Blob([this.content], {
        type: 'text/markdown;charset=UTF-8'
      });

      saveAs(data, this.fileName || 'note.md');
    }
  }

  importFile() {
    var self = this;
    let file = document.getElementById('file-upload').files[0];
    if (file) {
      var fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        this.$timeout(() => {
          this.content = fileReader.result;
          // Clear the input field
          document.getElementById('file-upload').value = null;
        }, 0) 
      }
      // Trigger the file read
      fileReader.readAsText(file);
    }
  }
}