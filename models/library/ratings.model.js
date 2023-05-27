const mongoose = require("mongoose");

const RatingsSchema = new mongoose.Schema(
    {
        book_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' ,required:[true,'Provide book_id']},
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'LibraryUsers',required:[true,'Provide user_id']},
        ratings:Number
    },
    { timestamps: true }
)

const Ratings = mongoose.model("Ratings", RatingsSchema);
module.exports = Ratings;