import { AlertService, MessageSeverity } from './../../services/alert.service';
import { UserEdit } from './../../models/user-edit.model';
import { Role } from './../../models/role.model';
import { User } from './../../models/user.model';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  form: FormGroup;
  user: UserEdit;
  isNewUser = false;
  isChangingPassword = false;
  allRoles: Role[] = [];
  title: string;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.user = data.user;
    this.allRoles = data.roles;
  }

  ngOnInit() {
    if (this.user.userName == null) {
      this.isNewUser = true;
      this.title = "New User";
    }
    else
        this.title = `Edit ${this.user.userName}`;

    this.createUserForm();
  }

  createUserForm() {
    this.form = this.fb.group({
      userName: [this.user.userName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber, []],
      jobTitle: [this.user.jobTitle, []],
      fullName: [this.user.fullName, []],
      roles: [this.user.roles, [Validators.required]],
      isEnabled: [this.user.isEnabled],
      newPassword: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]]
    }, { validator: this.passwordMatchValidator('newPassword', 'confirmPassword') });
  }

  passwordMatchValidator(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  changePassword() {
    this.isChangingPassword = !this.isChangingPassword;
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
    if (this.form.invalid) {
      this.validateAllFormFields(this.form);
      this.alertService.showMessage(
        "MISSING DETAILS", 
        "Please fix the errors and try again", 
        MessageSeverity.error);
    }
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control: AbstractControl | null = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  get fullName() { return this.form.get("fullName"); }
  get userName() { return this.form.get("userName"); }
  get roles() { return this.form.get("roles"); }
  get email() { return this.form.get("email"); }
  get phoneNumber() { return this.form.get("phoneNumber"); }
  get confirmPassword() { return this.form.get("confirmPassword"); }
}
