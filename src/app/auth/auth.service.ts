import { Injectable } from '@angular/core';
import { USER_API } from '../routes/routesFile';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  IUser } from '../shared/models/user.model';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { ILoginRequest, ILoginResponse } from '../shared/models/login.model';
import { IErrorResponse, IVerifyTokenResponse } from '../shared/models/common.model';
import { ILogoutResponse, IRegisterRequest, IRegisterResponse } from '../shared/models/register.model';
import { IOtpVerifyRequest, IOtpVerifyResponse } from '../shared/models/otp.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private api:string = USER_API.AUTH;
 public userDataSubject = new BehaviorSubject<IUser|null>(null);
// public isLoggedInSubject = new BehaviorSubject<boolean>(false)
  constructor(public http:HttpClient) { }

login(credentials:ILoginRequest):Observable<ILoginResponse>{
  return this.http.post<ILoginResponse>(`${this.api}/login`,credentials).pipe(
    catchError(this.handleError)
  )
}

register(credentials:IRegisterRequest):Observable<IRegisterResponse>{
  return this.http.post<IRegisterResponse>(`${this.api}/register`,credentials).pipe(
    catchError(this.handleError)
  )
}

verifyOtp(credentials: IOtpVerifyRequest): Observable<IOtpVerifyResponse> {
  return this.http.post<IOtpVerifyResponse>(`${this.api}/verify-otp`, credentials).pipe(
    catchError(this.handleError)
  );
}

verifyToken(): Observable<IVerifyTokenResponse> {
  return this.http.get<IVerifyTokenResponse>(`${this.api}/verify-token`).pipe(
    catchError(this.handleError)
  );
}

logout(): Observable<ILogoutResponse>{
  return this.http.get<ILogoutResponse>(`${this.api}/logout`).pipe(
    catchError(this.handleError)
  )
}

// isLoggedIn$(): Observable<boolean> {
//     return this.isLoggedInSubject.asObservable();
//   }

//   setLoggedInStatus(status: boolean): void {
//     this.isLoggedInSubject.next(status);
//   }

  isUserExisted$(): Observable<boolean> {
    return of(localStorage.getItem('userData') !== null);
  }

 setUserData(user: IUser): void {
    this.userDataSubject.next(user);
  }

  getUserData(): Observable<IUser|null> {
    return this.userDataSubject.asObservable();
  }

  removeUserData():void{
  localStorage.removeItem("userData");
  this.userDataSubject.next(null);
  }

  removeToken():void {
    localStorage.removeItem("Token")
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
