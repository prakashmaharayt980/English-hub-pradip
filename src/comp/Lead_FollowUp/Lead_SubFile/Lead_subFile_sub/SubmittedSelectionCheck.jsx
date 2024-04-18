
// Children of Lead_Stage1_Div
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext} from 'react';
import { Sub_Lead_Contex } from '../../../../Assects/Sub_Lead_Context';


const SubmittedSelectionCheck = () => {

  const { SubLeadstudents } = useContext(Sub_Lead_Contex);
  const titleList = [
    { label: 'stage', name: 'stage_no', valuename: 'stage_no' },
    { label: 'Notification', name: 'is_notification', valuename: 'App/Web' },
    { label: 'SMS', name: 'is_sms', valuename: 'phone_number', },
    { label: 'Email', name: 'is_email', valuename: 'email', },
    { label: 'WhatApp', name: 'is_whatapp', valuename: 'phone_number', },
    { label: 'Call', name: 'is_call', valuename: 'phone_number', },
    { label: 'Viber', name: 'is_viber', valuename: 'phone_number', },
    { label: 'Action', name: 'is_action', icon: faEye, SubimttedCheck: true },
  ];

  return (
    <>
      {SubLeadstudents?.data?.student_leads.length>0
        && (
          <div className="submitted-selection-check overflow-x-auto" >
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  {titleList.map((item, index) => (
                    <th key={index} className="px-3 py-2">{item.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SubLeadstudents?.data?.student_leads.map((lead, index) => (
                  <tr className="bg-white" key={index} >
                    {titleList.map((item, index) => (
                      <td key={index} >
                        {SubLeadstudents && (
                          lead[item.name] === 'Yes'
                        ) ? (
                          <div className="flex flex-row justify-center gap-1 border-b py-2 text-center px-4  ">
                           
                              {item.name==='is_notification'?(item.valuename):(SubLeadstudents?.data[item.valuename])}<FontAwesomeIcon icon={faCheck} />
                           
                          </div>
                        ) : (
                       <div className=" border-b py-2 text-center px-4  ">
                       {
                          item.name==='is_action'?(<FontAwesomeIcon icon={item.icon} />):
                          (item.name === 'is_notification' ? (item.valuename) : 
                          (item.name==='stage_no'?(lead[item.valuename]):(SubLeadstudents?.data[item.valuename])))
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
          </div>
        )
      }
    </>
  );
};



export default SubmittedSelectionCheck;
