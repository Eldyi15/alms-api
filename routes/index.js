const userRouter = require("./user.routes");
const logBookRouter = require("./logbook.routes");
const aggregateRouter = require("./aggregate.routes");
const BookRouter = require('./library/book.routes')
const BookmarkRouter = require('./../routes/library/bookmark.routes')
const ratingsRouter = require('./../routes/library/rating.routes')
const commentsRouter = require('./../routes/library/comments.routes')
exports.init = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/logbooks", logBookRouter);
  app.use("/api/v1/aggregate", aggregateRouter);
  app.use("/api/library",BookRouter)
  app.use('/api/bookmarks',BookmarkRouter)
  app.use('/api/ratings',ratingsRouter)
  app.use('/api/library/comments',commentsRouter)
};
