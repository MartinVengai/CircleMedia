import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { EndpointFactory } from './endpoint-factory.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class DocumentEndpoint extends EndpointFactory {
  private readonly _documentsUrl = "/api/projects";
  get documentsUrl() { return this.configurations.baseUrl + this._documentsUrl; }

  constructor(http: HttpClient,configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  uploadDocumentEndpoint<T>(projectId: number, document: File): Observable<T> {
    let endpointUrl = `${this.documentsUrl}/${projectId}/documents`;

    var formData = new FormData();
    formData.append('file', document);

    return this.http.post<T>(endpointUrl, formData, this.getRequestHeaders())
    .catch(error => {
      return this.handleError(error, () => this.uploadDocumentEndpoint(projectId, document));
    });
  }

  getDocumentsEndpoint<T>(projectId: number): Observable<T> {
    let endpointUrl = `${this.documentsUrl}/${projectId}/documents`;

    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    .catch(error => {
      return this.handleError(error, () => this.getDocumentsEndpoint(projectId));
    })
  } 

}
