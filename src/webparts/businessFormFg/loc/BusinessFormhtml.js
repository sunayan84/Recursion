import React from 'react';
import ReactDOM, {Component} from 'react-dom';

class BusinessFormhtml extends Component{
render(){
    return <div>     
        <table style="width:100%;border:1px solid black">
    <tr><td></td><td></td><td></td><td></td></tr>
  <tr style="width:100%;border:1px solid black">
    <td style="color:white">Project Title</td>
    <td><input type="text" id="fname" name="projecttitle" style="width:100%" /></td>   
  </tr>
  <tr>
    <td style="background-color:#575d66;color:white">SUBMITTED BY</td>
    <td style="width:25%!important;border:1px solid"><input type="text" id="fname" name="submittedby" /></td>
    <td style="background-color:#575d66;color:white;border:1px solid black">PROJECT TYPE</td>
    <td><input type="text" id="fname" name="projecttype" /></td>   
  </tr>
  <tr>
    <td style="background-color:#575d66;color:white">PHONE / EMAIL</td>
    <td style="width:25%!important;border:1px solid"><input type="text" id="fname" name="submittedby" /></td>
    <td style="background-color:#575d66;color:white;border:1px solid black">TOTAL ESTIMATED BUDGET
    </td>
    <td><input type="text" id="fname" name="projecttype" /></td>   
  </tr>
  <tr>
    <td style="background-color:#575d66;color:white">DATE OF PROPOSAL</td>
    <td style="width:25%!important;border:1px solid"><input type="text" id="fname" name="submittedby" /></td>
    <td style="background-color:#575d66;color:white;border:1px solid black">VERSION NO</td>
    <td><input type="text" id="fname" name="projecttype" /></td>   
  </tr>
  <tr>
    <td style="background-color:#575d66;color:white">PROJECTED START DATE</td>
    <td style="width:25%!important;border:1px solid"><input type="text" id="fname" name="submittedby" /></td>
    <td style="background-color:#575d66;color:white;border:1px solid black">PROJECTED COMPLETION DATE</td>
    <td><input type="text" id="fname" name="projecttype" /></td>   
  </tr>
</table>
<div style="background-color:white;height:30px;"></div>
<div style="background-color:#767c94;height:auto;color:white;"><span>PROJECT SPONSOR   Commissions delivery of and champions project; Provides vision and direction; Accepts responsibility 
</span></div>
<div id="pplpk1"></div>
    </div>
    
}

}
export default BusinessFormhtml;