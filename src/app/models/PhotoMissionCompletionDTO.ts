export interface PhotoMissionCompletionDTO{
  id: number;
  childName: string;
  missionTitle: string;
  missionDescription: string;
  sessionDuration: number;
  filePath: string;
  assignedDate: Date;
  completionTime: Date;
  description: string;
  success:boolean;
  isApproved: boolean;
}
