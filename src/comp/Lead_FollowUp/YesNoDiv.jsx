// Question user to select yes or No check box
// import React from 'react'
import PropTypes from 'prop-types';

function YesNoDiv({selectedMethod,handleYesNo,handleBlur,values}) {
    return (
        <div className="flex items-center space-x-4">
            <input
                type="checkbox"
                id={`${selectedMethod}_yes`}
                name={`${selectedMethod}_yes`}
                value={values[`${selectedMethod}_yes`]}
                checked={values[`${selectedMethod}_yes`]===true ?true:false}
                onChange={handleYesNo}
                onBlur={handleBlur}

            />
            <label htmlFor={`${selectedMethod}_yes`} className="text-lg">Yes</label>
            <input
                type="checkbox"
                id={`${selectedMethod}_no`}
                name={`${selectedMethod}_no`}
                value={values[`${selectedMethod}_no`]}
                checked={values[`${selectedMethod}_no`]===true ?true :false}
                onChange={handleYesNo}
                onBlur={handleBlur} />
            <label htmlFor={`${selectedMethod}_no`} className="text-lg">No</label>
        </div>
    )
}
YesNoDiv.propTypes={
    selectedMethod:PropTypes.string,
    handleYesNo:PropTypes.func,
    handleBlur:PropTypes.func,
    values:PropTypes.object
}

export default YesNoDiv
