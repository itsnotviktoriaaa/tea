import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductsService} from "../../../shared/services/products.service";
import {SearchService} from "../../../shared/services/search.service";
import {SearchButtonService} from "../../../shared/services/search-button.service";

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

  constructor(private productsService: ProductsService,
              private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private searchService: SearchService,
              private searchButtonService: SearchButtonService) {
  }

  ngOnInit() {
    if (!this.searchButtonService.getSearch) {
      this.isExistPartOfWord = false;
      this.loader = true;
      this.sub = this.productsService.getProducts()
        .subscribe(
          {
            next: (data) => {
              this.loader = false;
              this.products = data;
              console.log(data);
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          }
        )
    }

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams) {
        const search = queryParams['search'];
        if (search) {
          const getSearch = this.searchButtonService.getSearch;
          this.searchService.getSearch(getSearch)
            .subscribe({
              next: (data) => {
                console.log(data);

                //вот отсюда как занести в this.products?? (т.е. то, что сейчас в дата. Например можно ввести "тр" в поисковике и увидеть, что отдаёт")
                //Сервер странный результат выдаёт
                // this.products = data;


                if (data.length === 0) {
                  this.products = [];
                  this.isExistPartOfWord = true;
                  console.log('если ничего не найдено, то выведет это');
                }
              },
              error: (error) => {
                //sth will happen
              }
            })
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
