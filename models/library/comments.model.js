const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        book_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' ,required:[true,'Provide book_id']},
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'LibraryUsers',required:[true,'Provide user_id']},
        comments:String

      
    },
    { timestamps: true }
)

const LibraryComment = mongoose.model("LibraryComments", commentSchema);
module.exports = LibraryComment;