import { HttpClient } from '@angular/common/http';
import { IKeyValuePair } from './../models/IKeyValuePair';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseCategoryEndpoint } from './expense-category-endpoint.service';

@Injectable()
export class ExpenseCategoryService {

  constructor(private router: Router, private http: HttpClient, private expenseCategoryEndpoint: ExpenseCategoryEndpoint) { }

  create(expenseCategory: IKeyValuePair) {
    return this.expenseCategoryEndpoint.createExpenseCategoryEndpoint<IKeyValuePair>(expenseCategory);
  }

  getExpenseCategory() {
    return this.expenseCategoryEndpoint.getExpenseCategoryEndpoint<IKeyValuePair[]>();
  }

  deleteExpenseCategory(categoryId: number) {
    return this.expenseCategoryEndpoint.deleteExpenseCategoryEndpoint<number>(categoryId);
  }
}
