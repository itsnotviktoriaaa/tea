import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap, tap} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  sub: Subscription = new Subscription();
  loader = false;
  isExistPartOfWord = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.sub = this.productsService.searchText
      .pipe(
        tap(() => {
          this.loader = true;
        }),
        switchMap((searchText: string) => {
          if (searchText) {
            return this.productsService.getSearch(searchText);
          } else {
            return this.productsService.getProducts();
          }
        })
      )
      .subscribe((data) => {
        this.loader = false;
        this.products = data;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
