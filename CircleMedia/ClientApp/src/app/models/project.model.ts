import { IProduct } from "./product.model";
import { IKeyValuePair } from "./IKeyValuePair";
import { IAssignedUser } from "./IAssignedUser";

export class Project {
    id: number;
    comment: string;
    amount: number;
    deposit: number;
    balance: number;
    dateReceived: string;
    dueDate: string;
    dateCompleted: string;
    client: IKeyValuePair;
    assignedUser: IAssignedUser;
    product: IProduct;
    status: IKeyValuePair;
}

export interface IProject {
    id: number;
    comment: string;
    amount: number;
    deposit: number;
    balance: number;
    dateReceived: string;
    dueDate: string;
    dateCompleted: string;
    client: IKeyValuePair;
    assignedUser: IAssignedUser;
    product: IProduct;
    status: IKeyValuePair;
}


