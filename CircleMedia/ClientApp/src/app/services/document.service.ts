import { IDocument } from './../models/document.model';
import { Injectable } from '@angular/core';
import { DocumentEndpoint } from './document-endpoint.service';

@Injectable()
export class DocumentService {

  constructor(private documentEndPoint: DocumentEndpoint) { }

  getDocuments(projectId: number) {
    return this.documentEndPoint.getDocumentsEndpoint<IDocument[]>(projectId);
  }

  uploadDocument(projectId: number, document: File) {
    return this.documentEndPoint.uploadDocumentEndpoint<any>(projectId, document);
  }




}