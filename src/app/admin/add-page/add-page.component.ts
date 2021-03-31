import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ArticleService } from '../../shared/services/article.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Article } from '../../shared/interfaces';

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
  content = new FormControl('', Validators.required);
  newCategory = new FormControl('');
  newCategorySortNumber = new FormControl('');

  constructor(private articleService: ArticleService, private snackBarService: SnackBarService) {
  }

  addForm = new FormGroup({
    title: this.title,
    category: this.category,
    content: this.content,
    newCategory: this.newCategory,
    newCategorySortNumber: this.newCategorySortNumber
  });

  ngOnInit(): void {
  }

  submit(): void {
    this.submitted = true;
    let maxArticleSortNumber = 10;
    const article: Article = {
      content: this.content.value,
      title: this.title.value,
      sortNumber: maxArticleSortNumber++,
      category: {
        categoryName: this.newCategory.value ? this.newCategory.value : this.category.value,
        categorySortNumber: this.newCategorySortNumber.value
      }
    };

    this.articleService.create(article).subscribe(
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
  }

}
