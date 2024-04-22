# React + Vite

Package requires
   <!-- install before run -->
    node- v20.11.1
    Material-UI
    Formik-^2.4.5
    yup
    prototype
    tailwindcss -post,autoprefix
    react-router-dom-^6.22.3
    fortawesome-All Free package
    dompurify

Structure of Lead Package
  <!-- a for function  -->
  <!--  num for componet -->

  1.Context file
    1.1 Lead_Context.jsx
       1.1.a StudentDetails() 
              ?limit=20&stage=0 
    1.2 Sub_Lead_Context.jsx
      1.2.a  SubLeadDetails()
              leads/0
  2.Compent
    1.Lead_Follow_up_Main 
       1.1Lead_stage_seperation_Div
          1.1.1 Stage_sep_Bottom
       1.2.Lead_user_Table
         1.2.a handleuserStage(Studentlead.id)

    2.Navigate to Lead_Stage1_Div from 2.1.2.1
        2.1   Stage1_Div_Top
            2.1.a  handleCloseBar()
        2.2   SubmittedSelectionCheck 
                2.2.a  handleviewEvent ()
                2.2.b  oncloseMsg()
                2.2.1. Lead_Overal_Value_view 
        2.3   Stage1_Div_Message_Div
             2.3.a :submit /post
             
           2.3.1 LeadFollowupSelectionDiv
           2.3.2 YesNoDiv
           2.3.3 YesDiv
           2.3.4 NoDiv
           2.3.5 DialogForConformationOfLead

