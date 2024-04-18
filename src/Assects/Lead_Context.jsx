import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Sub_Lead_ContextProvider } from "./Sub_Lead_Context"
export const Leadcontext = React.createContext({
  leadstudents: {},
  StudentDetails: () => { },
  param: '',
  setparam: '',
  setleadstudents: {},
  loading: false
})

export const LeadcontextProvider = ({ children }) => {
  const [leadstudents, setleadstudents] = useState({})
  const [param, setparam] = useState('leads-lists/?limit=20&stage=0')
  const [loading, setloading] = useState(false)
 
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwNTY0NTM1LCJpYXQiOjE3MTI4MDQ1MzUsImp0aSI6IjVlNWM1ZGM4ZjljYTQxNzZiM2Y3NzNkNDUzZDhiMDM2IiwidXNlcl9pZCI6NTA4NDN9.5PqVc-fIeG5rUIvIxnkH64jPUDTYnYS6PKg-cUZFY2g'

  const header = {
    Authorization: `Bearer ${token} `
  }
  const StudentDetails = async () => {
    try {
      setloading(true)
      const baseUrlLead = `https://edev.englishhub.app/api/v1/leads/${param}`
      const response = await axios.get(baseUrlLead, { headers: header });
      setleadstudents(response.data);
      if(response.status===200 ){
        setloading(false)
       
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } 
  };

  useEffect(() => {
    StudentDetails()
  }, [param])


  return (
    <Leadcontext.Provider
      value={{
        leadstudents,
        StudentDetails,
        setparam,
        param,
        loading
      }}>
      <Sub_Lead_ContextProvider>
        {children}
      </Sub_Lead_ContextProvider>
    </Leadcontext.Provider>
  )
}

