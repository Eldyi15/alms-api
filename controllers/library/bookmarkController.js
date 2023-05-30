
const AppError = require('../../utils/errors/AppError');
const catchAsync = require('../../utils/errors/catchAsync');
const bookmarkModel = require('./../../models/library/book_marks.model')

exports.getBookmarks = catchAsync(async(req,res,next)=>{
    const {book_id,user_id}= req.body

    const foundBookmark = await bookmarkModel.find(
        {
            book_id,
            user_id
        }
    )
    if(!foundBookmark) return next(new AppError('No BookMarkFound'),404)

    res.status(200).json(
        {
            foundBookmark
        }
    )
})

exports.upsertBookmark = catchAsync(async(req,res,next)=>{
    const {book_id,user_id,page} = req.body
    let bookmarks;
const foundBookmark = await bookmarkModel.find(
    {
        book_id,user_id
    }
)
    if(foundBookmark.length){
        bookmarks = await bookmarkModel.findOneAndUpdate({
            book_id,user_id
        },req.body)
    }
    else{
        bookmarks = await bookmarkModel.create(req.body)
    }
    

    
    res.status(200).json(
        {
            status:'success',
            bookmarks
        }
    )
})