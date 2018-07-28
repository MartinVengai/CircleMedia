import { AlertService, MessageSeverity } from './../../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategoryService } from './../../services/expense-category.service';
import { IncomeCategoryService } from './../../services/income-category.service';
import { Component, OnInit } from '@angular/core';
import { IKeyValuePair } from '../../models/IKeyValuePair';
import { MatSnackBar } from '@angular/material';
import { fadeInOut } from '../../services/animations';

@Component({
  selector: 'financial-settings',
  templateUrl: './financial-settings.component.html',
  styleUrls: ['./financial-settings.component.css'],
  animations: [fadeInOut]
})
export class FinancialSettingsComponent implements OnInit {
  incomeCategories: IKeyValuePair[];
  expenseCategories: IKeyValuePair[];
  form: FormGroup;
  showIncomeForm: boolean = false;
  showExpenseForm: boolean = false;
  category: IKeyValuePair;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private alertService: AlertService,
    private incomeCategoryService: IncomeCategoryService,
    private expenseCategoryService: ExpenseCategoryService) {
   
      this.createForm();
  }

  ngOnInit() {
    this.incomeCategoryService.getIncomeCategory()
      .subscribe(categories => this.incomeCategories = categories, error => console.log(error));

    this.expenseCategoryService.getExpenseCategory()
      .subscribe(categories => this.expenseCategories = categories, error => console.log(error));
  }

  submit(type: string) {
    if (this.form.valid) {
      this.alertService.startLoadingMessage("Saving ...");

      this.category = this.form.value;

      if (type == "income") {
        this.incomeCategoryService.create(this.category).subscribe(category => {
          this.alertService.stopLoadingMessage();
          this.incomeCategories.push(category);
          this.showIncomeForm = false;
          this.alertService.showMessage("SUCCESS!", "Category successfully saved.", MessageSeverity.success);
        });
      }
      
      if (type == "expense") {
        this.expenseCategoryService.create(this.category).subscribe(category => {
          this.alertService.stopLoadingMessage();
          this.expenseCategories.push(category);
          this.showExpenseForm = false;
          this.alertService.showMessage("SUCCESS!", "Category successfully saved.", MessageSeverity.success);
        });
      }
    }
  }

  delete(category: IKeyValuePair, type: string) {
    let snackBarRef = this.snackBar.open(`Delete ${category.name} ?`, "DELETE", { duration: 5000 });
    snackBarRef.onAction().subscribe(() => this.deleteCategoryHelper(category.id, type));
  }

  deleteCategoryHelper(id: number, type: string) {
    this.alertService.startLoadingMessage("Deleting ...");

    if (type == "income") {
      this.incomeCategoryService.deleteIncomeCategory(id)
        .subscribe(id => {
          this.alertService.stopLoadingMessage();
          var index = this.incomeCategories.findIndex(i => i.id == id);
          this.incomeCategories.splice(index, 1);
          this.alertService.showMessage("Success!", "Income category deleted successfully", MessageSeverity.success);
        },
        error => {
          this.alertService.stopLoadingMessage();
          this.alertService.showMessage("Error", "An unexpected error occured. Try again", MessageSeverity.error);
        });
    }

    else if (type == "expense") {
      this.expenseCategoryService.deleteExpenseCategory(id)
        .subscribe(id => {
          this.alertService.stopLoadingMessage();
          var index = this.expenseCategories.findIndex(ex => ex.id == id);
          this.expenseCategories.splice(index, 1);
          this.alertService.showMessage("Success!", "Expense category deleted successfully", MessageSeverity.success);
        },
        error => {
          this.alertService.stopLoadingMessage();
          this.alertService.showMessage("Error!", "An unexpected error occured. Try again", MessageSeverity.error);
        });
    }

    else {
      this.alertService.stopLoadingMessage();
      this.alertService.showMessage("Error!", "Please retry the operation", MessageSeverity.error);
    }
  }

  onShowForm(type: string) {
    if (type == "income")
      this.showIncomeForm = !this.showIncomeForm;

    if (type == "expense")
      this.showExpenseForm = !this.showExpenseForm;
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(249)]]
    });
  }

  get name() { return this.form.get("name"); }
}
