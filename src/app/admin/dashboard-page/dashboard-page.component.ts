import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { merge, Subscription } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import { Category, TreeItem } from '../../shared/interfaces';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy {

  allArticles: any[] = [];
  selectedArticles: any[] = [];
  allCategories: Category[] = [];
  selectedCategoryNames: string[] = [];

  treeItem: TreeItem = {
    name: 'Select all',
    selected: false,
    color: 'primary',
    treeSubItem: []
  };

  private articleSubscription!: Subscription;

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService
  ) {
  }

  selectCategory(categoryNames: string[]): void {
    this.allArticles = this.allArticles.filter(article => categoryNames.includes(article.categoryName));
  }

  ngOnInit(): void {

    const getArticle = this.articleService.getAllArticles()
      .pipe(
        map((res) => {
          this.selectedArticles = this.allArticles = res.map(article => {
            return {
              categoryName: article.categoryName,
              categoryId: article.categoryId,
              articleTitle: article.content.title,
              id: article.id,
              sortNumber: article.sortNumber
            };
          }).sort((a, b) => a.sortNumber - b.sortNumber);
        })
      );

    const getCategories = this.categoryService.getAllCategories()
      .pipe(
        map((result) => {
          this.allCategories = result;
          const allItems: TreeItem[] = result
            .sort((a, b) => a.categorySortNumber - b.categorySortNumber)
            .map((category) => ({name: category.categoryName, selected: false, color: 'primary'}));
          this.treeItem = {
            name: 'Select all',
            selected: false,
            color: 'primary',
            treeSubItem: allItems
          };
        })
      );

    this.articleSubscription = merge(getArticle, getCategories)
      .subscribe(() => this.fillCategoryNames());

  }

  fillCategoryNames(): void {
    this.allArticles.map(
      article => {
        const articleCategory = this.allCategories.find(category => category.id === article.categoryId);
        article.categoryName = articleCategory?.categoryName;
      }
    );
  }

  receiveTreeEvent($event: TreeItem[]): void {
    this.selectedCategoryNames = $event.filter(category => category.selected)
      .map(item => item.name);
    if (this.selectedCategoryNames.length > 0) {
      this.selectedArticles = this.allArticles.filter(article => this.selectedCategoryNames.includes(article.categoryName));
    } else {
      this.selectedArticles = this.allArticles;
    }
  }

  receiveSortNumberEvent($event: string[]): void {
    const newSortNumber = {
      sortNumber: +$event[0]
    };

    const inputId = $event[1];
    this.articleService.updateArticle(newSortNumber, inputId)
      .subscribe(() => {
          this.snackBarService.openSnackBar('Position number is updated');
          const articleIndex = this.allArticles.findIndex(article => article.id === inputId);

          this.allArticles[articleIndex].sortNumber = newSortNumber.sortNumber;

          this.allArticles = this.allArticles.sort((a, b) => a.sortNumber - b.sortNumber);

          if (this.selectedCategoryNames.length > 0) {
            this.selectedArticles = this.allArticles.filter(article => this.selectedCategoryNames.includes(article.categoryName));
          } else {
            this.selectedArticles = this.allArticles.slice();
          }

        }
      );
  }


  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }


}
