import { IKeyValuePair } from './../models/IKeyValuePair';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IncomeCategoryEndpoint } from './income-category-endpoint.service';

@Injectable()
export class IncomeCategoryService {

  constructor(private incomeCategoryEndpoint: IncomeCategoryEndpoint) { }

  create(incomeCategory: IKeyValuePair) {
    return this.incomeCategoryEndpoint.createIncomeCategoryEndpoint<IKeyValuePair>(incomeCategory);
  }

  getIncomeCategory() {
    return this.incomeCategoryEndpoint.getIncomeCategoryEndpoint<IKeyValuePair[]>();
  }

  deleteIncomeCategory(categoryId: number) {
    return this.incomeCategoryEndpoint.deleteIncomeCategoryEndpoint<number>(categoryId);
  }
}
