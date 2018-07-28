import { Permission } from './../../models/permission.model';
import { AccountService } from './../../services/account.service';
import { ProjectFilter } from './../../models/IFilter';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProjectsDataSource } from '../../services/projects.datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projectsCount: number;
  filter: ProjectFilter = {
    page: 0,
    pageSize: 50,
    isSortAscending: false,
    sortBy: "dateReceived",
    searchTerm: "",
    userId: ""
  }
  dataSource: ProjectsDataSource;
  displayedColumns = ['client', 'email', 'dateReceived', 'dueDate', 'status', 'product', 'priority', 'assigned'];
  userId: string;
  dateReceived = moment().subtract(6, 'days').calendar();
  isViewingOwnProjects: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private route: ActivatedRoute) {
    route.params.subscribe(p => this.userId = p.id);

    let url = router.url.split('/');
    var action = url[3];

    if (action == "completed")
      this.filter.searchTerm = "Completed";
    else if (action == "parked")
      this.filter.searchTerm = "Parked";
    else if (action == "progress")
      this.filter.searchTerm = "In progress";
    else if (action == "pending")
      this.filter.searchTerm = "Awaiting approval";
    else if (action =="all")
      this.filter.searchTerm = "!Completed";
  }

  ngOnInit() {
    this.filter.page = 1;
    this.dataSource = new ProjectsDataSource(this.projectService);

    if (this.userId && this.userId == this.currentUserId) {
      this.filter.userId = this.userId;
      this.isViewingOwnProjects = true;
    }

    this.dataSource.loadProjects(this.filter);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProjectsPage();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadProjectsPage())
      )
      .subscribe();
  }

  loadProjectsPage() {
    this.filter.searchTerm = this.input.nativeElement.value;
    this.filter.sortBy = this.sort.active;
    this.filter.isSortAscending = (this.sort.direction == "asc") ? true : false;
    this.filter.pageSize = this.paginator.pageSize;
    this.filter.page = this.paginator.pageIndex + 1;
    this.dataSource.loadProjects(this.filter);
  }

  getColor(status) {
    if (status == "In Progress")
      return 'orange';
    else if (status == 'Completed')
      return 'green';
    else if (status == 'Parked')
      return 'red';
    else if (status == 'Awaiting Approval')
      return 'blue';
  }

  getDate(dueDate) {
    var days = Math.abs(moment().diff(moment(dueDate), 'days')) + 1;

    if (days < 7)
      return (moment(dueDate).calendar().split(" at"))[0];
    else
      return moment(dueDate).format('ll');
  }

  get currentUserId(): string {
    return this.authService.currentUser ? this.authService.currentUser.id : "";
  }

  get isAdmin() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }
}
