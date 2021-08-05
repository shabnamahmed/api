import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ApiCallService {
  

  constructor(private http : HttpClient) { }

  httpClient: any;
  private apiURL ="";
     
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json',
      'Accept':'application/json',
      'X-Tenant':'cassandra',
  
      'Access-Control-Allow-Origin': '*',
  
      "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE"
    })
  }
  getput(call: string,id:number): Observable<any> {
    this.apiURL = call;

    return this.http.put(this.apiURL+id , this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number ,call:string , data:any): Observable<any> {
    this.apiURL = call;

    return this.http.put(this.apiURL + id, JSON.stringify(data), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(call: string,data:any): Observable<any> {

    this.apiURL = call;
    return this.http.post(this.apiURL + JSON.stringify(data), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(call: string,id:number){
    this.apiURL = call;

    return this.http.delete(this.apiURL + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
