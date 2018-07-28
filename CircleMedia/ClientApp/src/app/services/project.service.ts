import { ProjectFilter } from './../models/IFilter';
import { Injectable } from '@angular/core';
import { ProjectEndPoint } from './project-endpoint.service';
import { Project } from '../models/project.model';
import { Source, Status } from '../models/source.model';
import { SaveProject } from '../models/save-project.model';

@Injectable()
export class ProjectService {

  constructor(private projectEndPoint: ProjectEndPoint) { }

  getProjects(filter: ProjectFilter) {
    return this.projectEndPoint.getProjectsEndpoint<any>(filter);
  }

  getProject(projectId: number) {
    return this.projectEndPoint.getProjectEndpoint<Project>(projectId);
  }

  createProject(project: SaveProject) {
    return this.projectEndPoint.createProjectEndpoint<Project>(project);
  }

  updateProject(project: SaveProject) {
    return this.projectEndPoint.updateProjectEndpoint<Project>(project);
  }

  deleteProject(projectId: number) {
    return this.projectEndPoint.deleteProjectEndpoint(projectId);
  }

  getProjectSources() {
    return this.projectEndPoint.getProjectSourceEndpoint<Source>();
  }

  getProjectStatus() {
    return this.projectEndPoint.getProjectStatusEndpoint<Status>();
  }
}
