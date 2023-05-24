import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductsService} from "../../shared/services/products.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  productTitle = '';
  isSuccess = true;

  //по факту всё равно если не заполнено я сделала так, чтобы на кнопку нельзя было нажать и эта переменная не пригодится
  isError = false;

  loader = false;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private router: Router) {
  }

  infoForm = this.fb.group({
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яёА-ЯЁ]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^[\+]*[0-9]{11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: [{value: '', disabled: true}, Validators.required],
    address: ['', [Validators.required, Validators.pattern('^[а-яёА-ЯЁ 0-9-\/]+$')]],
    comment: '',
  });

  ngOnInit() {
    this.loader = true;
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams) {
        this.productTitle = queryParams['product'];
        console.log(this.productTitle);
        this.loader = false;
        this.infoForm.get('product')?.setValue(this.productTitle);
      }
    });

    this.infoForm!.get('name')!.valueChanges.subscribe((val) => {
      console.log(val);
      if (/[\d]/.test(val!)) {
        this.infoForm!.get('name')!.setValue('', {emitEvent: false});
      }
    });

  }

  createOrder(button: HTMLButtonElement) {
    button.setAttribute('disabled', 'disabled');
    // console.log(button);
    this.productsService.createOrder({
      name: this.infoForm!.get('name')!.value!,
      last_name: this.infoForm!.get('last_name')!.value!,
      phone: this.infoForm!.get('phone')!.value!,
      country: this.infoForm!.get('country')!.value!,
      zip: this.infoForm!.get('zip')!.value!,
      product: this.infoForm!.get('product')!.value!,
      address: this.infoForm!.get('address')!.value!,
      comment: this.infoForm!.get('comment')!.value!
    })
      .subscribe({
        next: (data) => {
          if (data.success && !data.message) {
            this.isSuccess = false;
            button.removeAttribute('disabled');
            // console.log(button);
            console.log('YEEES');
          } else {
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 3000);
            button.removeAttribute('disabled');
            console.log('NOO');
          }
        },
        error: (error) => {
          this.router.navigate(['/']);
        }
      })
  }

}
