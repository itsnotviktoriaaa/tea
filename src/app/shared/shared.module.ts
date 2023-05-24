import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ShortProductDescriptionPipe} from "./pipes/short-product-description.pipe";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShortProductDescriptionPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ShortProductDescriptionPipe
  ]
})
export class SharedModule { }
