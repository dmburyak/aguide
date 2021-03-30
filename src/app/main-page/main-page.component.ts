import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../shared/services/breakpoint.service';
import { ArticleService } from '../shared/services/article.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  constructor(public breakpointService: BreakpointService, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getAll()
      .subscribe((response) => {
        console.log(response);
      });
  }

}
