
const Task=require("../models/task");

const addNewTask=async(req,res)=>{
    const {title,descripttion,status,userId,priority}=await req.body;
    try{
        const task=Task.create({
            title,descripttion,status,userId,priority
        })
        if(task){
            return res.status(201).json({
                success:true,
                message:"Task added successfully",
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Some error occured! Please try again",
            })
        }

    }catch(e){
        console.log(e);
        return res.status(500).json({
                success:false,
                message:"Some error occured! Please try again",
        })


    }
}

const getAllTasks=async(req,res)=>{
    const {id}=req.params;

    try{
        const getAllExtractedTasks=await Task.find({userId:id});
        if(getAllExtractedTasks){
            return res.status(200).json({
                success:true,
                tasklist:getAllExtractedTasks,
            })
        }else{
            return res.status(400).json({
                status:false,
                message:"Some error occured,Please try again",
            }) 
        }

    }catch(error){
        return res.status(500).json({
                status:false,
                message:"Some error occured,Please try again",
            }) 

    }

}

const updateTask=async(req,res)=>{
            const {title,descripttion,status,userId,priority,_id}=await req.body;

    try{
        const updateTask=await Task.findByIdAndUpdate(
            {
                _id,
            },{
                title,
                descripttion,
                status,
                priority,
                userId,
            },{
                new:true,
            }
        )
        if(updateTask){
            return res.status(200).json({
                success:true,
                message:"Task updated successfully",
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Some error occured,Please try again",
            })

        }

    }catch(e){
        console.log(e);
        return res.status(500).json({
                success:false,
                message:"Some error occured,Please try again",
        })

    }
}

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id is required",
      });
    }

    const deleteTask = await Task.findByIdAndDelete(id);

    if (deleteTask) {
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occured! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

module.exports = { addNewTask, getAllTasks, deleteTask, updateTask };