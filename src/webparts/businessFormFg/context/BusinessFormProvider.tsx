import React, { useState, createContext } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IBusinessFormFgState } from '../components/IBusinessFormFgState';

export const BusinessFormContext = createContext<any>({});

const BusinessFormInitialValue = {
    stakeholderDetails : [{ ppkDetails : [], stakeHodlerRole : '', contactInfo: '' }]
}

// const stakeholderDetailsInitialValue = {
//     stakeholderDetails : [{ ppkDetails : [], stakeHodlerRole : '', contactInfo: '' }];
// }

function BusinessFormProvider(props: any) {

    const [businessFormData, setBusinessFormData] = useState<any>(BusinessFormInitialValue);

    //const [ stakeholderDetails, setStakeholderDetails ] = useState<any>(BusinessFormInitialValue);
    
    return (
      <BusinessFormContext.Provider value={{ businessFormData, setBusinessFormData }}>
          {props.children}
      </BusinessFormContext.Provider>
    );
};

export default BusinessFormProvider;