import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Article, Category } from '../../shared/interfaces';
import { ArticleService } from '../../shared/services/article.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { CategoryService } from '../../shared/services/category.service';
import { SortNumbersService } from '../../shared/services/sort-numbers.service';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  @ViewChild('ngForm') private ngForm!: NgForm;

  submitted = false;

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
  ) {}

  ngOnInit(): void {

    this.categoryService.getAllCategories()
      .subscribe(
        (categories) => {
          this.allCategories = categories.sort((a, b) => a.categorySortNumber - b.categorySortNumber);
        }
      );

    this.activatedRoute.params
      .pipe(mergeMap(params => {
        this.id = params.id;
        return this.articleService.getArticlesById(params.id);
        }
      ))
      .subscribe(article => {
      this.article = article;
      this.title.setValue(article.content.title);
      this.category.setValue(article.categoryName);
      this.text.setValue(article.content.text);
      this.sortNumber = article.sortNumber;
      console.log(this.article);
    });

  }

  submit(): void {
    this.submitted = true;

    const category: Category = {
      categoryName: this.addForm.value.newCategory ? this.addForm.value.newCategory : this.addForm.value.category,
      categorySortNumber: this.addForm.value.newCategorySortNumber,
    };

    this.article = {
            categoryName: category.categoryName,
            content: {
              text: this.addForm.value.text,
              title: this.addForm.value.title,
            },
            sortNumber: this.sortNumber
          };

    this.articleService.updateArticle(this.article, this.id)
          .subscribe(() => {
              this.submitted = false;
              const data = {article: this.maxArticleSortNumber};
              this.sortNumberService.updateMaxNumber(data).subscribe();
              this.snackBarService.openSnackBar('New Article created!');
              this.ngForm.resetForm();
            }
          );

    if (this.addForm.value.newCategory) {
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
