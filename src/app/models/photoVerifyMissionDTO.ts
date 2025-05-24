export interface PhotoVerifyMissionDTO{
  id:number;
  chilName:string;
  parentFirstName:string;
  parentLastName:string;
  assignedDate:Date;
  verifiedDate:Date;
  missionTitle:string;
  hasTimeLimit:boolean;
  missionDuration:number;
  sessionDuration:number;
  missionDescription:string;
  photoUrl:string;
  isApproved:boolean;

}
