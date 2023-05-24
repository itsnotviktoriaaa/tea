import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchButtonService {

  constructor() { }

  subject: Subject<string> = new Subject<string>();

  getSearch = '';

  getSearchFromInput(search: string) {
    this.subject.next(this.getSearch = search);
    // console.log(this.getSearch);
  }

}
