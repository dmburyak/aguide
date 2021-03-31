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
}

export interface Article {
  id?: string;
  category: Category;
  title: string;
  content: string;
  sortNumber: number;
}
