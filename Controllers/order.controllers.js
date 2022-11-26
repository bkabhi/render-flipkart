import jwt  from "jsonwebtoken";
import orderItemModel from "../Models/orderItems.model.js"

const getItems = async(req,res) => {
    const token = localStorage.getItem('token'); // take token from localStorage
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY); // verify token
    const { userId} = decode; // get user
    try {
        const orderItems = await orderItemModel.find({userId: userId}); // get order items
        return res.status(200).send(orderItems);
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Server Error'
        })
    }
    
} 

const addItem = async (req, res)=> {
    const token = localStorage.getItem('token'); // take token from localStorage
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY); // verify token
    const { userId} = decode; // get user
    const body = {...req.body,userId}; // get body
    try {
        const orderItem = await orderItemModel.create(body);
        return res.send({
            "message": "Added order item successfully",
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
        const updatedorderItem = await orderItemModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(updatedorderItem);
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Server Error'
        })
    }
}

const deleteItem = async (req, res)=> {
    try {
        const deletedorderItem = await orderItemModel.findByIdAndDelete(req.params.id);
        res.send({
            "message": "Delete order item successfully"
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Server Error'
        })
    }
}

export {getItems,deleteItem,updateItem,addItem}