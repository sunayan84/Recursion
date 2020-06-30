import * as React from 'react';

import styles from './BusinessFormFgViewForm.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react';  
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


interface IProps {
    contextProp: WebPartContext
  }
  const functions: IDropdownOption[] = [
    { key: '', text: 'Select an Option'},
    { key: 'Sales', text: 'Sales' },
    {key:'HR', text:'HR'},
    {key:'Finance', text:'Finance'},
    {key:'Legal', text:'Legal'},
    {key:'IT', text:'IT'}  
  ];
  

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
    
  }

const StaffingResources: React.FC<IProps> = ({contextProp } : IProps) => {

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
          <div>
          <table className={styles.classMainTable}>
                             <tr><td className={styles.tdFunction}>FUNCTION</td>
                             <td className={styles.tdCapReq}>CAPABILITY REQUIREMENTS</td>
                             <td className={styles.tdFTE}>FTE</td></tr> 
          {count.map( c => {
              return (                              

                        <tr key={c}>
                        <td><Dropdown
                        placeholder="Select an option"        
                        options={functions}
                        styles={dropdownStyles} /></td>
                        <td><TextField readOnly /></td>
                        <td><div id="pplpkFTE"><PeoplePicker
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
                             </tr>
                                 
                      
              )
          })}
          </table>
     </div>
        

        <DefaultButton text="Add New" onClick={handleAddNew} />
      </div>
    );
  };
  
  export default StaffingResources;