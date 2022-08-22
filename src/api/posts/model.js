import mongoose from "mongoose";




const {Schema , model} = mongoose


const postsSchema = new Schema(
    {
        text: {type: String, required: true},
        username: {type: String, required: true},
       
        users:[{type: Schema.Types.ObjectId, required:true, ref:"User"}]
    },
    {
        timestamps: true,
    }
)


export default model("Post", postsSchema)