import express  from "express";
import dotenv from "dotenv"
import connnectDB from "./config/db.js";
import userRoutes from './routes/user.js'
import aiRoutes from "./routes/ai.js"
import paymentsRoutes from "./routes/payment.js"
import cors from "cors"
import Razorpay from "razorpay"

dotenv.config()

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY!,
    key_secret:process.env.RAZORPAY_SECRET!,

})

await connnectDB();

const app = express();
app.use(cors())

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended:true, limit: "10mb"}))

app.use("/api/user", userRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/payments", paymentsRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    
})