import { useFormik } from 'formik';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup'
import DialogForConformationOfLead from './DialogForConformationOfLead';
import YesNoDiv from './YesNoDiv';
import { NoDiv, YesDiv } from './YesNoContents';
import LeadFollowupSelectionDiv from './LeadFollowupSelectionDiv';
import PropTypes from 'prop-types'
export default function Selectiondiv({ student }) {
  const [submittedMethods, setSubmittedMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [success, setSuccess] = useState(false);
  const [CountSubmitted, setCountSubmitted] = useState(1)
  const [SuccessMeg, setSuccessMeg] = useState('')
  const [ResetWarning, setResetWarning] = useState(false)
  const [prevSelectedMethod, setprevSelectedMethod] = useState('')
 
  useEffect(()=>{
    const truevalueinServer=   Object.values(student?.submitted).filter(Boolean).length
    setCountSubmitted(truevalueinServer) 
    console.log("🚀 ~ useEffect ~ truevalueinServer:", truevalueinServer)
    },[])
  
  const navLeadfollowUp = useNavigate();
  // followup methodys
  const methodways = useMemo(() =>
    [
      { label: 'Notification', name: 'notification' },
      { label: 'Sms', name: 'sms' },
      { label: 'Email', name: 'email' },
      { label: 'WhatsApp', name: 'whatsapp' },
      { label: 'Call', name: 'call' },
      { label: 'Viber', name: 'viber' },
    ]
    , [])
  // initialization
  const initialValues = useMemo(() => {
    return methodways.reduce((acc, method) => {
      acc[method.name] = false;
      acc[`${method.name}_yes`] = false;
      acc[`${method.name}_no`] = false;
      acc[`${method.name}-title`] = '';
      acc[`${method.name}-message`] = '';
      acc[`${method.name}-main-comments`] = '';
      acc.maincomments = [];
      return acc;
    }, {});
  }, [methodways]);

 
  //  validation schema
  const validationSchema = useMemo(() =>
    Yup.object().shape({
      [`${selectedMethod}-title`]: Yup.string().required(`${selectedMethod} required title`),
      [`${selectedMethod}-message`]: Yup.string().required(`${selectedMethod} required message`),
      [`${selectedMethod}-main-comments`]: Yup.string().required(`${selectedMethod} required Main Comments`),
    }), [selectedMethod]
  )
  // formik
  const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched} = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
     
        setSubmittedMethods([...submittedMethods, selectedMethod]);
        // const url = 'https://my.api.mockaroo.com/englishhub.json?key=1336f620&__method=POST';
        const url = 'https://my.api.mockaroo.com/Englishhubdata.json?key=60fc60d0&__method=POST'
        values.maincomments.push(values[`${selectedMethod}-main-comments`]);
        const response = await axios.post(url, {
          leads_content: [
            {
              title: values[`${selectedMethod}-title`],
              short_description: values[`${selectedMethod}-message`],
              type: selectedMethod,
              content: values[`${selectedMethod}-main-comments`],
            }
          ],
          user_id: student?.student_id,
          stage: student?.status,
          overall_comment: DOMPurify.sanitize(`<p>${values.maincomments}</p>.join('\n')`),
          is_notification: (selectedMethod === 'notification' || selectedMethod === 'sms') ? 'yes' : 'No'
        });

        console.log("🚀 ~ onSubmit: ~ hh:", {
          leads_content: [
            {
              title: values[`${selectedMethod}-title`],
              short_description: values[`${selectedMethod}-message`],
              type: selectedMethod,
              content: values[`${selectedMethod}-main-comments`],
            }
          ],
          user_id: student?.student_id,
          stage: student?.status,
          overall_comment: DOMPurify.sanitize(`<p>${values.maincomments}</p>.join('\n')`),
          is_notification: (selectedMethod === 'notification' || selectedMethod === 'sms') ? 'yes' : 'No'
        } )

        if (response.status === 200) {
          setSuccess(true);
          TypeConditionChange()

          setSelectedMethod('')
          setprevSelectedMethod('')
          // show completed depend on number of true
          if (CountSubmitted <= 6) {
            setCountSubmitted(CountSubmitted + 1)
            setSuccessMeg(
              `${selectedMethod} is submitted`
            )
            if (CountSubmitted === 5) {
              setSuccessMeg(`Stage ${student?.status} is Completed`)
              setTimeout(() => {
                navLeadfollowUp('/', { replace: true, state: { stage: true, id: response?.id } });
              }, 4000)
            }
            console.log('couynt', CountSubmitted);
          }
        }
      } catch (error) {
        setSuccessMeg(error)

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
    <div className=" w-full  px-4 py-8" style={{ width: '75%' }}>
      <form onSubmit={handleSubmit}>
        <LeadFollowupSelectionDiv
          methodways={methodways}
          success={success}
          student={student}
          handleMethodSelect={handleMethodSelect}
          submittedMethods={submittedMethods}
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
        {(student?.submitted[selectedMethod] === false) && selectedMethod &&
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        }
        {
          // successMsg
          SuccessMeg != '' && success && (
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
  );
}

Selectiondiv.propTypes = {
  student: PropTypes.object
}