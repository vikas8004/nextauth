import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("database connected successfully.");

        })
        connection.on("error", (err) => {
            console.log(err);
            process.exit();

        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);


    }
}
connect()