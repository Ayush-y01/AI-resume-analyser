import mongoose from "mongoose";

const connnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName:"ai-career"
        })

        console.log("Database Connected ");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connnectDB;