import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import {LoopBackAuth} from '../../sdk/services/core/auth.service';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit, AfterViewInit {

  user: {};

  constructor(
    private router: Router,
    private loopBackAuth: LoopBackAuth
  ) {}

  ngOnInit(): void {
    this.user = this.loopBackAuth.getCurrentUserData();
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }


}
