import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynRoutesRoutingModule } from './dyn-routes-routing.module';
import {NavigationStart, Router} from '@angular/router';
import {catchError, delay, filter, map, mergeMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject, EMPTY, of} from 'rxjs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynRoutesRoutingModule
  ]
})
export class DynRoutesModule {
  segZero = '';
  state = new BehaviorSubject({resolving: false});
  constructor(router: Router) {
    router.events.pipe(
      filter(x => x instanceof NavigationStart),
      map((x: NavigationStart) => x.url.split('/').filter(Boolean)[0]),
      tap(x => this.segZero = x),
    ).subscribe();
    const lookup = () => {
      return of(this.segZero).pipe(
        tap(x => this.state.next({resolving: true})),
        delay(1000),
        mergeMap((prev) => {
          const moduleName = prev[0].toUpperCase() + prev.slice(1) + 'Module';
          return import(/* webpackChunkName: "[request]_root" */`../lazy/${prev}/${prev}.module`).then(x => x[moduleName]);
        }),
        take(1),
        tap(() => this.state.next({resolving: false})),
        catchError(x => {
          console.log('ERRR', x);
          return EMPTY;
        })
      );
    };
    router.resetConfig([
      ...router.config,
      {
        path: '**',
        loadChildren: lookup
      }
    ]);
  }
}
