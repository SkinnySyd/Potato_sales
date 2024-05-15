import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sales, SalesData } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class SalesService {

   private salesUrl = 'assets/data/potato_sales.json'; // Path to your JSON file

  // constructor(private http: HttpClient) { }

  // getSalesData(): Observable<SalesData> {
  //   return this.http.get<SalesData>(this.dataUrl).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // private handleError(error: any): Observable<never> {
  //   console.error('An error occurred:', error);
  //   return throwError('Something went wrong; please try again later.');
  // }
  

  
    // private  = 'assets/sales-data.json'; // URL to the JSON file
    
    constructor(private http: HttpClient) { }
  
    getSalesData(): Observable<Sales> {
      return this.http.get<Sales>(this.salesUrl);
    }
  }