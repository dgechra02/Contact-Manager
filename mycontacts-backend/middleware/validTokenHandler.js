const aysncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validateToken = aysncHandler( async (req , res, next) => {
    // next() = moves to next middleware/route handler
    let token;
    let authHeader = req.header.Authorization || req.headers.authorization;
    // to hadle two cases i) Headers - Athorization, ii) Auth - Baerer token
    // Different clients sometimes send it as: Authorization: Bearer tokenstring | or with a lowercase authorization (hence both are checked).
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // extracting the token from string = "Bearer tokenstring"
        // verifying the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            // If token valid → decoded will contain the payload you originally signed (like user ID/email).
            if(err){
                res.status(401);
                throw new Error("user is not authorized")
            }
            console.log("Decoded: ", decoded);
            req.user = decoded.user;
            next();
            // next is a function given to every middleware in Express.
            // When you call next(), Express says:
            // 👉 “Okay, this middleware is done, let’s move on to the next matching middleware or route handler.”
            // If you don’t call it, the request will hang because Express doesn’t know what to do next.
            // If you don’t call next(), Express will never reach your route handler (like getContacts, updateContact, etc.).
        })
    }

    if(!token){
        res.status(401);
        throw new Error("user is not autorized or token is missing in the request");
    }
});

module.exports = validateToken;