import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'

const app = express();
const CONNECTION_URI = 'mongodb+srv://magdheze:VEbATxjIhI04BoVd@cluster0.5nwgycn.mongodb.net/?retryWrites=true&w=majority'
app.use(express.json());
mongoose.connect(CONNECTION_URI).then(()=>{
    app.listen(1212,() => {
        console.log('listening on port 1212');
    });
})

app.use('/api',userRoutes)