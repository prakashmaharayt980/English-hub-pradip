import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Lead_Follow_up_Main from "./comp/Lead_FollowUp/Lead_Follow_up_Main"
import { LeadcontextProvider } from "./Assects/Lead_Context"
import Lead_Stage1_Div from "./comp/Lead_FollowUp/Lead_SubFile/Lead_Stage1_Div"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Lead_Follow_up_Main />
    },
    {
      path: 'stage1',
      element: <Lead_Stage1_Div />
    },
  ])

  return (
    <LeadcontextProvider>
      <RouterProvider router={router} />
    </LeadcontextProvider>
  )
}

export default App
