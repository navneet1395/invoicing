import users from "../data/dummyData.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const userResolvers = {
  Query: {
    authUser:async(_,__,context)=>{
      try {
        const user = await context.getUser()
        if(!user){
          throw new Error("Unauthorized")
        }
        return user
      } catch (err) {
        console.error("Error in authUser",err)
        throw new Error(err.message || "Interval Sever Error")
      }
    },
    user: async(_, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        console.error("Error in user", err);
        throw new Error(err.message || "Interval Sever Error");
      }
    },
  },
  Mutation: {
    login: async (_, { input }, context) => {
      try {
        const { userName, password } = input;
        const {user} = await context.authenticate('graphql-local',{userName})
        await context.login(user)
        return user
        
      } catch (err) {
        console.error("Error in login", err);
        throw new Error(err.message || "Interval Sever Error");
      }
    },
    logout: async (_, __, context) => {
      await context.logout();
      req.session.destroy((err)=>{
        if(err){
          throw new Error("Interval Sever Error")
        }

      })
      res.clearCookie('connect.sid')
      return {message:"User logged out successfully",success:true};
    },
    signup: async (_, { input }, context) => {
      try {
        const { userName, password, name, email } = input;
        if (!userName || !password || !name || !email) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ userName });
        const existingUserEmail = await User.findOne({ email });
        if (existingUser || existingUserEmail) {
          throw new Error("username taken or email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName} `;
        const newUser = await User({
          userName,
          password: hashedPassword,
          name,
          email,
          profilePicture,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signup", err);
        throw new Error(err.message || "Interval Sever Error");
      }
    },
  },
};
export default userResolvers;
