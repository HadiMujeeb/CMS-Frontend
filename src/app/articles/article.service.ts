import { Injectable } from '@angular/core';
import { USER_API } from '../routes/routesFile';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IArticle, IGetArticleResponce, IgetEditArticleReponse, IReponse, IRequestCreateArticle, IRequestEditArticle } from '../shared/models/article.model';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { IErrorResponse } from '../shared/models/common.model';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
private api:string = USER_API.ARTICLE;
  constructor(public http:HttpClient) { }
  private selectedArticleSubject = new BehaviorSubject<IArticle | null>(null);
  private allArticleSubject = new BehaviorSubject<IArticle[]|null>(null);
  selectedArticle$ = this.selectedArticleSubject.asObservable();
  allArticle$ = this.allArticleSubject.asObservable();

  setAllArticle(allArticle:IArticle[]|null){
    this.allArticleSubject.next(allArticle);
  }

  setSelectedArticle(article: IArticle) {
    this.selectedArticleSubject.next(article);
  }

  clearSelectedArticle() {
    this.selectedArticleSubject.next(null);
  }



  createArticle(credentials:IRequestCreateArticle):Observable<IReponse>{
    return this.http.post<IReponse>(`${this.api}/create`,credentials).pipe(
      catchError(this.handleError)
    )
  }

  editArticle(credentials:IRequestEditArticle):Observable<IReponse>{
    return this.http.post<IReponse>(`${this.api}/edit`,credentials).pipe(
      catchError(this.handleError)
    )
  }

  deleteArticle(id:string):Observable<IReponse>{
    return this.http.delete<IReponse>(`${this.api}/delete`, {params:{id}}).pipe(
      catchError(this.handleError)
    )
  }

  getAllArticle():Observable<IGetArticleResponce>{
    return this.http.get<IGetArticleResponce>(`${this.api}/getArticles`).pipe(
      catchError(this.handleError)
    )
  }
  getArticle(id:string):Observable<IgetEditArticleReponse>{
    return this.http.get<IgetEditArticleReponse>(`${this.api}/getEditArticle`,{params:{id}}).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse):Observable<never> {
     const errRes: IErrorResponse = {
        statusCode: error.status,
        message: error.error?.message || 'An unexpected error occurred',
        error: error.error?.error || 'Unknown Error',
        key:error.error?.key
      };
      return throwError(() => errRes);
  }  
}


