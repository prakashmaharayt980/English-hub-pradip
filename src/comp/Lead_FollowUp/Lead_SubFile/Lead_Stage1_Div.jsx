
import SubmittedSelectionCheck from './Lead_subFile_sub/SubmittedSelectionCheck';
import Stage1_Div_Message_Div from './Lead_subFile_sub/Stage1_Div_Message_Div'
import Stage1_Div_Top from './Lead_subFile_sub/Stage1_Div_Top';
import { useContext, useEffect } from 'react';
import { Leadcontext } from '../../../Assects/Lead_Context';
import { Sub_Lead_Contex } from '../../../Assects/Sub_Lead_Context';
import { useNavigate } from 'react-router-dom';
function Lead_Stage1_Div() {
  const { leadstudents } = useContext(Leadcontext)
  const {  SubLeadstudents,Subparams } = useContext(Sub_Lead_Contex)
  const ReloadingToParent=useNavigate()
  useEffect(()=>{
    if(Subparams ==='' ){
     ReloadingToParent('/')
    }
  },[Subparams])
  return (
    <div className="flex flex-col justify-center w-screen">
      {(leadstudents && leadstudents.results && leadstudents?.results && SubLeadstudents && SubLeadstudents?.data) &&
        (
          <div className="m-auto" style={{ width: '99%' }}>
            <Stage1_Div_Top />
            <SubmittedSelectionCheck />
            <Stage1_Div_Message_Div />
          </div>
        )
      }
    </div>
  );
}

export default Lead_Stage1_Div;
