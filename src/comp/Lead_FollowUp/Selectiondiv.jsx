import { useFormik } from 'formik';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function Selectiondiv({ student }) {
  const [submittedMethods, setSubmittedMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [yesSelected, setYesSelected] = useState(false);
  const [noSelected, setNoSelected] = useState(false);
  const [success, setSuccess] = useState(false);



  const navLeadfollowUp = useNavigate();
  const methodways = [
    { label: 'Notification', name: 'notification' },
    { label: 'Sms', name: 'sms' },
    { label: 'Email', name: 'email' },
    { label: 'WhatsApp', name: 'whatsapp' },
    { label: 'Call', name: 'call' },
    { label: 'Viber', name: 'viber' },
  ];

  const initialValues = {
    maincomments:[]
  };
  methodways.forEach((method) => {
    initialValues[method.name] = false;
    initialValues[`${method.name}-yes`] = false;
    initialValues[`${method.name}-no`] = false;
    initialValues[`${method.name}-title`] = '';
    initialValues[`${method.name}-message`] = '';
    initialValues[`${method.name}-main-comments`] = '';

  });

  const { handleChange, handleSubmit, values, setFieldValue, handleBlur } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        setSubmittedMethods([...submittedMethods, selectedMethod]);

        const url = 'https://my.api.mockaroo.com/englishhub.json?key=1336f620&__method=POST';
        // const url='https://my.api.mockaroo.com/Englishhubdata.json?key=60fc60d0&__method=POST'
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

        console.log('submitted ',
          {
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
          }
        );


        if (response.status === 200) {
          setFieldValue(`${selectedMethod}-yes`, false);
          setFieldValue(`${selectedMethod}-no`, false);
          setSuccess(true);
          setYesSelected(false);
          setNoSelected(false);
          setSelectedMethod('');

          if (response?.data?.stage === false) {
            setTimeout(() => {
              navLeadfollowUp('/', { replace: true, state: { stage: true, id: response?.id } });
            }, 3000);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setYesSelected(false);
    setNoSelected(false);

  };

  const handleYesNo = (e) => {
    const { name, checked } = e.target;
    const [method] = name.split('-');

    if (checked && name.endsWith('-yes')) {
      setFieldValue(`${method}-no`, false);
      setYesSelected(true);
      setNoSelected(false);
    } else if (checked && name.endsWith('-no')) {
      setFieldValue(`${method}-yes`, false);
      setNoSelected(true);
      setYesSelected(false);
    }

    handleChange(e);
  };

  return (
    <div className=" w-full  px-4 py-8" style={{ width: '75%' }}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-center mb-4">Send Follow-up Message stage {student?.status}</h1>
          <div className="flex flex-row justify-between gap-4 ">
            {methodways.map((method) => (
              <div
                key={method.name}
                className={`p-4 border rounded-md cursor-pointer flex items-center justify-center transition-colors duration-300 ${selectedMethod === method.name ? 'border-blue-500 bg-blue-100' : 'border-gray-200 hover:bg-gray-100'}
                ${student?.submitted[method.name] === true ? 'pointer-events-none' : ''}`}
                onClick={() => handleMethodSelect(method.name)}
              >

                <span className="text-lg font-semibold">{method.label}</span>
                {((submittedMethods.includes(method.name) && success) || (student?.submitted[method.name] === true)) && (
                  <FontAwesomeIcon icon={faCheck} className="ml-2 text-green-500" />

                )}
              </div>
            ))}

          </div>
        </div>
        {selectedMethod && (
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-semibold">Do you have a problem with {selectedMethod}?</h1>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={`${selectedMethod}-yes`}
                  name={`${selectedMethod}-yes`}
                  checked={values[`${selectedMethod}-yes`]}
                  onChange={handleYesNo}
                  onBlur={handleBlur} />
                <label htmlFor={`${selectedMethod}-yes`} className="text-lg">Yes</label>
                <input
                  type="checkbox"
                  id={`${selectedMethod}-no`}
                  name={`${selectedMethod}-no`}
                  checked={values[`${selectedMethod}-no`]}
                  onChange={handleYesNo}
                  onBlur={handleBlur} />
                <label htmlFor={`${selectedMethod}-no`} className="text-lg">No</label>
              </div>
            </div>
            {yesSelected && !noSelected && (
              <div className="space-y-4">
                <input
                  type="text"
                  id={`${selectedMethod}-title`}
                  name={`${selectedMethod}-title`}
                  value={values[`${selectedMethod}-title`]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Title"
                  className="border rounded-md px-4 py-2 w-full  placeholder:text-teal-600" />
                <textarea
                  id={`${selectedMethod}-message`}
                  name={`${selectedMethod}-message`}
                  value={values[`${selectedMethod}-message`]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Message"
                  className="border rounded-md px-4 py-2 w-full resize-none  placeholder:text-teal-600"
                  rows={4} />
                <textarea

                  id={`${selectedMethod}-main-comments`}
                  name={`${selectedMethod}-main-comments`}
                  value={values[`${selectedMethod}-main-comments`]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Main Comments"
                  className="border rounded-md px-4 py-2 w-full resize-none  placeholder:text-teal-600"
                  rows={4} />
              </div>
            )}
            {noSelected && !yesSelected && (
              <div className="space-y-4">
                <textarea
                  id={`${selectedMethod}-main-comments`}
                  name={`${selectedMethod}-main-comments`}
                  value={values[`${selectedMethod}-main-comments`]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Main Comments"
                  className="border rounded-md px-4 py-2 w-full resize-none  placeholder:text-teal-600"
                  rows={4} />
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
