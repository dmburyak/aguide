import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import { TreeItem } from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy {

  allArticles: any[] = [];
  selectedArticles: any[] = [];

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
  ) {
  }

  selectCategory(categoryNames: string[]): void {
    this.allArticles = this.allArticles.filter(article => categoryNames.includes(article.categoryName));
    console.log(this.allArticles);
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
    const selectedCategoryNames = $event.filter(category => category.selected)
      .map(item => item.name);
    if (selectedCategoryNames.length > 0) {
      this.selectedArticles = this.allArticles.filter(article => selectedCategoryNames.includes(article.categoryName));
    } else {
      this.selectedArticles = this.allArticles;
    }
  }

}
