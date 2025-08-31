import { useState } from "react";


function Formcomponent(){

    const[formdata, setFormdata]=useState({
        name:"",
        email:"",
    });


    function handleOnchange(event){
        const {name,value}=event.target;
        setFormdata({
            ...formdata,
            [name]:value,
        })
        
        
    }
    function handleOnsubmit(event){
        event.preventDefault();
        console.log(formdata);
        setFormdata({
            name: "",
            email: ""
        });
        
    }

    return(
        <div>
            <h1>Form</h1>
            <form onSubmit={handleOnsubmit}>
                <input type="text" name="name" id="name" value={formdata.name} placeholder="Enter name" onChange={handleOnchange} />
                <input type="text" name="email" id="email" value={formdata.email} placeholder="Enter eamil" onChange={handleOnchange} />
                <button type="submit">Submit</button>

            </form>
 
        </div>
    )
}

export default Formcomponent;