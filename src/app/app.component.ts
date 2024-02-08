import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'BTHA';
  isLoginPage: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.preloader();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.activatedRoute.firstChild?.snapshot.routeConfig?.path === 'login';
      }
    });
  }

  private preloader(): void {
    setTimeout(function () {
      jQuery('#preloader').remove();
      $('#main-wrapper').addClass('show');
    }, 800);
  }

}
