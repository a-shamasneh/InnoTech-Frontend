import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { PatientInfo } from '../models/patient-info';
import { PagedResult } from '../models/paged-result';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cols: any[];
  loading: boolean=false ;
  patients: PatientInfo[];
  totalRecords: number;

  constructor(private _patientService: PatientService) { }

  ngOnInit() {
   
  }

  getPatientsList(pageSize: number, pageIndex: number) {
    this.loading=true;
    this._patientService.getPatients(pageSize, pageIndex)
      .subscribe((data: PagedResult<PatientInfo>) => {
        this.patients = [];
        this.patients = data.results;
        this.totalRecords = data.totalRecords;
        this.loading = false;
        console.log(this.patients);
        if (this.patients.length > 0) {
          this.patients.map(i => {
            i.patientMetaData = Object.keys(JSON.parse(i.patientMetaData)).length.toString();
            i.lastEntry = new Date(i.visits[0].visitDate).toDateString();
          });
        }
      }, error => {
        this.loading = false;
        throwError;
      });

  }


  // lazy load
  loadPatientLazy(event) {
    this.getPatientsList(event.rows, event.first / event.rows + 1);
  }
  //
  save(patient:PatientInfo){
  alert("Catch!! patientId="+patient.patientId);
  }

}