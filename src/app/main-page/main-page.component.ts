import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointService } from '../shared/services/breakpoint.service';
import { ArticleService } from '../shared/services/article.service';
import { Article, Category, TreeNode } from '../shared/interfaces';
import { CategoryService } from '../shared/services/category.service';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  articles: Article[] = [];
  article!: Article;
  firstCategory: any;
  firstArticleSubscription: any;
  tree: TreeNode[] = [];

  constructor(
    public breakpointService: BreakpointService,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {

    const articles$ = this.categoryService.getAllCategories()
      .pipe(
        map(response => {
          return response.sort((a, b) => a.categorySortNumber - b.categorySortNumber);
        }),
        mergeMap(response => {
          this.categories = response;

          const firstCategoryArticles = this.articleService.getArticlesByCategoryId(response[0].id);
          const allArticles = this.articleService.getAllArticles();
          return forkJoin([firstCategoryArticles, allArticles]);
        })
      );

    this.firstArticleSubscription = articles$.subscribe(result => {
      this.article = this.articleService.getFirstArticle(result[0]);
      this.articles = result[1];

      this.tree = this.categories.map((category) => {
        const articlesOfCategory = this.articles.filter(
          (article) => category.id === article.categoryId
        );
        articlesOfCategory.sort((a, b) => a.sortNumber - b.sortNumber);
        const titles: { name: string }[] = articlesOfCategory.map((article) => ({name: article.content.title, id: article.id}));
        return {name: category.categoryName, children: titles};
      });

    });

  }

  ngOnDestroy(): void {
    if (this.firstArticleSubscription) {
      this.firstArticleSubscription.unsubscribe();
    }
  }

  showArticle($event: string): void {
    this.articleService.getArticlesById($event)
      .subscribe(
        (article) => this.article = article
      );
  }
}
