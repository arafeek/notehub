//import ngshowdown from 'ng-showdown';

import ngsanitize from 'angular-sanitize';
import {saveAs} from 'filesaver.js';
import {CONFIG} from './editor.constants';

export default class EditorController {
  constructor($timeout) {
    this.markdown = require('markdown').markdown;
    this.$timeout = $timeout;

    let settings = {};
    settings.showPreview = true;
    // Add more default settings here

    this.settings = settings;
    // In private mode, we do not have access to localStorage so fallback to
    // sessionStorage to preserve user experience
    try {
      localStorage.setItem('test', null);
      this.storage = localStorage;
    } catch(e) {
      this.storage = sessionStorage;
    }
    // Maybe think about moving the name of the object, `lastSave` into a config or something
    let savedContent = this.storage.getItem(CONFIG.SAVE);
    this.content = savedContent ? JSON.parse(savedContent).content : '';
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

  toggleShowPreview() {
    this.settings.showPreview = !this.settings.showPreview;
  }

  save() {
    let saveObj = {
      content: this.content
    };

    this.storage.setItem(CONFIG.SAVE, JSON.stringify(saveObj));
    console.log('Content saved!');

  }

  handleKeydown(event) {
    // Command + S or ctrl + s
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 83) {
      this.save();
      event.preventDefault();
      return false;
    }
  }
}

EditorController.$inject = ['$timeout'];
