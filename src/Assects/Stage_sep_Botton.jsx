// children of lead_stage_seperation_Div file

import{Avatar, Stack,Chip }from '@mui/material';
import { useContext} from 'react';
import { Leadcontext } from './Lead_Context';
import PropTypes from 'prop-types'

function Stage_sep_Bottom({count,leadLabel,chiplabel,isActive}) {
  const {setparam, setleadstudents}=useContext(Leadcontext) 
  const handleStageId=()=>{  
       setparam(count) 
       setleadstudents({})                
  }
  return (
    <Stack direction="row" spacing={2} onClick={handleStageId} >
       <Chip avatar={<Avatar sx={{
        background:isActive?'blue':'#4CAF50',
       }} >
        <span style={{ 
        color:'white'}}>{chiplabel} </span></Avatar>} label={leadLabel} />
    </Stack>
  )
}
Stage_sep_Bottom.propTypes={
  count:PropTypes.number,
  leadLabel:PropTypes.string,
  chiplabel:PropTypes.any,
  currentstage:PropTypes.func,
  isActive:PropTypes.bool
}
export default Stage_sep_Bottom
