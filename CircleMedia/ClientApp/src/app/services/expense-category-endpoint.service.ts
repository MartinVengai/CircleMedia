import { Observable } from 'rxjs/Observable';
import { EndpointFactory } from './endpoint-factory.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ExpenseCategoryEndpoint extends EndpointFactory {
  private readonly _expenseCategory: string = "/api/expenseCategories";

  get expenseCategoryUrl() { return this.configurations.baseUrl + this._expenseCategory; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getExpenseCategoryEndpoint<T>(): Observable<T> {
    let endpoint = this.expenseCategoryUrl;

    return this.http.get<T>(endpoint, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getExpenseCategoryEndpoint());
      });
  }

  createExpenseCategoryEndpoint<T>(expenseCategory: any): Observable<T> {
    let endpointUrl = this.expenseCategoryUrl;

    return this.http.post<T>(endpointUrl, expenseCategory, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.createExpenseCategoryEndpoint(expenseCategory));
      });
  }

  deleteExpenseCategoryEndpoint<T>(categoryId: number): Observable<T> {
    let endpointUrl = `${this.expenseCategoryUrl}/${categoryId}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => this.handleError(error, () => this.deleteExpenseCategoryEndpoint(categoryId)));
  }
}