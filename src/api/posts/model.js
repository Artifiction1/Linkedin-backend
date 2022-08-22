import mongoose, { mongo } from "mongoose"

const { Schema, model} = mongoose

const postsSchema = new Schema(
    {
        text: {type:String, required:true},
        username: {}
    }
)