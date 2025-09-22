import CommonButton from "@/components/common-button";
import CommonCard from "@/components/common-card";



function TaskItem({item,handleDelete,setShowDialog
}){

    return(
        <CommonCard 
        title={item?.title}
        description={item?.status}
        footerContent={
            <div className="flex w-full justify-between items-center">
                <CommonButton onClick={()=>setShowDialog(true)} buttonText={'Edit'}/>
                <CommonButton onClick={()=>handleDelete(item?._id)} buttonText={'Delete'}/>

            </div>
        }
        
        
        />
    )

}

export default TaskItem;