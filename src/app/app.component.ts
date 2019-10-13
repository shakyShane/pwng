import { Component } from '@angular/core';
import {DynRoutesModule} from './dyn-routes/dyn-routes.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-rout';
  state = this.routesModule.state;
  constructor(public routesModule: DynRoutesModule) {}
}
