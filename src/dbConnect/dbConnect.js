import mongoose from "mongoose";

export default async function dbConnect(){
    if(mongoose.connection.readyState == 1){
        console.log('already connected');
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('database connected');
    } catch (error) {
        console.log('error connecting database');
        console.log(error)
    }
}