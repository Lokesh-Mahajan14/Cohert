import CommonForm from "@/components/common-form";
import { signUpFormControls } from "@/config";
import { callRegisterApi } from "@/services";
import {useForm} from "react-hook-form" 
import { email } from "zod";
//import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const formData=useForm({
            defaultValues:{
                name:"",
                email:"",
                password:"",
            }

    });
    const navigate = useNavigate();


async function handleSubmit(getData){
        console.log(getData);

        const data=await callRegisterApi(getData);
        console.log(data,"data");

        if (data?.success) {
            toast.success("User register successful 🎉", {
            description: "Welcome",
        });
            
        navigate("/tasks/list")
    }else {
            toast.error("Error ❌", {
            description: "Some error occurred",
        });
    }

    
        
    
}
    return(
        

        <CommonForm form={formData} handleSubmit={handleSubmit} formControls={signUpFormControls} btnText={"Sign Up"}>

        </CommonForm>
    )
}

export default SignUp;