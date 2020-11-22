import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $;
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet><ngx-spinner bdColor = "rgba(0,0,0,0.87)" size = "medium" color = "#ffffff" '+
  'type = "ball-clip-rotate-multiple" [fullScreen] = "true"><p style="color: white" > Loading... </p></ngx-spinner></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    })
  }
}
