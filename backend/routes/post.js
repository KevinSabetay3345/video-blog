const router = require('express').Router();
const Post = require('../models/postModel');

router.route('/:user').get((req, res) => {
    const user = req.params.user;

    Post.find( user === "all" ? {} : { userNickname: user } )
        .then(posts => {
            res.json(posts)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:id').get((req, res) => {
    Post.findById(req.params.id, (err, response) => {
        if (err) {
            res.status(400).json('Error: ' + err);
        } else {
            res.json(response);
        }
    })
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const ytURL = req.body.ytURL;
    const userNickname = req.body.userNickname;

    const newPeriod = new Post({ title, subtitle, ytURL, userNickname });

    newPeriod.save()
        .then(response => res.json({ message: 'Post added!', id: response._id }))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Post deleted.' }))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.title = req.body.title;
            post.subtitle = req.body.subtitle;
            post.ytURL = req.body.ytURL;
            post.userNickname = req.body.userNickname;

            post.save()
                .then(() => res.json({ message: 'Post updated!' }))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(404).json('Error: ' + err));
});

module.exports = router;