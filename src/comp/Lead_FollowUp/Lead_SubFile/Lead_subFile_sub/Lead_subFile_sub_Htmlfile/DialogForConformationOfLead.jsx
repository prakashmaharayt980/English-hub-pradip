
// childern of Stage1_Div_Message_Div
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

function DialogForConformationOfLead({ResetWarning,handleResetCancel,handleResetOk}) {
  return (
    <div>
       <Dialog open={ResetWarning} onClose={handleResetCancel}>
          <DialogTitle>
            Conformation
          </DialogTitle>
          <DialogContent>
            Are You sure You Want to Change
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleResetCancel()}>Cancel</Button>
            <Button onClick={()=>handleResetOk()}>Sure</Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

DialogForConformationOfLead.propTypes={
  ResetWarning:PropTypes.bool,
  handleResetCancel:PropTypes.func,
  handleResetOk:PropTypes.func
}
export default DialogForConformationOfLead
