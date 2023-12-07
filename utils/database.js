import mongoose from "mongoose";

let isConnected = false; // track status of connection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'create_prompt'
        })

        isConnected = true
    } catch (error) {
        console.log(error)
    }
}