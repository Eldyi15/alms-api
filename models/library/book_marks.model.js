const mongoose = require("mongoose");

const BookMarkSchema = new mongoose.Schema(
    {
        book_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' ,required:[true,'Provide book_id']},
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'LibraryUsers',required:[true,'Provide user_id']},
        page:String

      
    },
    { timestamps: true }
)

const Bookmark = mongoose.model("Bookmark", BookMarkSchema);
module.exports = Bookmark;