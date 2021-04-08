import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  allArticles: any[] = [];
  /*
  {
    categoryName: 'ccc1',
    articleTitle: 'qwewqe',
    id: '-MXga-GadVqqbLzukQvR',
    sortNumber: 2
  },
  {
    categoryName: 'ccc2',
    articleTitle: 'sdfsdfsdf',
    id: '-MXgbnDQ14BbDMBukAny',
    sortNumber: 3
  },
  {
    categoryName: 'ccc3',
    articleTitle: 'sdfsdfsdf',
    id: '-MXgbtv4caip2bIXEoRd',
    sortNumber: 4
  },
  {
    categoryName: 'ccc1',
    articleTitle: 'wewewe',
    id: '-MXggFtavJ6DJY-4-Hvb',
    sortNumber: 5
  }
];
*/

  private subscription!: Subscription;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.subscription = this.articleService.getAllArticles()
      .subscribe((res) => {
        this.allArticles = res.map(article => {
          return {
            categoryName: article.categoryName,
            articleTitle: article.content.title,
            id: article.id,
            sortNumber: article.sortNumber
          };
        }).sort((a, b) => a.sortNumber - b.sortNumber);
        console.log(this.allArticles);
      });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
