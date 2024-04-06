import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Lead_Follow_up_Main from "./comp/Lead_FollowUp/Lead_Follow_up_Main"

import LeadInitalSatge from "./comp/Lead_FollowUp/LeadInitalSatge"




function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element: <Lead_Follow_up_Main/>
    },
    {
      path:'stage1',
      element: <LeadInitalSatge/>
    },
  ])

  return (
    <>
   <RouterProvider router={router}/> 
   
    </>
  )
}

export default App
