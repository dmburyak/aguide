import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  toolbarTitle = 'Add new Article';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

}
