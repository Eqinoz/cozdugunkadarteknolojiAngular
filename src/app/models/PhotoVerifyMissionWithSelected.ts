import {PhotoVerifyMissionDTO} from './photoVerifyMissionDTO';
import {PhotoVerifyMission} from './photoVerifyMission';

export interface PhotoVerifyMissionWithSelected extends PhotoVerifyMission{
  selected:boolean;
}
