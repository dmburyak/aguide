import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../interfaces';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input()
  set tree(data: any[]) {
    this.dataSource.data = data;
  }

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  items = false;

  constructor() {
  }

  hasChild = (_: number, node: TreeNode) => !!node.children;

  emptyChild(node: TreeNode): boolean {
    return !!node.children && node.children.length === 0;
  }

  ngOnInit(): void {
   // console.log(this.dataSource.data);
    // this.dataSource.data = [{name: 'Loading...'}];
  }
}
