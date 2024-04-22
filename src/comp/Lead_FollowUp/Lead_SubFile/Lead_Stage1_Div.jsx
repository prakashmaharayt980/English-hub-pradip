
import SubmittedSelectionCheck from './Lead_subFile_sub/SubmittedSelectionCheck';
import Stage1_Div_Message_Div from './Lead_subFile_sub/Stage1_Div_Message_Div'
import Stage1_Div_Top from './Lead_subFile_sub/Stage1_Div_Top';
import { useContext, useEffect } from 'react';

import { Sub_Lead_Contex } from '../../../Assects/Sub_Lead_Context';
import { useNavigate } from 'react-router-dom';
import { Leadcontext } from '../../../Assects/Lead_Context';
function Lead_Stage1_Div() {

  const { SubLeadstudents, Subparams, } = useContext(Sub_Lead_Contex)
  const { param} = useContext(Leadcontext)
  console.log("🚀 ~ Lead_Stage1_Div ~ params:", param)
  const ReloadingToParent = useNavigate()
  useEffect(() => {
    if (Subparams ==='' ) {
      ReloadingToParent('/')
     
    }
  }, [Subparams])
 
  // finding student leadstage position like stage_No=1,or 7
  const findhighest = (studentlead) => {
    let higestvalue = 0
    let higestvalueContanorIndex = 0
    if (studentlead) {
      studentlead.forEach((lead, index) => {
        const v = lead.stage_no
        if (v > higestvalue) {
          higestvalue = v
          higestvalueContanorIndex = index
        }
      })
    }
    return {
      higestvalue, higestvalueContanorIndex
    }
  }
  const { higestvalue, higestvalueContanorIndex } = findhighest(SubLeadstudents?.data?.student_leads)



  return (
    <div className="flex flex-col justify-center w-screen">
      {
        (SubLeadstudents?.data?.student_leads || SubLeadstudents?.data?.student_leads[higestvalueContanorIndex].stage_no)
        &&
        (
          <div className=" mx-auto mt-2" style={{ width: '99%' }}>
            <Stage1_Div_Top />
            <SubmittedSelectionCheck />
            { param !==7 &&
              (<Stage1_Div_Message_Div higestvalueContanorIndex={higestvalueContanorIndex}
                StageValue={higestvalue}
                />)
            }
          </div>
        )
      }
    </div>
  );
}

export default Lead_Stage1_Div;
