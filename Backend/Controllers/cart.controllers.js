import jwt  from "jsonwebtoken";
import cartItemModel from "../Models/cartItem.model.js"

const getItems = async(req,res) => {
    const token = localStorage.getItem('token'); // take token from localStorage
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY); // verify token
    const { userId} = decode; // get user
    const cartItems = await cartItemModel.find({userId: userId}); // get cart items
    return res.status(200).send(cartItems);
} 

const addItem = async (req, res)=> {
    const token = localStorage.getItem('token'); // take token from localStorage
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY); // verify token
    const { userId} = decode; // get user
    const body = {...req.body,userId}; // get body
    try {
        const cartItem = await cartItemModel.create(body);
        return res.send({
            "message": "Added cart item successfully",
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Server Error'
        })
    }

}

const updateItem = async (req, res)=> {
    try {
        const updatedCartItem = await cartItemModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(updatedCartItem);
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Server Error'
        })
    }
}

const deleteItem = async (req, res)=> {
    try {
        const deletedCartItem = await cartItemModel.findByIdAndDelete(req.params.id);
        res.send({
            "message": "Delete cart item successfully"
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Server Error'
        })
    }
}

export {getItems,deleteItem,updateItem,addItem}