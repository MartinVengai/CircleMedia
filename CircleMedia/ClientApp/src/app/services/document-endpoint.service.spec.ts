import { TestBed, inject } from '@angular/core/testing';

import { DocumentEndpoint } from './document-endpoint.service';

describe('DocumentEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentEndpoint]
    });
  });

  it('should be created', inject([DocumentEndpoint], (service: DocumentEndpoint) => {
    expect(service).toBeTruthy();
  }));
});
