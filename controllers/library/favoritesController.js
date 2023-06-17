const AppError = require('../../utils/errors/AppError');
const catchAsync = require('../../utils/errors/catchAsync');
const QueryFeatures = require('../../utils/query/QueryFeature');
const favoriteModel = require('./../../models/library/favorites.model')

exports.getFavorites = catchAsync(async(req,res,next)=>{


   favQry = new QueryFeatures(favoriteModel.find({}),req.query).filter()
   .sort()
   .limitFields()
   .paginate().populate()
   favorites = await favQry.query

    res.status(200).json(
        {
            favorites
        }
    )
})

exports.addFavorites = catchAsync(async(req,res,next)=>{
    await favoriteModel.create(req.body)

    res.status(200).json({
        status:'success'
    })
})

exports.removeFavorites = catchAsync(async(req,res,next)=>{
    await favoriteModel.deleteMany(req.body)
    res.status(200).json({
        status:'success'
    })
})