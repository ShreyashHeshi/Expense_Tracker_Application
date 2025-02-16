import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,  // here is used to build relation between user and expense and to recognise user by his id
        ref:'User'
    }
},{timestamps:true});

export const Expense = mongoose.model("Expense", expenseSchema);