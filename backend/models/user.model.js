import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  profilePicture:{
    type:String,
    default:""
  },
},{timestamp :true});

const User = mongoose.model("User",userSchema);


export default User;

