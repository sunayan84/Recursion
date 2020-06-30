import { WebPartContext } from '@microsoft/sp-webpart-base';
import {IListItem} from './IListItem';
import { SPHttpClient } from '@microsoft/sp-http';
import { IControls } from './IControls';

export interface IBusinessFormFgEditFormProps {
  description: string;
  context:WebPartContext;
  date:  Date;
  listName: string;
  siteURL: string;
  spHttpClient: SPHttpClient;
  status1: string;
  items: IListItem[]; 
  data:IControls
}
