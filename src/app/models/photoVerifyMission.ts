export interface PhotoVerifyMission {
  id:number;
  childId:number;
  parentId:number;
  assignedDate:Date,
  verifiedDate:Date,
  missionTitle:string,
  hasTimeLimit:boolean,
  missionDuration:number,
  sessionDuration:number,
  missionDescription:string,
  photoUrl:string,
  success:boolean;
  isApproved:boolean,
}
