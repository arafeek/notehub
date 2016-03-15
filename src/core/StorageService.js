import { Injectable, Inject } from 'ng-forward';
import nibelung from 'nibelung';

/*
 * TODO: Think about renaming this to FileService or something like that.
 *       It's pretty much only used for file storage and management.
 */
@Injectable()
export default class StorageService {
  constructor() {
    this.nibelung = nibelung;
    this.hoard = new this.nibelung.Hoard({
      namespace: 'NH-records',
      persistent: true,
      logger: console.log,
    });
    // this.records will hold an up to date version of all saved records
    this.records = this.hoard.getLatest() || [];
    this.hoard.on('PUT', ()=>{this._handleChange()});
    this.hoard.on('REMOVE', ()=>{this._handleChange()});
    this.currentRecord = this.records[0] || {};
  }

  addRecord(name, data) {
    const { hoard } = this;
    data.lastSave = new Date();
    data.id = name;
    return hoard.putOne(name, data);
  }

  deleteRecords(name) {
    const { hoard } = this;
    return hoard.deleteOne(name);
  }

  getRecord(name) {
    const { hoard } = this;
    return hoard.getOne(name);
  }

  getRecords(time) {
    const { hoard } = this;
    return hoard.getLatest(time);
  }

  setCurrentRecord(record) {
    this.currentRecord = record;
  }

  _handleChange() {
    this.records = this.hoard.getLatest();
  }
}