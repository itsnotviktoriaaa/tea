import {Component, OnDestroy} from '@angular/core';
import {delay, Subscription} from "rxjs";
import {PopupService} from "../../shared/services/popup.service";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  isPopup: boolean = false;
  private observable: Subscription;


  constructor(private popupService: PopupService) {
    this.observable = this.popupService.getPopup()
      .pipe(
        delay(10000)
      )
      .subscribe((param) => {
        this.isPopup = param;
      });
  }


  ngOnDestroy() {
    this.observable.unsubscribe();
  }




}
