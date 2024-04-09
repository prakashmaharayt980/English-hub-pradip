// Lead_User_stage.jsx

import { USer_stage } from '../../Assects/Database_Of_lead';
import PropTypes from 'prop-types'
const Lead_User_stage = ({ userlength }) => {
  return (
    <div className='flex relative flex-wrap justify-start gap-4 my-2'>
      {USer_stage.map((stage, index) => (
        <div className='border rounded-3xl w-18 shadow-md px-1  flex items-center justify-center' key={index}>
          
          <span className="bg-red-500 text-white rounded-full absolute bottom-4 text-center w-4 aspect-square ml-6 text-xs">{ userlength}</span>
          <h1 className='text-sm font-semibold mx-1 text-center'>{stage.label}</h1>
         
        </div>
      ))}
    </div>
  );
}

Lead_User_stage.propTypes={
  userlength:PropTypes.number
}
export default Lead_User_stage;
