import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeItem } from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-aside',
  templateUrl: './dashboard-aside.component.html',
  styleUrls: ['./dashboard-aside.component.scss']
})
export class DashboardAsideComponent {

  @Input()
  set tree(data: any) {
    this.treeItem = data;
  }

  @Output() treeEvent = new EventEmitter<TreeItem[]>();

  treeItem!: TreeItem;
  allSelect = false;

  updateAllSelect(): void {
    this.allSelect = this.treeItem.treeSubItem != null && this.treeItem.treeSubItem.every(t => t.selected);
    this.treeEvent.emit(this.treeItem.treeSubItem);
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
    this.treeEvent.emit(this.treeItem.treeSubItem);
  }

}
