import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { PatientStatistics } from '../models/patient-statistics';
import { HighestMonthVisits } from '../models/highest-month-visits';
import { Visit } from '../models/visit';
import { PatientInfo } from '../models/patient-info';
import { MetaData } from '../models/meta-data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  constructor(private _patientService:PatientService) { }

  patientsStatisticsList:PatientStatistics[];
  cols:any=[];
  totalRecords:number;
  higestmonth:HighestMonthVisits= new HighestMonthVisits();
  patientVisits:Visit[]=[];
  commonPatients:PatientInfo[]=[];
  displayVisitDiaolg: boolean = false;
  displayCommonDiaolg: boolean = false;

  ngOnInit() {
    this.initGrid();
    this.getHighestMonth();
    
  }
//
  getPatientsStatistics(pageNumber:number,pageSize:number){
    this._patientService.getPatientStatistics(pageNumber,pageSize)
    .subscribe((data:PatientStatistics[])=>{
      this.patientsStatisticsList=[];
     this.totalRecords=data[0].totalRecords;
      this.patientsStatisticsList=data;
    });
  }
//
  initGrid() {
    this.cols = [
      { field: 'patientName', header: 'PatientName' },
      { field: 'age', header: 'Age:' },
      { field: 'averageBills', header: 'Average Bills' }
    ];
  }
//
  loadStatisticsLazy(event) {
    this.getPatientsStatistics(event.first / event.rows + 1,event.rows );
  }
//
  getHighestMonth(){
    this._patientService.getHighestMonthVisits()
    .subscribe((data:HighestMonthVisits)=>{
     if(data!=null){
       this.higestmonth=data;
       console.log(data);
     }
    },error=>{
      throw error;
    });
  }
//
  getpatientVisits(patientId:number){
    this._patientService.getPatientVisits(patientId)
    .subscribe((data:Visit[])=>{
      this.patientVisits=data;
      console.log(data);
    },error=>{
      throw error;
    });
  }
//
  getCommonPatient(patientId:number){
    this._patientService.getCommonPatientDiseases(patientId)
    .subscribe((data:PatientInfo[])=>{
      this.commonPatients=data;
      console.log(data);
    },error=>{
      throw error;
    });
  }
//
  showDialogVisits(patientId:number) {
    this.getpatientVisits(patientId);
    this.displayVisitDiaolg = true;
}

showDialogCommon(patientId:number) {
  this.getCommonPatient(patientId);
  this.displayCommonDiaolg = true;
}



}
