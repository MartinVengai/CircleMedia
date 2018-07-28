import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { IFilter } from "../models/IFilter";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Client } from "../models/client.model";
import { ClientService } from "./client.service";

export class ClientsDataSource extends DataSource<any> {
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private clientsCountSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public clientsCount$ = this.clientsCountSubject.asObservable();

  constructor(private clientService: ClientService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Client[]> {
    return this.clientsSubject.asObservable();
  }
  
  disconnect(collectionViewer: CollectionViewer): void {
    this.clientsSubject.complete();
    this.loadingSubject.complete();
    this.clientsCountSubject.complete();
  }

  loadClients(filter: IFilter) {
    this.loadingSubject.next(true);

    this.clientService.getClients(filter)
    .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
    .subscribe(
      result => {
        this.clientsSubject.next(result.items);
        this.clientsCountSubject.next(result.totalItems);
      }
    );
  }
}