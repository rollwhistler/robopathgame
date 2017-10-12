/**
 * This function is a terrible, terrible hack, which will dramatically speed up our protractor tests.
 *
 * The thought is this: If we want to navigate to a specific route, we can either reload the whole browser
 * window, or we can try to access the router directly. The former is time consuming, as we have to go through
 * asset loading and initialization again. The latter is not directly accessible, as protractor is divesting itself
 * of controls that reach into angular, and instead simply relies on accessing and manipulating the DOM.
 *
 * The solution is a two-part contract which we inject into all of our angular applications. This is the first part:
 * a method, bound to the window object during app initialization, which reaches into the angular event zone and
 * uses the router directly. The second is a protractor utility, which exposes that to our e2e specs.
 *
 * https://github.com/angular/protractor/issues/3911
 *
 */
import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, Injector, NgModule, NgZone} from '@angular/core';
import {Router} from '@angular/router';

export function testingInitializer(injector) {
  return () => {


    const router = injector.get(Router);
    const ngZone = injector.get(NgZone);

    window['protractorNavigateByUrl'] = (route) => {
      ngZone.run(() => {
        router.navigateByUrl(route, {skipLocationChange: false, replaceUrl: true});
      });
    };
    // Resolve this initializer.
    return Promise.resolve();
  };
}

@NgModule(
  {
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: testingInitializer,
        deps: [Injector],
        multi: true
      }
    ],
    imports: [
      CommonModule
    ]
  })
export class TestingModule {}
