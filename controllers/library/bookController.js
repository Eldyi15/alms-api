const AppError = require('./../../utils/errors/AppError')
const catchAsync = require('./../../utils/errors/catchAsync')
const BookModel = require('./../../models/library/library_books.model')
const QueryFeatures = require('./../../utils/query/QueryFeature')
const ratingModel = require('./../../models/library/ratings.model')


exports.getBooks = catchAsync(async(req,res,next)=>{
    const bookQry = new QueryFeatures(BookModel.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    const total_booksQry =   new QueryFeatures(BookModel.find({}), req.query).filter()
    .count()
    let books = await bookQry.query
    const total_books = await total_booksQry.query
    for(let book of books){
        const ratings = await ratingModel.aggregate(
            [
                {
                    '$match': {
                      'book_id':book._id
                    }
                  }, {
                    '$group': {
                      '_id': null, 
                      'rating': {
                        '$avg': '$ratings'
                      }
                    }
                  }, {
                    '$unset': '_id'
                  }
            ]
        )
        book['ratings'] = ratings.length ?( ratings[0]?.rating || 0 ): 0
    }
   
    
res.status(200).json(
    {
        status:'success',
        books,
        total_books
    }
)
})
exports.createBook = catchAsync(async(req,res,next)=>{

    const {body} = req
const book = await BookModel.create(body)

res.status(200).json({
    status:'success',
    book
})
})

exports.updateBook = catchAsync(async(req,res,next)=>{
const {id} = req.params
    const book = await BookModel.findByIdAndUpdate(id,req.body)
    if(!book)return next(new AppError('No Book Found to Update',404))

    res.status(200).json({
        status:'success',
        book
    })
})

exports.deleteBook = catchAsync(async(req,res,next)=>{
    const {id} = req.params
    await BookModel.deleteOne({
        _id:id
    })
    res.status(200).json({
        status:'success'
    })
})