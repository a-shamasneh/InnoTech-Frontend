import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl:string="http://localhost:54768/api/Patient/";
  
  constructor(private httpClient:HttpClient) { }

  public getPatients(pageSize:number,pageIndex:number){
  return this.httpClient.get(`${this.baseUrl}GetAllPatient?pageSize=${pageSize}&&pageIndex=${pageIndex}`);
  }

  public getPatientStatistics(pageNumber:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}GetPatientStatistics?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public getHighestMonthVisits(){
    return this.httpClient.get(`${this.baseUrl}GetHighestMonth`);
  }

  getPatientVisits(patientId:number){
    return this.httpClient.get(`${this.baseUrl}GetPatientVisits?patientId=${patientId}`);
  }

  getCommonPatientDiseases(patientId:number){
    return this.httpClient.get(`${this.baseUrl}GetCommonPatientDiseases?patientId=${patientId}`);
  }

  getMetadata(){
    return this.httpClient.get(`${this.baseUrl}GetMetadata`);
  }
}
