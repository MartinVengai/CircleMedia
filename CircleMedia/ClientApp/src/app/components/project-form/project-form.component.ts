import { AuthService } from './../../services/auth.service';
import { Permission } from './../../models/permission.model';
import { Client } from './../../models/client.model';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProject, Project } from '../../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import { IKeyValuePair } from '../../models/IKeyValuePair';
import { AccountService } from '../../services/account.service';
import { IUser } from '../../models/user.model';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import * as moment from 'moment';
import { SaveProject } from '../../models/save-project.model';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  employees: IUser[];
  allProducts: IProduct[];
  projectStatuses: IKeyValuePair[];
  project: SaveProject = new SaveProject();
  loadingIndicator: boolean;
  clientId: number;
  client: Client;
  projectId: number;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private clientService: ClientService,
    private projectService: ProjectService,
    private productService: ProductService,
    private accountService: AccountService) {
    this.createProjectForm();

    let url = router.url.split('/');
    var action = url[4];
    
    if (action == 'edit')
      route.params.subscribe(p => this.projectId = +p.id);
    else if (action == 'new')
      route.params.subscribe(p => this.clientId = +p.id);
    else
      router.navigate(['/not-found']);
  }

  ngOnInit() {
    var sources: any[] = [
      this.productService.getProducts(),
      this.projectService.getProjectStatus()
    ];

    if (this.clientId) 
      sources.push(this.clientService.getClient(this.clientId));

    if (this.projectId) 
      sources.push(this.projectService.getProject(this.projectId));

    if (this.isAdmin)
      sources.push(this.accountService.getUsers());

    Observable.forkJoin(sources).subscribe(data => {
      this.allProducts = data[0] as IProduct[];
      this.projectStatuses = data[1] as IKeyValuePair[];

      if (this.clientId) 
        this.client = data[2] as Client;

      if (this.projectId) 
        this.setProjectForm(data[2] as IProject);

      if (this.isAdmin)
        this.employees = data[3] as IUser[];

    }, error => {
      if (error.status == 404) {
        this.alertService.showStickyMessage("Error", `An error occured. Please try again.
          \r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
          MessageSeverity.error, error);
        this.router.navigate(["/admin/clients"]);
      }
    });
  }

  onProductChange() {
    var selectedProduct = this.allProducts.find(p => p.id == this.productId.value);
    if (selectedProduct != undefined) {
      this.deposit.setValue(selectedProduct.price / 2);
      this.amount.setValue(selectedProduct.price);
      this.dueDate.setValue(this.addBussinessDays(selectedProduct.turnover));
    }
  }

  addBussinessDays(days) {
    let date = moment();
    while (days > 0) {
      date = date.add(1, 'days');
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    return date;
  }

  createProjectForm() {
    this.projectForm = this.fb.group({
      amount: [""],
      assignedUserId: ["", [Validators.required]],
      comment: ["", [Validators.maxLength(500)]],
      deposit: [""],
      dateReceived: [new Date()],
      dueDate: [""],
      statusId: [4, [Validators.required]],
      productId: ["", [Validators.required]],
    });
  }

  setProjectForm(project: Project) {
    this.clientId = project.client.id;

    this.amount.setValue(project.amount);
    this.assignedUserId.setValue(project.assignedUser.id);
    this.comment.setValue(project.comment);
    this.deposit.setValue(project.deposit);
    this.dateReceived.setValue(project.dateReceived);
    this.dueDate.setValue(project.dueDate);
    this.statusId.setValue(project.status.id);
    this.productId.setValue(project.product.id);
  }

  submit() {
    if (this.projectForm.valid) {

      this.alertService.startLoadingMessage("Saving...");
      this.loadingIndicator = true;

      //client Id is valid and we are saving new project
      if (this.client != null) {
        this.project = this.projectForm.value;

        this.project.clientId = this.clientId;
        this.project.balance = this.project.amount - this.project.deposit;

        this.projectService.createProject(this.project)
          .subscribe(project => this.saveSuccessHelper(project), error => this.saveFailedHelper(error));
      }

      //editing a project, depending on prvleg
      if (this.projectId) {

        this.project = this.projectForm.value;
        this.project.id = this.projectId;
        this.project.clientId = this.clientId;
        this.project.balance = this.project.amount - this.project.deposit;

        this.projectService.updateProject(this.project)
          .subscribe(() => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
      }
    }
  }

  saveSuccessHelper(project?: Project) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.alertService.showMessage("SUCCESS!", "Data successfully saved.", MessageSeverity.success);

    if (this.isAdmin)
      this.router.navigate(["/admin/clients/view", this.clientId]);
    else 
      this.router.navigate(["/user/projects/all", this.currentUserId]);
  }

  saveFailedHelper(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.alertService.showStickyMessage("Error", `An error occured whilst saving data.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }

  get amount() { return this.projectForm.get("amount"); }
  get assignedUserId() { return this.projectForm.get("assignedUserId"); }
  get comment() { return this.projectForm.get("comment"); }
  get dateReceived() { return this.projectForm.get("dateReceived"); }
  get dueDate() { return this.projectForm.get("dueDate"); }
  get deposit() { return this.projectForm.get("deposit"); }
  get statusId() { return this.projectForm.get("statusId"); }
  get productId() { return this.projectForm.get("productId"); }


  get isAdmin() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }

  get currentUserId(): string {
    return this.authService.currentUser ? this.authService.currentUser.id : "";
  }
}
