import { IKeyValuePair } from './IKeyValuePair';
export class SaveClient {
  id: number;
  name: string;
  clientCode: string;
  email: string;
  phoneNumber: string;
  sourcedFrom: IKeyValuePair;
}