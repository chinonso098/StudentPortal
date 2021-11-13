import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { WithProperty } from '../iwithproperty';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private serviceUrl='https://localhost:5001/api/';
  private _httpClient;
  
  constructor(httpClient:HttpClient)
  {
    this._httpClient = httpClient;
  }

  getEntities<T>(ctrlName:string): Observable<T[]>{
     const url = `${this.serviceUrl}${ctrlName}`;
      return this._httpClient.get<T[]>(url).pipe(
          tap(data => console.log('getEntities:', JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  getEntity<T>(ctrlName:string, id: number): Observable<T | undefined>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.serviceUrl}${ctrlName}/${id}`;
    return this._httpClient.get<T>(url, {headers: headers})
      .pipe(tap( data => console.log('getEntity:' + JSON.stringify(data))),
            //Return the entity with updated id on create
            map(data => data),
            catchError(this.handleError)
      );
  }

  createEntity<T>(ctrlName:string, entity: T): Observable<T>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.serviceUrl}${ctrlName}`;

    return this._httpClient.post<T>(url, entity, {headers: headers})
      .pipe(tap( data => console.log('createEntity:' + JSON.stringify(data))),
            //Return the entity with updated id on create
            map(data => data),
            catchError(this.handleError)
      );
  }

  updateEntity<T extends WithProperty>(ctrlName:string, entity: T): Observable<T> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.serviceUrl}${ctrlName}`;

    return this._httpClient.put<T>(url, entity, {headers: headers})
      .pipe(tap(() => console.log('updateEnttity: ' + entity.ID)),
            //Return the product on an update
            map(() => entity),
            catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse){

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
    } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
