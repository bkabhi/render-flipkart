import userModel from "../Models/user.model.js";
import  jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const assignAuth = async (req, res, next)=> {

    let token = req.headers.authorization || '';

    token = token.split(' ')[1];

    if (token) {

        try {

            const result = jwt.verify(token, JWT_SECRET);
    
            let user = await userModel.findById(result._id);
    
            user = user.toJSON();
    
            delete user.password;
    
            req.user = user;

        } catch(err) {
            console.log('Error in verifying the token', err);
        }
    }

    next();
}

export { assignAuth }