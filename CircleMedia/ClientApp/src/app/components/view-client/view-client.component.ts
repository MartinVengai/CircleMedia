import { AccountService } from './../../services/account.service';
import { Permission } from './../../models/permission.model';
import { Project } from './../../models/project.model';
import { ProjectService } from './../../services/project.service';
import { MatSnackBar } from '@angular/material';
import { Utilities } from './../../services/utilities';
import { ClientService } from './../../services/client.service';
import { AlertService, MessageSeverity } from './../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  clientId: number;
  client: Client;
  loadingIndicator: boolean;
  totalAmount: number = 0;
  totalBalance: number = 0;
  totalDeposit: number = 0;
  fractionCompleted: number;

  dataSource;
  displayedColumns = ['product', 'dueDate', 'assigned', 'status', 'pstatus', 'actions'];

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private clientService: ClientService,
    private accountService: AccountService,
    private projectService: ProjectService) {

    route.params.subscribe(p => {
      this.clientId = +p['id'];
      if (isNaN(this.clientId) || this.clientId <= 0) {
        router.navigate(['/admin/clients']);
        return;
      }
    });
  }

  ngOnInit() {

    this.loadClient();
  }

  getPaymentTotals() {
    let projects = this.client.projects;
    let total = projects.length;
    let completed = 0;

    for (var i = 0; i < projects.length; i++) {

      if (projects[i].status.name == "Completed") {
        completed +=1;
      }

      this.totalAmount += projects[i].amount;
      this.totalBalance += projects[i].balance;
      this.totalDeposit += projects[i].deposit;
    }

    this.fractionCompleted = completed / total * 100;
  }

  loadClient() {
    this.clientService.getClient(this.clientId)
    .subscribe(
    client => {
      this.client = client;
      this.dataSource = this.client.projects;
      this.getPaymentTotals();
    },
    error => this.router.navigate(['/admin/clients'])
    );
  }

  delete() {
    let snackBarRef = this.snackBar.open(`Delete Client ?`, "DELETE", { duration: 5000 });
    snackBarRef.onAction().subscribe(() => this.deleteClientHelper());
    // snackBarRef.afterDismissed().subscribe(null, null, () => this.deleteClientHelper());
  }

  deleteClientHelper() {
    this.alertService.startLoadingMessage("Deleting...");
    this.loadingIndicator = true;

    this.clientService.deleteClient(this.client.id)
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showMessage("Deleted!", "Client Deleted", MessageSeverity.success);
        this.loadClient();
        this.router.navigate(["/admin/clients"]);
      },
      error => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Delete Error", `An error occured whilst deleting the client.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
          MessageSeverity.error, error);
      });
  }

  getColor(status) {
    if (status == "In Progress")
      return 'yellow';
    else if (status == 'Completed')
      return 'green';
    else if (status == 'Parked')
      return 'red';
    else if (status == 'Awaiting Approval')
      return 'blue';
  }

  deleteProject(project: Project) {
    let snackBarRef = this.snackBar.open(`Delete Project ?`, "DELETE", { duration: 5000 });
    snackBarRef.onAction().subscribe(() => this.deleteProjectHelper(project));
  }

  deleteProjectHelper(project: Project) {
    this.alertService.startLoadingMessage("Deleting...");
    this.loadingIndicator = true;

    this.projectService.deleteProject(project.id)
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showMessage("Deleted!", "Project Deleted", MessageSeverity.success);
        this.router.navigate(["/admin/clients/view", this.clientId]);
      },
      error => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Delete Error", `An error occured whilst deleting the project.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
          MessageSeverity.error, error);
      });

  }

  get isAdmin() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }
}