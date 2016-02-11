import 'angular';
import 'reflect-metadata';
import 'angular-ui-router';
import {bootstrap} from 'ng-forward';
import {componentHooks} from 'ng-forward/cjs/decorators/component';
import App from './components/app/app';
import config from './app.config';
componentHooks._beforeCtrlInvoke.push((caller, injects, controller, ddo, $injector, locals) => {
    locals.$element.addClass(locals.$element[0].tagName.toLowerCase() + '-component');
});

componentHooks._extendDDO.push((ddo) => {
    ddo.controllerAs = 'ctrl';
});

bootstrap(App, ['ui.router',config.name]);