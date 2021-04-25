import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})

export class DashboardContentComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['articleTitle', 'categoryName', 'sortNumber'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isEnabled = false;

  @Input()
  set selectedArticles(data: any) {
    this.dataSource.data = data;
    // console.log(data);
  }

  @Output() updatePositionNumber = new EventEmitter();

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sendSortNumberEvent($event: Event): void {
    const inputValue = ($event.target as HTMLInputElement).value;
    const inputId = ($event.target as HTMLInputElement).id;
    this.updatePositionNumber.emit([inputValue, inputId]);
  }


}
