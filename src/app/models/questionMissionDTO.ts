export interface QuestionMissionDTO{
  id:number;
  childName:string;
  parentFirstName:string;
  parentLastName:string;
  assignedDate:Date;
  verifiedDate:Date;
  schoolLessonName:string;
  numberOfQuestion:number;
  successRate:number;
  allowedTime:number;
  description:string;
  isApproved:boolean;
}
