const AppError = require('../../utils/errors/AppError');
const catchAsync = require('../../utils/errors/catchAsync');
const favoriteModel = require('./../../models/library/favorites.model')

exports.getFavorites = catchAsync(async(req,res,next)=>{
    const {book_id,user_id}= req.body

    const favorites = await favoriteModel.find(
        {
            book_id,
            user_id
        }
    )

    res.status(200).json(
        {
            favorites
        }
    )
})

exports.addFavorites = catchAsync(async(req,res,next)=>{
    await favoriteModel.create(req.body)

    res.status(200)
})

exports.removeFavorites = catchAsync(async(req,res,next)=>{
    await favoriteModel.deleteOne({book_id,user_id})
    res.status(200)
})