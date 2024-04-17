
// chlidren of Lead_folow_Up_Main file

import { useState } from 'react';
import { USer_stage } from '../../../Assects/Database_Of_lead';
import Stage_sep_Bottom from '../../../Assects/Stage_sep_Botton';
const Lead_stage_seperation_Div = () => {
  const [CurrentStage, setCurrentStage] = useState(0)
   const handlestageid=(id)=>{
      setCurrentStage(id)
   }
  return (
    <div className='flex flex-col relative flex-wrap justify-start gap-4 my-2 '>
      <h1
        className='lead_head h1_head'
        style={{ width: '500px' }}>User List</h1>
      <div className='flex flex-row gap-5 justify-start'>
        {
          USer_stage.map((stage) => (
            <Stage_sep_Bottom
            isActive={stage.stepcount===CurrentStage}
             key={stage.id} 
             leadLabel={stage.label}             
             count={stage.stepcount} 
             currentstage={handlestageid}
             chiplabel={stage.labelnum} />
          ))
        }
      </div>
    </div>
  );
}

// Lead_User_stage.propTypes={
//   userlength:PropTypes.number,

// }
export default Lead_stage_seperation_Div;
