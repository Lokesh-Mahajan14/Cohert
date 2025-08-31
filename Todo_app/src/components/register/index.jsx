import { useState } from "react"
import { RegisterFormElements } from "../../config"
import CommonForm from "../common-form/index"

function RegisterCompoent(){

    const initialFormData={
        name:"",
        email:'',
        password:''
    }

    const[registerFormData,setregisterFormData]=useState({
        initialFormData
    })
    function onHandleSubmit(event){
        event.preventDefault();
        console.log(registerFormData,"registerformData");
        setregisterFormData(initialFormData);

    }


    return(
        <div>
            <h1>Login Page</h1>
            <CommonForm formControls={RegisterFormElements} formData={registerFormData} setFormData={setregisterFormData} buttonText={"register"} onHandleSubmit={onHandleSubmit}/>

        </div>
    )
}

export default RegisterCompoent;