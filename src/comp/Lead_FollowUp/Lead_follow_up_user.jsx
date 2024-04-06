import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Lead_follow_up_user = ({ userdata ,handleuserStage}) => {
  return (
    <div className="overflow-x-auto" >
      <table className="w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Avatar</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((user,index) => (
            <tr key={user.student_id}  onClick={()=>handleuserStage(user)} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{user?.avater}</td>
              <td className="border px-4 py-2">{user?.name}</td>
              <td className="border px-4 py-2">{user?.email}</td>
              <td className="border px-4 py-2">{user?.contact}</td>
              <td className="border px-4 py-2">
                <FontAwesomeIcon icon={faEye} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lead_follow_up_user;
