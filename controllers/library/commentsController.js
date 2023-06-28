const AppError = require('../../utils/errors/AppError');
const catchAsync = require('../../utils/errors/catchAsync');
const commentModel = require('./../../models/library/comments.model')

exports.getComments = catchAsync(async(req,res,next)=>{
    const {bookId} = req.params
const comments = await commentModel.find({
    book_id:bookId
}).sort({createdAt:-1}).populate('user_id',['email'])

res.status(200).json(
    comments
)

})

exports.createComments = catchAsync(async(req,res,next)=>{
    const body = req.body
    const comments = await commentModel.create(body)

    res.status(200).json({
        status:'success'
    })
})