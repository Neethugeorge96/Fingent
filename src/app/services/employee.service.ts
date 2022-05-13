import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 headingData =new BehaviorSubject<any>({})
  constructor(private http:HttpClient,
    ) { }


    getEmployeeList(){
      let  api = 'https://jsonplaceholder.typicode.com/users' ;

      return this.http.get<any>(api).pipe(
        tap(res => res),
        catchError(this.errorHandler))
    }

    getTaskDetails(id:any){
      let api = 'https://jsonplaceholder.typicode.com/users/' + id +'/todos'
      return this.http.get<any>(api).pipe(
        tap(res=>res),
        catchError(this.errorHandler)
      )
    }


    errorHandler(error: HttpErrorResponse) {
      return throwError(error.message || 'Service Error');
    }

    getHeadingData(){
      return this.headingData
    }
     setHeadingData(data:any){
      this.headingData.next(data)
     }
}
