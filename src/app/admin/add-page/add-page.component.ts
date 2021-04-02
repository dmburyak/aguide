import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ArticleService } from '../../shared/services/article.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Article, Category } from '../../shared/interfaces';
import { CategoryService } from '../../shared/services/category.service';

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

  constructor(
    private articleService: ArticleService,
    private snackBarService: SnackBarService,
    private categoryService: CategoryService
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
  }

  submit(): void {
    this.submitted = true;
    let maxArticleSortNumber = 10;

    const category: Category = {
      categoryName: this.newCategory.value ? this.newCategory.value : this.category.value,
      categorySortNumber: this.newCategorySortNumber.value,
    };

    const article: Article = {
      category,
      content: {
        text: this.text.value,
        title: this.title.value,
      },
      sortNumber: maxArticleSortNumber++
    };

    this.articleService.createArticle(article).subscribe(
      () => {
        this.submitted = false;
        this.snackBarService.openSnackBar('New Article created!');
        this.ngForm.resetForm();
      },
      (error) => {
        this.submitted = false;
        console.log(error);
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
