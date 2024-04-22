
// SubmittedSelectionCheck.jsx children
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { methodways } from '../../../../Assects/Database_Of_lead'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Lead_Overal_Value_view({ open, close, valueinServerWithStageLocation }) {
  const [ViewSelected, setViewSelected] = useState('')
  const [viewOveralComment, setviewOveralComment] = useState(false)
 

  return (
    <>
      {

        viewOveralComment === false && (
          <Dialog open={open} maxWidth="lg" fullWidth className=' h-dvh' >
            <DialogActions>
              <Button onClick={close} >close</Button>
              <Button onClick={() => setviewOveralComment(true)} >OverAll-Comment</Button>
            </DialogActions>
            <DialogTitle>Lead stage :{valueinServerWithStageLocation.stage_no}</DialogTitle>

          <DialogContent>
          <div className="flex flex-row  justify-around gap-4 ">
              {methodways.map((method) => (
                <div
                  key={method.name}
                  className={` py-4 px-7 border rounded-md cursor-pointer flex items-center  justify-center transition-colors duration-300 
                        ${ViewSelected === method?.label ? 'border-blue-500 bg-blue-100' : 'border-gray-200 hover:bg-gray-100'}
                        ${valueinServerWithStageLocation[method.isname] === null ? ' pointer-events-none' : ''}
                        `}
                  onClick={() => setViewSelected(method.label)}
                >
                  <span className="text-lg font-semibold">{method.label}</span>
                  {
                    valueinServerWithStageLocation[method.isname] === null ? '' : (
                      <FontAwesomeIcon icon={valueinServerWithStageLocation[method.isname] === "Yes" ? faCheck : faXmark} className={`ml-2 ${valueinServerWithStageLocation[method.isname] === "Yes" ? ' text-green-500' : ' text-red-700'}`} />
                    )
                  }
                </div>
              ))}
            </div>

            {
              (valueinServerWithStageLocation?.student_leads_content.length === 0 ?
                (<DialogContentText>
                  <h1>Empty </h1>
                </DialogContentText>)
                :
                (<div className=' border p-2 mx-auto w-full h-dvh mt-4 '  >
                  {
                    valueinServerWithStageLocation?.student_leads_content.map((lead, index) => {

                      if (lead.content_type === ViewSelected) {
                        return (
                          <Box key={index}>
                            <DialogTitle>Title </DialogTitle>
                            <DialogContentText className=' border-b mb-1' dangerouslySetInnerHTML={{ __html: lead.title === null ? 'Empty ' : lead.title }} />
                            <DialogTitle>Short Description</DialogTitle>
                            <DialogContentText className=' border-b mb-1' dangerouslySetInnerHTML={{ __html: lead.short_description === null ? "Empty" : lead.short_description }} />
                            <DialogTitle>Content</DialogTitle>
                            <DialogContentText className=' border-b mb-1' dangerouslySetInnerHTML={{ __html: lead.content === null ? "Empty" : lead.content }} />
                            <Box className='flex flex-col gap-1'>
                              <span>Created by:{lead?.created_by} </span>
                              <span>Created_at:{lead.created_at} </span>
                            </Box>
                          </Box>
                        )
                      }
                    })
                  }
                </div>)
              )
            }
          </DialogContent>
          </Dialog>
        )
      }
      {
        viewOveralComment === true && (
          <Dialog open={viewOveralComment} className='  mx-auto h-dvh mt-4 ' maxWidth="md" fullWidth
          >
            <DialogActions>
              <Button onClick={() => setviewOveralComment(false)} >close</Button>
            </DialogActions>
            <DialogTitle className=' border-b '>Overall Comments </DialogTitle>
            <Box className=' border-r border-l h-dvh mt-4  '>
              <DialogContentText dangerouslySetInnerHTML={{ __html: valueinServerWithStageLocation?.overall_comment === null ? 'No Comment Yet' : valueinServerWithStageLocation?.overall_comment }} />

            </Box>
          </Dialog>
        )
      }
    </>

  )
}
Lead_Overal_Value_view.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
  valueinServerWithStageLocation: PropTypes.object.isRequired
}