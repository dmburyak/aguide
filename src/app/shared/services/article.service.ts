import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../interfaces';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor(private http: HttpClient) {
  }

  createArticle(article: Article): Observable<any> {
    return this.http.post(`${environment.fbUrl}/article.json`, article);
  }

  getArticlesByCategoryName(categoryName: string): Observable<Article[]> {
    return this.http.get(`${environment.fbUrl}/article.json?orderBy="category/categoryName"&equalTo="${categoryName}"`)
      .pipe(map((res: any) => Object.keys(res)
        .map(key => ({...res[key], id: key}))
      ));
  }

  getFirstArticle(articles: Article[]): Article {
    const minArticleSortNumber = Math.min(...articles.map((article: Article) => article.sortNumber));
    return articles.find((article: Article) => article.sortNumber === minArticleSortNumber) as Article;
  }

  getAllArticles(): Observable<any[]> {
    return this.http.get(`${environment.fbUrl}/article.json`)
      .pipe(map((res: { [key: string]: any }) => Object.keys(res)
        .map(key => ({...res[key], id: key}))
      ));
  }

  /*
        getById(): Observable<any> {
          return this.http.get(`url/article/id.json`);
        }

        update(article: Article): Observable<any> {
          return this.http.patch(`url/article/id.json`, article);
        }

        remove(id: string): Observable<any> {
          return this.http.delete(`url/article/id.json`);
        }
      */
}
