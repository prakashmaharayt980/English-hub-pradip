import React, { useEffect, useState } from "react"
import axios from 'axios'
export const Leadcontext = React.createContext({
  leadstudents: {},
  StudentDetails: () => { },
  setparam: '',
  SubLeadDetails: () => { },
  SubLeadstudents: {},
  setSubparams: '',
  Subparams: '',
  token: '',
  setSubLeadstudents: {},
  setleadstudents: {},
  SubStudent_Lead: {},
  setSubStudent_Lead: {},
  ResposeUpadateLeadPostValue: {},
  setResposeUpadateLeadPostValue: {},
  loading:false

})
export const LeadcontextProvider = ({ children }) => {
  const [leadstudents, setleadstudents] = useState({})
  const [param, setparam] = useState('leads-lists/?limit=20&stage=0')
  const [Subparams, setSubparams] = useState('')
  const [SubLeadstudents, setSubLeadstudents] = useState({})
  const [loading, setloading] = useState(false)
  // const [SubStudent_Lead, setSubStudent_Lead] = useState({})
  const [ResposeUpadateLeadPostValue, setResposeUpadateLeadPostValue] = useState({})
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

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setloading(false)
    }

  };
  const SubLeadDetails = async () => {

    try {
      setloading(true)
      const baseUrlLead = `https://edev.englishhub.app/api/v1/leads/${Subparams}`
      const response = await axios.get(baseUrlLead, { headers: header });
      setSubLeadstudents(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setloading(false)
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
        SubLeadDetails,
        SubLeadstudents,
        setSubparams,
        Subparams,
        token,
        setSubLeadstudents,
        ResposeUpadateLeadPostValue,
        setResposeUpadateLeadPostValue,
        loading
      }}>
      {children}
    </Leadcontext.Provider>
  )
}

