import * as React from 'react';
import styles from './BusinessFormFg.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton } from 'office-ui-fabric-react';


export interface IProps {
    contextProp: WebPartContext,
    value: string[]
  }


const ProjectSponsor: React.FC<IProps> = ({contextProp } : IProps, {value} :IProps) => {

    const [count, setCount] = React.useState([1]);

    

    function getPeoplePickerItems(items: any[]): void {
        console.log('Items:', items);
      }
    

    return (
      <div>
          
          {count.map( c => {
              return (
                <div id="pplpk1" key={c}>
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
                        resolveDelay={1000} /><br />
                </div>
              )
          })}
        

        
      </div>
    );
  };
  
  
  export default ProjectSponsor;