import * as React from 'react';
import styles from './BusinessFormFg.module.scss';
import { DefaultButton } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IProps {        
    value1:string,
    value2:string,
    value3:string,
    value4:string,
    value5:string,
    value6:string,
    value7:string,
  }


  const ProjectCost: React.FC<IProps> = ({value1,value2,value3,value4,value5,value6,value7} : IProps) => {

    function LineItemOnchanged(lineItem:string)
    {
        this.setState({value1: lineItem});
        console.log("ContactInfo value is : "+ value1);      
    }  
    function CapexAmountOnchanged(capexAmount:string)
    {
        this.setState({value2: capexAmount});
        console.log("ContactInfo value is : "+ value2);      
    } 
    function OpexAmountOnchanged(opexAmount:string)
    {
        this.setState({value3: opexAmount});
        console.log("ContactInfo value is : "+ value3);      
    } 
    function TotalAmountOnchanged(lineItem:string)
    {
        this.setState({value4: lineItem});
        console.log("ContactInfo value is : "+ value4);      
    } 
    function CapexBudgetOnchanged(lineItem:string)
    {
        this.setState({value5: lineItem});
        console.log("ContactInfo value is : "+ value5);      
    } 
    function OpexBudgetOnchanged(lineItem:string)
    {
        this.setState({value6: lineItem});
        console.log("ContactInfo value is : "+ value6);      
    } 
    function TotalBudgetOnchanged(totalBudget:string)
    {
        this.setState({value7: totalBudget});
        console.log("ContactInfo value is : "+ value7);      
    }   
    const [count, setCount] = React.useState([1]);
    function handleAddNew(): void {
        let newCount = count.length + 1;
        setCount([...count, newCount]);
    }

    const [textValue, setTextValue] = React.useState('');
    function handleInput(event): void {
       let value = event.value;
       setTextValue(value);
       console.log(`example textfield value : ${value}`); 
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
  <td><TextField required value={value1} onChanged={LineItemOnchanged.bind(this)} /></td>
  <td><TextField required value={value2} onChanged={CapexAmountOnchanged.bind(this)} /></td>
  <td><TextField required value={value3} onChanged={OpexAmountOnchanged.bind(this)} /></td>
  <td><TextField required value={value4} onChanged={TotalAmountOnchanged.bind(this)} /></td>
  <td><TextField required value={value5} onChanged={CapexBudgetOnchanged.bind(this)} /></td>
  <td><TextField required value={value6} onChanged={OpexBudgetOnchanged.bind(this)} /></td>
  <td><TextField required value={value7} onChanged={TotalBudgetOnchanged.bind(this)} /></td>
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