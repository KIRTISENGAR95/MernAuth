// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected', () => console.log("Database connected successfully"));
//         mongoose.connection.on('error', (err) => console.log("Database connection error:", err));
//         mongoose.connection.on('disconnected', () => console.log("Database disconnected"));

//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("MongoDB Connected");
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//         process.exit(1);
//     }
// };

// export default connectDB;

import mongoose from "mongoose";


const connectDB = async () =>{

    mongoose.connection.on('connected',()=> console.log("database connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/newauth`);
};


export default connectDB;