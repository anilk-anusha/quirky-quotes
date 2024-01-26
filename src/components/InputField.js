const InputField = ({ label, id, type, value="", name, placeholder="", onChange, onClick }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      {
        type == 'button' ? 
        <input
            id={id}
            type={type}
            value={value}
            name={name}
            // className={className}
            placeholder={placeholder}
            onClick={onClick}
        /> 
      : 
        <input
            id={id}
            type={type}
            value={value}
            name={name}
            // className={className}
            placeholder={placeholder}
            onChange={onChange}
        />
      }
    </div>
  );
  
  export default InputField;