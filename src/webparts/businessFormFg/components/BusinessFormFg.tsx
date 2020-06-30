import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './BusinessFormFg.module.scss';
import { IBusinessFormFgProps } from './IBusinessFormFgProps';
import {IDatetimepickercontrolProps} from './IDatetimepickercontrolProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {PeoplePickerControl} from '../loc/PeoplePickerControl';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IDatetimepickercontrolState } from './IDatetimepickercontrolState';  
import { MessageBar, MessageBarType, IStackProps} from 'office-ui-fabric-react';  
import { autobind } from 'office-ui-fabric-react';  
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker';  
import { sp } from "@pnp/sp";  
import "@pnp/sp/webs";  
import "@pnp/sp/lists";  
import "@pnp/sp/items";
import { ContextualMenu, DefaultButton, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';
import {  PrimaryButton} from 'office-ui-fabric-react';
import { IListItem } from './IListItem';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import {IBusinessFormFgState} from './IBusinessFormFgState';
import {IControls} from './IControls';

import BusinessFormProvider from '../context/BusinessFormProvider';


import ProjectSponsor from './ProjectSponsor';
import ProjectManager from './ProjectManager';
import Stakeholders from './Stakeholders';
import Milestone from './Milestone';
import StaffingResources from './StaffingResources';
import RelatedDocuments from './RelatedDocuments';
import ExecDecisionRecord from './ExecDecisionRecord';
import ProjectCost from './ProjectCost';



//FOR DROPDOWN CONTROL
const options: IDropdownOption[] = [
  { key: '', text: 'Select an Option'},
  { key: 'Manager', text: 'Manager' },
  {key:'Director', text:'Director'},
  {key:'Finance HOD', text:'Finance HOD'},
  {key:'Legal', text:'Legal'},
  {key:'CFO', text:'CFO'},
  {key:'CEO', text:'CEO'}
];

const functions: IDropdownOption[] = [
  { key: '', text: 'Select an Option'},
  { key: 'Sales', text: 'Sales' },
  {key:'HR', text:'HR'},
  {key:'Finance', text:'Finance'},
  {key:'Legal', text:'Legal'},
  {key:'IT', text:'IT'}  
];

const decisions: IDropdownOption[] = [
  { key: '', text: 'Select an Option'},
  { key: 'Pending', text: 'Pending' },
  {key:'Approved', text:'Approved'},
  {key:'Rejected', text:'Rejected'},
  {key:'Pending from Legal', text:'Pending from Legal'},
  {key:'Pending from Finance', text:'Pending from Finance'},
  {key:'Pending from CEO', text:'Pending from CEO'}  
]

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  
}
const stackTokens: IStackTokens = { childrenGap: 20 };








export default class BusinessFormFg extends React.Component<IBusinessFormFgProps,IBusinessFormFgState> {
  disabled?: boolean;
  checked?: boolean;
  private listItemEntityTypeName: string = '';
  data:IControls;
  constructor(props: IBusinessFormFgProps, state: IBusinessFormFgState) {
    super(props);
    this.state = {
      description:'Business Project Request Form',
      status1: this.isListConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
      items: [], 
      addProjectManagers: [],
      addProjectSponsors:[],
      addStakeholders:[],
      addStaffingResources:[],
      StakeholderRole: { key: '', text: 'Select an Option'},
      ContactInfo: '',
      context:this.props.context as WebPartContext,
      stakeHolderDetails: [],
        ProjectTitle:'',
        SubmittedBy:'',
        ProjectType:'',
        PhoneEmail:'',
        TotalBudget:'',
        ProposalDate:'',
        RequestType:'',
        ProjStatrtDate:'',
        ProjEndDate:'',
        ProjCompletionDate:'',
        ProjectSponsor:'',
        ProjectManager:'',
        StakeholderName:[],        
        StkContactInfo:[],
        ProjectSummary:'',
        ProjectObjectives:'',
        BusinessJustification:'',
        CaseFastTrack:'',
        RelatedProjects:'',
        Technology:'',
        RiskOverview:'',
        Inscope:'',
        Outscope:'',
        Deliverables:'',
        TimelineOverview:'',
        Milestone:'',
        Deadline:[],
        StaffingOverview:'',
        StaffingFunction:{ key: '', text: 'Select an Option'},
        CapReq:'',
        FTE:[],
        LineItem:'',
        CapexAmount:'',
        OpexAmount:'',
        TotalAmount:'',
        CapexBudget:'',
        OpexBudget:'',
        GrossBudget:'',
        Function:[],
        Description:[],
        FileLocation:[],
        EdrDate:[],
        EdrApprovedBy:[],
        EdrDecision:[],
        ApproverComments:''
      
    };
  }
  public componentWillReceiveProps(nextProps: IBusinessFormFgProps): void {
    this.listItemEntityTypeName = undefined;
    this.setState({
      status1: this.isListConfigured(nextProps) ? 'Please configure list in Web Part properties' : 'Ready',
      items: []
    });
  }



  public render(): React.ReactElement<IBusinessFormFgProps> {
    return (
      <BusinessFormProvider>
      <div className={styles.businessFormFg}>
   
      <div className={styles.container}> 
      <DefaultButton className={styles.btnSubmit} text="Save as Draft" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
      <PrimaryButton className={styles.btnSubmit} text="Submit" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
      <DefaultButton className={styles.btnSubmit} text="Send Back for Clarification" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
      <DefaultButton className={styles.btnSubmit} text="Reject" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
  
        <table className="classMainTable">
    <tr><td></td><td></td><td></td><td></td></tr>
  <tr className={styles.headingRow}>
    <td className={styles.headingText}>Project Title</td>
    <td><TextField value={this.state.ProjectTitle} onChanged={this.ProjectTitleOnchanged.bind(this)} required /></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>SUBMITTED BY</td>
    <td className={styles.normalHeaderInput}><TextField value={this.state.SubmittedBy} onChanged={this.SubmittedByOnchanged.bind(this)} required/></td>
    <td className={styles.normalHeaderText}>PROJECT TYPE</td>
    <td className={styles.normalHeaderInput}><TextField value={this.state.ProjectType} onChanged={this.ProjectTypeOnchanged.bind(this)} required/></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>PHONE / EMAIL</td>
    <td className={styles.normalHeaderInput}><TextField onChanged={this.PhoneEmailOnchanged.bind(this)} value={this.state.PhoneEmail} /></td>
    <td className={styles.normalHeaderText}>TOTAL ESTIMATED BUDGET
    </td>
    <td className={styles.normalHeaderInput}><TextField onChanged={this.TotalBudgetOnchanged.bind(this)} value={this.state.TotalBudget} required /></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>DATE OF PROPOSAL</td>
    <td className={styles.normalHeaderInput}><TextField onChanged={this.ProposalDateOnchanged.bind(this)} value={this.state.ProposalDate} required /></td>
    <td className={styles.normalHeaderText}>REQUEST TYPE</td>
    <td className={styles.normalHeaderInput}><TextField onChanged={this.RequestTypeOnchanged.bind(this)} value={this.state.RequestType} required /></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>PROJECTED START DATE</td>
    <td className={styles.normalHeaderInput}><TextField onChanged={this.ProjStartDateOnchanged.bind(this)} value={this.state.ProjStatrtDate} required /></td>
    <td className={styles.normalHeaderText}>PROJECTED COMPLETION DATE</td>
    <td className={styles.normalHeaderInput}><TextField onChanged={this.ProjEndDateOnchanged.bind(this)} value={this.state.ProjCompletionDate} required /></td>   
  </tr>
</table>
<div className={styles.normalGap}></div>
<div className={styles.normalHeading}><span>PROJECT SPONSOR   Commissions delivery of and champions project; Provides vision and direction; Accepts responsibility 
</span>
</div>
<ProjectSponsor contextProp={this.props.context as WebPartContext} value={this.state.addProjectManagers} />
     
      

    <div className={styles.normalHeading}><span>PROJECT MANAGER   Confirms need for project and validates objectives; Provides specs, monitoring, and overall delivery 
</span></div>
<ProjectManager contextProp={this.props.context as WebPartContext} value={this.state.addProjectSponsors} />
    <div className={styles.normalGap}></div>

        
      <Stakeholders contextProp={this.props.context as WebPartContext} value1={this.state.addStakeholders} value2={this.state.StakeholderRole} value3={this.state.ContactInfo} />
    
    <div className={styles.normalGap}></div>
    <div className={styles.normalHeading}><span>PROJECT OVERVIEW 
</span></div>
<div className={styles.normalSubHeading}><span>SUMMARY 
</span></div>
<div><TextField value={this.state.ProjectSummary}  onChanged={this.ProjectSummaryOnchanged.bind(this)} multiline autoAdjustHeight required /></div>

<div className={styles.normalSubHeading}><span>OBJECTIVES 
</span></div>
<div><TextField value={this.state.ProjectObjectives}  onChanged={this.ProjectObjectivesOnchanged.bind(this)} multiline autoAdjustHeight required /></div>

<div className={styles.normalSubHeading}><span>BUSINESS JUSTIFICATION 
</span></div>
<div><TextField value={this.state.BusinessJustification}  onChanged={this.BusinessJustificationOnchanged.bind(this)} multiline autoAdjustHeight required /></div>

<div className={styles.normalSubHeading}><span>CASE FOR FAST TRACK 
</span></div>
<div><TextField value={this.state.CaseFastTrack}  onChanged={this.CaseFastTrackOnchanged.bind(this)} multiline autoAdjustHeight required /></div>


<div className={styles.normalSubHeading}><span>DEPENDENCIES / RELATED PROJECTS
</span></div>
<div><TextField value={this.state.RelatedProjects}  onChanged={this.ProjectDependenciesOnchanged.bind(this)} multiline autoAdjustHeight /></div>

<div className={styles.normalSubHeading}><span>TECHNOLOGY 
</span></div>
<div><TextField value={this.state.Technology}  onChanged={this.TechnologyOnchanged.bind(this)} multiline autoAdjustHeight /></div>

<div className={styles.normalSubHeading}><span>RISK OVERVIEW 
</span></div>
<div><TextField value={this.state.RiskOverview}  onChanged={this.RiskOverviewOnchanged.bind(this)} multiline autoAdjustHeight /></div>
<div className={styles.normalGap}></div>
    <div className={styles.normalHeading}><span>SCOPE OF PROJECT 
</span></div>
<div className={styles.normalSubHeading}><span>ASPECTS IMPACTED
</span></div>

<table className={styles.classMainTable}>
      <tr><td></td><td></td></tr>
      <tr><td className={styles.tdScope}><span>IN SCOPE</span></td>
      <td><TextField value={this.state.Inscope} onChanged={this.InScopeOnchanged.bind(this)} multiline autoAdjustHeight /></td></tr>
      <tr><td className={styles.tdScope}><span>OUT OF SCOPE</span></td>
      <td><TextField value={this.state.Outscope}  onChanged={this.OutScopeOnchanged.bind(this)} multiline autoAdjustHeight /></td>
      </tr>
      </table>


      <div className={styles.normalSubHeading}><span>DELIVERABLES 
</span></div>
<div><TextField value={this.state.Deliverables} onChanged={this.ProjectDeliverablesOnchanged.bind(this)} multiline autoAdjustHeight /></div>
<div className={styles.normalGap}></div>
<div className={styles.normalSubHeading}><span>TIMELINE / MILESTONES
</span></div>

<table className={styles.classMainTable}>
      <tr><td></td><td></td></tr>
      <tr><td className={styles.tdMilesStones}><span>OVERVIEW</span></td>
      <td><TextField value={this.state.TimelineOverview} onChanged={this.MilestoneOverviewOnchanged.bind(this)} multiline autoAdjustHeight /></td></tr>         
      </table>
      <Milestone date={this.props.date} value={this.state.Milestone} />
      <div className={styles.normalGap}></div>
<div className={styles.normalSubHeading}><span>STAFFING RESOURCES
</span></div>
      <table className={styles.classMainTable}>
      <tr><td></td><td></td></tr>
      <tr><td className={styles.tdMilesStones}><span>OVERVIEW</span></td>
      <td><TextField value={this.state.StaffingOverview} onChanged={this.StaffingOverviewOnchanged.bind(this)} multiline autoAdjustHeight /></td></tr>         
      </table>
      
      <StaffingResources contextProp={this.props.context as WebPartContext} value1={this.state.addStaffingResources} value2={this.state.StaffingFunction} value3={this.state.CapReq} />
      
<div className={styles.normalSubHeading2}>Cost of the project</div>

<div className={styles.normalSubHeading}><span>RELATED DOCUMENTS
</span></div>
{/* <ProjectCost value1={this.state.LineItem} value2={this.state.CapexAmount} value3={this.state.OpexAmount} value4={this.state.TotalAmount} value5={this.state.CapexBudget} value6={this.state.OpexBudget} value7={this.state.TotalBudget} /> */}
<div className={styles.normalGap}></div>
<RelatedDocuments />

<div className={styles.normalSubHeading2}><span>EXECUTIVE DECISION RECORD
</span></div>

<ExecDecisionRecord contextProp={this.props.context as WebPartContext} date={new Date()} />

<div className={styles.normalGap}></div>
<div className={styles.normalSubHeading}><span>Comments from Approver
</span></div>
<table className={styles.classMainTable}>      
      <tr>
        <td><TextField value={this.state.ApproverComments}  onChanged={this.ApproverCommentsOnchanged.bind(this)} multiline autoAdjustHeight /></td>
      </tr>         
</table>
<div className={styles.normalGap}></div>
<DefaultButton className={styles.btnSubmit} text="Save as Draft" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
<PrimaryButton className={styles.btnSubmit} text="Submit" onClick={this.createItem} allowDisabledFocus disabled={false} checked={false} />
<DefaultButton className={styles.btnSubmit} text="Send Back for Clarification" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
<DefaultButton className={styles.btnSubmit} text="Reject" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />

    </div>
  </div> 
  </BusinessFormProvider>     
    );
  }
  
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  } 
  private _alertClicked(): void {
    alert('Clicked');
  }
  private isListConfigured(props: IBusinessFormFgProps): boolean {
    return props.listName === undefined ||
      props.listName === null ||
      props.listName.length === 0;
  }
  private getLatestItemId(): Promise<number> {
    return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
      this.props.spHttpClient.get(`${this.props.siteURL}/_api/web/lists/getbytitle('${this.props.listName}')/items?$orderby=Id desc&$top=1&$select=id`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: { Id: number }[] }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { value: { Id: number }[] }): void => {
          if (response.value.length === 0) {
            resolve(-1);
          }
          else {
            resolve(response.value[0].Id);
          }
        });
    });
  }
  private getListItemEntityTypeName(): Promise<string> {
    return new Promise<string>((resolve: (listItemEntityTypeName: string) => void, reject: (error: any) => void): void => {
      if (this.listItemEntityTypeName) {
        resolve(this.listItemEntityTypeName);
        return;
      }

      this.props.spHttpClient.get(`${this.props.siteURL}/_api/web/lists/getbytitle('${this.props.listName}')?$select=ListItemEntityTypeFullName`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ ListItemEntityTypeFullName: string }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { ListItemEntityTypeFullName: string }): void => {
          this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
          resolve(this.listItemEntityTypeName);
        });
    });
  }

  private createItem(): void {
    this.setState({
      status1: 'Creating item...',
      items: []
    });

    this.getListItemEntityTypeName()
      .then((listItemEntityTypeName: string): Promise<SPHttpClientResponse> => {
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': 'Item ${new Date()}'
        });
        return this.props.spHttpClient.post(`${this.props.siteURL}/_api/web/lists/getbytitle('${this.props.listName}')/items`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=verbose',
              'odata-version': ''
            },
            body: body
          });
      })
      .then((response: SPHttpClientResponse): Promise<IListItem> => {
        return response.json();
      })
      .then((item: IListItem): void => {
        this.setState({
          status1: `Item '${item.Title}' (ID: ${item.Id}) successfully created`,
          items: []
        });
      }, (error: any): void => {
        this.setState({
          status1: 'Error while creating the item: ' + error,
          items: []
        });
      });
  }
  private ProjectTitleOnchanged(prjTitle:string)
  {
    this.setState({ProjectTitle: prjTitle});
    console.log("ProjectTitle state value is : "+ this.state.ProjectTitle);      
  }
  private SubmittedByOnchanged(submittedBy:string)
  {
    this.setState({SubmittedBy: submittedBy});
    console.log("ProjectTitle state value is : "+ this.state.SubmittedBy);      
  }
  private ProjectTypeOnchanged(prjType:string)
  {
    this.setState({ProjectType: prjType});
    console.log("ProjectTitle state value is : "+ this.state.ProjectType);      
  }
  private PhoneEmailOnchanged(phoneEmail:string)
  {
    this.setState({PhoneEmail: phoneEmail});
    console.log("ProjectTitle state value is : "+ this.state.PhoneEmail);      
  }
  private TotalBudgetOnchanged(totalBudget:string)
  {
    this.setState({TotalBudget: totalBudget});
    console.log("ProjectTitle state value is : "+ this.state.TotalBudget);      
  }
  private ProposalDateOnchanged(proposalDate:string)
  {
    this.setState({ProposalDate: proposalDate});
    console.log("ProjectTitle state value is : "+ this.state.ProposalDate);      
  }
  private RequestTypeOnchanged(reqType:string)
  {
    this.setState({RequestType: reqType});
    console.log("ProjectTitle state value is : "+ this.state.RequestType);      
  }
  private ProjStartDateOnchanged(projStartDate:string)
  {
    this.setState({ProjStatrtDate: projStartDate});
    console.log("ProjectTitle state value is : "+ this.state.ProjStatrtDate);      
  }
  private ProjEndDateOnchanged(ProjEndDate:string)
  {
    this.setState({RequestType: ProjEndDate});
    console.log("ProjectTitle state value is : "+ this.state.ProjEndDate);      
  }
  private ProjectSummaryOnchanged(prjSummary:string)
  {
    this.setState({ProjectSummary: prjSummary});
    console.log("ProjectTitle state value is : "+ this.state.ProjectSummary);      
  }
  private ProjectObjectivesOnchanged(prjObjectives:string)
  {
    this.setState({ProjectObjectives: prjObjectives});
    console.log("ProjectTitle state value is : "+ this.state.ProjectObjectives);      
  }
  private BusinessJustificationOnchanged(bizJustification:string)
  {
    this.setState({BusinessJustification: bizJustification});
    console.log("ProjectTitle state value is : "+ this.state.BusinessJustification);      
  }
  private CaseFastTrackOnchanged(caseFstTrack:string)
  {
    this.setState({CaseFastTrack: caseFstTrack});
    console.log("ProjectTitle state value is : "+ this.state.CaseFastTrack);      
  }
  private ProjectDependenciesOnchanged(prjDependencies:string)
  {
    this.setState({RelatedProjects: prjDependencies});
    console.log("ProjectTitle state value is : "+ this.state.RelatedProjects);      
  }

  private TechnologyOnchanged(technology:string)
  {
    this.setState({Technology: technology});
    console.log("ProjectTitle state value is : "+ this.state.Technology);      
  }
  private RiskOverviewOnchanged(rskOverView:string)
  {
    this.setState({RiskOverview: rskOverView});
    console.log("ProjectTitle state value is : "+ this.state.RiskOverview);      
  }
  private InScopeOnchanged(inScope:string)
  {
    this.setState({Inscope: inScope});
    console.log("ProjectTitle state value is : "+ this.state.Inscope);      
  }
  private OutScopeOnchanged(outScope:string)
  {
    this.setState({Outscope: outScope});
    console.log("ProjectTitle state value is : "+ this.state.Outscope);      
  }
  private ProjectDeliverablesOnchanged(prjDeliverables:string)
  {
    this.setState({Deliverables: prjDeliverables});
    console.log("ProjectTitle state value is : "+ this.state.Deliverables);      
  }
  private MilestoneOverviewOnchanged(timelineOverview:string)
  {
    this.setState({TimelineOverview: timelineOverview});
    console.log("ProjectTitle state value is : "+ this.state.TimelineOverview);      
  }
  private StaffingOverviewOnchanged(staffingOverview:string)
  {
    this.setState({StaffingOverview: staffingOverview});
    console.log("ProjectTitle state value is : "+ this.state.StaffingOverview);      
  }
  private ApproverCommentsOnchanged(approverComments:string)
  {
    this.setState({ApproverComments: approverComments});
    console.log("ProjectTitle state value is : "+ this.state.ApproverComments);      
  }
 
}
 
