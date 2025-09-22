import { email } from "zod";
import {useForm} from "react-hook-form";
import CommonForm from "@/components/common-form";
import { signInFormControls } from "@/config";
import { useNavigate } from "react-router-dom";
import { callLoginUserApi } from "@/services";


function SignIn(){
    const formData=useForm({
        dsfaultvalues:{
            
            email:" ",
            password:" ",


        },

    })

    const navigate=useNavigate();

    async function handleSubmit(getData) {
    console.log(getData);

    const data = await callLoginUserApi(getData);
    console.log(data, "data");

    if (data?.success) navigate("/tasks/list");
  }
    return(
        <CommonForm btnText={"Sign In"} form={formData} formControls={signInFormControls} handleSubmit={handleSubmit} >

        </CommonForm>
    )
}

export default SignIn;