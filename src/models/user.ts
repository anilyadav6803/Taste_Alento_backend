import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Automatically generates an ObjectId
   },
   auth0Id: {
      type: String,
      required: true, // Assuming it's required for your application
   },
   email: {
      type: String,
      required: true,
   },
   name: {     
      type: String,        
      required: false, // Explicitly marking as optional
   },
   addressLine1: {
      type: String,
      required: false,
   },
   city: {
      type: String,
      required: false,
   },
   country: {
      type: String,
      required: false,
   },
});

// Create and export the model
const User = mongoose.model("User", userSchema);

export default User;
