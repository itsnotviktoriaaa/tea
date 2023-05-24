import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {CreateOrderType, ResponseOrderType} from "../../../types/createOrder.type";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product!: ProductType;

  constructor(private http: HttpClient) {
  }


  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.site/tea')
  }

  getProduct(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

  createOrder(data: CreateOrderType) {
    return this.http.post<ResponseOrderType>('https://testologia.site/order-tea', data)
  }

}
