import * as Jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcrypt';
import { Router, Request, Response, NextFunction} from 'express';
import { User } from '../entity/User';
import * as fs from 'fs';
import * as path from 'path';
import DecodedRequest from '../lib/DecodedRequest';

const auth = Router();

auth.post("/auth/login", async (req : Request, res: Response) => {
    const user = await User.getRepository()
        .createQueryBuilder("user")
        .where("user.email = :email", {email: req.body.email})
        .getOne();
    
    if(Bcrypt.compareSync(req.body.password, user.password)){
        const secretKey = fs.readFileSync(path.join(__dirname, '../../private.key'));
        const token = Jwt.sign({
            email: user.email,
            firstName: user.firstName,
            id: user.id
        },secretKey);

        res.json({token});

    }else{
        res.json({
            errorCode: "WrongEmailOrPassword",
            message: "Wrong email / password combination"
        });
    }
});

auth.use("*", (req: DecodedRequest, res, next) => {
    let token = req.headers['authorization'];
    if(token){
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        const secretKey = fs.readFileSync(path.join(__dirname, '../../private.key'));
        Jwt.verify(token, secretKey, (err, decoded) => {
            if(err) {
                res.statusCode = 403;
                res.json({
                    success: false, 
                    message: "Token is not valid"
                });
            } else {
                req.decoded = decoded;
                next();
            } 
        });
    } else {
        res.statusCode = 403;
        res.json({
            success: false,
            message: "No token provided"
        })
    }
});

export default auth;