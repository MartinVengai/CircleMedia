import { UserDialogComponent } from './../user-dialog/user-dialog.component';
import { tap } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input, ElementRef } from '@angular/core';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AccountService } from "../../services/account.service";
import { Utilities } from "../../services/utilities";
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { Permission } from '../../models/permission.model';
import { UserEdit } from '../../models/user-edit.model';
import { UserInfoComponent } from "./user-info.component";
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { UsersDataSource } from '../../services/users.datasource';

@Component({
  selector: 'users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit, AfterViewInit {
  loadingIndicator: boolean;
  usersCount: number;
  dataSource: UsersDataSource;
  displayedColumns = ['title', 'userName', 'fullName', 'email', 'actions'];
  allRoles: Role[] = [];

  private userEdit: UserEdit;
  private isNewUser = false;
  private isSaving = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public snackBar: MatSnackBar,
    private alertService: AlertService,
    private dialog: MatDialog,
    private accountService: AccountService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.dataSource = new UsersDataSource(this.accountService);
    this.dataSource.loadUsers(1, 3);
    this.accountService.getRoles().subscribe(roles => this.allRoles = roles);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
      tap(() => this.loadUsersPage())
      )
      .subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadUsers(this.paginator.pageIndex+1, this.paginator.pageSize);
  }

  newUser() {
    this.isNewUser = true;
    this.userEdit = new UserEdit();
    this.editUser(this.userEdit);
  }

  editUser(user: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      user: user,
      roles: this.allRoles
    };
    const dialogRef = this.dialog.open(UserDialogComponent, dialogConfig);
    
    dialogRef.afterClosed()
    .subscribe(user => {
      if (user) {
        this.userEdit = new UserEdit();
        Object.assign(this.userEdit, user);
        this.save();
      }
    });
  }

  save() {
    this.isSaving = true;
    this.alertService.startLoadingMessage("Saving Changes ...");
    this.loadingIndicator = true;

    if (this.isNewUser) {
      this.userEdit.newPassword = "tempP@ss123";
      this.accountService.newUser(this.userEdit)
        .subscribe(user => this.saveSuccessHelper(user), error => this.saveFailedHelper(error));
    }
    else {
      if (this.userEdit.newPassword.length == 0) {
        delete this.userEdit.newPassword;
      }
      this.accountService.updateUser(this.userEdit)
        .subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
    
  }

  private saveSuccessHelper(user?: User) {

    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.loadUsers();

    if (this.isNewUser) {
      this.alertService.showMessage("Success", `User \"${user.userName}\" was created successfully`, MessageSeverity.success);
      this.isNewUser = false;
    }
    else
      this.alertService.showMessage("SUCCESS", `Changes to user \"${this.userEdit.userName}\" were successful`, MessageSeverity.success);
  }

  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

  deleteUser(row: UserEdit) {
    let snackBarRef = this.snackBar.open(`Delete ${row.userName} ?`, "DELETE", { duration: 5000 });
    snackBarRef.onAction().subscribe(() => this.deleteUserHelper(row));
  }

  deleteUserHelper(row: UserEdit) {
    this.alertService.startLoadingMessage("Deleting...");
    this.loadingIndicator = true;

    this.accountService.deleteUser(row)
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.loadUsers();
      },
      error => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Delete Error", `An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
          MessageSeverity.error, error);
      });
  }


  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission)
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }
}
