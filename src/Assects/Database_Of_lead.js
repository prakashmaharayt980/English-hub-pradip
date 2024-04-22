import { faEye } from "@fortawesome/free-solid-svg-icons";

export const USer_stage=[
    {name:'0stage',labelnum:0,id:45,label:'stage',stepcount:0},
    {name:'1stage',labelnum:1,id:145,label:'stage',stepcount:1},
    {name:'2stage',labelnum:2,id:245,label:'stage',stepcount:2},
    {name:'3stage',labelnum:3,id:345,label:'stage',stepcount:3},
    {name:'4stage',labelnum:4,id:445,label:'stage',stepcount:4},
    {name:'5stage',labelnum:5,id:545,label:'stage',stepcount:5},
    {name:'6stage',labelnum:6,id:645,label:'stage',stepcount:6},   
    {name:'7stage',labelnum:'C',id:745,label:'Completed',stepcount:7}
]
// submittedSelectionCheck.jsx
export const titleList = [
    { label: 'stage', name: 'stage_no', valuename: 'stage_no' },
    { label: 'Notification', name: 'is_notification', valuename: 'App/Web' },
    { label: 'SMS', name: 'is_sms', valuename: 'phone_number', },
    { label: 'Email', name: 'is_email', valuename: 'email', },
    { label: 'WhatApp', name: 'is_whatapp', valuename: 'phone_number', },
    { label: 'Call', name: 'is_call', valuename: 'phone_number', },
    { label: 'Viber', name: 'is_viber', valuename: 'phone_number', },
    { label: 'Action', name: 'is_action', icon: faEye },
  ];
 
//   stage!_Div_Message_Div.jsx
  export const methodways =
  [
    { label: 'Notification', name: 'notification', isname: 'is_notification' },
    { label: 'SMS', name: 'sms', isname: 'is_sms' },
    { label: 'Email', name: 'email', isname: 'is_email' },
    { label: 'Whatapp', name: 'whatapp', isname: 'is_whatapp' },
    { label: 'Call', name: 'call', isname: 'is_call' },
    { label: 'Viber', name: 'viber', isname: 'is_viber' },
  ]
