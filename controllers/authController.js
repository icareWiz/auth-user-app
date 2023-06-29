const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const {promisify} = require("util");
const CatchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");


// token creation function with the secret in .env
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

// token storage and cookie creation function
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user: user

    });
};

exports.login = CatchAsync(async (req, res, next) =>{
    // get the data
    const {email, password} = req.body;

    // check if email ans password exist
    if (!email || !password) {
        return res.status(400).json({message: "Entrez un email et un mot de passe"})
    }

    // compare and find data user
    const user = await User.findOne({email}).select('password');
    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError("Adresse email ou mot de passe incorrect", 401));
    }

    // token and cookie creation
    createSendToken(user, 200, res);
});

// register fonction called in routes file
exports.register = CatchAsync(async (req, res, next) =>{
    // get data
    const {body} = req;

    // create new user
    const newUser = await User.create({
        pseudo: body.pseudo,
        email: body.email,
        password: body.password
    })

    createSendToken(newUser, 200, res);
});

exports.logout = CatchAsync(async (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({status: "success"});
})

// fonction pour restreindre l'accès a getAllUsers sur la route /users aux utilisateurs en possession d'un token valide
exports.protect = CatchAsync(async (req, res, next) => {
    // getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new AppError("Connectez-vous pour accéder à cette page", 401));
    }

    // confirm token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET );

    // check if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("Cet utilisateur n'existe plus", 403));
    }

    // grant access to protected route
    req.user = currentUser;
    next()
});


