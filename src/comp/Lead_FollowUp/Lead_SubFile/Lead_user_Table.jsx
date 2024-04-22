// chlidren of Lead_folow_Up_Main file

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'
import TablePagetion from '../../../Assects/TablePagetion';
import { useContext } from 'react';
import { Leadcontext } from '../../../Assects/Lead_Context';
import Avatar from '@mui/material/Avatar';

const Lead_user_Table = ({  handleuserStage }) => {
  const {leadstudents}=useContext(Leadcontext)
  return (
    <div className="overflow-x-auto" >
      {leadstudents && leadstudents.results && leadstudents?.results &&
        (<table className="w-full table-auto ">
        <thead className=" p-4">
          <tr>
            <th className="px-4 py-2 table_head">Avatar</th>
            <th className="p-4 table_head">Name</th>
            <th className="p-4 table_head">Email</th>
            <th className="p-4 table_head">Contact</th>
            <th className="p-4 table_head">Action</th>
          </tr>
        </thead>
        <tbody className=' cursor-pointer' >
     
          {
           (!leadstudents || !leadstudents.results || leadstudents.results.length === 0)?
            (<tr >
              <td colSpan={4}className=" border-b p-4 col-span-4  mx-2 text-center"> Empty Table </td>
            </tr>):
            (
              <>
              {leadstudents && leadstudents.results && leadstudents?.results.map((Studentlead) => (
                <tr key={Studentlead.student_id} onClick={() => handleuserStage(Studentlead.id)} className={ 'bg-gray-100' }>
                  <td className=" border-b p-4">
                    {
                      Studentlead?.profile_picture === null ? (
                     
                        <Avatar  alt={Studentlead?.full_name} src='./dummyUser.d4656c04.png' />
                      ) : (<Avatar src={Studentlead?.profile_picture} alt={Studentlead?.full_name} />)
                    }
                  </td>
                  <td className=" border-b p-4">{Studentlead?.full_name}</td>
                  <td className=" border-b p-4">{Studentlead?.email}</td>
                  <td className=" border-b p-4">{Studentlead?.phone_number}</td>
                  <td className=" border-b p-4">
                    <FontAwesomeIcon icon={faEye} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                  </td>
                </tr>
              ))}
              </>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              {/* <TablePagetion tabledetails={} /> */}
            </td>
          </tr>
        </tfoot>
      </table>)
      }
    </div>
  );
}
Lead_user_Table.propTypes = {
  Studentdata: PropTypes.arrayOf(PropTypes.object),
  handleuserStage: PropTypes.func
}

export default Lead_user_Table;
