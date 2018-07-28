import { IAssignedUser } from './IAssignedUser';

export interface IDocument {
  id: number;
  fileName: string;
  createdDate: string;
  userCreate: IAssignedUser;
}