import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SearchButtonService} from "../../services/search-button.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('inputElement')
  private inputElement!: ElementRef;

  constructor(private searchButtonService: SearchButtonService,
              private router: Router) {
  }

  clickOnSearchButton() {
    this.searchButtonService.getSearchFromInput(this.inputElement.nativeElement.value);
    console.log(this.inputElement.nativeElement.value);
    this.router.navigate(['/products'], {queryParams: {search: this.inputElement.nativeElement.value}})
  }

  resetSearchInService() {
    this.searchButtonService.getSearch = '';
    this.inputElement.nativeElement.value = '';

    //тут если сбрасываю параметры не обновляется само собой, пока только такой способ придумала, но он обновляет, что наверное не совсем правильно
    this.router.navigate(['/products']);
    window.location.reload();
  }
}
