import { ProjectFilter } from './../models/IFilter';
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject } from "rxjs";
import { IProject } from "../models/project.model";
import { ProjectService } from "./project.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { IFilter } from "../models/IFilter";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export class ProjectsDataSource extends DataSource<any> {
  private projectsSubject = new BehaviorSubject<IProject[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private projectsCountSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public projectsCount$ = this.projectsCountSubject.asObservable();

  constructor(private projectService: ProjectService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<IProject[]> {
    return this.projectsSubject.asObservable();
  }
  
  disconnect(collectionViewer: CollectionViewer): void {
    this.projectsSubject.complete();
    this.loadingSubject.complete();
    this.projectsCountSubject.complete();
  }

  loadProjects(filter: ProjectFilter) {
    this.loadingSubject.next(true);

    this.projectService.getProjects(filter)
    .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
    .subscribe(
      result => {
        this.projectsSubject.next(result.items);
        this.projectsCountSubject.next(result.totalItems);
      }
    );
  }
}