import { Project } from './../../models/project.model';
import { AuthService } from './../../services/auth.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { IProjectStatistics } from '../../models/IProjectStatistics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOut]
})
export class HomeComponent implements OnInit {
  projectStatistics: IProjectStatistics[];

  constructor(public projectService: ProjectService, private authService: AuthService) {
  }

  ngOnInit() {
    this.projectService.getProjectStatistics(this.currentUserId).subscribe(result => this.projectStatistics = result);
  }

  get currentUserId(): string {
    return this.authService.currentUser ? this.authService.currentUser.id : '';
  }
}
