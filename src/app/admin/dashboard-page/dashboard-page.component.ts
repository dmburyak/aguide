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
      });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
