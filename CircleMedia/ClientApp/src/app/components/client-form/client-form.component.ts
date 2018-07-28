import { Utilities } from './../../services/utilities';
import { Observable } from 'rxjs/Observable';
import { AccountService } from './../../services/account.service';
import { ClientService } from './../../services/client.service';
import { AlertService, MessageSeverity } from './../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveClient } from "./../../models/SaveClient";
import { IKeyValuePair } from './../../models/IKeyValuePair';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  form: FormGroup;
  sourcedFrom: IKeyValuePair[];
  client: SaveClient = new SaveClient();
  loadingIndicator: boolean;
  

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private alertService: AlertService,
    private router: Router,
    private clientService: ClientService,
    private accountService: AccountService) { 
      this.createClientForm();
      route.params.subscribe(p => this.client.id = +p.id);
  }

  ngOnInit() {    
    var sources: any[] = [this.clientService.getSourcedFrom()];

    if (this.client.id) {
      sources.push(this.clientService.getClient(this.client.id));
    }

    Observable.forkJoin(sources).subscribe(data => {
      this.sourcedFrom = data[0] as IKeyValuePair[];

      if (this.client.id) {
        this.setClientForm(data[1] as SaveClient);
      }
    }, error => {
      if (error.status == 404) {
        this.router.navigate(["/not-found"]);
      }
    });
  }

  createClientForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(255)]],
      phoneNumber: ["", [Validators.maxLength(255)]],
      sourcedFromId: [4, [Validators.required]]
    });
  }

  setClientForm(p: SaveClient) {
    this.name.setValue(p.name);
    this.email.setValue(p.email);
    this.phoneNumber.setValue(p.phoneNumber);
    this.sourcedFromId.setValue(p.sourcedFrom.id);
  }

  submit() {
    if (this.form.valid) {
      var result$;

      this.alertService.startLoadingMessage("Saving...");
      this.loadingIndicator = true;

      if (this.client.id) {
        var clientId = this.client.id;
        this.client = this.form.value;
        this.client.id = clientId;

        result$ = this.clientService.updateClient(this.client);
      } 
      else {
        this.client = this.form.value;
        result$ = this.clientService.createClient(this.client);
      }

      result$
      .subscribe(client => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showMessage("SUCCESS!", "Data successfully saved.", MessageSeverity.success);
        this.router.navigate(["/admin/clients/view", client.id]);
      },
      error => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showStickyMessage("Error", `An error occured whilst saving data.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
          MessageSeverity.error, error);
      });
      
    }
  }

  get name() { return this.form.get("name"); }
  get email() { return this.form.get("email"); }
  get phoneNumber() { return this.form.get("phoneNumber"); }
  get sourcedFromId() { return this.form.get("sourcedFromId"); }
}
