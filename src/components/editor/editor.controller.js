//import ngshowdown from 'ng-showdown';

import {saveAs} from 'filesaver.js';
import {CONFIG} from './editor.constants';
import katex from 'katex';

class EditorController {
  constructor($timeout, $sce) {
    this.markdown = require('markdown-it')();
    this.$timeout = $timeout;
    this.katex = katex;
    this.$sce = $sce;
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

      saveAs(data, this.filename ? R.replace(/\s/g, '', this.filename) : 'note.md');
    }
  }

  importFile() {
    let file = document.getElementById('file-upload').files[0];
    if (file) {
      var fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        this.$timeout(() => {
          this.content = fileReader.result;
          this.filename = file.name;
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

  handleParseContent(str) {
    // Regexp to match blocks of the form:
    /*
    * ```math
    *  some latex code goes here
    *```
    */
    // Refer to: http://stackoverflow.com/questions/1979884/how-to-use-javascript-regex-over-multiple-lines
    let latexBlockExpr = /```math[\s\S]*?```/igm;
    let mathBlocks = str.match(latexBlockExpr);
    let nonLatexSegments = str.split(latexBlockExpr);
    // Create an array of the rendered tex strings
    //let texBlocks = R.forEach(this.__renderMathToTex, mathBlocks);
    let texBlocks = R.map((block) => {
      return this.__renderMathToTex(block);
    }, mathBlocks || []);
    // Create an array of the rendered Markdown Strings

    let mdBlocks = R.map((segment) => {
      return this.markdown.render(segment);
    }, nonLatexSegments);
    // Add the rendered strings back to the non TeX strings
    // hacky from : http://stackoverflow.com/questions/13253856/merge-two-arrays-so-that-the-values-alternate

    let allParsedBlocks = mdBlocks.reduce((arr, v, i) => {
      return arr.concat(v, texBlocks[i]);
    }, []);

    return this.$sce.trustAsHtml(allParsedBlocks.join(' '));
  }

  __renderMathToTex(mathBlock) {
    // Need to strip out the prefix (```math) and the suffix (```) from the string
    // before we pass it to katex
    let prefix = '```math';
    let pureTex = mathBlock.substring(mathBlock.indexOf(prefix) + prefix.length,
      mathBlock.lastIndexOf('```'));
    try {
      return katex.renderToString(pureTex);
    } catch(e) {
      this.alerts = e;
      return '';
    }
  }
}

EditorController.$inject = ['$timeout', '$sce'];
export default EditorController;