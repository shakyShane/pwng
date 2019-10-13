import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DynRoutesModule} from './dyn-routes/dyn-routes.module';
import {HomeComponent} from './home/home/home.component';
import {HomeModule} from './home/home.module';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DynRoutesModule, HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
