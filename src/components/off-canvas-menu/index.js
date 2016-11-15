import {Component, Inject} from 'ng-forward';
import './styles.css';

@Component({
  selector: 'off-canvas-menu',
  template: require('./template.html'),
})
export default class OffCanvasMenu {
  constructor() {
    this.open = false;
  }

  toggle() {
    this.open = !this.open;
  }
}
