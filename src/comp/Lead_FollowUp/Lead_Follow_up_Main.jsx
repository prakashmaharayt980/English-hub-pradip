import { useCallback, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Is_LoadingDiv from '../../Assects/Is_LoadingDiv';
import Lead_stage_seperation_Div from './Lead_SubFile/Lead_stage_seperation_Div'
import Lead_user_Table from './Lead_SubFile/Lead_user_Table'
import { Leadcontext } from '../../Assects/Lead_Context';
import { Sub_Lead_Contex, Sub_Lead_ContextProvider } from '../../Assects/Sub_Lead_Context';
function Lead_Follow_up_Main() {
  const { leadstudents } = useContext(Leadcontext)
  const {SubLeadstudents,setSubparams,SubLeadDetails,Subparams}=useContext(Sub_Lead_Contex)
  const NavigationtoTOInitalStage=useNavigate()

  // goes to lead_Stage1_Div file
  const handleuserStage =useCallback((StudentleadFromUser) => {
    if (StudentleadFromUser) {
      setSubparams(`${StudentleadFromUser}/leads-details`)       
    }
    if(Subparams !==''  ){
      SubLeadDetails()
    }    
    if(SubLeadstudents!=='' &&Subparams !=='' && SubLeadstudents ){   
     setTimeout(() => {
      NavigationtoTOInitalStage('/stage1',{replace:true})
     },1000);
    }
  },[Subparams,SubLeadstudents])
 
  return (
    <div className=" mx-auto mt-3 px-4 py-8" style={{
      width: '75vw',
      border: '1px solid #ebdddd',
      borderRadius: '15px'
    }}>
      {
        Object.keys(leadstudents).length===0 ? (
          <Is_LoadingDiv />
        ) : (
          <Sub_Lead_ContextProvider>
            <Lead_stage_seperation_Div />
            <Lead_user_Table handleuserStage={handleuserStage} />
          </Sub_Lead_ContextProvider>
        )
      }
    </div >

  )
}
export default Lead_Follow_up_Main;
