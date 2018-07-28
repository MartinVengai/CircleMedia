import { Utilities } from './../../services/utilities';
import { AlertService, MessageSeverity } from './../../services/alert.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { DocumentService } from './../../services/document.service';
import { IDocument } from './../../models/document.model';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  projectId: number;
  project: any;
  projectStatus: string;
  documents: IDocument[];
  date = new Date('2/20/16');
  loadingIndicator: boolean;

  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private projectService: ProjectService,
    private documentService: DocumentService) { 

      route.params.subscribe(p => {
        this.projectId = +p['id'];
        if (isNaN(this.projectId) || this.projectId <= 0) {
          router.navigate(['/projects']);
          return;
        }
      });
  }

  ngOnInit() {
    this.documentService.getDocuments(this.projectId)
      .subscribe(documents => this.documents = documents);

    this.projectService.getProject(this.projectId)
      .subscribe(
        project => {
          this.project = project;
          this.setColor(this.project.status.name);
        },
        error => this.router.navigate(['/projects']));
  }

  setColor(status) {
    if (status == "In Progress")
      this.projectStatus = 'active';
    else if (status == 'Completed')
      this.projectStatus = 'success';
    else if (status == 'Parked')
      this.projectStatus = 'danger';
    else if (status == 'Awaiting Approval')
      this.projectStatus = 'info';
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.alertService.startLoadingMessage("Deleting...");
      this.loadingIndicator = true;
      
      this.projectService.deleteProject(this.project.id)
        .subscribe(results => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;
          this.alertService.showMessage("Deleted!", "Project Deleted", MessageSeverity.success);
          this.router.navigate(["/projects"]);
        },
        error => {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;

            this.alertService.showStickyMessage("Delete Error", `An error occured whilst deleting the project.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                MessageSeverity.error, error);
        });
    }
  }

  uploadDocument() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var document = nativeElement.files![0];
    nativeElement.value = '';

    this.documentService.uploadDocument(this.projectId, document)
      .subscribe(document => this.documents.push(document),
      error => console.log("Error", error));
  }

}
