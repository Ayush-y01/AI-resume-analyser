import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document{
    name:string;
    email:string;
    image:string;
    subscription:Date | null;
    freeRequestUsed: number;

    hasProAcess() : boolean;
    canMakeRequest():boolean;

}

const schema:Schema<IUser> = new Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    image:{
        type:String,
        required:true
    },
    subscription:{
        type:Date,
        default:null
    },
    freeRequestUsed:{type:Number, default:0},
},{timestamps:true})

schema.methods.hasProAcess = function ():boolean {
    return !!this.subscription && new Date() < new Date(this.subscription);
};

schema.methods.canMakeRequest = function ():boolean {
    return this.hasProAcess() || this.freeRequestUsed < 3; 
};

const User = mongoose.model<IUser>("User", schema)

export default User;
