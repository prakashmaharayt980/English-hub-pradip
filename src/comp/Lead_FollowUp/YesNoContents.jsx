// if user selected Yes checked box
import PropTypes from 'prop-types';
const CommonpropTypes={
  selectedMethod:PropTypes.string,
   handleBlur:PropTypes.func, 
   handleChange:PropTypes.func,
  values:PropTypes.object 
}

function YesDiv({ selectedMethod, handleBlur, handleChange, values }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        id={`${selectedMethod}-title`}
        name={`${selectedMethod}-title`}
        value={values[`${selectedMethod}-title`]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Title"
        className="border rounded-md px-4 py-2 w-full placeholder:text-teal-600"
      />
      <textarea
        id={`${selectedMethod}-message`}
        name={`${selectedMethod}-message`}
        value={values[`${selectedMethod}-message`]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Message"
        className="border rounded-md px-4 py-2 w-full resize-none placeholder:text-teal-600"
        rows={4}
      />
      <textarea
        id={`${selectedMethod}-main-comments`}
        name={`${selectedMethod}-main-comments`}
        value={values[`${selectedMethod}-main-comments`]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Main Comments"
        className="border rounded-md px-4 py-2 w-full resize-none placeholder:text-teal-600"
        rows={4}
      />
    </div>
  );
}

// if user selected No Checkbox
function NoDiv({ selectedMethod, handleBlur, handleChange, values }) {
  return (
    <div className="space-y-4">
      <textarea
        id={`${selectedMethod}-main-comments`}
        name={`${selectedMethod}-main-comments`}
        value={values[`${selectedMethod}-main-comments`]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Main Comments"
        className="border rounded-md px-4 py-2 w-full resize-none placeholder:text-teal-600"
        rows={4}
      />
    </div>
  );
}
 YesDiv.propTypes=CommonpropTypes
 NoDiv.propTypes=CommonpropTypes


export { YesDiv, NoDiv };
