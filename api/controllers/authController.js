import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import {v4 as uuidv4} from "uuid"
import jwt from "jsonwebtoken"

export const register = (req , res) => { 
    //check user if exists
       const findUserQuery = "SELECT * FROM users WHERE username = ?"
       const genuuid = uuidv4();

       db.query(findUserQuery ,[req.body.username],(err,data) => {
           if(err) return res.status(500).json(err)
           if(data.length) return res.status(409).json("User already exists!")

           //Create new user and hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password , salt)
            const insertData = 
            "INSERT INTO users (`id` ,`idcard`,`name`,`lastname`,`username`,`password`,`email`,`createDatetime`,`usercreate`) VALUE (?)"
           
            const valueData = [genuuid,
                req.body.idcard,
                req.body.name,
                req.body.lastname,
                req.body.username,
                hashedPassword,
                req.body.email,
                new Date(),
                "Admin"]
           
            db.query(insertData , [valueData] , (err, data )=> {
                if(err) return res.status(500).json(err)
                return res.status(200).json("User has been created.")
            })
        })
    }


export const login = (req , res) =>{
    const findUser = "SELECT * FROM users WHERE username = ?";
     db.query(findUser , [req.body.username] , (err , data) => {
        if(err) return res.status(500).json(err);
        if(data === 0 ) return res.status(404).json("User no found!")

        const checkPassword = bcrypt.compareSync(req.body.password , data[0].password);
        if(!checkPassword) return res.status(400).json("Worng password or username!")

        const token = jwt.sign({id:data[0].id} , "secretkey")
        const {password, ...other} = data[0]
        res.cookie("accessToken" , token, {
            httpOnly: true,
        })
        .status(200)
        .json(other);
     })
}


export const logout = (req , res) =>{
    
}