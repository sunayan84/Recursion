import * as React from 'react';
import { useContext } from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import styles from './BusinessFormFg.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { BusinessFormContext } from '../context/BusinessFormProvider';
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
 const dpselectedItem= { key:'',text:'Select an Option' };
  
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
    contextProp: WebPartContext,
    value1: string[],    
    value2?: { key: string | number | undefined,text: string | number | undefined },
    value3?: string
  }

const Stakeholders: React.FC<IProps> = ({contextProp,value2,value3 } : IProps) => {

    const [count, setCount] = React.useState([1]);
    value2 = { key: '', text: 'Select an Option'};
    value3 = "";
    function handleAddNew(): void {
        let newCount = count.length + 1;
        setCount([...count, newCount]);
    }
    

    function getPeoplePickerItems(items: any[]): void {
        console.log('Items:', items);
        
      }

    const  { businessFormData, setBusinessFormData } = useContext(BusinessFormContext);
    console.log(` businessFormData : ${businessFormData}`);

    const handleContactChagne = useConstCallback(
      (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        console.log(` newValue : ${newValue}`);
        let stakeholder = businessFormData.stakeholderDetails[count-1];
        stakeholder.contactInfo = newValue;
        setBusinessFormData(businessFormData);
      },
    );

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
                    <div id="pplpkStakeholder">
                      <PeoplePicker
                          context={contextProp}
                          personSelectionLimit={1}
                          groupName={""} 
                          showtooltip={true}
                          isRequired={true}
                          disabled={false}
                          selectedItems={getPeoplePickerItems}
                          showHiddenInUI={false}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={1000} />
                    </div>
                    <div className={styles.normalGap}></div>
                  </td>

                <td className={styles.tdStakeHolder}>
                  <Stack tokens={stackTokens}>
                    <Dropdown
                      placeholder="Select an option"
                      selectedKey={value2.key ? '' : value2.key}         
                      options={options}
                      styles={dropdownStyles} />
                  </Stack>
                </td>

                <td className={styles.tdStakeHolder}>
                  <TextField name="contact" required value={businessFormData.stakeholderDetails[c-1].contactInfo} onChange={handleContactChagne} />
               </td>

              </tr> 

            </table>    
              )
          })}
        

        <DefaultButton text="Add New" onClick={handleAddNew} />
      </div>
    );
  };
  
  export default Stakeholders;