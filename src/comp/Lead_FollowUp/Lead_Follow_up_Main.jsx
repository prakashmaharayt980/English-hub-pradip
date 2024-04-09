import { useEffect, useState } from 'react';
import Lead_User_stage from './Lead_User_stage';
import axios from 'axios';
import Lead_follow_up_user from './Lead_follow_up_user';
import { useNavigate } from 'react-router-dom';


function Lead_Follow_up_Main() {
  const [userdata, setuserdata] = useState([]);

  const nagStage1 = useNavigate()
  const userdetails = async () => {
    try {
      const url = 'https://my.api.mockaroo.com/studentDetails.json?key=60fc60d0'
      // const url="https://my.api.mockaroo.com/englishhubstuends.json?key=1336f620"

      const response = await axios.get(url);
      setuserdata(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    userdetails();
  }, []);

  // Calculate user length only when userdata is not null
  const userlength = userdata ? userdata.length : 0;
  const handleuserStage = (student) => {

    nagStage1('/stage1', { replace: false, state: { StudentData: student } })
  }

  return (
    <div className=" mx-auto px-4 py-8" style={{ width: '75vw' }}>
      <Lead_User_stage userlength={userlength} />
      <Lead_follow_up_user userdata={userdata} handleuserStage={handleuserStage} />
    </div>
  );
}

export default Lead_Follow_up_Main;
