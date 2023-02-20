class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let $or = [];
    if (queryObj.searchVal && queryObj.searchFields) {
      let val = queryObj.searchVal;
      const fields = queryObj.searchFields.split(",");

      fields.forEach((field) => {
        $or.push({
          [field]: {
            $regex: `.*${val.toString()}.*`,
            $options: "i",
          },
        });
      });

      delete queryObj.searchVal;
      delete queryObj.searchFields;
      // console.log($or);
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`
    );

    let newQryObj = JSON.parse(queryStr);

    if ($or.length) {
      newQryObj = { ...newQryObj, $or };
    }
    console.log(newQryObj);

    this.query.find(newQryObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  count() {
    this.query = this.query.countDocuments();
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 9999999;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = QueryFeatures;
