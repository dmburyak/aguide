import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortNumbersService {

  constructor(private http: HttpClient) {
  }

  getMaxCategoryNumber(): Observable<any> {
    return this.http.get(`${environment.fbUrl}/sort-numbers/category.json`);
  }

  getMaxArticleNumber(): Observable<any> {
    return this.http.get(`${environment.fbUrl}/sort-numbers.json`);
  }

  updateMaxNumber(data: any): Observable<any> {
    return this.http.patch(`${environment.fbUrl}/sort-numbers.json`, data);
  }

}
