import { Source } from './../models/source.model';
import { Injectable } from '@angular/core';
import { ClientEndpoint } from './client-endpoint.service';
import { IFilter } from '../models/IFilter';
import { Client } from '../models/client.model';
import { SaveClient } from "../models/SaveClient";

@Injectable()
export class ClientService {
  
  constructor(private clientEndpoint: ClientEndpoint) { }

  getClients(filter: IFilter) {
    return this.clientEndpoint.getClientsEndpoint<any>(filter);
  }

  getClient(clientId: number) {
    return this.clientEndpoint.getClientEndpoint<Client>(clientId);
  }

  createClient(client: SaveClient) {
    return this.clientEndpoint.createClientEndpoint(client);
  }

  updateClient(client: SaveClient) {
    return this.clientEndpoint.updateClientEndpoint(client);
  }

  deleteClient(clientId: number) {
    return this.clientEndpoint.deleteClientEndpoint(clientId);
  }

  getSourcedFrom() {
    return this.clientEndpoint.getSourcedFromEndpoint<Source>();
  }

}
