import {Injectable, OnInit} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {Observable} from 'rxjs';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  isMobile = false;
  showSidenav = true;
  sidenavMode: MatDrawerMode = 'side';
  brObserver: Observable<BreakpointState>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.brObserver = this.breakpointObserver
      .observe(['(max-width: 599px)']);
    this.brObserver.subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.showSidenav = false;
        this.isMobile = true;
        this.sidenavMode = 'over';
      } else {
        this.showSidenav = true;
        this.isMobile = false;
        this.sidenavMode = 'side';
      }
    });
  }

}
