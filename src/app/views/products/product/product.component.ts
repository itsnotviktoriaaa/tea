import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {map, pipe, Subscription, switchMap, tap} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType | null = null;
  // или product: ProductType = {} as ProductType;

  sub: Subscription = new Subscription();
  loader = false;

  constructor(private http: HttpClient,
              private productsService: ProductsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loader = true;

    this.sub = this.activatedRoute.params.pipe(
      switchMap((params) => {
        let param = params['id'];

        if (param) {
          return this.productsService.getProduct(param);
        } else {
          return this.productsService.getProduct(param);
        }
      })
    )
      .subscribe(
        {
          next: (data) => {
            this.loader = false;
            if (data) {
              this.product = data;
              console.log(this.product);
            }
          },
          error: () => {
            this.loader = false;
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
