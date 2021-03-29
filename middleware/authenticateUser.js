const User = require("../models/User");
const {unauthorizedError} = require('../ErrorData');

module.exports = async (req,res,next) =>{
    //TODO : Catch better errors :/
    try{
        const authenticationToken = req.cookies.token;
        if(!authenticationToken) return next(unauthorizedError);

        const user = await User.getUserFromToken(authenticationToken);
        
        if(!user) return next(unauthorizedError);

        req.user = user;
        next();

    } catch (err) {
        return next(unauthorizedError());
    }
} 