
import addressModel from "../Models/address.model.js"
import connection from "../config/db.js";

const postaddress = async (req, res)=> {
    await connection()

    const body = req.body;
    const { Name, Number, Email, Address, Pincode, City, State  } = body
    try {
        console.log(body)
       const address =  await addressModel.create({ Name, Number, Email, Address, Pincode, City, State  });
       console.log(address)
        return res.send({
            "message": "Address successfully save",
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Server Error'
        })
    }

}




export default postaddress
