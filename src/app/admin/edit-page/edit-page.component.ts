import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Article, Category } from '../../shared/interfaces';
import { ArticleService } from '../../shared/services/article.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { CategoryService } from '../../shared/services/category.service';
import { SortNumbersService } from '../../shared/services/sort-numbers.service';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  @ViewChild('ngForm') private ngForm!: NgForm;

  submitted = false;
  isNewCategorySortNumberHidden = true;

  title = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  text = new FormControl('', Validators.required);
  newCategory = new FormControl('');
  newCategorySortNumber = new FormControl('');

  addForm = new FormGroup({
    title: this.title,
    category: this.category,
    text: this.text,
    newCategory: this.newCategory,
    newCategorySortNumber: this.newCategorySortNumber
  });

  allCategories: Category[] = [];
  maxArticleSortNumber = 0;
  article!: Article;
  sortNumber!: number;
  id = '';

  constructor(
    private articleService: ArticleService,
    private snackBarService: SnackBarService,
    private categoryService: CategoryService,
    private sortNumberService: SortNumbersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    const getCategories = this.categoryService.getAllCategories()
      .pipe(map(
        (categories) => {
          this.allCategories = categories.sort((a, b) => a.categorySortNumber - b.categorySortNumber);
        }
        )
      );

    const getArticle = this.activatedRoute.params
      .pipe(mergeMap(params => {
          this.id = params.id;
          return this.articleService.getArticlesById(params.id);
        }
      ));

    getCategories.pipe(mergeMap(() => getArticle))
      .subscribe(article => {
        this.article = article;
        this.title.setValue(article.content.title);
        this.category.setValue(
          this.allCategories.find(category => category.id === article.categoryId)?.categoryName
        );
        this.text.setValue(article.content.text);
        this.sortNumber = article.sortNumber;
      });

  }

  setVisibility(): void {
    this.category.value === 'new'
      ? this.isNewCategorySortNumberHidden = false
      : this.isNewCategorySortNumberHidden = true;
  }

  submit(): void {
    this.submitted = true;

    let getCategoryId$: Observable<string | undefined>;

    if (this.addForm.value.newCategory) {

      const newCategory: Category = {
        categoryName: this.addForm.value.newCategory,
        categorySortNumber: this.addForm.value.newCategorySortNumber,
      };
      getCategoryId$ = this.categoryService.createCategory(newCategory)
        .pipe(map((res) => res.name));

    } else {
      getCategoryId$ = of(this.allCategories.find(
        item => item.categoryName === this.addForm.value.category)?.id);
    }

    getCategoryId$.pipe(
      map(res => {
        this.article = {
          categoryId: res,
          content: {
            text: this.addForm.value.text,
            title: this.addForm.value.title,
          },
          sortNumber: this.sortNumber
        };
      }),
      mergeMap(res => this.articleService.updateArticle(res, this.id)),
      mergeMap(() => this.sortNumberService.updateMaxArticleNumber({article: this.maxArticleSortNumber}))
    )
      .subscribe(() => {
        this.submitted = false;
        this.snackBarService.openSnackBar('Article is updated!');
        this.ngForm.resetForm();
      });

  }

}
