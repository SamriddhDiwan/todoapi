import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpirationInSeconds } from '../../config.js';
import pg from 'pg';

// Initialize PostgreSQL client
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'todoapi',
    password: 'Samriddh@2004',
    port: 5432,
});
db.connect();

const generateAccessToken = (user_id) => {
    return jwt.sign(
        { user_id },
        jwtSecret,
        { expiresIn: jwtExpirationInSeconds }
    );
};

const encryptPassword = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};


export const register = async (req, res) => {
    const payload = req.body;

    const encryptedPassword = encryptPassword(payload.password);
  
    try {
        await db.query("INSERT INTO users(user_id, password) VALUES($1, $2);", [payload["user_id"], encryptedPassword]);

        const accessToken = generateAccessToken(payload.user_id);

        res.status(200).json({
            status: true,
            data: {
                user_id: payload.user_id,
                token: accessToken,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err.message || "Internal server error",
        });
    }
};


export const login=async(req,res)=>{
    const {user_id,password}=req.body;
    try{
        const savedPassword=(await db.query("Select * from users where user_id=$1;",[user_id])).rows[0].password;
        if(savedPassword==encryptPassword(password)){
            //generate the token
            const accessToken = generateAccessToken(user_id);
            res.status(200).json({
                status: true,
                data: {
                    user_id: user_id,
                    token: accessToken,
                },
            });
        }
        else{
            res.status(400).json({
                status:false,
                error:"Provided username and password did not match."
            })
        }

    }catch(err){
        res.status(500).json({
            status:false,
            error:"User doesnt exist"
        })
    }
}