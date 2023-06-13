const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'Please provide book title']
        },
        description:{
            type:String,
           
        },
        pdfUrl:{
            type:Object,
       
        },
        bookThumbnailImg:{
            type:Object,
        },
      
        bookThumbnailAlt:{
            type:String,
        },
        author:{
            type:String,
        },
        ratings:Number,
        review:Number
      
    },
    { timestamps: true }
)

const Books = mongoose.model("Books", BookSchema);
module.exports = Books;