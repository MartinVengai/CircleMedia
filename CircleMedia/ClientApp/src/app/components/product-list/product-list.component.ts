import { AlertService, MessageSeverity } from './../../services/alert.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'turnover', 'actions'];
  loadingIndicator: boolean;
  dataSource;

  constructor(private productService: ProductService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.productService.getProducts()
      .subscribe(products => this.onLoadProductsSuccess(products), error => this.onLoadProductsFail(error));
  }

  onLoadProductsSuccess(products) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.dataSource = products;
  }

  onLoadProductsFail(error) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService
      .showStickyMessage("Load Error", `Unable to retrieve products from the server.\r\n
        Errors: "${Utilities.getHttpResponseMessage(error)}"`,
          MessageSeverity.error, error);
  }

}
