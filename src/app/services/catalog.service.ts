import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  // пеменные
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  // функции
  // @ts-ignore
  getListAllProducts(): Observable<any> {
  return this.http.get(this.baseurl + '/api/v1/catalog/get/list/all/products/');
  }
  getAllProductsToCategory(Id: string): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/catalog/list/product/category/' + Id + '/');
  }
  getListAllCategory(): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/catalog/get/list/all/category/');
  }
}
