import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointService } from '../shared/services/breakpoint.service';
import { ArticleService } from '../shared/services/article.service';
import { Category } from '../shared/interfaces';
import { CategoryService } from '../shared/services/category.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  article: any;
  firstCategory: any;
  subscription: any;

  constructor(
    public breakpointService: BreakpointService,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {

    const initStream$ = this.categoryService.getAllCategories()
      .pipe(
        map(response => {
          this.categories = response;
          return this.categoryService.getFirstCategory(this.categories);
        }),
        mergeMap(category => {
          return this.articleService.getArticlesByCategoryName(category.categoryName);
        })
      );

    this.subscription = initStream$.subscribe(res => {
      this.article = this.articleService.getFirstArticle(res);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
