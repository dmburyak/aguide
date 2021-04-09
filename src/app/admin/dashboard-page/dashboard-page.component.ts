import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  allArticles: any[] = [];
  allCategories: any[] = [];

  private articleSubscription!: Subscription;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {

    this.articleSubscription = this.articleService.getAllArticles()
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

    this.categoryService.getAllCategories()
      .subscribe((result) => {
        this.allCategories = result
          .sort((a, b) => a.categorySortNumber - b.categorySortNumber)
          .map((category) => ({name: category.categoryName, selected: false, color: 'primary'}));
      });

  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
}
