
// Children of Lead_Stage1_Div
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useContext, useState } from 'react';
import { Sub_Lead_Contex } from '../../../../Assects/Sub_Lead_Context';
import Lead_Overal_Value_view from './Lead_Overal_Value_view';
import { titleList } from '../../../../Assects/Database_Of_lead';

const SubmittedSelectionCheck = () => {
  const [ActionViewClicked, setActionViewClicked] = useState(false)
  const [SubmittedValue, setSubmittedValue] = useState({})

  const { SubLeadstudents } = useContext(Sub_Lead_Contex);
 
  // Eye icon function
  const handleviewEvent = useCallback((lead) => {
    setSubmittedValue(lead);
    setActionViewClicked(true);
    return {
      SubmittedValue,
      ActionViewClicked,
    };
  }, [SubmittedValue]);

  // close fucn of Lead_Overal_Value_view
  const oncloseMsg = () => {
    setSubmittedValue({})
    setActionViewClicked(false)
  }
  console.log("🚀 ~ SubmittedSelectionCheck ~ SubmittedValue:", SubmittedValue)
  return (
    <>
      {SubLeadstudents?.data?.student_leads.length > 0
        && (
          <div className="submitted-selection-check overflow-x-auto" >
            <table className="w-full table-auto">
              <thead>
                {/* tittle */}
                <tr className="bg-gray-200 table_head">
                  {titleList.map((item, index) => (
                    <th key={index} className="px-3 py-2">{item.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SubLeadstudents?.data?.student_leads.map((lead, index) => (
                  <tr className="bg-white" key={index} >
                    {/* student server data reflection */}
                    {titleList.map((item, index) => (
                      <td key={index} >
                        {SubLeadstudents && (
                          lead[item.name] === 'Yes'
                        ) ? (
                          <div className="flex flex-row justify-center gap-1 border-b py-2 text-center px-4  ">

                            {item.name === 'is_notification' ? (item.valuename) : (SubLeadstudents?.data[item.valuename])}<FontAwesomeIcon icon={faCheck} />

                          </div>
                        ) : (
                          <div className=" border-b py-2 text-center px-4  ">
                            {
                              item.name === 'is_action' ? (<span onClick={() => handleviewEvent(lead).SubmittedValue}> <FontAwesomeIcon icon={item.icon} /></span>) :
                                (item.name === 'is_notification' ? (item.valuename) :
                                  (item.name === 'stage_no' ? (lead[item.valuename]) : (SubLeadstudents?.data[item.valuename])))
                            }
                          </div>

                        )}
                      </td>
                    ))}
                  </tr>
                ))
                }
              </tbody>
            </table>
            {Object.keys(SubmittedValue).length > 0 && (
              <Lead_Overal_Value_view open={ActionViewClicked} valueinServerWithStageLocation={SubmittedValue} close={oncloseMsg} />
            )}
          </div>

        )
      }
    </>
  );
};



export default SubmittedSelectionCheck;
