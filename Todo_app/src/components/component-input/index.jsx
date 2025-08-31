function CommonInput({label,type,name,id,value,onChange,placeholder}){
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input 
                name={name}
                type={type || "text"}
                id={id}
                value={value}
                placeholder={placeholder || "Enter value here"}
                onChange={onChange}

             />
        </div>
    )
}
export default CommonInput;