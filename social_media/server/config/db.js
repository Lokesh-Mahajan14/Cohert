import mongoose from "mongoose";

const connectDb=async()=>{

    try{
        mongoose.connection.on('connected',()=>console.log('Database connected'))
        // Connect using the URL from env and set the DB name explicitly to avoid
        // malformed namespaces if the URL contains a trailing slash.
        await mongoose.connect(process.env.MONGODB_URL, { dbName: 'pingup' })

    }catch(error){
        console.error('MongoDB connection error:', error)

    }

}
export default connectDb;