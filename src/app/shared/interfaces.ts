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
  category: Category;
  content: {
    title: string;
    text: string;
  };
  sortNumber: number;
  id?: string;
}
