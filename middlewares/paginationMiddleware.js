module.exports = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const results = await model.find().skip(skip).limit(limit);
    const total = await model.countDocuments();
    res.paginatedResults = {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: results,
    };
    next();
  } catch (err) {
    next(err);
  }
};
