const User = require('../models/userModel');
const CatchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// function for get all users data, callled in routes file /users
module.exports.getAllUsers = CatchAsync(async (req, res) => {

    const users = await User.find({}, {_id: 0, __v: 0});

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users
        }
    });
});

exports.getOne = CatchAsync(async (req, res, next) => {
   const user = await User.findById(req.params.id)
    if (!user) {
        return next(new AppError("Aucune route correspond à cet id", 404));
    }

   res.status(200).json({
       status: "success",
       data: {
           user
       }
   })
});