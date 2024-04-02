import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Selectiondiv() {
  const [submittedMethods, setSubmittedMethods] = useState([]);
  const [selectedMethod, setselectedMethod] = useState('')
  const [yesSelected, setYesSelected] = useState(false);
  const [noSelected, setNoSelected] = useState(false);
  const [readmode, setreadmode] = useState(false)

  const methodways = [
    { label: 'Notification', name: 'notification' },
    { label: 'Sms', name: 'Sms' },
    { label: 'Email', name: 'Email' },
    { label: 'WhatApps', name: 'WhatApps' },
    { label: 'Call', name: 'Call' },
    { label: 'Viber', name: 'Viber' },
  ];

  const initialValues = {};
  methodways.forEach((method) => {
    initialValues[method.name] = false;
    initialValues[`${method.name}-yes`] = false;
    initialValues[`${method.name}-No`] = false;
    initialValues[`${method.name}-title`] = '';
    initialValues[`${method.name}-message`] = '';
    initialValues[`${method.name}-main-comments`] = '';
  });

  const { handleChange, handleSubmit, values, setFieldValue,handleBlur } = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        setSubmittedMethods([...submittedMethods, selectedMethod]);
      setFieldValue(selectedMethod, true);
    //   const response=await axios.post('',{
    //     selectedMethod,
    //     title:values[`${selectedMethod}-title`],
    //     message:values[`${selectedMethod}-message`],
    //     MainComment:values[`${selectedMethod}-main-comments`],

    //   })
        setFieldValue(`${selectedMethod}-yes`, false);
        setFieldValue(`${selectedMethod}-No`, false);
        setreadmode(true)
        setYesSelected(false)
        setNoSelected(false)
        setselectedMethod('')

    //   if(response.status===200){
        
    //   }
      } catch (error) {
        <h1>{error} </h1>
      
      }

    }
  })

  const [previousSelectedMethod, setPreviousSelectedMethod] = useState('');

const handleMethodSelect = (method) => {
  if (previousSelectedMethod === method) {
    return;
  }

  setselectedMethod(method);
  setPreviousSelectedMethod(method);
};

  const  handleYesNo=(e)=>{
    const { name, checked } = e.target;
    const [method] = name.split('-');

    if (checked && name.endsWith('-yes')) {
        setFieldValue(`${method}-No`,false)
      setYesSelected(true);
      setNoSelected(false);
    } else if (checked && name.endsWith('-No')) {
        setFieldValue(`${method}-yes`,false)
      setYesSelected(false);
      setNoSelected(true);
    }

    handleChange(e);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="selection-way">
          <h1>{`Send Follow-up message (stage 1)`}</h1>
          <div className="flex flex-row gap-3">
            {methodways.map((method, index) => (
              <div
                className={`method-div p-2 flex flex-row gap-1 `}
                key={index}
                onClick={() => handleMethodSelect(method.name)}
                aria-disabled={selectedMethod==method.name}
                style={{
                  border: selectedMethod===method.name ? '1px solid blue' : '1px solid black',
                }}
              >
                <h1 htmlFor={method.name}>{method.label}</h1>
                {submittedMethods.includes(method.name) && (
                  <FontAwesomeIcon icon={faCheck} />
                )}
              </div>
            ))}
          </div>
        </div>
       {
        selectedMethod !=='' && (
            <div className="input-div ">
            <div className="">
              <h1>{`Do you have a problem with ${selectedMethod}?`}</h1>
              <label
                htmlFor={`${selectedMethod}-yes`}
              >
                Yes
              </label>
              <input
                type="checkbox"
                name={`${selectedMethod}-yes`}
                checked={values[`${selectedMethod}-yes`]}
                onChange={(e) => handleYesNo(e)}
                onBlur={handleBlur}
              />
              <label
                htmlFor={`${selectedMethod}-No`}
              >
                No
              </label>
              <input
                type="checkbox"
                name={`${selectedMethod}-No`}
                checked={values[`${selectedMethod}-No`]}
                onChange={(e) => handleYesNo(e)}
                onBlur={handleBlur}
              />
            </div>
          </div>
        )
       }
       {
          yesSelected && (
            <div className=' flex flex-col gap-3 w-1/2'>
              <label htmlFor={`${selectedMethod}-title`}>
                Title
              </label>
              <input
                type="text"
                name={`${selectedMethod}-title`}
                value={values[`${selectedMethod}-title`]}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border: '1px solid black',
                }}
              />

              <label htmlFor={`${selectedMethod}-message`}>
                Message
              </label>
              <textarea
                type="text"
                name={`${selectedMethod}-message`}
                value={values[`${selectedMethod}-message`]}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border: '1px solid black',
                }}
              />

              <label htmlFor={`${selectedMethod}-main-comments`}>
                Main Comments
              </label>
              <textarea
                type="text"
                name={`${selectedMethod}-main-comments`}
                value={values[`${selectedMethod}-main-comments`]}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border: '1px solid black',
                }}
              />
            </div>
          )
        }
        {
          !yesSelected && noSelected && (
            <div className='flex flex-col w-1/5'>
              <label htmlFor={`${selectedMethod}-main-comments`}>
                Main Comments
              </label>
              <textarea
                type="text"
                name={`${selectedMethod}-main-comments`}
                value={values[`${selectedMethod}-main-comments`]}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  border: '1px solid black',
                }}
              />
            </div>
          )
        }

        <button type="submit">submit</button>
      </form>
    </React.Fragment>
  )
}

export default Selectiondiv;