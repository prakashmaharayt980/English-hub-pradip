// Children of Lead_Stage1_Div

import { useFormik } from 'formik';
import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup'
import DialogForConformationOfLead from './Lead_subFile_sub_Htmlfile/DialogForConformationOfLead';
import YesNoDiv from './Lead_subFile_sub_Htmlfile/YesNoDiv';
import { NoDiv, YesDiv } from './Lead_subFile_sub_Htmlfile/YesNoContents';
import LeadFollowupSelectionDiv from './Lead_subFile_sub_Htmlfile/LeadFollowupSelectionDiv';

import { Sub_Lead_Contex } from '../../../../Assects/Sub_Lead_Context';
export default function Stage1_Div_Message_Div() {
  const [selectedMethod, setSelectedMethod] = useState('');
  // const [CountSubmitted, setCountSubmitted] = useState(1)
  const [SuccessMeg, setSuccessMeg] = useState('')
  const [ResetWarning, setResetWarning] = useState(false)
  const [prevSelectedMethod, setprevSelectedMethod] = useState('')
  const { SubLeadstudents, setResposeUpadateLeadPostValue } = useContext(Sub_Lead_Contex)

  const navLeadfollowUp = useNavigate();
  // followup methodys
  const methodways = useMemo(() =>
    [
      { label: 'Notification', name: 'notification', isname: 'is_notification' },
      { label: 'Sms', name: 'sms', isname: 'is_sms' },
      { label: 'Email', name: 'email', isname: 'is_email' },
      { label: 'WhatsApp', name: 'whatapp', isname: 'is_whatapp' },
      { label: 'Call', name: 'call', isname: 'is_call' },
      { label: 'Viber', name: 'viber', isname: 'is_viber' },
    ]
    , [])
  // initialization
  const initialValues = {
    maincomments: []
  }
  methodways.forEach((method) => {
    initialValues[method.name] = false;
    initialValues[`${method.name}_yes`] = false;
    initialValues[`${method.name}_no`] = false;
    initialValues[`${method.name}-title`] = '';
    initialValues[`${method.name}-message`] = '';
    initialValues[`${method.name}-main-comments`] = '';
  })


  //  validation schema
  const validationSchema = useMemo(() =>
    Yup.object().shape({
      [`${selectedMethod}-title`]: Yup.string().required(`${selectedMethod} required title`),
      [`${selectedMethod}-message`]: Yup.string().required(`${selectedMethod} required message`),
      [`${selectedMethod}-main-comments`]: Yup.string().required(`${selectedMethod} required Main Comments`),
    }), [selectedMethod]
  )
  const studentleadlength = SubLeadstudents?.data?.student_leads?.length
  const studentleadDeSturcure = SubLeadstudents?.data?.student_leads
  const isValueKey = methodways.find(method => method.name === selectedMethod)?.isname;
  // formik
  const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwNTY0NTM1LCJpYXQiOjE3MTI4MDQ1MzUsImp0aSI6IjVlNWM1ZGM4ZjljYTQxNzZiM2Y3NzNkNDUzZDhiMDM2IiwidXNlcl9pZCI6NTA4NDN9.5PqVc-fIeG5rUIvIxnkH64jPUDTYnYS6PKg-cUZFY2g'

      const header = {
        Authorization: `Bearer ${token} `
      }
      // event.preventDefault
      try {
        const url = 'https://edev.englishhub.app/api/v1/leads/post-leads/'
        values.maincomments.push(values[`${selectedMethod}-main-comments`])
        const response = await axios.post(url, {
          leads_content: [
            {
              title: values[`${selectedMethod}-title`],
              short_description: values[`${selectedMethod}-message`],
              type: selectedMethod,
              content: values[`${selectedMethod}-main-comments`],
            }
          ],
          user_id: SubLeadstudents?.data?.student_id,
          stage_no: studentleadlength === 0 ? 1 : (studentleadDeSturcure[studentleadlength - 1]?.stage_no),
          overall_comment: DOMPurify.sanitize(`<p>${values.maincomments}</p>.join('\n')`),
          [`${isValueKey}`]: "Yes"

        }, {
          headers: header
        }
        );

        if (response.status === 200) {
          TypeConditionChange()
          setSelectedMethod('')
          setprevSelectedMethod('')

          // show completed depend on number of true
          // if (CountSubmitted <= 6) {
          //   setCountSubmitted(CountSubmitted + 1)
          //   setSuccessMeg(
          //     `${selectedMethod} is submitted`
          //   )
          //   if (CountSubmitted === 5) {
          //     setSuccessMeg(`Stage ${studentleadDeSturcure[0]?.stage_no} is Completed`)
          //     setTimeout(() => {
          //       navLeadfollowUp('/', { replace: true, state: { stage: true, id: response?.id } });
          //     }, 4000)
          //   }
          //   console.log('couynt', CountSubmitted);
          // }
        }
        if (response.data && response.status === 200) {
          const resposeData = response.data
          setResposeUpadateLeadPostValue(resposeData)
        }
      } catch (error) {
        setSuccessMeg(error.message || "error")
      } finally {
        // for new msg or new followup messag of success
        setTimeout(() => {
          setSuccessMeg('')
        }, 2000);
      }
    },
  });
  useEffect(() => {
    if (prevSelectedMethod !== '' && selectedMethod !== prevSelectedMethod) {
      setResetWarning(true)
    }
  }, [selectedMethod, prevSelectedMethod]);

  // selection of followup div to determine which followup is
  const handleMethodSelect = (method) => {
    if (selectedMethod === '') {
      setSelectedMethod(method)
      setprevSelectedMethod(method)
    }
    else if (prevSelectedMethod !== '' && selectedMethod === prevSelectedMethod) {
      setprevSelectedMethod(method)
    }
  };
  // checking checkbox value to render html
  const handleYesNo = useCallback((e) => {
    const { name, checked } = e.target;
    const [method] = name.split('_');
    if (checked && name.endsWith('_yes')) {
      setFieldValue(`${method}_no`, false);
    } else if (checked && name.endsWith('_no')) {
      setFieldValue(`${method}_yes`, false);
    }
    handleChange(e);
  }, [handleChange, setFieldValue])

  //when new follow is selected or changing followup befor submitting
  const TypeConditionChange = () => {
    setFieldValue(`${selectedMethod}_yes`, false);
    setFieldValue(`${selectedMethod}_no`, false);
  }
  // function to handle dailogbox
  const handleResetCancel = () => {
    setprevSelectedMethod(selectedMethod)
    setResetWarning(false)
  }
  const handleResetOk = () => {
    setSelectedMethod(prevSelectedMethod)
    TypeConditionChange();
    setResetWarning(false);
  }
  return (
    <>
      {
        Object.keys(SubLeadstudents).length > 0 && (
          <div className=" w-full mt-2 px-4 py-8 box-design" >
            <form onSubmit={handleSubmit}>
              <LeadFollowupSelectionDiv
                methodways={methodways}
                student={SubLeadstudents?.data}
                handleMethodSelect={handleMethodSelect}
                selectedMethod={selectedMethod} />
              {selectedMethod && (
                <div className="space-y-4">
                  <div>
                    <h1 className="text-lg font-semibold">Do you have a problem with {selectedMethod}?</h1>
                    <YesNoDiv
                      handleYesNo={handleYesNo}
                      values={values}
                      handleBlur={handleBlur}
                      selectedMethod={selectedMethod} />
                  </div>
                  {(values[`${selectedMethod}_yes`] === true) && (values[`${selectedMethod}_no`] === false) && (
                    <YesDiv
                      selectedMethod={selectedMethod}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur} />
                  )}
                  {(values[`${selectedMethod}_no`] === true) && (values[`${selectedMethod}_yes`] === false) && (
                    <NoDiv
                      selectedMethod={selectedMethod}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur} />
                  )}
                </div>
              )}
              {selectedMethod &&
                (studentleadlength > 0 ? (studentleadDeSturcure[studentleadlength - 1][isValueKey] !== "Yes") : selectedMethod) &&
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Submit
                </button>
              }
              {
                // successMsg
                SuccessMeg != '' && (
                  <Alert variant="filled" severity="success">
                    {SuccessMeg}
                  </Alert>
                )
              }
              {
                // error message
                ((errors[`${selectedMethod}-tittle`] && touched[`${selectedMethod}-tittle`])
                  || (errors[`${selectedMethod}-message`] && touched[`${selectedMethod}-message`])
                  || (errors[`${selectedMethod}-main-comments`] && touched[`${selectedMethod}-main-comments`]))

                && (
                  <Alert variant="filled" severity="error">
                    {errors[`${selectedMethod}-tittle`] || errors[`${selectedMethod}-message`] || errors[`${selectedMethod}-main-comments`]}
                  </Alert>
                )
              }
              <DialogForConformationOfLead
                handleResetCancel={handleResetCancel}
                handleResetOk={handleResetOk}
                ResetWarning={ResetWarning} />
            </form>
          </div>
        )
      }
    </>
  );
}

