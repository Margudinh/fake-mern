import { Router, Request, Response } from 'express';
import { User } from "../entity/User";
import * as Bcrypt from 'bcrypt';
import { check , validationResult } from 'express-validator';

const router = Router();

router.get("/",async (req: Request, res: Response) => {
    const users = await User.find({ select: ['id', 'firstName', 'lastName', 'age', 'email'] });
    res.json(users);
});

router.post("/", [
    check('email').isEmail(),
    check('password').isLength({min: 6}),
    check('age').isInt()
] ,async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(errors){
        res.status(422).json(errors.array());
        return;
    }

    const user = new User();
    user.firstName = req.body.firstName;
    user.age = req.body.age;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    //get the password hash
    user.password = await new Promise((resolve, reject) => {
        Bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(hash);
        });
    });

    await user.save();

    res.json({
        "newUser": user.id
    });
});

router.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await User.delete(id);

    res.json({
        affected: result.affected,
        raw: result.raw
    });
});

router.put("/", async (req: Request, res: Response) => {
    const user = await User.findOne(req.body.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.save();

    res.json(user);
});

export default router;


