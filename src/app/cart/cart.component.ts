import {Component, OnInit} from '@angular/core';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any = [];
  summ = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    // @ts-ignore
    this.products = JSON.parse(localStorage.getItem('cart'));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.products.length; i++) {
      this.summ += (this.products[i].price * this.products[i].count);
      console.log(this.products[i]);
    }
    console.log(this.products);
  }

}
