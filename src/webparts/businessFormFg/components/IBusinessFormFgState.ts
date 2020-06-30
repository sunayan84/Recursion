import {IListItem} from './IListItem';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IControls } from './IControls';

export interface IBusinessFormFgState {
  status1: string;
  items: IListItem[];
  description:string;    
  context:WebPartContext;
  addProjectManagers: string[]; 
  addProjectSponsors: string[]; 
  addStakeholders:string[];
  addStaffingResources:string[];
  StakeholderRole: { key: string | number | undefined,text: string | number | undefined },
  ContactInfo: string,
  StaffingFunction:{ key: string | number | undefined,text: string | number | undefined },
  CapReq:string,
  FTE:string[],
  ProjectTitle:string;
  SubmittedBy:string;
  ProjectType:string;
  PhoneEmail:string;
  TotalBudget:string;
  ProposalDate:string;
  RequestType:string;
  ProjStatrtDate:string;
  ProjEndDate:string;
  ProjCompletionDate:string;
  ProjectSponsor:string;
  ProjectManager:string;
  stakeHolderDetails: [],
  StakeholderName:[],  
  StkContactInfo:[],
  ProjectSummary:string,
  ProjectObjectives:string,
  BusinessJustification:string,
  CaseFastTrack:string,
  RelatedProjects:string,
  Technology:string,
  RiskOverview:string,
  Inscope:string,
  Outscope:string,
  Deliverables:string,
  TimelineOverview:string,
  Milestone:string,
  Deadline:[],
  StaffingOverview:string,
  LineItem:string,
  CapexAmount:string,
  OpexAmount:string,
  TotalAmount:string,
  CapexBudget:string,
  OpexBudget:string,
  GrossBudget:string,
  Function:[],
  Description:[],
  FileLocation:[],
  EdrDate:[],
  EdrApprovedBy:[],
  EdrDecision:[],
  ApproverComments:string,
}