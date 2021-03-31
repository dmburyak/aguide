import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '../shared/services/breakpoint.service';
import { ArticleService } from '../shared/services/article.service';
import { Article, Category } from '../shared/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  articles: Article[] = [];
  categories: Category[] = [];
  article: any;

  constructor(public breakpointService: BreakpointService, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getAll()
      .subscribe((response) => {
        this.articles = response;
        this.categories = response.map(article => article.category);
        const minCategorySortNumbers = Math.min(...this.categories.map((category: any) => category.categorySortNumber));
        const firstCategory = this.categories.find((category: any) => category.categorySortNumber === minCategorySortNumbers);
        this.article = this.articles.find(article => article.category === firstCategory);
      });
  }

}
