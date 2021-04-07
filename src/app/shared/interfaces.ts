import { ThemePalette } from '@angular/material/core';

export interface TreeItem {
  name: string;
  selected: boolean;
  color: ThemePalette;
  treeSubItem?: TreeItem[];
}

export interface Category {
  categoryName: string;
  categorySortNumber: number;
  id?: string;
}

export interface Article {
  categoryName: string;
  content: {
    title: string;
    text: string;
  };
  sortNumber: number;
  id?: string;
}

export interface TreeNode {
  name: string;
  children?: TreeNode[];
  id?: string;
}

export interface MaxNumber {
  article: number;
  category: number;
}
