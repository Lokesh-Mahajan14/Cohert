
const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
    title:String,
    descripttion:String,
    status:String,
    userId:String,
    priority:String


})
const Task=mongoose.models.Task || mongoose.model('Task',TaskSchema)

module.exports=Task;