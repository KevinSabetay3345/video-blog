const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 27017;

app.use(express.json());
app.use(cors());

const db = process.env.DB_CONNECTION;
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .catch(error => console.log("error: ", error));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DATABASE IS CONNECTED!')
});

const PostRouter = require('./routes/post');
const UserRouter = require('./routes/user');
app.use('/posts', PostRouter);
app.use('/users', UserRouter);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});