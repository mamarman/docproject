import  Express  from "express";
import userRouter from "./routes/user.js"

const app = Express()


app.use("/api/users" , userRouter)

app.listen(8800, ()=>{
    console.log("Api working")
})