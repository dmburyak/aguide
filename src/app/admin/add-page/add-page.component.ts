import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ArticleService } from '../../shared/services/article.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Article, Category } from '../../shared/interfaces';
import { CategoryService } from '../../shared/services/category.service';
import { SortNumbersService } from '../../shared/services/sort-numbers.service';
import { map } from 'rxjs/operators';

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
  maxArticleSortNumber = 0;
  article!: Article;

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

    const category: Category = {
      categoryName: this.newCategory.value ? this.newCategory.value : this.category.value,
      categorySortNumber: this.newCategorySortNumber.value,
    };

    const prepareArticle = this.sortNumberService.getMaxArticleNumber()
      .pipe(
        map((res: { article: number; }) => {
          this.maxArticleSortNumber = ++res.article;
          console.log(this.maxArticleSortNumber);
          return this.article = {
            categoryName: category.categoryName,
            content: {
              text: this.text.value,
              title: this.title.value,
            },
            sortNumber: this.maxArticleSortNumber
          };
        }));

    prepareArticle.subscribe(
      () => {
        this.articleService.createArticle(this.article)
          .subscribe(() => {
              this.submitted = false;
              const data = {article: this.maxArticleSortNumber};
              this.sortNumberService.updateMaxNumber(data).subscribe();
              this.snackBarService.openSnackBar('New Article created!');
              this.ngForm.resetForm();
            }
          );
      }
    );


    if (this.newCategory.value) {
      this.categoryService.createCategory(category).subscribe(
        () => {
          this.snackBarService.openSnackBar('New Category created!');
          this.ngForm.resetForm();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
