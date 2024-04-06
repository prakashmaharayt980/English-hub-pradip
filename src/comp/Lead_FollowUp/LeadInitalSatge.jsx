
import SubmittedSelectionCheck from './SubmittedSelectionCheck';
import Selectiondiv from './Selectiondiv'
import { useLocation } from 'react-router-dom';

function LeadInitalSatge() {
  const location = useLocation();
  const student = location.state.StudentData;

  return (
    <div className="flex justify-center">
      <div style={{ width: '75%' }}>
        <SubmittedSelectionCheck student={student} />
        <Selectiondiv student={student} />
      </div>
    </div>
  );
}

export default LeadInitalSatge;
