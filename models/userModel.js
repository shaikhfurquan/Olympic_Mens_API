import mongoose from "mongoose";

//Creating the user schema fot registration
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    creaedAt : {
        type : Date,
        default : Date.now
    }
})

const UserModel = mongoose.model('User' , userSchema)


export default UserModel