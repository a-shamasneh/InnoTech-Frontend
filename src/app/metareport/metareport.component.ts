import { Component, OnInit } from '@angular/core';
import { MetaData } from '../models/meta-data';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-metareport',
  templateUrl: './metareport.component.html',
  styleUrls: ['./metareport.component.css']
})
export class MetareportComponent implements OnInit {

  constructor(private _patientService:PatientService) { }
  average:number;
  maxNumberOfMetaUsed:number;
  topThreeKeyUsed:string[]=[];
  ngOnInit() {
    this.getMetadata();
    
  }

  // all operation to get statistcs for meta data 
initMetadataStatistics(data:MetaData){
  let keys=[];
  let keysCountUsedObj={};
  let max=0;
  data.allMetaData.map(i=>{
    if(Object.keys(i).length>max)
    {
      max=Object.keys(i).length;
    }
    for(let key in i){
     keys.push(key)
     if(keysCountUsedObj[key]==undefined)
     {
       keysCountUsedObj[key]=1;
     }
     else
     {
      keysCountUsedObj[key]++;
     }
    }
  });
  console.log(keysCountUsedObj);
  this.average= keys.length/data.patientCount;
  this.maxNumberOfMetaUsed=max;
  let keySorted = Object.keys(keysCountUsedObj);
  keySorted.sort(function(a, b) { return keysCountUsedObj[b] - keysCountUsedObj[a] });
  this.topThreeKeyUsed=keySorted.slice(0,3);
}

//
getMetadata(){
  this._patientService.getMetadata().subscribe((data:MetaData)=>{
 this.initMetadataStatistics(data);
  })
}

}
