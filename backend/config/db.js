import mongoose from "mongoose";

export const dbConnect = () => {
    const URI = process.env.MONGODB_URI

    mongoose.connect(URI)
    .then(() => console.log("Data base connected successfully"))
    .catch((error) => {console.log("error",error)});
}