import express  from "express";
const app = express()
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"



//middleware
app.use(express.json())
app.use(cors());
app.use(cookieParser)


app.use("/api/users" , userRouter)
app.use("/api/auth" ,authRouter)

app.listen(8800, ()=>{
    console.log("Api working")
})