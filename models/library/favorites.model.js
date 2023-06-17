const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema(
    {
        book_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' ,required:[true,'Provide book_id']},
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'LibraryUsers',required:[true,'Provide user_id']},

      
    },
    { timestamps: true }
)

const Favorite = mongoose.model("Favorites", favoritesSchema);
module.exports = Favorite;