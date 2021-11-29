import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { HttpClient } from "@angular/common/http"
import { EMPTY, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public baseUrl = "http://localhost:3001/products"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  public showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X',{
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError? ['msg-error']:['msg-success']
    })
  }

  public create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map( obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  public read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map( obj => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  public readyById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map( obj => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product).pipe(
      map( obj => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  public delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).pipe(
      map( obj => obj),
      catchError(e => this.errorHandler(e))
    );;
  }

  private errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }
}
