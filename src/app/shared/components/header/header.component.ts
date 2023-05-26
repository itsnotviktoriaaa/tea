import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  input = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.input = params['search']?.trim();
      this.productsService.searchText.next(params['search']?.trim());
    });
  }

  clickOnSearchButton() {
    this.router.navigate(['/products'], {queryParams: this.input? {search: this.input} : {}});
  }

  resetSearchInService() {
    this.router.navigate(['/products']);
    this.input = '';
  }
}
