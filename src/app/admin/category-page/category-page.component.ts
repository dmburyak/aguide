import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/interfaces';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'position'];

  allCategories: Category[] = [];

  nameControls = {};
  names: any;
  namesGroup: any;

  positionControls = {};
  positions: any;
  positionsGroup: any;

  newCategoryGroup: any;
  get newCategoryName(): any { return this.newCategoryGroup.get('newCategoryName'); }
  get newCategoryPosition(): any { return this.newCategoryGroup.get('newCategoryPosition'); }

  constructor(
    private categoryService: CategoryService,
    private snackBarService: SnackBarService
  ) {
  }

  createFormControlsForTable(): void {
    this.allCategories.map((category: Category) => {

      // @ts-ignore
      this.nameControls[category.id] = new FormControl(category.categoryName, Validators.required);
      // @ts-ignore
      this.positionControls[category.id] = new FormControl(category.categorySortNumber, Validators.required);
    });

    this.namesGroup = new FormGroup(this.nameControls);
    this.positionsGroup = new FormGroup(this.positionControls);
  }

  ngOnInit(): void {

    this.newCategoryGroup = new FormGroup({
      newCategoryName: new FormControl('', Validators.required),
      newCategoryPosition: new FormControl('', Validators.required)
    });

    this.categoryService.getAllCategories()
      .subscribe((result) => {
          this.allCategories = result.sort(
            (a, b) => a.categorySortNumber - b.categorySortNumber);

          this.createFormControlsForTable();

          this.dataSource.data = this.allCategories;

        }
      );

  }

  updateCategoryName($event: any, control: FormControl): void {
    if (control.invalid || control.pristine) {
      console.log('invalid');
      return;
    } else {
      const inputId = ($event.target as HTMLInputElement).name;
      const inputValue = ($event.target as HTMLInputElement).value;
      this.categoryService.updateCategoryName(inputId, inputValue)
        .subscribe((res) => {
            console.log(res);
            this.snackBarService.openSnackBar('Category Name is updated');
          }
        );

    }
  }

  updateCategoryPosition($event: any, control: FormControl): void {
    if (control.invalid || control.pristine) {
      return;
    } else {
      const inputId = ($event.target as HTMLInputElement).name;
      const inputValue = +($event.target as HTMLInputElement).value;
      this.categoryService.updateCategoryPosition(inputId, inputValue)
        .subscribe((res) => {
            this.snackBarService.openSnackBar('Category Position is updated');
            // @ts-ignore
            this.allCategories.find(category => category.id === inputId).categorySortNumber = inputValue;
            this.allCategories.sort((a, b) => a.categorySortNumber - b.categorySortNumber);
            this.dataSource.data = this.allCategories.slice();
          }
        );

    }
  }


  createNewCategory(): void {
    const newCategory: Category = {
      categoryName: this.newCategoryName.value,
      categorySortNumber: this.newCategoryPosition.value
    };

    this.categoryService.createCategory(newCategory)
      .subscribe((res) => {
        this.snackBarService.openSnackBar('New Category is created');
        newCategory.id = res.name;

        this.allCategories.push(newCategory);
        this.allCategories.sort((a, b) => a.categorySortNumber - b.categorySortNumber);

        this.createFormControlsForTable();

        this.dataSource.data = this.allCategories.slice();

        this.formDirective.resetForm();

      });
  }


}
