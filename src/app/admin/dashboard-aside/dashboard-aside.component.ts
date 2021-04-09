import { Component, Input } from '@angular/core';
import {TreeItem} from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-aside',
  templateUrl: './dashboard-aside.component.html',
  styleUrls: ['./dashboard-aside.component.scss']
})
export class DashboardAsideComponent {

  @Input()
  set allCategories(data: any[]) {
    this.treeItem.treeSubItem = data;
  }

  treeItem: TreeItem = {
    name: 'Select all',
    selected: false,
    color: 'primary',
    treeSubItem: []
  };

  allSelect = false;

  updateAllSelect(): void {
    this.allSelect = this.treeItem.treeSubItem != null && this.treeItem.treeSubItem.every(t => t.selected);
  }

  someSelect(): boolean {
    if (this.treeItem.treeSubItem == null) {
      return false;
    }
    return this.treeItem.treeSubItem.filter(t => t.selected).length > 0 && !this.allSelect;
  }

  setAll(selected: boolean): void {
    this.allSelect = selected;
    if (this.treeItem.treeSubItem == null) {
      return;
    }
    this.treeItem.treeSubItem.forEach(t => t.selected = selected);
  }
}
