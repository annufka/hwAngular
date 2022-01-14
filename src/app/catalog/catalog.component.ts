import {Component, OnInit} from '@angular/core';
import {CatalogService} from '../services/catalog.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any;
  categories: any;
  productList: any = [];

  constructor(private apiCatalog: CatalogService) {
  }

  // вызов функции перед загрузкой страницы
  ngOnInit(): void {
    this.getListAllProducts();
    this.getListAllCategory();
  }

  // функции
  getListAllProducts(): void {
    this.apiCatalog.getListAllProducts().subscribe(
      data => {
        console.log(data);
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllProductsToCategory(Id: string) {
    this.apiCatalog.getAllProductsToCategory(Id).subscribe(
      data => {
        console.log(data);
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getListAllCategory(): void {
    this.apiCatalog.getListAllCategory().subscribe(
      data => {
        console.log(data);
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  setCategory(Id: string): void {
    console.log(Id);
    this.getAllProductsToCategory(Id);
  }

  addCart(item: any): void {
    console.log(this.productList.length);
    if (this.productList.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      let flag = false;
      for (let i = 0; i < this.productList.length; i++) {
        console.log(this.productList[i].id);
        console.log(item.id);
        if (this.productList[i].id === item.id) {
          console.log('dell');
          this.productList.push({id: item.id, count: this.productList[i].count + 1, name: item.name, price: item.price});
          this.productList.splice(i, 1);
          flag = true;
        }
      }
      if (!flag) {
        this.productList.push({id: item.id, count: 1, name: item.name, price: item.price});
      }
    } else {
      this.productList.push({id: item.id, count: 1, name: item.name, price: item.price});
    }

    localStorage.setItem('cart', JSON.stringify(this.productList));
    // window.location.href = '/cart';
    console.log(this.productList);
  }

  getProduct() {
    // @ts-ignore
    this.productList = JSON.parse(localStorage.getItem('cart'));
    console.log(this.productList);
  }
}
