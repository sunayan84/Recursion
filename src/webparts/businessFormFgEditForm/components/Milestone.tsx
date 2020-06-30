import * as React from 'react';

import styles from './BusinessFormFgEditForm.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react';  
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker';


interface IProps {
    date: Date
  }

const Milestone: React.FC<IProps> = ({date } : IProps) => {

    const [count, setCount] = React.useState([1]);

    function handleAddNew(): void {
        let newCount = count.length + 1;
        setCount([...count, newCount]);
    }

    
       
      function onchangedStartDate(date: any): void {  
        this.setState({ date: date });  
      } 

    return (
      <div>
          <div>
                <div className={styles.normalSubHeading}><span>TIMELINE / MILESTONES
                </span></div>
                      <table className={styles.classMainTable}>
                      <tr><td className={styles.tdMilesStonesDetails}>MILESTONE</td>
                      <td className={styles.tdDeadline}>DEADLINE</td></tr>
          {count.map( c => {
              return (                              
                       
                      <tr key={c}>
                        <td className={styles.dateTimePicker}><TextField />
                        </td>
                        <td>
                          <div className={styles.dateTimePicker}>
                        <DateTimePicker  
                          dateConvention={DateConvention.DateTime}  
                          timeConvention={TimeConvention.Hours12}  
                          timeDisplayControlType={TimeDisplayControlType.Dropdown}  
                          showLabels={true}  
                          value={date} 
                          onChange={onchangedStartDate}          
                        /> </div> 
                        </td>
                        </tr>        
                      
              )
          })}
          </table>
                      </div>
        

        <DefaultButton text="Add New" onClick={handleAddNew} />
      </div>
    );
  };
  
  export default Milestone;