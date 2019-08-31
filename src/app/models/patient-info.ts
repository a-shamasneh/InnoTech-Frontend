import { Visit } from './visit';

export class PatientInfo {
 
patientId :number;
patientName :string;
identityNumber :number;
birthDate :Date;
email :string;
patientMetaData:string; 
visits:Visit[]=[];
lastEntry:string;
}