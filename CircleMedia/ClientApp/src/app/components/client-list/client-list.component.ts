import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IFilter } from '../../models/IFilter';
import { MatSort, MatPaginator } from '@angular/material';
import { ClientService } from '../../services/client.service';
import { ClientsDataSource } from '../../services/client.datasource';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, AfterViewInit {
  clientsCount: number;
  filter: IFilter = {
    page: 0,
    pageSize:50,
    isSortAscending: true,
    sortBy: "",
    searchTerm: ""
  }
  dataSource: ClientsDataSource;
  displayedColumns = ['name','email', 'phoneNumber', 'source', 'projects', 'status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.filter.page = 1;
    this.dataSource = new ClientsDataSource(this.clientService);
    this.dataSource.loadClients(this.filter);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadClientsPage();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadClientsPage())
      )
      .subscribe();
  }

  loadClientsPage() {
    this.filter.searchTerm = this.input.nativeElement.value;
    this.filter.sortBy = this.sort.active;
    this.filter.isSortAscending = (this.sort.direction=="asc") ? true : false;
    this.filter.pageSize = this.paginator.pageSize;
    this.filter.page = this.paginator.pageIndex+1;
    this.dataSource.loadClients(this.filter);
  }

}
