import * as React from 'react';

import styles from './BusinessFormFgViewForm.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker';
//FOR DROPDOWN CONTROL

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
    dropdown: { width: 375 },
    
  }

interface IProps {
    contextProp: WebPartContext,
    date: Date
  }
 

const ExecDecisionRecord: React.FC<IProps> = ({contextProp } : IProps, {date}: IProps ) => {

    const [count, setCount] = React.useState([1]);

    function handleAddNew(): void {
        let newCount = count.length + 1;
        setCount([...count, newCount]);
    }

    function getPeoplePickerItems(items: any[]): void {
        console.log('Items:', items);
      }
      function onchangedDate(date: any): void {  
        this.setState({ date: date });  
      }
    return (
      <div>
          <table className={styles.classMainTable}>
  <tr>
<td className={styles.tdFunction2}>DATE</td>
<td className={styles.tdDesc}>APPROVED BY</td>
<td className={styles.tdFileLocation}>DECISION</td>
  </tr>
          {count.map( c => {
              return (
                
  <tr key={c}>
  <td className={styles.tdBorder}><DateTimePicker  
          dateConvention={DateConvention.DateTime}  
          timeConvention={TimeConvention.Hours12}  
          timeDisplayControlType={TimeDisplayControlType.Dropdown}  
          showLabels={true}  
          value={date} 
          onChange={onchangedDate}          
        /></td>
        
    <td className={styles.tdBorder}><div id="pplpkFTE"><PeoplePicker
    context={contextProp}
    personSelectionLimit={1}
    groupName={""} 
    showtooltip={true}
    isRequired={true}
    disabled={false}
    selectedItems={getPeoplePickerItems}
    showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} /></div></td>

        <td className={styles.tdBorder}><Dropdown
        placeholder="Select an option"        
        options={decisions}
        styles={dropdownStyles} /></td>
  </tr>  
   
              )
          })}
        </table> 

        <DefaultButton text="Add New" onClick={handleAddNew} />
      </div>
    );
  };
  
  export default ExecDecisionRecord;