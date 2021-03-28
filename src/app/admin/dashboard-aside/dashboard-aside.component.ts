import {ThemePalette} from '@angular/material/core';
import {Component} from '@angular/core';

export interface Category {
  name: string;
  selected: boolean;
  color: ThemePalette;
  subcategory?: Category[];
}

@Component({
  selector: 'app-dashboard-aside',
  templateUrl: './dashboard-aside.component.html',
  styleUrls: ['./dashboard-aside.component.scss']
})
export class DashboardAsideComponent {


  category: Category = {
    name: 'Select all',
    selected: false,
    color: 'primary',
    subcategory: [
      {name: 'Взаимодействие компонентов', selected: false, color: 'primary'},
      {name: 'Accent', selected: false, color: 'primary'},
      {name: 'Warn', selected: false, color: 'primary'}
    ]
  };

  allSelect = false;

  updateAllSelect(): void {
    this.allSelect = this.category.subcategory != null && this.category.subcategory.every(t => t.selected);
  }

  someSelect(): boolean {
    if (this.category.subcategory == null) {
      return false;
    }
    return this.category.subcategory.filter(t => t.selected).length > 0 && !this.allSelect;
  }

  setAll(selected: boolean): void {
    this.allSelect = selected;
    if (this.category.subcategory == null) {
      return;
    }
    this.category.subcategory.forEach(t => t.selected = selected);
  }
}
