import { Injectable } from '@angular/core';
import { Category } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(`${environment.fbUrl}/category.json`, category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(`${environment.fbUrl}/category.json`)
      .pipe(map((res: any) => Object.keys(res)
        .map(key => ({...res[key], id: key}))
      ));
  }

  updateCategoryName(id: string, categoryName: string): Observable<any> {
    return this.http.patch(`${environment.fbUrl}/category/${id}.json`, {categoryName});
  }

  updateCategoryPosition(id: string, categorySortNumber: number): Observable<any> {
    return this.http.patch(`${environment.fbUrl}/category/${id}.json`, {categorySortNumber});
  }

}
