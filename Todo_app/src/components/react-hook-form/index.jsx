import {useForm} from "react-hook-form"

function ReactHookForm(){

    const {
        register,
        handleSubmit,
        formstate:{errors},
    }=useForm();

    function onSubmitForm(data){
        console.log(data)

    }


    return(
        <div>
            <h1>React hook form </h1>
            <form action="" onSubmit={handleSubmit(onSubmitForm)}>
                <div>
                    <label htmlFor="">email</label>
                    <input {...register("email"),{
                        required:true,
                    }} type="text" name="email" />
                    {errors.email && errors.email.type==="required"?(
                        <p style={{color: "red", margin:"10px"}}>Email is required</p>
                    ):null}
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input {...register("password",{
                        required:true,
                        miniLength:8
                    })} type="text" name="password" />
                </div>
                <button type="submit" ></button>
                
            </form>
           
        </div>
    )
}

export default ReactHookForm;