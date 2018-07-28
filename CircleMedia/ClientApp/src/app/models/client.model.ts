import { Project } from './project.model';
import { IKeyValuePair } from './IKeyValuePair';
export interface Client {
  id: number;
  name: string;
  clientCode: string;
  email: string;
  sourcedFrom: IKeyValuePair;
  phoneNumber: string;
  projects: Project[];
  projectsCount: number;
  completedProjectsCount: number
}