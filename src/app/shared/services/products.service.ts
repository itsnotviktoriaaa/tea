import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {CreateOrderType, ResponseOrderType} from "../../../types/createOrder.type";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product!: ProductType;

  searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getSearch(search: string): Observable<ProductType[]> {
    const params = new HttpParams().set('search', search);
    return this.http.get<ProductType[]>('https://testologia.site/tea', {params})
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.site/tea')
  }

  getProduct(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

  createOrder(data: CreateOrderType): Observable<ResponseOrderType> {
    return this.http.post<ResponseOrderType>('https://testologia.site/order-tea', data)
  }

}
