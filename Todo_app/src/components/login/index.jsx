import { useState } from "react"
import { loginFormElements } from "../../config"
import CommonForm from "../common-form/index"

function LoginCompoent(){

    const initialFormData={
        email:'',
        password:''
    }

    const[loginFormData,setLoginFormData]=useState({
        initialFormData
    })
    function onHandleSubmit(event){
        event.preventDefault();
        console.log(loginFormData,"loginformData");
        setLoginFormData(initialFormData);

    }


    return(
        <div>
            <h1>Login Page</h1>
            <CommonForm formControls={loginFormElements} formData={loginFormData} setFormData={setLoginFormData} buttonText={"Login"} onHandleSubmit={onHandleSubmit}/>

        </div>
    )
}

export default LoginCompoent;