import { Injectable, Injector } from '@angular/core';
import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProjectFilter } from '../models/IFilter';
import { SaveProject } from '../models/save-project.model';

@Injectable()
export class ProjectEndPoint extends EndpointFactory {
  private readonly _projectUrl: string = '/api/projects';
  private readonly _projectSourceUrl: string = '/api/projects/sources';
  private readonly _projectStatusUrl: string = '/api/projects/status';
  private readonly _projectStatisticsUrl: string = '/api/projects/statistics';

  get projectUrl() { return this.configurations.baseUrl + this._projectUrl; }
  get projectSourceUrl() { return this.configurations.baseUrl + this._projectSourceUrl; }
  get projectStatusUrl() { return this.configurations.baseUrl + this._projectStatusUrl; }
  get projectStatisticsUrl() { return this.configurations.baseUrl + this._projectStatisticsUrl; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getProjectStatistics<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.projectStatisticsUrl}/${userId}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => this.handleError(error, () => this.getProjectStatistics(userId)));
  }

  getProjectsEndpoint<T>(filter: ProjectFilter): Observable<T> {
    const endpointUrl = `${this.projectUrl}?${this.toQueryString(filter)}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getProjectsEndpoint(filter));
      });
  }

  getProjectEndpoint<T>(projectId: number): Observable<T> {
    const endpointUrl = `${this.projectUrl}/${projectId}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getProjectEndpoint(projectId));
      });
  }

  updateProjectEndpoint<T>(project: SaveProject): Observable<T> {
    const endpointUrl = `${this.projectUrl}/${project.id}`;

    return this.http.put<T>(endpointUrl, project, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.updateProjectEndpoint(project));
      });
  }

  createProjectEndpoint<T>(project: SaveProject): Observable<T> {
    const endpointUrl = this.projectUrl;

    return this.http.post<T>(endpointUrl, project, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.createProjectEndpoint(project));
      });
  }

  deleteProjectEndpoint<T>(projectId: number): Observable<T> {
    const endpointUrl = `${this.projectUrl}/${projectId}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.deleteProjectEndpoint(projectId));
      });
  }

  getProjectStatusEndpoint<T>(): Observable<T> {
    const endpointUrl = this._projectStatusUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getProjectStatusEndpoint());
      });
  }

  getProjectSourceEndpoint<T>(): Observable<T> {
    const endpointUrl = this.projectSourceUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getProjectSourceEndpoint());
      });
  }
}
