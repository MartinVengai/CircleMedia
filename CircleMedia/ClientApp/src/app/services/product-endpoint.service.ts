import { Injectable, Injector } from '@angular/core';
import { EndpointFactory } from './endpoint-factory.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductEndpoint extends EndpointFactory {
  private readonly _productUrl: string = "/api/products";

  get productUrl() { return this.configurations.baseUrl + this._productUrl; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getProductsEndPoint<T>(): Observable<T> {
    let endpointUrl = this.productUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getProductsEndPoint());
      });
  }

  getProductEndPoint<T>(productId: number): Observable<T> {
    let endpointUrl = `${this.productUrl}/${productId}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getProductEndPoint(productId));
      });
  }

  updateProductEndpoint<T>(product: any): Observable<T> {
    let endpointUrl = `${this.productUrl}/${product.id}`;

    return this.http.put<T>(endpointUrl, product, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.updateProductEndpoint(product));
      });
  }

  createProductEndpoint<T>(product: any): Observable<T> {
    let endpointUrl = this.productUrl;

    return this.http.post<T>(endpointUrl, product, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.createProductEndpoint(product));
      });
  }

}
