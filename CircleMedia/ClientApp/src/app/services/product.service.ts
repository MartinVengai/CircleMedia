import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductEndpoint } from './product-endpoint.service';

@Injectable()
export class ProductService {

  constructor(private router: Router, private http: HttpClient, private projectEndpoint: ProductEndpoint) { }

  update(product: Product) {
    return this.projectEndpoint.updateProductEndpoint<Product>(product);
  }

  create(product: Product) {
    return this.projectEndpoint.createProductEndpoint<Product>(product);
  }

  getProducts() {
    return this.projectEndpoint.getProductsEndPoint<Product>();
  }

  getProduct(productId: number) {
    return this.projectEndpoint.getProductEndPoint<Product>(productId);
  }
}
