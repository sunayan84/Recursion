import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IListItem } from './IListItem';
import { IControls } from './IControls';

export interface IDatetimepickercontrolProps {  
  description: string;  
  context: WebPartContext; 
  date: Date;
  status1: string;
  items: IListItem[];
  data:IControls
}