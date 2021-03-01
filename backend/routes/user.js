const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signin/:username/:password').get((req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    User.findOne( { username: username } )
        .then(user => {
            if (user === null)
                return res.json( { message: "No existe el usuario" });
            
            bcrypt.compare(password, user.password)
                .then(result => {
                    result ? res.json(user) : res.json( { message: "La contraseña es incorrecta." } );
                })
                .catch(err => res.json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, 10);
    const nickname = req.body.nickname;
    const newUser = new User({ username, password, nickname });

    newUser.save()
        .then(response => {
            res.json({ message: 'User added!', id: response._id });
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json( { message: 'User deleted.' } ))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    const updateObject = (req.body.password === "") ? { username: req.body.username, nickname: req.body.nickname } : { username: req.body.username, nickname: req.body.nickname, password: bcrypt.hashSync(req.body.password, 10) };

    User.findByIdAndUpdate(req.params.id, updateObject, (err, result) => {
        if (err) {
            res.status(400).json('Error: ' + err);
        } else {
            res.json( { message: 'User updated!' } );
        }
    });
});

module.exports = router;