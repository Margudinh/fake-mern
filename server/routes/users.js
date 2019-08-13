const router = require('express').Router();
const User = require('../models/User');

router.get("/", async (req,res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post("/", async (req,res) => {
   const newUser = User.build(req.body);
   newUser.save()
    .then(() => res.json(newUser))
    .catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
});

router.put("/", async (req, res) => {
    const user = await User.findByPk(req.body.id);
    user.update(req.body)
        .then(() => res.json(user))
        .catch(err => {
            res.sendStatus(400);
            res.end("Bad request");
            console.log(err);
        });
});

router.delete("/:id", async (req,res) => {
    const user = await User.findByPk(req.params.id);
    user.destroy()
        .then(() => {
            res.sendStatus(200);
            res.end();
        })
        .catch(err => {
            res.sendStatus(400);
            res.end();
        });
});

module.exports = router;