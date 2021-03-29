import {ThemePalette} from '@angular/material/core';

export interface TreeItem {
  name: string;
  selected: boolean;
  color: ThemePalette;
  treeSubItem?: TreeItem[];
}

export interface Article {
  id?: string;
  category: string;
  title: string;
  content: string;
}
