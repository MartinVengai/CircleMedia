import { Observable } from 'rxjs/Observable';
import { EndpointFactory } from './endpoint-factory.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class IncomeCategoryEndpoint extends EndpointFactory {
  private readonly _incomeCategoryUrl: string = "/api/incomeCategories";

  get incomeCategoryUrl() { return this.configurations.baseUrl + this._incomeCategoryUrl; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getIncomeCategoryEndpoint<T>(): Observable<T> {
    let endpoint = this.incomeCategoryUrl;

    return this.http.get<T>(endpoint, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getIncomeCategoryEndpoint());
      });
  }

  createIncomeCategoryEndpoint<T>(incomeCategory: any): Observable<T> {
    let endpointUrl = this.incomeCategoryUrl;

    return this.http.post<T>(endpointUrl, incomeCategory, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.createIncomeCategoryEndpoint(incomeCategory));
      });
  }

  deleteIncomeCategoryEndpoint<T>(categoryId: number): Observable<T> {
    let endpointUrl = `${this.incomeCategoryUrl}/${categoryId}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => this.handleError(error, () => this.deleteIncomeCategoryEndpoint(categoryId)));
  }
}