const catchAsync = require('../../utils/errors/catchAsync');
const ratingModel = require('./../../models/library/ratings.model')

exports.upsertRatings = catchAsync(async(req,res,next)=>{
    const {book_id,user_id,ratings} = req.body
    let rating;
const foundBookmark = await ratingModel.find(
    {
        book_id,user_id
    }
)
    if(foundBookmark.length){
        rating = await ratingModel.findOneAndUpdate({
            book_id,user_id
        },req.body)
    }
    else{
        rating = await ratingModel.create(req.body)
    }
    

    
    res.status(200).json(
        {
            status:'success',
            rating
        }
    )
})