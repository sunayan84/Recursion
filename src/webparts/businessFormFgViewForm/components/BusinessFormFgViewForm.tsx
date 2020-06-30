import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import styles from './BusinessFormFgViewForm.module.scss';
import { IBusinessFormFgViewFormProps } from './IBusinessFormFgViewFormProps';
import {IDatetimepickercontrolProps} from './IDatetimepickercontrolProps';
import { escape } from '@microsoft/sp-lodash-subset';
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
import { IBusinessFormFgViewFormState} from './IBusinessFormFgViewFormState';


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

export default class BusinessFormFgEditForm extends React.Component<IBusinessFormFgViewFormProps,IDatetimepickercontrolProps,IBusinessFormFgViewFormState> {
  disabled?: boolean;
  checked?: boolean;
  private listItemEntityTypeName: string = '';
  constructor(props: IBusinessFormFgViewFormProps, state: IBusinessFormFgViewFormState) {
    super(props);
    this.state = {
      description:'Business Project Request Form',
      status1: this.isListConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
      items: [], 
      context:this.props.context as WebPartContext,
      date: new Date(),
      data:{
        ProjectTitle:'',
        SubmittedBy:'',
        ProjectType:'',
        PhoneEmail:'',
        TotalBudget:'',
        ProposalDate:'',
        VersionNo:'',
        ProjStatrtDate:'',
        ProjEndDate:'',
        ProjCompletionDate:'',
        ProjectSponsor:'',
        ProjectManager:'',
        StakeholderName:[],
        StakeholderRole:[],
        StkContactInfo:[],
        ProjectSummary:'',
        ProjectObjectives:[],
        BusinessJustification:'',
        CaseFastTrack:'',
        RelatedProjects:'',
        Technology:'',
        RiskOverview:'',
        Inscope:'',
        Outscope:'',
        Deliverables:'',
        TimelineOverview:'',
        Milestone:[],
        Deadline:[],
        StaffingOverview:[],
        StaffingFunction:[],
        CapReq:[],
        FTE:[],
        LineItem:[],
        CapexAmount:[],
        OpexAmount:[],
        TotalAmount:[],
        CapexBudget:[],
        OpexBudget:[],
        GrossBudget:[],
        Function:[],
        Description:[],
        FileLocation:[],
        EdrDate:[],
        EdrApprovedBy:[],
        EdrDecision:[],
        ApproverComments:''
      },
    };
  }
  public componentWillReceiveProps(nextProps: IBusinessFormFgViewFormProps): void {
    this.listItemEntityTypeName = undefined;
    this.setState({
      status1: this.isListConfigured(nextProps) ? 'Please configure list in Web Part properties' : 'Ready',
      items: []
    });
  }



  public render(): React.ReactElement<IBusinessFormFgViewFormProps> {
    return (

      <div className={styles.businessFormFgViewForm}>

      <div className={styles.container}> 
      <DefaultButton className={styles.btnSubmit} text="Save as Draft" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
      <PrimaryButton className={styles.btnSubmit} text="Submit" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
      <DefaultButton className={styles.btnSubmit} text="Send Back for Clarification" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
      <DefaultButton className={styles.btnSubmit} text="Reject" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
  
        <table className="classMainTable">
    <tr><td></td><td></td><td></td><td></td></tr>
  <tr className={styles.headingRow}>
    <td className={styles.headingText}>Project Title</td>
    <td><TextField readOnly required /></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>SUBMITTED BY</td>
    <td className={styles.normalHeaderInput}><TextField readOnly required/></td>
    <td className={styles.normalHeaderText}>PROJECT TYPE</td>
    <td className={styles.normalHeaderInput}><TextField readOnly required/></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>PHONE / EMAIL</td>
    <td className={styles.normalHeaderInput}><TextField readOnly /></td>
    <td className={styles.normalHeaderText}>TOTAL ESTIMATED BUDGET
    </td>
    <td className={styles.normalHeaderInput}><TextField readOnly required /></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>DATE OF PROPOSAL</td>
    <td className={styles.normalHeaderInput}><TextField readOnly required /></td>
    <td className={styles.normalHeaderText}>VERSION NO</td>
    <td className={styles.normalHeaderInput}><TextField readOnly required /></td>   
  </tr>
  <tr>
    <td className={styles.normalHeaderText}>PROJECTED START DATE</td>
    <td className={styles.normalHeaderInput}><TextField readOnly required /></td>
    <td className={styles.normalHeaderText}>PROJECTED COMPLETION DATE</td>
    <td className={styles.normalHeaderInput}><TextField readOnly required /></td>   
  </tr>
</table>
<div className={styles.normalGap}></div>
<div className={styles.normalHeading}><span>PROJECT SPONSOR   Commissions delivery of and champions project; Provides vision and direction; Accepts responsibility 
</span>
</div>
<ProjectSponsor contextProp={this.props.context as WebPartContext} />
     
      

    <div className={styles.normalHeading}><span>PROJECT MANAGER   Confirms need for project and validates objectives; Provides specs, monitoring, and overall delivery 
</span></div>
<ProjectManager contextProp={this.props.context as WebPartContext} />
    <div className={styles.normalGap}></div>

        
      <Stakeholders contextProp={this.props.context as WebPartContext} />
    
    <div className={styles.normalGap}></div>
    <div className={styles.normalHeading}><span>PROJECT OVERVIEW 
</span></div>
<div className={styles.normalSubHeading}><span>SUMMARY 
</span></div>
<div><TextField readOnly multiline autoAdjustHeight required /></div>

<div className={styles.normalSubHeading}><span>OBJECTIVES 
</span></div>
<div><TextField readOnly multiline autoAdjustHeight required /></div>

<div className={styles.normalSubHeading}><span>BUSINESS JUSTIFICATION 
</span></div>
<div><TextField readOnly multiline autoAdjustHeight required /></div>

<div className={styles.normalSubHeading}><span>CASE FOR FAST TRACK 
</span></div>
<div><TextField readOnly multiline autoAdjustHeight required /></div>


<div className={styles.normalSubHeading}><span>DEPENDENCIES / RELATED PROJECTS
</span></div>
<div><TextField readOnly multiline autoAdjustHeight /></div>

<div className={styles.normalSubHeading}><span>TECHNOLOGY 
</span></div>
<div><TextField readOnly multiline autoAdjustHeight /></div>

<div className={styles.normalSubHeading}><span>RISK OVERVIEW 
</span></div>
<div><TextField readOnly multiline autoAdjustHeight /></div>
<div className={styles.normalGap}></div>
    <div className={styles.normalHeading}><span>SCOPE OF PROJECT 
</span></div>
<div className={styles.normalSubHeading}><span>ASPECTS IMPACTED
</span></div>

<table className={styles.classMainTable}>
      <tr><td></td><td></td></tr>
      <tr><td className={styles.tdScope}><span>IN SCOPE</span></td>
      <td><TextField readOnly multiline autoAdjustHeight /></td></tr>
      <tr><td className={styles.tdScope}><span>OUT OF SCOPE</span></td>
      <td><TextField readOnly multiline autoAdjustHeight /></td>
      </tr>
      </table>


      <div className={styles.normalSubHeading}><span>DELIVERABLES 
</span></div>
<div><TextField readOnly multiline autoAdjustHeight /></div>
<div className={styles.normalGap}></div>
<div className={styles.normalSubHeading}><span>TIMELINE / MILESTONES
</span></div>

<table className={styles.classMainTable}>
      <tr><td></td><td></td></tr>
      <tr><td className={styles.tdMilesStones}><span>OVERVIEW</span></td>
      <td><TextField readOnly multiline autoAdjustHeight /></td></tr>         
      </table>
      <Milestone date={this.props.date} />
      <div className={styles.normalGap}></div>
<div className={styles.normalSubHeading}><span>STAFFING RESOURCES
</span></div>
      <table className={styles.classMainTable}>
      <tr><td></td><td></td></tr>
      <tr><td className={styles.tdMilesStones}><span>OVERVIEW</span></td>
      <td><TextField readOnly multiline autoAdjustHeight /></td></tr>         
      </table>
      
      <StaffingResources contextProp={this.props.context as WebPartContext} />
      
<div className={styles.normalSubHeading2}>Cost of the project</div>

<div className={styles.normalSubHeading}><span>RELATED DOCUMENTS
</span></div>
<ProjectCost />
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
        <td><TextField readOnly multiline autoAdjustHeight /></td>
      </tr>         
</table>
<div className={styles.normalGap}></div>
<DefaultButton className={styles.btnSubmit} text="Save as Draft" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
<PrimaryButton className={styles.btnSubmit} text="Submit" onClick={this.createItem} allowDisabledFocus disabled={false} checked={false} />
<DefaultButton className={styles.btnSubmit} text="Send Back for Clarification" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />
<DefaultButton className={styles.btnSubmit} text="Reject" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={false} />

    </div>
  </div>      
    );
  }
  
  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  } 
  @autobind  
  private __onchangedStartDate(date: any): void {  
    this.setState({ date: date });  
  }
  private _alertClicked(): void {
    alert('Clicked');
  }
  private isListConfigured(props: IBusinessFormFgViewFormProps): boolean {
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
  
}
