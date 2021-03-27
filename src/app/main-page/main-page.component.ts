import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../shared/breakpoint.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  constructor(public breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
  }

}
