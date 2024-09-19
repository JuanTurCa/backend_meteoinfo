import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const server = async () => {
    try {
    await connect(process.env.MONGODB_URI);
    console.log("Database connected successfully to db_meteoinfo");
    } catch (error) {
        console.log("Error while connecting to database", error);
        throw new Error("Error while connecting to database");
    }
}

export default server;