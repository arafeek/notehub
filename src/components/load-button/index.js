import {Component, Inject, EventEmitter} from 'ng-forward';
import StorageService from '../../core/StorageService';

@Component({
  selector: 'load-button',
  template: require('./template.html'),
  providers: [StorageService],
  outputs: ['loadedFile'],
})
@Inject(StorageService)
export default class LoadButton {
  constructor(StorageService) {
    this.storage = StorageService;
    this.loadedFile = new EventEmitter();
  }

  getSavedRecords() {
    const { storage } = this;
    return storage.getRecords();
  }

  loadRecord(name) {
    const { storage, loadedFile } = this;
    loadedFile.next(storage.getRecord(name));
  }
}