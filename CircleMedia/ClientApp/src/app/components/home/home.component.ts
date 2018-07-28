import { Project } from './../../models/project.model';
import { AuthService } from './../../services/auth.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ProjectFilter } from '../../models/IFilter';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOut]
})
export class HomeComponent implements OnInit {
  projects: Project[];
  filter: ProjectFilter = {
    searchTerm: "",
    sortBy: "",
    page: 0,
    pageSize: 0,
    userId: this.currentUserId,
    isSortAscending: true
  };
  completed: number = 0;
  awaitingApproval: number = 0;
  parked: number = 0;
  inProgress: number = 0;

  constructor(public projectService: ProjectService, private authService: AuthService) {
  }

  ngOnInit() {
    // this.projectService.getProjects(this.filter).subscribe(result => this.projects = result.items, error => console.log(error));
    // this.getProjectsStatistics(this.projects);
  }

  // //todo
  // getProjectsStatistics(projects: Project[]) {
  //   for (var project of projects) {
  //     if (project.status.name == 'Completed')
  //       this.completed+=1;
  //     else if (project.status.name == 'Awaiting Approval')
  //       this.awaitingApproval+=1;
  //     else if (project.status.name == 'Parked')
  //       this.parked+=1;
  //     else
  //     this.inProgress+=1;
  //   }
    
  // }

  get currentUserId(): string {
    return this.authService.currentUser ? this.authService.currentUser.id : "";
  }

  
}
