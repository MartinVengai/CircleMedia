import { TestBed, inject } from '@angular/core/testing';

import { ClientEndpoint } from './client-endpoint.service';

describe('ClientEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientEndpoint]
    });
  });

  it('should be created', inject([ClientEndpoint], (service: ClientEndpoint) => {
    expect(service).toBeTruthy();
  }));
});
