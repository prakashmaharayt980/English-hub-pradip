
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';



function LeadFollowupSelectionDiv({ methodways, student, handleMethodSelect, submittedMethods, success,selectedMethod }) {
  
    
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Send Follow-up Message stage {student?.status}</h1>
            <div className="flex flex-row justify-between gap-4 ">
                {methodways.map((method) => (
                    <div
                        key={method.name}
                        className={`p-4 border rounded-md cursor-pointer flex items-center justify-center transition-colors duration-300 ${selectedMethod === method.name ? 'border-blue-500 bg-blue-100' : 'border-gray-200 hover:bg-gray-100'}
                           ${student?.submitted[method.name] === true ? 'pointer-events-none' : ''}`}
                        onClick={() => handleMethodSelect(method.name)}
                    >
                        <span className="text-lg font-semibold">{method.label}</span>
                        {((submittedMethods.includes(method.name) && success) || (student?.submitted[method.name] === true)) && (
                            <FontAwesomeIcon icon={faCheck} className="ml-2 text-green-500" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
LeadFollowupSelectionDiv.propTypes = {
    methodways: PropTypes.array.isRequired,
    student: PropTypes.object.isRequired,
    handleMethodSelect: PropTypes.func,
    submittedMethods: PropTypes.array,
    success: PropTypes.bool,
    selectedMethod: PropTypes.string,
};


export default LeadFollowupSelectionDiv

