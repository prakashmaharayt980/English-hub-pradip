
// chlidren of Lead_folow_Up_Main file

import {  useContext } from 'react';
import { USer_stage } from '../../../Assects/Database_Of_lead';
import Stage_sep_Bottom from '../../../Assects/Stage_sep_Botton';
import { Leadcontext } from '../../../Assects/Lead_Context';
const Lead_stage_seperation_Div = () => {
const {param}=useContext(Leadcontext)

  return (
    <div className='flex flex-col relative flex-wrap justify-start gap-4 my-2 '>
      <h1
        className='lead_head h1_head'
        style={{ width: '500px' }}>User List</h1>
      <div className='flex flex-row gap-5 justify-start'>
        {
          USer_stage.map((stage) => (
            <Stage_sep_Bottom
            isActive={stage.stepcount===param}
             key={stage.id} 
             leadLabel={stage.label}             
             count={stage.stepcount}            
          
             chiplabel={stage.labelnum} />
          ))
        }
      </div>
    </div>
  );
}


export default Lead_stage_seperation_Div;
