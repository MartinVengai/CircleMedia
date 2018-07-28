import { Injectable, Injector } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { EndpointFactory } from './endpoint-factory.service';
import { HttpClient } from '@angular/common/http';
import { IFilter } from '../models/IFilter';
import { Observable } from 'rxjs/Observable';
import { SaveClient } from "../models/SaveClient";

@Injectable()
export class ClientEndpoint extends EndpointFactory {
  private readonly _clientUrl: string = "/api/clients";
  private readonly _sourcedFromUrl: string = "/api/projects/sources";
  
  get clientUrl() { return this.configurations.baseUrl + this._clientUrl; }
  get sourcedFromUrl() { return this.configurations.baseUrl + this._sourcedFromUrl; }

  constructor(http: HttpClient,configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getClientsEndpoint<T>(filter: IFilter): Observable<T> {
    let endpointUrl = `${this.clientUrl}?${this.toQueryString(filter)}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getClientsEndpoint(filter));
      });
  }

  getClientEndpoint<T>(clientId: number): Observable<T> {
    let endpointUrl = `${this.clientUrl}/${clientId}`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getClientEndpoint(clientId));
      });
  }

  updateClientEndpoint<T>(client: SaveClient): Observable<T> {
    let endpointUrl = `${this.clientUrl}/${client.id}`;

    return this.http.put<T>(endpointUrl, client, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.updateClientEndpoint(client));
      });
  }

  createClientEndpoint<T>(client: SaveClient): Observable<T> {
    let endpointUrl = this.clientUrl;

    return this.http.post<T>(endpointUrl, client, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.createClientEndpoint(client));
      });
  }

  deleteClientEndpoint<T>(clientId: number): Observable<T> {
    let endpointUrl = `${this.clientUrl}/${clientId}`;

    return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.deleteClientEndpoint(clientId));
      });
  }

  getSourcedFromEndpoint<T>(): Observable<T> {
    let endpointUrl = this.sourcedFromUrl;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getSourcedFromEndpoint());
      });
  }
}
