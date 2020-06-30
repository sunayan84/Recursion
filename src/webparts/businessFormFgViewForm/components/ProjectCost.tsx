import * as React from 'react';
import styles from './BusinessFormFgViewForm.module.scss';
import { DefaultButton } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';



const ProjectCost: React.FC = () => {

    const [count, setCount] = React.useState([1]);
    function handleAddNew(): void {
        let newCount = count.length + 1;
        setCount([...count, newCount]);
    }

    const [textValue, setTextValue] = React.useState('');
    function handleInput(event): void {
       let value = event.value;
       setTextValue(value);
       console.log(`exampelt textfield value : ${value}`); 
    }
    

    

    return (
      <div>
          <table className={styles.classMainTable}>
  <tr>
    <td className={styles.tdCost2}>Line Item</td>
    <td className={styles.tdCost2}>Capex Amount</td>
    <td className={styles.tdCost2}>Opex Amount</td>
    <td className={styles.tdCost2}>Total Budget</td>
    <td className={styles.tdCost2}>Capex Budget</td>
    <td className={styles.tdCost2}>Opex Budget</td>
    <td className={styles.tdCost2}>Total Budget</td>
  </tr>
          {count.map( c => {
              return (               
                
  <tr>
  <td><TextField readOnly required /></td>
  <td><TextField readOnly required /></td>
  <td><TextField readOnly required /></td>
  <td><TextField readOnly required /></td>
  <td><TextField readOnly required /></td>
  <td><TextField readOnly required /></td>
  <td><TextField readOnly required /></td>
  </tr>

                
              )
          })}
        
        </table>
        <DefaultButton text="Add New" onClick={handleAddNew} />
        <TextField onChange={handleInput} value={textValue} />
      </div>
    );
  };
  
  export default ProjectCost;