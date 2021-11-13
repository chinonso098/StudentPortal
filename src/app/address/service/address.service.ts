import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Address } from "../model/address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private serviceUrl='https://localhost:44332/api/Address';
  private _httpClient;
  
  constructor(httpClient:HttpClient)
  {
    this._httpClient = httpClient;
  }

  getAddress(id: number): Observable<Address | undefined>{
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      let url = `${this.serviceUrl}/${id}`;
      return this._httpClient.get<Address>(url, {headers: headers}).pipe(
          map(add => add),
          catchError(this.handleError)
      );
  }

  createAddress(address: Address): Observable<Address>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._httpClient.post<Address>(this.serviceUrl, address, {headers: headers})
      .pipe(tap( data => console.log('create: ' + JSON.stringify(data))),
            //Return the product with updated id on create
            map(data => data),
            catchError(this.handleError)
      );
  }

  updateAddress(address: Address): Observable<Address> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._httpClient.put<Address>(this.serviceUrl, address, {headers: headers})
      .pipe(tap(() => console.log('updateAddress: ' + address.addressID)),
            //Return the product on an update
            map(() => address),
            catchError(this.handleError)
      );
  }
  
  private handleError(err: HttpErrorResponse){

    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
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
