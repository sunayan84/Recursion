import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';

class PeoplePickerControl extends Component{
    render(){
        return
        <div>
      <PeoplePicker
    context={this.props.context}
    titleText="People Picker"
    personSelectionLimit={3}
    groupName={""} 
    showtooltip={true}
    isRequired={true}    
    selectedItems={this._getPeoplePickerItems}
    showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} />
       </div> 
    }
}
export default PeoplePickerControl;
