import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {ProductsService} from "../../../shared/services/products.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product!: ProductType;
  sub: Subscription = new Subscription();
  sub1: Subscription = new Subscription();
  loader = false;

  constructor(private http: HttpClient,
              private productsService: ProductsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loader = true;
    this.sub = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {

        this.sub1 = this.productsService.getProduct(params['id'])
          .subscribe(
            {
              next: (data) => {
                if (data) {
                  this.product = data;
                  this.loader = false;
                  console.log(this.product);
                }
              },
              error: (error) => {
                this.router.navigate(['/']);
              }
            }
          )
      }
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

}
