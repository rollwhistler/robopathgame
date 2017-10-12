import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'page-title',
  templateUrl: 'page-title.template.html'
})
export class PageTitleComponent implements OnInit {

  title: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.title = this.determineTitle(this.router.routerState.snapshot.root);
      });

    this.title = this.determineTitle(this.activatedRoute.snapshot.root);
  }

  private determineTitle(route: ActivatedRouteSnapshot, title: string = null) {
    return route.firstChild
      ? this.determineTitle(route.firstChild, route.data.title || title)
      : route.data.title || title;

  }
}
