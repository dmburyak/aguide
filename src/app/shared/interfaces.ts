import { ThemePalette } from '@angular/material/core';

export interface TreeItem {
  name: string;
  selected: boolean;
  color: ThemePalette;
  treeSubItem?: TreeItem[];
}

export interface Article {
  id?: string;
  category: {
    categoryName: string,
    categorySortNumber: number
  };
  title: string;
  content: string;
  sortNumber: number;
}
