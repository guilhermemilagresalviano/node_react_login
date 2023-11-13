import mongoose from 'mongoose';

async function dbConnect() {
    const dbUrl = process.env.DB_URL
    await mongoose.connect(dbUrl);
}



export default dbConnect;
