import { Observable } from 'rxjs/Observable';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, delay, tap, distinctUntilChanged, debounceTime } from "rxjs/operators";
import {merge} from "rxjs/observable/merge";
import { of } from "rxjs/observable/of";

import { User } from '../models/user.model';
import { AccountService } from './account.service';


export class UsersDataSource extends DataSource<any> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private usersCountSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public usersCount$ = this.usersCountSubject.asObservable();

  constructor(private accountService: AccountService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }
  
  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
    this.usersCountSubject.complete();
  }

  loadUsers(page?: number, pageSize?: number) {
    this.loadingSubject.next(true);

    this.accountService.getUsersAndRoles()
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(
      result => {
        this.usersSubject.next(result[0]);
        this.usersCountSubject.next(result[0].length);
      }
    );
    
  }

}