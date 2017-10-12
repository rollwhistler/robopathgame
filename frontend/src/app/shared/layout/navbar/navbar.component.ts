import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { LoopBackAuth } from "../../sdk/services/core/auth.service";
import { RoboUserApi } from "../../sdk/services/custom/RoboUser";
declare var jQuery: any;

@Component({
  selector: "my-navbar",
  templateUrl: "navbar.template.html"
})
export class NavbarComponent implements OnInit {
  title: string;

  constructor(
    private loopBackAuth: LoopBackAuth,
    private userApi: RoboUserApi,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        console.log("Navigation end", event);
      });
  }

  logout(): void {
    this.userApi.logout().subscribe(
      success => {
        this.router.navigateByUrl("/login");
      },
      err => {
        // don't care about the error just go to login
        this.router.navigateByUrl("/login");
      }
    );
  }
}
