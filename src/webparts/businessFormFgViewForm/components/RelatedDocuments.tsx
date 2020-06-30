import * as React from 'react';

import styles from './BusinessFormFgViewForm.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
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

const RelatedDocuments: React.FC = () => {

    const [count, setCount] = React.useState([1]);

    function handleAddNew(): void {
        let newCount = count.length + 1;
        setCount([...count, newCount]);
    }
    

    return (
      <div>
          <div>
          <table className={styles.classMainTable}>
                             <tr>
                           <td className={styles.tdFunction2}>FUNCTION</td>
                           <td className={styles.tdDesc}>DESCRIPTION</td>
                           <td className={styles.tdFileLocation}>FILE NAME / LOCATION / LINK</td>
                             </tr>
          {count.map( c => {
              return (                              

                        <tr key={c}>
                        <td><Dropdown
                            placeholder="Select an option"        
                            options={functions}
                            styles={dropdownStyles} /></td>
                            <td><TextField readOnly /></td>
                        <td><TextField readOnly /></td>
                        </tr>  
              )
          })}
          </table>
     </div>
        

        <DefaultButton text="Add New" onClick={handleAddNew} />
      </div>
    );
  };
  
  export default RelatedDocuments;