export interface PhotoMissionCompletion{
  id:number;
  childId:number;
  missionId:number;
  filePath:string;
  completionTime:Date;
  description:string;
  success:boolean;
  isApproved:boolean;
}
