// Children of Lead_Stage1_Div
import { faEnvelope, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { Sub_Lead_Contex } from '../../../../Assects/Sub_Lead_Context';

function Stage1_Div_Top() {

    const {SubLeadstudents,setSubparams,setSubLeadstudents} = useContext(Sub_Lead_Contex)
    const  SubLeadstudentsCompress= SubLeadstudents?.data
    const NavagationTOItsParentsLead=useNavigate()
    // close function
    const handleCloseBar =() => {
       NavagationTOItsParentsLead('/',{replace:true})
       setSubparams('')
       setSubLeadstudents({})
    }

    return (
       <>
       {SubLeadstudents && SubLeadstudents?.data &&
         (
            // top nav
            <div className="shadow-md m-auto ">
            <div className="flex justify-between  px-4 py-2 bg-white shadow-md">
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={handleCloseBar}
                    className="text-lg cursor-pointer"
                />
                <span className="text-lg h1_head">User Details</span>
            </div>
            <div className="flex p-4 text-white  w-full" style={{
                background: '#4b0082'
            }}>
                {/* student img or Detalis */}
                <div className="mr-4 flex flex-col justify-start px-2 w-1/2">
                    <span className="font-bold text-xl mb-1 capitalize">{`${SubLeadstudentsCompress?.full_name}'s profile `}</span>
                    {SubLeadstudents && SubLeadstudents?.data?.profile_picture ? (
                        <Avatar
                            alt={SubLeadstudentsCompress.full_name}
                            src={`https://edev.englishhub.app/${SubLeadstudentsCompress?.profile_picture}`}
                            sx={{ width: 200, height: 200 }}
                        />
                    ) : (
                        <Avatar
                            alt={SubLeadstudentsCompress?.full_name}
                            src="./dummyUser.d4656c04.png"
                            sx={{ width: 200, height: 200 }}
                        />
                    )}
                </div>
                <div className='flex  flex-col w-1/2 justify-start'>
                    <span className='text-white  font-normal text-2xl'>User Id {SubLeadstudentsCompress?.id} </span>
                    <hr className=' relative top-4 bg-black  border-t-0 h-1' />
                    <div className="text-white relative top-6 flex flex-row gap-3">
                        <div className="mr-2 flex flex-row gap-3 ">
                            <FontAwesomeIcon className=' relative top-1' icon={faEnvelope} />
                           <span> Email :</span>
                           <span> {SubLeadstudentsCompress?.email}</span>
                             </div>
                        <div className="mr-2 flex flex-row gap-3">
                            <FontAwesomeIcon className=' relative top-1'  icon={faPhone}/>
                            <span>Phone :</span>
                            <span>{SubLeadstudentsCompress?.phone_number} </span>
                            </div>
                    </div>
                </div>
            </div>
          
        </div>
        )
       }
       </>
    );
}

export default Stage1_Div_Top;
