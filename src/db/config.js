import { urlencoded } from "express";
import mongoose, { mongo } from "mongoose";
const URI = "mongodb+srv://mathiasquirogaramirez:1234@mycluster.5bmgobn.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(URI)
.then(() => console.log("Connection is succesfully to ecommerce"))
.catch((error) => console.log(error));