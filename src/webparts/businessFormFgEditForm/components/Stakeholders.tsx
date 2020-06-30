import * as React from 'react';

import styles from './BusinessFormFgEditForm.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
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
    dropdown: { width: 375 },
    
  }
  const stackTokens: IStackTokens = { childrenGap: 20 };
interface IProps {
    contextProp: WebPartContext
  }

const Stakeholders: React.FC<IProps> = ({contextProp } : IProps) => {

    const [count, setCount] = React.useState([1]);

    function handleAddNew(): void {
        let newCount = count.length + 1;
        setCount([...count, newCount]);
    }

    function getPeoplePickerItems(items: any[]): void {
        console.log('Items:', items);
      }

    return (
      <div>
          
          {count.map( c => {
              return (
                <table className={styles.classMainTable}>
                <tr>
              <td className={styles.normalSubHeading}>STAKEHOLDER NAME</td>
                <td className={styles.normalSubHeading}>STAKEHOLDER ROLE</td>
                <td className={styles.normalSubHeading}>CONTACT INFO</td>
                </tr>
                
                        <tr key={c}>
        <td className={styles.tdStakeHolder}>
        <div id="pplpkStakeholder"><PeoplePicker
    context={contextProp}
    personSelectionLimit={1}
    groupName={""} 
    showtooltip={true}
    isRequired={true}
    disabled={false}
    selectedItems={getPeoplePickerItems}
    showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} /></div>
    <div className={styles.normalGap}></div>
        </td>
        <td className={styles.tdStakeHolder}>
        <Stack tokens={stackTokens}>
        <Dropdown
        placeholder="Select an option"        
        options={options}
        styles={dropdownStyles} />
        </Stack>
        </td>
        <td className={styles.tdStakeHolder}><TextField /></td>
      </tr> 
      </table>    
              )
          })}
        

        <DefaultButton text="Add New" onClick={handleAddNew} />
      </div>
    );
  };
  
  export default Stakeholders;