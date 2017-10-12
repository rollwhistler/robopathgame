import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {BasicLayoutComponent} from './basicLayout.component';
import {FooterComponent} from './footer/footer.component';
import {TopNavbarComponent} from './topnavbar/topnavbar.component';
import {NavigationComponent} from './navigation/navigation.component';
import {TopNavigationNavbarComponent} from './topnavbar/topnavigationnavbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PipesModule} from '../pipes/pipes.module';
import {PageTitleComponent} from './page-title/page-title.component';


@NgModule({
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent,
    PageTitleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule,
    PipesModule
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent,
    PageTitleComponent
  ],
})

export class LayoutModule {}
