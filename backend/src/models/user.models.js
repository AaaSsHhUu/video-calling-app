import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    token : {
        type : String
    }
})

userSchema.pre("save", async function(next){
    // password should change only if it is modified
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema);
export {User};
