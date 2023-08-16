import mongoose from 'mongoose';
mongoose.set('strictQuery', false);


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        });
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please ensure MongoDB is running ' + err)
        })
    } catch (error: any) {
        console.log('Something went wrong...!!')
        console.log(error.message);
        process.exit(1);
    }
}

export default connect;