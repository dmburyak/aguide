import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import { TreeItem } from '../../shared/interfaces';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy {

  allArticles: any[] = [];
  selectedArticles: any[] = [];
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

    this.articleSubscription = this.articleService.getAllArticles()
      .subscribe((res) => {
        this.selectedArticles = this.allArticles = res.map(article => {
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
        const allCategories: TreeItem[] = result
          .sort((a, b) => a.categorySortNumber - b.categorySortNumber)
          .map((category) => ({name: category.categoryName, selected: false, color: 'primary'}));
        this.treeItem = {
          name: 'Select all',
          selected: false,
          color: 'primary',
          treeSubItem: allCategories
        };
      });

  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
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
            console.log(this.selectedArticles);
          }

        }
      );
  }

}
