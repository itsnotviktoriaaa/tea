import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  // private observable: Observable<boolean>;

  constructor() { }

  getPopup(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
        observer.next(true);
    });
  }

}
