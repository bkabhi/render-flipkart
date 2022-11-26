import mongoose from 'mongoose'

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const connection = async () => {
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.zopdele.mongodb.net/flipkart?retryWrites=true&w=majority`);
    // await mongoose.connect('mongodb://127.0.0.1:27017/address')
}

export default connection

