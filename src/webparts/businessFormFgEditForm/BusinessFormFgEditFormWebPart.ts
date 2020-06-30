import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { autobind } from 'office-ui-fabric-react';
import { IBusinessFormFgEditFormState } from './components/IBusinessFormFgEditFormState';
import { IDatetimepickercontrolProps } from './components/IDatetimepickercontrolProps';
import { SPHttpClient } from '@microsoft/sp-http';
import { IListItem } from './components/IListItem';
import { IControls } from './components/IControls';

import * as strings from 'BusinessFormFgEditFormWebPartStrings';
import BusinessFormFgEditForm from './components/BusinessFormFgEditForm';
import { IBusinessFormFgEditFormProps } from './components/IBusinessFormFgEditFormProps';

export interface IBusinessFormFgEditFormWebPartProps {
  description: string;
  context:WebPartContext;
  listName: string;  
  siteURL: string;
  spHttpClient: SPHttpClient; 
  date:Date,
  status1: string;
  items: IListItem[];
  data:IControls
}

export default class BusinessFormFgEditFormWebPart extends BaseClientSideWebPart <IBusinessFormFgEditFormWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBusinessFormFgEditFormProps,any> = React.createElement(
      BusinessFormFgEditForm,
      {
        description: this.properties.description,
        context: this.context,               
        listName: this.properties.listName,
        siteURL: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient,
        date:this.properties.date,
        status1:this.properties.status1,
        items:this.properties.items,
        data:this.properties.data
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
