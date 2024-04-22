import React, { useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
export const Sub_Lead_Contex = React.createContext()
export const Sub_Lead_ContextProvider = ({ children }) => {
    const [Subparams, setSubparams] = useState('')
    const [SubLeadstudents, setSubLeadstudents] = useState({} )
    const [subloading, setsubloading] = useState(false)
    const [ResposeUpadateLeadPostValue, setResposeUpadateLeadPostValue] = useState({})
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwNTY0NTM1LCJpYXQiOjE3MTI4MDQ1MzUsImp0aSI6IjVlNWM1ZGM4ZjljYTQxNzZiM2Y3NzNkNDUzZDhiMDM2IiwidXNlcl9pZCI6NTA4NDN9.5PqVc-fIeG5rUIvIxnkH64jPUDTYnYS6PKg-cUZFY2g'

    const header = {
        Authorization: `Bearer ${token} `
    }  
    const SubLeadDetails = async () => {
     
        try {
            setsubloading(true)         
            const baseUrlLead = `https://edev.englishhub.app/api/v1/leads/${Subparams}`
            const response = await axios.get(baseUrlLead, { headers: header });
            setSubLeadstudents(response.data);
            if(response.status===200){
                setsubloading(false)
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

   
    return (
        <Sub_Lead_Contex.Provider value={{
            SubLeadDetails,
            SubLeadstudents,
            setSubparams,
            Subparams,
            setSubLeadstudents,
          
            ResposeUpadateLeadPostValue,
            setResposeUpadateLeadPostValue,
            subloading
        }}>
            {children}
        </Sub_Lead_Contex.Provider>
    )
}
Sub_Lead_ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };