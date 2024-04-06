
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubmittedSelectionCheck = ({ student }) => {


  const titleList = [
    { label: 'Status', name: 'status', value: student?.status,serverResponse: true},
    { label: 'Notification', name: 'notification', value: 'App/Web', serverResponse: student?.submitted.notification },
    { label: 'SMS', name: 'sms', value: student?.contact, serverResponse: student?.submitted.sms },
    { label: 'Email', name: 'email', value: student?.email, serverResponse: student?.submitted.email },
    { label: 'WhatsApp', name: 'whatsapp', value: student?.contact, serverResponse: student?.submitted.whatsapp },
    { label: 'Call', name: 'call', value: student?.contact, serverResponse: student?.submitted.call},
    { label: 'Viber', name: 'viber', value: student?.contact, serverResponse: student?.submitted.viber},
    { label: 'Action', name: 'action', icon: faEye ,serverResponse:true},
  ];

  

  return (
    <div className="submitted-selection-check overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            {titleList.map((item, index) => (
              <th key={index} className="px-3 py-2">{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            {titleList.map((item, index) => (
              <td key={index} className="border py-2">
                {item.serverResponse === true ? (
                  <>
                  {
                   (  item.name==='status') ?( item?.value):(
                      <div className='flex flex-row w-fit gap-1'>
                      {item?.value }<FontAwesomeIcon icon={ item.name==='action'? item.icon:faCheck} />
                      </div>
                    )
                  }
                  </>
                ) : (
                  item?.value
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedSelectionCheck;
