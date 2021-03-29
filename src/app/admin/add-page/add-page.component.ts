import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from '../../shared/services/article.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  constructor(private articleService: ArticleService) {
  }

  addForm = new FormGroup({
    title: new FormControl('',),
    category: new FormControl(''),
    content: new FormControl('')
  });

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.addForm.value);
    this.articleService.create(this.addForm.value).subscribe(
      () => console.log('Ok')
    );
  }
}
