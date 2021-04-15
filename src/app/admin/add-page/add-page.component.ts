import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ArticleService } from '../../shared/services/article.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Article, Category } from '../../shared/interfaces';
import { CategoryService } from '../../shared/services/category.service';
import { SortNumbersService } from '../../shared/services/sort-numbers.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  @ViewChild('ngForm') private ngForm!: NgForm;

  submitted = false;

  title = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  text = new FormControl('', Validators.required);
  newCategory = new FormControl('');
  newCategorySortNumber = new FormControl('');

  allCategories: Category[] = [];

  newArticle: Article = {
    categoryId: '',
    content: {
      title: '',
      text: '',
    },
    sortNumber: 0
  };

  isNewCategorySortNumberHidden = true;

  constructor(
    private articleService: ArticleService,
    private snackBarService: SnackBarService,
    private categoryService: CategoryService,
    private sortNumberService: SortNumbersService
  ) {
  }

  addForm = new FormGroup({
    title: this.title,
    category: this.category,
    text: this.text,
    newCategory: this.newCategory,
    newCategorySortNumber: this.newCategorySortNumber
  });

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe(
        (categories) => {
          this.allCategories = categories.sort((a, b) => a.categorySortNumber - b.categorySortNumber);
        }
      );
  }

  submit(): void {
    this.submitted = true;

    let setCategoryId: Observable<Article>;

    if (this.newCategory.value) {
      const category: Category = {
        categoryName: this.newCategory.value,
        categorySortNumber: this.newCategorySortNumber.value,
      };
      setCategoryId = this.categoryService.createCategory(category)
        .pipe(map(res => {
          this.newArticle.categoryId = res.name;
          return this.newArticle;
        }));
    } else {
      setCategoryId = of(
        this.newArticle.categoryId = this.allCategories
          .find(item => item.categoryName === this.category.value)?.id
         )
        .pipe(map(res => {
          this.newArticle.categoryId = res;
          return this.newArticle;
        }));
    }

    const setNewArticlePositionNumber = this.sortNumberService.getMaxNumbers()
      .pipe(map(res => {
        this.newArticle.sortNumber = ++res.article;
        this.newArticle.content = {
          text: this.text.value,
          title: this.title.value,
        };
        return this.newArticle;
      }));

    const sendNewArticle = this.articleService.createArticle(this.newArticle)
      .pipe(map(() => ({article: this.newArticle.sortNumber})));

    setCategoryId.pipe(
      mergeMap(() => setNewArticlePositionNumber),
      mergeMap(() => sendNewArticle),
      mergeMap(res => this.sortNumberService.updateMaxArticleNumber(res))
    ).subscribe(() => {
        this.submitted = false;
        this.snackBarService.openSnackBar('New Article created!');
        this.ngForm.resetForm();
      }
    );

  }

  setVisibility(): void {
   this.category.value === 'new'
     ? this.isNewCategorySortNumberHidden = false
     : this.isNewCategorySortNumberHidden = true;
  }

}
